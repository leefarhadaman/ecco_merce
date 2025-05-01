import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

const Compare = () => {
  const [compareProducts, setCompareProducts] = useState<Product[]>(JSON.parse(localStorage.getItem('compareProducts') || '[]'));

  const removeFromCompare = (productId: number) => {
    const updated = compareProducts.filter((p: Product) => p.id !== productId);
    setCompareProducts(updated);
    localStorage.setItem('compareProducts', JSON.stringify(updated));
  };

  return (
    <motion.div
      className="max-w-7xl mx-auto my-8 pt-20 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Toaster position="top-right" />
      <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-poppins mb-6">Compare Products</h2>
      {compareProducts.length === 0 ? (
        <div className="text-center text-slate-700 font-inter">
          <p className="text-xl mb-4">No products selected for comparison.</p>
          <Link
            to="/"
            className="bg-gradient-to-r from-teal-500 to-coral-500 text-white px-6 py-3 rounded-full hover:bg-coral-600 transition-all duration-300 font-inter"
          >
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-teal-100">
                <th className="p-4 text-left text-slate-900 font-inter font-semibold">Feature</th>
                {compareProducts.map((product: Product) => (
                  <th key={product.id} className="p-4 text-center">
                    <div className="flex flex-col items-center">
                      <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded-lg mb-2" />
                      <h3 className="text-lg font-semibold text-slate-900 font-inter">{product.name}</h3>
                      <button
                        onClick={() => removeFromCompare(product.id)}
                        className="text-coral-500 text-sm font-inter hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-teal-200">
                <td className="p-4 text-slate-700 font-inter font-semibold">Price</td>
                {compareProducts.map((product: Product) => (
                  <td key={product.id} className="p-4 text-center text-coral-500 font-inter">
                    ${product.price.toFixed(2)}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-teal-200">
                <td className="p-4 text-slate-700 font-inter font-semibold">Rating</td>
                {compareProducts.map((product: Product) => (
                  <td key={product.id} className="p-4 text-center text-slate-700 font-inter">
                    {product.rating}
                  </td>
                ))}
              </tr>
              {Object.keys(compareProducts[0]?.specifications || {}).map((key) => (
                <tr key={key} className="border-b border-teal-200">
                  <td className="p-4 text-slate-700 font-inter font-semibold">{key}</td>
                  {compareProducts.map((product: Product) => (
                    <td key={product.id} className="p-4 text-center text-slate-700 font-inter">
                      {product.specifications[key] || '-'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

export default Compare;