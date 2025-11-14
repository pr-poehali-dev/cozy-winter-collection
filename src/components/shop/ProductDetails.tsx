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
  
  if (!product) return null;
  
  const images = product.gallery || [product.image];
  const storyText = product.storyDescription || product.description;
  
  return (
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
        
        <div className="grid lg:grid-cols-2 min-h-screen">
          {/* Left side - Image */}
          <div className="relative bg-secondary/40 flex items-center justify-center p-8 lg:p-12">
            <div className="w-full max-w-2xl space-y-6">
              <div className="relative overflow-hidden rounded-2xl shadow-lg bg-card">
                <img
                  src={images[currentImageIndex]}
                  alt={product.name}
                  className="w-full aspect-square object-cover"
                />
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all"
                    >
                      <Icon name="ChevronLeft" size={20} className="text-primary" />
                    </button>
                    <button
                      onClick={() => setCurrentImageIndex((prev) => (prev + 1) % images.length)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all"
                    >
                      <Icon name="ChevronRight" size={20} className="text-primary" />
                    </button>
                  </>
                )}
              </div>
              
              {images.length > 1 && (
                <div className="flex gap-3 flex-wrap">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentImageIndex 
                          ? 'border-primary' 
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Right side - Info */}
          <div className="p-8 lg:p-16 space-y-10 flex flex-col bg-gradient-to-b from-card to-secondary/30">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-primary leading-[1.2] tracking-tight">
                  {product.name}
                </h1>
                <div className="h-px w-16 bg-primary/20"></div>
              </div>
              
              <div className="inline-block">
                <div className="text-4xl md:text-5xl font-light text-primary tracking-tight">
                  {product.price.toLocaleString('ru-RU')} ₽
                </div>
              </div>
              
              <Button
                size="lg"
                className="w-full sm:w-auto px-16 rounded-full text-base py-7 bg-primary hover:bg-primary/90 transition-all hover:scale-[1.02] shadow-lg hover:shadow-xl"
                onClick={() => {
                  addToCart(product);
                  onClose();
                }}
              >
                добавить в корзину
              </Button>
            </div>
            
            <div className="space-y-8 flex-1 pt-4">
              <div className="space-y-4">
                <p className="text-lg md:text-xl text-moss/80 leading-[1.8] font-light">
                  {storyText}
                </p>
              </div>
              
              {product.composition && (
                <div className="space-y-4 pt-8 border-t border-primary/10">
                  <h3 className="text-2xl font-light text-primary tracking-wide">состав</h3>
                  <p className="text-base md:text-lg text-moss/70 leading-[1.8] whitespace-pre-line font-light">
                    {product.composition}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}