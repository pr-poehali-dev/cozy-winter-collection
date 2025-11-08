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
  addToCart
}: ProductCatalogProps) {
  const filteredProducts = selectedCategory === 'все' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <section id="catalog" className="py-16 px-6 md:px-8 bg-gradient-to-br from-white via-orange-50/30 to-amber-50/40">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-8 py-2.5 rounded-full text-sm font-light transition-all ${
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
            <div key={product.id} className="group">
              <div className="aspect-square overflow-hidden rounded-2xl mb-4 bg-white shadow-sm border border-border">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-base font-light text-primary leading-relaxed px-4">
                  {product.name}
                </h3>
                {product.badge && (
                  <p className="text-xs text-muted-foreground italic">{product.badge}</p>
                )}
                <div className="flex items-center justify-center gap-3">
                  <p className="text-base font-light text-primary">
                    {product.price.toLocaleString('ru-RU')} р.
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    className="text-xl hover:scale-110 transition-transform"
                    aria-label="Добавить в корзину"
                  >
                    🛒
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
