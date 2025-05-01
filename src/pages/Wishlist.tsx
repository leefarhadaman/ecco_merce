import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { WishlistContext } from '../components/WishlistContext';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';
import { Product } from '../types';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

const Wishlist = () => {
  const { wishlist } = useContext(WishlistContext);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);


  return (
    <motion.div
      className="max-w-7xl mx-auto my-8 pt-20 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Toaster position="top-right" />
      <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-poppins mb-6">Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <div className="text-center text-slate-700 font-inter">
          <p className="text-xl mb-4">Your wishlist is empty.</p>
          <Link
            to="/"
            className="bg-gradient-to-r from-teal-500 to-coral-500 text-white px-6 py-3 rounded-full hover:bg-coral-600 transition-all duration-300 font-inter"
          >
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((product) => (
             <ProductCard
             key={product.id}
             product={product}
           />
          ))}
        </div>
      )}
      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </motion.div>
  );
};

export default Wishlist;