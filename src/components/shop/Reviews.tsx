import { useState, useEffect } from 'react';
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
  const [expandedImage, setExpandedImage] = useState(false);

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
        
        {/* Chat Messages */}
        <div className="flex flex-col md:flex-row md:items-start md:gap-6 md:justify-center space-y-1 md:space-y-0 mb-6 md:mb-8">
          {reviews.map((review, index) => (
            <div key={review.id} className="animate-in fade-in slide-in-from-left duration-500">
              {/* Message Bubble */}
              <div className="max-w-md md:max-w-none">
                <div className="relative">
                  {/* Tail at bottom left */}
                  <div className={`absolute -left-2 bottom-4 w-0 h-0 border-t-[8px] border-t-transparent border-r-[12px] border-b-[8px] border-b-transparent ${
                    review.type === 'image' ? 'border-r-[#8B7355]' : 'border-r-white'
                  }`}></div>
                  
                  {/* Bubble */}
                  {review.type === 'image' ? (
                    <button
                      onClick={() => setExpandedImage(!expandedImage)}
                      className="relative group overflow-hidden rounded-2xl shadow-sm"
                    >
                      <img 
                        src={review.image} 
                        alt={review.author}
                        className="w-full max-w-[200px] md:max-w-[240px] object-cover rounded-2xl rounded-bl-sm"
                      />
                    </button>
                  ) : (
                    <div className={`bg-white rounded-2xl rounded-bl-sm p-4 md:p-5 shadow-sm md:h-[320px] md:w-fit flex flex-col justify-end ${
                      index === 1 ? 'md:min-w-[240px] md:max-w-[280px]' : 'md:min-w-[180px] md:max-w-[200px]'
                    }`}>
                      <p className="text-sm text-primary/80 leading-relaxed font-light mb-3">
                        {review.text}
                      </p>
                      <div className="flex items-center justify-between">
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
            </div>
          ))}
        </div>
        
        {/* Fullscreen Image */}
        {expandedImage && (
          <div 
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setExpandedImage(false)}
          >
            <div className="relative max-w-2xl w-full">
              <img 
                src={reviews[0].image} 
                alt={reviews[0].author}
                className="w-full h-auto rounded-2xl"
                onClick={(e) => e.stopPropagation()}
              />
              <button
                onClick={() => setExpandedImage(false)}
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