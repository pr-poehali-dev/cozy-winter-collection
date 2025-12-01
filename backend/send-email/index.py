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
    
    items_html = ''
    for item in order['items']:
        if item['product_name']:
            items_html += f'''
                <tr>
                    <td style="padding: 12px; border-bottom: 1px solid #f0f0f0;">
                        <p style="margin: 0; color: #333; font-size: 14px;">{item['product_name']}</p>
                        <p style="margin: 4px 0 0 0; color: #999; font-size: 13px;">x {item['quantity']}</p>
                    </td>
                    <td style="padding: 12px; border-bottom: 1px solid #f0f0f0; text-align: right; color: #333;">
                        {float(item['product_price']) * item['quantity']:.0f} ₽
                    </td>
                </tr>
            '''

    email_templates = {
        'paid': {
            'subject': f'✅ Заказ {order_number} оплачен!',
            'html': f'''
                <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #fafafa;">
                    <div style="background: white; border-radius: 12px; padding: 40px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                        <h1 style="font-family: 'Georgia', 'Times New Roman', serif; color: #8B7355; font-weight: 300; font-size: 32px; margin: 0 0 12px 0; letter-spacing: 0.02em;">
                            azaluk
                        </h1>
                        <p style="color: #999; font-size: 13px; margin: 0 0 30px 0; letter-spacing: 0.05em; text-transform: uppercase;">
                            магазинчик вещиц ручной работы
                        </p>
                        
                        <div style="background: #f8f6f3; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
                            <p style="color: #8B7355; font-size: 14px; margin: 0 0 8px 0; font-weight: 500;">Заказ оплачен ✨</p>
                            <p style="color: #333; font-size: 24px; margin: 0; font-weight: 300;">{order_number}</p>
                        </div>
                        
                        <p style="color: #666; line-height: 1.7; font-size: 15px; margin-bottom: 24px;">
                            Здравствуй, {user_name}! 🤍
                        </p>
                        <p style="color: #666; line-height: 1.7; font-size: 15px; margin-bottom: 30px;">
                            Твой заказ успешно оплачен, и мы уже начали собирать его с любовью и заботой.
                        </p>
                        
                        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                            <thead>
                                <tr>
                                    <th style="padding: 12px; text-align: left; border-bottom: 2px solid #8B7355; color: #8B7355; font-size: 13px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em;">
                                        Товар
                                    </th>
                                    <th style="padding: 12px; text-align: right; border-bottom: 2px solid #8B7355; color: #8B7355; font-size: 13px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em;">
                                        Сумма
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {items_html}
                            </tbody>
                        </table>
                        
                        <div style="background: #f8f6f3; padding: 16px 20px; border-radius: 8px; margin: 24px 0;">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <span style="color: #8B7355; font-size: 16px; font-weight: 500;">Итого:</span>
                                <span style="color: #8B7355; font-size: 24px; font-weight: 300;">{float(order['amount']):.0f} ₽</span>
                            </div>
                        </div>
                        
                        <div style="background: #f8f6f3; padding: 16px 20px; border-radius: 8px; margin: 24px 0;">
                            <p style="margin: 0 0 8px 0; color: #999; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Адрес доставки</p>
                            <p style="margin: 0; color: #333; font-size: 15px;">{order['delivery_address']}</p>
                        </div>
                        
                        <div style="text-align: center; margin: 40px 0 30px 0;">
                            <a href="{order_url}" 
                               style="display: inline-block; background: #8B7355; color: white; padding: 14px 36px; 
                                      text-decoration: none; border-radius: 8px; font-weight: 400; font-size: 15px; letter-spacing: 0.02em;">
                                Отследить заказ
                            </a>
                        </div>
                        
                        <p style="color: #999; line-height: 1.6; font-size: 14px; text-align: center; margin-bottom: 0;">
                            Мы пришлём тебе письмо, когда заказ будет отправлен 📦
                        </p>
                    </div>
                    
                    <div style="text-align: center; margin-top: 30px;">
                        <p style="color: #999; font-size: 13px; margin: 0 0 8px 0;">
                            Есть вопросы?
                        </p>
                        <a href="https://t.me/azaluk_care" style="color: #8B7355; text-decoration: none; font-size: 14px;">
                            Написать в поддержку →
                        </a>
                    </div>
                </div>
            '''
        },
        'shipped': {
            'subject': f'🚚 Заказ {order_number} в пути!',
            'html': f'''
                <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #fafafa;">
                    <div style="background: white; border-radius: 12px; padding: 40px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                        <h1 style="font-family: 'Georgia', 'Times New Roman', serif; color: #8B7355; font-weight: 300; font-size: 32px; margin: 0 0 12px 0; letter-spacing: 0.02em;">
                            azaluk
                        </h1>
                        <p style="color: #999; font-size: 13px; margin: 0 0 30px 0; letter-spacing: 0.05em; text-transform: uppercase;">
                            магазинчик вещиц ручной работы
                        </p>
                        
                        <div style="background: #f8f6f3; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
                            <p style="color: #8B7355; font-size: 14px; margin: 0 0 8px 0; font-weight: 500;">Заказ отправлен 📦</p>
                            <p style="color: #333; font-size: 24px; margin: 0; font-weight: 300;">{order_number}</p>
                        </div>
                        
                        <p style="color: #666; line-height: 1.7; font-size: 15px; margin-bottom: 24px;">
                            Здравствуй, {user_name}! 🤍
                        </p>
                        <p style="color: #666; line-height: 1.7; font-size: 15px; margin-bottom: 30px;">
                            Отличные новости! Твой заказ упакован и отправлен. Скоро он будет у тебя, и ты сможешь насладиться своей покупкой ✨
                        </p>
                        
                        <div style="background: #f8f6f3; padding: 16px 20px; border-radius: 8px; margin: 24px 0;">
                            <p style="margin: 0 0 8px 0; color: #999; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Адрес доставки</p>
                            <p style="margin: 0; color: #333; font-size: 15px;">{order['delivery_address']}</p>
                        </div>
                        
                        <div style="text-align: center; margin: 40px 0 30px 0;">
                            <a href="{order_url}" 
                               style="display: inline-block; background: #8B7355; color: white; padding: 14px 36px; 
                                      text-decoration: none; border-radius: 8px; font-weight: 400; font-size: 15px; letter-spacing: 0.02em;">
                                Отследить заказ
                            </a>
                        </div>
                        
                        <p style="color: #999; line-height: 1.6; font-size: 14px; text-align: center; margin-bottom: 0;">
                            Мы пришлём тебе письмо, когда заказ будет доставлен 🎉
                        </p>
                    </div>
                    
                    <div style="text-align: center; margin-top: 30px;">
                        <p style="color: #999; font-size: 13px; margin: 0 0 8px 0;">
                            Есть вопросы?
                        </p>
                        <a href="https://t.me/azaluk_care" style="color: #8B7355; text-decoration: none; font-size: 14px;">
                            Написать в поддержку →
                        </a>
                    </div>
                </div>
            '''
        },
        'delivered': {
            'subject': f'🎉 Заказ {order_number} доставлен!',
            'html': f'''
                <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #fafafa;">
                    <div style="background: white; border-radius: 12px; padding: 40px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                        <h1 style="font-family: 'Georgia', 'Times New Roman', serif; color: #8B7355; font-weight: 300; font-size: 32px; margin: 0 0 12px 0; letter-spacing: 0.02em;">
                            azaluk
                        </h1>
                        <p style="color: #999; font-size: 13px; margin: 0 0 30px 0; letter-spacing: 0.05em; text-transform: uppercase;">
                            магазинчик вещиц ручной работы
                        </p>
                        
                        <div style="background: #f8f6f3; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
                            <p style="color: #8B7355; font-size: 14px; margin: 0 0 8px 0; font-weight: 500;">Заказ доставлен 🎉</p>
                            <p style="color: #333; font-size: 24px; margin: 0; font-weight: 300;">{order_number}</p>
                        </div>
                        
                        <p style="color: #666; line-height: 1.7; font-size: 15px; margin-bottom: 24px;">
                            Здравствуй, {user_name}! 🤍
                        </p>
                        <p style="color: #666; line-height: 1.7; font-size: 15px; margin-bottom: 30px;">
                            Твой заказ доставлен! Надеемся, что он приносит тебе радость и тепло. Спасибо, что выбрал нас ✨
                        </p>
                        
                        <div style="background: linear-gradient(135deg, #f8f6f3 0%, #f0ede8 100%); padding: 24px; border-radius: 8px; margin: 30px 0; text-align: center;">
                            <p style="color: #8B7355; font-size: 16px; margin: 0 0 16px 0; font-weight: 500;">Поделись впечатлениями</p>
                            <p style="color: #666; font-size: 14px; line-height: 1.6; margin: 0 0 20px 0;">
                                Мы будем очень рады твоему отзыву! Это помогает другим находить свои вещи с душой 💗
                            </p>
                            <a href="https://t.me/azalukk/4001" 
                               style="display: inline-block; background: white; color: #8B7355; padding: 12px 28px; 
                                      text-decoration: none; border-radius: 8px; font-weight: 400; font-size: 14px; border: 1px solid #8B7355;">
                                Оставить отзыв →
                            </a>
                        </div>
                        
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="{order_url}" 
                               style="color: #8B7355; text-decoration: none; font-size: 14px;">
                                Посмотреть детали заказа →
                            </a>
                        </div>
                        
                        <p style="color: #999; line-height: 1.6; font-size: 14px; text-align: center; margin: 30px 0 0 0;">
                            До новых встреч! 🌿
                        </p>
                    </div>
                    
                    <div style="text-align: center; margin-top: 30px;">
                        <p style="color: #999; font-size: 13px; margin: 0 0 8px 0;">
                            Есть вопросы?
                        </p>
                        <a href="https://t.me/azaluk_care" style="color: #8B7355; text-decoration: none; font-size: 14px;">
                            Написать в поддержку →
                        </a>
                    </div>
                </div>
            '''
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