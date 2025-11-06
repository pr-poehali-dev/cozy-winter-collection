import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';
import { CartItem } from './types';

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
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6 py-5 flex justify-between items-center">
        <h1 className="text-3xl tracking-wider mystical-text">azaluk</h1>
        <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="relative hover:bg-secondary transition-colors">
              <Icon name="ShoppingBag" size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-medium shadow-md">
                  {cartCount}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-lg">
            <SheetHeader>
              <SheetTitle className="text-3xl mystical-text">корзина</SheetTitle>
            </SheetHeader>
            <div className="mt-8 flex flex-col h-full">
              {cart.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground gap-4">
                  <Icon name="ShoppingBag" size={48} className="opacity-30" />
                  <p className="text-lg">корзина пуста</p>
                </div>
              ) : (
                <>
                  <div className="flex-1 overflow-auto space-y-4">
                    {cart.map(item => (
                      <div key={item.id} className="flex gap-4 pb-4 border-b border-border">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-sm">{item.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{item.price} ₽</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Button 
                              variant="outline" 
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => updateQuantity(item.id, -1)}
                            >
                              <Icon name="Minus" size={12} />
                            </Button>
                            <span className="text-sm w-8 text-center">{item.quantity}</span>
                            <Button 
                              variant="outline" 
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => updateQuantity(item.id, 1)}
                            >
                              <Icon name="Plus" size={12} />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="h-7 w-7 ml-auto"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Icon name="Trash2" size={14} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="pt-6 border-t border-border space-y-6">
                    <div className="flex justify-between items-center text-xl">
                      <span className="mystical-text">итого:</span>
                      <span className="mystical-text text-2xl">{cartTotal} ₽</span>
                    </div>
                    <Button className="w-full rounded-full py-6 text-base shadow-lg" size="lg">
                      оформить заказ
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                      доставка рассчитывается при оформлении
                    </p>
                  </div>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}