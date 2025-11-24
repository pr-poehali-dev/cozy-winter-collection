import json
import os
import hashlib
from typing import Any, Dict
from urllib.parse import urlencode


def calculate_signature(*args: Any) -> str:
    """Создание MD5 подписи по документации Robokassa"""
    joined: str = ':'.join(str(arg) for arg in args)
    return hashlib.md5(joined.encode()).hexdigest()


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
    Business: Генерация ссылки на оплату в Robokassa
    Args: event с httpMethod, body (amount, order_id, description, is_test)
    Returns: payment_url для редиректа пользователя
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
        order_id = int(payload.get('order_id', 0))
        description = str(payload.get('description', 'Заказ'))
        is_test = int(payload.get('is_test', 0))

        if amount <= 0:
            raise ValueError('Amount must be greater than 0')
        if order_id <= 0:
            raise ValueError('Order ID must be greater than 0')
        if len(description) > 100:
            description = description[:100]

    except (json.JSONDecodeError, ValueError, KeyError) as exc:
        return {
            'statusCode': 400,
            'headers': HEADERS,
            'body': json.dumps({'error': 'Invalid request', 'details': str(exc)}),
            'isBase64Encoded': False
        }

    # Используем целое число для суммы
    amount_int = int(amount)
    
    # Расчет подписи: MerchantLogin:OutSum:InvId:Пароль#1
    signature = calculate_signature(
        merchant_login,
        amount_int,
        order_id,
        password_1
    )

    query_params = {
        'MerchantLogin': merchant_login,
        'OutSum': amount_int,
        'InvoiceID': order_id,
        'SignatureValue': signature,
        'IsTest': is_test
    }

    payment_url = f"{ROBOKASSA_URL}?{urlencode(query_params)}"

    response_data = {
        'payment_url': payment_url,
        'order_id': order_id,
        'amount': str(amount_int)
    }

    return {
        'statusCode': 200,
        'headers': HEADERS,
        'body': json.dumps(response_data),
        'isBase64Encoded': False
    }