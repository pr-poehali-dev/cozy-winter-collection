import Header from "@/components/shop/Header";
import Footer from "@/components/shop/Footer";

export default function Offer() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header
        cart={[]}
        isCartOpen={false}
        setIsCartOpen={() => {}}
        updateQuantity={() => {}}
        removeFromCart={() => {}}
        cartTotal={0}
        cartCount={0}
      />
      
      <main className="flex-1 py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-light tracking-wide text-primary mb-8">
            Договор оферты
          </h1>
          
          <div className="prose prose-sm md:prose-base max-w-none space-y-6 text-gray-700 font-light leading-relaxed">
            <p>Содержимое договора оферты будет добавлено позже.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
