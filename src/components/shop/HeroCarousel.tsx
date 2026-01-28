import { useState, useEffect } from 'react';
import { heroSlides } from './data';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      setImageLoaded(false);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setImageLoaded(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setImageLoaded(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setImageLoaded(false);
  };

  const handleButtonClick = () => {
    const slide = heroSlides[currentSlide];
    if (slide.buttonAction === 'catalog' || slide.buttonAction === 'valentines') {
      const catalog = document.getElementById('catalog');
      if (catalog) {
        const yOffset = -100;
        const y = catalog.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    } else if (slide.buttonAction === 'surprise') {
      const surprise = document.getElementById('surprise-section');
      if (surprise) {
        const yOffset = -100;
        const y = surprise.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    } else if (slide.buttonAction === 'delivery') {
      window.location.href = '/delivery';
    } else if (slide.buttonAction === 'reviews') {
      const reviews = document.getElementById('reviews');
      if (reviews) {
        const yOffset = -100;
        const y = reviews.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  const currentSlideData = heroSlides[currentSlide];

  return (
    <section className="relative overflow-hidden mt-[72px]">
      <div className="relative w-full">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 via-primary/5 to-transparent z-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 border-4 border-transparent border-t-primary/40 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
            </div>
          </div>
        )}

        <div className="relative">
          <picture>
            <source media="(min-width: 768px)" srcSet={currentSlideData.image} />
            <source media="(max-width: 767px)" srcSet={currentSlideData.imageMobile || currentSlideData.image} />
            <img
              key={currentSlide}
              src={currentSlideData.image}
              alt={currentSlideData.title}
              className={`w-full h-[50vh] md:h-[85vh] object-cover transition-opacity duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImageLoaded(true)}
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60"></div>
          
          {currentSlideData.floatingQuotes && imageLoaded && (
            <div className="absolute inset-0 z-20 pointer-events-none">
              {currentSlideData.floatingQuotes.map((quote, index) => {
                const configs = {
                  'top-left': {
                    position: 'top-[6%] left-[6%] md:top-[10%] md:left-[8%]',
                    bokeh: [
                      { size: 'w-20 h-20 md:w-32 md:h-32', pos: 'top-2 right-4 md:top-4 md:right-8', opacity: 'opacity-40' },
                      { size: 'w-12 h-12 md:w-20 md:h-20', pos: 'bottom-6 left-8 md:bottom-8 md:left-12', opacity: 'opacity-30' }
                    ]
                  },
                  'top-right': {
                    position: 'top-[8%] right-[6%] md:top-[12%] md:right-[8%]',
                    bokeh: [
                      { size: 'w-24 h-24 md:w-36 md:h-36', pos: 'top-0 left-6 md:top-2 md:left-10', opacity: 'opacity-50' },
                      { size: 'w-14 h-14 md:w-24 md:h-24', pos: 'bottom-4 right-2 md:bottom-6 md:right-4', opacity: 'opacity-35' }
                    ]
                  },
                  'bottom-left': {
                    position: 'bottom-[30%] left-[6%] md:bottom-[34%] md:left-[10%]',
                    bokeh: [
                      { size: 'w-16 h-16 md:w-28 md:h-28', pos: '-top-4 right-4 md:-top-6 md:right-8', opacity: 'opacity-45' },
                      { size: 'w-10 h-10 md:w-16 md:h-16', pos: 'bottom-2 left-6 md:bottom-4 md:left-10', opacity: 'opacity-25' }
                    ]
                  }
                };
                
                const config = configs[quote.position];
                const animationClasses = ['animate-float', 'animate-float-slow', 'animate-float-delayed'];
                
                return (
                  <div
                    key={index}
                    className={`absolute ${config.position} ${animationClasses[index]}`}
                  >
                    <div className="relative">
                      {config.bokeh.map((bokeh, i) => (
                        <div
                          key={i}
                          className={`absolute ${bokeh.pos} ${bokeh.size} ${bokeh.opacity} bg-gradient-radial from-amber-200/60 via-amber-100/40 to-transparent rounded-full blur-xl -z-10`}
                        />
                      ))}
                      <div className="relative bg-black/40 backdrop-blur-sm px-4 py-2.5 md:px-5 md:py-3 rounded-2xl shadow-2xl border border-white/20 max-w-[170px] md:max-w-[230px]">
                        <p className="text-xs md:text-sm font-light text-white/95 leading-relaxed italic">
                          {quote.text}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-full p-2 md:p-3 transition-all duration-300 border border-white/40"
          aria-label="Предыдущий слайд"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-full p-2 md:p-3 transition-all duration-300 border border-white/40"
          aria-label="Следующий слайд"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white w-8'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Перейти к слайду ${index + 1}`}
            />
          ))}
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-end text-center px-4 pb-12 md:px-6 md:pb-20 z-10">
          <div className="max-w-5xl w-full space-y-3 md:space-y-12">
            <div className="space-y-2 md:space-y-6">
              <p className="text-[9px] md:text-sm text-white/90 uppercase tracking-[0.25em] md:tracking-[0.35em] font-light">
                {currentSlideData.subtitle}
              </p>
              <h1 
                className="text-2xl md:text-5xl leading-[1.2] px-2 max-w-6xl font-light text-[#fffbf7f5]"
                style={{ fontFamily: 'Cormorant, serif', fontWeight: 300, letterSpacing: '0.02em' }}
              >
                {currentSlideData.title}
              </h1>
            </div>
            
            <button
              className="rounded-full px-8 py-2.5 md:px-14 md:py-4 text-[11px] md:text-base text-primary hover:bg-white hover:scale-[1.02] transition-all duration-300 font-light tracking-[0.08em] shadow-2xl backdrop-blur-sm bg-[#fff8ed]"
              onClick={handleButtonClick}
            >
              {currentSlideData.buttonText}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}