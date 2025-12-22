import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Product } from './types';
import { useState, useEffect, useRef } from 'react';

interface ProductDetailsProps {
  product: Product | null;
  onClose: () => void;
  addToCart: (product: Product) => void;
  setIsCartOpen: (isOpen: boolean) => void;
  cart: any[];
}

export default function ProductDetails({ product, onClose, addToCart, setIsCartOpen, cart }: ProductDetailsProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [isManualSelection, setIsManualSelection] = useState(false);
  const [showAddedNotification, setShowAddedNotification] = useState(false);
  const [buttonState, setButtonState] = useState<'add' | 'added' | 'checkout'>('add');
  const [isCompositionOpen, setIsCompositionOpen] = useState(false);
  const [isSizingOpen, setIsSizingOpen] = useState(false);
  const [customAmount, setCustomAmount] = useState<string>('1000');
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);
  
  const isGiftCertificate = product?.id === 1000;
  
  // Reset carousel and variant when product changes (not when cart changes)
  useEffect(() => {
    setCurrentImageIndex(0);
    setShowAddedNotification(false);
    setIsCompositionOpen(false);
    setIsSizingOpen(false);
    setButtonState('add');
    setIsManualSelection(false);
    setCustomAmount('1000');
    
    // Auto-select first variant if product has variants
    if (product?.variants && product.variants.length > 0) {
      setSelectedVariant(product.variants[0].id);
    } else {
      setSelectedVariant(null);
    }
  }, [product?.id]);
  
  // Update button state when variant is selected (but not when cart changes)
  useEffect(() => {
    if (!product || !selectedVariant) return;
    
    const isVariantInCart = cart.some(item => 
      item.id === product.id && item.selectedVariantId === selectedVariant
    );
    setButtonState(isVariantInCart ? 'checkout' : 'add');
  }, [selectedVariant, product]);
  
  // Auto-scroll thumbnails when image changes
  useEffect(() => {
    if (thumbnailContainerRef.current) {
      const container = thumbnailContainerRef.current;
      const thumbnailWidth = 80 + 12; // 80px width + 12px gap
      const scrollPosition = currentImageIndex * thumbnailWidth - (container.clientWidth / 2) + (thumbnailWidth / 2);
      
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  }, [currentImageIndex]);
  
  if (!product) return null;
  
  const storyText = product.storyDescription || product.description;
  
  const currentVariant = product.variants?.find(v => v.id === selectedVariant);
  const displayPrice = isGiftCertificate ? parseFloat(customAmount) || 1000 : (currentVariant?.price || product.price);
  
  const handleButtonClick = () => {
    if (buttonState === 'checkout') {
      // Open cart and close product details
      setIsCartOpen(true);
      onClose();
    } else {
      // Add to cart
      let productToAdd;
      
      if (isGiftCertificate) {
        const amount = parseFloat(customAmount) || 1000;
        productToAdd = {
          ...product,
          price: amount,
          name: `${product.name} — ${amount.toLocaleString('ru-RU')} ₽`,
          customPrice: amount
        };
      } else if (currentVariant) {
        productToAdd = {
          ...product,
          price: currentVariant.price,
          name: `${product.name} (${currentVariant.name})`,
          selectedVariantId: currentVariant.id
        };
      } else {
        productToAdd = product;
      }
      
      // Show notification immediately before state updates
      setShowAddedNotification(true);
      setButtonState('checkout');
      addToCart(productToAdd);
      
      // Hide notification after 3 seconds
      setTimeout(() => {
        setShowAddedNotification(false);
      }, 3000);
    }
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
  
  const images = selectedVariant && currentVariant?.gallery && isManualSelection
    ? currentVariant.gallery 
    : getAllImages();
  
  return (
    <>
      {/* Added to Cart Notification */}
      {showAddedNotification && (
        <div className="fixed top-6 right-6 z-[100] animate-in slide-in-from-top-5 fade-in duration-300">
          <div className="bg-white rounded-2xl shadow-2xl border-2 border-moss/20 p-4 flex items-start gap-3 max-w-sm">
            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-secondary">
              <img 
                src={currentVariant?.gallery?.[0] || product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-2 mb-1">
                <Icon name="Sparkles" size={16} className="text-moss mt-0.5 flex-shrink-0" />
                <p className="text-sm font-normal text-moss">волшебство свершилось!</p>
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
      
      <Dialog open={!!product} onOpenChange={(open) => {
        if (!open) {
          setSelectedVariant(null);
          onClose();
        }
      }}>
        <DialogContent 
          className="max-w-7xl w-full h-full sm:w-[95vw] sm:h-[90vh] p-0 overflow-hidden"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <div className="flex flex-col lg:flex-row h-full overflow-y-auto bg-gradient-to-br from-card via-secondary/30 to-card pb-24 sm:pb-8">
            {/* Left side - Carousel */}
            <div className="lg:w-1/2 p-6 lg:p-12 pt-16 sm:pt-6 flex items-center justify-center">
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
                {!isGiftCertificate && (
                  <div ref={thumbnailContainerRef} className="flex gap-3 mt-4 justify-start overflow-x-auto pb-2">
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
                )}
              </div>
            </div>
            
            {/* Right side - Info */}
            <div className="lg:w-1/2 p-6 lg:p-12 pb-12 flex items-start">
              <div className="w-full max-w-md space-y-6 pb-8">
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
                            <p className="text-xs leading-relaxed">этот товар доступен в нескольких вариантах, но визуально они очень похожи! выберите тот, что подходит именно вам ✨</p>
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
                            setIsManualSelection(true);
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
                            <p className="text-sm font-normal text-primary whitespace-nowrap">{variant.price.toLocaleString('ru-RU')} ₽</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {isGiftCertificate && (
                  <div className="space-y-3 p-4 rounded-xl border-2 border-primary/20 bg-primary/5">
                    <label className="block">
                      <span className="text-sm font-normal text-primary mb-2 block">укажите сумму сертификата</span>
                      <div className="relative">
                        <input
                          type="number"
                          min="500"
                          max="1000000"
                          step="100"
                          value={customAmount}
                          onChange={(e) => setCustomAmount(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border-2 border-border/50 focus:border-primary focus:outline-none text-base font-light"
                          placeholder="1000"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">₽</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">от 500₽ до 1 000 000₽</p>
                    </label>
                  </div>
                )}
                
                {!isGiftCertificate && (
                  <div className="text-xl font-light text-primary whitespace-nowrap">
                    {displayPrice.toLocaleString('ru-RU')} ₽
                  </div>
                )}
                
                {product.badge !== 'soon' && (
                  <div className="space-y-3">
                    {/* Desktop Button */}
                    <div className="hidden sm:block">
                      <Button
                        size="lg"
                        className={`w-full max-w-xs px-8 rounded-full text-sm py-4 transition-all hover:scale-[1.02] shadow-lg hover:shadow-xl font-light ${
                          buttonState === 'checkout'
                            ? '!bg-darkRed hover:!bg-darkRed/90 !text-white'
                            : '!bg-primary hover:!bg-primary/90'
                        }`}
                        onClick={handleButtonClick}
                        disabled={buttonState !== 'checkout' && product.variants && product.variants.length > 0 && !selectedVariant}
                      >
                        {buttonState === 'checkout' ? (
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
                  <p className="text-sm text-moss/70 leading-relaxed font-light whitespace-pre-line">
                    {storyText}
                  </p>
                  
                  {product.videoUrl && (
                    <a
                      href={product.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-primary hover:text-moss transition-colors group"
                    >
                      <Icon name="Play" size={16} className="group-hover:scale-110 transition-transform" />
                      <span className="font-light border-b border-primary/20 group-hover:border-moss/50 transition-colors">
                        {product.videoTitle || 'смотреть видео'}
                      </span>
                    </a>
                  )}
                  
                  {(currentVariant?.composition || product.composition) && (
                    <div className="pt-4 border-t border-primary/10">
                      <button
                        onClick={() => setIsCompositionOpen(!isCompositionOpen)}
                        className="w-full flex items-center justify-between text-left group"
                      >
                        <h3 className="text-xs uppercase tracking-wider text-primary/60 font-normal">состав и рекомендации</h3>
                        <Icon 
                          name={isCompositionOpen ? "ChevronUp" : "ChevronDown"} 
                          size={16} 
                          className="text-primary/60 transition-transform group-hover:text-primary"
                        />
                      </button>
                      {isCompositionOpen && (
                        <div className="space-y-2 mt-3 animate-in slide-in-from-top-2 duration-200">
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
                  )}
                  
                  {(currentVariant?.sizing || product.sizing) && (
                    <div className="pt-4 border-t border-primary/10">
                      <button
                        onClick={() => setIsSizingOpen(!isSizingOpen)}
                        className="w-full flex items-center justify-between text-left group"
                      >
                        <h3 className="text-xs uppercase tracking-wider text-primary/60 font-normal">размеры и мерки</h3>
                        <Icon 
                          name={isSizingOpen ? "ChevronUp" : "ChevronDown"} 
                          size={16} 
                          className="text-primary/60 transition-transform group-hover:text-primary"
                        />
                      </button>
                      {isSizingOpen && (
                        <div className="mt-3 animate-in slide-in-from-top-2 duration-200">
                          <p className="text-sm text-moss/70 leading-relaxed whitespace-pre-line font-light">
                            {currentVariant?.sizing || product.sizing}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Mobile Button */}
          {product.badge !== 'soon' && (
            <div className="sm:hidden fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-card via-card to-transparent z-50">
              <Button
                size="lg"
                className={`w-full px-8 rounded-full text-sm py-4 transition-all shadow-2xl font-light ${
                  buttonState === 'checkout'
                    ? '!bg-primary hover:!bg-primary/90 !text-white'
                    : '!bg-primary hover:!bg-primary/90'
                }`}
                onClick={handleButtonClick}
                disabled={buttonState !== 'checkout' && product.variants && product.variants.length > 0 && !selectedVariant}
              >
                {buttonState === 'checkout' ? (
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
        </DialogContent>
      </Dialog>
    </>
  );
}