export default function HeroCarousel() {
  return (
    <section className="relative overflow-hidden mt-[72px]">
      <div className="relative w-full">
        <picture>
          <source 
            media="(max-width: 768px)" 
            srcSet="https://cdn.poehali.dev/files/c48413ed-e345-42ea-80d3-e1633e6f8b93.png"
          />
          <img
            src="https://cdn.poehali.dev/files/c80476aa-bd53-4839-92a0-04dd2a2f6259.png"
            alt="вещи с душой и теплом"
            className="w-full md:h-[85vh] md:object-cover"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60"></div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-end text-center px-4 pb-16 md:pb-20 z-10">
          <div className="max-w-4xl w-full space-y-6 md:space-y-8">
            <div className="space-y-2 md:space-y-4">
              <p className="text-[10px] md:text-sm text-white/75 uppercase tracking-[0.3em] font-light font-sans">
                магазинчик вещиц ручной работы
              </p>
              <h1 className="text-2xl md:text-5xl lg:text-6xl text-white font-light leading-tight tracking-wide font-serif">
                волшебство, которое можно носить
              </h1>
            </div>
            
            <button
              className="rounded-full px-10 md:px-14 py-3 md:py-4 text-xs md:text-sm bg-white/95 text-primary hover:bg-white hover:scale-105 transition-all font-light tracking-widest uppercase shadow-2xl font-sans"
              onClick={() => {
                document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
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