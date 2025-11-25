import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Icon from '@/components/ui/icon';
import { toast } from '@/hooks/use-toast';

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
}

export default function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('order');
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [deliveryPhone, setDeliveryPhone] = useState('');
  const [deliveryService, setDeliveryService] = useState<'yandex' | 'ozon'>('yandex');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [submitting, setSubmitting] = useState(false);

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
        setDeliveryPhone(data.delivery_phone || '');
        setDeliveryService(data.delivery_service || 'yandex');
        setDeliveryAddress(data.delivery_address || '');
      } catch (error) {
        console.error('Failed to load order:', error);
        setOrderData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderData();
  }, [orderId]);

  const handleSubmitDelivery = async () => {
    if (!deliveryPhone || !deliveryAddress) {
      toast({
        title: 'Заполните все поля',
        description: 'Укажите телефон и адрес доставки',
        variant: 'destructive'
      });
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('https://functions.poehali.dev/25f876e5-53fb-4cb1-878a-a7177baa1950', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order_number: orderId,
          delivery_service: deliveryService,
          delivery_phone: deliveryPhone,
          delivery_address: deliveryAddress,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save delivery info');
      }
      
      toast({
        title: 'Данные сохранены!',
        description: 'Мы свяжемся с вами для уточнения деталей',
      });
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось сохранить данные',
        variant: 'destructive'
      });
    } finally {
      setSubmitting(false);
    }
  };

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
      <header className="border-b border-border">
        <div className="max-w-3xl mx-auto px-6 py-4">
          <Link to="/" className="text-2xl text-primary tracking-wide hover:opacity-70 transition-opacity" style={{ fontFamily: 'Cormorant, serif', fontWeight: 300 }}>
            azaluk
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <Icon name="Check" size={32} className="text-green-600" />
          </div>
          <h1 className="text-3xl font-light text-primary mb-2">оплата прошла успешно! 🎉</h1>
          <p className="text-muted-foreground">заказ <span className="font-medium">{orderData.order_number}</span></p>
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
          <h2 className="text-xl font-light text-primary mb-4">данные доставки</h2>
          
          {orderData.delivery_phone && orderData.delivery_address ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-green-600 mb-4">
                <Icon name="CheckCircle2" size={20} />
                <span className="font-light">данные доставки сохранены</span>
              </div>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">Служба: <span className="text-primary font-medium">{orderData.delivery_service === 'yandex' ? 'Яндекс Доставка' : 'Ozon'}</span></p>
                <p className="text-muted-foreground">Телефон: <span className="text-primary font-medium">{orderData.delivery_phone}</span></p>
                <p className="text-muted-foreground">Адрес: <span className="text-primary font-medium">{orderData.delivery_address}</span></p>
              </div>
            </div>
          ) : (
            <div>
              <div className="space-y-4 mb-6">
                <div>
                  <Label className="text-sm font-light mb-2 block">выберите службу доставки</Label>
                  <RadioGroup value={deliveryService} onValueChange={(v) => setDeliveryService(v as 'yandex' | 'ozon')}>
                    <div className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-secondary transition-colors">
                      <RadioGroupItem value="yandex" id="yandex" />
                      <Label htmlFor="yandex" className="flex-1 cursor-pointer font-light">
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-500">📦</span>
                          <span>Яндекс Доставка</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">нужен аккаунт в Яндекс ID</p>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-secondary transition-colors">
                      <RadioGroupItem value="ozon" id="ozon" />
                      <Label htmlFor="ozon" className="flex-1 cursor-pointer font-light">
                        <div className="flex items-center gap-2">
                          <span className="text-blue-500">📦</span>
                          <span>Ozon</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">нужен аккаунт на Ozon</p>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="phone" className="text-sm font-light">телефон</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={deliveryPhone}
                    onChange={(e) => setDeliveryPhone(e.target.value)}
                    placeholder="+7 (999) 123-45-67"
                    className="font-light mt-2"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    укажите номер, привязанный к аккаунту {deliveryService === 'yandex' ? 'Яндекс' : 'Ozon'}
                  </p>
                </div>

                <div>
                  <Label htmlFor="address" className="text-sm font-light">адрес доставки</Label>
                  <Input
                    id="address"
                    type="text"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Москва, ул. Примерная, д. 1, кв. 1"
                    className="font-light mt-2"
                  />
                </div>
              </div>

              <button
                onClick={handleSubmitDelivery}
                disabled={submitting}
                className="w-full bg-primary text-white py-3 rounded-lg font-light hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {submitting ? 'сохраняем...' : 'оформить доставку'}
              </button>
            </div>
          )}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          мы свяжемся с вами в течение 24 часов для уточнения деталей 💌
        </p>
      </main>
    </div>
  );
}