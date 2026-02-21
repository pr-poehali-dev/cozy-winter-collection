import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';
import { CartItem, Product } from './types';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createRobokassaPaymentLink } from '@/lib/payment';
import { toast } from '@/hooks/use-toast';
import CartItemsList from './CartItemsList';
import CheckoutForm from './CheckoutForm';
import PaymentIframe from './PaymentIframe';

interface HeaderProps {
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  updateQuantity: (productId: number, delta: number, variantId?: string) => void;
  removeFromCart: (productId: number, variantId?: string) => void;
  cartTotal: number;
  cartCount: number;
  addToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
  products: Product[];
}

export default function Header({
  cart,
  isCartOpen,
  setIsCartOpen,
  updateQuantity,
  removeFromCart,
  cartTotal,
  cartCount,
  addToCart,
  onProductClick,
  products
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
    deliveryType: '' as '' | 'pvz' | 'pickup',
    promoCode: '',
    isAnonymous: false,
    recipientName: '',
    recipientPhone: '',
    isSelfRecipient: true
  });
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [validationErrors, setValidationErrors] = useState<Set<string>>(new Set());



  useEffect(() => {
    if (!orderNumber) return;

    const checkPaymentStatus = async () => {
      try {
        const response = await fetch(
          `https://functions.poehali.dev/25f876e5-53fb-4cb1-878a-a7177baa1950?order_number=${orderNumber}`
        );

        if (response.ok) {
          const data = await response.json();
          
          if (data.status === 'paid') {
            localStorage.removeItem('pending_order');
            setIsCartOpen(false);
            setShowPaymentIframe(false);
            setOrderNumber('');
            setPaymentUrl('');
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
  }, [orderNumber, navigate, setIsCartOpen]);

  const handleCheckout = async () => {
    // Немедленная блокировка перед любыми проверками
    if (isCheckoutLoading) return;
    setIsCheckoutLoading(true);

    if (!cart.length) {
      setIsCheckoutLoading(false);
      return;
    }

    const errors = new Set<string>();
    
    // Проверка обязательных полей
    if (!checkoutData.name || checkoutData.name.trim() === '') {
      errors.add('name');
    }
    
    if (!checkoutData.email || checkoutData.email.trim() === '') {
      errors.add('email');
    } else {
      // Проверка формата email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(checkoutData.email)) {
        errors.add('email');
      }
    }
    
    const phoneDigits = checkoutData.phone.replace(/\D/g, '');
    if (!checkoutData.phone || phoneDigits.length < 11) {
      errors.add('phone');
    }
    
    if (errors.size > 0) {
      setValidationErrors(errors);
      setIsCheckoutLoading(false);
      
      // Определяем текст ошибки
      let errorTitle = 'Пожалуйста, заполните обязательные поля';
      let errorDescription = 'Они отмечены звёздочкой *';
      
      if (errors.has('email') && checkoutData.email && checkoutData.email.trim() !== '') {
        errorTitle = 'Неверный формат email';
        errorDescription = 'Проверьте правильность email адреса';
      } else if (errors.has('phone') && checkoutData.phone && phoneDigits.length > 0 && phoneDigits.length < 11) {
        errorTitle = 'Неверный формат телефона';
        errorDescription = 'Введите номер в формате +7 (XXX) XXX-XX-XX';
      }
      
      toast({
        title: errorTitle,
        description: errorDescription,
        variant: 'destructive'
      });
      return;
    }
    
    // Проверка способа доставки
    if (!checkoutData.deliveryType) {
      errors.add('deliveryType');
    }
    
    // Проверка адреса ПВЗ
    if (checkoutData.deliveryType === 'pvz' && (!checkoutData.address || checkoutData.address.trim() === '')) {
      errors.add('address');
    }
    
    // Если есть ошибки доставки, показываем их
    if (errors.size > 0) {
      setValidationErrors(errors);
      setIsCheckoutLoading(false);
      
      let errorTitle = 'Пожалуйста, заполните обязательные поля';
      let errorDescription = 'Они отмечены звёздочкой *';
      
      if (errors.has('deliveryType')) {
        errorTitle = 'Выберите способ доставки';
        errorDescription = 'Укажите ПВЗ Ozon или самовывоз';
      } else if (errors.has('address')) {
        errorTitle = 'Выберите пункт выдачи';
        errorDescription = 'Укажите адрес ПВЗ Ozon';
      }
      
      toast({
        title: errorTitle,
        description: errorDescription,
        variant: 'destructive'
      });
      return;
    }
    
    // Валидация данных получателя (только если это подарок)
    if (!checkoutData.isSelfRecipient) {
      if (!checkoutData.recipientName || checkoutData.recipientName.trim() === '') {
        errors.add('recipientName');
      }
      
      const recipientPhoneDigits = checkoutData.recipientPhone.replace(/\D/g, '');
      if (!checkoutData.recipientPhone || recipientPhoneDigits.length < 11) {
        errors.add('recipientPhone');
      }
      
      // Если есть ошибки получателя, показываем их
      if (errors.size > 0) {
        setValidationErrors(errors);
        setIsCheckoutLoading(false);
        
        let errorTitle = 'Пожалуйста, заполните данные получателя';
        let errorDescription = 'Они нужны для доставки подарка';
        
        if (errors.has('recipientPhone') && checkoutData.recipientPhone && recipientPhoneDigits.length > 0 && recipientPhoneDigits.length < 11) {
          errorTitle = 'Неверный формат телефона получателя';
          errorDescription = 'Введите полный номер телефона';
        }
        
        toast({
          title: errorTitle,
          description: errorDescription,
          variant: 'destructive'
        });
        return;
      }
    }

    // Сброс ошибок валидации перед отправкой
    setValidationErrors(new Set());

    try {

      const totalWithDelivery = Number((cartTotal + deliveryCost - promoDiscount).toFixed(2));

      // Формируем полный комментарий с данными получателя и подарка
      let fullComment = '';
      
      // Добавляем данные получателя
      if (!checkoutData.isSelfRecipient && checkoutData.recipientName) {
        fullComment += `💌 ПОДАРОК:\n`;
        fullComment += `Получатель: ${checkoutData.recipientName}\n`;
        fullComment += `Телефон получателя: ${checkoutData.recipientPhone}\n`;
      } else if (checkoutData.isSelfRecipient) {
        fullComment += `📦 Заказ для себя\n`;
      }
      
      // Добавляем анонимность
      if (checkoutData.isAnonymous) {
        fullComment += `\n🎭 АНОНИМНО (без имени отправителя на упаковке)\n`;
      }
      
      // Добавляем комментарий покупателя
      if (checkoutData.comment) {
        fullComment += `\n📝 Комментарий:\n${checkoutData.comment}`;
      }

      console.log('[CHECKOUT] Сформированный комментарий:', fullComment);

      const result = await createRobokassaPaymentLink({
        amount: totalWithDelivery,
        userName: checkoutData.name,
        userEmail: checkoutData.email,
        userPhone: checkoutData.phone,
        userAddress: checkoutData.address,
        orderComment: fullComment,
        userTelegram: checkoutData.telegram,
        deliveryType: checkoutData.deliveryType,
        deliveryCost: deliveryCost,
        cartItems: cart,
        isAnonymous: checkoutData.isAnonymous,
      });

      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      
      if (isMobile) {
        window.open(result.payment_url, '_blank');
        localStorage.setItem('pending_order', result.order_number);
        setOrderNumber(result.order_number);
        setShowCheckoutForm(false);
        setShowPaymentIframe(true);
      } else {
        setPaymentUrl(result.payment_url);
        setOrderNumber(result.order_number);
        setShowCheckoutForm(false);
        setShowPaymentIframe(true);
      }
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
              <div className="flex-1 flex flex-col mt-8 px-6 overflow-y-auto pb-6">
                <div className="text-center mb-6">
                  <p className="text-muted-foreground font-light mb-2 py-[7px] px-[37px] mx-16">корзина пока пустая, 
посмотри, что у нас есть 👇🏻✨</p>
                </div>
                <div className="space-y-4">
                  {(products || [])
                    .filter(p => p.badge !== 'soon')
                    .slice(0, 6)
                    .map(product => (
                      <div key={product.id} className="flex gap-3 items-center pb-4 border-b border-border">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-light text-primary line-clamp-2">{product.name}</h4>
                          <p className="text-sm text-muted-foreground font-light mt-1">{product.price.toLocaleString('ru-RU')} ₽</p>
                        </div>
                        <button
                          onClick={() => addToCart(product)}
                          className="flex-shrink-0 w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                        >
                          <Icon name="Plus" size={16} />
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            ) : showPaymentIframe ? (
              <PaymentIframe paymentUrl={paymentUrl} />
            ) : showCheckoutForm ? (
              <CheckoutForm
                checkoutData={checkoutData}
                setCheckoutData={setCheckoutData}
                deliveryCost={deliveryCost}
                setDeliveryCost={setDeliveryCost}
                promoDiscount={promoDiscount}
                setPromoDiscount={setPromoDiscount}
                cartTotal={cartTotal}
                isCheckoutLoading={isCheckoutLoading}
                onCheckout={handleCheckout}
                validationErrors={validationErrors}
              />
            ) : (
              <CartItemsList
                cart={cart}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
                cartTotal={cartTotal}
                isCheckoutLoading={isCheckoutLoading}
                onCheckout={() => setShowCheckoutForm(true)}
                addToCart={addToCart}
                onProductClick={onProductClick}
                products={products}
              />
            )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}