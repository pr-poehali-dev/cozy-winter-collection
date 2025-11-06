import Icon from '@/components/ui/icon';

export default function Reviews() {
  return (
    <section className="py-24 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-5xl mb-16 mystical-text text-center">отзывы</h2>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="vintage-card p-8 rounded-lg space-y-5 animate-fade-in">
            <div className="flex gap-1 text-accent">
              <Icon name="Star" size={14} fill="currentColor" />
              <Icon name="Star" size={14} fill="currentColor" />
              <Icon name="Star" size={14} fill="currentColor" />
              <Icon name="Star" size={14} fill="currentColor" />
              <Icon name="Star" size={14} fill="currentColor" />
            </div>
            <p className="text-muted-foreground leading-relaxed text-base">
              косынка пришла в самой красивой упаковке. носить её — как обнять что-то тёплое
            </p>
            <p className="text-xs text-muted-foreground/60">— мария</p>
          </div>
          
          <div className="vintage-card p-8 rounded-lg space-y-5 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex gap-1 text-accent">
              <Icon name="Star" size={14} fill="currentColor" />
              <Icon name="Star" size={14} fill="currentColor" />
              <Icon name="Star" size={14} fill="currentColor" />
              <Icon name="Star" size={14} fill="currentColor" />
              <Icon name="Star" size={14} fill="currentColor" />
            </div>
            <p className="text-muted-foreground leading-relaxed text-base">
              гирлянда создаёт атмосферу из старых фильмов. чувствую себя героиней сказки
            </p>
            <p className="text-xs text-muted-foreground/60">— анна</p>
          </div>
          
          <div className="vintage-card p-8 rounded-lg space-y-5 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex gap-1 text-accent">
              <Icon name="Star" size={14} fill="currentColor" />
              <Icon name="Star" size={14} fill="currentColor" />
              <Icon name="Star" size={14} fill="currentColor" />
              <Icon name="Star" size={14} fill="currentColor" />
              <Icon name="Star" size={14} fill="currentColor" />
            </div>
            <p className="text-muted-foreground leading-relaxed text-base">
              чепчик теперь не снимаю. это как будто кто-то обнял и сказал — всё будет хорошо
            </p>
            <p className="text-xs text-muted-foreground/60">— даша</p>
          </div>
        </div>
        
        <div className="text-center">
          <a 
            href="https://t.me/azaluk_reviews" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors text-sm"
          >
            <span>читать все отзывы</span>
            <Icon name="ArrowRight" size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}