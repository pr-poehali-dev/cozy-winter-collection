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
  const [fortuneOpened, setFortuneOpened] = useState(false);
  const [currentFortune, setCurrentFortune] = useState<{text: string, bonus: string} | null>(null);

  const fortunes = [
    { text: 'зима принесёт тебе уют и новые знакомства', bonus: 'промокод WINTER10 на скидку 10%' },
    { text: 'в холодные дни тебя согреют тёплые мысли', bonus: 'промокод COZY15 на скидку 15%' },
    { text: 'снег укроет старое, открывая путь новому', bonus: 'промокод SNOW20 на скидку 20%' },
    { text: 'морозные узоры напомнят о красоте простых вещей', bonus: 'промокод FROST10 на скидку 10%' },
    { text: 'зимнее солнце осветит твои самые смелые планы', bonus: 'промокод SUN15 на скидку 15%' }
  ];

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

  const handleFortuneCookieClick = () => {
    if (!fortuneOpened) {
      const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
      setCurrentFortune(randomFortune);
      setFortuneOpened(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-orange-50/30 to-amber-50/40 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center space-y-12">
        <div className="space-y-6">
          <p className="text-base md:text-lg text-muted-foreground">магазинчик вещиц azaluk<br />откроется через... 🔮</p>
          
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

        <div className="space-y-6">
          <p className="text-sm md:text-base text-muted-foreground">встретимся здесь в первый день зимы! ❄️</p>
          <p className="text-xs md:text-sm text-muted-foreground/60 italic max-w-sm mx-auto">в зимней коллекции вещиц вас ждут... волшебные чепцы, задорные подвесы и домашний декор! 🍵✨☃️</p>
          
          <div className="mt-8 flex flex-col items-center">
            {!fortuneOpened ? (
              <button
                onClick={handleFortuneCookieClick}
                className="group relative cursor-pointer focus:outline-none"
              >
                <div className="text-6xl md:text-8xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  🥠
                </div>
                <p className="mt-4 text-xs md:text-sm text-muted-foreground/60 group-hover:text-muted-foreground transition-colors">
                  вытяни печенье-предсказание
                </p>
              </button>
            ) : (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center justify-center gap-3 text-4xl md:text-6xl">
                  <span className="animate-bounce" style={{ animationDelay: '0s' }}>🥠</span>
                  <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>✨</span>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg border border-border max-w-md">
                  <p className="text-sm md:text-base text-primary font-medium mb-4">
                    {currentFortune?.text}
                  </p>
                  <div className="pt-4 border-t border-border">
                    <p className="text-xs md:text-sm text-muted-foreground mb-2">твой бонус:</p>
                    <p className="text-sm md:text-base text-accent font-medium">
                      {currentFortune?.bonus}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}