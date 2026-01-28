export default function SurpriseBlock() {
  return (
    <section id="surprise-section" className="py-12 md:py-14 px-6 md:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="vintage-card rounded-2xl p-6 md:p-10 border border-[#6b1515]/10">
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

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-6">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#6b1515]/10 flex items-center justify-center">
                <span className="text-lg md:text-xl">💝</span>
              </div>
              <p className="text-xs md:text-sm font-light text-primary text-center">выбери изделие</p>
            </div>

            <div className="flex flex-col items-center space-y-2">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#6b1515]/10 flex items-center justify-center">
                <span className="text-lg md:text-xl">✍️</span>
              </div>
              <p className="text-xs md:text-sm font-light text-primary text-center">напиши послание</p>
            </div>

            <div className="flex flex-col items-center space-y-2">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#6b1515]/10 flex items-center justify-center">
                <span className="text-lg md:text-xl">📍</span>
              </div>
              <p className="text-xs md:text-sm font-light text-primary text-center">укажи адрес</p>
            </div>

            <div className="flex flex-col items-center space-y-2">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#6b1515]/10 flex items-center justify-center">
                <span className="text-lg md:text-xl">✨</span>
              </div>
              <p className="text-xs md:text-sm font-light text-primary text-center">доставим с любовью</p>
            </div>
          </div>

          <div className="bg-[#6b1515]/5 rounded-xl p-4 md:p-5 border border-[#6b1515]/10 text-center">
            <p className="text-xs md:text-sm text-primary font-light">
              можно отправить <span className="text-[#6b1515] font-normal">анонимно</span> — как тайный поклонник 💕
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}