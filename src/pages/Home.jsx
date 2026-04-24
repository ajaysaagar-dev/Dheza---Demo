import React from 'react';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import { ProductGrid } from '../components/ProductGrid';
import productsData from '../data/products.json';
import { motion } from 'framer-motion';

const Home = ({ onAddToCart, onQuickView }) => {
  // Defensive check for products data
  const products = Array.isArray(productsData) ? productsData : [];
  
  // Show featured products (first 10)
  const featuredProducts = products.slice(0, 10);

  return (
    <div className="bg-bg-light pb-12">
      <Hero />
      <Categories />

      {/* Promotional Banner - Happy Shopping */}
      <section className="max-w-[1500px] mx-auto px-4 mt-12">
        <div className="relative h-96 overflow-hidden rounded-2xl shadow-xl group">
          <img 
            src="https://images.unsplash.com/photo-1534452203294-49c8913721b2?auto=format&fit=crop&q=80&w=2070" 
            alt="Happy Shopping Banner" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/40 to-transparent flex flex-col justify-center px-16 text-white">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl font-black mb-4 tracking-tighter">HAPPY SHOPPING!</h2>
              <p className="text-xl max-w-lg mb-8 text-gray-200">Discover thousands of products at unbeatable prices. Your happiness is our priority.</p>
              <button 
                onClick={() => window.location.href = '/shop'}
                className="bg-accent text-primary px-10 py-4 rounded-full font-bold text-lg hover:bg-accent-hover transition-colors shadow-lg"
              >
                Shop the Collection
              </button>
            </motion.div>
          </div>
        </div>
      </section>
      
      {products.length > 0 && (
        <>
          <section className="max-w-[1500px] mx-auto px-4 mt-8">
            <div className="bg-white p-6">
              <h2 className="text-xl font-bold mb-4">Best Sellers in Electronics</h2>
              <ProductGrid 
                products={featuredProducts.filter(p => p.category === 'Electronics')} 
                onAddToCart={onAddToCart} 
                onQuickView={onQuickView}
              />
            </div>
          </section>

          <section className="max-w-[1500px] mx-auto px-4 mt-8">
            <div className="bg-white p-6">
              <h2 className="text-xl font-bold mb-4">New Arrivals in Fashion</h2>
              <ProductGrid 
                products={featuredProducts.filter(p => p.category === 'Fashion')} 
                onAddToCart={onAddToCart} 
                onQuickView={onQuickView}
              />
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Home;
