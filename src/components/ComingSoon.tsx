import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import Shop from "./Shop";
import { Button } from "@/components/ui/button";
import Footer from "./shop/Footer";

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
    <div className="min-h-screen bg-gradient-to-br from-white via-orange-50 to-amber-50 flex flex-col">
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
                  <p className="text-lg md:text-xl text-primary">
                    добро пожаловать! 🔮
                  </p>
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

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-4xl w-full text-center space-y-12">
          {/* Compact photo preview on mobile, full gallery on desktop */}
          <div className="relative overflow-hidden">
            <div className="grid grid-cols-3 gap-2 md:gap-3">
              <div className="overflow-hidden rounded-lg shadow-md">
                <img
                  src="https://cdn.poehali.dev/files/57107aad-784f-4d91-8dce-e3cf50d5bc00.png"
                  alt="Вязаный грибочек на ветке"
                  className="w-full h-32 md:h-64 object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="overflow-hidden rounded-lg shadow-md">
                <img
                  src="https://cdn.poehali.dev/files/8dd80cb3-4746-404a-90ed-e8576192fe76.jpg"
                  alt="Вязаные изделия красные и белые"
                  className="w-full h-32 md:h-64 object-cover hover:scale-110 transition-transform duration-700 brightness-125"
                />
              </div>
              <div className="overflow-hidden rounded-lg shadow-md">
                <img
                  src="https://cdn.poehali.dev/files/8afa7fbb-da62-40f9-b59e-9b2f634a89f6.jpg"
                  alt="Вышивка знаков зодиака"
                  className="w-full h-32 md:h-64 object-cover hover:scale-110 transition-transform duration-700 brightness-110"
                />
              </div>
            </div>
          </div>

          {/* Hero section with compact layout on mobile */}
          <div className="space-y-6">
            <p className="text-lg md:text-xl text-[#71685d] my-0 mx-[1px] py-0 px-0">
              магазинчик рукотворных вещиц azaluk откроется через... 🔮
            </p>

            <div className="grid grid-cols-4 gap-3 md:gap-6 max-w-lg mx-auto">
              <div className="space-y-2">
                <div className="bg-white rounded-2xl shadow-sm border border-border p-4 md:p-6 animate-pulse-subtle">
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

          {/* What awaits you block - compact mobile version */}
          <div className="flex flex-col items-center space-y-4 md:space-y-6">
            <h2 className="text-xl md:text-3xl font-light text-primary">
              что вас ждёт?
            </h2>
            <div className="space-y-2 md:space-y-4 text-left text-muted-foreground leading-relaxed max-w-xl text-sm md:text-base">
              <div className="flex gap-2 md:gap-3 items-start">
                <span className="text-xl md:text-2xl flex-shrink-0">🧦</span>
                <p>
                  <strong className="text-primary font-medium">
                    вязаные чепчики
                  </strong>{" "}
                  — мягкие и тёплые для зимы
                </p>
              </div>
              <div className="flex gap-2 md:gap-3 items-start">
                <span className="text-xl md:text-2xl flex-shrink-0">🧶</span>
                <p>
                  <strong className="text-primary font-medium">
                    мохеровые свитера
                  </strong>{" "}
                  — воздушные и согревающие
                </p>
              </div>
              <div className="flex gap-2 md:gap-3 items-start">
                <span className="text-xl md:text-2xl flex-shrink-0">📿</span>
                <p>
                  <strong className="text-primary font-medium">подвесы</strong>{" "}
                  — задорные грибочки и изящные ленты
                </p>
              </div>
              <div className="flex gap-2 md:gap-3 items-start">
                <span className="text-xl md:text-2xl flex-shrink-0">🪄</span>
                <p>
                  <strong className="text-primary font-medium">уютная упаковка</strong>{" "}
                  — с волшебством в каждом заказе для вас и ваших близких!
                </p>
              </div>
            </div>
          </div>

          {/* Telegram subscribe - simplified mobile CTA */}
          <div className="bg-gradient-to-br from-white/80 to-orange-50/40 backdrop-blur-sm rounded-2xl p-5 md:p-8 shadow-lg border border-border max-w-xl mx-auto space-y-3 md:space-y-4">
            <h3 className="text-lg md:text-2xl font-light text-primary">
              следите за новостями 💌
            </h3>
            <a
              href="https://t.me/azalukk"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button className="w-full px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl transition-colors text-sm md:text-base shadow-md hover:shadow-lg transition-all">
                подписаться на телеграм ✨
              </Button>
            </a>
            <p className="text-xs text-muted-foreground/60">
              анонсы, закулисье создания и немного волшебства
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}