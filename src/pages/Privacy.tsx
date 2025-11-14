import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import Header from "@/components/shop/Header";
import Footer from "@/components/shop/Footer";

export default function Privacy() {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/docs/conf.md')
      .then(res => res.text())
      .then(text => {
        setContent(text);
        setLoading(false);
      })
      .catch(() => {
        setContent('Не удалось загрузить содержимое.');
        setLoading(false);
      });
  }, []);

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
            Политика конфиденциальности
          </h1>
          
          <div className="prose prose-sm md:prose-base max-w-none text-gray-700 font-light leading-relaxed">
            {loading ? (
              <p>Загрузка...</p>
            ) : (
              <ReactMarkdown>{content}</ReactMarkdown>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}