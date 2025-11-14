import Icon from '@/components/ui/icon';
import { HeroSlide } from './types';

interface HeroCarouselProps {
  slides: HeroSlide[];
  currentSlide: number;
  setCurrentSlide: (slide: number) => void;
}

export default function HeroCarousel({ slides, currentSlide, setCurrentSlide }: HeroCarouselProps) {
  return (
    <section className="relative h-[70vh] md:h-[75vh] overflow-hidden bg-gradient-to-br from-white via-orange-50/30 to-amber-50/40">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="relative w-full h-full">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/30"></div>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
              <div className="max-w-xl space-y-4">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-white leading-relaxed tracking-wide">
                  {slide.title}
                </h2>
                <p className="text-sm md:text-base text-white/90 leading-relaxed font-light tracking-wide">
                  {slide.subtitle}
                </p>
                
                <button
                  className="mt-6 rounded-full px-8 py-2.5 text-xs md:text-sm bg-white/90 text-primary hover:bg-white transition-all font-light tracking-wide"
                  onClick={() => {
                    const targetId = slide.buttonAction === 'catalog' ? 'catalog' : 
                                    slide.buttonAction === 'delivery' ? 'delivery' : 'reviews';
                    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {slide.buttonText}
                </button>
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
        className="absolute left-4 bottom-12 md:top-1/2 md:-translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center text-white transition-all"
        aria-label="предыдущий слайд"
      >
        <Icon name="ChevronLeft" size={24} />
      </button>
      
      <button
        onClick={() => setCurrentSlide((currentSlide + 1) % slides.length)}
        className="absolute right-4 bottom-12 md:top-1/2 md:-translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center text-white transition-all"
        aria-label="следующий слайд"
      >
        <Icon name="ChevronRight" size={24} />
      </button>
    </section>
  );
}