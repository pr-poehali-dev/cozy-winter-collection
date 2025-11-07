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
    image: 'https://cdn.poehali.dev/files/4c0d6169-8444-4ae5-8bd3-7652043de93b.png',
    description: 'мягкий вязаный чепчик из шерсти мериноса. обнимает голову как облако. идеален для...'
  },
  {
    id: 2,
    name: 'шёлковая косынка',
    category: 'для зимней прогулки',
    price: 3200,
    image: 'https://cdn.poehali.dev/files/4c0d6169-8444-4ae5-8bd3-7652043de93b.png',
    description: 'нежная шёлковая косынка с ручной подшивкой краёв. создаёт образ из старых...'
  },
  {
    id: 3,
    name: 'подвес для помады',
    category: 'для зимней прогулки',
    price: 800,
    image: 'https://cdn.poehali.dev/files/4c0d6169-8444-4ae5-8bd3-7652043de93b.png',
    description: 'крошечный подвес из хлопка с латунной фурнитурой. помада всегда под рукой, а рук...'
  },
  {
    id: 4,
    name: 'бумажная гирлянда',
    category: 'для дома',
    price: 1500,
    image: 'https://cdn.poehali.dev/files/fa3ab341-6dfd-4334-93ca-bca3a9b81e24.png',
    description: 'воздушная гирлянда из бумаги с винтажными узорами. превращает любую комнату в мест...'
  },
  {
    id: 5,
    name: 'световая гирлянда',
    category: 'для дома',
    price: 2200,
    image: 'https://cdn.poehali.dev/files/fa3ab341-6dfd-4334-93ca-bca3a9b81e24.png',
    description: 'тёплый свет маленьких лампочек создаёт атмосферу зимнего вечера. работает от сети...'
  },
  {
    id: 6,
    name: 'зимний набор',
    category: 'наборы и боксы',
    price: 5500,
    image: 'https://cdn.poehali.dev/files/fa3ab341-6dfd-4334-93ca-bca3a9b81e24.png',
    description: 'чепчик + косынка + подвес в красивой коробке. готовый подарок для того, кто дорог.'
  }
];

const categories = ['все', 'для дома', 'для зимней прогулки', 'наборы и боксы'];

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState('все');

  const filteredProducts = selectedCategory === 'все' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-orange-50/20 to-amber-50/30">
      <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-border z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-serif text-primary">azaluk</h1>
          <button className="p-2 hover:bg-secondary rounded-full transition-colors">
            <Icon name="ShoppingBag" size={24} className="text-primary" />
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 md:py-16">
        <section className="relative h-[60vh] md:h-[70vh] mb-16 md:mb-24 rounded-3xl overflow-hidden">
          <img 
            src="https://cdn.poehali.dev/files/2f567529-ee1e-49c2-a932-a80f6fb6dccf.png"
            alt="Уютный интерьер"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 flex flex-col items-center justify-center text-white px-4">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif mb-4 md:mb-6 text-center leading-tight">
              вещи из моего<br />мира
            </h2>
            <p className="text-base md:text-lg mb-6 md:mb-8 text-white/90">маленькая коллекция для тёплой зимы</p>
            <button 
              onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 md:px-12 py-3 md:py-4 bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-full text-sm md:text-base transition-all border border-white/40"
            >
              смотреть коллекцию
            </button>
          </div>
        </section>

        <section id="collection" className="mb-16 md:mb-24">
          <h3 className="text-3xl md:text-4xl font-serif text-center mb-8 md:mb-12 text-primary">коллекция</h3>
          
          <div className="flex flex-wrap gap-3 md:gap-4 justify-center mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 md:px-8 py-2 md:py-3 rounded-full text-sm md:text-base transition-all ${
                  selectedCategory === cat
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-white border border-border text-primary hover:bg-secondary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredProducts.map((product) => (
              <div 
                key={product.id} 
                className="bg-white rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-all group"
              >
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <p className="text-xs md:text-sm text-muted-foreground">{product.category}</p>
                  <h4 className="text-xl md:text-2xl font-serif text-primary">{product.name}</h4>
                  <p className="text-sm md:text-base text-muted-foreground line-clamp-3">{product.description}</p>
                  <div className="flex items-center justify-between pt-4">
                    <span className="text-2xl md:text-3xl font-light text-primary">{product.price} ₽</span>
                    <button className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors">
                      <Icon name="ShoppingBag" size={18} />
                      <span className="text-sm">купить</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16 md:mb-24 max-w-3xl mx-auto text-center space-y-6 md:space-y-8 px-4">
          <h3 className="text-3xl md:text-4xl font-serif text-primary">о мире azaluk</h3>
          <div className="space-y-4 md:space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
            <p>каждая вещь создаётся в маленькой мастерской, где время течёт медленнее. здесь нет спешки — только внимание к деталям и любовь к материалам.</p>
            <p>я верю, что вещи могут хранить тепло рук, которые их создали. что они способны обнимать в холодные дни и напоминать о доме, где бы ты ни был.</p>
            <p>это не просто магазин — это место, где рождаются маленькие истории. и теперь одна из них может стать твоей.</p>
            <p className="italic text-sm md:text-base pt-4">с теплом, azaluk</p>
          </div>
        </section>

        <section className="bg-white rounded-3xl p-8 md:p-16 border border-border">
          <h3 className="text-3xl md:text-4xl font-serif text-center mb-12 text-primary">отзывы</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { stars: 5, text: 'чепчик невероятно мягкий! ношу каждый день, и он согревает не только физически', author: 'анна' },
              { stars: 5, text: 'косынка стала моей любимой вещью. качество шёлка потрясающее, ощущение роскоши', author: 'мария' },
              { stars: 5, text: 'заказала зимний набор в подарок. упаковка восхитительная, а сами вещи — произведение искусства', author: 'елена' }
            ].map((review, idx) => (
              <div key={idx} className="space-y-4">
                <div className="flex gap-1 text-amber-400">
                  {[...Array(review.stars)].map((_, i) => (
                    <Icon key={i} name="Star" size={20} className="fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{review.text}</p>
                <p className="text-xs text-muted-foreground/70 italic">— {review.author}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border mt-16 md:mt-24">
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 text-center text-sm text-muted-foreground">
          <p>© 2025 azaluk. все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}
