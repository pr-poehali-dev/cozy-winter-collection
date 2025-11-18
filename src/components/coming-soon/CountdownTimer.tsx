interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  timeLeft: TimeLeft;
}

export default function CountdownTimer({ timeLeft }: CountdownTimerProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-6 text-center">
        <div className="flex flex-col items-center space-y-3">
          <h1
            className="text-4xl md:text-5xl text-primary tracking-wide"
            style={{ fontFamily: "Cormorant, serif", fontWeight: 400 }}
          >
            магазинчик рукотворных вещиц
          </h1>
          <p
            className="text-3xl md:text-4xl text-primary/80"
            style={{ fontFamily: "Cormorant, serif", fontWeight: 300 }}
          >
            azaluk
          </p>
        </div>
        <p className="text-base md:text-lg text-muted-foreground font-light">
          откроется через...
        </p>
      </div>

      <div className="grid grid-cols-4 gap-3 md:gap-6 max-w-2xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg border border-border">
          <div className="text-3xl md:text-5xl font-light text-primary mb-2">
            {String(timeLeft.days).padStart(2, "0")}
          </div>
          <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wide">
            дней
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg border border-border">
          <div className="text-3xl md:text-5xl font-light text-primary mb-2">
            {String(timeLeft.hours).padStart(2, "0")}
          </div>
          <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wide">
            часов
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg border border-border">
          <div className="text-3xl md:text-5xl font-light text-primary mb-2">
            {String(timeLeft.minutes).padStart(2, "0")}
          </div>
          <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wide">
            минут
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg border border-border">
          <div className="text-3xl md:text-5xl font-light text-primary mb-2">
            {String(timeLeft.seconds).padStart(2, "0")}
          </div>
          <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wide">
            секунд
          </div>
        </div>
      </div>
    </div>
  );
}
