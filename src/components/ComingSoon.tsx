import { useState, useEffect } from "react";
import Shop from "./Shop";
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

  const photos = [
    "https://cdn.poehali.dev/files/eb1ef2b3-95d0-46fb-8e21-7b64ca75743b.png",
    "https://cdn.poehali.dev/files/eb1ef2b3-95d0-46fb-8e21-7b64ca75743b.png",
    "https://cdn.poehali.dev/files/eb1ef2b3-95d0-46fb-8e21-7b64ca75743b.png",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50 to-orange-50 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-start px-4 py-8 md:py-16">
        <div className="max-w-6xl w-full space-y-12">
          {/* Photo Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {photos.map((photo, index) => (
              <div
                key={index}
                className="aspect-square rounded-3xl overflow-hidden shadow-2xl border-8 border-white"
              >
                <img
                  src={photo}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
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
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
