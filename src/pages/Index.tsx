import { useState, useEffect } from "react";
import { useSearchParams, useParams, useNavigate } from "react-router-dom";
import { Product, CartItem } from "@/components/shop/types";
import { heroSlides } from "@/components/shop/data";
import Header from "@/components/shop/Header";
import HeroCarousel from "@/components/shop/HeroCarousel";
import ProductCatalog from "@/components/shop/ProductCatalog";
import ProductDetails from "@/components/shop/ProductDetails";
import Reviews from "@/components/shop/Reviews";
import Footer from "@/components/shop/Footer";
import ComingSoon from "@/components/ComingSoon";
import SurpriseBlock from "@/components/shop/SurpriseBlock";

const DEV_MODE = false;

export default function Index() {
  const [searchParams] = useSearchParams();
  const { productId } = useParams();
  const navigate = useNavigate();
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
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('azaluk_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [savedScrollPosition, setSavedScrollPosition] = useState<number>(0);

  useEffect(() => {
    localStorage.setItem('azaluk_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const loadProducts = async () => {
      console.log('📦 Starting products load...');
      try {
        const response = await fetch('https://functions.poehali.dev/4cfc9ed0-ca29-40ae-8316-56d0225fb703');
        if (response.ok) {
          const data = await response.json();
          const filtered = data.filter((p: Product) => p.in_stock !== false);
          console.log('✅ Products loaded:', filtered.map((p: Product) => ({ id: p.id, name: p.name })));
          setProducts(filtered);
        }
      } catch (error) {
        console.error('Ошибка загрузки товаров:', error);
      } finally {
        console.log('🏁 Products loading finished');
        setIsLoadingProducts(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    console.log('🔍 ProductID effect:', { 
      productId, 
      isLoadingProducts, 
      productsCount: products.length,
      selectedProductId: selectedProduct?.id,
      selectedProductName: selectedProduct?.name
    });
    
    // Clear selected product while loading to prevent showing wrong item
    if (isLoadingProducts && productId) {
      console.log('🧹 Clearing selected product during load');
      setSelectedProduct(null);
      return;
    }
    
    // Wait for products to load from server before opening product modal
    if (productId && products.length > 0 && !isLoadingProducts) {
      const product = products.find(p => p.id === parseInt(productId));
      console.log('🎯 Found product:', { 
        searchId: parseInt(productId), 
        foundId: product?.id,
        foundName: product?.name 
      });
      if (product) {
        // Save scroll position before opening modal
        setSavedScrollPosition(window.scrollY);
        setSelectedProduct(product);
      } else {
        // Product not found, redirect to home
        console.log('❌ Product not found, redirecting');
        navigate('/', { replace: true });
      }
    } else if (!productId && selectedProduct) {
      // Close product modal when URL changes back to home
      setSelectedProduct(null);
      // Restore scroll position after modal closes
      setTimeout(() => {
        window.scrollTo(0, savedScrollPosition);
      }, 0);
    }
  }, [productId, products, isLoadingProducts, navigate, savedScrollPosition]);

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

  const categories = ["все", "💌 valentines", "для дома", "для зимней прогулки", "аксессуары"];

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
        onProductClick={setSelectedProduct}
        products={products}
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

      <SurpriseBlock />

      <Reviews />

      {!isLoadingProducts && (
        <ProductDetails
          product={selectedProduct}
          onClose={() => {
            if (productId) {
              navigate('/', { replace: true });
            } else {
              setSelectedProduct(null);
              // Restore scroll position
              setTimeout(() => {
                window.scrollTo(0, savedScrollPosition);
              }, 0);
            }
          }}
          addToCart={addToCart}
          setIsCartOpen={setIsCartOpen}
          cart={cart}
        />
      )}

      <Footer />
    </div>
  );
}