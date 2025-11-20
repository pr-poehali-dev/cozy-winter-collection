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
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col">
      <Header
        cart={cart}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        updateQuantity={() => {}}
        removeFromCart={() => {}}
        cartTotal={cartTotal}
        cartCount={cartCount}
      />

      <main className="flex-1 pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center gap-6 mb-12">
            <a
              href="https://t.me/azalukk"
              target="_blank"
              rel="noopener noreferrer"
              className="w-16 h-16 rounded-full bg-primary flex items-center justify-center hover:scale-110 transition-transform"
              aria-label="Telegram"
            >
              <Icon name="Send" size={28} className="text-white" strokeWidth={1.5} />
            </a>
            <a
              href="mailto:azaluk.halimova@gmail.com"
              className="w-16 h-16 rounded-full bg-primary flex items-center justify-center hover:scale-110 transition-transform"
              aria-label="Email"
            >
              <Icon name="Mail" size={28} className="text-white" strokeWidth={1.5} />
            </a>
            <a
              href="https://vk.com/azalukk"
              target="_blank"
              rel="noopener noreferrer"
              className="w-16 h-16 rounded-full bg-primary flex items-center justify-center hover:scale-110 transition-transform"
              aria-label="VK"
            >
              <Icon name="Share2" size={28} className="text-white" strokeWidth={1.5} />
            </a>
          </div>

          <p className="text-center text-primary/80 font-light text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            с радостью ответим на любые ваши вопросы, связанные с заказами и ассортиментом
          </p>

          <div className="text-center space-y-3 mb-12">
            <div className="text-primary font-light">
              <span className="font-normal">почта:</span> azaluk.halimova@gmail.com
            </div>
            <div className="text-primary font-light">
              <span className="font-normal">телеграм:</span> @azalukk
            </div>
          </div>

          <p className="text-center text-primary/70 font-light text-sm md:text-base max-w-3xl mx-auto leading-relaxed mb-12">
            а ещё мы с удовольствием разместим свои товары у вас в магазине книг или подарков, кафе или кофейне, уютном городском пространстве или на полочках вашей тату-студии 🤍
          </p>

          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img 
              src="https://cdn.poehali.dev/files/c6135958-072c-49ce-af5e-e447efea7864.png" 
              alt="Наши изделия"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}