import Icon from '@/components/ui/icon';
import { CartItem } from './types';

interface CartItemsListProps {
  cart: CartItem[];
  updateQuantity: (productId: number, delta: number) => void;
  removeFromCart: (productId: number) => void;
  cartTotal: number;
  isCheckoutLoading: boolean;
  onCheckout: () => void;
}

export default function CartItemsList({
  cart,
  updateQuantity,
  removeFromCart,
  cartTotal,
  isCheckoutLoading,
  onCheckout
}: CartItemsListProps) {
  return (
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
          onClick={onCheckout}
          disabled={isCheckoutLoading || cart.length === 0}
          className="w-full bg-primary text-white py-3 rounded-lg font-light hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          оформить заказ
        </button>
      </div>
    </>
  );
}
