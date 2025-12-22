import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';

interface Review {
  id: number;
  type: 'text' | 'image';
  text?: string;
  image?: string;
  author: string;
  time: string;
}

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [expandedImage, setExpandedImage] = useState<number | null>(null);
  const [expandedTexts, setExpandedTexts] = useState<Set<number>>(new Set());
  const scrollContainerRef = useRef<HTMLDivElement>(null);
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
    const checkScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
      }
    };

    checkScroll();
    const container = scrollContainerRef.current;
    container?.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);

    return () => {
      container?.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [reviews]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const toggleTextExpanded = (id: number) => {
    setExpandedTexts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <section id="reviews" className="py-12 md:py-16 px-6 md:px-8 relative overflow-hidden">
      <div className="absolute top-6 left-8 text-2xl opacity-10 animate-pulse">✨</div>
      <div className="absolute top-10 right-12 text-xl opacity-10">💫</div>
      <div className="absolute bottom-8 left-16 text-xl opacity-10">🤍</div>
      <div className="absolute bottom-6 right-8 text-2xl opacity-10 animate-pulse">💗</div>
      
      <div className="max-w-5xl mx-auto relative">
        <h2 className="text-3xl md:text-4xl font-light text-primary text-center mb-3">отзывы 💗</h2>
        <p className="text-center text-muted-foreground mb-8 md:mb-10 font-light text-sm">
          что говорят те, кто уже хранит наши вещи
        </p>
        
        {/* Reviews Carousel Container */}
        <div className="relative group">
          {/* Navigation Arrows - Desktop Only */}
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg items-center justify-center hover:bg-gray-100 transition-all opacity-0 group-hover:opacity-100"
              aria-label="Предыдущий отзыв"
            >
              <Icon name="ChevronLeft" size={24} />
            </button>
          )}
          
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg items-center justify-center hover:bg-gray-100 transition-all opacity-0 group-hover:opacity-100"
              aria-label="Следующий отзыв"
            >
              <Icon name="ChevronRight" size={24} />
            </button>
          )}

          {/* Scrollable Reviews Container */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {reviews.map((review) => (
              <div 
                key={review.id} 
                className="flex-shrink-0 snap-start w-[280px] md:w-auto"
              >
                <div className="relative h-full">
                  {/* Tail at bottom left */}
                  <div className={`absolute -left-2 bottom-4 w-0 h-0 border-t-[8px] border-t-transparent border-r-[12px] border-b-[8px] border-b-transparent ${
                    review.type === 'image' ? 'border-r-[#8B7355]' : 'border-r-white'
                  }`}></div>
                  
                  {/* Bubble */}
                  {review.type === 'image' ? (
                    <button
                      onClick={() => setExpandedImage(review.id)}
                      className="relative group/img overflow-hidden rounded-2xl rounded-bl-sm shadow-sm h-full"
                    >
                      <img 
                        src={review.image} 
                        alt={review.author}
                        className="w-full h-[320px] md:h-[380px] object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/10 transition-colors" />
                    </button>
                  ) : (
                    <div className="bg-white rounded-2xl rounded-bl-sm p-5 shadow-sm h-[320px] md:h-[380px] w-[280px] md:min-w-[240px] md:max-w-[320px] flex flex-col">
                      <div className={`flex-1 overflow-y-auto mb-3 ${expandedTexts.has(review.id) ? '' : 'line-clamp-[14]'}`}>
                        <p className="text-sm text-primary/80 leading-relaxed font-light">
                          {review.text}
                        </p>
                      </div>
                      
                      {review.text && review.text.length > 200 && (
                        <button
                          onClick={() => toggleTextExpanded(review.id)}
                          className="text-xs text-primary/40 hover:text-primary/60 transition-colors mb-2 self-start"
                        >
                          {expandedTexts.has(review.id) ? 'свернуть' : 'читать полностью'}
                        </button>
                      )}
                      
                      <div className="flex items-center justify-between pt-2 border-t border-primary/5">
                        <p className="text-xs text-primary/50 font-light">
                          {review.author}
                        </p>
                        <p className="text-xs text-primary/30 font-light">
                          {review.time}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
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
        <div className="text-center mt-8">
          <a 
            href="https://t.me/azalukk/4001" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#C41E3A] hover:text-[#A01628] underline transition-colors font-light text-sm group"
          >
            <Icon name="Send" size={16} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform" />
            <span>оставить отзыв в телеграме</span>
          </a>
        </div>
      </div>
    </section>
  );
}