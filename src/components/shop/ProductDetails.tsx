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
      <SheetContent side="bottom" className="h-[85vh] overflow-y-auto">
        {product && (
          <div className="container mx-auto max-w-4xl py-8">
            <SheetHeader>
              <SheetTitle className="text-3xl mystical-text mb-6">{product.name}</SheetTitle>
            </SheetHeader>
            
            <div className="grid md:grid-cols-2 gap-8 mt-6">
              <div className="relative overflow-hidden rounded-xl shadow-xl candle-glow">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>
              
              <div className="space-y-6">
                <Badge variant="secondary" className="rounded-full text-sm">
                  {product.category}
                </Badge>
                
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
                
                <div className="pt-6 border-t border-border">
                  <div className="text-4xl font-light mystical-text mb-6">
                    {product.price} ₽
                  </div>
                  
                  <Button
                    size="lg"
                    className="w-full rounded-full candle-glow text-base py-6"
                    onClick={() => {
                      addToCart(product);
                      onClose();
                    }}
                  >
                    <Icon name="Plus" size={20} className="mr-2" />
                    добавить в корзину
                  </Button>
                </div>
                
                <div className="vintage-card p-6 rounded-xl space-y-3">
                  <div className="flex items-start gap-3">
                    <Icon name="Package" size={20} className="text-accent mt-1" />
                    <div>
                      <h4 className="font-medium mb-1">доставка</h4>
                      <p className="text-sm text-muted-foreground">по россии и снг, 3–5 дней</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Icon name="Heart" size={20} className="text-accent mt-1" />
                    <div>
                      <h4 className="font-medium mb-1">ручная работа</h4>
                      <p className="text-sm text-muted-foreground">создано с душой и вниманием</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Icon name="Sparkles" size={20} className="text-accent mt-1" />
                    <div>
                      <h4 className="font-medium mb-1">упаковка</h4>
                      <p className="text-sm text-muted-foreground">завёрнуто в бумагу и магию</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
