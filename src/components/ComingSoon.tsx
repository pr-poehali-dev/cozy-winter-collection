import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import Shop from "./Shop";
import { Button } from "@/components/ui/button";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function ComingSoon() {
  const DEV_MODE = false;
  const launchDate = new Date("2025-12-01T12:00:00+03:00");

  const calculateTimeLeft = (): TimeLeft => {
    if (DEV_MODE) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    const difference = launchDate.getTime() - new Date().getTime();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [showFortune, setShowFortune] = useState(true);
  const [fortuneOpened, setFortuneOpened] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [currentFortune, setCurrentFortune] = useState<{
    text: string;
    emoji: string;
  } | null>(null);

  const fortunes = [
    {
      text: "этой зимой ты окружишь себя вещами, которые приносят радость. каждая мелочь будет иметь значение!",
      emoji: "❄️",
    },
    {
      text: "тебя ждёт сезон тёплых встреч и уютных вечеров. создавай моменты, которые останутся в памяти!",
      emoji: "🔮",
    },
    {
      text: "холодные дни напомнят о ценности простых удовольствий. позволь себе наслаждаться каждым из них!",
      emoji: "✨",
    },
    {
      text: "зима станет временем для творчества и самовыражения. не бойся пробовать новое!",
      emoji: "❄️",
    },
    {
      text: "впереди сезон, когда дом станет твоим любимым местом. создай в нём атмосферу волшебства!",
      emoji: "🔮",
    },
    {
      text: "этой зимой ты откроешь для себя красоту в деталях. обрати внимание на то, что раньше не замечал!",
      emoji: "✨",
    },
    {
      text: "морозные дни принесут вдохновение и ясность мыслей. доверяй своей интуиции!",
      emoji: "❄️",
    },
    {
      text: "тебя ждёт зима новых привычек и маленьких ритуалов, которые сделают жизнь уютнее!",
      emoji: "🔮",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const isLaunched =
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0;

  if (isLaunched) {
    return <Shop />;
  }

  const handleFortuneCookieClick = () => {
    if (!fortuneOpened && !isShaking) {
      setIsShaking(true);
      setTimeout(() => {
        const randomFortune =
          fortunes[Math.floor(Math.random() * fortunes.length)];
        setCurrentFortune(randomFortune);
        setFortuneOpened(true);
        setIsShaking(false);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-orange-50 to-amber-50 flex items-center justify-center px-4 relative overflow-hidden">
      {showFortune && (
        <div className="fixed inset-0 bg-gradient-to-br from-white via-orange-50 to-amber-50 z-50 flex items-center justify-center px-4">
          <button
            onClick={() => setShowFortune(false)}
            className="absolute top-4 right-4 md:top-8 md:right-8 p-2 rounded-full hover:bg-white/50 transition-colors group"
            aria-label="Закрыть"
          >
            <Icon
              name="X"
              size={24}
              className="text-muted-foreground group-hover:text-primary transition-colors"
            />
          </button>
          <div className="max-w-md w-full flex flex-col items-center space-y-8">
            {!fortuneOpened ? (
              <>
                <div className="space-y-4 text-center">
                  <p className="text-lg md:text-xl text-primary">добро пожаловать! 🔮</p>
                  <p className="text-sm md:text-base text-muted-foreground">
                    прежде чем узнать о магазинчике,
                    <br />
                    вытяни своё зимнее предсказание:
                  </p>
                </div>
                <button
                  onClick={handleFortuneCookieClick}
                  className="group relative cursor-pointer focus:outline-none"
                  disabled={isShaking}
                >
                  <div
                    className={`text-8xl md:text-9xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 ${isShaking ? "cookie-shake" : ""}`}
                  >
                    🥠
                  </div>
                  <p className="mt-4 text-sm md:text-base text-muted-foreground/60 group-hover:text-muted-foreground transition-colors">
                    {isShaking ? "печенье раскрывается..." : "нажми на печенье"}
                  </p>
                </button>
              </>
            ) : (
              <div className="space-y-6 animate-fade-in w-full">
                <div className="flex items-center justify-center gap-3 text-4xl md:text-6xl">
                  <span
                    className="animate-bounce"
                    style={{ animationDelay: "0s" }}
                  >
                    🥠
                  </span>
                  <span
                    className="animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  >
                    ✨
                  </span>
                </div>
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg border border-border">
                  <p className="text-base md:text-lg text-primary font-medium mb-4 leading-relaxed">
                    {currentFortune?.text}
                  </p>
                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center justify-center gap-4">
                      <p className="text-xs md:text-sm text-muted-foreground text-left">
                        укажи при покупке
                        <br />
                        этот смайлик и получишь
                        <br />
                        подарок к заказу →
                      </p>
                      <p className="text-5xl md:text-6xl">
                        {currentFortune?.emoji}
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground/70 italic text-center">
                  не забудь сделать скрин! 📸
                </p>
                <button
                  onClick={() => setShowFortune(false)}
                  className="mt-6 w-full py-3 px-6 bg-white/80 hover:bg-white rounded-xl border border-border text-sm md:text-base text-muted-foreground hover:text-primary transition-colors"
                >
                  посмотреть, когда откроется магазин →
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="max-w-4xl w-full text-center space-y-12">
        {/* Photo carousel */}
        <div className="relative overflow-hidden rounded-2xl shadow-2xl">
          <div className="grid md:grid-cols-3 gap-2">
            <img 
              src="https://cdn.poehali.dev/files/f9fe8956-e4b2-4d08-b2fc-0195aa240b23.png" 
              alt="Чепчик брусничный"
              className="w-full h-64 md:h-80 object-cover rounded-xl hover:scale-105 transition-transform duration-500"
            />
            <img 
              src="https://cdn.poehali.dev/files/14a74df9-0c9e-49aa-b649-04c064eb375a.png" 
              alt="Чепчик молочный"
              className="w-full h-64 md:h-80 object-cover rounded-xl hover:scale-105 transition-transform duration-500"
            />
            <img 
              src="https://cdn.poehali.dev/files/031f61f1-ffb6-48da-889e-8ff29b154541.png" 
              alt="Сказочный бокс"
              className="w-full h-64 md:h-80 object-cover rounded-xl hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
        <div className="space-y-6">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-light text-primary leading-relaxed">
            тропинка
          </h1>
          <p className="text-base md:text-lg text-muted-foreground my-3">магазинчик рукотворных вещиц откроется через... 🔮</p>

          <div className="grid grid-cols-4 gap-3 md:gap-6 max-w-lg mx-auto">
            <div className="space-y-2">
              <div className="bg-white rounded-2xl shadow-sm border border-border p-4 md:p-6">
                <div className="text-3xl md:text-5xl font-light text-primary tabular-nums">
                  {String(timeLeft.days).padStart(2, "0")}
                </div>
              </div>
              <div className="text-xs md:text-sm text-muted-foreground">
                дней
              </div>
            </div>

            <div className="space-y-2">
              <div className="bg-white rounded-2xl shadow-sm border border-border p-4 md:p-6">
                <div className="text-3xl md:text-5xl font-light text-primary tabular-nums">
                  {String(timeLeft.hours).padStart(2, "0")}
                </div>
              </div>
              <div className="text-xs md:text-sm text-muted-foreground">
                часов
              </div>
            </div>

            <div className="space-y-2">
              <div className="bg-white rounded-2xl shadow-sm border border-border p-4 md:p-6">
                <div className="text-3xl md:text-5xl font-light text-primary tabular-nums">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </div>
              </div>
              <div className="text-xs md:text-sm text-muted-foreground">
                минут
              </div>
            </div>

            <div className="space-y-2">
              <div className="bg-white rounded-2xl shadow-sm border border-border p-4 md:p-6">
                <div className="text-3xl md:text-5xl font-light text-primary tabular-nums">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </div>
              </div>
              <div className="text-xs md:text-sm text-muted-foreground">
                секунд
              </div>
            </div>
          </div>
        </div>

        {/* What awaits you block */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-lg border border-border max-w-2xl mx-auto space-y-6">
          <h2 className="text-2xl md:text-3xl font-light text-primary">что вас ждёт?</h2>
          <div className="space-y-4 text-left text-muted-foreground leading-relaxed">
            <div className="flex gap-3">
              <span className="text-2xl flex-shrink-0">🧦</span>
              <p><strong className="text-primary font-medium">вязаные чепчики</strong> — мягкие, как облако, согревают в морозы</p>
            </div>
            <div className="flex gap-3">
              <span className="text-2xl flex-shrink-0">🍄</span>
              <p><strong className="text-primary font-medium">лесные грибочки</strong> — подвески, которые приносят уют в дом</p>
            </div>
            <div className="flex gap-3">
              <span className="text-2xl flex-shrink-0">🎁</span>
              <p><strong className="text-primary font-medium">сказочные боксы</strong> — готовые подарки с волшебством внутри</p>
            </div>
          </div>
        </div>

        {/* Telegram subscribe */}
        <div className="bg-gradient-to-br from-white/80 to-orange-50/40 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg border border-border max-w-xl mx-auto space-y-4">
          <div className="space-y-3">
            <h3 className="text-xl md:text-2xl font-light text-primary">следите за новостями 💌</h3>
          </div>
          <a 
            href="https://t.me/azalukk"
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-8"
          >
            <Button 
              className="w-full px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl transition-colors"
            >
              подписаться на телеграм ✨
            </Button>
          </a>
          <p className="text-xs text-muted-foreground/60">анонсы, закулисье создания и немного волшебства</p>
        </div>

        <div className="space-y-4">
          <p className="text-sm md:text-base text-muted-foreground">
            встретимся здесь в первый день зимы! ❄️
          </p>
          <p className="text-sm md:text-base text-muted-foreground/70 max-w-md mx-auto leading-relaxed">
            создаём вручную, с любовью и заботой. каждая вещь хранит тепло наших
            рук и немного волшебства ✨
          </p>
        </div>
      </div>
    </div>
  );
}