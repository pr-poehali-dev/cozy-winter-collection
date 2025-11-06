import { Button } from '@/components/ui/button';

interface DeliveryProps {
  onCheckoutClick: () => void;
}

export default function Delivery({ onCheckoutClick }: DeliveryProps) {
  return (
    <section className="py-24 px-4 bg-secondary/20">
      <div className="container mx-auto max-w-3xl animate-fade-in text-center">
        <h2 className="text-5xl mb-12 mystical-text">доставка</h2>
        <div className="space-y-6 text-muted-foreground leading-relaxed text-lg max-w-2xl mx-auto">
          <p>
            каждая вещь создаётся вручную и отправляется из моей мастерской, завёрнутая в бумагу и немного магии
          </p>
          <p>
            доставка по россии и снг · срок отправки 3–5 дней
          </p>
        </div>
        <div className="flex justify-center mt-12">
          <Button size="lg" className="rounded-full px-12 py-6 text-base shadow-lg" onClick={onCheckoutClick}>
            перейти к оформлению
          </Button>
        </div>
      </div>
    </section>
  );
}