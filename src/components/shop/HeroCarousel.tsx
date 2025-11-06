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
    <section className="relative min-h-screen overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="relative w-full h-screen">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
              <div className="max-w-4xl space-y-6 animate-fade-in">
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-light text-white leading-tight">
                  {slide.title}
                </h2>
                <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                  {slide.subtitle}
                </p>
                
                <Button
                  size="lg"
                  className="mt-8 rounded-full px-10 py-6 text-base bg-white/90 text-primary hover:bg-white hover:scale-105 transition-transform"
                  onClick={() => {
                    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  войти в лавку
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`слайд ${index + 1}`}
          />
        ))}
      </div>
      
      <button
        onClick={() => setCurrentSlide((currentSlide - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center text-white transition-all"
        aria-label="предыдущий слайд"
      >
        <Icon name="ChevronLeft" size={24} />
      </button>
      
      <button
        onClick={() => setCurrentSlide((currentSlide + 1) % slides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center text-white transition-all"
        aria-label="следующий слайд"
      >
        <Icon name="ChevronRight" size={24} />
      </button>
    </section>
  );
}
