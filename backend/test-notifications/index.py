"""
Business: Тестирование цепочки уведомлений (Telegram + Email)
Args: event - dict с httpMethod, queryStringParameters
      context - object с attributes: request_id, function_name
Returns: HTTP response с результатом тестов
"""

import json
import os
from typing import Dict, Any
import urllib.request
import urllib.parse

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': ''
        }
    
    results = {
        'telegram_bot_token': '✅' if os.environ.get('TELEGRAM_BOT_TOKEN') else '❌',
        'telegram_admin_chat_id': '✅' if os.environ.get('TELEGRAM_ADMIN_CHAT_ID') else '❌',
        'resend_api_key': '✅' if os.environ.get('RESEND_API_KEY') else '❌',
        'database_url': '✅' if os.environ.get('DATABASE_URL') else '❌',
        'robokassa_login': '✅' if os.environ.get('ROBOKASSA_MERCHANT_LOGIN') else '❌',
        'robokassa_pass1': '✅' if os.environ.get('ROBOKASSA_PASSWORD_1') else '❌',
        'robokassa_pass2': '✅' if os.environ.get('ROBOKASSA_PASSWORD_2') else '❌',
    }
    
    # Тестируем отправку в Telegram
    telegram_test = {'status': 'not_tested', 'message': ''}
    try:
        token = os.environ.get('TELEGRAM_BOT_TOKEN')
        chat_id = os.environ.get('TELEGRAM_ADMIN_CHAT_ID')
        
        if token and chat_id:
            url = f'https://api.telegram.org/bot{token}/sendMessage'
            data = {
                'chat_id': chat_id,
                'text': '🧪 <b>Тестовое уведомление</b>\n\nЭто тестовое сообщение для проверки работы системы уведомлений.\n\n✅ Telegram работает!',
                'parse_mode': 'HTML'
            }
            
            req = urllib.request.Request(
                url,
                data=json.dumps(data).encode('utf-8'),
                headers={'Content-Type': 'application/json'}
            )
            
            with urllib.request.urlopen(req, timeout=10) as response:
                if response.status == 200:
                    telegram_test = {'status': '✅ success', 'message': 'Сообщение отправлено в Telegram'}
                else:
                    telegram_test = {'status': '❌ failed', 'message': f'HTTP {response.status}'}
        else:
            telegram_test = {'status': '❌ failed', 'message': 'Не настроены TELEGRAM_BOT_TOKEN или TELEGRAM_ADMIN_CHAT_ID'}
    except Exception as e:
        telegram_test = {'status': '❌ failed', 'message': str(e)}
    
    # Тестируем webhook info
    webhook_info = {'status': 'not_tested', 'message': ''}
    try:
        token = os.environ.get('TELEGRAM_BOT_TOKEN')
        if token:
            url = f'https://api.telegram.org/bot{token}/getWebhookInfo'
            req = urllib.request.Request(url)
            
            with urllib.request.urlopen(req, timeout=10) as response:
                data = json.loads(response.read().decode('utf-8'))
                result = data.get('result', {})
                
                webhook_info = {
                    'status': '✅ configured' if result.get('url') else '⚠️ not_configured',
                    'url': result.get('url', 'не настроен'),
                    'pending_update_count': result.get('pending_update_count', 0),
                    'last_error_date': result.get('last_error_date'),
                    'last_error_message': result.get('last_error_message')
                }
    except Exception as e:
        webhook_info = {'status': '❌ failed', 'message': str(e)}
    
    # Тестируем Email (через send-email функцию)
    email_test = {'status': 'not_tested', 'message': ''}
    try:
        # Не будем отправлять реальный email в тесте, только проверим доступность функции
        email_test = {'status': '⚠️ skipped', 'message': 'Проверь вручную через заказ'}
    except Exception as e:
        email_test = {'status': '❌ failed', 'message': str(e)}
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({
            'secrets': results,
            'telegram_send_test': telegram_test,
            'telegram_webhook': webhook_info,
            'email_test': email_test,
            'recommendations': [
                '1. Если Telegram webhook не настроен, открой: https://functions.poehali.dev/aa1ac8a7-52d8-4fd3-b9f3-54fae1e02751?action=setup_webhook',
                '2. После настройки webhook отправь боту команду /admin_join',
                '3. Проверь что все секреты настроены (все должны быть ✅)',
                '4. Сделай тестовый заказ на сайте, чтобы проверить полную цепочку'
            ]
        }, ensure_ascii=False, indent=2)
    }
