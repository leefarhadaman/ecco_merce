import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface ProductFiltersProps {
  onFilterChange: (filters: {
    sort: string;
    category: string;
    minPrice: number;
    maxPrice: number;
    minRating: number;
  }) => void;
  isMobile?: boolean;
  onClose?: () => void;
}

const ProductFilters = ({ onFilterChange, isMobile, onClose }: ProductFiltersProps) => {
  const [filters, setFilters] = useState({
    sort: 'default',
    category: '',
    minPrice: 0,
    maxPrice: Infinity,
    minRating: 0,
  });

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <motion.div
      className={`bg-white p-6 rounded-2xl shadow-lg ${isMobile ? 'fixed inset-0 z-50 overflow-y-auto' : 'max-w-md'}`}
      initial={{ opacity: 0, x: isMobile ? 100 : 0 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: isMobile ? 100 : 0 }}
      transition={{ duration: 0.3 }}
    >
      {isMobile && (
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-gray-900 font-roboto">Filters</h3>
          <button onClick={onClose} className="text-gray-600 hover:text-amber-500">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
      )}
      <div className="space-y-6">
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2 font-roboto">Sort By</h4>
          <select
            value={filters.sort}
            onChange={(e) => handleFilterChange({ sort: e.target.value })}
            className="w-full p-3 rounded-md bg-indigo-50 text-gray-900 font-open-sans"
          >
            <option value="default">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-desc">Rating: High to Low</option>
            <option value="newest">Newest First</option>
          </select>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2 font-roboto">Category</h4>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange({ category: e.target.value })}
            className="w-full p-3 rounded-md bg-indigo-50 text-gray-900 font-open-sans"
          >
            <option value="">All Categories</option>
            <option value="Fashion">Fashion</option>
            <option value="Electronics">Electronics</option>
            <option value="Home">Home</option>
            <option value="Beauty">Beauty</option>
          </select>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2 font-roboto">Price Range</h4>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min Price"
              value={filters.minPrice || ''}
              onChange={(e) => handleFilterChange({ minPrice: Number(e.target.value) })}
              className="w-1/2 p-3 rounded-md bg-indigo-50 text-gray-900 font-open-sans"
            />
            <input
              type="number"
              placeholder="Max Price"
              value={filters.maxPrice === Infinity ? '' : filters.maxPrice}
              onChange={(e) => handleFilterChange({ maxPrice: Number(e.target.value) || Infinity })}
              className="w-1/2 p-3 rounded-md bg-indigo-50 text-gray-900 font-open-sans"
            />
          </div>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2 font-roboto">Minimum Rating</h4>
          <input
            type="range"
            min="0"
            max="5"
            step="0.5"
            value={filters.minRating}
            onChange={(e) => handleFilterChange({ minRating: Number(e.target.value) })}
            className="w-full accent-indigo-600"
          />
          <p className="text-sm text-gray-700 font-open-sans mt-1">Rating: {filters.minRating}+</p>
        </div>
        {isMobile && (
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-indigo-600 to-amber-500 text-white px-6 py-3 rounded-full hover:bg-amber-600 transition-all duration-300 font-open-sans"
          >
            Apply Filters
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default ProductFilters;