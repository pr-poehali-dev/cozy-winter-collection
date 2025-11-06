import { useState, useEffect, useRef } from 'react';

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
  const [clearedPixels, setClearedPixels] = useState<Set<string>>(new Set());
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const handleClear = (clientX: number, clientY: number) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.floor((clientX - rect.left) / 40);
    const y = Math.floor((clientY - rect.top) / 40);
    
    const newCleared = new Set(clearedPixels);
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        newCleared.add(`${x + dx},${y + dy}`);
      }
    }
    setClearedPixels(newCleared);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleClear(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleClear(e.clientX, e.clientY);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    const touch = e.touches[0];
    handleClear(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      const touch = e.touches[0];
      handleClear(touch.clientX, touch.clientY);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const totalPixels = Math.ceil(window.innerWidth / 40) * Math.ceil(window.innerHeight / 40);
  const clearedPercentage = (clearedPixels.size / totalPixels) * 100;
  const showContent = clearedPercentage > 15;

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-white via-orange-50/30 to-amber-50/40 flex items-center justify-center px-4 relative overflow-hidden"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ touchAction: 'none', cursor: 'pointer' }}
    >
      <div className={`max-w-2xl w-full text-center space-y-12 transition-opacity duration-500 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
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

        <div className="space-y-3 my-0 py-0">
          <p className="text-sm md:text-base text-muted-foreground">встретимся здесь в первый день зимы! ❄️</p>
          <p className="text-xs md:text-sm text-muted-foreground/60 italic max-w-sm mx-auto">в зимней коллекции вещиц вас ждут... волшебные чепцы, задорные подвесы и домашний декор! 🍵✨☃️</p>
        </div>
      </div>

      <div 
        className="frost-overlay"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: showContent ? 0 : 1,
          transition: 'opacity 0.5s'
        }}
      >
        {Array.from({ length: Math.ceil(window.innerHeight / 40) }, (_, y) =>
          Array.from({ length: Math.ceil(window.innerWidth / 40) }, (_, x) => {
            const key = `${x},${y}`;
            return clearedPixels.has(key) ? null : (
              <div
                key={key}
                className="frost-pixel"
                style={{
                  position: 'absolute',
                  left: x * 40,
                  top: y * 40,
                  width: 40,
                  height: 40
                }}
              />
            );
          })
        )}
      </div>

      {!showContent && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p className="text-lg md:text-xl text-primary/60 animate-pulse">протри экран... ❄️</p>
        </div>
      )}
    </div>
  );
}