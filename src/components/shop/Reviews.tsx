import Icon from '@/components/ui/icon';

export default function Reviews() {
  return (
    <section id="reviews" className="py-10 px-6 md:px-8 bg-white relative overflow-hidden">
      <div className="absolute top-6 left-8 text-xl opacity-15">✨</div>
      <div className="absolute top-10 right-12 text-lg opacity-10">💫</div>
      <div className="absolute bottom-8 left-16 text-lg opacity-10">🤍</div>
      <div className="absolute bottom-6 right-8 text-xl opacity-15">💗</div>
      
      <div className="max-w-4xl mx-auto relative">
        <h2 className="text-3xl md:text-4xl font-light text-primary text-center mb-8">отзывы 💗</h2>
        <p className="text-center text-muted-foreground mb-8 font-light text-sm">что говорят те, кто уже хранит наши вещи</p>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="p-4 rounded-2xl space-y-2 bg-gradient-to-br from-orange-50/20 to-amber-50/20">
            <p className="text-muted-foreground leading-relaxed font-light text-xs">
              "косынка пришла в самой красивой упаковке, которую я когда-либо видела. 
              носить её — как обнять что-то тёплое и родное"
            </p>
            <p className="text-xs text-muted-foreground/70 font-light">— мария 🤍</p>
          </div>
          
          <div className="p-4 rounded-2xl space-y-2 bg-gradient-to-br from-orange-50/20 to-amber-50/20">
            <p className="text-muted-foreground leading-relaxed font-light text-xs">
              "гирлянда создаёт в комнате атмосферу из старых фильмов. 
              чувствую себя героиней какой-то волшебной истории"
            </p>
            <p className="text-xs text-muted-foreground/70 font-light">— анна ✨</p>
          </div>
          
          <div className="p-4 rounded-2xl space-y-2 bg-gradient-to-br from-orange-50/20 to-amber-50/20">
            <p className="text-muted-foreground leading-relaxed font-light text-xs">
              "чепчик пришёл в самой красивой упаковке, которую я когда-либо видела. 
              носить её — как обнять что-то тёплое и родное!"
            </p>
            <p className="text-xs text-muted-foreground/70 font-light">— даша 💗</p>
          </div>
        </div>
        
        <div className="text-center">
          <a 
            href="https://t.me/tropinka_reviews" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-muted-foreground transition-colors font-light text-sm"
          >
            <Icon name="Send" size={16} strokeWidth={1.5} />
            <span>читать все отзывы в телеграме</span>
          </a>
        </div>
      </div>
    </section>
  );
}