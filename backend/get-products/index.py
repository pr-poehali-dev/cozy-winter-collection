import json
import os
import psycopg2
from typing import Dict, Any, List

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Получение списка товаров с вариантами из базы данных
    Args: event - dict с httpMethod, queryStringParameters
          context - объект с request_id, function_name и др.
    Returns: HTTP response с массивом товаров
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
        
        # Получаем все товары
        cur.execute("""
            SELECT 
                id, name, description, price, category, image, 
                badge, gallery, story_description, composition, 
                sizing, video_url, video_title, in_stock, stock
            FROM t_p3876556_cozy_winter_collecti.products
            ORDER BY id
        """)
        
        products_rows = cur.fetchall()
        products = []
        
        for row in products_rows:
            product_id, name, description, price, category, image, badge, gallery, story_desc, composition, sizing, video_url, video_title, in_stock, stock = row
            
            product = {
                'id': product_id,
                'name': name,
                'description': description,
                'price': float(price) if price else 0,
                'category': category,
                'image': image,
                'badge': badge,
                'gallery': gallery if gallery else [],
                'storyDescription': story_desc,
                'composition': composition,
                'sizing': sizing,
                'videoUrl': video_url,
                'videoTitle': video_title,
                'in_stock': in_stock,
                'stock': stock
            }
            
            # Получаем варианты товара
            cur.execute("""
                SELECT 
                    id, sku, size, color, stock, price, weight, 
                    description, composition, sizing, gallery
                FROM t_p3876556_cozy_winter_collecti.product_goods
                WHERE product_id = %s
                ORDER BY id
            """, (product_id,))
            
            goods_rows = cur.fetchall()
            
            if goods_rows:
                variants = []
                for goods_row in goods_rows:
                    goods_id, sku, size, color, goods_stock, goods_price, weight, goods_desc, goods_comp, goods_sizing, goods_gallery = goods_row
                    
                    variant = {
                        'id': sku,
                        'name': color or size,
                        'sku': sku,
                        'stock': goods_stock
                    }
                    
                    if goods_price:
                        variant['price'] = float(goods_price)
                    if size:
                        variant['size'] = size
                    if color:
                        variant['color'] = color
                    if weight:
                        variant['weight'] = weight
                    if goods_desc:
                        variant['description'] = goods_desc
                    if goods_comp:
                        variant['composition'] = goods_comp
                    if goods_sizing:
                        variant['sizing'] = goods_sizing
                    if goods_gallery:
                        variant['gallery'] = goods_gallery
                    
                    variants.append(variant)
                
                product['variants'] = variants
            
            products.append(product)
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps(products, ensure_ascii=False),
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