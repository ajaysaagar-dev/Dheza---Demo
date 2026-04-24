import React, { useState } from 'react';
import { Search, ShoppingCart, User, Menu, MapPin, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';

const Header = ({ cartCount, onCartClick }) => {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchInput)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 shadow-md">
      {/* Top Header - Unique Midnight Indigo */}
      <div className="bg-primary text-white p-3 px-6 flex items-center space-x-6">
        {/* Professional Shield Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="relative">
            <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center transform group-hover:rotate-[360deg] transition-all duration-700 shadow-lg">
              <div className="w-8 h-8 border-2 border-primary/20 rounded-lg flex items-center justify-center">
                <span className="text-primary font-black text-2xl tracking-tighter">D</span>
              </div>
            </div>
            {/* Gloss Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent rounded-xl pointer-events-none"></div>
          </div>
          <div className="flex flex-col -space-y-1">
            <span className="text-2xl font-black tracking-tighter text-white uppercase">Dheza</span>
            <span className="text-[10px] text-accent font-bold uppercase tracking-[0.3em] opacity-80">Premium</span>
          </div>
        </Link>

        {/* Deliver To */}
        <div className="hidden md:flex items-center space-x-1 cursor-pointer hover:bg-white/10 p-2 rounded-lg transition-colors">
          <MapPin size={18} className="text-accent" />
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-300 uppercase font-bold tracking-wider">Deliver to</span>
            <span className="text-xs font-bold -mt-0.5">India</span>
          </div>
        </div>

        {/* Search Bar - Modern Style */}
        <form onSubmit={handleSearch} className="flex-1 flex items-center h-11">
          <div className="relative flex-1 group">
            <input 
              type="text" 
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full h-full px-5 pr-12 text-text-main outline-none text-sm rounded-xl bg-white focus:ring-2 ring-accent transition-all"
              placeholder="Search for products, brands and more..."
            />
            <button type="submit" className="absolute right-0 top-0 h-full w-12 flex items-center justify-center bg-accent hover:bg-accent-hover rounded-r-xl transition-colors">
              <Search size={20} className="text-primary" />
            </button>
          </div>
        </form>

        {/* Actions */}
        <div className="flex items-center space-x-4 md:space-x-6">
          <Link to="/login" className="flex flex-col cursor-pointer hover:text-accent transition-colors">
            <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">Sign In</span>
            <span className="text-xs font-bold flex items-center">Account <ChevronDown size={12} className="ml-0.5" /></span>
          </Link>

          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onCartClick}
            className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 p-2 px-4 rounded-xl cursor-pointer transition-colors relative"
          >
            <div className="relative">
              <ShoppingCart size={22} />
              <span className="absolute -top-3 -right-3 bg-accent text-primary font-black text-[10px] h-5 w-5 rounded-full flex items-center justify-center border-2 border-primary">
                {cartCount}
              </span>
            </div>
            <span className="text-sm font-bold hidden md:block">Cart</span>
          </motion.div>
        </div>
      </div>

      {/* Sub Header - Lighter Indigo */}
      <div className="bg-secondary text-white py-2 px-6 flex items-center space-x-6 text-xs font-bold overflow-x-auto no-scrollbar uppercase tracking-wide">
        <div className="flex items-center cursor-pointer hover:text-accent transition-colors">
          <Menu size={18} className="mr-1" /> ALL
        </div>
        <Link to="/" className="hover:text-accent transition-colors">HOME</Link>
        <Link to="/shop" className="hover:text-accent transition-colors">DEALS</Link>
        <Link to="/shop?category=Electronics" className="hover:text-accent transition-colors">Electronics</Link>
        <Link to="/shop?category=Fashion" className="hover:text-accent transition-colors">Fashion</Link>
        <Link to="/shop?category=Home" className="hover:text-accent transition-colors">Home Decor</Link>
        <Link to="/shop" className="hover:text-accent transition-colors">Gift Cards</Link>
      </div>
    </header>
  );
};

export default Header;
