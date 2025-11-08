import Icon from '@/components/ui/icon';

export default function Reviews() {
  return (
    <section id="reviews" className="py-16 px-6 md:px-8 bg-white relative overflow-hidden">
      <div className="absolute top-8 left-8 text-2xl opacity-20">✨</div>
      <div className="absolute top-16 right-12 text-xl opacity-15">💫</div>
      <div className="absolute bottom-12 left-16 text-xl opacity-15">🤍</div>
      <div className="absolute bottom-8 right-8 text-2xl opacity-20">💗</div>
      
      <div className="max-w-3xl mx-auto relative">
        <h2 className="text-2xl md:text-3xl font-light text-primary text-center mb-3">отзывы ✨</h2>
        <p className="text-center text-muted-foreground mb-12 font-light text-sm">что говорят те, кто уже хранит мои вещи</p>
        
        <div className="space-y-6 mb-12">
          <div className="p-6 rounded-2xl space-y-3 bg-gradient-to-br from-orange-50/20 to-amber-50/20">
            <div className="flex gap-1 justify-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Icon key={i} name="Star" size={14} className="fill-current" strokeWidth={0} />
              ))}
            </div>
            <p className="text-muted-foreground leading-relaxed font-light text-sm text-center">
              "косынка пришла в самой красивой упаковке, которую я когда-либо видела. 
              носить её — как обнять что-то тёплое и родное"
            </p>
            <p className="text-xs text-muted-foreground/70 font-light text-center">— мария 🤍</p>
          </div>
          
          <div className="p-6 rounded-2xl space-y-3 bg-gradient-to-br from-orange-50/20 to-amber-50/20">
            <div className="flex gap-1 justify-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Icon key={i} name="Star" size={14} className="fill-current" strokeWidth={0} />
              ))}
            </div>
            <p className="text-muted-foreground leading-relaxed font-light text-sm text-center">
              "гирлянда создаёт в комнате атмосферу из старых фильмов. 
              чувствую себя героиней какой-то волшебной истории"
            </p>
            <p className="text-xs text-muted-foreground/70 font-light text-center">— анна ✨</p>
          </div>
          
          <div className="p-6 rounded-2xl space-y-3 bg-gradient-to-br from-orange-50/20 to-amber-50/20">
            <div className="flex gap-1 justify-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Icon key={i} name="Star" size={14} className="fill-current" strokeWidth={0} />
              ))}
            </div>
            <p className="text-muted-foreground leading-relaxed font-light text-sm text-center">
              "купила чепчик и теперь не снимаю. это не просто вещь — 
              это как будто кто-то обнял и сказал, что всё будет хорошо"
            </p>
            <p className="text-xs text-muted-foreground/70 font-light text-center">— даша 💗</p>
          </div>
        </div>
        
        <div className="text-center">
          <a 
            href="https://t.me/azaluk_reviews" 
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