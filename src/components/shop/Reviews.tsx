import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';

interface Review {
  id: number;
  type: 'text' | 'image';
  text?: string;
  image?: string;
  author: string;
}

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [expandedImage, setExpandedImage] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const response = await fetch('https://functions.poehali.dev/26151c17-6f4f-46a6-8375-4dd63a78a196');
        if (response.ok) {
          const data = await response.json();
          setReviews(data);
        }
      } catch (error) {
        console.error('Ошибка загрузки отзывов:', error);
      }
    };

    loadReviews();
  }, []);

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
  }, [reviews]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="reviews" className="py-10 md:py-16 px-6 md:px-8 relative overflow-hidden bg-primary">
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-8 md:mb-12">
          <p className="text-white/80 font-light text-sm md:text-base max-w-2xl py-0 my-0 mx-auto px-0">что говорят те, кто уже хранит наши вещицы?</p>
        </div>
        
        {/* Horizontal Scroll for All Devices */}
        <div className="relative group/carousel">
          {/* Navigation Arrows - Desktop Only */}
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-10 w-11 h-11 bg-white rounded-full shadow-xl items-center justify-center hover:scale-105 transition-all opacity-0 group-hover/carousel:opacity-100"
              aria-label="Предыдущий отзыв"
            >
              <Icon name="ChevronLeft" size={22} className="text-primary" strokeWidth={2} />
            </button>
          )}
          
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-10 w-11 h-11 bg-white rounded-full shadow-xl items-center justify-center hover:scale-105 transition-all opacity-0 group-hover/carousel:opacity-100"
              aria-label="Следующий отзыв"
            >
              <Icon name="ChevronRight" size={22} className="text-primary" strokeWidth={2} />
            </button>
          )}

          <div 
            ref={scrollContainerRef}
            className="flex gap-3 md:gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {reviews.map((review) => (
              <div 
                key={review.id} 
                className="flex-shrink-0 snap-start w-[260px] md:w-[360px]"
              >
                {review.type === 'image' ? (
                  <button
                    onClick={() => setExpandedImage(review.id)}
                    className="relative group/img overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
                  >
                    <img 
                      src={review.image} 
                      alt={review.author}
                      className="w-[260px] md:w-[360px] h-[320px] md:h-[380px] object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-sm font-light drop-shadow-md">— {review.author}</p>
                    </div>
                  </button>
                ) : (
                  <div className="bg-white rounded-2xl p-5 md:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 h-[320px] md:h-[380px] w-[260px] md:w-[360px] flex flex-col">
                    <div className="mb-3">
                      <Icon name="Quote" size={22} className="text-primary/25" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 overflow-y-auto mb-4 scrollbar-hide">
                      <p className="text-sm md:text-[15px] leading-relaxed text-primary/80 font-light">
                        {review.text}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-primary/15">
                      <p className="text-xs md:text-sm text-primary/60 font-light">— {review.author}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Scroll Progress Indicators */}
          {reviews.length > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {reviews.map((_, index) => {
                const itemProgress = (100 / reviews.length) * index;
                const nextItemProgress = (100 / reviews.length) * (index + 1);
                const isActive = scrollProgress >= itemProgress && scrollProgress < nextItemProgress;
                const isLast = index === reviews.length - 1 && scrollProgress >= itemProgress;
                
                return (
                  <div
                    key={index}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      isActive || isLast
                        ? 'w-8 bg-white'
                        : 'w-1.5 bg-white/30'
                    }`}
                  />
                );
              })}
            </div>
          )}
        </div>
        
        {/* Fullscreen Image */}
        {expandedImage !== null && (
          <div 
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setExpandedImage(null)}
          >
            <div className="relative max-w-2xl w-full">
              <img 
                src={reviews.find(r => r.id === expandedImage)?.image} 
                alt={reviews.find(r => r.id === expandedImage)?.author}
                className="w-full h-auto rounded-2xl"
                onClick={(e) => e.stopPropagation()}
              />
              <button
                onClick={() => setExpandedImage(null)}
                className="absolute -top-4 -right-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
          </div>
        )}
        
        {/* CTA to Telegram */}
        <div className="text-center mt-8 md:mt-10">
          <a 
            href="https://t.me/azalukk/4001" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#f7f3ed] hover:bg-[#f0ebe3] text-primary rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-light text-sm md:text-base group"
          >
            <Icon name="Send" size={18} strokeWidth={2} className="group-hover:translate-x-1 transition-transform" />
            <span>оставить отзыв</span>
          </a>
        </div>
      </div>
    </section>
  );
}