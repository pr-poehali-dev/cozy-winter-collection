import json
import os
import hashlib
import psycopg2
from typing import Any, Dict
from urllib.parse import parse_qs


def calculate_signature(*args: Any) -> str:
    """Создание MD5 подписи по документации Robokassa"""
    joined: str = ':'.join(str(arg) for arg in args)
    return hashlib.md5(joined.encode()).hexdigest().upper()


def get_db_connection():
    """Получение подключения к БД"""
    dsn = os.getenv('DATABASE_URL')
    if not dsn:
        raise ValueError('DATABASE_URL not configured')
    return psycopg2.connect(dsn)


HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    'Content-Type': 'text/plain'
}


def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Result URL вебхук от Robokassa для подтверждения оплаты
    Args: event с httpMethod, queryStringParameters (OutSum, InvId, SignatureValue)
    Returns: OK{InvId} если успешно, иначе ошибка
    '''
    method = event.get('httpMethod', 'GET').upper()

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': HEADERS,
            'body': '',
            'isBase64Encoded': False
        }

    password_2 = os.getenv('ROBOKASSA_PASSWORD_2')
    merchant_login = os.getenv('ROBOKASSA_MERCHANT_LOGIN')

    if not password_2 or not merchant_login:
        return {
            'statusCode': 500,
            'headers': HEADERS,
            'body': 'Configuration error',
            'isBase64Encoded': False
        }

    params = event.get('queryStringParameters', {})
    
    if method == 'POST':
        body = event.get('body', '')
        if body:
            parsed = parse_qs(body)
            params = {k: v[0] if isinstance(v, list) else v for k, v in parsed.items()}

    out_sum = params.get('OutSum', '')
    inv_id = params.get('InvId', '')
    signature_value = params.get('SignatureValue', '').upper()

    if not out_sum or not inv_id or not signature_value:
        return {
            'statusCode': 400,
            'headers': HEADERS,
            'body': 'Missing required parameters',
            'isBase64Encoded': False
        }

    expected_signature = calculate_signature(out_sum, inv_id, password_2)

    if signature_value != expected_signature:
        return {
            'statusCode': 400,
            'headers': HEADERS,
            'body': 'Invalid signature',
            'isBase64Encoded': False
        }

    conn = None
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        
        cur.execute("""
            UPDATE orders 
            SET status = %s, paid_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
            WHERE robokassa_inv_id = %s AND status = %s
            RETURNING id, order_number
        """, ('paid', int(inv_id), 'pending'))
        
        result = cur.fetchone()
        
        if not result:
            cur.execute("""
                SELECT status FROM orders WHERE robokassa_inv_id = %s
            """, (int(inv_id),))
            existing = cur.fetchone()
            
            if existing and existing[0] == 'paid':
                conn.commit()
                cur.close()
                return {
                    'statusCode': 200,
                    'headers': HEADERS,
                    'body': f'OK{inv_id}',
                    'isBase64Encoded': False
                }
            
            conn.rollback()
            cur.close()
            return {
                'statusCode': 404,
                'headers': HEADERS,
                'body': 'Order not found or already processed',
                'isBase64Encoded': False
            }
        
        conn.commit()
        cur.close()

        return {
            'statusCode': 200,
            'headers': HEADERS,
            'body': f'OK{inv_id}',
            'isBase64Encoded': False
        }
        
    except Exception as exc:
        if conn:
            conn.rollback()
        return {
            'statusCode': 500,
            'headers': HEADERS,
            'body': f'Database error: {str(exc)}',
            'isBase64Encoded': False
        }
    finally:
        if conn:
            conn.close()
