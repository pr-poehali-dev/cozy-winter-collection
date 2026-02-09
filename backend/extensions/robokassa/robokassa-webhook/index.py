import json
import os
import hashlib
import psycopg2
import urllib.request
from urllib.parse import parse_qs
from psycopg2.extras import RealDictCursor
from datetime import datetime
from decimal import Decimal


def calculate_signature(*args) -> str:
    """Создание MD5 подписи по документации Robokassa"""
    joined = ':'.join(str(arg) for arg in args)
    return hashlib.md5(joined.encode()).hexdigest().upper()


def get_db_connection():
    """Получение подключения к БД"""
    dsn = os.environ.get('DATABASE_URL')
    if not dsn:
        raise ValueError('DATABASE_URL not configured')
    return psycopg2.connect(dsn)


def send_telegram_message(chat_id: str, text: str, reply_markup: dict = None) -> bool:
    """Отправка сообщения в Telegram"""
    token = os.environ.get('TELEGRAM_BOT_TOKEN')
    if not token:
        print('[WEBHOOK] TELEGRAM_BOT_TOKEN not set, skipping notification')
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
        print(f'[WEBHOOK] Error sending telegram: {e}')
        return False


def format_order_message(order: dict, items: list = None) -> str:
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
    
    if items:
        msg += f"🛍 <b>Состав заказа:</b>\n"
        for item in items:
            msg += f"   • {item['product_name']} x{item['quantity']} — {float(item['product_price']):.0f} ₽\n"
        msg += "\n"
    
    is_anonymous = order.get('is_anonymous', False)
    if is_anonymous:
        msg += f"🎭 <b>АНОНИМНЫЙ ЗАКАЗ</b> (без имени на упаковке)\n\n"
    
    msg += f"👤 <b>Клиент:</b>\n"
    msg += f"   • {order['user_name']}\n"
    msg += f"   • {order['user_email']}\n"
    msg += f"   • {order.get('user_phone', '')}\n"
    
    msg += f"\n{delivery_emoji.get(delivery_type, '📦')} <b>Доставка:</b>\n"
    delivery_name = 'ПВЗ Ozon' if delivery_type == 'pvz' else 'Самовывоз'
    msg += f"   • {delivery_name}\n"
    
    if order.get('delivery_address'):
        msg += f"   • {order['delivery_address']}\n"
    
    if order.get('order_comment'):
        msg += f"\n💬 <b>Комментарий:</b>\n{order['order_comment']}\n"
    
    created = datetime.fromisoformat(str(order['created_at']))
    msg += f"\n🕐 Создан: {created.strftime('%d.%m.%Y %H:%M')} МСК"
    
    if order.get('paid_at'):
        paid = datetime.fromisoformat(str(order['paid_at']))
        msg += f"\n✅ Оплачен: {paid.strftime('%d.%m.%Y %H:%M')} МСК"
    
    return msg


def get_order_keyboard(order_id: int, status: str):
    """Клавиатура для управления заказом"""
    buttons = []
    
    if status == 'paid':
        buttons.append([{'text': '📦 В обработке', 'callback_data': f'status_{order_id}_processing'}])
    elif status == 'processing':
        buttons.append([{'text': '🚚 Отправлен', 'callback_data': f'status_{order_id}_shipped'}])
    elif status == 'shipped':
        buttons.append([{'text': '🎉 Доставлен', 'callback_data': f'status_{order_id}_delivered'}])
    
    return {'inline_keyboard': buttons}


HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'text/plain'
}


def handler(event: dict, context) -> dict:
    '''
    Result URL вебхук от Robokassa для подтверждения оплаты.
    Robokassa отправляет: OutSum, InvId, SignatureValue
    Returns: OK{InvId} если подпись верна и заказ обновлён
    '''
    method = event.get('httpMethod', 'GET').upper()

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': HEADERS, 'body': '', 'isBase64Encoded': False}

    password_2 = os.environ.get('ROBOKASSA_PASSWORD_2')
    if not password_2:
        return {'statusCode': 500, 'headers': HEADERS, 'body': 'Configuration error', 'isBase64Encoded': False}

    # Парсинг параметров из body или query string
    params = {}
    body = event.get('body', '')

    if method == 'POST' and body:
        if event.get('isBase64Encoded', False):
            import base64
            body = base64.b64decode(body).decode('utf-8')
        parsed = parse_qs(body)
        params = {k: v[0] for k, v in parsed.items()}

    if not params:
        params = event.get('queryStringParameters') or {}

    out_sum = params.get('OutSum', params.get('out_summ', ''))
    inv_id = params.get('InvId', params.get('inv_id', ''))
    signature_value = params.get('SignatureValue', params.get('crc', '')).upper()

    if not out_sum or not inv_id or not signature_value:
        return {'statusCode': 400, 'headers': HEADERS, 'body': 'Missing required parameters', 'isBase64Encoded': False}

    # Проверка подписи
    expected_signature = calculate_signature(out_sum, inv_id, password_2)
    if signature_value != expected_signature:
        return {'statusCode': 400, 'headers': HEADERS, 'body': 'Invalid signature', 'isBase64Encoded': False}

    # Обновление статуса заказа
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)

    cur.execute("""
        UPDATE orders
        SET status = 'paid', paid_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
        WHERE robokassa_inv_id = %s AND status = 'pending'
        RETURNING *
    """, (int(inv_id),))

    order = cur.fetchone()

    if not order:
        # Проверяем, может уже оплачен
        cur.execute("SELECT status FROM orders WHERE robokassa_inv_id = %s", (int(inv_id),))
        existing = cur.fetchone()
        conn.close()

        if existing and existing['status'] == 'paid':
            return {'statusCode': 200, 'headers': HEADERS, 'body': f'OK{inv_id}', 'isBase64Encoded': False}
        return {'statusCode': 404, 'headers': HEADERS, 'body': 'Order not found', 'isBase64Encoded': False}

    conn.commit()
    
    # Получаем товары заказа
    cur.execute("""
        SELECT product_name, product_price, quantity 
        FROM order_items 
        WHERE order_id = %s
    """, (order['id'],))
    items = cur.fetchall()
    
    cur.close()
    conn.close()
    
    print(f"[WEBHOOK] Order #{order['order_number']} paid, sending Telegram notification")
    
    # Отправляем уведомление в Telegram
    admin_chat_id = os.environ.get('TELEGRAM_ADMIN_CHAT_ID')
    if admin_chat_id:
        message = format_order_message(dict(order), [dict(item) for item in items])
        keyboard = get_order_keyboard(order['id'], 'paid')
        send_telegram_message(admin_chat_id, message, keyboard)
    else:
        print('[WEBHOOK] TELEGRAM_ADMIN_CHAT_ID not set, skipping notification')

    return {'statusCode': 200, 'headers': HEADERS, 'body': f'OK{inv_id}', 'isBase64Encoded': False}