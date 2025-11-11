import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';
import { CartItem } from './types';
import { useState } from 'react';
import { Link } from 'react-router-dom';

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-light text-primary tracking-wide">тропинка</h1>
        
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
            <a href="#contacts" className="text-sm font-light text-primary hover:text-muted-foreground transition-colors">
              контакты
            </a>
          </nav>
          
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <button className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors">
                <Icon name="Menu" size={20} className="text-primary" strokeWidth={1.5} />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
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
                <a 
                  href="#contacts" 
                  className="text-sm font-light text-primary hover:text-muted-foreground transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  контакты
                </a>
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
            <SheetContent className="w-full sm:max-w-lg">
            <SheetHeader>
              <SheetTitle className="text-2xl font-light text-primary">корзина</SheetTitle>
            </SheetHeader>
            <div className="mt-8 flex flex-col h-full">
              {cart.length === 0 ? (
                <div className="flex-1 flex items-center justify-center text-muted-foreground font-light">
                  <p>корзина пуста</p>
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
                  <div className="pt-6 border-t border-border space-y-4">
                    <div className="flex justify-between items-center text-lg font-light">
                      <span className="text-muted-foreground">итого:</span>
                      <span className="text-primary">{cartTotal.toLocaleString('ru-RU')} р.</span>
                    </div>
                    <button className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-light">
                      оформить заказ
                    </button>
                  </div>
                </>
              )}
            </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}