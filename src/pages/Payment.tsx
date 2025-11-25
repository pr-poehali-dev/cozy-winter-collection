import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';

export default function Payment() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const paymentUrl = searchParams.get('url');
  const orderNumber = searchParams.get('order');
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    if (!orderNumber || !paymentUrl) {
      navigate('/');
      return;
    }

    const checkPaymentStatus = async () => {
      if (checking) return;
      
      setChecking(true);
      try {
        const response = await fetch(
          `https://functions.poehali.dev/25f876e5-53fb-4cb1-878a-a7177baa1950?order_number=${orderNumber}`
        );

        if (response.ok) {
          const data = await response.json();
          
          if (data.status === 'paid') {
            navigate(`/order-success?order=${orderNumber}`);
          }
        }
      } catch (error) {
        console.error('Failed to check payment status:', error);
      } finally {
        setChecking(false);
      }
    };

    const interval = setInterval(checkPaymentStatus, 5000);
    checkPaymentStatus();

    return () => clearInterval(interval);
  }, [orderNumber, paymentUrl, navigate, checking]);

  if (!paymentUrl || !orderNumber) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl text-primary tracking-wide" style={{ fontFamily: 'Cormorant, serif', fontWeight: 300 }}>
            azaluk
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="Lock" size={16} />
            <span>безопасная оплата</span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-4xl">
          <div className="bg-card border border-border rounded-lg overflow-hidden shadow-lg">
            <div className="p-4 border-b border-border bg-secondary/50">
              <h1 className="text-lg font-light text-primary">оформление оплаты</h1>
              <p className="text-sm text-muted-foreground mt-1">заказ {orderNumber}</p>
            </div>
            <div className="relative" style={{ height: '600px' }}>
              <iframe
                src={paymentUrl}
                className="w-full h-full border-0"
                title="Оплата заказа"
              />
            </div>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4">
            после оплаты вы автоматически перейдете на страницу заказа
          </p>
        </div>
      </main>
    </div>
  );
}
