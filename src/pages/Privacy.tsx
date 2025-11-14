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
      
      <main className="flex-1 pt-24 pb-16 px-4 bg-gradient-to-b from-orange-50/30 to-white">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-light tracking-tight text-primary mb-4">
              Политика конфиденциальности
            </h1>
            <div className="w-16 h-0.5 bg-primary/20 mx-auto"></div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
            <div className="prose prose-lg max-w-none prose-headings:font-light prose-headings:text-primary prose-headings:tracking-tight prose-h1:text-3xl prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4 prose-ul:my-4 prose-li:text-gray-700 prose-li:leading-relaxed prose-strong:text-primary prose-strong:font-medium prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
              {loading ? (
                <p className="text-center text-gray-500">Загрузка...</p>
              ) : (
                <ReactMarkdown>{content}</ReactMarkdown>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}