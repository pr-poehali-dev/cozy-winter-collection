"""
Business: Настройка Telegram-бота и команды управления
Args: event - dict с httpMethod, queryStringParameters
      context - object с attributes: request_id, function_name
Returns: HTTP response с результатом настройки или выполнения команды
"""

import json
import os
from typing import Dict, Any
import urllib.request
import urllib.parse

def call_telegram_api(method: str, data: Dict) -> Dict:
    """Вызов Telegram Bot API"""
    token = os.environ.get('TELEGRAM_BOT_TOKEN')
    url = f'https://api.telegram.org/bot{token}/{method}'
    
    req = urllib.request.Request(
        url,
        data=json.dumps(data).encode('utf-8'),
        headers={'Content-Type': 'application/json'}
    )
    
    with urllib.request.urlopen(req, timeout=10) as response:
        return json.loads(response.read().decode('utf-8'))

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    params = event.get('queryStringParameters') or {}
    action = params.get('action', 'info')
    
    try:
        if action == 'setup_webhook':
            # Устанавливаем webhook на функцию telegram-bot
            webhook_url = 'https://functions.poehali.dev/f90640b5-f2de-4bec-94e5-67480422875a'
            
            result = call_telegram_api('setWebhook', {
                'url': webhook_url,
                'allowed_updates': ['message', 'callback_query']
            })
            
            # Устанавливаем команды бота
            commands = [
                {'command': 'orders', 'description': 'Список заказов'},
                {'command': 'new', 'description': 'Новые заказы'},
                {'command': 'paid', 'description': 'Оплаченные заказы'},
                {'command': 'processing', 'description': 'В обработке'},
                {'command': 'shipped', 'description': 'Отправленные'},
                {'command': 'help', 'description': 'Помощь'}
            ]
            
            call_telegram_api('setMyCommands', {'commands': commands})
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({
                    'success': True,
                    'webhook': result,
                    'message': 'Webhook настроен успешно!'
                })
            }
        
        elif action == 'webhook_info':
            # Получаем информацию о webhook
            result = call_telegram_api('getWebhookInfo', {})
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps(result)
            }
        
        elif action == 'send_test':
            # Отправляем тестовое сообщение
            admin_chat_id = os.environ.get('TELEGRAM_ADMIN_CHAT_ID')
            
            if not admin_chat_id:
                return {
                    'statusCode': 400,
                    'body': json.dumps({'error': 'TELEGRAM_ADMIN_CHAT_ID not set'})
                }
            
            text = "🎉 Бот настроен и работает!\n\nДоступные команды:\n"
            text += "/orders - все заказы\n"
            text += "/new - новые заказы\n"
            text += "/paid - оплаченные\n"
            text += "/processing - в обработке\n"
            text += "/shipped - отправленные\n\n"
            text += "Теперь ты будешь получать уведомления о новых заказах! ✨"
            
            result = call_telegram_api('sendMessage', {
                'chat_id': admin_chat_id,
                'text': text,
                'parse_mode': 'HTML'
            })
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({
                    'success': True,
                    'message': 'Тестовое сообщение отправлено!'
                })
            }
        
        else:
            # Информация о боте
            result = call_telegram_api('getMe', {})
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps(result)
            }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'error': str(e)})
        }