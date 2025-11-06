import { Button } from '@/components/ui/button';

interface DeliveryProps {
  onCheckoutClick: () => void;
}

export default function Delivery({ onCheckoutClick }: DeliveryProps) {
  return (
    <section className="py-20 px-4 paper-texture border-t border-border">
      <div className="container mx-auto max-w-3xl animate-fade-in">
        <h2 className="text-4xl mb-8 mystical-text text-center">о доставке</h2>
        <div className="prose prose-lg mx-auto text-muted-foreground leading-relaxed space-y-4 text-left">
          <p>
            каждая вещь создаётся вручную и отправляется из моей мастерской,
            завёрнутая в бумагу и немного магии.
          </p>
          <p>
            доставка по россии и снг. срок отправки — 3–5 дней.
          </p>
        </div>
        <div className="flex justify-center mt-8">
          <Button size="lg" className="rounded-full px-8 candle-glow" onClick={onCheckoutClick}>
            завернуть и отправить
          </Button>
        </div>
      </div>
    </section>
  );
}
