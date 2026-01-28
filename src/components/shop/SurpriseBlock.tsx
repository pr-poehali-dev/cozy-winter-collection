export default function SurpriseBlock() {
  return (
    <section id="surprise-section" className="py-12 md:py-16 px-6 md:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 md:mb-10">
          <h2 
            className="text-2xl md:text-3xl font-light mb-2 text-[#6b1515]"
            style={{ fontFamily: 'Cormorant, serif', fontWeight: 300, letterSpacing: '0.02em' }}
          >
            💌 отправь валентинку напрямую
          </h2>
          <p className="text-sm md:text-base text-muted-foreground italic">
            как в школе, только теперь — в любой город
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-10 mb-8">
          <div className="flex flex-col items-center space-y-3 text-center">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#6b1515]/10 flex items-center justify-center">
              <span className="text-2xl md:text-3xl">💝</span>
            </div>
            <p className="text-sm md:text-base font-light text-primary">выбери изделие</p>
          </div>

          <div className="flex flex-col items-center space-y-3 text-center">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#6b1515]/10 flex items-center justify-center">
              <span className="text-2xl md:text-3xl">✍️</span>
            </div>
            <p className="text-sm md:text-base font-light text-primary">напиши послание</p>
          </div>

          <div className="flex flex-col items-center space-y-3 text-center">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#6b1515]/10 flex items-center justify-center">
              <span className="text-2xl md:text-3xl">📍</span>
            </div>
            <p className="text-sm md:text-base font-light text-primary">укажи адрес</p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-xs md:text-sm text-muted-foreground font-light">
            можно отправить <span className="text-[#6b1515] font-normal">анонимно</span> — как тайный поклонник 💕
          </p>
        </div>
      </div>
    </section>
  );
}