import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../components/CartContext';
import { Product } from '../types'
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { XMarkIcon } from '@heroicons/react/24/outline';

const Cart = () => {
  const { cart, removeItem, updateQuantity } = useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  return (
    <motion.div
      className="max-w-7xl mx-auto my-8 pt-20 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Toaster position="top-right" />
      <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-poppins mb-6">Your Cart</h2>
      {cart.length === 0 ? (
        <div className="text-center text-slate-700 font-inter">
          <p className="text-xl mb-4">Your cart is empty.</p>
          <Link
            to="/"
            className="bg-gradient-to-r from-teal-500 to-coral-500 text-white px-6 py-3 rounded-full hover:bg-coral-600 transition-all duration-300 font-inter"
          >
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {cart.map((item: Product) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-start sm:items-center bg-white rounded-2xl p-4 shadow-lg border border-teal-200"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg mb-4 sm:mb-0 sm:mr-4"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-900 font-inter">{item.name}</h3>
                <p className="text-coral-500 font-bold font-inter">${item.price.toFixed(2)}</p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                    className="px-2 py-1 bg-teal-100 text-teal-600 rounded-l-md hover:bg-teal-200"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 bg-teal-50 text-slate-900 font-inter">
                    {item.quantity || 1}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                    className="px-2 py-1 bg-teal-100 text-teal-600 rounded-r-md hover:bg-teal-200"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="mt-4 sm:mt-0 text-slate-600 hover:text-coral-500"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
          ))}
          <div className="flex justify-between items-center bg-teal-100 p-4 rounded-2xl">
            <h3 className="text-xl font-semibold text-slate-900 font-inter">Total:</h3>
            <p className="text-2xl font-bold text-coral-500 font-inter">${total.toFixed(2)}</p>
          </div>
          <Link
            to="/checkout"
            className="block w-full text-center bg-gradient-to-r from-teal-500 to-coral-500 text-white px-6 py-4 rounded-full hover:bg-coral-600 transition-all duration-300 font-inter text-lg"
          >
            Proceed to Checkout
          </Link>
        </div>
      )}
    </motion.div>
  );
};

export default Cart;