import { useState, useEffect } from 'react';
import { Product, CartItem } from '@/components/shop/types';
import { heroSlides, products } from '@/components/shop/data';
import Header from '@/components/shop/Header';
import HeroCarousel from '@/components/shop/HeroCarousel';
import ProductCatalog from '@/components/shop/ProductCatalog';
import ProductDetails from '@/components/shop/ProductDetails';
import Reviews from '@/components/shop/Reviews';
import Delivery from '@/components/shop/Delivery';
import Footer from '@/components/shop/Footer';

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState<string>('все');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const categories = ['все', 'для дома', 'для зимней прогулки', 'наборы и боксы'];

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header
        cart={cart}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        cartTotal={cartTotal}
        cartCount={cartCount}
      />

      <HeroCarousel
        slides={heroSlides}
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
      />

      <ProductCatalog
        products={products}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        onProductClick={setSelectedProduct}
        addToCart={addToCart}
      />

      <Reviews />

      <Delivery onCheckoutClick={() => setIsCartOpen(true)} />

      <ProductDetails
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        addToCart={addToCart}
      />

      <Footer />
    </div>
  );
}
