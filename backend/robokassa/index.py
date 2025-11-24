import json
import os
from typing import Any, Dict
from robokassa import Robokassa, HashAlgorithm


HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Session-Id, X-Auth-Token',
    'Access-Control-Max-Age': '86400',
    'Content-Type': 'application/json'
}


def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Генерация ссылки на оплату в Robokassa через официальную библиотеку
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
    password1 = os.getenv('ROBOKASSA_PASSWORD_1')
    password2 = os.getenv('ROBOKASSA_PASSWORD_2')

    if not merchant_login or not password1 or not password2:
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
        is_test = bool(payload.get('is_test', 1))

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

    # Инициализация Robokassa
    robokassa = Robokassa(
        merchant_login=merchant_login,
        password1=password1,
        password2=password2,
        is_test=is_test,
        algorithm=HashAlgorithm.md5
    )

    # Генерация ссылки на оплату
    payment_response = robokassa.generate_open_payment_link(
        out_sum=amount,
        inv_id=order_id,
        description=description
    )

    response_data = {
        'payment_url': str(payment_response),
        'order_id': order_id,
        'amount': f"{amount:.2f}"
    }

    return {
        'statusCode': 200,
        'headers': HEADERS,
        'body': json.dumps(response_data),
        'isBase64Encoded': False
    }