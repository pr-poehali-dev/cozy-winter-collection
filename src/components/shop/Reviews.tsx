import { useState } from 'react';
import Icon from '@/components/ui/icon';

const reviews = [
  {
    id: 1,
    type: "image",
    image: "https://cdn.poehali.dev/files/73260439-3326-4728-bed2-076f231d3fdc.jpg",
    author: "Анастасия",
    time: "14:23"
  },
  {
    id: 2,
    type: "text",
    text: "Спасибо большое!!! Это лучшее приобретение этой осени. Ношу его не снимая. Очень тепло и уютно ❤️",
    author: "Анастасия",
    time: "14:24"
  },
  {
    id: 3,
    type: "text",
    text: "Косынка пришла в самой красивой упаковке, которую я когда-либо видела.",
    author: "Мария",
    time: "11:45"
  }
];

export default function Reviews() {
  const [expandedImage, setExpandedImage] = useState(false);

  return (
    <section id="reviews" className="py-12 md:py-16 px-6 md:px-8 bg-gradient-to-br from-card via-secondary/20 to-card relative overflow-hidden">
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
              <div className={`max-w-md ${index === 0 ? 'md:max-w-[240px]' : 'md:max-w-sm'}`}>
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
                    <div className="bg-white rounded-2xl rounded-bl-sm p-4 shadow-sm h-[240px] md:h-[320px] flex flex-col justify-between">
                      <p className="text-sm text-primary/80 leading-relaxed font-light">
                        {review.text}{' '}
                        <a 
                          href="https://t.me/azalukk" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[#C41E3A] hover:text-[#A01628] transition-colors text-xs"
                        >
                          ...далее
                        </a>
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
            href="https://t.me/azalukk" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#C41E3A] hover:text-[#A01628] underline transition-colors font-light text-sm group"
          >
            <Icon name="Send" size={16} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform" />
            <span>читать все отзывы в телеграме</span>
          </a>
        </div>
      </div>
    </section>
  );
}