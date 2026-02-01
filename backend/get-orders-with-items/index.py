import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: dict, context) -> dict:
    '''Получить все заказы с информацией о товарах для админа'''
    
    method = event.get('httpMethod', 'GET')
    
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
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    conn = None
    try:
        dsn = os.environ.get('DATABASE_URL')
        conn = psycopg2.connect(dsn)
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        query = '''
            SELECT 
                o.id as order_id,
                o.order_number,
                o.user_name,
                o.user_email,
                o.user_phone,
                o.amount as total_amount,
                o.status as payment_status,
                o.delivery_type,
                o.delivery_address,
                o.delivery_cost,
                o.delivery_status,
                o.recipient_phone,
                o.is_gift,
                o.is_anonymous,
                o.order_comment,
                o.user_telegram,
                o.created_at as order_created_at,
                o.paid_at,
                oi.id as item_id,
                oi.product_id,
                oi.product_name,
                oi.product_price,
                oi.quantity,
                (oi.product_price * oi.quantity) as item_total
            FROM orders o
            LEFT JOIN order_items oi ON o.id = oi.order_id
            ORDER BY o.created_at DESC, oi.id ASC
        '''
        
        cur.execute(query)
        rows = cur.fetchall()
        
        orders_dict = {}
        for row in rows:
            order_id = row['order_id']
            
            if order_id not in orders_dict:
                orders_dict[order_id] = {
                    'order_id': order_id,
                    'order_number': row['order_number'],
                    'user_name': row['user_name'],
                    'user_email': row['user_email'],
                    'user_phone': row['user_phone'],
                    'total_amount': float(row['total_amount']) if row['total_amount'] else 0,
                    'payment_status': row['payment_status'],
                    'delivery_type': row['delivery_type'],
                    'delivery_address': row['delivery_address'],
                    'delivery_cost': float(row['delivery_cost']) if row['delivery_cost'] else 0,
                    'delivery_status': row['delivery_status'],
                    'recipient_phone': row['recipient_phone'],
                    'is_gift': row['is_gift'],
                    'is_anonymous': row['is_anonymous'],
                    'order_comment': row['order_comment'],
                    'user_telegram': row['user_telegram'],
                    'order_created_at': row['order_created_at'].isoformat() if row['order_created_at'] else None,
                    'paid_at': row['paid_at'].isoformat() if row['paid_at'] else None,
                    'items': []
                }
            
            if row['item_id']:
                orders_dict[order_id]['items'].append({
                    'item_id': row['item_id'],
                    'product_id': row['product_id'],
                    'product_name': row['product_name'],
                    'product_price': float(row['product_price']) if row['product_price'] else 0,
                    'quantity': row['quantity'],
                    'item_total': float(row['item_total']) if row['item_total'] else 0
                })
        
        orders_list = list(orders_dict.values())
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'orders': orders_list,
                'total': len(orders_list)
            }, ensure_ascii=False)
        }
        
    except Exception as e:
        if conn:
            conn.close()
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)})
        }
