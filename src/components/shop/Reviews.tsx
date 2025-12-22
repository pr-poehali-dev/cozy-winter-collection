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

  return (
    <section id="reviews" className="py-12 md:py-20 px-6 md:px-8 relative overflow-hidden bg-gradient-to-b from-background to-background/50">
      <div className="absolute top-6 left-8 text-2xl opacity-10 animate-pulse">✨</div>
      <div className="absolute top-10 right-12 text-xl opacity-10">💫</div>
      <div className="absolute bottom-8 left-16 text-xl opacity-10">🤍</div>
      <div className="absolute bottom-6 right-8 text-2xl opacity-10 animate-pulse">💗</div>
      
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-light text-primary mb-4">отзывы 💗</h2>
          <p className="text-muted-foreground font-light text-base md:text-lg max-w-2xl mx-auto">
            что говорят те, кто уже хранит наши вещи
          </p>
        </div>
        
        {/* Mobile: Horizontal Scroll */}
        <div className="md:hidden relative">
          <div 
            ref={scrollContainerRef}
            className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-6"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {reviews.map((review) => (
              <div 
                key={review.id} 
                className="flex-shrink-0 snap-start w-[260px]"
              >
                {review.type === 'image' ? (
                  <button
                    onClick={() => setExpandedImage(review.id)}
                    className="relative group/img overflow-hidden rounded-2xl shadow-sm"
                  >
                    <img 
                      src={review.image} 
                      alt={review.author}
                      className="w-[260px] h-[320px] object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/10 transition-colors" />
                  </button>
                ) : (
                  <div className="bg-white rounded-2xl p-5 shadow-sm h-[320px] w-[260px] flex flex-col">
                    <div className="flex-1 overflow-y-auto mb-3">
                      <p className="text-sm text-primary/80 leading-relaxed font-light">
                        {review.text}
                      </p>
                    </div>
                    
                    <div className="pt-2 border-t border-primary/5">
                      <p className="text-xs text-primary/50 font-light">
                        {review.author}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Scroll Progress Indicator - Mobile Only */}
          {reviews.length > 0 && (
            <div className="flex justify-center gap-1.5 mt-4">
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
                        ? 'w-6 bg-primary/60'
                        : 'w-1.5 bg-primary/20'
                    }`}
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* Desktop: Masonry Grid */}
        <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-5 auto-rows-[180px]">
          {reviews.map((review, index) => {
            // Varied heights for masonry effect
            const heights = ['row-span-2', 'row-span-2', 'row-span-3', 'row-span-2', 'row-span-3', 'row-span-2'];
            const heightClass = heights[index % heights.length];
            
            return (
              <div 
                key={review.id}
                className={`${heightClass} group`}
              >
                {review.type === 'image' ? (
                  <button
                    onClick={() => setExpandedImage(review.id)}
                    className="relative w-full h-full overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    <img 
                      src={review.image} 
                      alt={review.author}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-3 left-3 right-3 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-sm font-light">{review.author}</p>
                    </div>
                  </button>
                ) : (
                  <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col group-hover:scale-[1.02]">
                    <div className="mb-3">
                      <Icon name="Quote" size={20} className="text-primary/20" />
                    </div>
                    <div className="flex-1 overflow-y-auto mb-4">
                      <p className="text-sm leading-relaxed text-primary/80 font-light">
                        {review.text}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-primary/10">
                      <p className="text-sm text-primary/60 font-light">— {review.author}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
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
        <div className="text-center mt-12 md:mt-16">
          <a 
            href="https://t.me/azalukk/4001" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 bg-white hover:bg-[#C41E3A] text-[#C41E3A] hover:text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 font-light text-sm md:text-base group border border-[#C41E3A]/20"
          >
            <Icon name="Send" size={18} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform" />
            <span>оставить отзыв</span>
          </a>
        </div>
      </div>
    </section>
  );
}