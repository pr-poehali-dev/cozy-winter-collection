const ROBOKASSA_ENDPOINT = "https://functions.poehali.dev/eca02619-6f06-4c87-9840-7fcced969a38";

interface PaymentPayload {
  amount: number;
  orderId: number;
  description: string;
  isTest?: number;
}

interface PaymentResponse {
  payment_url: string;
  order_id: number;
  amount: string;
}

export const createRobokassaPaymentLink = async (
  payload: PaymentPayload
): Promise<PaymentResponse> => {
  const requestBody = {
    amount: Number(payload.amount.toFixed(2)),
    order_id: payload.orderId,
    description: payload.description,
    is_test: payload.isTest ?? (import.meta.env.DEV ? 1 : 0),
  };

  const response = await fetch(ROBOKASSA_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Не удалось создать ссылку на оплату");
  }

  return response.json();
};
