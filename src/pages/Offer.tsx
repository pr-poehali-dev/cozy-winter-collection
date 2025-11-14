import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import Header from "@/components/shop/Header";
import Footer from "@/components/shop/Footer";

export default function Offer() {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/docs/offer.md')
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
            Договор оферты
          </h1>
          
          <div className="prose prose-lg max-w-none" style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 300 }}>
            <style>{`
              .prose h2 { font-family: 'Raleway', sans-serif; font-weight: 500; font-size: 1.5rem; color: hsl(30, 10%, 25%); margin-top: 2rem; margin-bottom: 1rem; text-transform: lowercase; letter-spacing: 0.01em; }
              .prose h3 { font-family: 'Raleway', sans-serif; font-weight: 500; font-size: 1.25rem; color: hsl(30, 10%, 25%); margin-top: 1.5rem; margin-bottom: 0.75rem; text-transform: lowercase; letter-spacing: 0.01em; }
              .prose p { color: #374151; font-size: 1rem; line-height: 1.6; margin-bottom: 1rem; }
              .prose ul { margin: 1rem 0; margin-left: 1.5rem; }
              .prose li { color: #374151; line-height: 1.6; margin-bottom: 0.5rem; }
              .prose strong { color: hsl(30, 10%, 25%); font-weight: 500; }
              .prose a { color: hsl(30, 10%, 25%); text-decoration: underline; }
              .prose a:hover { opacity: 0.8; }
            `}</style>
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