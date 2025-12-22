import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Получение списка отзывов из базы данных
    Args: event - dict с httpMethod
          context - объект с request_id, function_name и др.
    Returns: HTTP response с массивом отзывов
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    conn = None
    
    try:
        dsn = os.environ['DATABASE_URL']
        conn = psycopg2.connect(dsn)
        cur = conn.cursor()
        
        cur.execute("""
            SELECT id, type, text, image, author, 
                   COALESCE(TO_CHAR(created_at, 'DD.MM.YY'), '—') as time
            FROM t_p3876556_cozy_winter_collecti.reviews
            WHERE is_visible = true
            ORDER BY display_order, id
        """)
        
        rows = cur.fetchall()
        reviews = []
        
        for row in rows:
            review_id, review_type, text, image, author, time_str = row
            
            review = {
                'id': review_id,
                'type': review_type,
                'author': author,
                'time': time_str
            }
            
            if text:
                review['text'] = text
            if image:
                review['image'] = image
            
            reviews.append(review)
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps(reviews, ensure_ascii=False),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        if conn:
            conn.close()
        
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'error': 'Internal server error',
                'message': str(e)
            }),
            'isBase64Encoded': False
        }