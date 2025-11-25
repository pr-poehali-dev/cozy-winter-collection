import json
import os
import psycopg2
from typing import Any, Dict


def get_db_connection():
    """Получение подключения к БД"""
    dsn = os.getenv('DATABASE_URL')
    if not dsn:
        raise ValueError('DATABASE_URL not configured')
    return psycopg2.connect(dsn)


HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    'Content-Type': 'application/json'
}


def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Получение деталей заказа и сохранение данных доставки
    Args: event с httpMethod, queryStringParameters (order_number) для GET, body для POST
    Returns: JSON с данными заказа или статус сохранения
    '''
    method = event.get('httpMethod', 'GET').upper()

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': HEADERS,
            'body': '',
            'isBase64Encoded': False
        }

    if method == 'GET':
        params = event.get('queryStringParameters', {})
        order_number = params.get('order_number', '')

        if not order_number:
            return {
                'statusCode': 400,
                'headers': HEADERS,
                'body': json.dumps({'error': 'Order number is required'}),
                'isBase64Encoded': False
            }

        conn = None
        try:
            conn = get_db_connection()
            cur = conn.cursor()
            
            cur.execute("""
                SELECT id, order_number, user_name, user_email, amount, status, 
                       delivery_service, delivery_phone, delivery_address
                FROM orders 
                WHERE order_number = %s
            """, (order_number,))
            
            order = cur.fetchone()
            
            if not order:
                cur.close()
                return {
                    'statusCode': 404,
                    'headers': HEADERS,
                    'body': json.dumps({'error': 'Order not found'}),
                    'isBase64Encoded': False
                }
            
            order_id = order[0]
            
            cur.execute("""
                SELECT product_id, product_name, product_price, quantity
                FROM order_items
                WHERE order_id = %s
            """, (order_id,))
            
            items = cur.fetchall()
            cur.close()
            
            response_data = {
                'order_number': order[1],
                'user_name': order[2],
                'user_email': order[3],
                'amount': float(order[4]),
                'status': order[5],
                'delivery_service': order[6],
                'delivery_phone': order[7],
                'delivery_address': order[8],
                'items': [
                    {
                        'product_id': item[0],
                        'product_name': item[1],
                        'product_price': float(item[2]),
                        'quantity': item[3]
                    }
                    for item in items
                ]
            }
            
            return {
                'statusCode': 200,
                'headers': HEADERS,
                'body': json.dumps(response_data),
                'isBase64Encoded': False
            }
            
        except Exception as exc:
            return {
                'statusCode': 500,
                'headers': HEADERS,
                'body': json.dumps({'error': 'Database error', 'details': str(exc)}),
                'isBase64Encoded': False
            }
        finally:
            if conn:
                conn.close()

    if method == 'POST':
        try:
            body_str = event.get('body', '{}')
            payload = json.loads(body_str)
            
            order_number = payload.get('order_number', '')
            delivery_service = payload.get('delivery_service', '')
            delivery_phone = payload.get('delivery_phone', '')
            delivery_address = payload.get('delivery_address', '')

            if not order_number or not delivery_service or not delivery_phone or not delivery_address:
                return {
                    'statusCode': 400,
                    'headers': HEADERS,
                    'body': json.dumps({'error': 'All delivery fields are required'}),
                    'isBase64Encoded': False
                }

        except (json.JSONDecodeError, ValueError) as exc:
            return {
                'statusCode': 400,
                'headers': HEADERS,
                'body': json.dumps({'error': 'Invalid request', 'details': str(exc)}),
                'isBase64Encoded': False
            }

        conn = None
        try:
            conn = get_db_connection()
            cur = conn.cursor()
            
            cur.execute("""
                UPDATE orders 
                SET delivery_service = %s, 
                    delivery_phone = %s, 
                    delivery_address = %s,
                    delivery_status = %s,
                    updated_at = CURRENT_TIMESTAMP
                WHERE order_number = %s
                RETURNING id
            """, (delivery_service, delivery_phone, delivery_address, 'pending', order_number))
            
            result = cur.fetchone()
            
            if not result:
                conn.rollback()
                cur.close()
                return {
                    'statusCode': 404,
                    'headers': HEADERS,
                    'body': json.dumps({'error': 'Order not found'}),
                    'isBase64Encoded': False
                }
            
            conn.commit()
            cur.close()

            return {
                'statusCode': 200,
                'headers': HEADERS,
                'body': json.dumps({'success': True, 'message': 'Delivery info saved'}),
                'isBase64Encoded': False
            }
            
        except Exception as exc:
            if conn:
                conn.rollback()
            return {
                'statusCode': 500,
                'headers': HEADERS,
                'body': json.dumps({'error': 'Database error', 'details': str(exc)}),
                'isBase64Encoded': False
            }
        finally:
            if conn:
                conn.close()

    return {
        'statusCode': 405,
        'headers': HEADERS,
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }
