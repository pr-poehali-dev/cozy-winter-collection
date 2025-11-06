import { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface Snowflake {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
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
  const [snowflakes] = useState<Snowflake[]>(() => 
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 8 + Math.random() * 8,
      size: 0.3 + Math.random() * 0.7
    }))
  );

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
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-indigo-950 flex items-center justify-center px-4 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-400/10 via-transparent to-transparent"></div>
      
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute top-0 text-white/60 pointer-events-none"
          style={{
            left: `${flake.left}%`,
            animation: `fall ${flake.duration}s linear ${flake.delay}s infinite`,
            fontSize: `${flake.size}rem`,
          }}
        >
          ❄
        </div>
      ))}

      <div className="max-w-3xl w-full text-center space-y-16 animate-fade-in relative z-10">
        <div className="space-y-6">
          <div className="inline-block">
            <h1 className="text-7xl md:text-9xl font-serif text-white tracking-tight relative">
              azaluk
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-3xl -z-10"></div>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-blue-100/80 max-w-md mx-auto leading-relaxed font-light">
            вещи из моего мира
          </p>
          <div className="flex items-center justify-center gap-3 text-amber-200/60">
            <span className="text-2xl">✨</span>
            <p className="text-sm tracking-wider uppercase">зимняя сказка открывается</p>
            <span className="text-2xl">✨</span>
          </div>
        </div>

        <div className="space-y-8">
          <div className="grid grid-cols-4 gap-4 md:gap-6 max-w-2xl mx-auto">
            <div className="space-y-3">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-5 md:p-8 shadow-2xl hover:scale-105 transition-transform">
                <div className="text-4xl md:text-6xl font-light text-white tabular-nums drop-shadow-lg">
                  {String(timeLeft.days).padStart(2, '0')}
                </div>
              </div>
              <div className="text-xs md:text-sm text-blue-200/70 uppercase tracking-wide">дней</div>
            </div>
            
            <div className="space-y-3">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-5 md:p-8 shadow-2xl hover:scale-105 transition-transform">
                <div className="text-4xl md:text-6xl font-light text-white tabular-nums drop-shadow-lg">
                  {String(timeLeft.hours).padStart(2, '0')}
                </div>
              </div>
              <div className="text-xs md:text-sm text-blue-200/70 uppercase tracking-wide">часов</div>
            </div>
            
            <div className="space-y-3">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-5 md:p-8 shadow-2xl hover:scale-105 transition-transform">
                <div className="text-4xl md:text-6xl font-light text-white tabular-nums drop-shadow-lg">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
              </div>
              <div className="text-xs md:text-sm text-blue-200/70 uppercase tracking-wide">минут</div>
            </div>
            
            <div className="space-y-3">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-5 md:p-8 shadow-2xl hover:scale-105 transition-transform">
                <div className="text-4xl md:text-6xl font-light text-white tabular-nums drop-shadow-lg">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
              </div>
              <div className="text-xs md:text-sm text-blue-200/70 uppercase tracking-wide">секунд</div>
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-8">
          <div className="inline-block px-6 py-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
            <p className="text-base md:text-lg text-blue-100 font-light">
              1 декабря 2025 · 12:00 мск
            </p>
          </div>
          <p className="text-sm md:text-base text-blue-200/50 italic max-w-lg mx-auto leading-relaxed">
            косынки · вязаные чепчики · подвесы для помады · бумажные и световые гирлянды
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
