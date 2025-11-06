import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

const heroSlides = [
  {
    id: 1,
    image: 'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/files/600d4767-07d5-44f9-a0e1-252c0957f2fe.jpg',
    title: 'с любовью упаковываем каждый заказ',
    subtitle: 'и будем очень рады увидеть ваш отзыв'
  },
  {
    id: 2,
    image: 'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/files/c94cf0e0-cf07-4176-8582-b130f2003e38.jpg',
    title: 'всё переплетено',
    subtitle: 'вы лучшие, люблю'
  },
  {
    id: 3,
    image: 'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/files/52ca4309-37b3-4058-bccc-94a511e49fd2.jpg',
    title: 'вещи с душой',
    subtitle: 'мир тебя оберегает'
  }
];

const products: Product[] = [
  {
    id: 1,
    name: 'косынка «туманное утро»',
    description: 'согревает, как дыхание в мороз, и хранит покой',
    price: 2500,
    category: 'для зимней прогулки',
    image: 'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/files/c94cf0e0-cf07-4176-8582-b130f2003e38.jpg'
  },
  {
    id: 2,
    name: 'вязаный чепчик «лунное сияние»',
    description: 'укутывает теплом, как старая сказка перед сном',
    price: 3200,
    category: 'для дома',
    image: 'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/files/c3883d55-8801-4fdc-aef9-82b39a393bf6.jpg'
  },
  {
    id: 3,
    name: 'подвес «зеркальная пыль»',
    description: 'крошечный амулет для тех, кто ищет свет в себе',
    price: 800,
    category: 'для дома',
    image: 'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/files/546e0ba9-0bc8-4a91-a941-a0540466f7db.jpg'
  },
  {
    id: 4,
    name: 'бумажная гирлянда «шёпот бумаги»',
    description: 'шуршит, как страницы старого дневника',
    price: 1500,
    category: 'для дома',
    image: 'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/files/00ba75c0-9906-4158-be80-2ae3f819fdfe.jpg'
  },
  {
    id: 5,
    name: 'световая гирлянда «золотое сияние»',
    description: 'свет, который хочется обнимать и хранить',
    price: 2800,
    category: 'для дома',
    image: 'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/files/76e1bef3-65b2-446c-a55f-b98fbd010e7a.jpg'
  },
  {
    id: 6,
    name: 'набор «сказочный сундук»',
    description: 'косынка, чепчик и гирлянда — вся магия в одной коробке',
    price: 6500,
    category: 'наборы и боксы',
    image: 'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/files/52ca4309-37b3-4058-bccc-94a511e49fd2.jpg'
  }
];

interface CartItem extends Product {
  quantity: number;
}

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState<string>('все');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const categories = ['все', 'для дома', 'для зимней прогулки', 'наборы и боксы'];

  const filteredProducts = selectedCategory === 'все' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 vintage-card border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl tracking-wide mystical-text">azaluk</h1>
          <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Icon name="ShoppingBag" size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg">
              <SheetHeader>
                <SheetTitle className="text-2xl mystical-text">корзина</SheetTitle>
              </SheetHeader>
              <div className="mt-8 flex flex-col h-full">
                {cart.length === 0 ? (
                  <div className="flex-1 flex items-center justify-center text-muted-foreground">
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
                    <div className="pt-6 border-t border-border space-y-4">
                      <div className="flex justify-between items-center text-lg">
                        <span>итого:</span>
                        <span className="font-medium">{cartTotal} ₽</span>
                      </div>
                      <Button className="w-full candle-glow" size="lg">
                        завернуть и отправить
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <section className="relative min-h-screen overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="relative w-full h-screen">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
                <div className="max-w-4xl space-y-6 animate-fade-in">
                  <h2 className="text-5xl md:text-7xl lg:text-8xl font-light text-white leading-tight">
                    {slide.title}
                  </h2>
                  <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                    {slide.subtitle}
                  </p>
                  
                  <Button
                    size="lg"
                    className="mt-8 rounded-full px-10 py-6 text-base bg-white/90 text-primary hover:bg-white hover:scale-105 transition-transform"
                    onClick={() => {
                      document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    войти в лавку
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white w-8'
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`слайд ${index + 1}`}
            />
          ))}
        </div>
        
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center text-white transition-all"
          aria-label="предыдущий слайд"
        >
          <Icon name="ChevronLeft" size={24} />
        </button>
        
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center text-white transition-all"
          aria-label="следующий слайд"
        >
          <Icon name="ChevronRight" size={24} />
        </button>
      </section>
      
      <section className="py-24 px-4 paper-texture border-t border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="space-y-4 animate-fade-in">
              <div className="text-4xl mb-4">🕯️</div>
              <h3 className="text-xl mystical-text">сделано вручную</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                каждая вещь создаётся с вниманием к деталям
              </p>
            </div>
            
            <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="text-4xl mb-4">🌙</div>
              <h3 className="text-xl mystical-text">с душой и магией</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                вкладываю частичку своего мира в каждое изделие
              </p>
            </div>
            
            <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl mb-4">📜</div>
              <h3 className="text-xl mystical-text">с историей</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                каждая вещь — это страница из моего дневника
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-16 px-4 paper-texture">
        <div className="container mx-auto">
          <div className="flex flex-wrap gap-2 justify-center mb-12 animate-fade-in">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {filteredProducts.map((product, index) => (
              <Card 
                key={product.id} 
                className="group overflow-hidden border-0 vintage-card hover:candle-glow transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="overflow-hidden relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <CardContent className="p-6 bg-white/80">
                  <Badge variant="secondary" className="mb-3 rounded-full">
                    {product.category}
                  </Badge>
                  <h3 className="text-xl mb-2">{product.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium">{product.price} ₽</span>
                    <Button 
                      size="sm" 
                      className="rounded-full hover:candle-glow"
                      onClick={() => addToCart(product)}
                    >
                      <Icon name="Plus" size={16} className="mr-1" />
                      в корзину
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 paper-texture">
        <div className="container mx-auto max-w-3xl animate-fade-in">
          <h2 className="text-4xl mb-8 mystical-text text-center">о доставке</h2>
          <div className="prose prose-lg mx-auto text-muted-foreground leading-relaxed space-y-4 text-left">
            <p>
              каждая вещь создаётся вручную и отправляется из моей мастерской,
              завёрнутая в бумагу и немного магии.
            </p>
            <p>
              доставка по россии и снг. срок отправки — 3–5 дней.
            </p>
          </div>
          <div className="flex justify-center mt-8">
            <Button size="lg" className="rounded-full px-8 candle-glow" onClick={() => setIsCartOpen(true)}>
              завернуть и отправить
            </Button>
          </div>
        </div>
      </section>

      <footer className="py-12 px-4 border-t border-border vintage-card">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col items-center gap-6">
            <h3 className="text-2xl tracking-wide mystical-text">azaluk</h3>
            <div className="flex gap-6">
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-accent hover:text-primary transition-colors candle-glow"
              >
                <Icon name="Youtube" size={20} />
              </a>
              <a 
                href="https://t.me" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-accent hover:text-primary transition-colors candle-glow"
              >
                <Icon name="Send" size={20} />
              </a>
              <a 
                href="https://boosty.to" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-accent hover:text-primary transition-colors candle-glow"
              >
                <Icon name="Heart" size={20} />
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              2025
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}