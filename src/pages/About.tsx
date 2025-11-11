import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';

export default function About() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-cream">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-light text-primary tracking-wide">тропинка</h1>
          
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-sm font-light text-primary hover:text-muted-foreground transition-colors">
                главная
              </Link>
              <Link to="/about" className="text-sm font-light text-primary hover:text-muted-foreground transition-colors">
                о нас
              </Link>
              <a href="/#delivery" className="text-sm font-light text-primary hover:text-muted-foreground transition-colors">
                оплата и доставка
              </a>
              <a href="/#contacts" className="text-sm font-light text-primary hover:text-muted-foreground transition-colors">
                контакты
              </a>
            </nav>
            
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <button className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors">
                  <Icon name="Menu" size={20} className="text-primary" strokeWidth={1.5} />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <SheetHeader>
                  <SheetTitle className="text-xl font-light text-primary">меню</SheetTitle>
                </SheetHeader>
                <nav className="mt-8 flex flex-col gap-6">
                  <Link 
                    to="/" 
                    className="text-sm font-light text-primary hover:text-muted-foreground transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    главная
                  </Link>
                  <Link 
                    to="/about" 
                    className="text-sm font-light text-primary hover:text-muted-foreground transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    о нас
                  </Link>
                  <a 
                    href="/#delivery" 
                    className="text-sm font-light text-primary hover:text-muted-foreground transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    оплата и доставка
                  </a>
                  <a 
                    href="/#contacts" 
                    className="text-sm font-light text-primary hover:text-muted-foreground transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    контакты
                  </a>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 pt-24 pb-16 max-w-4xl">
        <div className="space-y-16 animate-in fade-in duration-700">
          <div className="text-center space-y-6">
            <h1 className="text-3xl md:text-4xl font-light text-moss">
              о нас
            </h1>
            <p className="text-lg md:text-xl text-moss/80 leading-relaxed max-w-2xl mx-auto">
              тропинка — это маленький магазин из мира двух подруг, Азалии и Вики.
              <br />
              мы вместе разрабатываем и создаём вещи, в которых живут уют и немного сказки.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-3xl mx-auto">
            <div className="space-y-4">
              <div className="aspect-[4/3] bg-moss/10 rounded-2xl overflow-hidden">
                <img 
                  src="https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/files/7f5ea581-628c-4d98-a69f-d7a58fe3ab8d.jpg" 
                  alt="Азалия с ноутбуком и камерой"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="space-y-4">
                <h2 className="text-2xl font-light text-moss">Азалия</h2>
                <div className="space-y-3 text-moss/70 leading-relaxed">
                  <p>
                    привет! я Азалия и я ответственна за жизнь магазина и за то, 
                    какие изделия будут в нём продаваться. технические детали и продвижение.
                  </p>
                  <p>
                    я собираю заказы, общаюсь с вами в поддержке, снимаю наши фото и видео, 
                    оформляю сайт и блоги.
                  </p>
                  <p>
                    я веду ютуб и телеграм каналы, в них делюсь своим мировоззрением, 
                    привношу волшебство в повседневность и показываю наши внутренние процессы.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4 md:mt-16">
              <div className="aspect-[4/3] bg-moss/10 rounded-2xl overflow-hidden">
                <img 
                  src="https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/files/98640360-9e4d-42d3-b9f5-808904dfc6e0.jpg" 
                  alt="Вика создает изделия"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="space-y-4">
                <h2 className="text-2xl font-light text-moss">Вика</h2>
                <div className="space-y-3 text-moss/70 leading-relaxed">
                  <p>
                    это Вика! она — волшебные руки наших тропинок.
                  </p>
                  <p>
                    именно Вика воплощает наши идеи в реальность — в тканях, 
                    нитях и деталях.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center py-12">
            <p className="text-lg text-moss/70 leading-relaxed italic">
              вместе мы делаем вещи, которыми приятно любоваться,
              <br />
              их хочется держать в руках и носить с собой
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}