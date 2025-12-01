import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface PaymentIframeProps {
  paymentUrl: string;
}

export default function PaymentIframe({ paymentUrl }: PaymentIframeProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="flex-1 flex flex-col relative">
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background z-10 mt-8">
          <div className="text-center space-y-4 max-w-sm px-6">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="Sparkles" size={32} className="text-primary animate-pulse" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-light text-primary">колдуем страничку оплаты... 🪄</h3>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                сейчас откроется форма с выбором способа оплаты
              </p>
            </div>
          </div>
        </div>
      )}
      <iframe
        src={paymentUrl}
        className="w-full flex-1 border-0 mt-8"
        title="Оплата заказа"
        onLoad={() => setIsLoading(false)}
      />
      <div className="px-6 pb-6">
        <p className="text-sm text-muted-foreground text-center">
          после оплаты вы автоматически перейдете на страницу заказа
        </p>
      </div>
    </div>
  );
}