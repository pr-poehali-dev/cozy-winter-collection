import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Product } from './types';
import { useState } from 'react';

interface ProductDetailsProps {
  product: Product | null;
  onClose: () => void;
  addToCart: (product: Product) => void;
}

export default function ProductDetails({ product, onClose, addToCart }: ProductDetailsProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  if (!product) return null;
  
  const images = product.gallery || [product.image];
  const storyText = product.storyDescription || product.description;
  
  return (
    <>
      <Sheet open={!!product} onOpenChange={(open) => !open && onClose()}>
        <SheetContent 
          side="right" 
          className="w-screen h-screen max-w-none overflow-y-auto p-0 sm:max-w-none border-0"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <button
            onClick={onClose}
            className="fixed top-6 left-6 z-50 p-2 hover:bg-secondary rounded-lg transition-colors"
            aria-label="Закрыть"
          >
            <Icon name="ArrowLeft" size={24} className="text-primary" strokeWidth={1.5} />
          </button>

          <button
            onClick={onClose}
            className="fixed top-6 right-6 z-50 p-2 hover:bg-secondary rounded-lg transition-colors"
            aria-label="Закрыть"
          >
            <Icon name="X" size={24} className="text-primary" strokeWidth={1.5} />
          </button>
          
          <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-card via-secondary/30 to-card">
            {/* Left side - Carousel */}
            <div className="lg:w-1/2 p-6 lg:p-12 flex items-center justify-center lg:min-h-screen">
              <div className="w-full max-w-xl">
                <div 
                  className="relative overflow-hidden rounded-2xl shadow-lg bg-card cursor-pointer"
                  onClick={() => setIsFullscreen(true)}
                >
                  <img
                    src={images[currentImageIndex]}
                    alt={product.name}
                    className="w-full aspect-square object-cover"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-card/90 hover:bg-card rounded-full p-2 shadow-lg transition-all"
                  >
                    <Icon name="ChevronLeft" size={20} className="text-primary" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex((prev) => (prev + 1) % images.length);
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-card/90 hover:bg-card rounded-full p-2 shadow-lg transition-all"
                  >
                    <Icon name="ChevronRight" size={20} className="text-primary" />
                  </button>
                </div>
                
                <div className="flex gap-2 mt-4 justify-center">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex 
                          ? 'bg-primary w-6' 
                          : 'bg-primary/30'
                      }`}
                      aria-label={`Фото ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right side - Info */}
            <div className="lg:w-1/2 p-6 lg:p-12 flex items-center lg:items-start lg:pt-[calc(50vh-200px)]">
              <div className="w-full max-w-md space-y-5">
                <div className="space-y-2">
                  <h1 className="text-2xl md:text-3xl font-light text-primary leading-[1.2] tracking-tight">
                    {product.name}
                  </h1>
                  <div className="h-px w-12 bg-primary/20"></div>
                </div>
                
                <div className="text-2xl md:text-3xl font-light text-primary tracking-tight">
                  {product.price.toLocaleString('ru-RU')} ₽
                </div>
                
                <Button
                  size="lg"
                  className="w-full max-w-xs px-8 rounded-full text-sm py-4 bg-primary hover:bg-primary/90 transition-all hover:scale-[1.02] shadow-lg hover:shadow-xl"
                  onClick={() => {
                    addToCart(product);
                    onClose();
                  }}
                >
                  добавить в корзину
                </Button>
                
                <div className="space-y-5 pt-4">
                  <p className="text-base md:text-lg text-moss/80 leading-[1.7] font-light">
                    {storyText}
                  </p>
                  
                  {product.composition && (
                    <div className="space-y-3 pt-5 border-t border-primary/10">
                      <h3 className="text-lg font-light text-primary tracking-wide">состав</h3>
                      <p className="text-sm md:text-base text-moss/70 leading-[1.7] whitespace-pre-line font-light">
                        {product.composition}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Fullscreen Gallery */}
      {isFullscreen && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={() => setIsFullscreen(false)}
        >
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Закрыть"
          >
            <Icon name="X" size={32} className="text-white" strokeWidth={1.5} />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
            }}
            className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all"
          >
            <Icon name="ChevronLeft" size={32} className="text-white" />
          </button>
          
          <img
            src={images[currentImageIndex]}
            alt={product.name}
            className="max-h-[90vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentImageIndex((prev) => (prev + 1) % images.length);
            }}
            className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all"
          >
            <Icon name="ChevronRight" size={32} className="text-white" />
          </button>
          
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImageIndex 
                    ? 'bg-white w-8' 
                    : 'bg-white/40'
                }`}
                aria-label={`Фото ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}