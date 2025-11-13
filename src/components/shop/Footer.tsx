import Icon from '@/components/ui/icon';

export default function Footer() {
  return (
    <footer className="py-8 px-4 bg-primary">
      <div className="container mx-auto max-w-2xl">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-light tracking-wide text-[#F5F1E8]">azaluk</h3>
          <div className="flex items-center gap-6">
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#F5F1E8] hover:text-[#F5F1E8]/70 transition-colors"
            >
              <Icon name="Youtube" size={18} strokeWidth={1.5} />
            </a>
            <a 
              href="https://t.me" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#F5F1E8] hover:text-[#F5F1E8]/70 transition-colors"
            >
              <Icon name="Send" size={18} strokeWidth={1.5} />
            </a>
            <a 
              href="https://boosty.to" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#F5F1E8] hover:text-[#F5F1E8]/70 transition-colors"
            >
              <Icon name="Heart" size={18} strokeWidth={1.5} />
            </a>
          </div>
          <p className="text-sm font-light text-[#F5F1E8]">
            2025
          </p>
        </div>
      </div>
    </footer>
  );
}