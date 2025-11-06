import { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function ComingSoon() {
  const launchDate = new Date('2025-12-01T12:00:00+03:00');
  
  const calculateTimeLeft = (): TimeLeft => {
    const difference = launchDate.getTime() - new Date().getTime();
    
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const isLaunched = timeLeft.days === 0 && timeLeft.hours === 0 && 
                     timeLeft.minutes === 0 && timeLeft.seconds === 0;

  if (isLaunched) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-orange-50/30 to-amber-50/40 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center space-y-12 animate-fade-in">
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-serif text-primary tracking-tight">
            azaluk
          </h1>
          <p className="md:text-xl text-muted-foreground max-w-md mx-auto leading-relaxed text-lg">вещи из мира azaluk</p>
        </div>

        <div className="space-y-6">
          <p className="text-base md:text-lg text-muted-foreground">
            магазин откроется
          </p>
          
          <div className="grid grid-cols-4 gap-3 md:gap-6 max-w-lg mx-auto">
            <div className="space-y-2">
              <div className="bg-white rounded-2xl shadow-sm border border-border p-4 md:p-6">
                <div className="text-3xl md:text-5xl font-light text-primary tabular-nums">
                  {String(timeLeft.days).padStart(2, '0')}
                </div>
              </div>
              <div className="text-xs md:text-sm text-muted-foreground">дней</div>
            </div>
            
            <div className="space-y-2">
              <div className="bg-white rounded-2xl shadow-sm border border-border p-4 md:p-6">
                <div className="text-3xl md:text-5xl font-light text-primary tabular-nums">
                  {String(timeLeft.hours).padStart(2, '0')}
                </div>
              </div>
              <div className="text-xs md:text-sm text-muted-foreground">часов</div>
            </div>
            
            <div className="space-y-2">
              <div className="bg-white rounded-2xl shadow-sm border border-border p-4 md:p-6">
                <div className="text-3xl md:text-5xl font-light text-primary tabular-nums">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
              </div>
              <div className="text-xs md:text-sm text-muted-foreground">минут</div>
            </div>
            
            <div className="space-y-2">
              <div className="bg-white rounded-2xl shadow-sm border border-border p-4 md:p-6">
                <div className="text-3xl md:text-5xl font-light text-primary tabular-nums">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
              </div>
              <div className="text-xs md:text-sm text-muted-foreground">секунд</div>
            </div>
          </div>
        </div>

        <div className="space-y-3 pt-6">
          <p className="text-sm md:text-base text-muted-foreground">
            1 декабря 2025 в 12:00 мск
          </p>
          <p className="text-xs md:text-sm text-muted-foreground/60 italic max-w-sm mx-auto">
            зимняя коллекция: косынки, вязаные чепчики, подвесы для помады, гирлянды
          </p>
        </div>
      </div>
    </div>
  );
}