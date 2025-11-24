import json
import os
import hashlib
from decimal import Decimal, ROUND_HALF_UP
from typing import Any, Dict
from pydantic import BaseModel, Field, ValidationError


def _calculate_signature(*args: Any) -> str:
    joined: str = ':'.join(str(arg) for arg in args)
    return hashlib.md5(joined.encode()).hexdigest()


class PaymentRequest(BaseModel):
    amount: Decimal = Field(..., gt=Decimal('0'))
    order_id: int = Field(..., gt=0)
    description: str = Field(..., min_length=1, max_length=255)
    is_test: int = Field(0, ge=0, le=1)


class PaymentResponse(BaseModel):
    payment_url: str
    order_id: int
    amount: str


def _format_amount(amount: Decimal) -> str:
    normalized = amount.quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)
    return f"{normalized:.2f}".replace(',', '.')


HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Session-Id, X-Auth-Token',
    'Access-Control-Max-Age': '86400'
}


ROBOKASSA_URL = 'https://auth.robokassa.ru/Merchant/Index.aspx'


def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''Generate Robokassa payment link for cart checkout.'''
    method = event.get('httpMethod', 'GET').upper()

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': HEADERS,
            'body': '',
            'isBase64Encoded': False
        }

    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': HEADERS,
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }

    merchant_login = os.getenv('ROBOKASSA_MERCHANT_LOGIN')
    password_1 = os.getenv('ROBOKASSA_PASSWORD_1')

    if not merchant_login or not password_1:
        return {
            'statusCode': 500,
            'headers': HEADERS,
            'body': json.dumps({'error': 'Robokassa credentials are not configured'}),
            'isBase64Encoded': False
        }

    try:
        body_str = event.get('body') or '{}'
        print(f"[DEBUG] Received body: {body_str}")
        payload = json.loads(body_str)
        print(f"[DEBUG] Parsed payload: {payload}")
        request_data = PaymentRequest(**payload)
        print(f"[DEBUG] Validated request data: amount={request_data.amount}, order_id={request_data.order_id}, is_test={request_data.is_test}")
    except (json.JSONDecodeError, ValidationError) as exc:
        print(f"[ERROR] Validation failed: {exc}")
        return {
            'statusCode': 400,
            'headers': HEADERS,
            'body': json.dumps({'error': 'Invalid request', 'details': str(exc)}),
            'isBase64Encoded': False
        }

    amount_str = _format_amount(request_data.amount)
    signature = _calculate_signature(
        merchant_login,
        amount_str,
        request_data.order_id,
        password_1
    )

    query_params = {
        'MerchantLogin': merchant_login,
        'OutSum': amount_str,
        'InvId': request_data.order_id,
        'Description': request_data.description,
        'SignatureValue': signature,
        'IsTest': request_data.is_test
    }

    from urllib.parse import urlencode

    payment_url = f"{ROBOKASSA_URL}?{urlencode(query_params)}"
    print(f"[DEBUG] Generated payment URL: {payment_url}")
    print(f"[DEBUG] Signature input: merchant={merchant_login}, amount={amount_str}, order_id={request_data.order_id}")
    print(f"[DEBUG] Signature: {signature}")

    response = PaymentResponse(
        payment_url=payment_url,
        order_id=request_data.order_id,
        amount=amount_str
    )

    print(f"[DEBUG] Returning successful response: {response.model_dump_json()}")
    return {
        'statusCode': 200,
        'headers': {**HEADERS, 'Content-Type': 'application/json'},
        'body': response.model_dump_json(),
        'isBase64Encoded': False
    }