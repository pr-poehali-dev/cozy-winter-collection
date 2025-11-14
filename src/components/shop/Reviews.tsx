import { useState } from 'react';
import Icon from '@/components/ui/icon';

const reviews = [
  {
    id: 1,
    text: "Спасибо большое!!! Это лучшее приобретение этой осени. Ношу его не снимая. Очень тепло и уютно ❤️ Наконец-то решена проблема с укладкой и челкой 😍 Все у меня спрашивают, где я заказывала, только и успеваю отбиваться 😂",
    author: "Анастасия",
    avatar: "https://cdn.poehali.dev/files/73260439-3326-4728-bed2-076f231d3fdc.jpg",
    time: "14:23"
  },
  {
    id: 2,
    text: "Косынка пришла в самой красивой упаковке, которую я когда-либо видела. Носить её — как обнять что-то тёплое и родное 🤍",
    author: "Мария",
    time: "11:45"
  },
  {
    id: 3,
    text: "Чепчик идеален! Мягкий, уютный, прям душевная вещь. Ношу каждый день, и каждый раз чувствую тепло и заботу ✨",
    author: "Даша",
    time: "16:12"
  },
  {
    id: 4,
    text: "Получила заказ — не могу нарадоваться! Качество невероятное, видно что каждая деталь сделана с любовью 💗",
    author: "Ксения",
    time: "09:30"
  }
];

export default function Reviews() {
  const [expandedImage, setExpandedImage] = useState(false);

  return (
    <section id="reviews" className="py-16 px-6 md:px-8 bg-gradient-to-br from-card via-secondary/20 to-card relative overflow-hidden">
      <div className="absolute top-6 left-8 text-2xl opacity-10 animate-pulse">✨</div>
      <div className="absolute top-10 right-12 text-xl opacity-10">💫</div>
      <div className="absolute bottom-8 left-16 text-xl opacity-10">🤍</div>
      <div className="absolute bottom-6 right-8 text-2xl opacity-10 animate-pulse">💗</div>
      
      <div className="max-w-2xl mx-auto relative">
        <h2 className="text-3xl md:text-4xl font-light text-primary text-center mb-3">отзывы 💗</h2>
        <p className="text-center text-muted-foreground mb-12 font-light text-sm">
          что говорят те, кто уже хранит наши вещи
        </p>
        
        {/* Chat Messages */}
        <div className="space-y-4 mb-8">
          {reviews.map((review) => (
            <div key={review.id} className="animate-in fade-in slide-in-from-left duration-500">
              {/* Message Bubble */}
              <div className="max-w-md">
                <div className="relative">
                  {/* Tail at bottom left */}
                  <div className="absolute -left-2 bottom-3 w-0 h-0 border-t-[8px] border-t-transparent border-r-[12px] border-r-white border-b-[8px] border-b-transparent"></div>
                  
                  {/* Bubble */}
                  {review.avatar ? (
                    <div className="bg-white rounded-2xl rounded-bl-sm p-2 shadow-sm">
                      <button
                        onClick={() => setExpandedImage(!expandedImage)}
                        className="relative group w-full"
                      >
                        <img 
                          src={review.avatar} 
                          alt={review.author}
                          className="w-full max-w-xs rounded-xl object-cover"
                        />
                      </button>
                      <div className="px-2 py-2 flex items-center justify-between">
                        <p className="text-xs text-primary/50 font-light">
                          {review.author}
                        </p>
                        <p className="text-xs text-primary/30 font-light">
                          {review.time}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white rounded-2xl rounded-bl-sm p-4 shadow-sm">
                      <p className="text-sm text-primary/80 leading-relaxed font-light mb-2">
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
                src={reviews[0].avatar} 
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
        <div className="text-center mt-12 pt-8 border-t border-primary/10">
          <a 
            href="https://t.me/azalukk" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 hover:bg-white rounded-full shadow-sm hover:shadow-md transition-all font-light text-sm text-primary group"
          >
            <Icon name="Send" size={16} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform" />
            <span>читать все отзывы в телеграме</span>
          </a>
        </div>
      </div>
    </section>
  );
}