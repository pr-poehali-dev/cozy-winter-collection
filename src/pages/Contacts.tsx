import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import Footer from '@/components/Footer';

export default function Contacts() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl text-primary tracking-wide hover:opacity-70 transition-opacity" style={{ fontFamily: 'Cormorant, serif', fontWeight: 300 }}>
            azaluk
          </Link>
          <Link to="/" className="text-sm font-light text-primary hover:text-muted-foreground transition-colors">
            вернуться на главную
          </Link>
        </div>
      </header>

      <main className="flex-1 pt-24 pb-16 px-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-light text-primary text-center mb-3" style={{ fontFamily: 'Cormorant, serif' }}>
            контакты
          </h1>
          <p className="text-center text-muted-foreground font-light mb-12 md:mb-16">
            мы всегда рады общению с вами
          </p>

          <div className="space-y-8 md:space-y-12">
            <div className="bg-card/50 rounded-2xl p-8 md:p-10 border border-border/50">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Icon name="Mail" size={24} className="text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <h2 className="text-lg font-light text-primary mb-2">электронная почта</h2>
                  <a 
                    href="mailto:azaluk.halimova@gmail.com"
                    className="text-muted-foreground hover:text-primary transition-colors font-light"
                  >
                    azaluk.halimova@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-card/50 rounded-2xl p-8 md:p-10 border border-border/50">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Icon name="Share2" size={24} className="text-primary" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-light text-primary mb-4">социальные сети</h2>
                  <div className="flex flex-col gap-3">
                    <a
                      href="https://t.me/azalukk"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 bg-background/50 rounded-xl hover:bg-background transition-colors group"
                    >
                      <span className="text-2xl">☕</span>
                      <span className="font-light text-muted-foreground group-hover:text-primary transition-colors">
                        telegram
                      </span>
                      <Icon name="ExternalLink" size={16} className="ml-auto text-muted-foreground/50 group-hover:text-primary/50 transition-colors" strokeWidth={1.5} />
                    </a>
                    <a
                      href="https://vk.com/azalukk"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 bg-background/50 rounded-xl hover:bg-background transition-colors group"
                    >
                      <span className="text-2xl">💙</span>
                      <span className="font-light text-muted-foreground group-hover:text-primary transition-colors">
                        вконтакте
                      </span>
                      <Icon name="ExternalLink" size={16} className="ml-auto text-muted-foreground/50 group-hover:text-primary/50 transition-colors" strokeWidth={1.5} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center pt-6">
              <p className="text-sm text-muted-foreground font-light">
                будем рады ответить на ваши вопросы 🤍
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
