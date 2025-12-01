import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Product, CartItem } from "@/components/shop/types";
import { heroSlides, products } from "@/components/shop/data";
import Header from "@/components/shop/Header";
import HeroCarousel from "@/components/shop/HeroCarousel";
import ProductCatalog from "@/components/shop/ProductCatalog";
import ProductDetails from "@/components/shop/ProductDetails";
import Reviews from "@/components/shop/Reviews";
import Footer from "@/components/shop/Footer";
import ComingSoon from "@/components/ComingSoon";

const DEV_MODE = false;

export default function Index() {
  const [searchParams] = useSearchParams();
  const launchDate = new Date("2025-12-01T12:00:00+03:00");
  const isPreviewMode = searchParams.has("preview");
  const secretKeyValue = searchParams.get("key");
  const hasSecretKey = secretKeyValue === "azaluk2025";

  console.log("Secret key check:", {
    secretKeyValue,
    hasSecretKey,
    isPreviewMode,
    DEV_MODE,
  });

  const [isLaunched, setIsLaunched] = useState(
    DEV_MODE || isPreviewMode || hasSecretKey || new Date() >= launchDate,
  );

  const [selectedCategory, setSelectedCategory] = useState<string>("все");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const checkLaunch = () => {
      if (!DEV_MODE && !isPreviewMode && !hasSecretKey) {
        setIsLaunched(new Date() >= launchDate);
      }
    };

    const launchTimer = setInterval(checkLaunch, 1000);

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearInterval(launchTimer);
    };
  }, [isPreviewMode, hasSecretKey]);

  const categories = ["все", "для дома", "для зимней прогулки", "аксессуары"];

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => {
        if (item.id !== product.id) return false;
        // For products with variants, check specific variant
        if ("selectedVariantId" in product && "selectedVariantId" in item) {
          return item.selectedVariantId === product.selectedVariantId;
        }
        // For products without variants, just match by id
        return true;
      });

      if (existing) {
        return prev.map((item) => {
          const matches =
            item.id === product.id &&
            (!("selectedVariantId" in product) ||
              item.selectedVariantId === product.selectedVariantId);
          return matches ? { ...item, quantity: item.quantity + 1 } : item;
        });
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number, variantId?: string) => {
    setCart((prev) =>
      prev.filter((item) => {
        if (item.id !== productId) return true;
        if (variantId && "selectedVariantId" in item) {
          return item.selectedVariantId !== variantId;
        }
        return false;
      }),
    );
  };

  const updateQuantity = (
    productId: number,
    delta: number,
    variantId?: string,
  ) => {
    setCart((prev) =>
      prev
        .map((item) => {
          const matches =
            item.id === productId &&
            (!variantId ||
              !("selectedVariantId" in item) ||
              item.selectedVariantId === variantId);
          if (matches) {
            const newQuantity = item.quantity + delta;
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
          }
          return item;
        })
        .filter((item) => item.quantity > 0),
    );
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (!isLaunched) {
    return <ComingSoon />;
  }

  return (
    <div className="min-h-screen">
      <Header
        cart={cart}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        cartTotal={cartTotal}
        cartCount={cartCount}
        addToCart={addToCart}
      />

      <HeroCarousel />

      <ProductCatalog
        products={products}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        onProductClick={setSelectedProduct}
        addToCart={addToCart}
        cart={cart}
      />

      <Reviews />

      <ProductDetails
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        addToCart={addToCart}
        setIsCartOpen={setIsCartOpen}
        cart={cart}
      />

      <Footer />
    </div>
  );
}
