export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  description?: string;
  composition?: string;
  weight?: string;
  gallery?: string[];
}

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
  variants?: ProductVariant[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedVariantId?: string;
}

export interface HeroSlide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonAction: 'catalog' | 'delivery' | 'reviews';
}