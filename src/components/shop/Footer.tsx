import Icon from '@/components/ui/icon';

export default function Footer() {
  return (
    <footer className="py-4 px-4 bg-primary">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <h3 className="text-xl font-light tracking-wide text-[#F5F1E8]">azaluk</h3>
            <div className="flex items-center gap-3">
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
            </div>
          </div>
          
          <div className="flex items-center gap-6 text-xs font-light text-[#F5F1E8]/80">
            <a href="/privacy" className="hover:text-[#F5F1E8] transition-colors">
              Конфиденциальность
            </a>
            <a href="/offer" className="hover:text-[#F5F1E8] transition-colors">
              Оферта
            </a>
            <a href="/personal" className="hover:text-[#F5F1E8] transition-colors">
              Обработка ПД
            </a>
          </div>
          
          <p className="text-xs font-light text-[#F5F1E8]/70">
            ФЛ Яроцкая Азалия Наильевна
          </p>
        </div>
      </div>
    </footer>
  );
}