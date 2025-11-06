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
    name: 'косынка «туманное утро»',
    description: 'согревает, как дыхание в мороз, и хранит покой',
    price: 2500,
    category: 'для зимней прогулки',
    image: 'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/files/c94cf0e0-cf07-4176-8582-b130f2003e38.jpg'
  },
  {
    id: 2,
    name: 'вязаный чепчик «лунное сияние»',
    description: 'укутывает теплом, как старая сказка перед сном',
    price: 3200,
    category: 'для дома',
    image: 'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/files/c3883d55-8801-4fdc-aef9-82b39a393bf6.jpg'
  },
  {
    id: 3,
    name: 'подвес «зеркальная пыль»',
    description: 'крошечный амулет для тех, кто ищет свет в себе',
    price: 800,
    category: 'для дома',
    image: 'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/files/546e0ba9-0bc8-4a91-a941-a0540466f7db.jpg'
  },
  {
    id: 4,
    name: 'бумажная гирлянда «шёпот бумаги»',
    description: 'шуршит, как страницы старого дневника',
    price: 1500,
    category: 'для дома',
    image: 'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/files/00ba75c0-9906-4158-be80-2ae3f819fdfe.jpg'
  },
  {
    id: 5,
    name: 'световая гирлянда «золотое сияние»',
    description: 'свет, который хочется обнимать и хранить',
    price: 2800,
    category: 'для дома',
    image: 'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/files/76e1bef3-65b2-446c-a55f-b98fbd010e7a.jpg'
  },
  {
    id: 6,
    name: 'набор «сказочный сундук»',
    description: 'косынка, чепчик и гирлянда — вся магия в одной коробке',
    price: 6500,
    category: 'наборы и боксы',
    image: 'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/files/52ca4309-37b3-4058-bccc-94a511e49fd2.jpg'
  }
];
