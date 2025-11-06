import { useState } from 'react';
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

const products: Product[] = [
  {
    id: 1,
    name: 'Косынка «Розовая мечта»',
    description: '✨ Мягкая, как облако из Hannah Montana',
    price: 2500,
    category: 'для зимней прогулки',
    image: 'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/files/47fe9bb6-4bd6-4ee2-97f5-e25957111ac4.jpg'
  },
  {
    id: 2,
    name: 'Вязаный чепчик «Лавандовое утро»',
    description: '💜 Укутывает теплом, как обнимашки с подружками',
    price: 3200,
    category: 'для дома',
    image: 'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/files/0bff4e57-cbc7-40e6-8799-b5b317c881b8.jpg'
  },
  {
    id: 3,
    name: 'Подвес для помады «Glitter Magic»',
    description: '💕 Маленькая вещь с большой Y2K энергией',
    price: 800,
    category: 'для дома',
    image: 'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/files/e1719aad-9145-442b-b15e-c81de4da4a1a.jpg'
  },
  {
    id: 4,
    name: 'Бумажная гирлянда «Pastel Dreams»',
    description: '🌸 Украшение из твоего Tumblr-настроения',
    price: 1500,
    category: 'для дома',
    image: 'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/files/c077fe33-6b15-46da-99c7-2753f4ee0779.jpg'
  },
  {
    id: 5,
    name: 'Световая гирлянда «Fairy Lights»',
    description: '✨ Свет, как в спальне из сериалов 2000-х',
    price: 2800,
    category: 'для дома',
    image: 'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/files/3577154b-cec7-4245-85c7-66373b923492.jpg'
  },
  {
    id: 6,
    name: 'Набор «Сказочная шкатулка»',
    description: '🎀 Вся магия нулевых в одном боксе',
    price: 6500,
    category: 'наборы и боксы',
    image: 'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/files/ed2740ec-f2b3-461f-967e-c5f3bd5479bf.jpg'
  }
];

interface CartItem extends Product {
  quantity: number;
}

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState<string>('все');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

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
      <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl tracking-wide sparkle-text">azaluk ✨</h1>
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
                <SheetTitle className="text-2xl">Корзина</SheetTitle>
              </SheetHeader>
              <div className="mt-8 flex flex-col h-full">
                {cart.length === 0 ? (
                  <div className="flex-1 flex items-center justify-center text-muted-foreground">
                    <p>Корзина пуста</p>
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
                        <span>Итого:</span>
                        <span className="font-medium">{cartTotal} ₽</span>
                      </div>
                      <Button className="w-full" size="lg">
                        Оформить заказ
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <section className="pt-32 pb-20 px-4 animate-fade-in pearlescent">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="mb-12 overflow-hidden rounded-2xl shadow-xl">
            <img 
              src="https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/files/af6e04d3-6af4-45da-8e09-b57166de6ef9.jpg"
              alt="вещи из моего мира"
              className="w-full h-[500px] object-cover"
            />
          </div>
          <h2 className="text-5xl md:text-6xl mb-6 font-light sparkle-text">вещи из моего мира ✨</h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            ручные предметы уюта с энергией 💕 2000-х 💕
          </p>
          <Button 
            size="lg" 
            className="rounded-full px-8"
            onClick={() => {
              document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Посмотреть коллекцию
          </Button>
        </div>
      </section>

      <section id="catalog" className="py-16 px-4">
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
                className="group overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="overflow-hidden relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <CardContent className="p-6 bg-white/50">
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
                      className="rounded-full"
                      onClick={() => addToCart(product)}
                    >
                      <Icon name="Plus" size={16} className="mr-1" />
                      В корзину
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 pearlescent">
        <div className="container mx-auto max-w-3xl text-center animate-fade-in">
          <h2 className="text-4xl mb-8 sparkle-text">💌 О доставке и заказе</h2>
          <div className="prose prose-lg mx-auto text-muted-foreground leading-relaxed space-y-4">
            <p>
              Все вещи сделаны вручную и отправляются с заботой.
            </p>
            <p>
              Доставка по России и СНГ. Упаковано в крафт и ленточку.
            </p>
            <p>
              Срок отправки — 3–5 дней.
            </p>
          </div>
          <Button size="lg" className="mt-8 rounded-full px-8" onClick={() => setIsCartOpen(true)}>
            Оформить заказ
          </Button>
        </div>
      </section>

      <footer className="py-12 px-4 border-t border-border glass-card">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col items-center gap-6">
            <h3 className="text-2xl tracking-wide sparkle-text">azaluk ✨</h3>
            <div className="flex gap-6">
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-accent transition-colors"
              >
                <Icon name="Youtube" size={20} />
              </a>
              <a 
                href="https://t.me" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-accent transition-colors"
              >
                <Icon name="Send" size={20} />
              </a>
              <a 
                href="https://boosty.to" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-accent transition-colors"
              >
                <Icon name="Heart" size={20} />
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              создано с теплом и глиттерами 💕 azaluk, 2025
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}