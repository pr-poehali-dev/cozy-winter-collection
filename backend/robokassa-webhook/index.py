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
    print(f"[WEBHOOK] Получен запрос: method={event.get('httpMethod')}")
    print(f"[WEBHOOK] Event: {json.dumps(event)}")
    
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

    print(f"[WEBHOOK] Секреты загружены: password_2={'***' if password_2 else 'MISSING'}, merchant={'***' if merchant_login else 'MISSING'}")

    if not password_2 or not merchant_login:
        print("[WEBHOOK] ERROR: Секреты не настроены!")
        return {
            'statusCode': 500,
            'headers': HEADERS,
            'body': 'Configuration error',
            'isBase64Encoded': False
        }

    body = event.get('body', '')
    is_base64 = event.get('isBase64Encoded', False)
    
    print(f"[WEBHOOK] Body: {body[:200] if body else 'EMPTY'}, is_base64={is_base64}")
    
    params = {}
    
    if method == 'POST' and body:
        if is_base64:
            import base64
            body = base64.b64decode(body).decode('utf-8')
            print(f"[WEBHOOK] Decoded body: {body}")
        
        if isinstance(body, str) and body.startswith('"') and body.endswith('"'):
            body = json.loads(body)
            print(f"[WEBHOOK] JSON parsed body: {body}")
        
        parsed = parse_qs(body)
        params = {k: v[0] if isinstance(v, list) else v for k, v in parsed.items()}
        print(f"[WEBHOOK] Parsed POST params: {params}")
    
    if not params:
        params = event.get('queryStringParameters') or {}
        print(f"[WEBHOOK] Using query params: {params}")

    out_sum = params.get('OutSum', params.get('out_summ', ''))
    inv_id = params.get('InvId', params.get('inv_id', ''))
    signature_value = params.get('SignatureValue', params.get('crc', '')).upper()

    print(f"[WEBHOOK] Параметры: OutSum={out_sum}, InvId={inv_id}, Signature={signature_value[:10]}...")

    if not out_sum or not inv_id or not signature_value:
        print(f"[WEBHOOK] ERROR: Недостающие параметры!")
        return {
            'statusCode': 400,
            'headers': HEADERS,
            'body': 'Missing required parameters',
            'isBase64Encoded': False
        }

    expected_signature = calculate_signature(out_sum, inv_id, password_2)
    print(f"[WEBHOOK] Проверка подписи: expected={expected_signature}, received={signature_value}")

    if signature_value != expected_signature:
        print(f"[WEBHOOK] ERROR: Неверная подпись!")
        return {
            'statusCode': 400,
            'headers': HEADERS,
            'body': 'Invalid signature',
            'isBase64Encoded': False
        }

    conn = None
    try:
        print(f"[WEBHOOK] Подключаюсь к БД...")
        conn = get_db_connection()
        cur = conn.cursor()
        
        print(f"[WEBHOOK] Ищу заказ с robokassa_inv_id={inv_id}")
        
        cur.execute("""
            SELECT id, order_number, status, user_email, user_name, robokassa_inv_id 
            FROM t_p3876556_cozy_winter_collecti.orders 
            WHERE robokassa_inv_id = %s
        """, (int(inv_id),))
        
        order_check = cur.fetchone()
        print(f"[WEBHOOK] Найден заказ: {order_check}")
        
        cur.execute("""
            UPDATE t_p3876556_cozy_winter_collecti.orders 
            SET status = %s, paid_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
            WHERE robokassa_inv_id = %s AND status = %s
            RETURNING id, order_number, user_email, user_name
        """, ('paid', int(inv_id), 'pending'))
        
        result = cur.fetchone()
        print(f"[WEBHOOK] Результат UPDATE: {result}")
        
        if not result:
            cur.execute("""
                SELECT status FROM t_p3876556_cozy_winter_collecti.orders WHERE robokassa_inv_id = %s
            """, (int(inv_id),))
            existing = cur.fetchone()
            print(f"[WEBHOOK] Текущий статус заказа: {existing}")
            
            if existing and existing[0] == 'paid':
                print(f"[WEBHOOK] Заказ уже оплачен, возвращаю OK")
                conn.commit()
                cur.close()
                return {
                    'statusCode': 200,
                    'headers': HEADERS,
                    'body': f'OK{inv_id}',
                    'isBase64Encoded': False
                }
            
            print(f"[WEBHOOK] ERROR: Заказ не найден или уже обработан")
            conn.rollback()
            cur.close()
            return {
                'statusCode': 404,
                'headers': HEADERS,
                'body': 'Order not found or already processed',
                'isBase64Encoded': False
            }
        
        order_id, order_number, user_email, user_name = result
        print(f"[WEBHOOK] SUCCESS: Заказ #{order_number} обновлён на 'paid'")
        
        conn.commit()
        cur.close()
        
        try:
            import urllib.request
            from urllib.parse import quote
            
            print(f"[WEBHOOK] Отправляю уведомления...")
            
            # Отправка уведомления в Telegram
            notify_url = f'https://functions.poehali.dev/f90640b5-f2de-4bec-94e5-67480422875a?action=notify&order_number={quote(order_number)}'
            print(f"[WEBHOOK] Telegram URL: {notify_url}")
            req = urllib.request.Request(notify_url, method='GET')
            urllib.request.urlopen(req, timeout=5)
            
            # Отправка email клиенту
            email_url = f'https://functions.poehali.dev/088b269d-8f1d-43b7-b1a5-21fc5808f30a?action=paid&order_number={quote(order_number)}'
            print(f"[WEBHOOK] Email URL: {email_url}")
            req = urllib.request.Request(email_url, method='GET')
            urllib.request.urlopen(req, timeout=5)
            
            print(f"[WEBHOOK] Уведомления отправлены")
        except Exception as notify_error:
            print(f"[WEBHOOK] WARNING: Failed to send notifications: {notify_error}")

        return {
            'statusCode': 200,
            'headers': HEADERS,
            'body': f'OK{inv_id}',
            'isBase64Encoded': False
        }
        
    except Exception as exc:
        print(f"[WEBHOOK] FATAL ERROR: {exc}")
        import traceback
        print(f"[WEBHOOK] Traceback: {traceback.format_exc()}")
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
            print(f"[WEBHOOK] Соединение с БД закрыто")