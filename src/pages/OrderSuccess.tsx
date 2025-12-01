import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';

interface OrderItem {
  product_name: string;
  product_price: number;
  quantity: number;
}

interface OrderData {
  order_number: string;
  amount: number;
  status: string;
  items: OrderItem[];
  user_name: string;
  user_email: string;
  user_phone: string;
  delivery_address: string;
}

const statusData: Record<string, { label: string; emoji: string; color: string; description: string }> = {
  pending: { label: 'ожидает оплаты', emoji: '⏳', color: 'text-yellow-600', description: 'заказ создан, ожидаем подтверждение оплаты' },
  paid: { label: 'оплачен', emoji: '✅', color: 'text-green-600', description: 'оплата получена, начинаем собирать заказ' },
  processing: { label: 'готовится', emoji: '📦', color: 'text-blue-600', description: 'создаём ваш заказ с любовью' },
  shipped: { label: 'отправлен', emoji: '🚚', color: 'text-purple-600', description: 'заказ в пути к вам' },
  delivered: { label: 'доставлен', emoji: '🎉', color: 'text-green-600', description: 'заказ у вас! наслаждайтесь покупкой' },
  cancelled: { label: 'отменён', emoji: '❌', color: 'text-red-600', description: 'заказ был отменён' }
};

export default function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('order');
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderData = async () => {
      if (!orderId) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://functions.poehali.dev/25f876e5-53fb-4cb1-878a-a7177baa1950?order_number=${orderId}`
        );

        if (!response.ok) {
          throw new Error('Order not found');
        }

        const data = await response.json();
        setOrderData(data);
      } catch (error) {
        console.error('Failed to load order:', error);
        setOrderData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderData();
    
    const interval = setInterval(fetchOrderData, 10000);
    return () => clearInterval(interval);
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">загружаем...</p>
      </div>
    );
  }

  if (!orderId || !orderData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6">
        <Icon name="AlertCircle" size={48} className="text-muted-foreground mb-4" />
        <h1 className="text-2xl font-light text-primary mb-2">заказ не найден</h1>
        <p className="text-muted-foreground mb-6">проверьте ссылку или вернитесь на главную</p>
        <Link to="/" className="px-6 py-3 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity">
          на главную
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl text-primary tracking-wide hover:opacity-70 transition-opacity" style={{ fontFamily: 'Cormorant, serif', fontWeight: 300 }}>
            azaluk
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-light text-primary hover:text-muted-foreground transition-colors">
              главная
            </Link>
            <Link to="/about" className="text-sm font-light text-primary hover:text-muted-foreground transition-colors">
              о нас
            </Link>
            <Link to="/delivery" className="text-sm font-light text-primary hover:text-muted-foreground transition-colors">
              оплата и доставка
            </Link>
            <Link to="/contacts" className="text-sm font-light text-primary hover:text-muted-foreground transition-colors">
              контакты
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12 pt-24">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <Icon name="Check" size={32} className="text-green-600" />
          </div>
          <h1 className="text-3xl font-light text-primary mb-2">оплата прошла успешно! 🎉</h1>
          <p className="text-muted-foreground">заказ <span className="font-medium">{orderData.order_number}</span></p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <h2 className="text-xl font-light text-primary mb-4">статус заказа</h2>
          <div className="flex items-center gap-4">
            <span className="text-4xl">{statusData[orderData.status]?.emoji || '📋'}</span>
            <div className="flex-1">
              <p className={`text-lg font-medium ${statusData[orderData.status]?.color || 'text-primary'}`}>
                {statusData[orderData.status]?.label || orderData.status}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {statusData[orderData.status]?.description || 'обрабатываем заказ'}
              </p>
            </div>
          </div>
          
          <div className="mt-6 flex justify-between items-center relative">
            <div className="absolute top-3 left-0 right-0 h-0.5 bg-border"></div>
            {['paid', 'processing', 'shipped', 'delivered'].map((status, idx) => {
              const isCompleted = ['paid', 'processing', 'shipped', 'delivered'].indexOf(orderData.status) >= idx;
              const isCurrent = orderData.status === status;
              return (
                <div key={status} className="relative z-10 flex flex-col items-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-colors ${
                    isCompleted ? 'bg-green-600 text-white' : isCurrent ? 'bg-yellow-500 text-white' : 'bg-border text-muted-foreground'
                  }`}>
                    {isCompleted ? '✓' : idx + 1}
                  </div>
                  <span className="text-[10px] text-muted-foreground mt-2 text-center max-w-[60px] leading-tight">
                    {statusData[status]?.emoji}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <h2 className="text-xl font-light text-primary mb-4">товары в заказе</h2>
          <div className="space-y-3">
            {orderData.items.length > 0 ? (
              orderData.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                  <div>
                    <p className="font-light text-primary">{item.product_name}</p>
                    <p className="text-sm text-muted-foreground">количество: {item.quantity}</p>
                  </div>
                  <p className="font-light">{(item.product_price * item.quantity).toLocaleString('ru-RU')} р.</p>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-center py-4">загружаем товары...</p>
            )}
          </div>
          <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
            <span className="text-lg font-light text-primary">итого:</span>
            <span className="text-2xl font-light text-primary">{orderData.amount.toLocaleString('ru-RU')} р.</span>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-light text-primary mb-4">контактные данные</h2>
          <div className="space-y-2 text-sm">
            <p className="text-muted-foreground">Имя: <span className="text-primary font-medium">{orderData.user_name}</span></p>
            <p className="text-muted-foreground">Email: <span className="text-primary font-medium">{orderData.user_email}</span></p>
            <p className="text-muted-foreground">Телефон: <span className="text-primary font-medium">{orderData.user_phone}</span></p>
            <p className="text-muted-foreground">Адрес доставки: <span className="text-primary font-medium">{orderData.delivery_address}</span></p>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground mb-3">есть вопросы по заказу? 💌</p>
          <a 
            href="https://t.me/azaluk_care" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group"
          >
            <Icon name="Send" size={16} className="group-hover:translate-x-0.5 transition-transform" />
            <span className="text-sm font-light">написать в поддержку @azaluk_care</span>
          </a>
        </div>
      </main>
    </div>
  );
}