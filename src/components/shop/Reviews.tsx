import Icon from '@/components/ui/icon';

export default function Reviews() {
  return (
    <section className="py-20 px-4 paper-texture border-t border-border">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl mb-4 mystical-text text-center">отзывы</h2>
        <p className="text-center text-muted-foreground mb-12">что говорят те, кто уже хранит мои вещи</p>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="vintage-card p-6 rounded-xl space-y-4 animate-fade-in">
            <div className="flex gap-1 text-accent">
              <Icon name="Star" size={16} fill="currentColor" />
              <Icon name="Star" size={16} fill="currentColor" />
              <Icon name="Star" size={16} fill="currentColor" />
              <Icon name="Star" size={16} fill="currentColor" />
              <Icon name="Star" size={16} fill="currentColor" />
            </div>
            <p className="text-muted-foreground leading-relaxed">
              "косынка пришла в самой красивой упаковке, которую я когда-либо видела. 
              носить её — как обнять что-то тёплое и родное"
            </p>
            <p className="text-sm text-muted-foreground/70">— мария</p>
          </div>
          
          <div className="vintage-card p-6 rounded-xl space-y-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex gap-1 text-accent">
              <Icon name="Star" size={16} fill="currentColor" />
              <Icon name="Star" size={16} fill="currentColor" />
              <Icon name="Star" size={16} fill="currentColor" />
              <Icon name="Star" size={16} fill="currentColor" />
              <Icon name="Star" size={16} fill="currentColor" />
            </div>
            <p className="text-muted-foreground leading-relaxed">
              "гирлянда создаёт в комнате атмосферу из старых фильмов. 
              чувствую себя героиней какой-то волшебной истории"
            </p>
            <p className="text-sm text-muted-foreground/70">— анна</p>
          </div>
          
          <div className="vintage-card p-6 rounded-xl space-y-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex gap-1 text-accent">
              <Icon name="Star" size={16} fill="currentColor" />
              <Icon name="Star" size={16} fill="currentColor" />
              <Icon name="Star" size={16} fill="currentColor" />
              <Icon name="Star" size={16} fill="currentColor" />
              <Icon name="Star" size={16} fill="currentColor" />
            </div>
            <p className="text-muted-foreground leading-relaxed">
              "купила чепчик и теперь не снимаю. это не просто вещь — 
              это как будто кто-то обнял и сказал, что всё будет хорошо"
            </p>
            <p className="text-sm text-muted-foreground/70">— даша</p>
          </div>
        </div>
        
        <div className="text-center">
          <a 
            href="https://t.me/azaluk_reviews" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent hover:text-primary transition-colors"
          >
            <Icon name="Send" size={20} />
            <span className="text-lg">читать все отзывы в телеграме</span>
          </a>
        </div>
      </div>
    </section>
  );
}
