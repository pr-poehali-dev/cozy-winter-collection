export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  description?: string;
  composition?: string;
  weight?: string;
  gallery?: string[];
  sizing?: string;
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
  stock?: number;
  videoUrl?: string;
  videoTitle?: string;
  sizing?: string;
  isGiftCertificate?: boolean;
  customPrice?: number;
}

export interface CartItem extends Product {
  quantity: number;
  selectedVariantId?: string;
}

export interface FloatingQuote {
  text: string;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export interface HeroSlide {
  id: number;
  image: string;
  imageMobile?: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonAction: 'catalog' | 'delivery' | 'reviews' | 'surprise';
  floatingQuotes?: FloatingQuote[];
}