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
        
        # Resend Inbound Webhook данные
        data = payload.get('data', payload)
        
        email_id = data.get('email_id')
        from_email = data.get('from', 'unknown')
        to_list = data.get('to', [])
        to_email = to_list[0] if isinstance(to_list, list) and to_list else 'orders@azaluk.shop'
        subject = data.get('subject', 'Без темы')
        
        print(f"DEBUG: Processing email {email_id} from {from_email}")
        
        # Получаем полное содержимое письма через Resend API
        email_response = requests.get(
            f'https://api.resend.com/emails/{email_id}',
            headers={
                'Authorization': f'Bearer {resend_api_key}'
            },
            timeout=10
        )
        
        if email_response.status_code != 200:
            print(f"ERROR: Failed to fetch email content: {email_response.text}")
            # Отправляем хотя бы метаданные
            html_content = f'<p>Не удалось получить содержимое письма. Email ID: {email_id}</p>'
        else:
            email_data = email_response.json()
            html_content = email_data.get('html', '')
            text_content = email_data.get('text', '')
            
            if not html_content and text_content:
                html_content = text_content.replace('\n', '<br>')
            elif not html_content and not text_content:
                html_content = '<p>Пустое письмо</p>'
        
        print(f"DEBUG: Forwarding to azali.halimova@gmail.com")
        
        # Формируем письмо для пересылки
        forward_subject = f"[Входящее на {to_email}] {subject}"
        
        forward_html = f"""
        <div style="background: #f5f5f5; padding: 15px; margin-bottom: 20px; border-left: 4px solid #4CAF50;">
            <p style="margin: 0; font-size: 14px; color: #666;">
                <strong>От:</strong> {from_email}<br>
                <strong>Кому:</strong> {to_email}<br>
                <strong>Тема:</strong> {subject}
            </p>
        </div>
        <div>
            {html_content}
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