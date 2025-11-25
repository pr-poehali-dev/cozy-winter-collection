const ROBOKASSA_ENDPOINT = "https://functions.poehali.dev/eca02619-6f06-4c87-9840-7fcced969a38";

interface PaymentPayload {
  amount: number;
  userName: string;
  userEmail: string;
  userPhone: string;
  isTest?: number;
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
    is_test: 0,
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