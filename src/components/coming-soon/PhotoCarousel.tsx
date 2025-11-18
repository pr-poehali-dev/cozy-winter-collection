import { useState } from "react";
import Icon from "@/components/ui/icon";

interface PhotoCarouselProps {
  photos: string[];
}

export default function PhotoCarousel({ photos }: PhotoCarouselProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const handlePrevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const handleNextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative max-w-5xl mx-auto">
      <div className="flex gap-3 md:gap-4 overflow-hidden">
        {photos.map((photo, index) => (
          <div
            key={index}
            className="flex-none w-[45%] md:w-[30%] aspect-square rounded-2xl md:rounded-3xl overflow-hidden shadow-lg border-2 md:border-4 border-white"
          >
            <img
              src={photo}
              alt={`Фото ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      <button
        onClick={handlePrevPhoto}
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white hover:bg-white/90 p-3 rounded-full shadow-xl transition-all group"
        aria-label="Предыдущее фото"
      >
        <Icon name="ChevronLeft" size={24} className="text-primary" />
      </button>

      <button
        onClick={handleNextPhoto}
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white hover:bg-white/90 p-3 rounded-full shadow-xl transition-all group"
        aria-label="Следующее фото"
      >
        <Icon name="ChevronRight" size={24} className="text-primary" />
      </button>

      <div className="flex justify-center gap-2 mt-6">
        {photos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPhotoIndex(index)}
            className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all ${
              index === currentPhotoIndex
                ? "bg-primary w-6 md:w-8"
                : "bg-primary/30 hover:bg-primary/50"
            }`}
            aria-label={`Перейти к фото ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
