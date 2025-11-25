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

      <main className="flex-1 py-16 px-6 md:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-light text-primary mb-12 text-center">
            оплата и доставка
          </h1>

          <div className="space-y-8">
            <section className="vintage-card p-6 md:p-8 rounded-2xl">
              <h2 className="text-xl font-light text-primary mb-4 flex items-center gap-2">
                <span className="text-2xl">🏹</span>
                доставка
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed font-light">
                <p className="text-sm md:text-base">
                  каждая вещица создаётся нами вручную и отправляется упакованная в коробочку и немного магии!
                </p>
                
                <div className="grid md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 bg-secondary/30 rounded-lg border border-border">
                    <div className="flex items-start gap-2 mb-2">
                      <span className="text-lg">📦</span>
                      <div>
                        <p className="font-medium text-primary text-sm">пункт выдачи ozon</p>
                        <p className="text-sm text-muted-foreground">200 ₽ по всей россии</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      выберите удобный пункт при оформлении
                    </p>
                  </div>
                  
                  <div className="p-4 bg-secondary/30 rounded-lg border border-border">
                    <div className="flex items-start gap-2 mb-2">
                      <span className="text-lg">🤝</span>
                      <div>
                        <p className="font-medium text-primary text-sm">самовывоз</p>
                        <p className="text-sm text-muted-foreground">бесплатно</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      м. тульская, москва
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2 text-sm">
                  <span>⏱️</span>
                  <span><strong className="text-primary">срок:</strong> 3–5 рабочих дней после оплаты</span>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="p-3 bg-cream/40 rounded-lg text-xs">
                    <p>
                      <strong className="text-primary">для ozon:</strong> укажите номер телефона из личного кабинета ozon — заказ появится в приложении в течение суток 📱
                    </p>
                  </div>
                  <div className="p-3 bg-cream/40 rounded-lg text-xs">
                    <p>
                      <strong className="text-primary">для самовывоза:</strong> свяжемся с вами в телеграм для согласования времени 💬
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="vintage-card p-6 md:p-8 rounded-2xl">
              <h2 className="text-xl font-light text-primary mb-4 flex items-center gap-2">
                <span className="text-2xl">💳</span>
                оплата
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed font-light">
                <div className="grid grid-cols-3 md:grid-cols-5 gap-4 items-center">
                  <div className="p-3 bg-white rounded-lg flex items-center justify-center h-16 border border-border">
                    <img src="https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/files/add6be44-ee6f-4685-90be-36acd5d766be.jpg" alt="Visa" className="h-8 object-contain" />
                  </div>
                  <div className="p-3 bg-white rounded-lg flex items-center justify-center h-16 border border-border">
                    <img src="https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/files/1fcc1301-7390-470d-8153-4fe20e08badd.jpg" alt="Мир" className="h-8 object-contain" />
                  </div>
                  <div className="p-3 bg-white rounded-lg flex items-center justify-center h-16 border border-border">
                    <img src="https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/files/a54f21ea-a62f-4c7a-af8f-75be294718cc.jpg" alt="СБП" className="h-8 object-contain" />
                  </div>
                  <div className="p-3 bg-white rounded-lg flex items-center justify-center h-16 border border-border">
                    <img src="https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/files/7d49677e-33e5-4ec4-af6c-fbcfd2ddbc1b.jpg" alt="T-Pay" className="h-8 object-contain" />
                  </div>
                  <div className="p-3 bg-white rounded-lg flex items-center justify-center h-16 border border-border">
                    <img src="https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/files/a9ee93bd-c898-46ab-84b0-af3b92d650ca.jpg" alt="Яндекс Сплит" className="h-8 object-contain" />
                  </div>
                </div>

                <p className="text-sm pt-2">
                  оплата происходит через официальный сервис Robokassa и защищена протоколом SSL ✨
                </p>

                <div className="p-3 bg-cream/40 rounded-lg text-xs">
                  <p>
                    принимаем <strong className="text-primary">иностранные карты и криптовалюту</strong> — свяжитесь с нами в <a href="https://t.me/azalukshop" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">@azaluk.shop</a>
                  </p>
                </div>
              </div>
            </section>

            <section className="vintage-card p-6 md:p-8 rounded-2xl bg-cream/30 border-2 border-primary/20">
              <h2 className="text-xl font-light text-primary mb-4 flex items-center gap-2">
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