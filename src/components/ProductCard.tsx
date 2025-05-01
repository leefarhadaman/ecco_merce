import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';
import { WishlistContext } from './WishlistContext';
import { CompareContext } from './CompareContext';
import QuickViewModal from './QuickViewModal';
import { Product } from '../types';
import { HeartIcon, EyeIcon, ArrowsPointingOutIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useContext(CartContext);
  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  const { addToCompare } = useContext(CompareContext);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const badge = product.id % 3 === 0 ? 'New' : product.price < 50 ? 'Sale' : product.rating > 4.5 ? 'Trending' : null;

  return (
    <>
      <motion.div
        className="bg-white rounded-2xl p-4 shadow-lg transition-all duration-300 hover:shadow-xl border border-indigo-100"
        whileHover={{ y: -5 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Link to={`/product/${product.id}`}>
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-56 sm:h-64 object-cover rounded-lg mb-4 transition-transform duration-300 hover:scale-105"
            />
            {badge && (
              <span
                className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-open-sans ${
                  badge === 'New' ? 'bg-indigo-600 text-white' : badge === 'Sale' ? 'bg-amber-500 text-white' : 'bg-yellow-400 text-gray-900'
                }`}
              >
                {badge}
              </span>
            )}
          </div>
          <h3 className="text-lg font-semibold text-gray-900 truncate font-roboto">{product.name}</h3>
          <p className="text-amber-500 font-bold text-base sm:text-lg font-open-sans">${product.price.toFixed(2)}</p>
          <div className="flex justify-center items-center mt-2">
            <svg
              className="w-4 h-4 text-amber-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-gray-600 ml-1 font-open-sans text-sm">{product.rating}</span>
          </div>
        </Link>
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => {
              addToCart(product);
              toast.success(`${product.name} added to cart!`);
            }}
            className="flex-1 bg-gradient-to-r from-indigo-600 to-amber-500 text-white px-4 py-2 rounded-full hover:bg-amber-600 transition-all duration-300 font-open-sans"
          >
            <ShoppingCartIcon className="w-5 h-5 inline mr-2" />
            Add
          </button>
          <button
            onClick={() => {
              toggleWishlist(product);
              toast.success(wishlist.some((p) => p.id === product.id) ? 'Removed from wishlist' : 'Added to wishlist');
            }}
            className={`p-2 rounded-full ${wishlist.some((p) => p.id === product.id) ? 'bg-amber-500 text-white' : 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200'}`}
          >
            <HeartIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsQuickViewOpen(true)}
            className="p-2 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
          >
            <EyeIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => addToCompare(product)}
            className="p-2 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
          >
            <ArrowsPointingOutIcon className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
      <QuickViewModal product={isQuickViewOpen ? product : null} onClose={() => setIsQuickViewOpen(false)} />
    </>
  );
};

export default ProductCard;