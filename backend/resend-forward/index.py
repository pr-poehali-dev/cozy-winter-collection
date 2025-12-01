"""
Business: Webhook для пересылки входящих писем с orders@azaluk.shop на личную почту
Args: event - dict с httpMethod, body (from, to, subject, html, text от Resend Inbound)
Returns: success или error
"""

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
    """
    Принимает входящие письма от Resend и пересылает их на личную почту
    """
    method = event.get('httpMethod', 'POST').upper()

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

    try:
        body_str = event.get('body', '{}')
        payload = json.loads(body_str)
        
        # Логируем входящие данные для отладки
        print(f"DEBUG: Received payload: {json.dumps(payload, ensure_ascii=False)[:500]}")
        
        # Resend Inbound Webhook данные (может быть вложенная структура data)
        data = payload.get('data', payload)
        
        from_email = data.get('from', 'unknown')
        to_email = data.get('to', 'orders@azaluk.shop')
        subject = data.get('subject', 'Без темы')
        html_content = data.get('html', '')
        text_content = data.get('text', '')
        
        print(f"DEBUG: Forwarding email from {from_email} to azali.halimova@gmail.com")
        
        # Формируем письмо для пересылки
        forward_subject = f"[Входящее на {to_email}] {subject}"
        
        # Формируем HTML с информацией об отправителе
        text_as_html = text_content.replace('\n', '<br>') if text_content else ''
        content_html = html_content if html_content else text_as_html
        
        forward_html = f"""
        <div style="background: #f5f5f5; padding: 15px; margin-bottom: 20px; border-left: 4px solid #4CAF50;">
            <p style="margin: 0; font-size: 14px; color: #666;">
                <strong>От:</strong> {from_email}<br>
                <strong>Кому:</strong> {to_email}<br>
                <strong>Тема:</strong> {subject}
            </p>
        </div>
        <div>
            {content_html}
        </div>
        """
        
        # Отправляем письмо через Resend API
        response = requests.post(
            'https://api.resend.com/emails',
            headers={
                'Authorization': f'Bearer {resend_api_key}',
                'Content-Type': 'application/json'
            },
            json={
                'from': 'orders@azaluk.shop',
                'to': ['azali.halimova@gmail.com'],
                'subject': forward_subject,
                'html': forward_html,
                'reply_to': from_email
            },
            timeout=10
        )

        if response.status_code == 200:
            return {
                'statusCode': 200,
                'headers': HEADERS,
                'body': json.dumps({
                    'success': True,
                    'message': 'Email forwarded successfully',
                    'from': from_email,
                    'to': 'azali.halimova@gmail.com'
                }),
                'isBase64Encoded': False
            }
        else:
            return {
                'statusCode': response.status_code,
                'headers': HEADERS,
                'body': json.dumps({
                    'error': 'Failed to forward email',
                    'details': response.text
                }),
                'isBase64Encoded': False
            }

    except Exception as exc:
        return {
            'statusCode': 500,
            'headers': HEADERS,
            'body': json.dumps({
                'error': 'Email forwarding failed',
                'details': str(exc)
            }),
            'isBase64Encoded': False
        }