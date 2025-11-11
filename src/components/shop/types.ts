export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  badge?: string;
  gallery?: string[];
  storyDescription?: string;
  composition?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface HeroSlide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonAction: 'catalog' | 'delivery' | 'reviews';
}