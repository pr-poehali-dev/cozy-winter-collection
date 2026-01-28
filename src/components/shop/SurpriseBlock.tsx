export default function SurpriseBlock() {
  return (
    <section id="surprise-section" className="md:py-16 md:px-8 px-4 py-11">
      <div className="max-w-4xl mx-auto">
        <div className="border border-[#8b7355]/20 rounded-3xl md:px-10 md:py-10 bg-gradient-to-b from-white/40 to-transparent py-4 px-0">
          <div className="text-center mb-6 md:mb-8">
            <h2 
              className="text-xl md:text-3xl font-light mb-1.5 md:mb-2 text-[#6b1515]"
              style={{ fontFamily: 'Cormorant, serif', fontWeight: 300, letterSpacing: '0.02em' }}
            >
              💌 отправь валентинку напрямую
            </h2>
            <p className="text-xs md:text-base text-muted-foreground/80">
              как в школе, только теперь — в любой город
            </p>
          </div>

          <div className="flex justify-center items-center gap-2 md:gap-8 mb-5 md:mb-7">
            <div className="flex flex-col items-center space-y-2 md:space-y-3 text-center flex-1 max-w-[100px] md:max-w-none">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#6b1515]/8 flex items-center justify-center transition-transform hover:scale-105">
                <span className="text-2xl md:text-3xl">💝</span>
              </div>
              <p className="text-xs md:text-sm font-light text-primary leading-snug">выбери изделие</p>
            </div>

            <div className="text-[#8b7355]/30 text-xl md:text-2xl self-start mt-5 md:mt-6">→</div>

            <div className="flex flex-col items-center space-y-2 md:space-y-3 text-center flex-1 max-w-[100px] md:max-w-none">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#6b1515]/8 flex items-center justify-center transition-transform hover:scale-105">
                <span className="text-2xl md:text-3xl">✍️</span>
              </div>
              <p className="text-xs md:text-sm font-light text-primary leading-snug">напиши послание</p>
            </div>

            <div className="text-[#8b7355]/30 text-xl md:text-2xl self-start mt-5 md:mt-6">→</div>

            <div className="flex flex-col items-center space-y-2 md:space-y-3 text-center flex-1 max-w-[100px] md:max-w-none">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#6b1515]/8 flex items-center justify-center transition-transform hover:scale-105">
                <span className="text-2xl md:text-3xl">📍</span>
              </div>
              <p className="text-xs md:text-sm font-light text-primary leading-snug">укажи адрес</p>
            </div>
          </div>

          <div className="text-center pt-3 md:pt-4 border-t border-[#8b7355]/10">
            <p className="text-[10px] md:text-sm text-muted-foreground/70 font-light">
              можно отправить <span className="text-[#6b1515] font-normal">анонимно</span> — как тайный поклонник 💕
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}