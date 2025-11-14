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
      
      <main className="flex-1 pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl text-primary mb-12" style={{ fontFamily: 'Cormorant, serif', fontWeight: 300, letterSpacing: '0.02em' }}>
            Политика конфиденциальности
          </h1>
          
          <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-primary prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-10 prose-h2:text-3xl prose-h2:mb-5 prose-h2:mt-10 prose-h3:text-2xl prose-h3:mb-4 prose-h3:mt-8 prose-h4:text-xl prose-h4:mb-3 prose-h4:mt-6 prose-p:text-gray-700 prose-p:text-base prose-p:leading-7 prose-p:mb-4 prose-ul:my-4 prose-ul:ml-6 prose-li:text-gray-700 prose-li:leading-7 prose-li:mb-2 prose-strong:text-primary prose-strong:font-medium prose-a:text-primary prose-a:underline hover:prose-a:text-primary/80" style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 300 }}>
            {loading ? (
              <p className="text-center text-gray-500">Загрузка...</p>
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