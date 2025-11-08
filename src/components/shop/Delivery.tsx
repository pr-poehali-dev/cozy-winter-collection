interface DeliveryProps {
  onCheckoutClick: () => void;
}

export default function Delivery({ onCheckoutClick }: DeliveryProps) {
  return (
    <section className="py-16 px-6 md:px-8 bg-gradient-to-br from-orange-50/30 to-amber-50/30">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-light text-primary mb-8">о доставке</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed font-light text-base">
          <p>
            каждая вещь создаётся вручную и отправляется из моей мастерской,
            завёрнутая в бумагу и немного магии.
          </p>
          <p>
            доставка по россии и снг. срок отправки — 3–5 дней.
          </p>
        </div>
        <div className="flex justify-center mt-8">
          <button 
            className="rounded-full px-10 py-3 bg-primary text-white hover:bg-primary/90 transition-colors text-sm font-light"
            onClick={onCheckoutClick}
          >
            оформить заказ
          </button>
        </div>
      </div>
    </section>
  );
}
