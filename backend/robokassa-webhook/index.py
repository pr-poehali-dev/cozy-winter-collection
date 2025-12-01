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

    body = event.get('body', '')
    is_base64 = event.get('isBase64Encoded', False)
    
    params = {}
    
    if method == 'POST' and body:
        if is_base64:
            import base64
            body = base64.b64decode(body).decode('utf-8')
        
        if isinstance(body, str) and body.startswith('"') and body.endswith('"'):
            body = json.loads(body)
        
        parsed = parse_qs(body)
        params = {k: v[0] if isinstance(v, list) else v for k, v in parsed.items()}
    
    if not params:
        params = event.get('queryStringParameters') or {}

    out_sum = params.get('OutSum', params.get('out_summ', ''))
    inv_id = params.get('InvId', params.get('inv_id', ''))
    signature_value = params.get('SignatureValue', params.get('crc', '')).upper()

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
            RETURNING id, order_number, user_email, user_name
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
        
        order_id, order_number, user_email, user_name = result
        
        conn.commit()
        cur.close()
        
        try:
            import urllib.request
            from urllib.parse import quote
            
            notify_url = 'https://functions.poehali.dev/93787d28-4035-466b-9508-7fbd757f53f8?action=notify'
            req = urllib.request.Request(notify_url, method='GET')
            urllib.request.urlopen(req, timeout=5)
            
            email_url = f'https://functions.poehali.dev/76b36dee-db70-4316-b6a8-fed039d8df8c?action=paid&order_number={quote(order_number)}&user_email={quote(user_email)}&user_name={quote(user_name)}'
            req = urllib.request.Request(email_url, method='GET')
            urllib.request.urlopen(req, timeout=5)
        except Exception as notify_error:
            print(f"Failed to send notifications: {notify_error}")

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