import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';
import { WishlistContext } from './WishlistContext';
import { Product } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, HeartIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

const QuickViewModal = ({ product, onClose }: QuickViewModalProps) => {
  const { addToCart } = useContext(CartContext);
  const { wishlist, toggleWishlist } = useContext(WishlistContext);

  if (!product) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-2xl p-6 max-w-2xl w-full mx-4 relative"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-amber-500"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={product.image}
              alt={product.name}
              className="w-full md:w-1/2 h-64 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 font-roboto mb-2">{product.name}</h3>
              <p className="text-amber-500 font-bold text-lg font-open-sans mb-2">${product.price.toFixed(2)}</p>
              <div className="flex items-center mb-2">
                <svg
                  className="w-5 h-5 text-amber-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-gray-600 ml-1 font-open-sans">{product.rating}</span>
              </div>
              <p className="text-gray-700 font-open-sans mb-4">{product.description}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    addToCart(product);
                    toast.success(`${product.name} added to cart!`);
                  }}
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-amber-500 text-white px-4 py-2 rounded-full hover:bg-amber-600 transition-all duration-300 font-open-sans"
                >
                  <ShoppingCartIcon className="w-5 h-5 inline mr-2" />
                  Add to Cart
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
              </div>
              <Link
                to={`/product/${product.id}`}
                className="block text-center text-indigo-600 hover:text-amber-500 font-open-sans mt-4"
              >
                View Full Details
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default QuickViewModal;