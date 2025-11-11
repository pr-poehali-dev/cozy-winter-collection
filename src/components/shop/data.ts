import { Product, HeroSlide } from './types';

export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    image: 'https://cdn.poehali.dev/files/f9fe8956-e4b2-4d08-b2fc-0195aa240b23.png',
    title: 'вещи с душой и теплом',
    subtitle: 'каждая создана вручную, чтобы стать частью твоей истории',
    buttonText: 'посмотреть коллекцию',
    buttonAction: 'catalog'
  },
  {
    id: 2,
    image: 'https://cdn.poehali.dev/files/031f61f1-ffb6-48da-889e-8ff29b154541.png',
    title: 'упаковываем с любовью',
    subtitle: 'каждый заказ — маленькое волшебство в крафтовой коробке',
    buttonText: 'доставка и оплата',
    buttonAction: 'delivery'
  },
  {
    id: 3,
    image: 'https://cdn.poehali.dev/files/d036e4b3-8f61-430e-8dbd-ced3ec4b5dee.png',
    title: 'спасибо за ваши отзывы 💗',
    subtitle: 'они вдохновляют создавать ещё больше уютных вещей',
    buttonText: 'оставить отзыв',
    buttonAction: 'reviews'
  }
];

export const products: Product[] = [
  {
    id: 1,
    name: 'ч е п ч и к 🍷 :: брусника',
    description: 'тёплый чепчик брусничного оттенка',
    price: 2400,
    category: 'для тебя',
    image: 'https://cdn.poehali.dev/files/f9fe8956-e4b2-4d08-b2fc-0195aa240b23.png'
  },
  {
    id: 2,
    name: 'ч е п ч и к 🤍 :: молочный',
    description: 'мягкий вязаный чепчик из мохера',
    price: 2400,
    category: 'для тебя',
    image: 'https://cdn.poehali.dev/files/14a74df9-0c9e-49aa-b649-04c064eb375a.png'
  },
  {
    id: 3,
    name: 'г р и б о ч е к 🍄 :: лесной дар',
    description: 'вязаный грибочек-подвес ручной работы',
    price: 1200,
    category: 'украшения',
    image: 'https://cdn.poehali.dev/files/09835741-0a46-4a66-a784-75b67bd230fa.png'
  },
  {
    id: 4,
    name: 'г р и б о ч е к 🌑 :: сладкая тьма',
    description: 'таинственный грибочек тёмного оттенка',
    price: 1200,
    category: 'украшения',
    image: 'https://cdn.poehali.dev/files/d036e4b3-8f61-430e-8dbd-ced3ec4b5dee.png'
  },
  {
    id: 5,
    name: 'г и р л я н д а 📜 :: тепло дома',
    description: 'бумажная гирлянда для уютной атмосферы',
    price: 800,
    category: 'декор',
    image: 'https://cdn.poehali.dev/files/031f61f1-ffb6-48da-889e-8ff29b154541.png'
  },
  {
    id: 6,
    name: 'п о д в е с 🌙 :: северная ночь',
    description: 'лунный подвес с волшебным сиянием',
    price: 1000,
    category: 'украшения',
    image: 'https://cdn.poehali.dev/files/6e5ab0ac-85f9-4eeb-828a-5d17c7181d15.png'
  },
  {
    id: 7,
    name: 'п о д в е с ☀️ :: сияние солнца',
    description: 'солнечный подвес, дарящий тепло',
    price: 1000,
    category: 'украшения',
    image: 'https://cdn.poehali.dev/files/14a74df9-0c9e-49aa-b649-04c064eb375a.png'
  },
  {
    id: 8,
    name: 'б о к с . . . ✨ { сказочное чудо }',
    description: 'подарочный набор с волшебными вещами',
    price: 3500,
    category: 'наборы',
    image: 'https://cdn.poehali.dev/files/031f61f1-ffb6-48da-889e-8ff29b154541.png',
    badge: 'limited'
  }
];