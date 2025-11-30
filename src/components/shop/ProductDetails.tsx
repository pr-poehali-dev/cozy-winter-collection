import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Product } from './types';
import { useState, useEffect } from 'react';

interface ProductDetailsProps {
  product: Product | null;
  onClose: () => void;
  addToCart: (product: Product) => void;
}

export default function ProductDetails({ product, onClose, addToCart }: ProductDetailsProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [showAddedNotification, setShowAddedNotification] = useState(false);
  const [buttonState, setButtonState] = useState<'add' | 'added' | 'checkout'>('add');
  
  // Reset carousel to first image when product changes
  useEffect(() => {
    setCurrentImageIndex(0);
    setButtonState('add');
    setShowAddedNotification(false);
  }, [product?.id]);
  
  if (!product) return null;
  
  const storyText = product.storyDescription || product.description;
  
  const currentVariant = product.variants?.find(v => v.id === selectedVariant);
  const displayPrice = currentVariant?.price || product.price;
  
  const handleAddToCart = () => {
    const productToAdd = currentVariant ? {
      ...product,
      price: currentVariant.price,
      name: `${product.name} (${currentVariant.name})`,
      selectedVariantId: currentVariant.id
    } : product;
    
    addToCart(productToAdd);
    setShowAddedNotification(true);
    setButtonState('added');
    
    setTimeout(() => {
      setButtonState('checkout');
    }, 1500);
    
    setTimeout(() => {
      setShowAddedNotification(false);
    }, 3000);
    
    setTimeout(() => {
      setButtonState('add');
    }, 5000);
  };
  
  const getAllImages = () => {
    const allImages = new Set<string>();
    
    if (product.gallery) {
      product.gallery.forEach(img => allImages.add(img));
    }
    
    product.variants?.forEach(variant => {
      if (variant.gallery) {
        variant.gallery.forEach(img => allImages.add(img));
      }
    });
    
    if (allImages.size === 0) {
      allImages.add(product.image);
    }
    
    return Array.from(allImages);
  };
  
  const images = selectedVariant && currentVariant?.gallery 
    ? currentVariant.gallery 
    : getAllImages();
  
  return (
    <>
      {/* Added to Cart Notification */}
      {showAddedNotification && (
        <div className="fixed top-6 right-6 z-[100] animate-in slide-in-from-top-5 fade-in duration-300">
          <div className="bg-white rounded-2xl shadow-2xl border-2 border-green-200 p-4 flex items-start gap-3 max-w-sm">
            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-secondary">
              <img 
                src={currentVariant?.gallery?.[0] || product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-2 mb-1">
                <Icon name="Sparkles" size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm font-normal text-green-700">волшебство свершилось!</p>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed font-light">
                {currentVariant ? `${product.name} (${currentVariant.name})` : product.name}
              </p>
              <p className="text-xs text-primary font-normal mt-1">
                добавлено в корзину ✨
              </p>
            </div>
          </div>
        </div>
      )}
      
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
            <div className="lg:w-1/2 p-6 lg:p-12 pt-20 lg:pt-12 flex items-center justify-center lg:min-h-screen">
              <div className="w-full max-w-xl">
                <div className="relative overflow-hidden rounded-2xl shadow-lg bg-card">
                  <div className="relative w-full aspect-square">
                    <div 
                      className="flex transition-transform duration-500 ease-out h-full"
                      style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
                    >
                      {images.map((img, index) => (
                        <img
                          key={index}
                          src={img}
                          alt={`${product.name} ${index + 1}`}
                          className="w-full h-full object-cover flex-shrink-0"
                        />
                      ))}
                    </div>
                  </div>
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
                
                {/* Thumbnail Gallery */}
                <div className="flex gap-3 mt-4 justify-start overflow-x-auto pb-2">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentImageIndex 
                          ? 'border-primary' 
                          : 'border-border/30 opacity-60 hover:opacity-100 hover:border-border'
                      }`}
                      aria-label={`Фото ${index + 1}`}
                    >
                      <img 
                        src={img} 
                        alt={`${product.name} ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right side - Info */}
            <div className="lg:w-1/2 p-6 lg:p-12 flex items-center lg:items-start lg:pt-[calc(50vh-200px)]">
              <div className="w-full max-w-md space-y-6">
                <div className="space-y-3">
                  <h1 className="text-2xl font-light text-primary leading-tight">
                    {product.name}
                  </h1>
                  <div className="h-px w-16 bg-primary/20"></div>
                </div>
                
                {product.variants && product.variants.length > 0 && (
                  <div className="space-y-3 p-4 rounded-xl border-2 border-primary/20 bg-primary/5">
                    <div className="flex items-center gap-2">
                      <TooltipProvider>
                        <Tooltip delayDuration={200}>
                          <TooltipTrigger asChild>
                            <div className="flex items-center gap-2 cursor-help">
                              <Icon name="AlertCircle" size={16} className="text-primary" strokeWidth={2} />
                              <h3 className="text-sm font-normal text-primary">выберите вариант</h3>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent side="top" className="max-w-xs">
                            <p className="text-xs leading-relaxed">этот товар доступен в нескольких вариантах  — выберите тот, что подходит именно вам ✨</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="space-y-2">
                      {product.variants.map((variant) => (
                        <button
                          key={variant.id}
                          onClick={() => {
                            setSelectedVariant(variant.id);
                            setCurrentImageIndex(0);
                          }}
                          className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                            selectedVariant === variant.id
                              ? 'border-primary bg-white shadow-md'
                              : 'border-border/50 bg-white hover:border-primary/50 hover:shadow-sm'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div className="space-y-1">
                              <p className="text-sm font-normal text-primary">{variant.name}</p>
                              {variant.description && (
                                <p className="text-xs text-muted-foreground font-light">{variant.description}</p>
                              )}
                            </div>
                            <p className="text-sm font-normal text-primary">{variant.price.toLocaleString('ru-RU')} ₽</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="text-xl font-light text-primary">
                  {displayPrice.toLocaleString('ru-RU')} ₽
                </div>
                
                {product.badge !== 'soon' && (
                  <div className="space-y-3">
                    {/* Desktop Button */}
                    <div className="hidden sm:block">
                      <Button
                        size="lg"
                        className={`w-full max-w-xs px-8 rounded-full text-sm py-4 transition-all hover:scale-[1.02] shadow-lg hover:shadow-xl font-light ${
                          buttonState === 'added' 
                            ? 'bg-green-600 hover:bg-green-700' 
                            : buttonState === 'checkout'
                            ? 'bg-rose-600 hover:bg-rose-700'
                            : 'bg-primary hover:bg-primary/90'
                        }`}
                        onClick={handleAddToCart}
                        disabled={product.variants && product.variants.length > 0 && !selectedVariant}
                      >
                        {buttonState === 'added' ? (
                          <>
                            <Icon name="Sparkles" size={18} className="mr-2" />
                            в корзине! ✨
                          </>
                        ) : buttonState === 'checkout' ? (
                          <>
                            <Icon name="ShoppingCart" size={18} className="mr-2" />
                            перейти к оформлению
                          </>
                        ) : (
                          <>
                            <Icon name="ShoppingBag" size={18} className="mr-2" />
                            добавить в корзину
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}
                
                <div className="space-y-6 pt-2">
                  <p className="text-sm text-moss/70 leading-relaxed font-light">
                    {storyText}
                  </p>
                  
                  {(currentVariant?.composition || product.composition) && (
                    <div className="space-y-2 pt-4 border-t border-primary/10">
                      <h3 className="text-xs uppercase tracking-wider text-primary/60 font-normal">состав и характеристики</h3>
                      <p className="text-sm text-moss/70 leading-relaxed whitespace-pre-line font-light">
                        {currentVariant?.composition || product.composition}
                      </p>
                      {currentVariant?.weight && (
                        <p className="text-sm text-moss/70 leading-relaxed font-light pt-1">
                          вес: {currentVariant.weight}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Floating Mobile Button */}
          {product.badge !== 'soon' && (
            <div className="sm:hidden fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-card via-card to-transparent z-40">
              <Button
                size="lg"
                className={`w-full px-8 rounded-full text-sm py-4 transition-all shadow-2xl font-light ${
                  buttonState === 'added' 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : buttonState === 'checkout'
                    ? 'bg-rose-600 hover:bg-rose-700'
                    : 'bg-primary hover:bg-primary/90'
                }`}
                onClick={handleAddToCart}
                disabled={product.variants && product.variants.length > 0 && !selectedVariant}
              >
                {buttonState === 'added' ? (
                  <>
                    <Icon name="Sparkles" size={20} className="mr-2" />
                    в корзине! ✨
                  </>
                ) : buttonState === 'checkout' ? (
                  <>
                    <Icon name="ShoppingCart" size={20} className="mr-2" />
                    оформить заказ
                  </>
                ) : (
                  <>
                    <Icon name="ShoppingBag" size={20} className="mr-2" />
                    добавить в корзину
                  </>
                )}
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}