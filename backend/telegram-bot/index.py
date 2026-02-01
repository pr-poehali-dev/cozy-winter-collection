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

def send_to_all_admins(cur, text: str, reply_markup: Optional[Dict] = None):
    """Отправка сообщения всем активным администраторам"""
    cur.execute("""
        SELECT chat_id FROM t_p3876556_cozy_winter_collecti.bot_admins 
        WHERE is_active = TRUE
    """)
    admins = cur.fetchall()
    
    for admin in admins:
        send_telegram_message(str(admin['chat_id']), text, reply_markup)

def format_order_message(order: Dict, items: list = None) -> str:
    """Форматирование сообщения о заказе с поддержкой анонимных заказов и подарков"""
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
    
    # Состав заказа
    if items:
        msg += f"🛍 <b>Состав заказа:</b>\n"
        for item in items:
            msg += f"   • {item['product_name']} x{item['quantity']} — {float(item['product_price']):.0f} ₽\n"
        msg += "\n"
    
    # Флаги заказа
    is_anonymous = order.get('is_anonymous', False)
    is_gift = order.get('is_gift', False)
    
    if is_anonymous:
        msg += f"🎭 <b>АНОНИМНЫЙ ЗАКАЗ</b> (без имени на упаковке)\n\n"
    
    if is_gift:
        msg += f"🎁 <b>ЭТО ПОДАРОК</b>\n\n"
    
    msg += f"👤 <b>Клиент:</b>\n"
    msg += f"   • {order['user_name']}\n"
    msg += f"   • {order['user_email']}\n"
    msg += f"   • {order['user_phone']}\n"
    
    # Если подарок - показываем контакты получателя
    if is_gift:
        msg += f"\n🎁 <b>Получатель подарка:</b>\n"
        if order.get('recipient_phone'):
            msg += f"   • {order['recipient_phone']}\n"
        if order.get('recipient_address'):
            msg += f"   • {order['recipient_address']}\n"
    
    msg += f"\n{delivery_emoji.get(delivery_type, '📦')} <b>Доставка:</b>\n"
    delivery_name = 'ПВЗ Ozon' if delivery_type == 'pvz' else 'Самовывоз'
    msg += f"   • {delivery_name}\n"
    
    if order.get('delivery_address') and not is_gift:
        msg += f"   • {order['delivery_address']}\n"
    
    if order.get('order_comment'):
        msg += f"\n💬 <b>Комментарий:</b>\n{order['order_comment']}\n"
    
    # Время создания
    created = datetime.fromisoformat(str(order['created_at']))
    msg += f"\n🕐 Создан: {created.strftime('%d.%m.%Y %H:%M')} МСК"
    
    # Время оплаты
    if order.get('paid_at'):
        paid = datetime.fromisoformat(str(order['paid_at']))
        msg += f"\n✅ Оплачен: {paid.strftime('%d.%m.%Y %H:%M')} МСК"
    
    return msg

