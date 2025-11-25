interface PaymentIframeProps {
  paymentUrl: string;
}

export default function PaymentIframe({ paymentUrl }: PaymentIframeProps) {
  return (
    <div className="flex-1 flex flex-col">
      <iframe
        src={paymentUrl}
        className="w-full flex-1 border-0 mt-8"
        title="Оплата заказа"
      />
      <div className="px-6 pb-6">
        <p className="text-sm text-muted-foreground text-center">
          после оплаты вы автоматически перейдете на страницу заказа
        </p>
      </div>
    </div>
  );
}
