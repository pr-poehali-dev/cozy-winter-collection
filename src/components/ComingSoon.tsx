import { useState, useEffect } from "react";
import Shop from "./Shop";
import Footer from "./shop/Footer";
import FortuneModal from "./coming-soon/FortuneModal";

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-orange-50 to-amber-50 flex flex-col">
      {showFortune && (
        <FortuneModal
          fortunes={fortunes}
          onClose={() => setShowFortune(false)}
        />
      )}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-16 relative">
        <div className="text-center space-y-12 max-w-3xl w-full">
          <div className="space-y-6">
            <div className="text-7xl mb-6">🥠</div>
            <h1
              className="text-4xl md:text-6xl lg:text-7xl text-primary mb-4"
              style={{ fontFamily: "Cormorant, serif", fontWeight: 600 }}
            >
              azaluk
            </h1>
            <p
              className="text-2xl md:text-3xl text-muted-foreground"
              style={{ fontFamily: "Cormorant, serif", fontWeight: 300 }}
            >
              уютный магазинчик хороших вещей
            </p>
          </div>

          <div className="space-y-6 bg-white/40 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-white/50">
            <p className="text-xl md:text-2xl text-primary/80 mb-4 font-light">
              скоро открытие! ⏳
            </p>
            <p
              className="text-lg md:text-xl text-muted-foreground/70 mb-8"
              style={{ fontFamily: "Cormorant, serif", fontWeight: 300 }}
            >
              ждём тебя 1 декабря в 12:00
            </p>

            <div className="grid grid-cols-4 gap-4 md:gap-6 max-w-xl mx-auto">
              {[
                { value: timeLeft.days, label: "дней" },
                { value: timeLeft.hours, label: "часов" },
                { value: timeLeft.minutes, label: "минут" },
                { value: timeLeft.seconds, label: "секунд" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white/60 backdrop-blur rounded-2xl p-4 md:p-6 shadow-lg"
                >
                  <div className="text-3xl md:text-5xl font-light text-primary mb-2">
                    {String(item.value).padStart(2, "0")}
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground/60">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <p
              className="text-lg md:text-xl text-muted-foreground/70"
              style={{ fontFamily: "Cormorant, serif", fontWeight: 300 }}
            >
              а пока можешь{" "}
              <button
                onClick={() => setShowFortune(true)}
                className="text-primary hover:text-primary/80 underline underline-offset-4 transition-colors"
              >
                вытянуть своё предсказание
              </button>{" "}
              на зиму ✨
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
