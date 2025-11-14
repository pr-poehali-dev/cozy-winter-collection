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

      <main className="flex-1 py-20 px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-light text-primary mb-12 text-center">
            оплата и доставка
          </h1>

          <div className="space-y-12">
            <section className="vintage-card p-8 rounded-2xl">
              <h2 className="text-2xl md:text-3xl font-light text-primary mb-6 flex items-center gap-3">
                <span className="text-3xl">🚚</span>
                доставка
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  каждая вещь создаётся вручную и отправляется из моей мастерской,
                  завёрнутая в бумагу и немного магии.
                </p>
                <p>
                  <strong className="text-primary font-light">доставка по россии и снг</strong> — почта россии, cdek, boxberry
                </p>
                <p>
                  <strong className="text-primary font-light">срок отправки</strong> — 3–5 рабочих дней после оплаты
                </p>
                <p>
                  <strong className="text-primary font-light">стоимость</strong> — рассчитывается индивидуально, зависит от веса и региона
                </p>
              </div>
            </section>

            <section className="vintage-card p-8 rounded-2xl">
              <h2 className="text-2xl md:text-3xl font-light text-primary mb-6 flex items-center gap-3">
                <span className="text-3xl">💳</span>
                оплата
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  принимаю оплату удобным для вас способом:
                </p>
                <ul className="space-y-2 ml-6">
                  <li>• перевод на карту сбербанк</li>
                  <li>• перевод на карту тинькофф</li>
                  <li>• оплата по номеру телефона</li>
                  <li>• наложенный платёж при получении (+ комиссия почты)</li>
                </ul>
                <p className="pt-4">
                  после оформления заказа я свяжусь с вами для уточнения деталей
                  и согласования способа оплаты ✨
                </p>
              </div>
            </section>

            <section className="vintage-card p-8 rounded-2xl">
              <h2 className="text-2xl md:text-3xl font-light text-primary mb-6 flex items-center gap-3">
                <span className="text-3xl">📦</span>
                упаковка
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  каждый заказ упаковываю с душой и заботой — в крафтовую бумагу,
                  с наклейками и маленькими сюрпризами внутри 🎁
                </p>
                <p>
                  если это подарок, могу добавить открытку с вашими пожеланиями —
                  просто напишите об этом при заказе 💌
                </p>
              </div>
            </section>

            <section className="vintage-card p-8 rounded-2xl bg-cream/50">
              <h2 className="text-2xl md:text-3xl font-light text-primary mb-6 flex items-center gap-3">
                <span className="text-3xl">💬</span>
                как заказать?
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <ol className="space-y-3 ml-6">
                  <li>1. добавьте понравившиеся вещи в корзину</li>
                  <li>2. нажмите "оформить заказ"</li>
                  <li>3. я свяжусь с вами для уточнения деталей</li>
                  <li>4. после оплаты начну создавать ваш заказ ✨</li>
                  <li>5. отправлю номер для отслеживания посылки</li>
                </ol>
                <p className="pt-4">
                  если остались вопросы — пишите, с радостью отвечу! 💗
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}