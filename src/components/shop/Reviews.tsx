import { useState } from 'react';
import Icon from '@/components/ui/icon';

const reviews = [
  {
    id: 1,
    text: "Спасибо большое!!! Это лучшее приобретение этой осени. Ношу его не снимая. Очень тепло и уютно ❤️ Наконец-то решена проблема с укладкой и челкой 😍 Все у меня спрашивают, где я заказывала, только и успеваю отбиваться 😂",
    author: "Анастасия",
    image: "https://cdn.poehali.dev/files/73260439-3326-4728-bed2-076f231d3fdc.jpg",
    featured: true
  },
  {
    id: 2,
    text: "Косынка пришла в самой красивой упаковке, которую я когда-либо видела. Носить её — как обнять что-то тёплое и родное 🤍",
    author: "Мария",
    featured: false
  },
  {
    id: 3,
    text: "Чепчик идеален! Мягкий, уютный, прям душевная вещь. Ношу каждый день, и каждый раз чувствую тепло и заботу ✨",
    author: "Даша",
    featured: false
  },
  {
    id: 4,
    text: "Получила заказ — не могу нарадоваться! Качество невероятное, видно что каждая деталь сделана с любовью 💗",
    author: "Ксения",
    featured: false
  }
];

export default function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const currentReview = reviews[currentIndex];

  return (
    <section id="reviews" className="py-16 px-6 md:px-8 bg-gradient-to-br from-card via-secondary/20 to-card relative overflow-hidden">
      <div className="absolute top-6 left-8 text-2xl opacity-10 animate-pulse">✨</div>
      <div className="absolute top-10 right-12 text-xl opacity-10">💫</div>
      <div className="absolute bottom-8 left-16 text-xl opacity-10">🤍</div>
      <div className="absolute bottom-6 right-8 text-2xl opacity-10 animate-pulse">💗</div>
      
      <div className="max-w-6xl mx-auto relative">
        <h2 className="text-3xl md:text-4xl font-light text-primary text-center mb-3">отзывы 💗</h2>
        <p className="text-center text-muted-foreground mb-12 font-light text-sm">
          что говорят те, кто уже хранит наши вещи
        </p>
        
        {/* Interactive Carousel */}
        <div 
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
            {/* Photo Side */}
            {currentReview.featured && currentReview.image && (
              <div className="w-full md:w-1/2 max-w-md">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl transform transition-transform duration-500 group-hover:scale-[1.02]">
                    <img 
                      src={currentReview.image} 
                      alt={`Отзыв от ${currentReview.author}`}
                      className="w-full aspect-[3/4] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Text Side */}
            <div className={`w-full ${currentReview.featured ? 'md:w-1/2' : 'md:w-2/3'} max-w-xl`}>
              <div className="relative p-8 md:p-10 rounded-2xl bg-white/60 backdrop-blur-sm border border-primary/10 shadow-lg">
                <div className="absolute -top-4 -left-4 text-6xl text-primary/10 font-serif leading-none">"</div>
                
                <p className="text-base md:text-lg text-primary/80 leading-relaxed font-light mb-6 relative z-10">
                  {currentReview.text}
                </p>
                
                <div className="flex items-center justify-between">
                  <p className="text-sm text-primary/60 font-light italic">
                    — {currentReview.author}
                  </p>
                  
                  <div className="flex gap-2">
                    {reviews.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          idx === currentIndex 
                            ? 'bg-primary w-6' 
                            : 'bg-primary/20 hover:bg-primary/40'
                        }`}
                        aria-label={`Перейти к отзыву ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation Arrows */}
          <button
            onClick={prevReview}
            className={`absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all ${
              isHovered ? 'opacity-100' : 'opacity-0 md:opacity-60'
            }`}
            aria-label="Предыдущий отзыв"
          >
            <Icon name="ChevronLeft" size={24} className="text-primary" />
          </button>
          
          <button
            onClick={nextReview}
            className={`absolute right-0 md:-right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all ${
              isHovered ? 'opacity-100' : 'opacity-0 md:opacity-60'
            }`}
            aria-label="Следующий отзыв"
          >
            <Icon name="ChevronRight" size={24} className="text-primary" />
          </button>
        </div>
        
        {/* CTA to Telegram */}
        <div className="text-center mt-12">
          <a 
            href="https://t.me/azalukk" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-muted-foreground transition-colors font-light text-sm group"
          >
            <Icon name="Send" size={16} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform" />
            <span>читать все отзывы в телеграме</span>
          </a>
        </div>
      </div>
    </section>
  );
}
