import Icon from '@/components/ui/icon';
import { CartItem, Product } from './types';

interface CartItemsListProps {
  cart: CartItem[];
  updateQuantity: (productId: number, delta: number, variantId?: string) => void;
  removeFromCart: (productId: number, variantId?: string) => void;
  cartTotal: number;
  isCheckoutLoading: boolean;
  onCheckout: () => void;
  addToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
  products: Product[];
}

export default function CartItemsList({
  cart,
  updateQuantity,
  removeFromCart,
  cartTotal,
  isCheckoutLoading,
  onCheckout,
  addToCart,
  onProductClick,
  products
}: CartItemsListProps) {
  const cartProductIds = cart.map(item => item.id);
  
  const recommendations = products
    .filter(p => !cartProductIds.includes(p.id))
    .filter(p => p.badge !== 'soon')
    .slice(0, 3);

  return (
    <>
      <div className="flex-1 overflow-auto mt-8 space-y-4 pb-4 px-6">
        {cart.map((item, index) => {
          const variantId = 'selectedVariantId' in item ? item.selectedVariantId : undefined;
          const cartKey = variantId ? `${item.id}-${variantId}` : `${item.id}-${index}`;
          const originalProduct = products.find(p => p.id === item.id);
          
          return (
          <div key={cartKey} className="flex gap-4 pb-4 border-b border-border">
            <img 
              src={item.image} 
              alt={item.name}
              className="w-20 h-20 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => originalProduct && onProductClick(originalProduct)}
            />
            <div className="flex-1">
              <h3 
                className="font-light text-sm text-primary cursor-pointer hover:underline"
                onClick={() => originalProduct && onProductClick(originalProduct)}
              >
                {item.name}
              </h3>
              <p className="text-sm text-muted-foreground mt-1 font-light">{item.price.toLocaleString('ru-RU')} р.</p>
              <div className="flex items-center gap-2 mt-2">
                <button 
                  className="h-7 w-7 border border-border rounded hover:bg-secondary transition-colors flex items-center justify-center"
                  onClick={() => updateQuantity(item.id, -1, variantId)}
                >
                  <Icon name="Minus" size={12} />
                </button>
                <span className="text-sm w-8 text-center font-light">{item.quantity}</span>
                <button 
                  className="h-7 w-7 border border-border rounded hover:bg-secondary transition-colors flex items-center justify-center"
                  onClick={() => updateQuantity(item.id, 1, variantId)}
                >
                  <Icon name="Plus" size={12} />
                </button>
                <button 
                  className="h-7 w-7 ml-auto hover:bg-secondary rounded transition-colors flex items-center justify-center"
                  onClick={() => removeFromCart(item.id, variantId)}
                >
                  <Icon name="Trash2" size={14} />
                </button>
              </div>
            </div>
          </div>
        );
        })}
      </div>
      <div className="flex-shrink-0 border-t border-border pt-4 mt-4 px-6 pb-6">
        {recommendations.length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-light text-primary mb-3">возьми с собой ✨</h3>
            <div className="space-y-3">
              {recommendations.map(product => (
                <div key={product.id} className="flex gap-3 items-center">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-light text-primary truncate">{product.name}</h4>
                    <p className="text-xs text-muted-foreground font-light">{product.price.toLocaleString('ru-RU')} ₽</p>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                  >
                    <Icon name="Plus" size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
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