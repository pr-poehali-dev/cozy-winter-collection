import { Product, CartItem } from './types';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

interface ProductCatalogProps {
  products: Product[];
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  onProductClick: (product: Product) => void;
  addToCart: (product: Product) => void;
  cart: CartItem[];
}

export default function ProductCatalog({
  products,
  categories,
  selectedCategory,
  setSelectedCategory,
  onProductClick,
  addToCart,
  cart
}: ProductCatalogProps) {
  const navigate = useNavigate();
  
  const filteredProducts = selectedCategory === 'все' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const isInCart = (productId: number) => {
    return cart.some(item => item.id === productId && !item.selectedVariantId);
  };

  const handleProductClick = (product: Product) => {
    navigate(`/product/${product.id}`);
    onProductClick(product);
  };

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    
    if (product.variants && product.variants.length > 0) {
      onProductClick(product);
      return;
    }
    
    addToCart(product);
  };

  return (
    <section id="catalog" className="md:px-8 mx-0.5 px-[3px] py-0">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-2 justify-center my-[23px]">
          {categories.filter(c => c !== 'для дома').map(category => (
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

        {products.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 border-4 border-transparent border-t-primary/40 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {filteredProducts.map((product) => (
            <div key={product.id} className="group cursor-pointer" onClick={() => handleProductClick(product)}>
              <div className="relative aspect-square overflow-hidden rounded-2xl mb-4 bg-card shadow-sm border border-border transition-transform group-hover:scale-[1.02]">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center space-y-1">
                <h3 className={`text-xs md:text-base font-light text-primary leading-relaxed px-1 md:px-4 line-clamp-2 min-h-[2.5rem] md:min-h-0 whitespace-pre-line ${product.id === 1000 ? '' : 'md:line-clamp-1'}`}>
                  {product.name}
                </h3>
                {product.badge === 'soon' && (
                  <p className="text-xs font-light" style={{ color: '#8B0000' }}>
                    soon
                  </p>
                )}
                {product.stock !== undefined && product.stock <= 5 && product.badge !== 'soon' && product.badge === 'limited' && (
                  <p className="text-xs text-muted-foreground">
                    осталось {product.stock} шт<span style={{ color: '#8B0000' }} className="ml-2">limited</span>
                  </p>
                )}
                {product.badge !== 'soon' && product.id !== 1000 && (
                  <div className="flex items-center justify-center">
                    <p className="text-xs md:text-base font-light text-primary">{product.price.toLocaleString('ru-RU')} ₽</p>
                  </div>
                )}
              </div>
            </div>
          ))}
          </div>
        )}
      </div>
    </section>
  );
}