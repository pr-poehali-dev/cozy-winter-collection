import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Product } from './types';

interface ProductCatalogProps {
  products: Product[];
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  onProductClick: (product: Product) => void;
  addToCart: (product: Product) => void;
}

export default function ProductCatalog({
  products,
  categories,
  selectedCategory,
  setSelectedCategory,
  onProductClick,
  addToCart
}: ProductCatalogProps) {
  const filteredProducts = selectedCategory === 'все' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <section id="catalog" className="py-24 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-5xl mb-16 text-center mystical-text">коллекция</h2>
        
        <div className="flex flex-wrap gap-3 justify-center mb-16 animate-fade-in">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              className="rounded-full text-sm px-6 py-5"
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {filteredProducts.map((product, index) => (
            <Card 
              key={product.id} 
              className="group overflow-hidden vintage-card transition-all duration-300 animate-scale-in cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => onProductClick(product)}
            >
              <div className="overflow-hidden relative aspect-square">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <CardContent className="p-6">
                <Badge variant="secondary" className="mb-3 text-xs">
                  {product.category}
                </Badge>
                <h3 className="text-2xl mb-3 mystical-text">{product.name}</h3>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-xl mystical-text">{product.price} ₽</span>
                  <Button 
                    size="sm" 
                    className="rounded-full text-xs px-5"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                  >
                    <Icon name="ShoppingBag" size={14} className="mr-2" />
                    купить
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}