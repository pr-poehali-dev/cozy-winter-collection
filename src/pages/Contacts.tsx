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
    <div className="min-h-screen bg-gradient-to-br from-cream/30 via-background to-cream/20 flex flex-col">
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
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-light text-primary mb-4 text-center">
            контакты
          </h1>
          <p className="text-center text-muted-foreground font-light text-sm md:text-base mb-12 leading-relaxed">
            с радостью ответим на любые ваши вопросы 💌
          </p>

          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-3xl shadow-sm border border-primary/10">
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <span className="text-2xl mt-1">📧</span>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">почта</p>
                    <a href="mailto:azaluk.halimova@gmail.com" className="text-primary hover:underline font-light">
                      azaluk.halimova@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <span className="text-2xl mt-1">💬</span>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">телеграм</p>
                    <a href="https://t.me/azaluk" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-light">
                      @azaluk
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-3xl shadow-sm border border-primary/10">
              <p className="text-xs text-muted-foreground mb-4 uppercase tracking-wide text-center">наши блоги</p>
              <div className="flex justify-center gap-4">
                <a
                  href="https://t.me/azalukk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="w-11 h-11 rounded-full bg-primary/90 flex items-center justify-center group-hover:bg-primary group-hover:scale-105 transition-all">
                    <Icon name="Send" size={18} className="text-white" strokeWidth={1.5} />
                  </div>
                  <span className="text-xs text-muted-foreground font-light">телеграм-канал</span>
                </a>
                <a
                  href="https://www.youtube.com/@azaluk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="w-11 h-11 rounded-full bg-primary/90 flex items-center justify-center group-hover:bg-primary group-hover:scale-105 transition-all">
                    <Icon name="Youtube" size={18} className="text-white" strokeWidth={1.5} />
                  </div>
                  <span className="text-xs text-muted-foreground font-light">ютуб-канал</span>
                </a>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm p-6 md:p-8 rounded-3xl shadow-sm border border-primary/10">
              <p className="text-2xl mb-4 text-center">✨</p>
              <p className="text-sm md:text-base text-muted-foreground font-light leading-relaxed text-center mb-4">
                мы с удовольствием разместим свои товары у вас в магазине книг или подарков, кафе или кофейне, уютном городском пространстве
              </p>
              <p className="text-sm md:text-base text-muted-foreground font-light leading-relaxed text-center">
                также готовы создать партию изделий специально для вашего проекта или события — свадьбы, корпоратива, подарков для гостей
              </p>
            </div>

            <div className="rounded-3xl overflow-hidden shadow-md">
              <img 
                src="https://cdn.poehali.dev/files/b92bfbfe-23cf-41f0-a7a2-f2212bac68b6.jpeg" 
                alt="Наши изделия"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}