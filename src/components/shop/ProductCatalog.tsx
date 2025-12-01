import { Product } from './types';
import Icon from '@/components/ui/icon';

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
    <section id="catalog" className="py-16 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-1.5 md:px-8 md:py-2.5 rounded-full text-xs md:text-sm font-light transition-all ${
                selectedCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-white text-primary hover:bg-secondary border border-border'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group cursor-pointer" onClick={() => onProductClick(product)}>
              <div className="relative aspect-square overflow-hidden rounded-2xl mb-4 bg-card shadow-sm border border-border transition-transform group-hover:scale-[1.02]">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-sm md:text-base font-light text-primary leading-relaxed px-2 md:px-4 line-clamp-1">
                  {product.name}
                </h3>
                {product.badge === 'soon' && (
                  <p className="text-xs font-light" style={{ color: '#8B0000' }}>
                    soon
                  </p>
                )}
                {product.stock !== undefined && product.stock <= 5 && product.badge !== 'soon' && (
                  <p className="text-xs text-muted-foreground">
                    в наличии{product.badge === 'limited' && <span style={{ color: '#8B0000' }} className="ml-2">limited</span>}
                  </p>
                )}
                {product.badge !== 'soon' && (
                  <div className="flex items-center justify-center gap-3">
                    <p className="text-sm md:text-base font-light text-primary whitespace-nowrap">{product.price.toLocaleString('ru-RU')} ₽</p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="px-3 py-1.5 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center gap-1 transition-all hover:scale-105 text-primary font-light"
                      aria-label="Добавить в корзину"
                    >
                      <Icon name="ShoppingBag" size={14} strokeWidth={1.5} />
                      <span className="text-sm">+</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}