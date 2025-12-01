import json
import os
import requests
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Any, Dict


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


def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Отправка email-уведомлений клиентам через Resend
    Args: event с action (paid, shipped, delivered), order_number, user_email, user_name
    Returns: success или error
    '''
    method = event.get('httpMethod', 'GET').upper()

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': HEADERS,
            'body': '',
            'isBase64Encoded': False
        }

    resend_api_key = os.getenv('RESEND_API_KEY')
    
    if not resend_api_key:
        return {
            'statusCode': 500,
            'headers': HEADERS,
            'body': json.dumps({'error': 'RESEND_API_KEY not configured'}),
            'isBase64Encoded': False
        }

    query_params = event.get('queryStringParameters', {})
    action = query_params.get('action', '')
    order_number = query_params.get('order_number', '')

    if not action or not order_number:
        return {
            'statusCode': 400,
            'headers': HEADERS,
            'body': json.dumps({'error': 'Missing required parameters'}),
            'isBase64Encoded': False
        }

    conn = None
    try:
        conn = get_db_connection()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        cur.execute("""
            SELECT o.*, 
                   json_agg(
                       json_build_object(
                           'product_name', oi.product_name,
                           'product_price', oi.product_price,
                           'quantity', oi.quantity
                       )
                   ) as items
            FROM t_p3876556_cozy_winter_collecti.orders o
            LEFT JOIN t_p3876556_cozy_winter_collecti.order_items oi ON o.id = oi.order_id
            WHERE o.order_number = %s
            GROUP BY o.id
        """, (order_number,))
        
        order = cur.fetchone()
        cur.close()
        conn.close()
        
        if not order:
            return {
                'statusCode': 404,
                'headers': HEADERS,
                'body': json.dumps({'error': 'Order not found'}),
                'isBase64Encoded': False
            }
        
        user_email = order['user_email']
        user_name = order['user_name']
        
    except Exception as exc:
        if conn:
            conn.close()
        return {
            'statusCode': 500,
            'headers': HEADERS,
            'body': json.dumps({'error': 'Database error', 'details': str(exc)}),
            'isBase64Encoded': False
        }

    order_url = f'https://azaluk.shop/order-success?order={order_number}'
    
    email_templates = {
        'paid': {
            'subject': 'Подтверждение заказа',
            'html': f'''Привет! На связи azaluk.shop, ваш заказ успешно оплачен, и мы уже начали собирать его ☁️ 🍄 ❄️

Детали заказа и отслеживание доступны на сайте:
{order_url}

💌  Связаться с поддержкой вы всегда можете тут: https://t.me/azaluk_care'''
        },
        'shipped': {
            'subject': 'Заказ отправлен',
            'html': f'''Привет! На связи azaluk.shop, ваш заказ упакован и отправлен! 🎠✨

Адрес доставки: {order['delivery_address']}.
Отследить доставку и забрать её вы сможете в мобильном приложении Ozon.

💌  Контакт нашей поддержки на случай вопросов: https://t.me/azaluk_care'''
        },
        'delivered': {
            'subject': 'Теплая весточка',
            'html': f'''Привет! На связи azaluk.shop!

Надеемся, наши вещицы принесут вам радость и тепло! ☁️🍄🕊️

Будем очень рады вашему отзыву — поделитесь, как наши вещицы обжились в вашем мире? 💕
Оставить отзыв можно тут: https://t.me/azalukk/4001

Тёплой вам зимы и до новых встреч! 🍵🧦'''
        }
    }

    template = email_templates.get(action)
    
    if not template:
        return {
            'statusCode': 400,
            'headers': HEADERS,
            'body': json.dumps({'error': f'Unknown action: {action}'}),
            'isBase64Encoded': False
        }

    try:
        response = requests.post(
            'https://api.resend.com/emails',
            headers={
                'Authorization': f'Bearer {resend_api_key}',
                'Content-Type': 'application/json'
            },
            json={
                'from': 'azaluk <orders@azaluk.shop>',
                'to': [user_email],
                'subject': template['subject'],
                'html': template['html']
            },
            timeout=10
        )

        if response.status_code == 200:
            return {
                'statusCode': 200,
                'headers': HEADERS,
                'body': json.dumps({'success': True, 'email_sent': True}),
                'isBase64Encoded': False
            }
        else:
            return {
                'statusCode': response.status_code,
                'headers': HEADERS,
                'body': json.dumps({'error': 'Failed to send email', 'details': response.text}),
                'isBase64Encoded': False
            }

    except Exception as exc:
        return {
            'statusCode': 500,
            'headers': HEADERS,
            'body': json.dumps({'error': 'Email sending failed', 'details': str(exc)}),
            'isBase64Encoded': False
        }