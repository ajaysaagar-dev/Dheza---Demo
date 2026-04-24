import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Login from './pages/Login';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Star } from 'lucide-react';

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setQuickViewProduct(null); // Close quick view if open
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Router>
      <div className="min-h-screen bg-bg-light flex flex-col">
        <Header cartCount={cartItemsCount} onCartClick={() => setIsCartOpen(true)} />
        
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home onAddToCart={addToCart} onQuickView={setQuickViewProduct} />} />
            <Route path="/shop" element={<Shop onAddToCart={addToCart} onQuickView={setQuickViewProduct} />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>

        <footer className="bg-primary text-white pt-20 pb-10 border-t border-white/5">
          {/* ... footer content remains the same ... */}
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row justify-between gap-16 mb-20">
              {/* Brand Section */}
              <div className="max-w-xs">
                <div className="text-4xl font-black mb-6 tracking-tighter text-accent">Dheza</div>
                <p className="text-gray-400 text-sm leading-relaxed mb-8">
                  Your premium destination for curated excellence. We bring the world's best products directly to your doorstep with speed and efficiency.
                </p>
                <div className="flex space-x-4">
                  <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-accent hover:text-primary cursor-pointer transition-all text-xs font-bold">
                    f
                  </div>
                  <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-accent hover:text-primary cursor-pointer transition-all text-xs font-bold">
                    𝕏
                  </div>
                  <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-accent hover:text-primary cursor-pointer transition-all text-xs font-bold">
                    📷
                  </div>
                </div>
              </div>

              {/* Links Sections - Spanning Left to Right */}
              <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-12">
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-[0.2em] mb-6 text-white">Marketplace</h4>
                  <ul className="space-y-4 text-sm text-gray-400">
                    <li><a href="#" className="hover:text-accent transition-colors">Sell Products</a></li>
                    <li><a href="#" className="hover:text-accent transition-colors">Advertise</a></li>
                    <li><a href="#" className="hover:text-accent transition-colors">Affiliates</a></li>
                    <li><a href="#" className="hover:text-accent transition-colors">Fulfilment</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-[0.2em] mb-6 text-white">Support</h4>
                  <ul className="space-y-4 text-sm text-gray-400">
                    <li><a href="#" className="hover:text-accent transition-colors">Your Account</a></li>
                    <li><a href="#" className="hover:text-accent transition-colors">Return Centre</a></li>
                    <li><a href="#" className="hover:text-accent transition-colors">100% Protection</a></li>
                    <li><a href="#" className="hover:text-accent transition-colors">Help</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-[0.2em] mb-6 text-white">About</h4>
                  <ul className="space-y-4 text-sm text-gray-400">
                    <li><a href="#" className="hover:text-accent transition-colors">Our Story</a></li>
                    <li><a href="#" className="hover:text-accent transition-colors">Careers</a></li>
                    <li><a href="#" className="hover:text-accent transition-colors">Press</a></li>
                    <li><a href="#" className="hover:text-accent transition-colors">Sustainability</a></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-gray-500 font-medium">
              <div className="flex space-x-8">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
              </div>
              <p>© 2024 Dheza Marketplace Inc. All rights reserved.</p>
            </div>
          </div>
        </footer>


        {/* Cart Sidebar */}
        <AnimatePresence>
          {isCartOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsCartOpen(false)}
                className="fixed inset-0 bg-black bg-opacity-50 z-[100]"
              />
              <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[101] shadow-2xl p-6 flex flex-col"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-2 text-primary">
                    <ShoppingBag />
                    <h2 className="text-2xl font-bold">Shopping Cart</h2>
                  </div>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <X size={24} />
                  </button>
                </div>

                {cart.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-text-muted">
                    <ShoppingBag size={48} className="mb-4 opacity-20" />
                    <p>Your cart is empty</p>
                  </div>
                ) : (
                  <div className="flex flex-col flex-1">
                    <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                      {cart.map(item => (
                        <div key={item.id} className="flex space-x-4 border-b pb-4">
                          <img src={item.image} alt={item.title} className="w-20 h-20 object-contain bg-gray-50 rounded" />
                          <div className="flex-1">
                            <h4 className="text-sm font-medium line-clamp-2">{item.title}</h4>
                            <div className="flex items-center justify-between mt-2">
                              <span className="font-bold">₹{item.price.toLocaleString('en-IN')}</span>
                              <span className="text-xs text-text-muted">Qty: {item.quantity}</span>
                            </div>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-xs text-red-600 hover:underline mt-1"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="pt-6 border-t mt-auto">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-lg font-medium">Subtotal:</span>
                        <span className="text-2xl font-bold">₹{cartTotal.toLocaleString('en-IN')}</span>
                      </div>
                      <button className="bg-accent hover:bg-accent-hover text-primary w-full py-4 rounded-md text-lg font-bold shadow-sm">
                        Proceed to Checkout
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Quick View Modal */}
        <AnimatePresence>
          {quickViewProduct && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setQuickViewProduct(null)}
                className="fixed inset-0 bg-black/60 z-[150] backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl bg-white z-[151] shadow-2xl rounded-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
              >
                <button 
                  onClick={() => setQuickViewProduct(null)}
                  className="absolute right-4 top-4 p-2 bg-white/80 backdrop-blur hover:bg-white rounded-full z-10 shadow-sm"
                >
                  <X size={20} />
                </button>

                <div className="w-full md:w-1/2 bg-gray-50 p-8 flex items-center justify-center min-h-[300px]">
                  <img 
                    src={quickViewProduct.image} 
                    alt={quickViewProduct.title} 
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                <div className="flex-1 p-8 md:p-12 flex flex-col">
                  <span className="text-xs font-bold uppercase tracking-widest text-accent mb-4 block">
                    {quickViewProduct.category}
                  </span>
                  <h2 className="text-3xl font-bold mb-4 leading-tight">{quickViewProduct.title}</h2>
                  
                  <div className="flex items-center space-x-2 mb-6">
                    <div className="flex items-center text-orange-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={18} className={i < Math.floor(quickViewProduct.rating) ? 'fill-orange-400' : 'text-gray-200'} />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-blue-600">{quickViewProduct.reviewsCount} reviews</span>
                  </div>

                  <div className="flex items-baseline mb-8">
                    <span className="text-lg font-bold mr-1">₹</span>
                    <span className="text-4xl font-black tracking-tight">{quickViewProduct.price.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center space-x-2 text-green-600 text-sm font-bold">
                      <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
                      <span>In Stock - Ready to ship</span>
                    </div>
                    <p className="text-text-muted text-sm leading-relaxed">
                      Experience premium quality with our latest {quickViewProduct.title.split('-')[0].trim()}. 
                      Designed for those who demand excellence in every detail.
                    </p>
                  </div>

                  <button 
                    onClick={() => addToCart(quickViewProduct)}
                    className="mt-auto bg-primary text-white w-full py-5 rounded-full font-bold text-lg hover:bg-secondary transition-all shadow-xl hover:shadow-primary/20 active:scale-95"
                  >
                    Add to Shopping Cart
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;
