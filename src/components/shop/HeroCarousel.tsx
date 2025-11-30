export default function HeroCarousel() {
  return (
    <section className="relative h-[80vh] md:h-[85vh] overflow-hidden">
      <div className="relative w-full h-full">
        <img
          src="https://cdn.poehali.dev/files/c80476aa-bd53-4839-92a0-04dd2a2f6259.png"
          alt="вещи с душой и теплом"
          className="w-full h-full object-cover md:object-center object-[50%_35%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60"></div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-end text-center px-6 pb-16 md:pb-20 z-10">
          <div className="max-w-2xl space-y-3">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-white leading-relaxed tracking-wide">
              вещи с душой и теплом
            </h1>
            <p className="text-base md:text-lg text-white/95 leading-relaxed font-light tracking-wide max-w-xl mx-auto">
              каждая создана вручную, чтобы стать частью твоей истории
            </p>
            
            <button
              className="mt-4 rounded-full px-10 py-3.5 text-sm md:text-base bg-white/95 text-primary hover:bg-white hover:scale-105 transition-all font-light tracking-wide shadow-lg"
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