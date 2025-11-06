import { Product, HeroSlide } from './types';

export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    image: 'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/files/f7599bef-7c3f-4dcc-acc9-dd2329e08c79.jpg',
    title: 'вещи из моего мира',
    subtitle: 'маленькая коллекция для тёплой зимы'
  }
];

export const products: Product[] = [
  {
    id: 1,
    name: 'вязаный чепчик',
    price: 2500,
    image: 'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/files/da916dc3-cde2-44fd-8d8e-29b9db578977.jpg',
    category: 'для зимней прогулки',
    description: 'мягкий вязаный чепчик из шерсти мериноса. обнимает голову как облако. идеален для зимних прогулок и уютных вечеров дома.'
  },
  {
    id: 2,
    name: 'шёлковая косынка',
    price: 3200,
    image: 'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/files/48a32b4a-0042-46b8-a825-ed3e4330abff.jpg',
    category: 'для зимней прогулки',
    description: 'нежная шёлковая косынка с ручной подшивкой краёв. создаёт образ из старых фильмов и защищает от ветра.'
  },
  {
    id: 3,
    name: 'подвес для помады',
    price: 800,
    image: 'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/files/9c6edf13-da54-46bc-b242-38cc4d441e6d.jpg',
    category: 'для зимней прогулки',
    description: 'крошечный подвес из хлопка с латунной фурнитурой. помада всегда под рукой, а руки свободны.'
  },
  {
    id: 4,
    name: 'бумажная гирлянда',
    price: 1500,
    image: 'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/files/2abdcfcb-8ecb-492b-ae9f-7ecfdfe690eb.jpg',
    category: 'для дома',
    description: 'воздушная гирлянда из бумаги с винтажными узорами. превращает любую комнату в место из сказки.'
  },
  {
    id: 5,
    name: 'световая гирлянда',
    price: 2200,
    image: 'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/files/6938a7c9-efcc-49c4-81e8-11b7b3fa9e13.jpg',
    category: 'для дома',
    description: 'тёплый свет маленьких лампочек создаёт атмосферу зимнего вечера. работает от сети или батареек.'
  },
  {
    id: 6,
    name: 'зимний набор',
    price: 5500,
    image: 'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/files/42629c29-20aa-48aa-b378-05b6dbf562c3.jpg',
    category: 'наборы и боксы',
    description: 'чепчик + косынка + подвес в красивой коробке. готовый подарок для того, кто дорог.'
  }
];
