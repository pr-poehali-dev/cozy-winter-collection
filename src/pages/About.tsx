import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';

export default function About() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <div className="min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-light text-primary tracking-wide">azaluk</h1>
          
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
              <SheetContent side="right" className="w-64">
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
          <div className="text-center">
            <p className="text-moss/70 leading-relaxed max-w-2xl mx-auto text-lg">
              azaluk — это маленький магазин из мира двух подруг, Азалии и Вики.
              <br />
              мы вместе разрабатываем и создаём вещи, в которых живут уют и немного сказки.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-3xl mx-auto">
            <div className="space-y-4">
              <div className="aspect-[4/3] bg-moss/10 rounded-2xl overflow-hidden">
                <img 
                  src="https://cdn.poehali.dev/files/36358c56-fbd3-4e96-8bba-c134ce00ab3e.jpg" 
                  alt="Азалия с камерой"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="space-y-4 relative">
                <div className="absolute -top-4 -left-4 text-2xl opacity-20">✨</div>
                <div className="absolute -top-2 -right-6 text-xl opacity-15">📸</div>
                <h2 className="text-2xl font-light text-moss">привет, я азалия!</h2>
                <div className="space-y-3 text-moss/70 leading-relaxed">
                  <p>
                    я придумала этот проект и отвечаю за то, какие изделия будут продаваться в azaluk.
                  </p>
                  <p>
                    снимаю наши фото и видео, оформляю сайт и блоги, продумываю стратегии роста, собираю заказы и общаюсь с вами в поддержке тоже я
                  </p>
                  <p>
                    веду{' '}
                    <a 
                      href="https://www.youtube.com/@azaluk" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="link-red transition-colors"
                    >
                      ютуб
                    </a>
                    {' '}и{' '}
                    <a 
                      href="https://t.me/azalukk" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="link-red transition-colors"
                    >
                      телеграм
                    </a>
                    {' '}каналы, в них делюсь своим мировоззрением, привношу волшебство в повседневность и показываю наши внутренние процессы.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4 md:mt-16">
              <div className="aspect-[4/3] bg-moss/10 rounded-2xl overflow-hidden">
                <img 
                  src="https://cdn.poehali.dev/files/bf310f2c-13fe-4e0c-87e8-02da9d338017.png" 
                  alt="Вика с изделиями"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="space-y-4 relative">
                <div className="absolute -top-4 -left-4 text-2xl opacity-20">🧵</div>
                <div className="absolute -top-2 -right-6 text-xl opacity-15">✂️</div>
                <h2 className="text-2xl font-light text-moss">а это вика!</h2>
                <div className="space-y-3 text-moss/70 leading-relaxed">
                  <p>
                    она — волшебные руки azaluk.
                  </p>
                  <p>
                    именно Вика воплощает наши идеи в реальность — в тканях, нитях и деталях: подбирает материалы, создаёт образцы, тестирует идеи
                  </p>
                  <p>
                    благодаря ей вы получаете изделия в таком виде, в котором они приходят
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