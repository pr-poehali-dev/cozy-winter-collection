import { useState } from 'react';

export default function HeroCarousel() {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section className="relative overflow-hidden mt-[72px]">
      <div className="relative w-full">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 border-4 border-transparent border-t-primary/40 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
            </div>
          </div>
        )}
        <picture>
          <source 
            media="(max-width: 768px)" 
            srcSet="https://cdn.poehali.dev/files/787fcd5b-c366-4747-a9d0-c0174e63907c.jpg"
          />
          <img
            src="https://cdn.poehali.dev/files/6b72c931-edad-4f06-8f42-fec92ace91e3.jpg"
            alt="вещи с душой и теплом"
            className={`w-full md:h-[85vh] md:object-cover transition-opacity duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60"></div>
        
        {/* Floating testimonials - mobile only */}
        <div className="md:hidden absolute inset-0 pointer-events-none">
          <div className="absolute top-[15%] left-[8%] animate-float-slow">
            <div className="backdrop-blur-sm bg-white/10 rounded-2xl px-3 py-2 shadow-xl border border-white/20">
              <p className="text-[10px] text-white/95 font-light italic leading-relaxed">
                это невероятно<br />красиво...
              </p>
            </div>
          </div>
          
          <div className="absolute top-[35%] right-[5%] animate-float-delayed">
            <div className="backdrop-blur-sm bg-white/10 rounded-2xl px-3 py-2 shadow-xl border border-white/20">
              <p className="text-[10px] text-white/95 font-light italic leading-relaxed">
                не встречала<br />ничего похожего!
              </p>
            </div>
          </div>
          
          <div className="absolute top-[55%] left-[10%] animate-float">
            <div className="backdrop-blur-sm bg-white/10 rounded-2xl px-3 py-2 shadow-xl border border-white/20">
              <p className="text-[10px] text-white/95 font-light italic leading-relaxed">
                все спрашивают,<br />где заказывала ✨
              </p>
            </div>
          </div>
        </div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-end text-center px-6 md:pb-20 z-10 py-[29px]">
          <div className="max-w-5xl space-y-6 md:space-y-12">
            <div className="space-y-4 md:space-y-6">
              <p className="text-[10px] md:text-sm text-white/90 uppercase tracking-[0.3em] md:tracking-[0.35em] font-light">
                магазинчик вещиц ручной работы
              </p>
              <h1 
                className="md:text-5xl leading-[1.15] px-4 max-w-6xl text-3xl font-light text-[#fffbf7f5]"
                style={{ fontFamily: 'Cormorant, serif', fontWeight: 300, letterSpacing: '0.02em' }}
              >волшебство, которое можно носить</h1>
            </div>
            
            <button
              className="rounded-full px-10 py-3.5 md:px-14 md:py-4 text-xs md:text-base text-primary hover:bg-white hover:scale-[1.02] transition-all duration-300 font-light tracking-[0.08em] shadow-2xl backdrop-blur-sm bg-[#fff8ed]"
              onClick={() => {
                const catalog = document.getElementById('catalog');
                if (catalog) {
                  const yOffset = -100;
                  const y = catalog.getBoundingClientRect().top + window.pageYOffset + yOffset;
                  window.scrollTo({ top: y, behavior: 'smooth' });
                }
              }}
            >
              посмотреть коллекцию
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}