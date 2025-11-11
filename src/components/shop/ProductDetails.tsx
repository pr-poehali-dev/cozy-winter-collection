import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
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
        side="bottom" 
        className="h-[90vh] overflow-y-auto bg-gradient-to-br from-orange-50/30 to-amber-50/30 backdrop-blur-sm"
      >
        <div className="container mx-auto max-w-5xl py-8">
          <SheetHeader>
            <SheetTitle className="text-3xl md:text-4xl font-light text-primary mb-6">{product.name}</SheetTitle>
          </SheetHeader>
          
          <div className="grid md:grid-cols-2 gap-8 mt-6">
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-2xl shadow-lg bg-white/80">
                <img
                  src={images[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-[400px] md:h-[500px] object-cover"
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
                <div className="flex gap-2 justify-center">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex 
                          ? 'bg-primary w-8' 
                          : 'bg-primary/30 hover:bg-primary/50'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
            
            <div className="space-y-6">
              <Badge variant="secondary" className="rounded-full text-sm font-light">
                {product.category}
              </Badge>
              
              <div className="vintage-card p-6 rounded-2xl space-y-4 relative overflow-hidden">
                <div className="absolute top-4 right-4 text-2xl opacity-20">✨</div>
                <div className="absolute bottom-4 left-4 text-xl opacity-15">💫</div>
                
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed relative z-10">
                  {storyText}
                </p>
              </div>
              
              <div className="pt-6 border-t border-border">
                <div className="text-3xl md:text-4xl font-light text-primary mb-6">
                  {product.price.toLocaleString('ru-RU')} ₽
                </div>
                
                <Button
                  size="lg"
                  className="w-full rounded-full text-base py-6 bg-primary hover:bg-primary/90 transition-colors"
                  onClick={() => {
                    addToCart(product);
                    onClose();
                  }}
                >
                  <Icon name="ShoppingBag" size={20} className="mr-2" />
                  добавить в корзину
                </Button>
              </div>
              
              <div className="vintage-card p-6 rounded-2xl space-y-4">
                <div className="flex items-start gap-3">
                  <div className="text-xl">🎁</div>
                  <div>
                    <h4 className="font-light text-primary mb-1">доставка</h4>
                    <p className="text-sm text-muted-foreground font-light">по россии и снг, 3–5 дней</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="text-xl">💗</div>
                  <div>
                    <h4 className="font-light text-primary mb-1">ручная работа</h4>
                    <p className="text-sm text-muted-foreground font-light">создано с душой и вниманием</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="text-xl">🌟</div>
                  <div>
                    <h4 className="font-light text-primary mb-1">упаковка</h4>
                    <p className="text-sm text-muted-foreground font-light">завёрнуто в бумагу и магию</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
