import Icon from '@/components/ui/icon';

export default function Footer() {
  return (
    <footer className="py-3 md:py-4 px-4 bg-[#ebdccb]">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4">
          <div className="flex items-center gap-3">
            <h3 className="text-base md:text-xl font-light tracking-wide text-[#5f5847]">azaluk</h3>
            <div className="flex items-center gap-2.5">
              <a 
                href="https://www.youtube.com/@azaluk" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#5f5847] hover:text-[#5f5847]/70 transition-colors"
              >
                <Icon name="Youtube" size={16} strokeWidth={1.5} />
              </a>
              <a 
                href="https://t.me/azalukk" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#5f5847] hover:text-[#5f5847]/70 transition-colors"
              >
                <Icon name="Send" size={16} strokeWidth={1.5} />
              </a>
            </div>
          </div>
          
          <div className="flex items-center gap-3 md:gap-6 text-[10px] md:text-xs font-light text-[#5f5847]/80">
            <a href="/privacy" className="hover:text-[#5f5847] transition-colors">
              Конфиденциальность
            </a>
            <a href="/offer" className="hover:text-[#5f5847] transition-colors">
              Оферта
            </a>
            <a href="/personal" className="hover:text-[#5f5847] transition-colors">
              Обработка ПД
            </a>
          </div>
          
          <div className="text-[10px] md:text-xs font-light text-[#5f5847]/70 text-center md:text-right">
            <p>яроцкая азалия наильевна</p>
            <p>инн 022504012700</p>
          </div>
        </div>
      </div>
    </footer>
  );
}