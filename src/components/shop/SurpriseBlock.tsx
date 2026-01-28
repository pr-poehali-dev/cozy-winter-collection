export default function SurpriseBlock() {
  return (
    <section id="surprise-section" className="py-16 px-6 md:px-8 bg-gradient-to-br from-red-50/50 via-pink-50/30 to-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 
          className="text-3xl md:text-4xl font-light mb-4 text-primary"
          style={{ fontFamily: 'Cormorant, serif', fontWeight: 300, letterSpacing: '0.02em' }}
        >
          💌 отправь валентинку напрямую
        </h2>
        <p className="text-sm md:text-base text-muted-foreground mb-8">
          как в школе, только теперь — в любой город
        </p>

        <div className="grid md:grid-cols-4 gap-6 md:gap-8 mb-10">
          <div className="space-y-2">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-3">
              <span className="text-xl md:text-2xl">1️⃣</span>
            </div>
            <h3 className="text-sm md:text-base font-light text-primary">выбери изделие</h3>
          </div>

          <div className="space-y-2">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-3">
              <span className="text-xl md:text-2xl">2️⃣</span>
            </div>
            <h3 className="text-sm md:text-base font-light text-primary">напиши текст послания</h3>
          </div>

          <div className="space-y-2">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-3">
              <span className="text-xl md:text-2xl">3️⃣</span>
            </div>
            <h3 className="text-sm md:text-base font-light text-primary">укажи адрес получателя</h3>
          </div>

          <div className="space-y-2">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-3">
              <span className="text-xl md:text-2xl">4️⃣</span>
            </div>
            <h3 className="text-sm md:text-base font-light text-primary">мы упакуем и отправим</h3>
            <p className="text-xs text-muted-foreground">сюрприз сохраним ✨</p>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-red-200 shadow-sm">
          <p className="text-sm md:text-base text-primary font-light">
            можно отправить анонимно — как тайный поклонник 💕
          </p>
        </div>
      </div>
    </section>
  );
}
