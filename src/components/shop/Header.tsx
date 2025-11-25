import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { CartItem } from './types';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createRobokassaPaymentLink } from '@/lib/payment';
import { toast } from '@/hooks/use-toast';

interface HeaderProps {
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  updateQuantity: (productId: number, delta: number) => void;
  removeFromCart: (productId: number) => void;
  cartTotal: number;
  cartCount: number;
}

export default function Header({
  cart,
  isCartOpen,
  setIsCartOpen,
  updateQuantity,
  removeFromCart,
  cartTotal,
  cartCount
}: HeaderProps) {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [showPaymentIframe, setShowPaymentIframe] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [checkoutData, setCheckoutData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    comment: '',
    telegram: '',
    deliveryType: 'pvz' as 'pvz' | 'pickup',
    promoCode: ''
  });
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [promoDiscount, setPromoDiscount] = useState(0);

  useEffect(() => {
    if (!showPaymentIframe || !orderNumber) return;

    const checkPaymentStatus = async () => {
      try {
        const response = await fetch(
          `https://functions.poehali.dev/25f876e5-53fb-4cb1-878a-a7177baa1950?order_number=${orderNumber}`
        );

        if (response.ok) {
          const data = await response.json();
          
          if (data.status === 'paid') {
            setIsCartOpen(false);
            setShowPaymentIframe(false);
            navigate(`/order-success?order=${orderNumber}`);
          }
        }
      } catch (error) {
        console.error('Failed to check payment status:', error);
      }
    };

    const interval = setInterval(checkPaymentStatus, 5000);
    checkPaymentStatus();

    return () => clearInterval(interval);
  }, [showPaymentIframe, orderNumber, navigate, setIsCartOpen]);

  const handleCheckout = async () => {
    if (!cart.length || isCheckoutLoading) return;

    if (!checkoutData.name || !checkoutData.email || !checkoutData.phone) {
      toast({
        title: 'Заполните все поля',
        description: 'Нам нужны ваши данные',
        variant: 'destructive'
      });
      return;
    }

    if (checkoutData.deliveryType === 'pvz' && !checkoutData.address) {
      toast({
        title: 'Выберите пункт выдачи',
        description: 'Укажите адрес ПВЗ Ozon',
        variant: 'destructive'
      });
      return;
    }

    try {
      setIsCheckoutLoading(true);

      const totalWithDelivery = Number((cartTotal + deliveryCost - promoDiscount).toFixed(2));

      const result = await createRobokassaPaymentLink({
        amount: totalWithDelivery,
        userName: checkoutData.name,
        userEmail: checkoutData.email,
        userPhone: checkoutData.phone,
        userAddress: checkoutData.address,
        orderComment: checkoutData.comment,
        userTelegram: checkoutData.telegram,
        deliveryType: checkoutData.deliveryType,
        deliveryCost: deliveryCost,
        cartItems: cart,
      });

      setPaymentUrl(result.payment_url);
      setOrderNumber(result.order_number);
      setShowCheckoutForm(false);
      setShowPaymentIframe(true);
    } catch (error) {
      toast({
        title: 'Не получилось создать ссылку',
        description: 'Попробуйте ещё раз или напишите нам',
        variant: 'destructive'
      });
    } finally {
      setIsCheckoutLoading(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl text-primary tracking-wide hover:opacity-70 transition-opacity" style={{ fontFamily: 'Cormorant, serif', fontWeight: 300 }}>azaluk</Link>
        
        <div className="flex items-center gap-6">
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
          
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <button className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors">
                <Icon name="Menu" size={20} className="text-primary" strokeWidth={1.5} />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <SheetHeader>
                <SheetTitle className="text-xl font-light text-primary">меню</SheetTitle>
              </SheetHeader>
              <nav className="mt-8 flex flex-col gap-6">
                <Link 
                  to="/" 
                  className="text-sm font-light text-primary hover:text-muted-foreground transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  главная
                </Link>
                <Link 
                  to="/about" 
                  className="text-sm font-light text-primary hover:text-muted-foreground transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  о нас
                </Link>
                <Link 
                  to="/delivery" 
                  className="text-sm font-light text-primary hover:text-muted-foreground transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  оплата и доставка
                </Link>
                <Link 
                  to="/contacts" 
                  className="text-sm font-light text-primary hover:text-muted-foreground transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  контакты
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          
          <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetTrigger asChild>
              <button className="relative p-2 hover:bg-secondary rounded-lg transition-colors">
                <Icon name="ShoppingBag" size={20} className="text-primary" strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-light">
                    {cartCount}
                  </span>
                )}
              </button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg flex flex-col p-0">
            <SheetHeader className="flex-shrink-0 px-6 pt-6">
              <div className="flex items-center justify-between">
                <button 
                  onClick={() => {
                    if (showPaymentIframe) {
                      setShowPaymentIframe(false);
                      setShowCheckoutForm(true);
                    } else if (showCheckoutForm) {
                      setShowCheckoutForm(false);
                    } else {
                      setIsCartOpen(false);
                    }
                  }}
                  className="p-2 hover:bg-secondary rounded-lg transition-colors"
                  aria-label="Назад"
                >
                  <Icon name="ArrowLeft" size={20} className="text-primary" strokeWidth={1.5} />
                </button>
                <SheetTitle className="text-2xl font-light text-primary">
                  {showPaymentIframe ? 'оплата' : showCheckoutForm ? 'оформление' : 'корзина'}
                </SheetTitle>
                <button 
                  onClick={() => {
                    setIsCartOpen(false);
                    setShowCheckoutForm(false);
                    setShowPaymentIframe(false);
                    setPaymentUrl('');
                    setOrderNumber('');
                  }}
                  className="p-2 hover:bg-secondary rounded-lg transition-colors"
                  aria-label="Закрыть"
                >
                  <Icon name="X" size={20} className="text-primary" strokeWidth={1.5} />
                </button>
              </div>
            </SheetHeader>
            {cart.length === 0 ? (
              <div className="flex-1 flex items-center justify-center text-muted-foreground font-light">
                <p>корзина пуста</p>
              </div>
            ) : showPaymentIframe ? (
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
            ) : showCheckoutForm ? (
              <div className="flex-1 flex flex-col mt-8 px-6 overflow-hidden">
                <div className="space-y-4 flex-1 overflow-y-auto pb-4">
                  <div className="space-y-3">
                    <Label>Способ доставки</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setCheckoutData({ ...checkoutData, deliveryType: 'pvz', address: '' });
                          setDeliveryCost(200);
                        }}
                        className={`p-4 rounded-lg border-2 text-left transition-all ${
                          checkoutData.deliveryType === 'pvz'
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className="font-semibold text-sm mb-1">ПВЗ Ozon</div>
                        <div className="text-xs text-muted-foreground font-light">200 ₽</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setCheckoutData({ ...checkoutData, deliveryType: 'pickup', address: 'Москва, м. Тульская' });
                          setDeliveryCost(0);
                        }}
                        className={`p-4 rounded-lg border-2 text-left transition-all ${
                          checkoutData.deliveryType === 'pickup'
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className="font-semibold text-sm mb-1">Самовывоз</div>
                        <div className="text-xs text-muted-foreground font-light">Бесплатно</div>
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Имя</Label>
                    <Input
                      id="name"
                      type="text"
                      value={checkoutData.name}
                      onChange={(e) => setCheckoutData({ ...checkoutData, name: e.target.value })}
                      placeholder="ваше имя"
                      className="font-light"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={checkoutData.email}
                      onChange={(e) => setCheckoutData({ ...checkoutData, email: e.target.value })}
                      placeholder="ваш email"
                      className="font-light"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={checkoutData.phone}
                      onChange={(e) => setCheckoutData({ ...checkoutData, phone: e.target.value })}
                      placeholder="+7 (999) 123-45-67"
                      className="font-light"
                    />
                  </div>
                  {checkoutData.deliveryType === 'pvz' ? (
                    <div className="space-y-2">
                      <Label htmlFor="address">Адрес ПВЗ Ozon</Label>
                      <Input
                        id="address"
                        type="text"
                        value={checkoutData.address}
                        onChange={(e) => setCheckoutData({ ...checkoutData, address: e.target.value })}
                        placeholder="введите адрес удобного пункта выдачи"
                        className="font-light"
                      />
                      <p className="text-xs text-muted-foreground font-light">
                        <a href="https://www.ozon.ru/geo/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          Найти ближайший пункт выдачи на карте Ozon →
                        </a>
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Label>Адрес самовывоза</Label>
                      <div className="p-3 rounded-lg bg-secondary/50 border border-border">
                        <p className="text-sm font-light">Москва, м. Тульская</p>
                        <p className="text-xs text-muted-foreground font-light mt-1">Свяжемся с вами для уточнения времени встречи</p>
                      </div>
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="telegram">Ник в телеграм (необязательно)</Label>
                    <Input
                      id="telegram"
                      type="text"
                      value={checkoutData.telegram}
                      onChange={(e) => setCheckoutData({ ...checkoutData, telegram: e.target.value })}
                      placeholder="@username"
                      className="font-light"
                    />
                    <p className="text-xs text-muted-foreground font-light">напишем вам только в случае возникновения вопросов по заказу</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="promoCode">Промокод (необязательно)</Label>
                    <div className="flex gap-2">
                      <Input
                        id="promoCode"
                        type="text"
                        value={checkoutData.promoCode}
                        onChange={(e) => setCheckoutData({ ...checkoutData, promoCode: e.target.value.toUpperCase() })}
                        placeholder="введите промокод"
                        className="font-light uppercase"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const code = checkoutData.promoCode.trim();
                          if (code === 'AZALUK10') {
                            setPromoDiscount(cartTotal * 0.1);
                            toast({ title: 'Промокод применён!', description: 'Скидка 10%' });
                          } else if (code === 'WINTER15') {
                            setPromoDiscount(cartTotal * 0.15);
                            toast({ title: 'Промокод применён!', description: 'Скидка 15%' });
                          } else if (code) {
                            toast({ title: 'Неверный промокод', variant: 'destructive' });
                            setPromoDiscount(0);
                          }
                        }}
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-light whitespace-nowrap"
                      >
                        применить
                      </button>
                    </div>
                    {promoDiscount > 0 && (
                      <p className="text-xs text-green-600 font-light">
                        ✓ Скидка -{promoDiscount.toLocaleString('ru-RU')} ₽
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="comment">Комментарий к заказу (необязательно)</Label>
                    <Textarea
                      id="comment"
                      value={checkoutData.comment}
                      onChange={(e) => setCheckoutData({ ...checkoutData, comment: e.target.value })}
                      placeholder="пожелания по доставке, выбору цвета или другие детали..."
                      className="font-light resize-none"
                      rows={3}
                    />
                  </div>
                </div>
                <div className="flex-shrink-0 border-t border-border pt-4 mt-4 pb-6">
                  <div className="space-y-2 mb-4">
                    {promoDiscount > 0 && (
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-light text-muted-foreground">Скидка:</span>
                        <span className="font-light text-green-600">-{promoDiscount.toLocaleString('ru-RU')} ₽</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-lg font-light text-primary">Итого:</span>
                      <span className="text-2xl font-light text-primary">{(cartTotal + deliveryCost - promoDiscount).toLocaleString('ru-RU')} ₽</span>
                    </div>
                  </div>
                  <button 
                    onClick={handleCheckout}
                    disabled={isCheckoutLoading}
                    className="w-full bg-primary text-white py-3 rounded-lg font-light hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {isCheckoutLoading ? 'загружаем...' : 'перейти к оплате'}
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-auto mt-8 space-y-4 pb-4 px-6">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-4 pb-4 border-b border-border">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-light text-sm text-primary">{item.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1 font-light">{item.price.toLocaleString('ru-RU')} р.</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button 
                            className="h-7 w-7 border border-border rounded hover:bg-secondary transition-colors flex items-center justify-center"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            <Icon name="Minus" size={12} />
                          </button>
                          <span className="text-sm w-8 text-center font-light">{item.quantity}</span>
                          <button 
                            className="h-7 w-7 border border-border rounded hover:bg-secondary transition-colors flex items-center justify-center"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            <Icon name="Plus" size={12} />
                          </button>
                          <button 
                            className="h-7 w-7 ml-auto hover:bg-secondary rounded transition-colors flex items-center justify-center"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Icon name="Trash2" size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex-shrink-0 border-t border-border pt-4 mt-4 px-6 pb-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-light text-primary">итого:</span>
                    <span className="text-2xl font-light text-primary">{cartTotal.toLocaleString('ru-RU')} р.</span>
                  </div>
                  <button 
                    onClick={() => setShowCheckoutForm(true)}
                    disabled={isCheckoutLoading || cart.length === 0}
                    className="w-full bg-primary text-white py-3 rounded-lg font-light hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    оформить заказ
                  </button>
                </div>
              </>
            )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}