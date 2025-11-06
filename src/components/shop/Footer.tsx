import Icon from '@/components/ui/icon';

export default function Footer() {
  return (
    <footer className="py-16 px-4 border-t border-border bg-white">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col items-center gap-8">
          <h3 className="text-3xl tracking-wider mystical-text">azaluk</h3>
          <div className="flex gap-8">
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="youtube"
            >
              <Icon name="Youtube" size={22} />
            </a>
            <a 
              href="https://t.me" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="telegram"
            >
              <Icon name="Send" size={22} />
            </a>
            <a 
              href="https://boosty.to" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="boosty"
            >
              <Icon name="Heart" size={22} />
            </a>
          </div>
          <p className="text-xs text-muted-foreground tracking-wide">
            © 2025 azaluk
          </p>
        </div>
      </div>
    </footer>
  );
}