import { useState, useEffect, useRef } from 'react';
import { heroSlides } from './data';
import Icon from '@/components/ui/icon';

export default function HeroCarousel() {
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const updateScrollProgress = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        const maxScroll = scrollWidth - clientWidth;
        const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
        setScrollProgress(progress);
        setCanScrollLeft(scrollLeft > 10);
        setCanScrollRight(scrollLeft < maxScroll - 10);
      }
    };

    updateScrollProgress();
    const container = scrollContainerRef.current;
    container?.addEventListener('scroll', updateScrollProgress);
    window.addEventListener('resize', updateScrollProgress);

    return () => {
      container?.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', updateScrollProgress);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        const maxScroll = scrollWidth - clientWidth;
        
        if (scrollLeft >= maxScroll - 10) {
          scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollContainerRef.current.scrollBy({
            left: clientWidth,
            behavior: 'smooth'
          });
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => new Set(prev).add(index));
  };

  const handleButtonClick = (slide: typeof heroSlides[0]) => {
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

  return (
    <section className="relative overflow-hidden mt-[72px]">
      <div className="relative w-full group/carousel">
        {/* Navigation Arrows - Desktop Only */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-full items-center justify-center transition-all duration-300 border border-white/40 opacity-0 group-hover/carousel:opacity-100"
            aria-label="Предыдущий слайд"
          >
            <Icon name="ChevronLeft" size={24} className="text-white" />
          </button>
        )}
        
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-full items-center justify-center transition-all duration-300 border border-white/40 opacity-0 group-hover/carousel:opacity-100"
            aria-label="Следующий слайд"
          >
            <Icon name="ChevronRight" size={24} className="text-white" />
          </button>
        )}

        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {heroSlides.map((slide, index) => (
            <div key={index} className="relative flex-shrink-0 w-full snap-start">
              {!loadedImages.has(index) && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 via-primary/5 to-transparent z-20">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 border-4 border-transparent border-t-primary/40 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
                  </div>
                </div>
              )}

              <div className="relative">
                <picture>
                  <source media="(min-width: 768px)" srcSet={slide.image} />
                  <source media="(max-width: 767px)" srcSet={slide.imageMobile || slide.image} />
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className={`w-full h-[50vh] md:h-[85vh] object-cover transition-opacity duration-700 ${loadedImages.has(index) ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => handleImageLoad(index)}
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60"></div>
              </div>

              <div className="absolute inset-0 flex flex-col items-center justify-end text-center px-4 pb-12 md:px-6 md:pb-20 z-10">
                <div className="max-w-5xl w-full space-y-3 md:space-y-12">
                  <div className="space-y-2 md:space-y-6">
                    <p className="text-[9px] md:text-sm text-white/90 uppercase tracking-[0.25em] md:tracking-[0.35em] font-light">
                      {slide.subtitle}
                    </p>
                    <h1 
                      className="text-2xl md:text-5xl leading-[1.2] px-2 max-w-6xl font-light text-[#fffbf7f5]"
                      style={{ fontFamily: 'Cormorant, serif', fontWeight: 300, letterSpacing: '0.02em' }}
                    >
                      {slide.title}
                    </h1>
                  </div>
                  
                  <button
                    className="rounded-full px-8 py-2.5 md:px-14 md:py-4 text-[11px] md:text-base text-primary hover:bg-white hover:scale-[1.02] transition-all duration-300 font-light tracking-[0.08em] shadow-2xl backdrop-blur-sm bg-[#fff8ed]"
                    onClick={() => handleButtonClick(slide)}
                  >
                    {slide.buttonText}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Scroll Progress Indicators */}
        {heroSlides.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
            {heroSlides.map((_, index) => {
              const itemProgress = (100 / heroSlides.length) * index;
              const nextItemProgress = (100 / heroSlides.length) * (index + 1);
              const isActive = scrollProgress >= itemProgress && scrollProgress < nextItemProgress;
              const isLast = index === heroSlides.length - 1 && scrollProgress >= itemProgress;
              
              return (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    isActive || isLast
                      ? 'w-8 bg-white'
                      : 'w-2 bg-white/50'
                  }`}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}