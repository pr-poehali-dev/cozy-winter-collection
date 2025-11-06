import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { HeroSlide } from './types';

interface HeroCarouselProps {
  slides: HeroSlide[];
  currentSlide: number;
  setCurrentSlide: (slide: number) => void;
}

export default function HeroCarousel({ slides, currentSlide, setCurrentSlide }: HeroCarouselProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="relative w-full h-screen">
        <img
          src={slides[0].image}
          alt={slides[0].title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-white/20"></div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <div className="max-w-3xl space-y-8 animate-fade-in">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-light text-primary leading-tight tracking-wide">
              {slides[0].title}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              {slides[0].subtitle}
            </p>
            
            <Button
              size="lg"
              className="mt-12 rounded-full px-12 py-7 text-base hover:scale-105 transition-transform shadow-lg"
              onClick={() => {
                document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              смотреть коллекцию
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}