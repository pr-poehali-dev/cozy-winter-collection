import json
import os
import requests
from typing import Any, Dict


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
    user_email = query_params.get('user_email', '')
    user_name = query_params.get('user_name', 'Друг')

    if not action or not order_number or not user_email:
        return {
            'statusCode': 400,
            'headers': HEADERS,
            'body': json.dumps({'error': 'Missing required parameters'}),
            'isBase64Encoded': False
        }

    order_url = f'https://azaluk.shop/order-success?order={order_number}'

    email_templates = {
        'paid': {
            'subject': f'✅ Заказ {order_number} оплачен!',
            'html': f'''
                <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h1 style="color: #8B7355; font-weight: 300; font-size: 28px;">Спасибо за заказ! 🎉</h1>
                    <p style="color: #666; line-height: 1.6;">Здравствуй, {user_name}!</p>
                    <p style="color: #666; line-height: 1.6;">
                        Твой заказ <strong>{order_number}</strong> успешно оплачен. 
                        Мы уже начали собирать его с любовью и заботой ✨
                    </p>
                    <div style="margin: 30px 0;">
                        <a href="{order_url}" 
                           style="display: inline-block; background: #8B7355; color: white; padding: 12px 30px; 
                                  text-decoration: none; border-radius: 8px; font-weight: 500;">
                            Посмотреть заказ
                        </a>
                    </div>
                    <p style="color: #666; line-height: 1.6;">
                        Мы пришлём тебе письмо, когда заказ будет отправлен 📦
                    </p>
                    <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
                    <p style="color: #999; font-size: 14px;">
                        С любовью, команда azaluk 🤍<br>
                        <a href="https://t.me/azaluk_care" style="color: #8B7355;">Написать в поддержку</a>
                    </p>
                </div>
            '''
        },
        'shipped': {
            'subject': f'🚚 Заказ {order_number} в пути!',
            'html': f'''
                <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h1 style="color: #8B7355; font-weight: 300; font-size: 28px;">Твой заказ отправлен! 🚚</h1>
                    <p style="color: #666; line-height: 1.6;">Здравствуй, {user_name}!</p>
                    <p style="color: #666; line-height: 1.6;">
                        Отличные новости! Заказ <strong>{order_number}</strong> отправлен и уже мчится к тебе.
                    </p>
                    <div style="margin: 30px 0;">
                        <a href="{order_url}" 
                           style="display: inline-block; background: #8B7355; color: white; padding: 12px 30px; 
                                  text-decoration: none; border-radius: 8px; font-weight: 500;">
                            Отследить заказ
                        </a>
                    </div>
                    <p style="color: #666; line-height: 1.6;">
                        Скоро он будет у тебя, и ты сможешь насладиться своей покупкой ✨
                    </p>
                    <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
                    <p style="color: #999; font-size: 14px;">
                        С любовью, команда azaluk 🤍<br>
                        <a href="https://t.me/azaluk_care" style="color: #8B7355;">Написать в поддержку</a>
                    </p>
                </div>
            '''
        },
        'delivered': {
            'subject': f'🎉 Заказ {order_number} доставлен!',
            'html': f'''
                <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h1 style="color: #8B7355; font-weight: 300; font-size: 28px;">Твой заказ у тебя! 🎉</h1>
                    <p style="color: #666; line-height: 1.6;">Здравствуй, {user_name}!</p>
                    <p style="color: #666; line-height: 1.6;">
                        Заказ <strong>{order_number}</strong> доставлен! Надеемся, что он приносит тебе радость и тепло 🤍
                    </p>
                    <p style="color: #666; line-height: 1.6;">
                        Если тебе понравилось — мы будем очень рады твоему отзыву! 
                        <a href="https://t.me/azalukk/4001" style="color: #8B7355;">Поделиться впечатлениями →</a>
                    </p>
                    <div style="margin: 30px 0;">
                        <a href="{order_url}" 
                           style="display: inline-block; background: #8B7355; color: white; padding: 12px 30px; 
                                  text-decoration: none; border-radius: 8px; font-weight: 500;">
                            Посмотреть заказ
                        </a>
                    </div>
                    <p style="color: #666; line-height: 1.6;">
                        Спасибо, что выбрал нас! До новых встреч ✨
                    </p>
                    <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
                    <p style="color: #999; font-size: 14px;">
                        С любовью, команда azaluk 🤍<br>
                        <a href="https://t.me/azaluk_care" style="color: #8B7355;">Написать в поддержку</a>
                    </p>
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
