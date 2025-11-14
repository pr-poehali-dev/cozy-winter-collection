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
  const [expandedImage, setExpandedImage] = useState<number | null>(null);

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
            <div key={review.id} className="flex gap-3 items-start animate-in fade-in slide-in-from-left duration-500">
              {/* Avatar */}
              <div className="flex-shrink-0">
                {review.avatar ? (
                  <button
                    onClick={() => setExpandedImage(expandedImage === review.id ? null : review.id)}
                    className="relative group"
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md hover:scale-110 transition-transform">
                      <img 
                        src={review.avatar} 
                        alt={review.author}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {expandedImage === review.id && (
                      <div className="absolute left-0 top-12 z-10 animate-in fade-in zoom-in duration-200">
                        <div className="relative">
                          <img 
                            src={review.avatar} 
                            alt={review.author}
                            className="w-64 h-80 object-cover rounded-2xl shadow-2xl border-4 border-white"
                          />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedImage(null);
                            }}
                            className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100"
                          >
                            <Icon name="X" size={16} />
                          </button>
                        </div>
                      </div>
                    )}
                  </button>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center text-primary font-light text-sm border-2 border-white shadow-md">
                    {review.author[0]}
                  </div>
                )}
              </div>
              
              {/* Message Bubble */}
              <div className="flex-1 max-w-md">
                <div className="relative">
                  {/* Tail */}
                  <div className="absolute -left-2 top-3 w-0 h-0 border-t-[8px] border-t-transparent border-r-[12px] border-r-white border-b-[8px] border-b-transparent"></div>
                  
                  {/* Bubble */}
                  <div className="bg-white rounded-2xl rounded-tl-sm p-4 shadow-sm">
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
                </div>
              </div>
            </div>
          ))}
        </div>
        
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