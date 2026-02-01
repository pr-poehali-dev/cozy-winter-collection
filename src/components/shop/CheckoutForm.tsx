import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';

interface CheckoutData {
  name: string;
  email: string;
  phone: string;
  address: string;
  comment: string;
  telegram: string;
  deliveryType: '' | 'pvz' | 'pickup';
  promoCode: string;
  isAnonymous: boolean;
  giftMessage: string;
}

interface CheckoutFormProps {
  checkoutData: CheckoutData;
  setCheckoutData: (data: CheckoutData) => void;
  deliveryCost: number;
  setDeliveryCost: (cost: number) => void;
  promoDiscount: number;
  setPromoDiscount: (discount: number) => void;
  cartTotal: number;
  isCheckoutLoading: boolean;
  onCheckout: () => void;
}

export default function CheckoutForm({
  checkoutData,
  setCheckoutData,
  deliveryCost,
  setDeliveryCost,
  promoDiscount,
  setPromoDiscount,
  cartTotal,
  isCheckoutLoading,
  onCheckout
}: CheckoutFormProps) {
  const [hasGift, setHasGift] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('checkoutUserData');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setCheckoutData({ 
        ...checkoutData, 
        name: parsed.name || '',
        email: parsed.email || '',
        phone: parsed.phone || '+7',
        telegram: parsed.telegram || '@'
      });
    }
  }, []);

  const saveUserData = (data: CheckoutData) => {
    const userDataToSave = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      telegram: data.telegram
    };
    localStorage.setItem('checkoutUserData', JSON.stringify(userDataToSave));
  };

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    
    if (cleaned.length === 0) return '';
    
    let formatted = '+7';
    if (cleaned.length > 1) {
      formatted += ' (' + cleaned.substring(1, 4);
    }
    if (cleaned.length > 4) {
      formatted += ') ' + cleaned.substring(4, 7);
    }
    if (cleaned.length > 7) {
      formatted += '-' + cleaned.substring(7, 9);
    }
    if (cleaned.length > 9) {
      formatted += '-' + cleaned.substring(9, 11);
    }
    
    return formatted;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const cleaned = value.replace(/\D/g, '');
    
    if (cleaned.length <= 11) {
      const formatted = formatPhoneNumber(cleaned.startsWith('7') ? cleaned : '7' + cleaned);
      const newData = { ...checkoutData, phone: formatted };
      setCheckoutData(newData);
      saveUserData(newData);
    }
  };

  const handleTelegramChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    
    if (!value.startsWith('@') && value.length > 0) {
      value = '@' + value.replace(/@/g, '');
    }
    
    const newData = { ...checkoutData, telegram: value };
    setCheckoutData(newData);
    saveUserData(newData);
  };

  return (
    <div className="flex-1 flex flex-col mt-8 overflow-hidden">
      <div className="space-y-4 flex-1 overflow-y-auto pb-4 px-4 md:px-6">
        <div className="space-y-2">
          <Label htmlFor="name">ваше имя</Label>
          <Input
            id="name"
            type="text"
            value={checkoutData.name}
            onChange={(e) => {
              const newData = { ...checkoutData, name: e.target.value };
              setCheckoutData(newData);
              saveUserData(newData);
            }}
            className="font-light"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">ваш email</Label>
          <Input
            id="email"
            type="email"
            value={checkoutData.email}
            onChange={(e) => {
              const newData = { ...checkoutData, email: e.target.value };
              setCheckoutData(newData);
              saveUserData(newData);
            }}
            className="font-light"
            placeholder="example@mail.ru"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="telegram">ваш telegram</Label>
          <Input
            id="telegram"
            type="text"
            value={checkoutData.telegram || '@'}
            onChange={handleTelegramChange}
            className="font-light"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">телефон получателя</Label>
          <Input
            id="phone"
            type="tel"
            value={checkoutData.phone || '+7'}
            onChange={handlePhoneChange}
            className="font-light"
          />
          <p className="text-xs text-muted-foreground font-light">
            код для получения посылки придёт в приложении ozon
          </p>
        </div>

        <div className="space-y-3">
          <Label>способ доставки</Label>
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
              <div className="font-semibold text-sm mb-1">пвз ozon</div>
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
              <div className="font-semibold text-sm mb-1">самовывоз</div>
              <div className="text-xs text-muted-foreground font-light">бесплатно</div>
            </button>
          </div>
        </div>

        {checkoutData.deliveryType === 'pvz' && (
          <div className="space-y-2">
            <Label htmlFor="address">адрес пвз ozon</Label>
            <Input
              id="address"
              type="text"
              value={checkoutData.address}
              onChange={(e) => setCheckoutData({ ...checkoutData, address: e.target.value })}
              className="font-light"
            />
            <p className="text-xs text-muted-foreground font-light">
              <a href="https://www.ozon.ru/geo/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                найти ближайший пункт выдачи на карте ozon →
              </a>
            </p>
          </div>
        )}

        {checkoutData.deliveryType === 'pickup' && (
          <div className="space-y-2">
            <Label>адрес самовывоза</Label>
            <div className="p-3 rounded-lg bg-secondary/50 border border-border">
              <p className="text-sm font-light">москва, м. тульская</p>
            </div>
            <p className="text-xs text-muted-foreground font-light mt-2">
              свяжемся для согласования времени встречи
            </p>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="comment">комментарий к заказу</Label>
          <Textarea
            id="comment"
            value={checkoutData.comment}
            onChange={(e) => setCheckoutData({ ...checkoutData, comment: e.target.value })}
            className="font-light resize-none"
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="giftMessage">текст для открытки (необязательно)</Label>
          <Input
            id="giftMessage"
            type="text"
            maxLength={50}
            value={checkoutData.giftMessage}
            onChange={(e) => setCheckoutData({ ...checkoutData, giftMessage: e.target.value })}
            className="font-light"
            placeholder="например: с любовью, анна"
          />
          <p className="text-xs text-muted-foreground font-light">
            {(checkoutData.giftMessage || '').length}/50 символов
          </p>
        </div>

        <div className="flex items-center space-x-2 p-3 rounded-lg border border-border">
          <input
            type="checkbox"
            id="isAnonymous"
            checked={checkoutData.isAnonymous}
            onChange={(e) => setCheckoutData({ ...checkoutData, isAnonymous: e.target.checked })}
            className="w-4 h-4 rounded border-gray-300"
          />
          <Label htmlFor="isAnonymous" className="cursor-pointer font-light">
            отправить анонимно (без моего имени на упаковке)
          </Label>
        </div>
      </div>

      <div className="flex-shrink-0 border-t border-border pt-4 mt-4 pb-6 px-4 md:px-6">
        <div className="space-y-2 mb-4">
          {promoDiscount > 0 && (
            <div className="flex justify-between items-center text-sm">
              <span className="font-light text-muted-foreground">Скидка:</span>
              <span className="font-light text-green-600">-{promoDiscount.toLocaleString('ru-RU')} ₽</span>
            </div>
          )}
          <div className="flex justify-between items-center pt-2">
            <span className="text-lg font-light text-primary">итого:</span>
            <span className="text-2xl font-light text-primary">{(cartTotal + deliveryCost - promoDiscount).toLocaleString('ru-RU')} ₽</span>
          </div>
        </div>
        <button 
          onClick={onCheckout}
          disabled={isCheckoutLoading}
          className="w-full bg-primary text-white py-3 rounded-lg font-light hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {isCheckoutLoading ? 'оформляем...' : 'перейти к оплате'}
        </button>
      </div>
    </div>
  );
}