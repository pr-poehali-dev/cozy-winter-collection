import { useState } from "react";
import Icon from "@/components/ui/icon";
import FortuneCookie from "./FortuneCookie";
import FortuneCard from "./FortuneCard";

interface Fortune {
  text: string;
  emoji: string;
}

interface FortuneModalProps {
  fortunes: Fortune[];
  onClose: () => void;
}

export default function FortuneModal({ fortunes, onClose }: FortuneModalProps) {
  const [fortuneOpened, setFortuneOpened] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [currentFortune, setCurrentFortune] = useState<Fortune | null>(null);

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
    <div className="fixed inset-0 bg-gradient-to-br from-white via-orange-50 to-amber-50 z-50 flex flex-col items-center justify-between px-4 py-8 overflow-hidden">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 md:top-8 md:right-8 p-2 rounded-full hover:bg-white/50 transition-colors group"
        aria-label="Закрыть"
      >
        <Icon
          name="X"
          size={24}
          className="text-muted-foreground group-hover:text-primary transition-colors"
        />
      </button>
      <div className="max-w-md w-full flex flex-col items-center space-y-8 flex-1 justify-center">
        {!fortuneOpened ? (
          <FortuneCookie
            isShaking={isShaking}
            onClick={handleFortuneCookieClick}
          />
        ) : (
          <div className="space-y-6 animate-fade-in w-full">
            <div className="flex items-center justify-center gap-3 text-5xl">
              <span className="animate-bounce" style={{ animationDelay: "0s" }}>
                🥠
              </span>
              <span
                className="animate-bounce"
                style={{ animationDelay: "0.1s" }}
              >
                ✨
              </span>
            </div>
            {currentFortune && <FortuneCard fortune={currentFortune} />}
            <button
              onClick={onClose}
              className="w-full py-3 px-6 bg-primary hover:bg-primary/90 text-white rounded-xl transition-colors text-sm font-light shadow-md hover:shadow-lg"
            >
              перейти к магазину →
            </button>
          </div>
        )}
      </div>
      <p
        className="text-xl md:text-2xl text-muted-foreground/40 tracking-wide"
        style={{ fontFamily: "Cormorant, serif", fontWeight: 300 }}
      >
        azaluk.shop
      </p>
    </div>
  );
}