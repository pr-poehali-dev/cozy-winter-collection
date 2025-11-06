import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Product } from './types';

interface ProductDetailsProps {
  product: Product | null;
  onClose: () => void;
  addToCart: (product: Product) => void;
}

export default function ProductDetails({ product, onClose, addToCart }: ProductDetailsProps) {
  return (
    <Sheet open={!!product} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto">
        {product && (
          <div className="py-6 space-y-6">
            <div className="relative overflow-hidden rounded-lg aspect-square">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="space-y-4">
              <Badge variant="secondary" className="text-xs">
                {product.category}
              </Badge>
              
              <SheetHeader>
                <SheetTitle className="text-4xl mystical-text">{product.name}</SheetTitle>
              </SheetHeader>
              
              <p className="text-muted-foreground leading-relaxed text-base">
                {product.description}
              </p>
            </div>
            
            <div className="vintage-card p-6 rounded-lg space-y-4">
              <div className="flex items-start gap-3">
                <Icon name="Package" size={18} className="text-accent mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-sm mb-1">доставка</h4>
                  <p className="text-xs text-muted-foreground">по россии и снг, 3–5 дней</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Icon name="Heart" size={18} className="text-accent mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-sm mb-1">ручная работа</h4>
                  <p className="text-xs text-muted-foreground">создано с душой и вниманием</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Icon name="Sparkles" size={18} className="text-accent mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-sm mb-1">упаковка</h4>
                  <p className="text-xs text-muted-foreground">завёрнуто в бумагу и магию</p>
                </div>
              </div>
            </div>
            
            <div className="sticky bottom-0 pt-6 pb-2 bg-white border-t border-border space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">цена</span>
                <span className="text-3xl mystical-text">{product.price} ₽</span>
              </div>
              
              <Button
                size="lg"
                className="w-full rounded-full text-base py-6 shadow-lg"
                onClick={() => {
                  addToCart(product);
                  onClose();
                }}
              >
                <Icon name="ShoppingBag" size={18} className="mr-2" />
                добавить в корзину
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}