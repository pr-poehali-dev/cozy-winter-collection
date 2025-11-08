import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'гномские 🌸 ,, просто начни',
    category: 'стикеры',
    price: 250,
    oldPrice: 270,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80'
  },
  {
    id: 2,
    name: 'стикер на карту 🍵 ;; ˚слушай своё сердце',
    category: 'стикеры',
    price: 200,
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80'
  },
  {
    id: 3,
    name: 'стикер на карту ::🍀🐸 ты моя умница!',
    category: 'стикеры',
    price: 200,
    image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=800&q=80'
  },
  {
    id: 4,
    name: 'с т и к е р ы 💖 { 🌿 } micro aura',
    category: 'наборы',
    price: 60,
    image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=800&q=80'
  },
  {
    id: 5,
    name: 'с т и к е р ы 🖤::💗 smile',
    category: 'наборы',
    price: 120,
    image: 'https://images.unsplash.com/photo-1482575832494-771f74bf6857?w=800&q=80'
  },
  {
    id: 6,
    name: 'с т и к е р ы 🐸 ::💕 жаби',
    category: 'наборы',
    price: 150,
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80'
  }
];

const categories = ['все', 'стикеры', 'наборы'];

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState('все');

  const filteredProducts = selectedCategory === 'все' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#f5f3f0]">
      <header className="bg-[#e8e4df] py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-light text-[#4a4440] tracking-wide">azaluk</h1>
          <button className="p-2">
            <Icon name="ShoppingBag" size={20} className="text-[#4a4440]" strokeWidth={1.5} />
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-8 py-2.5 rounded-full text-sm font-light transition-all ${
                selectedCategory === cat
                  ? 'bg-[#4a4440] text-white'
                  : 'bg-white text-[#4a4440] hover:bg-[#e8e4df]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id}>
              <div className="aspect-[3/4] overflow-hidden rounded-2xl mb-4">
                <img 
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center space-y-1">
                <h3 className="text-base font-light text-[#4a4440] leading-relaxed">
                  {product.name}
                </h3>
                <div className="flex items-center justify-center gap-2">
                  <p className="text-base font-light text-[#4a4440]">
                    {product.price} р.
                  </p>
                  {product.oldPrice && (
                    <p className="text-sm font-light text-[#a0a0a0] line-through">
                      {product.oldPrice} р.
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