def get_order_keyboard(order_id: int, status: str):
    """Клавиатура для управления заказом"""
    buttons = []
    
    if status == 'paid':
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
                
                # Проверяем есть ли пользователь в списке админов
                cur.execute("""
                    SELECT * FROM t_p3876556_cozy_winter_collecti.bot_admins 
                    WHERE chat_id = %s AND is_active = TRUE
                """, (str(chat_id),))
                is_admin = cur.fetchone()
                
                # Обработка команд
                if text.startswith('/'):
                    command = text.split()[0][1:]  # убираем /
                    
                    # Команда /admin_join доступна всем
                    if command == 'admin_join':
                        username = message.get('from', {}).get('username', '')
                        first_name = message.get('from', {}).get('first_name', '')
                        last_name = message.get('from', {}).get('last_name', '')
                        
                        # Добавляем нового админа
                        cur.execute("""
                            INSERT INTO t_p3876556_cozy_winter_collecti.bot_admins 
                            (chat_id, username, first_name, last_name, is_active)
                            VALUES (%s, %s, %s, %s, TRUE)
                            ON CONFLICT (chat_id) DO UPDATE 
                            SET is_active = TRUE, username = %s, first_name = %s, last_name = %s
                        """, (str(chat_id), username, first_name, last_name, username, first_name, last_name))
                        conn.commit()
                        
                        welcome_msg = f"✅ Добро пожаловать, {first_name}!\n\n"
                        welcome_msg += "Ты добавлен в список администраторов.\n"
                        welcome_msg += "Теперь тебе будут приходить уведомления о новых заказах!\n\n"
                        welcome_msg += "Используй /help чтобы увидеть доступные команды."
                        
                        send_telegram_message(str(chat_id), welcome_msg)
                        
                        return {
                            'statusCode': 200,
                            'body': json.dumps({'ok': True})
                        }
                    
                    # Остальные команды только для админов
                    if not is_admin:
                        send_telegram_message(str(chat_id), '❌ Доступ запрещён. Используй /admin_join чтобы присоединиться.')
                        return {
                            'statusCode': 200,
                            'body': json.dumps({'ok': True})
                        }
                    
                    if command == 'start' or command == 'help':
                        help_text = "🤖 <b>Azaluk Shop Bot</b>\n\n"
                        help_text += "Доступные команды:\n\n"
                        help_text += "/orders - все заказы (последние 10)\n"
                        help_text += "/paid - оплаченные заказы\n"
                        help_text += "/processing - в обработке\n"
                        help_text += "/shipped - отправленные\n"
                        help_text += "/cancel_order ORD-XXX - отменить заказ\n"
                        help_text += "/admin_list - список администраторов\n"
                        help_text += "/help - эта справка\n\n"
                        help_text += "Нажимай на кнопки под заказами чтобы менять статусы! ✨"
                        
                        send_telegram_message(str(chat_id), help_text)
                    
                    elif command == 'admin_list':
                        cur.execute("""
                            SELECT chat_id, username, first_name, last_name, joined_at, is_active
                            FROM t_p3876556_cozy_winter_collecti.bot_admins
                            ORDER BY joined_at DESC
                        """)
                        admins = cur.fetchall()
                        
                        if not admins:
                            send_telegram_message(str(chat_id), 'Администраторов не найдено')
                        else:
                            admin_text = "👥 <b>Список администраторов:</b>\n\n"
                            for idx, admin in enumerate(admins, 1):
                                status = '✅' if admin['is_active'] else '❌'
                                name = admin['first_name'] or 'Без имени'
                                username = f"@{admin['username']}" if admin['username'] else ''
                                joined = datetime.fromisoformat(str(admin['joined_at']))
                                admin_text += f"{idx}. {status} {name} {username}\n"
                                admin_text += f"   Присоединился: {joined.strftime('%d.%m.%Y')}\n\n"
                            
                            send_telegram_message(str(chat_id), admin_text)
                    
                    elif command in ['orders', 'paid', 'processing', 'shipped', 'delivered']:
                        # Получаем заказы с нужным статусом
                        status_map = {
                            'orders': None,
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
                                # Получаем items для каждого заказа
                                cur.execute(
                                    """
                                    SELECT product_name, product_price, quantity 
                                    FROM t_p3876556_cozy_winter_collecti.order_items 
                                    WHERE order_id = %s
                                    """,
                                    (order['id'],)
                                )
                                items = cur.fetchall()
                                msg = format_order_message(order, items)
                                keyboard = get_order_keyboard(order['id'], order['status'])
                                send_telegram_message(str(chat_id), msg, keyboard)
                    
                    elif command == 'cancel_order':
                        # Отмена заказа: /cancel_order ORD-20251201-123456
                        parts = text.split()
                        if len(parts) < 2:
                            send_telegram_message(str(chat_id), '❌ Укажи номер заказа: /cancel_order ORD-XXXXXXXX-XXXXXX')
                        else:
                            order_number = parts[1]
                            cur.execute(
                                """
                                UPDATE t_p3876556_cozy_winter_collecti.orders 
                                SET status = 'cancelled', updated_at = NOW() 
                                WHERE order_number = %s
                                RETURNING *
                                """,
                                (order_number,)
                            )
                            conn.commit()
                            order = cur.fetchone()
                            
                            if order:
                                send_telegram_message(str(chat_id), f'✅ Заказ {order_number} отменён')
                            else:
                                send_telegram_message(str(chat_id), f'❌ Заказ {order_number} не найден')
                    
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
                
                # Проверяем что это админ
                cur.execute("""
                    SELECT * FROM t_p3876556_cozy_winter_collecti.bot_admins 
                    WHERE chat_id = %s AND is_active = TRUE
                """, (str(chat_id),))
                is_admin = cur.fetchone()
                
                if not is_admin:
                    return {
                        'statusCode': 200,
                        'body': json.dumps({'ok': True})
                    }
                
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
                        delivery_type = order.get('delivery_type', 'pvz')
                        
                        # Отправляем email при смене статуса на shipped или delivered
                        should_send_email = False
                        email_action = None
                        
                        if new_status == 'shipped' and delivery_type == 'pvz':
                            should_send_email = True
                            email_action = 'shipped'
                        elif new_status == 'delivered':
                            should_send_email = True
                            email_action = 'delivered'
                        
                        if should_send_email and email_action:
                            try:
                                import urllib.request
                                from urllib.parse import quote
                                
                                email_url = f'https://functions.poehali.dev/76b36dee-db70-4316-b6a8-fed039d8df8c?action={email_action}&order_number={quote(order["order_number"])}'
                                req = urllib.request.Request(email_url, method='GET')
                                urllib.request.urlopen(req, timeout=5)
                            except Exception as email_error:
                                print(f"Failed to send email notification: {email_error}")
                        
                        # Получаем items для обновлённого сообщения
                        cur.execute(
                            """
                            SELECT product_name, product_price, quantity 
                            FROM t_p3876556_cozy_winter_collecti.order_items 
                            WHERE order_id = %s
                            """,
                            (order_id,)
                        )
                        items = cur.fetchall()
                        
                        # Отправляем обновлённое сообщение
                        msg = format_order_message(order, items)
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
            # Отправляем уведомления о новых заказах всем админам
            
            # Получаем только оплаченные неотправленные заказы
            cur.execute("""
                SELECT * FROM t_p3876556_cozy_winter_collecti.orders 
                WHERE telegram_notified = FALSE AND status = 'paid'
                ORDER BY created_at DESC
            """)
            orders = cur.fetchall()
            
            sent_count = 0
            for order in orders:
                # Получаем items для заказа
                cur.execute(
                    """
                    SELECT product_name, product_price, quantity 
                    FROM t_p3876556_cozy_winter_collecti.order_items 
                    WHERE order_id = %s
                    """,
                    (order['id'],)
                )
                items = cur.fetchall()
                
                msg = format_order_message(order, items)
                keyboard = get_order_keyboard(order['id'], order['status'])
                
                send_to_all_admins(cur, msg, keyboard)
                
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