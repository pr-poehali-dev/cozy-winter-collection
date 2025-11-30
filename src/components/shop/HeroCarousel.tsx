export default function HeroCarousel() {
  return (
    <section className="relative overflow-hidden mt-[72px]">
      <div className="relative w-full">
        <picture>
          <source 
            media="(max-width: 768px)" 
            srcSet="https://cdn.poehali.dev/files/787fcd5b-c366-4747-a9d0-c0174e63907c.jpg"
          />
          <img
            src="https://cdn.poehali.dev/files/6b72c931-edad-4f06-8f42-fec92ace91e3.jpg"
            alt="вещи с душой и теплом"
            className="w-full md:h-[85vh] md:object-cover"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60"></div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-end text-center px-6 md:pb-20 z-10 py-[29px]">
          <div className="max-w-5xl space-y-6 md:space-y-12">
            <div className="space-y-4 md:space-y-6">
              <p className="text-[10px] md:text-sm text-white/90 uppercase tracking-[0.3em] md:tracking-[0.35em] font-light">
                магазинчик вещиц ручной работы
              </p>
              <h1 
                className="text-4xl md:text-5xl text-white leading-[1.1] tracking-tight px-4 max-w-6xl"
                style={{ fontFamily: 'Cormorant, serif', fontWeight: 100 }}
              >
                волшебство, которое можно носить
              </h1>
            </div>
            
            <button
              className="rounded-full px-10 py-3.5 md:px-14 md:py-4 text-xs md:text-base bg-white/95 text-primary hover:bg-white hover:scale-[1.02] transition-all duration-300 font-light tracking-[0.08em] shadow-2xl backdrop-blur-sm"
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