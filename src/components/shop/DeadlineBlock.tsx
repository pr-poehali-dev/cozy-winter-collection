export default function DeadlineBlock() {
  return (
    <section className="py-8 px-6 md:px-8 bg-gradient-to-br from-red-100/40 to-pink-100/30">
      <div className="max-w-3xl mx-auto text-center">
        <h3 
          className="text-xl md:text-2xl font-light mb-6 text-primary"
          style={{ fontFamily: 'Cormorant, serif', fontWeight: 300, letterSpacing: '0.02em' }}
        >
          💔 чтобы подарок дошёл к 14 февраля:
        </h3>
        
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 md:p-6 border border-red-200 shadow-sm">
            <p className="text-sm md:text-base text-primary font-light mb-1">
              по России
            </p>
            <p className="text-base md:text-lg font-light text-red-600">
              закажи до <strong className="font-semibold">10 февраля</strong>
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 md:p-6 border border-red-200 shadow-sm">
            <p className="text-sm md:text-base text-primary font-light mb-1">
              самовывоз в Москве
            </p>
            <p className="text-base md:text-lg font-light text-red-600">
              закажи до <strong className="font-semibold">13 февраля</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
