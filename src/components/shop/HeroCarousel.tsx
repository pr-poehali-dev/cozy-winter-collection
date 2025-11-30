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
        
        <div className="absolute inset-0 flex flex-col items-center justify-end text-center px-6 pb-20 md:pb-28 z-10">
          <div className="max-w-3xl space-y-5 md:space-y-6">
            <p className="text-sm md:text-base text-white/85 uppercase tracking-[0.25em] font-light">
              магазинчик вещиц ручной работы
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-light text-white leading-tight tracking-wide">
              вещи с душой и теплом
            </h1>
            
            <button
              className="mt-8 rounded-full px-12 py-4 text-sm md:text-base bg-white text-primary hover:bg-white/95 hover:scale-105 transition-all font-normal tracking-wide shadow-xl"
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