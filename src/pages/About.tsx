import { useState } from 'react';
import { CartItem } from "@/components/shop/types";
import Header from "@/components/shop/Header";
import Footer from "@/components/shop/Footer";

export default function About() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const updateQuantity = (productId: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === productId) {
            const newQuantity = item.quantity + delta;
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
          }
          return item;
        })
        .filter((item) => item.quantity > 0),
    );
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  return (
    <div className="min-h-screen">
      <Header
        cart={cart}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        cartTotal={cartTotal}
        cartCount={cartCount}
      />

      <div className="container mx-auto px-6 md:px-4 pt-24 pb-16 max-w-4xl">
        <div className="space-y-16 animate-in fade-in duration-700">
          <div className="text-center">
            <p className="text-moss/70 leading-relaxed max-w-2xl mx-auto text-base md:text-lg">
              <span className="text-wine font-medium">azaluk shop</span> — это маленький магазин из мира двух подруг, <span className="font-semibold">Азалии</span> и <span className="font-semibold">Вики</span>.
              <br />
              мы вместе разрабатываем и создаём вещи, в которых живут уют и немного сказки.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-3xl mx-auto px-2 md:px-0">
            <div className="space-y-4">
              <div className="aspect-[4/3] bg-moss/10 rounded-2xl overflow-hidden">
                <img 
                  src="https://cdn.poehali.dev/files/36358c56-fbd3-4e96-8bba-c134ce00ab3e.jpg" 
                  alt="Азалия с камерой"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="space-y-4 relative">
                <div className="absolute top-12 -right-2 text-lg">📸</div>
                <h2 className="text-xl md:text-2xl font-medium text-wine">привет, я азалия! ✨</h2>
                <div className="space-y-3 text-moss/70 leading-relaxed text-sm md:text-base">
                  <p>
                    я придумала этот проект и отвечаю за то, какие изделия будут продаваться в azaluk.
                  </p>
                  <p>
                    снимаю наши фото и видео, оформляю сайт и блоги, продумываю стратегии роста, собираю заказы и общаюсь с вами в поддержке тоже я
                  </p>
                  <p>
                    веду{' '}
                    <a 
                      href="https://www.youtube.com/@azaluk" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="link-red transition-colors"
                    >
                      ютуб
                    </a>
                    {' '}и{' '}
                    <a 
                      href="https://t.me/azalukk" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="link-red transition-colors"
                    >
                      телеграм
                    </a>
                    {' '}каналы, в них делюсь своим мировоззрением, привношу волшебство в повседневность и показываю наши внутренние процессы.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4 md:mt-16">
              <div className="aspect-[4/3] bg-moss/10 rounded-2xl overflow-hidden">
                <img 
                  src="https://cdn.poehali.dev/files/bf310f2c-13fe-4e0c-87e8-02da9d338017.png" 
                  alt="Вика с изделиями"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="space-y-4 relative">
                <div className="absolute top-16 right-4 text-lg">✂️</div>
                <h2 className="text-xl md:text-2xl font-medium text-wine">а это вика! 🧵</h2>
                <div className="space-y-3 text-moss/70 leading-relaxed text-sm md:text-base">
                  <p>она — волшебные руки azaluk shop.</p>
                  <p>
                    именно Вика воплощает наши идеи в реальность — в тканях, нитях и деталях: подбирает материалы, создаёт образцы, тестирует идеи
                  </p>
                  <p>
                    благодаря ей вы получаете изделия в таком виде, в котором они приходят
                  </p>
                  <p>
                    <a 
                      href="https://t.me/viktoria_sivolobova" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="link-red transition-colors"
                    >
                      подглядеть за каналом вики
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center py-12 relative">
            <div className="absolute -top-2 left-[10%] text-3xl">🧶</div>
            <div className="absolute top-8 right-[15%] text-3xl">✨</div>
            <div className="absolute bottom-4 left-[20%] text-2xl">🪄</div>
            <div className="absolute bottom-12 right-[12%] text-2xl">🍵</div>
            
            <div className="max-w-md mx-auto bg-moss/5 rounded-3xl p-8 md:p-10 border border-moss/10 relative z-10">
              <p className="text-base md:text-lg text-moss/70 leading-relaxed italic">
                вместе мы делаем вещи, которыми приятно любоваться, их хочется держать в руках и носить с собой
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}