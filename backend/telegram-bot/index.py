"""
Business: Telegram-бот для управления заказами azaluk shop
Args: event - dict с httpMethod, body, queryStringParameters
      context - object с attributes: request_id, function_name
Returns: HTTP response dict с уведомлением или списком заказов
"""

import json
import os
from typing import Dict, Any, Optional
import psycopg2
from psycopg2.extras import RealDictCursor
from datetime import datetime
from decimal import Decimal

class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            return float(obj)
        return super().default(obj)

def get_db_connection():
    """Подключение к БД"""
    dsn = os.environ.get('DATABASE_URL')
    return psycopg2.connect(dsn)

def send_telegram_message(chat_id: str, text: str, reply_markup: Optional[Dict] = None) -> bool:
    """Отправка сообщения в Telegram"""
    import urllib.request
    import urllib.parse
    
    token = os.environ.get('TELEGRAM_BOT_TOKEN')
    if not token:
        return False
    
    url = f'https://api.telegram.org/bot{token}/sendMessage'
    
    data = {
        'chat_id': chat_id,
        'text': text,
        'parse_mode': 'HTML'
    }
    
    if reply_markup:
        data['reply_markup'] = json.dumps(reply_markup)
    
    try:
        req = urllib.request.Request(
            url,
            data=json.dumps(data).encode('utf-8'),
            headers={'Content-Type': 'application/json'}
        )
        with urllib.request.urlopen(req, timeout=10) as response:
            return response.status == 200
    except Exception as e:
        print(f"Error sending telegram message: {e}")
        return False

def format_order_message(order: Dict) -> str:
    """Форматирование сообщения о заказе"""
    status_emoji = {
        'pending': '⏳',
        'paid': '✅',
        'processing': '📦',
        'shipped': '🚚',
        'delivered': '🎉',
        'cancelled': '❌'
    }
    
    delivery_emoji = {
        'pvz': '📦',
        'pickup': '🤝'
    }
    
    status = order.get('status', 'pending')
    delivery_type = order.get('delivery_type', 'pvz')
    
    msg = f"🔔 <b>Заказ #{order['order_number']}</b>\n\n"
    msg += f"{status_emoji.get(status, '📋')} Статус: <b>{status}</b>\n"
    msg += f"💰 Сумма: <b>{float(order['amount']):.0f} ₽</b>\n\n"
    
    msg += f"👤 <b>Клиент:</b>\n"
    msg += f"   • {order['user_name']}\n"
    msg += f"   • {order['user_email']}\n"
    msg += f"   • {order['user_phone']}\n"
    
    if order.get('user_telegram'):
        msg += f"   • TG: {order['user_telegram']}\n"
    
    msg += f"\n{delivery_emoji.get(delivery_type, '📦')} <b>Доставка:</b>\n"
    delivery_name = 'ПВЗ Ozon' if delivery_type == 'pvz' else 'Самовывоз'
    msg += f"   • {delivery_name}\n"
    
    if order.get('delivery_address'):
        msg += f"   • {order['delivery_address']}\n"
    
    if order.get('order_comment'):
        msg += f"\n💬 <b>Комментарий:</b>\n{order['order_comment']}\n"
    
    created = datetime.fromisoformat(str(order['created_at']))
    msg += f"\n🕐 {created.strftime('%d.%m.%Y %H:%M')}"
    
    return msg

