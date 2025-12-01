import { useState, useEffect } from "react";
import Shop from "./Shop";
import { Button } from "@/components/ui/button";
import Footer from "./shop/Footer";
import FortuneModal from "./coming-soon/FortuneModal";
import PhotoCarousel from "./coming-soon/PhotoCarousel";
import CountdownTimer from "./coming-soon/CountdownTimer";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

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
  {
    text: "снежные вечера подарят тебе встречи с людьми, которые изменят твой взгляд на привычные вещи!",
    emoji: "✨",
  },
  {
    text: "этой зимой ты научишься ценить тишину и покой. найди в них свою силу!",
    emoji: "❄️",
  },
  {
    text: "холода принесут в твою жизнь что-то неожиданное и приятное. будь открыт новому!",
    emoji: "🔮",
  },
  {
    text: "зимний сезон станет временем для заботы о себе. позволь себе быть на первом месте!",
    emoji: "✨",
  },
  {
    text: "тебя ждут уютные моменты за любимым занятием. это время станет по-настоящему твоим!",
    emoji: "❄️",
  },
  {
    text: "ух ты, этой зимой ты создашь традицию, которая будет радовать тебя много лет!",
    emoji: "🔮",
  },
  {
    text: "снежные дни напомнят о важности тепла. храни его в сердце!",
    emoji: "✨",
  },
  {
    text: "впереди сезон вдохновения! впусти поток креативности в жизнь!",
    emoji: "❄️",
  },
  {
    text: "зима подарит тебе время для размышлений и важных решений. прислушайся к себе!",
    emoji: "🔮",
  },
  {
    text: "холодные вечера станут идеальным временем для того, чтобы воплотить мечты в реальность!",
    emoji: "✨",
  },
];

const photos = [
  "https://cdn.poehali.dev/files/57107aad-784f-4d91-8dce-e3cf50d5bc00.png",
  "https://cdn.poehali.dev/files/8867a9f7-cd4f-480d-aabc-0c4f42ff119f.png",
  "https://cdn.poehali.dev/files/c9145314-61ce-4511-936c-590425813708.jpg",
  "https://cdn.poehali.dev/files/655b86f9-f74c-4457-b2a5-b64dc57811cd.png",
  "https://cdn.poehali.dev/files/27ada226-9f13-443c-a0a6-8b4c706bbf14.png",
  "https://cdn.poehali.dev/files/aa0f058c-76ae-4702-b67b-a1fc0759619f.png",
  "https://cdn.poehali.dev/files/6624ec60-2dfb-4be5-a729-0a161a7cc7f5.png",
];

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

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!showFortune) {
      window.scrollTo(0, 0);
    }
  }, [showFortune]);

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

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-4xl w-full text-center space-y-12">
          <PhotoCarousel photos={photos} />

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
                  — невесомые и согревающие
                </p>
              </div>
              <div className="flex gap-2 md:gap-3 items-start">
                <span className="text-xl md:text-2xl flex-shrink-0">🍄</span>
                <p>
                  <strong className="text-primary font-medium">подвесы</strong>{" "}
                  — задорные грибочки и изящные ленты
                </p>
              </div>
              <div className="flex gap-2 md:gap-3 items-start">
                <span className="text-xl md:text-2xl flex-shrink-0">🏹</span>
                <p>
                  <strong className="text-primary font-medium">
                    волшебная упаковка
                  </strong>{" "}
                  — для тех, кто любит получать или дарить красиво
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 md:gap-4 pb-6 md:pb-0">
            <p className="text-sm md:text-base text-muted-foreground/80">
              следите за обновлениями:
            </p>
            <Button
              variant="outline"
              size="lg"
              className="border-2 bg-white/50"
              asChild
            >
              <a
                href="https://t.me/azalukk"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-lg md:text-xl mr-2">☕</span>
                telegram
              </a>
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
