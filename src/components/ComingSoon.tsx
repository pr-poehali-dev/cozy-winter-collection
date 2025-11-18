import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";
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
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const photos = [
    "https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=800",
    "https://cdn.poehali.dev/files/72fc9dd4-dc66-4b68-b2c8-611b7e78bc22.png",
    "https://cdn.poehali.dev/files/32665c8e-e03d-4742-be74-90c8520257d4.png",
    "https://cdn.poehali.dev/files/46e65b1a-3989-44f7-b913-35a27f86a811.png",
  ];

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

  const handlePrevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const handleNextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50 to-orange-50 flex flex-col">
      {showFortune && (
        <FortuneModal
          fortunes={fortunes}
          onClose={() => setShowFortune(false)}
        />
      )}
      <div className="flex-1 flex flex-col items-center justify-start px-4 py-8 md:py-16">
        <div className="max-w-6xl w-full space-y-12">
          {/* Photo Carousel */}
          <div className="relative">
            <div className="aspect-[16/10] md:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
              <img
                src={photos[currentPhotoIndex]}
                alt={`Slide ${currentPhotoIndex + 1}`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={handlePrevPhoto}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 md:p-4 rounded-full shadow-lg transition-all group"
              aria-label="Предыдущее фото"
            >
              <Icon
                name="ChevronLeft"
                size={24}
                className="text-primary group-hover:text-primary/80"
              />
            </button>

            <button
              onClick={handleNextPhoto}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 md:p-4 rounded-full shadow-lg transition-all group"
              aria-label="Следующее фото"
            >
              <Icon
                name="ChevronRight"
                size={24}
                className="text-primary group-hover:text-primary/80"
              />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {photos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPhotoIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    index === currentPhotoIndex
                      ? "bg-white w-8"
                      : "bg-white/50 hover:bg-white/75"
                  }`}
                  aria-label={`Перейти к фото ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="text-center space-y-8">
            <p
              className="text-xl md:text-2xl text-primary/70"
              style={{ fontFamily: "Cormorant, serif", fontWeight: 400 }}
            >
              магазинчик рукотворных вещиц azaluk откроется через... 🔮
            </p>

            {/* Timer */}
            <div className="flex justify-center gap-4 md:gap-6 max-w-2xl mx-auto">
              {[
                { value: timeLeft.days, label: "дней" },
                { value: timeLeft.hours, label: "часов" },
                { value: timeLeft.minutes, label: "минут" },
                { value: timeLeft.seconds, label: "секунд" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg min-w-[100px] md:min-w-[140px]"
                >
                  <div className="text-4xl md:text-6xl font-light text-primary mb-2">
                    {String(item.value).padStart(2, "0")}
                  </div>
                  <div className="text-sm md:text-base text-muted-foreground/60">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            {/* What awaits */}
            <div className="space-y-6 max-w-2xl mx-auto pt-8">
              <h2
                className="text-2xl md:text-3xl text-primary"
                style={{ fontFamily: "Cormorant, serif", fontWeight: 500 }}
              >
                что вас ждёт?
              </h2>

              <div className="space-y-4 text-left">
                <div className="flex items-start gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl">
                  <span className="text-2xl">🧶</span>
                  <div>
                    <p className="text-lg text-primary font-normal">
                      вязаные чепчики
                    </p>
                    <p className="text-sm text-muted-foreground/70">
                      мягкие и тёплые для зимы
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl">
                  <span className="text-2xl">🧥</span>
                  <div>
                    <p className="text-lg text-primary font-normal">
                      мохеровые свитера
                    </p>
                    <p className="text-sm text-muted-foreground/70">
                      воздушные и согревающие
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl">
                  <span className="text-2xl">🍄</span>
                  <div>
                    <p className="text-lg text-primary font-normal">подвесы</p>
                    <p className="text-sm text-muted-foreground/70">
                      задорные грибочки и изящные ленты
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl">
                  <span className="text-2xl">🖊️</span>
                  <div>
                    <p className="text-lg text-primary font-normal">
                      уютная упаковка
                    </p>
                    <p className="text-sm text-muted-foreground/70">
                      с волшебством в каждом заказе для вас и ваших близких!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Fortune Link */}
            <div className="pt-4">
              <button
                onClick={() => setShowFortune(true)}
                className="text-lg text-primary/70 hover:text-primary underline underline-offset-4 transition-colors"
                style={{ fontFamily: "Cormorant, serif", fontWeight: 300 }}
              >
                вытянуть своё предсказание на зиму ✨
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
