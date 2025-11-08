import Icon from '@/components/ui/icon';

export default function Reviews() {
  return (
    <section id="reviews" className="py-16 px-6 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-light text-primary text-center mb-3">отзывы</h2>
        <p className="text-center text-muted-foreground mb-12 font-light">что говорят те, кто уже хранит мои вещи</p>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="p-6 rounded-2xl space-y-4 bg-gradient-to-br from-orange-50/30 to-amber-50/30 border border-border">
            <div className="flex gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Icon key={i} name="Star" size={16} className="fill-current" strokeWidth={0} />
              ))}
            </div>
            <p className="text-muted-foreground leading-relaxed font-light text-sm">
              "косынка пришла в самой красивой упаковке, которую я когда-либо видела. 
              носить её — как обнять что-то тёплое и родное"
            </p>
            <p className="text-xs text-muted-foreground/70 font-light">— мария</p>
          </div>
          
          <div className="p-6 rounded-2xl space-y-4 bg-gradient-to-br from-orange-50/30 to-amber-50/30 border border-border">
            <div className="flex gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Icon key={i} name="Star" size={16} className="fill-current" strokeWidth={0} />
              ))}
            </div>
            <p className="text-muted-foreground leading-relaxed font-light text-sm">
              "гирлянда создаёт в комнате атмосферу из старых фильмов. 
              чувствую себя героиней какой-то волшебной истории"
            </p>
            <p className="text-xs text-muted-foreground/70 font-light">— анна</p>
          </div>
          
          <div className="p-6 rounded-2xl space-y-4 bg-gradient-to-br from-orange-50/30 to-amber-50/30 border border-border">
            <div className="flex gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Icon key={i} name="Star" size={16} className="fill-current" strokeWidth={0} />
              ))}
            </div>
            <p className="text-muted-foreground leading-relaxed font-light text-sm">
              "купила чепчик и теперь не снимаю. это не просто вещь — 
              это как будто кто-то обнял и сказал, что всё будет хорошо"
            </p>
            <p className="text-xs text-muted-foreground/70 font-light">— даша</p>
          </div>
        </div>
        
        <div className="text-center">
          <a 
            href="https://t.me/azaluk_reviews" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-muted-foreground transition-colors font-light"
          >
            <Icon name="Send" size={18} />
            <span className="text-base">читать все отзывы в телеграме</span>
          </a>
        </div>
      </div>
    </section>
  );
}