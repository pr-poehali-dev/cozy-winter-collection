import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'вязаный чепчик',
    category: 'для зимней прогулки',
    price: 2500,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80',
    description: 'мягкий вязаный чепчик из шерсти мериноса. обнимает голову как облако. идеален для морозных прогулок и создаёт тот самый уютный образ.'
  },
  {
    id: 2,
    name: 'шёлковая косынка',
    category: 'для зимней прогулки',
    price: 3200,
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80',
    description: 'нежная шёлковая косынка с ручной подшивкой краёв. создаёт образ из старых фотографий. каждая нить хранит тепло рук мастера.'
  },
  {
    id: 3,
    name: 'подвес для помады',
    category: 'для зимней прогулки',
    price: 800,
    image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=800&q=80',
    description: 'крошечный подвес из хлопка с латунной фурнитурой. помада всегда под рукой, а руки свободны для чашки глинтвейна.'
  },
  {
    id: 4,
    name: 'бумажная гирлянда',
    category: 'для дома',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=800&q=80',
    description: 'воздушная гирлянда из бумаги с винтажными узорами. превращает любую комнату в место из рождественских историй.'
  },
  {
    id: 5,
    name: 'световая гирлянда',
    category: 'для дома',
    price: 2200,
    image: 'https://images.unsplash.com/photo-1482575832494-771f74bf6857?w=800&q=80',
    description: 'тёплый свет маленьких лампочек создаёт атмосферу зимнего вечера. работает от сети и согревает не только светом.'
  },
  {
    id: 6,
    name: 'зимний набор',
    category: 'наборы и боксы',
    price: 5500,
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80',
    description: 'чепчик + косынка + подвес в красивой коробке. готовый подарок для того, кто дорог. каждый элемент упакован с любовью.'
  }
];

const categories = ['все', 'для дома', 'для зимней прогулки', 'наборы и боксы'];

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState('все');

  const filteredProducts = selectedCategory === 'все' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-border z-40">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-5 md:py-6 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-serif text-primary tracking-wide">azaluk</h1>
          <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
            <Icon name="ShoppingBag" size={22} className="text-primary" strokeWidth={1.5} />
          </button>
        </div>
      </header>

      <main>
        <section className="relative h-[85vh] md:h-[90vh] flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1512389098783-66b81f86e199?w=1600&q=80')`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
          </div>
          <div className="relative z-10 text-center px-6">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif mb-4 md:mb-6 text-white leading-tight tracking-wide">
              вещи из моего<br />мира
            </h2>
            <p className="text-lg md:text-xl mb-8 md:mb-10 text-white/95 font-light tracking-wide">
              маленькая коллекция для тёплой зимы
            </p>
            <button 
              onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 md:px-14 py-3.5 md:py-4 bg-primary/90 hover:bg-primary text-white rounded-full text-sm md:text-base tracking-wide transition-all font-light"
            >
              смотреть коллекцию
            </button>
          </div>
        </section>

        <section id="collection" className="py-16 md:py-24 px-6 md:px-8">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-4xl md:text-5xl font-serif text-center mb-12 md:mb-16 text-primary tracking-wide">
              коллекция
            </h3>
            
            <div className="flex flex-wrap gap-3 md:gap-4 justify-center mb-14 md:mb-16">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-7 md:px-9 py-2.5 md:py-3 rounded-full text-sm md:text-base tracking-wide transition-all font-light ${
                    selectedCategory === cat
                      ? 'bg-primary text-white'
                      : 'bg-white border border-border text-primary hover:bg-secondary'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {filteredProducts.map((product) => (
                <div 
                  key={product.id} 
                  className="bg-white rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="aspect-[4/5] overflow-hidden bg-secondary">
                    <img 
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6 md:p-7 space-y-3">
                    <p className="text-xs md:text-sm text-muted-foreground tracking-wider uppercase font-light">
                      {product.category}
                    </p>
                    <h4 className="text-2xl md:text-3xl font-serif text-primary tracking-wide">
                      {product.name}
                    </h4>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-light line-clamp-3">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between pt-5">
                      <span className="text-2xl md:text-3xl font-light text-primary tracking-wide">
                        {product.price} ₽
                      </span>
                      <button className="flex items-center gap-2.5 px-6 py-2.5 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors">
                        <Icon name="ShoppingBag" size={16} strokeWidth={1.5} />
                        <span className="text-sm font-light tracking-wide">купить</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 px-6 md:px-8 bg-secondary/30">
          <div className="max-w-3xl mx-auto text-center space-y-8 md:space-y-10">
            <h3 className="text-4xl md:text-5xl font-serif text-primary tracking-wide">
              о мире azaluk
            </h3>
            <div className="space-y-6 md:space-y-7 text-base md:text-lg text-muted-foreground leading-relaxed font-light">
              <p>
                каждая вещь создаётся в маленькой мастерской, где время течёт медленнее. здесь нет спешки — только внимание к деталям и любовь к материалам.
              </p>
              <p>
                я верю, что вещи могут хранить тепло рук, которые их создали. что они способны обнимать в холодные дни и напоминать о доме, где бы ты ни был.
              </p>
              <p>
                это не просто магазин — это место, где рождаются маленькие истории. и теперь одна из них может стать твоей.
              </p>
              <p className="italic text-base md:text-lg pt-6 text-muted-foreground/80">
                с теплом, azaluk
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 px-6 md:px-8">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-4xl md:text-5xl font-serif text-center mb-14 md:mb-16 text-primary tracking-wide">
              отзывы
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
              {[
                { 
                  stars: 5, 
                  text: 'чепчик невероятно мягкий! ношу каждый день, и он согревает не только физически, но и создаёт ощущение уюта.', 
                  author: 'анна' 
                },
                { 
                  stars: 5, 
                  text: 'косынка стала моей любимой вещью этой зимы. качество шёлка потрясающее, ощущение настоящей роскоши и заботы.', 
                  author: 'мария' 
                },
                { 
                  stars: 5, 
                  text: 'заказала зимний набор в подарок подруге. упаковка восхитительная, а сами вещи — настоящее произведение искусства!', 
                  author: 'елена' 
                }
              ].map((review, idx) => (
                <div key={idx} className="space-y-5 p-8 rounded-xl border border-border bg-white">
                  <div className="flex gap-1 text-amber-500">
                    {[...Array(review.stars)].map((_, i) => (
                      <Icon key={i} name="Star" size={18} className="fill-current" strokeWidth={0} />
                    ))}
                  </div>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed font-light">
                    {review.text}
                  </p>
                  <p className="text-xs text-muted-foreground/70 italic font-light">
                    — {review.author}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border mt-16 md:mt-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-10 md:py-12 text-center text-sm text-muted-foreground font-light">
          <p>© 2025 azaluk. все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}
