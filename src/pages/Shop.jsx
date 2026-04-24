import React, { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { ProductCard } from '../components/ProductGrid';
import productsData from '../data/products.json';
import { Filter, ChevronDown } from 'lucide-react';

const Shop = ({ onAddToCart, onQuickView }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category') || 'All';
  const initialSearch = queryParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState(200000);
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  // Sync state with URL query params
  React.useEffect(() => {
    setSelectedCategory(initialCategory);
    setSearchQuery(initialSearch);
  }, [initialCategory, initialSearch]);

  const categories = ['All', ...new Set(productsData.map(p => p.category))];

  const filteredProducts = useMemo(() => {
    let result = productsData.filter(p => {
      const matchCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchPrice = p.price <= priceRange;
      const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchPrice && matchSearch;
    });

    if (sortBy === 'low-high') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'high-low') result.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [selectedCategory, priceRange, sortBy, searchQuery]);

  return (
    <div className="px-4 md:px-8 py-8 flex flex-col md:flex-row gap-8">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-64 space-y-8 bg-white p-6 rounded-lg shadow-sm h-fit">
        <div>
          <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
            <Filter size={18} />
            <span>Filters</span>
          </h3>

          <div className="space-y-6">
            {/* Category Filter */}
            <div>
              <p className="font-medium mb-3 text-sm uppercase tracking-wider text-text-muted">Category</p>
              <div className="space-y-2">
                {categories.map(cat => (
                  <label key={cat} className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === cat}
                      onChange={() => setSelectedCategory(cat)}
                      className="w-4 h-4 text-accent border-gray-300 focus:ring-accent"
                    />
                    <span className={`text-sm ${selectedCategory === cat ? 'font-bold text-primary' : 'text-text-muted group-hover:text-primary'}`}>
                      {cat}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <p className="font-medium mb-3 text-sm uppercase tracking-wider text-text-muted">Price Range</p>
              <input
                type="range"
                min="0"
                max="200000"
                step="1000"
                value={priceRange}
                onChange={(e) => setPriceRange(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent"
              />
              <div className="flex justify-between text-xs mt-2 text-text-muted font-medium">
                <span>₹0</span>
                <span className="text-primary font-bold">Up to ₹{priceRange.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Shop Products</h1>
            <p className="text-text-muted text-sm mt-1">{filteredProducts.length} items found</p>
          </div>

          <div className="flex items-center space-x-4 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-md px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-accent w-full"
              >
                <option value="featured">Featured</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
                <option value="rating">Avg. Customer Review</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="bg-white p-12 rounded-lg text-center shadow-sm">
            <h3 className="text-xl font-medium mb-2">No products found</h3>
            <p className="text-text-muted">Try adjusting your filters or search query.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={onAddToCart} 
                onQuickView={onQuickView}
              />
            ))}
          </div>
        )}
      </main>

    </div>
  );
};

export default Shop;
