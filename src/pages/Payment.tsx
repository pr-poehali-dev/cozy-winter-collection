import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import Header from '@/components/shop/Header';
import Footer from '@/components/shop/Footer';

export default function Payment() {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'checking' | 'waiting' | 'paid' | 'error'>('checking');
  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    if (!orderId) {
      navigate('/');
      return;
    }

    const checkPaymentStatus = async () => {
      try {
        const response = await fetch(
          `https://functions.poehali.dev/25f876e5-53fb-4cb1-878a-a7177baa1950?order_number=${orderId}`
        );
        
        if (response.ok) {
          const data = await response.json();
          setOrderData(data);
          
          if (data.status === 'paid') {
            setStatus('paid');
            localStorage.removeItem('pending_order');
            setTimeout(() => {
              navigate(`/order-success?order=${orderId}`);
            }, 2000);
          } else {
            setStatus('waiting');
          }
        } else {
          setStatus('error');
        }
      } catch (error) {
        console.error('Payment check error:', error);
        setStatus('error');
      }
    };

    checkPaymentStatus();
    const interval = setInterval(checkPaymentStatus, 3000);

    return () => clearInterval(interval);
  }, [orderId, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="bg-secondary py-4 px-6 border-b border-border">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center gap-2">
            <h1 className="text-2xl font-light text-primary tracking-wide">azaluk</h1>
          </button>
        </div>
      </header>
      
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-md w-full text-center space-y-6">
          {status === 'checking' && (
            <>
              <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="Loader2" size={40} className="text-primary animate-spin" />
              </div>
              <div className="space-y-2">
                <h1 className="text-2xl font-light text-primary">проверяем заказ...</h1>
                <p className="text-sm text-muted-foreground font-light">
                  получаем информацию о вашем заказе
                </p>
              </div>
            </>
          )}

          {status === 'waiting' && (
            <>
              <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="Clock" size={40} className="text-primary" />
              </div>
              <div className="space-y-3">
                <h1 className="text-2xl font-light text-primary">ожидаем оплату</h1>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">
                  проверяем статус вашего заказа... после успешной оплаты вы автоматически перейдете на страницу подтверждения
                </p>
                {orderData?.payment_url && (
                  <a
                    href={orderData.payment_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity font-light mt-4"
                  >
                    <Icon name="ExternalLink" size={18} />
                    открыть страницу оплаты
                  </a>
                )}
              </div>
            </>
          )}

          {status === 'paid' && (
            <>
              <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                <Icon name="CheckCircle2" size={40} className="text-green-600" />
              </div>
              <div className="space-y-2">
                <h1 className="text-2xl font-light text-primary">оплата получена! ✨</h1>
                <p className="text-sm text-muted-foreground font-light">
                  перенаправляем на страницу подтверждения...
                </p>
              </div>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="w-20 h-20 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                <Icon name="AlertCircle" size={40} className="text-red-600" />
              </div>
              <div className="space-y-3">
                <h1 className="text-2xl font-light text-primary">что-то пошло не так</h1>
                <p className="text-sm text-muted-foreground font-light">
                  не удалось получить информацию о заказе
                </p>
                <button
                  onClick={() => navigate('/')}
                  className="px-6 py-3 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity font-light"
                >
                  вернуться на главную
                </button>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}