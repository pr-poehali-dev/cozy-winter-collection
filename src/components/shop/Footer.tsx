import Icon from '@/components/ui/icon';

export default function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-border vintage-card">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col items-center gap-6">
          <h3 className="text-2xl tracking-wide mystical-text">azaluk</h3>
          <div className="flex gap-6">
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-accent hover:text-primary transition-colors candle-glow"
            >
              <Icon name="Youtube" size={20} />
            </a>
            <a 
              href="https://t.me" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-accent hover:text-primary transition-colors candle-glow"
            >
              <Icon name="Send" size={20} />
            </a>
            <a 
              href="https://boosty.to" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-accent hover:text-primary transition-colors candle-glow"
            >
              <Icon name="Heart" size={20} />
            </a>
          </div>
          <p className="text-sm text-muted-foreground">
            2025
          </p>
        </div>
      </div>
    </footer>
  );
}