def get_order_keyboard(order_id: int, status: str):
    """Клавиатура для управления заказом"""
    buttons = []
    
    if status == 'pending':
        buttons.append([
            {'text': '✅ Оплачен', 'callback_data': f'status_{order_id}_paid'}
        ])
    elif status == 'paid':
        buttons.append([
            {'text': '📦 В обработке', 'callback_data': f'status_{order_id}_processing'}
        ])
    elif status == 'processing':
        buttons.append([
            {'text': '🚚 Отправлен', 'callback_data': f'status_{order_id}_shipped'}
        ])
    elif status == 'shipped':
        buttons.append([
            {'text': '🎉 Доставлен', 'callback_data': f'status_{order_id}_delivered'}
        ])
    
    buttons.append([
        {'text': '❌ Отменить', 'callback_data': f'status_{order_id}_cancelled'}
    ])
    
    return {'inline_keyboard': buttons}

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    # Handle CORS OPTIONS
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
    
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    try:
        # Webhook от Telegram (callback buttons и команды)
        if method == 'POST':
            body = json.loads(event.get('body', '{}'))
            
            # Обработка текстовых команд
            if 'message' in body:
                message = body['message']
                chat_id = message['chat']['id']
                text = message.get('text', '')
                
                admin_chat_id = os.environ.get('TELEGRAM_ADMIN_CHAT_ID')
                
                # Проверяем что это админ
                if str(chat_id) != str(admin_chat_id):
                    send_telegram_message(str(chat_id), 'Доступ запрещён')
                    return {
                        'statusCode': 200,
                        'body': json.dumps({'ok': True})
                    }
                
                # Обработка команд
                if text.startswith('/'):
                    command = text.split()[0][1:]  # убираем /
                    
                    if command == 'start' or command == 'help':
                        help_text = "🤖 <b>Azaluk Shop Bot</b>\n\n"
                        help_text += "Доступные команды:\n\n"
                        help_text += "/orders - все заказы (последние 10)\n"
                        help_text += "/new - новые заказы (pending)\n"
                        help_text += "/paid - оплаченные заказы\n"
                        help_text += "/processing - в обработке\n"
                        help_text += "/shipped - отправленные\n"
                        help_text += "/help - эта справка\n\n"
                        help_text += "Нажимай на кнопки под заказами чтобы менять статусы! ✨"
                        
                        send_telegram_message(str(chat_id), help_text)
                    
                    elif command in ['orders', 'new', 'paid', 'processing', 'shipped', 'delivered']:
                        # Получаем заказы с нужным статусом
                        status_map = {
                            'orders': None,
                            'new': 'pending',
                            'paid': 'paid',
                            'processing': 'processing',
                            'shipped': 'shipped',
                            'delivered': 'delivered'
                        }
                        
                        status_filter = status_map.get(command)
                        
                        if status_filter:
                            cur.execute(
                                """
                                SELECT * FROM t_p3876556_cozy_winter_collecti.orders 
                                WHERE status = %s 
                                ORDER BY created_at DESC 
                                LIMIT 10
                                """,
                                (status_filter,)
                            )
                        else:
                            cur.execute("""
                                SELECT * FROM t_p3876556_cozy_winter_collecti.orders 
                                ORDER BY created_at DESC 
                                LIMIT 10
                            """)
                        
                        orders = cur.fetchall()
                        
                        if not orders:
                            send_telegram_message(str(chat_id), f'Заказов не найдено')
                        else:
                            for order in orders:
                                msg = format_order_message(order)
                                keyboard = get_order_keyboard(order['id'], order['status'])
                                send_telegram_message(str(chat_id), msg, keyboard)
                    
                    else:
                        send_telegram_message(str(chat_id), f'Неизвестная команда: {command}\nИспользуй /help')
                
                return {
                    'statusCode': 200,
                    'body': json.dumps({'ok': True})
                }
            
            # Обработка нажатия кнопок
            if 'callback_query' in body:
                callback = body['callback_query']
                data = callback['data']
                chat_id = callback['message']['chat']['id']
                
                # Парсим callback_data: status_ORDER_ID_NEW_STATUS
                if data.startswith('status_'):
                    parts = data.split('_')
                    order_id = int(parts[1])
                    new_status = parts[2]
                    
                    # Обновляем статус заказа
                    cur.execute(
                        """
                        UPDATE t_p3876556_cozy_winter_collecti.orders 
                        SET status = %s, updated_at = NOW() 
                        WHERE id = %s
                        RETURNING *
                        """,
                        (new_status, order_id)
                    )
                    conn.commit()
                    order = cur.fetchone()
                    
                    if order:
                        # Отправляем обновлённое сообщение
                        msg = format_order_message(order)
                        keyboard = get_order_keyboard(order_id, new_status)
                        
                        # Обновляем сообщение
                        token = os.environ.get('TELEGRAM_BOT_TOKEN')
                        message_id = callback['message']['message_id']
                        
                        import urllib.request
                        url = f'https://api.telegram.org/bot{token}/editMessageText'
                        req_data = {
                            'chat_id': chat_id,
                            'message_id': message_id,
                            'text': msg,
                            'parse_mode': 'HTML',
                            'reply_markup': keyboard
                        }
                        
                        req = urllib.request.Request(
                            url,
                            data=json.dumps(req_data).encode('utf-8'),
                            headers={'Content-Type': 'application/json'}
                        )
                        urllib.request.urlopen(req, timeout=10)
                        
                        # Отправляем ответ на callback
                        answer_url = f'https://api.telegram.org/bot{token}/answerCallbackQuery'
                        answer_data = {
                            'callback_query_id': callback['id'],
                            'text': f'Статус изменён на: {new_status}'
                        }
                        req = urllib.request.Request(
                            answer_url,
                            data=json.dumps(answer_data).encode('utf-8'),
                            headers={'Content-Type': 'application/json'}
                        )
                        urllib.request.urlopen(req, timeout=10)
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'ok': True})
            }
        
        # GET: Получить список заказов или отправить уведомление
        params = event.get('queryStringParameters') or {}
        action = params.get('action', 'list')
        
        if action == 'notify':
            # Отправляем уведомления о новых заказах
            admin_chat_id = os.environ.get('TELEGRAM_ADMIN_CHAT_ID')
            
            if not admin_chat_id:
                return {
                    'statusCode': 400,
                    'body': json.dumps({'error': 'TELEGRAM_ADMIN_CHAT_ID not set'})
                }
            
            # Получаем неотправленные заказы
            cur.execute("""
                SELECT * FROM t_p3876556_cozy_winter_collecti.orders 
                WHERE telegram_notified = FALSE 
                ORDER BY created_at DESC
            """)
            orders = cur.fetchall()
            
            sent_count = 0
            for order in orders:
                msg = format_order_message(order)
                keyboard = get_order_keyboard(order['id'], order['status'])
                
                if send_telegram_message(admin_chat_id, msg, keyboard):
                    cur.execute(
                        """
                        UPDATE t_p3876556_cozy_winter_collecti.orders 
                        SET telegram_notified = TRUE 
                        WHERE id = %s
                        """,
                        (order['id'],)
                    )
                    sent_count += 1
            
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({
                    'sent': sent_count,
                    'message': f'Отправлено уведомлений: {sent_count}'
                })
            }
        
        else:
            # Список всех заказов
            status_filter = params.get('status')
            
            query = "SELECT * FROM t_p3876556_cozy_winter_collecti.orders"
            query_params = []
            
            if status_filter:
                query += " WHERE status = %s"
                query_params.append(status_filter)
            
            query += " ORDER BY created_at DESC LIMIT 50"
            
            cur.execute(query, query_params)
            orders = cur.fetchall()
            
            # Конвертируем даты и Decimal в строки
            for order in orders:
                for key, value in order.items():
                    if isinstance(value, datetime):
                        order[key] = value.isoformat()
                    elif isinstance(value, Decimal):
                        order[key] = float(value)
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'orders': orders,
                    'count': len(orders)
                }, cls=DecimalEncoder)
            }
    
    except Exception as e:
        conn.rollback()
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'error': str(e)})
        }
    
    finally:
        cur.close()
        conn.close()