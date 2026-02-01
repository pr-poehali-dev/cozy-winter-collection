import json
import os
import hashlib
import psycopg2
import random
from typing import Any, Dict
from urllib.parse import urlencode
from datetime import datetime


def calculate_signature(*args: Any) -> str:
    """Создание MD5 подписи по документации Robokassa"""
    joined: str = ':'.join(str(arg) for arg in args)
    return hashlib.md5(joined.encode()).hexdigest()


def get_db_connection():
    """Получение подключения к БД"""
    dsn = os.getenv('DATABASE_URL')
    if not dsn:
        raise ValueError('DATABASE_URL not configured')
    return psycopg2.connect(dsn)


HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Session-Id, X-Auth-Token',
    'Access-Control-Max-Age': '86400',
    'Content-Type': 'application/json'
}

ROBOKASSA_URL = 'https://auth.robokassa.ru/Merchant/Index.aspx'


def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Создание заказа и генерация ссылки на оплату в Robokassa с поддержкой анонимных заказов
    '''
    method = event.get('httpMethod', 'GET').upper()

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': HEADERS,
            'body': '',
            'isBase64Encoded': False
        }

    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': HEADERS,
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }

    merchant_login = os.getenv('ROBOKASSA_MERCHANT_LOGIN')
    password_1 = os.getenv('ROBOKASSA_PASSWORD_1')

    if not merchant_login or not password_1:
        return {
            'statusCode': 500,
            'headers': HEADERS,
            'body': json.dumps({'error': 'Robokassa credentials not configured'}),
            'isBase64Encoded': False
        }

    try:
        body_str = event.get('body', '{}')
        payload = json.loads(body_str)
        
        amount = float(payload.get('amount', 0))
        user_name = str(payload.get('user_name', ''))
        user_email = str(payload.get('user_email', ''))
        user_phone = str(payload.get('user_phone', ''))
        user_address = str(payload.get('user_address', ''))
        order_comment = str(payload.get('order_comment', ''))
        user_telegram = str(payload.get('user_telegram', ''))
        delivery_type = str(payload.get('delivery_type', 'pvz'))
        delivery_cost = float(payload.get('delivery_cost', 0))
        is_test = int(payload.get('is_test', 0))
        cart_items = payload.get('cart_items', [])
        
        # Анонимность заказа
        is_anonymous = bool(payload.get('is_anonymous', False))

        if amount <= 0:
            raise ValueError('Amount must be greater than 0')
        if not user_name:
            raise ValueError('User name is required')
        if not user_email:
            raise ValueError('User email is required')
        if not user_address:
            raise ValueError('User address is required')
        if not cart_items:
            raise ValueError('Cart items are required')

    except (json.JSONDecodeError, ValueError, KeyError) as exc:
        return {
            'statusCode': 400,
            'headers': HEADERS,
            'body': json.dumps({'error': 'Invalid request', 'details': str(exc)}),
            'isBase64Encoded': False
        }

    conn = None
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        
        max_attempts = 10
        robokassa_inv_id = None
        
        for _ in range(max_attempts):
            robokassa_inv_id = random.randint(100000, 2147483647)
            
            cur.execute("SELECT COUNT(*) FROM t_p3876556_cozy_winter_collecti.orders WHERE robokassa_inv_id = %s", (robokassa_inv_id,))
            exists = cur.fetchone()[0]
            
            if exists == 0:
                break
        else:
            raise ValueError('Failed to generate unique invoice ID')
        
        order_number = f"ORD-{datetime.now().strftime('%Y%m%d')}-{robokassa_inv_id}"
        
        amount_decimal = round(amount, 2)
        
        cur.execute("""
            INSERT INTO t_p3876556_cozy_winter_collecti.orders 
            (order_number, user_name, user_email, user_phone, amount, robokassa_inv_id, status, delivery_address, order_comment, user_telegram, delivery_type, delivery_cost, is_anonymous)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING id
        """, (order_number, user_name, user_email, user_phone, amount_decimal, robokassa_inv_id, 'pending', user_address, order_comment, user_telegram, delivery_type, delivery_cost, is_anonymous))
        
        order_id = cur.fetchone()[0]
        
        for item in cart_items:
            cur.execute("""
                INSERT INTO t_p3876556_cozy_winter_collecti.order_items 
                (order_id, product_id, product_name, product_price, quantity)
                VALUES (%s, %s, %s, %s, %s)
            """, (order_id, item.get('id'), item.get('name'), item.get('price'), item.get('quantity')))
        
        amount_str = f"{amount:.2f}"
        
        signature = calculate_signature(
            merchant_login,
            amount_str,
            robokassa_inv_id,
            password_1
        )
        
        query_params = {
            'MerchantLogin': merchant_login,
            'OutSum': amount_str,
            'InvoiceID': robokassa_inv_id,
            'SignatureValue': signature,
            'Email': user_email,
            'IsTest': is_test,
            'Culture': 'ru',
            'Description': f'Заказ {order_number}'
        }

        payment_url = f"{ROBOKASSA_URL}?{urlencode(query_params)}"
        
        cur.execute("""
            UPDATE t_p3876556_cozy_winter_collecti.orders 
            SET payment_url = %s, updated_at = CURRENT_TIMESTAMP
            WHERE id = %s
        """, (payment_url, order_id))
        
        conn.commit()
        cur.close()

        response_data = {
            'payment_url': payment_url,
            'order_id': order_id,
            'order_number': order_number,
            'robokassa_inv_id': robokassa_inv_id,
            'amount': amount_str
        }

        return {
            'statusCode': 200,
            'headers': HEADERS,
            'body': json.dumps(response_data),
            'isBase64Encoded': False
        }
        
    except Exception as exc:
        if conn:
            conn.rollback()
        return {
            'statusCode': 500,
            'headers': HEADERS,
            'body': json.dumps({'error': 'Database error', 'details': str(exc)}),
            'isBase64Encoded': False
        }
    finally:
        if conn:
            conn.close()
