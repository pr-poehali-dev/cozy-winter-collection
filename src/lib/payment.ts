const ROBOKASSA_ENDPOINT = "https://functions.poehali.dev/b607a8e7-633b-4a9d-9068-3d6acdbc3dad";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface PaymentPayload {
  amount: number;
  userName: string;
  userEmail: string;
  userPhone: string;
  userAddress: string;
  orderComment?: string;
  userTelegram?: string;
  deliveryType: 'pvz' | 'pickup';
  deliveryCost: number;
  cartItems: CartItem[];
  isTest?: number;
  isAnonymous?: boolean;
}

interface PaymentResponse {
  payment_url: string;
  order_id: number;
  order_number: string;
  robokassa_inv_id: number;
  amount: string;
}

export const createRobokassaPaymentLink = async (
  payload: PaymentPayload
): Promise<PaymentResponse> => {
  const requestBody = {
    amount: Number(payload.amount.toFixed(2)),
    user_name: payload.userName,
    user_email: payload.userEmail,
    user_phone: payload.userPhone,
    user_address: payload.userAddress,
    order_comment: payload.orderComment || '',
    user_telegram: payload.userTelegram || '',
    delivery_type: payload.deliveryType,
    delivery_cost: payload.deliveryCost,
    cart_items: payload.cartItems,
    is_test: 0,
    is_anonymous: payload.isAnonymous || false,
  };

  console.log('[DEBUG] Sending payment request:', requestBody);

  const response = await fetch(ROBOKASSA_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  console.log('[DEBUG] Response status:', response.status);

  if (!response.ok) {
    const errorText = await response.text();
    console.error('[ERROR] Payment request failed:', errorText);
    throw new Error(errorText || "Не удалось создать ссылку на оплату");
  }

  const result = await response.json();
  console.log('[DEBUG] Payment response:', result);
  return result;
};