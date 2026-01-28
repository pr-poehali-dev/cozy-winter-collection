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
          <img
            key={currentSlide}
            src={currentSlideData.image}
            alt={currentSlideData.title}
            className={`w-full md:h-[85vh] md:object-cover transition-opacity duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60"></div>
          
          {currentSlideData.floatingQuotes && imageLoaded && (
            <div className="absolute inset-0 z-20 pointer-events-none">
              {currentSlideData.floatingQuotes.map((quote, index) => {
                const positionClasses = {
                  'top-left': 'top-[12%] left-[8%] md:top-[15%] md:left-[10%]',
                  'top-right': 'top-[18%] right-[8%] md:top-[20%] md:right-[12%]',
                  'bottom-left': 'bottom-[25%] left-[10%] md:bottom-[28%] md:left-[15%]',
                  'bottom-right': 'bottom-[20%] right-[6%] md:bottom-[22%] md:right-[10%]'
                };
                
                return (
                  <div
                    key={index}
                    className={`absolute ${positionClasses[quote.position]} animate-fade-in opacity-0`}
                    style={{ 
                      animationDelay: `${0.3 + index * 0.15}s`,
                      animationFillMode: 'forwards'
                    }}
                  >
                    <div className="bg-white/90 backdrop-blur-sm px-3 py-2 md:px-4 md:py-2.5 rounded-2xl shadow-lg border border-white/50 max-w-[160px] md:max-w-[220px]">
                      <p className="text-[10px] md:text-sm font-light text-gray-800 leading-relaxed">
                        {quote.text}
                      </p>
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

        <div className="absolute inset-0 flex flex-col items-center justify-end text-center px-6 md:pb-20 z-10 py-[29px]">
          <div className="max-w-5xl space-y-6 md:space-y-12">
            <div className="space-y-4 md:space-y-6">
              <p className="text-[10px] md:text-sm text-white/90 uppercase tracking-[0.3em] md:tracking-[0.35em] font-light">
                {currentSlideData.subtitle}
              </p>
              <h1 
                className="md:text-5xl leading-[1.15] px-4 max-w-6xl text-3xl font-light text-[#fffbf7f5]"
                style={{ fontFamily: 'Cormorant, serif', fontWeight: 300, letterSpacing: '0.02em' }}
              >
                {currentSlideData.title}
              </h1>
            </div>
            
            <button
              className="rounded-full px-10 py-3.5 md:px-14 md:py-4 text-xs md:text-base text-primary hover:bg-white hover:scale-[1.02] transition-all duration-300 font-light tracking-[0.08em] shadow-2xl backdrop-blur-sm bg-[#fff8ed]"
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