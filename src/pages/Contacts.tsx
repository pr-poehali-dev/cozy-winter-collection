import { useState } from 'react';
import Icon from '@/components/ui/icon';
import Header from '@/components/shop/Header';
import Footer from '@/components/shop/Footer';
import { CartItem } from '@/components/shop/types';

export default function Contacts() {
  const [cart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header
        cart={cart}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        updateQuantity={() => {}}
        removeFromCart={() => {}}
        cartTotal={cartTotal}
        cartCount={cartCount}
      />

      <main className="flex-1 pt-32 pb-16 px-6 md:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-light text-primary mb-12 text-center">
            контакты
          </h1>

          <div className="space-y-8">
            <section className="vintage-card p-6 md:p-8 rounded-2xl">
              <h2 className="text-xl font-light text-primary mb-4 flex items-center gap-2">
                <span className="text-2xl">💬</span>
                свяжитесь с нами
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed font-light">
                <p className="text-sm md:text-base">
                  с радостью ответим на любые ваши вопросы, связанные с заказами и ассортиментом
                </p>
                
                <div className="space-y-3 pt-2">
                  <div className="p-4 bg-secondary/30 rounded-lg border border-border">
                    <p className="font-medium text-primary text-sm mb-1">почта:</p>
                    <a href="mailto:azaluk.halimova@gmail.com" className="text-sm hover:underline">azaluk.halimova@gmail.com</a>
                  </div>
                  
                  <div className="p-4 bg-secondary/30 rounded-lg border border-border">
                    <p className="font-medium text-primary text-sm mb-1">телеграм:</p>
                    <a href="https://t.me/azaluk" target="_blank" rel="noopener noreferrer" className="text-sm hover:underline">@azaluk</a>
                  </div>
                  
                  <div className="p-4 bg-secondary/30 rounded-lg border border-border">
                    <p className="font-medium text-primary text-sm mb-1">телефон:</p>
                    <a href="tel:+79001234567" className="text-sm hover:underline">+7 (900) 123-45-67</a>
                  </div>
                </div>

                <div className="flex justify-center gap-6 pt-4">
                  <a
                    href="https://t.me/azaluk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-primary flex items-center justify-center hover:scale-110 transition-transform"
                    aria-label="Telegram"
                  >
                    <Icon name="Send" size={20} className="text-white" strokeWidth={1.5} />
                  </a>
                  <a
                    href="https://www.youtube.com/@azaluk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-primary flex items-center justify-center hover:scale-110 transition-transform"
                    aria-label="YouTube"
                  >
                    <Icon name="Youtube" size={20} className="text-white" strokeWidth={1.5} />
                  </a>
                </div>
              </div>
            </section>

            <section className="vintage-card p-6 md:p-8 rounded-2xl bg-cream/30 border-2 border-primary/20">
              <h2 className="text-xl font-light text-primary mb-4 flex items-center gap-2">
                <span className="text-2xl">✨</span>
                сотрудничество
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed font-light">
                <p className="text-sm md:text-base">
                  а ещё мы с удовольствием разместим свои товары у вас в магазине книг или подарков, кафе или кофейне, уютном городском пространстве 🤍
                </p>
                
                <div className="rounded-2xl overflow-hidden shadow-lg mt-4">
                  <img 
                    src="https://cdn.poehali.dev/files/b92bfbfe-23cf-41f0-a7a2-f2212bac68b6.jpeg" 
                    alt="Наши изделия"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}