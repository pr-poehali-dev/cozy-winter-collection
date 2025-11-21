import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

interface PhotoCarouselProps {
  photos: string[];
}

export default function PhotoCarousel({ photos }: PhotoCarouselProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentPhotoIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentPhotoIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const photoWidth = container.scrollWidth / photos.length;
      container.scrollTo({
        left: photoWidth * index,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollToIndex(currentPhotoIndex);
  }, [currentPhotoIndex]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scroll = () => {
      if (!isHovered && container) {
        container.scrollLeft += 0.5;
        
        const maxScroll = container.scrollWidth - container.clientWidth;
        if (container.scrollLeft >= maxScroll) {
          container.scrollLeft = 0;
        }
      }
      animationRef.current = requestAnimationFrame(scroll);
    };

    animationRef.current = requestAnimationFrame(scroll);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isHovered]);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const photoWidth = container.scrollWidth / photos.length;
      const newIndex = Math.round(container.scrollLeft / photoWidth);
      if (newIndex !== currentPhotoIndex) {
        setCurrentPhotoIndex(newIndex);
      }
    }
  };

  return (
    <div 
      className="relative max-w-5xl mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex gap-3 md:gap-4 overflow-x-auto overflow-y-hidden scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {[...photos, ...photos].map((photo, index) => (
          <div
            key={index}
            className="flex-none w-[45%] md:w-[30%] aspect-square rounded-2xl md:rounded-3xl overflow-hidden shadow-lg border-2 md:border-4 border-white"
          >
            <img
              src={photo}
              alt={`Фото ${(index % photos.length) + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}