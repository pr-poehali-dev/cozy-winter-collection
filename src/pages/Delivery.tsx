import { useState } from "react";
import { CartItem } from "@/components/shop/types";
import Header from "@/components/shop/Header";
import Footer from "@/components/shop/Footer";

export default function DeliveryPage() {
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
    <div className="min-h-screen flex flex-col">
      <Header
        cart={cart}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        cartTotal={cartTotal}
        cartCount={cartCount}
      />

      <main className="flex-1 pt-32 pb-16 px-6 md:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-4">
            <span className="text-2xl">🎠 ☁️ 🍄</span>
          </div>
          <p className="text-center text-muted-foreground font-light text-sm md:text-base mb-12 leading-relaxed">
            каждая вещица создаётся вручную и отправляется в коробочке с капелькой магии!
          </p>
          <div className="space-y-8">
            <section className="p-6 md:p-8 rounded-3xl border border-primary/20">
              <h2 className="text-2xl md:text-3xl font-light text-primary mb-6" style={{ fontFamily: 'Cormorant, serif' }}>
                🏹 доставка
              </h2>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl border border-primary/10 bg-[#ffffff]">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📦</span>
                      <div>
                        <p className="text-sm font-light text-primary">пункт выдачи ozon • 200 ₽</p>
                        <p className="text-xs text-muted-foreground font-light">по всей россии, 3–5 дней</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-5 rounded-2xl border border-primary/10 bg-[#ffffff]">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🤝</span>
                      <div>
                        <p className="text-sm font-light text-primary">самовывоз • бесплатно</p>
                        <p className="text-xs text-muted-foreground font-light">м. тульская, москва</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground font-light space-y-2 pt-2">
                  <p>📱 <span className="text-primary font-light">ozon:</span> при оформлении заказа укажите номер телефона вашего личного кабинета — заказ появится в приложении в течение суток</p>
                  <p>💬 <span className="text-primary font-light">самовывоз:</span> свяжемся с вами в телеграм для согласования времени</p>
                </div>
              </div>
            </section>

            <section className="p-6 md:p-8 rounded-3xl border border-primary/20">
              <h2 className="text-2xl md:text-3xl font-light text-primary mb-6 flex items-center gap-2" style={{ fontFamily: 'Cormorant, serif' }}>
                <span className="text-2xl">💰</span>
                оплата
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed font-light">
                <p className="text-sm">
                  возможна оплата банковскими картами, СБП, T-Pay, Яндекс Сплит
                </p>

                <p className="text-sm">
                  оплата происходит через официальный сервис Robokassa и защищена протоколом SSL ✨
                </p>

                <p className="text-sm">для оплаты иностранными картами или криптовалютой свяжитесь с нами в телеграм</p>
              </div>
            </section>

            <section className="p-6 md:p-8 rounded-3xl border border-primary/20">
              <h2 className="text-2xl md:text-3xl font-light text-primary mb-6 flex items-center gap-2" style={{ fontFamily: 'Cormorant, serif' }}>
                <span className="text-2xl">✨</span>
                как оформить заказ
              </h2>
              <div className="space-y-3 text-muted-foreground font-light">
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs text-primary font-medium">1</span>
                  <p className="text-sm">добавьте товары в корзину</p>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs text-primary font-medium">2</span>
                  <p className="text-sm">выберите доставку (пвз ozon или самовывоз)</p>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs text-primary font-medium">3</span>
                  <p className="text-sm">укажите контактные данные</p>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs text-primary font-medium">4</span>
                  <p className="text-sm">оплатите удобным способом</p>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs text-primary font-medium">5</span>
                  <p className="text-sm">мы начнём собирать ваш заказ ✨</p>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs text-primary font-medium">6</span>
                  <p className="text-sm">свяжемся в тг или заказ появится в приложении ozon</p>
                </div>

                <div className="pt-4 text-center">
                  <p className="text-sm">
                    остались вопросы? <a href="https://t.me/azalukshop" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">напишите нам</a> 💗
                  </p>
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