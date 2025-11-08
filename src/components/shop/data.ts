import { Product, HeroSlide } from './types';

export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    image: 'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/files/600d4767-07d5-44f9-a0e1-252c0957f2fe.jpg',
    title: 'с любовью упаковываем каждый заказ',
    subtitle: 'и будем очень рады увидеть ваш отзыв'
  },
  {
    id: 2,
    image: 'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/files/c94cf0e0-cf07-4176-8582-b130f2003e38.jpg',
    title: 'всё переплетено',
    subtitle: 'вы лучшие, люблю'
  },
  {
    id: 3,
    image: 'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/files/52ca4309-37b3-4058-bccc-94a511e49fd2.jpg',
    title: 'вещи с душой',
    subtitle: 'мир тебя оберегает'
  }
];

export const products: Product[] = [
  {
    id: 1,
    name: 'п о д в е с ы . . . 🍄 { чёрные }',
    description: 'вязаные грибочки-подвесы ручной работы',
    price: 1200,
    category: 'украшения',
    image: 'https://cdn.poehali.dev/files/d036e4b3-8f61-430e-8dbd-ced3ec4b5dee.png'
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
    name: 'ч е п ч и к 💗 :: белоснежный',
    description: 'нежный чепчик с завязками',
    price: 2400,
    category: 'для тебя',
    image: 'https://cdn.poehali.dev/files/6e5ab0ac-85f9-4eeb-828a-5d17c7181d15.png'
  },
  {
    id: 4,
    name: 'ч е п ч и к 🍷 :: марсала',
    description: 'тёплый чепчик винного оттенка',
    price: 2400,
    category: 'для тебя',
    image: 'https://cdn.poehali.dev/files/f9fe8956-e4b2-4d08-b2fc-0195aa240b23.png'
  },
  {
    id: 5,
    name: 'п о д в е с . . . 🍄 { красный мухомор }',
    description: 'яркий мухомор-подвес с белыми точками',
    price: 1200,
    category: 'украшения',
    image: 'https://cdn.poehali.dev/files/09835741-0a46-4a66-a784-75b67bd230fa.png'
  },
  {
    id: 6,
    name: 'б о к с . . . 🎁 { сюрприз от azaluk }',
    description: 'подарочный набор с любимыми вещами',
    price: 3500,
    category: 'наборы',
    image: 'https://cdn.poehali.dev/files/031f61f1-ffb6-48da-889e-8ff29b154541.png',
    badge: 'limited'
  }
];