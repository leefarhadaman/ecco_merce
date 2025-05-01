import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';
import { WishlistContext } from './WishlistContext';
import { CompareContext } from './CompareContext';
import { Product, type Category } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  Bars3Icon,
  ChevronDownIcon,
  ShoppingCartIcon,
  HeartIcon,
  UserIcon,
  ArrowsPointingOutIcon,
  ShoppingBagIcon,
  TagIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';

const Navbar = () => {
  const { cart } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);
  const { compareProducts, removeFromCompare } = useContext(CompareContext);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>(JSON.parse(localStorage.getItem('recentSearches') || '[]'));
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock login state
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  const categories: Category[] = [
    {
      name: 'Fashion',
      subcategories: [
        { name: 'Men' },
        { name: 'Women' },
        { name: 'Kids' },
        { name: 'Accessories' },
      ],
    },
    {
      name: 'Electronics',
      subcategories: [
        { name: 'Phones' },
        { name: 'Laptops' },
        { name: 'Tablets' },
        { name: 'Audio' },
      ],
    },
    {
      name: 'Home',
      subcategories: [
        { name: 'Furniture' },
        { name: 'Decor' },
        { name: 'Kitchen' },
        { name: 'Bedding' },
      ],
    },
    {
      name: 'Beauty',
      subcategories: [
        { name: 'Skincare' },
        { name: 'Makeup' },
        { name: 'Haircare' },
        { name: 'Fragrance' },
      ],
    },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (searchQuery.length > 1) {
      fetch('/products.json')
        .then((res) => res.json())
        .then((data) => {
          const filtered = data.filter((p: Product) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setSuggestions(filtered.slice(0, 5));
        });
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const updatedSearches = [searchQuery, ...recentSearches.filter((s) => s !== searchQuery)].slice(0, 5);
      setRecentSearches(updatedSearches);
      localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
    setIsProfileOpen(false);
    toast.success(isLoggedIn ? 'Logged out' : 'Logged in', {
      style: {
        background: '#4F46E5',
        color: '#fff',
      },
      iconTheme: {
        primary: '#F59E0B',
        secondary: '#fff',
      },
    });
  };

  // Calculate total items in cart for badge
  const cartItemCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);

  return (
    <>
      {/* Top Bar with Contact & Offers */}
      <div className="bg-gray-800 text-white py-2 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <PhoneIcon className="w-4 h-4 mr-1" />
              <span>1-800-ECO-BUY</span>
            </div>
            <div className="hidden md:flex items-center">
              <TagIcon className="w-4 h-4 mr-1" />
              <span>Free shipping on orders over $50</span>
            </div>
          </div>
          <div>
            <Link to="/deals" className="hover:text-amber-400 transition-colors">Today's Deals</Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <motion.nav
        className={`sticky top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white text-gray-800 shadow-lg'
            : 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white'
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Toaster position="top-right" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left section: Logo and Categories */}
            <div className="flex items-center space-x-8">
              {/* Mobile Menu Button */}
              <motion.button
                className="lg:hidden p-2 rounded-full hover:bg-opacity-80"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Menu"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Bars3Icon className="w-6 h-6" />
              </motion.button>

              {/* Logo */}
              <Link to="/" className="flex items-center space-x-2">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ShoppingBagIcon className={`w-8 h-8 ${scrolled ? 'text-indigo-600' : 'text-amber-400'}`} />
                </motion.div>
                <span className={`text-xl sm:text-2xl font-bold font-roboto ${scrolled ? 'text-indigo-600' : 'text-white'}`}>
                  EcoBuy
                </span>
              </Link>

              {/* Desktop Categories */}
              <div className="hidden lg:flex space-x-6">
                {categories.map((category) => (
                  <div
                    key={category.name}
                    className="relative group"
                    onMouseEnter={() => setIsCategoryOpen(category.name)}
                    onMouseLeave={() => setIsCategoryOpen(null)}
                  >
                    <button
                      className={`flex items-center space-x-1 py-5 ${
                        scrolled
                          ? 'text-gray-700 hover:text-indigo-600'
                          : 'text-white hover:text-amber-400'
                      } font-medium transition-colors`}
                    >
                      <span>{category.name}</span>
                      <ChevronDownIcon className="w-4 h-4" />
                    </button>
                    <AnimatePresence>
                      {isCategoryOpen === category.name && category.subcategories && (
                        <motion.div
                          className="absolute left-0 z-10 w-56 mt-1 rounded-md shadow-xl"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className={`p-4 ${scrolled ? 'bg-white' : 'bg-indigo-700'} grid gap-2`}>
                            {category.subcategories.map((sub) => (
                              <Link
                                key={sub.name}
                                to={`/category/${category.name.toLowerCase()}/${sub.name.toLowerCase()}`}
                                className={`block py-2 px-3 rounded-md ${
                                  scrolled
                                    ? 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
                                    : 'text-white hover:bg-indigo-600'
                                } transition-colors`}
                              >
                                {sub.name}
                              </Link>
                            ))}
                            <Link
                              to={`/category/${category.name.toLowerCase()}`}
                              className={`mt-2 block py-2 px-3 rounded-md font-medium ${
                                scrolled
                                  ? 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                                  : 'bg-indigo-600 text-white hover:bg-indigo-500'
                              } transition-colors text-center`}
                            >
                              View All {category.name}
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
                <Link
                  to="/deals"
                  className={`py-5 ${
                    scrolled
                      ? 'text-gray-700 hover:text-indigo-600'
                      : 'text-white hover:text-amber-400'
                  } font-medium transition-colors`}
                >
                  Deals
                </Link>
                <Link
                  to="/new"
                  className={`py-5 ${
                    scrolled
                      ? 'text-gray-700 hover:text-indigo-600'
                      : 'text-white hover:text-amber-400'
                  } font-medium transition-colors`}
                >
                  New Arrivals
                </Link>
              </div>
            </div>

            {/* Right: Search and Icons */}
            <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-4">
              {/* Search */}
              <div className="relative hidden md:block">
                <form onSubmit={handleSearch} className={`flex rounded-full overflow-hidden ${scrolled ? 'bg-gray-100' : 'bg-indigo-400 bg-opacity-50'}`}>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className={`py-2 pl-4 pr-10 w-36 sm:w-48 md:w-56 lg:w-64 focus:outline-none ${
                      scrolled ? 'bg-gray-100 text-gray-800' : 'bg-transparent text-white placeholder-indigo-100'
                    }`}
                  />
                  <motion.button
                    type="submit"
                    className={`absolute right-0 top-0 h-full px-3 flex items-center justify-center ${
                      scrolled ? 'text-gray-600 hover:text-indigo-600' : 'text-indigo-100 hover:text-white'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <MagnifyingGlassIcon className="w-5 h-5" />
                  </motion.button>
                </form>

                {/* Search Suggestions */}
                {suggestions.length > 0 && (
                  <motion.div
                    className="absolute right-0 top-full mt-1 bg-white rounded-md shadow-lg w-full z-50"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {suggestions.map((product) => (
                      <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        className="block px-4 py-3 hover:bg-indigo-50 transition-colors duration-300 font-open-sans text-gray-700"
                        onClick={() => {
                          setSearchQuery('');
                        }}
                      >
                        {product.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Mobile Search Button */}
              <motion.button
                onClick={() => setIsSearchOpen(true)}
                className={`md:hidden p-2 rounded-full ${
                  scrolled
                    ? 'hover:bg-gray-100'
                    : 'hover:bg-indigo-500'
                }`}
                aria-label="Search"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <MagnifyingGlassIcon className="w-6 h-6" />
              </motion.button>

              {/* Compare */}
              <div className="relative">
                <Link
                  to="/compare"
                  className={`relative p-2 rounded-full flex items-center justify-center ${
                    scrolled
                      ? 'hover:bg-gray-100'
                      : 'hover:bg-indigo-500'
                  }`}
                  onMouseEnter={() => setIsCompareOpen(true)}
                  onMouseLeave={() => setIsCompareOpen(false)}
                  aria-label="Compare Products"
                >
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <ArrowsPointingOutIcon className="w-6 h-6" />
                  </motion.div>
                  {compareProducts.length > 0 && (
                    <span className={`absolute -top-1 -right-1 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center ${
                      scrolled ? 'bg-indigo-600' : 'bg-amber-400'
                    }`}>
                      {compareProducts.length}
                    </span>
                  )}
                </Link>
                <AnimatePresence>
                  {isCompareOpen && compareProducts.length > 0 && (
                    <motion.div
                      className="absolute right-0 top-12 bg-white shadow-2xl rounded-xl p-4 w-72 z-50"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      onMouseEnter={() => setIsCompareOpen(true)}
                      onMouseLeave={() => setIsCompareOpen(false)}
                    >
                      <h4 className="text-sm font-semibold text-gray-900 font-roboto mb-2">Compare Products</h4>
                      <div className="max-h-60 overflow-y-auto">
                        {compareProducts.map((product) => (
                          <div key={product.id} className="flex items-center justify-between py-2 border-b border-gray-100">
                            <div className="flex items-center">
                              {product.image && (
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="w-10 h-10 object-cover rounded mr-2"
                                />
                              )}
                              <span className="text-sm text-gray-700 font-open-sans truncate max-w-36">{product.name}</span>
                            </div>
                            <motion.button
                              onClick={() => removeFromCompare(product.id)}
                              className="text-gray-400 hover:text-indigo-600"
                              aria-label="Remove"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <XMarkIcon className="w-4 h-4" />
                            </motion.button>
                          </div>
                        ))}
                      </div>
                      <Link
                        to="/compare"
                        className="block text-center bg-indigo-600 text-white px-4 py-2 rounded-md mt-3 font-open-sans hover:bg-indigo-700 transition-colors"
                      >
                        Compare Now
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className={`relative p-2 rounded-full flex items-center justify-center ${
                  scrolled
                    ? 'hover:bg-gray-100'
                    : 'hover:bg-indigo-500'
                }`}
                aria-label="Wishlist"
              >
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <HeartIcon className="w-6 h-6" />
                </motion.div>
                {wishlist.length > 0 && (
                  <span className={`absolute -top-1 -right-1 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center ${
                    scrolled ? 'bg-indigo-600' : 'bg-amber-400'
                  }`}>
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <div className="relative">
                <Link
                  to="/cart"
                  className={`relative p-2 rounded-full flex items-center justify-center ${
                    scrolled
                      ? 'hover:bg-gray-100'
                      : 'hover:bg-indigo-500'
                  }`}
                  onMouseEnter={() => setIsCartOpen(true)}
                  onMouseLeave={() => setIsCartOpen(false)}
                  aria-label="Shopping Cart"
                >
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <ShoppingCartIcon className="w-6 h-6" />
                  </motion.div>
                  {cartItemCount > 0 && (
                    <span className={`absolute -top-1 -right-1 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center ${
                      scrolled ? 'bg-indigo-600' : 'bg-amber-400'
                    }`}>
                      {cartItemCount}
                    </span>
                  )}
                </Link>
                <AnimatePresence>
                  {isCartOpen && cart.length > 0 && (
                    <motion.div
                      className="absolute right-0 top-12 bg-white shadow-2xl rounded-xl p-4 w-80 z-50"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      onMouseEnter={() => setIsCartOpen(true)}
                      onMouseLeave={() => setIsCartOpen(false)}
                    >
                      <h4 className="text-sm font-semibold text-gray-900 font-roboto mb-2">Your Cart</h4>
                      <div className="max-h-64 overflow-y-auto">
                        {cart.map((item) => (
                          <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-100">
                            <div className="flex items-center">
                              {item.image && (
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-12 h-12 object-cover rounded mr-3"
                                />
                              )}
                              <div>
                                <div className="text-sm text-gray-700 font-open-sans truncate max-w-36">{item.name}</div>
                                <div className="text-xs text-gray-500">
                                  Qty: {item.quantity || 1} × ${item.price.toFixed(2)}
                                </div>
                              </div>
                            </div>
                            <span className="text-sm font-medium text-indigo-600">
                              ${((item.quantity || 1) * item.price).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 pt-2 border-t border-gray-100">
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-gray-600">Subtotal:</span>
                          <span className="text-sm font-semibold text-gray-800">
                            ${cart.reduce((total, item) => total + ((item.quantity || 1) * item.price), 0).toFixed(2)}
                          </span>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <Link
                            to="/cart"
                            className="block text-center bg-indigo-600 text-white px-4 py-2 rounded-md font-open-sans hover:bg-indigo-700 transition-colors"
                          >
                            View Cart
                          </Link>
                          <Link
                            to="/checkout"
                            className="block text-center bg-amber-500 text-white px-4 py-2 rounded-md font-open-sans hover:bg-amber-600 transition-colors"
                          >
                            Checkout
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* User Account */}
              <div className="relative">
                <motion.button
                  className={`p-2 rounded-full flex items-center justify-center ${
                    scrolled
                      ? 'hover:bg-gray-100'
                      : 'hover:bg-indigo-500'
                  }`}
                  onMouseEnter={() => setIsProfileOpen(true)}
                  onMouseLeave={() => setIsProfileOpen(false)}
                  aria-label="Account"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <UserIcon className="w-6 h-6" />
                </motion.button>
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      className="absolute right-0 top-12 bg-white shadow-2xl rounded-xl p-4 w-56 z-50"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      onMouseEnter={() => setIsProfileOpen(true)}
                      onMouseLeave={() => setIsProfileOpen(false)}
                    >
                      {isLoggedIn ? (
                        <>
                          <div className="text-sm font-semibold text-gray-900 pb-3 mb-3 border-b border-gray-100">
                            Hello, User!
                          </div>
                          <Link
                            to="/profile"
                            className="flex items-center py-2 text-gray-700 hover:text-indigo-600 font-open-sans"
                          >
                            <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            My Account
                          </Link>
                          <Link
                            to="/orders"
                            className="flex items-center py-2 text-gray-700 hover:text-indigo-600 font-open-sans"
                          >
                            <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            Orders
                          </Link>
                          <Link
                            to="/settings"
                            className="flex items-center py-2 text-gray-700 hover:text-indigo-600 font-open-sans"
                          >
                            <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Settings
                          </Link>
                          <motion.button
                            onClick={handleLogin}
                            className="flex items-center w-full py-2 text-gray-700 hover:text-indigo-600 font-open-sans mt-2 pt-2 border-t border-gray-100"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Logout
                          </motion.button>
                        </>
                      ) : (
                        <>
                          <div className="text-center mb-4">
                            <h4 className="font-medium text-gray-800 mb-1">Welcome to EcoBuy</h4>
                            <p className="text-sm text-gray-500">Sign in to access your account</p>
                          </div>
                          <motion.button
                            onClick={handleLogin}
                            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors mb-2"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Login
                          </motion.button>
                          <Link
                            to="/register"
                            className="block w-full text-center border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-50 transition-colors"
                          >
                            Register
                          </Link>
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 z-50 bg-white"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col h-full overflow-y-auto">
              <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <Link to="/" className="flex items-center space-x-2" onClick={() => setIsMenuOpen(false)}>
                  <ShoppingBagIcon className="w-8 h-8 text-indigo-600" />
                  <span className="text-2xl font-bold font-roboto text-indigo-600">
                    EcoBuy
                  </span>
                </Link>
                <motion.button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100"
                  aria-label="Close menu"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <XMarkIcon className="w-6 h-6 text-gray-600" />
                </motion.button>
              </div>

              <div className="p-4 flex items-center">
                <form onSubmit={handleSearch} className="flex w-full relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="py-2 px-4 w-full bg-gray-100 rounded-md text-gray-800 focus:outline-none"
                  />
                  <motion.button
                    type="submit"
                    className="absolute right-0 top-0 h-full px-3 flex items-center justify-center text-gray-600"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <MagnifyingGlassIcon className="w-5 h-5" />
                  </motion.button>
                </form>
              </div>

              <div className="flex-1 overflow-y-auto">
                {/* User Info Section (Mobile) */}
                <div className="p-4 bg-indigo-50 mb-4">
                  {isLoggedIn ? (
                    <div className="flex items-center">
                      <div className="bg-indigo-600 rounded-full w-12 h-12 flex items-center justify-center text-white mr-3">
                        <UserIcon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Hello, User!</p>
                        <p className="text-sm text-gray-500">Welcome back</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col space-y-2">
                      <motion.button
                        onClick={handleLogin}
                        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Login
                      </motion.button>
                      <Link
                        to="/register"
                        className="w-full bg-white text-indigo-600 border border-indigo-600 py-2 rounded-md text-center hover:bg-indigo-50 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Register
                      </Link>
                    </div>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 px-4 mb-6 max-[400px]:grid-cols-1">
                  <Link
                    to="/cart"
                    className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <ShoppingCartIcon className="w-6 h-6 text-indigo-600 mb-1" />
                    <span className="text-sm text-gray-800">Cart ({cartItemCount})</span>
                  </Link>
                  <Link
                    to="/wishlist"
                    className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <HeartIcon className="w-6 h-6 text-indigo-600 mb-1" />
                    <span className="text-sm text-gray-800">Wishlist ({wishlist.length})</span>
                  </Link>
                  <Link
                    to="/compare"
                    className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <ArrowsPointingOutIcon className="w-6 h-6 text-indigo-600 mb-1" />
                    <span className="text-sm text-gray-800">Compare ({compareProducts.length})</span>
                  </Link>
                  <Link
                    to="/orders"
                    className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <svg className="w-6 h-6 text-indigo-600 mb-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <span className="text-sm text-gray-800">Orders</span>
                  </Link>
                </div>

                {/* Categories */}
                <div className="px-4 mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category.name} className="mb-3">
                        <motion.button
                          onClick={() => setIsCategoryOpen(isCategoryOpen === category.name ? null : category.name)}
                          className="flex items-center justify-between w-full py-2 px-3 bg-gray-100 rounded-md text-gray-800 hover:bg-gray-200 transition-colors"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="font-medium">{category.name}</span>
                          <ChevronDownIcon className={`w-5 h-5 transition-transform ${isCategoryOpen === category.name ? 'rotate-180' : ''}`} />
                        </motion.button>
                        <AnimatePresence>
                          {isCategoryOpen === category.name && category.subcategories && (
                            <motion.div
                              className="pl-4 mt-2 space-y-1"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              {category.subcategories.map((sub) => (
                                <Link
                                  key={sub.name}
                                  to={`/category/${category.name.toLowerCase()}/${sub.name.toLowerCase()}`}
                                  className="block py-2 text-gray-700 hover:text-indigo-600"
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  {sub.name}
                                </Link>
                              ))}
                              <Link
                                to={`/category/${category.name.toLowerCase()}`}
                                className="block py-2 mt-1 text-indigo-600 font-medium"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                View All {category.name}
                              </Link>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Additional Links */}
                <div className="space-y-1 px-4">
                  <Link
                    to="/deals"
                    className="block p-3 text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="flex items-center">
                      <TagIcon className="w-5 h-5 mr-3 text-indigo-600" />
                      Today's Deals
                    </span>
                  </Link>
                  <Link
                    to="/new"
                    className="block p-3 text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="flex items-center">
                      <svg className="w-5 h-5 mr-3 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                      </svg>
                      New Arrivals
                    </span>
                  </Link>
                  <Link
                    to="/contact"
                    className="block p-3 text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="flex items-center">
                      <PhoneIcon className="w-5 h-5 mr-3 text-indigo-600" />
                      Contact Us
                    </span>
                  </Link>
                </div>
              </div>

              {/* Footer Section */}
              {isLoggedIn && (
                <div className="mt-auto p-4 border-t border-gray-200">
                  <motion.button
                    onClick={() => {
                      handleLogin();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center text-gray-700 hover:text-indigo-600"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Search Overlay (Mobile) */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            className="fixed inset-0 bg-white z-50 p-4 flex flex-col"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Search Products</h3>
              <motion.button
                onClick={() => {
                  setSearchQuery('');
                  setIsSearchOpen(false);
                }}
                className="p-2 rounded-full hover:bg-gray-100"
                aria-label="Close search"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <XMarkIcon className="w-6 h-6 text-gray-600" />
              </motion.button>
            </div>

            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  autoFocus
                />
                {searchQuery && (
                  <motion.button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <XMarkIcon className="w-5 h-5 text-gray-400" />
                  </motion.button>
                )}
              </div>
            </form>

            {/* Recent Searches */}
            {recentSearches.length > 0 && !searchQuery && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-700">Recent Searches</h4>
                  <motion.button
                    className="text-xs text-indigo-600"
                    onClick={() => {
                      setRecentSearches([]);
                      localStorage.setItem('recentSearches', JSON.stringify([]));
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Clear All
                  </motion.button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((search, index) => (
                    <motion.button
                      key={index}
                      onClick={() => {
                        setSearchQuery(search);
                        navigate(`/search?q=${encodeURIComponent(search)}`);
                        setIsSearchOpen(false);
                      }}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {search}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Search Results */}
            {suggestions.length > 0 && (
              <div className="flex-1 overflow-y-auto">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Suggestions</h4>
                <div className="space-y-1">
                  {suggestions.map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.id}`}
                      className="flex items-center p-3 hover:bg-gray-100 rounded-lg transition-colors"
                      onClick={() => {
                        setSearchQuery('');
                        setIsSearchOpen(false);
                      }}
                    >
                      {product.image && (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded mr-3"
                        />
                      )}
                      <div>
                        <div className="text-gray-800">{product.name}</div>
                        <div className="text-sm text-indigo-600">${product.price.toFixed(2)}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Popular Searches */}
            {!searchQuery && !suggestions.length && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Popular Searches</h4>
                <div className="flex flex-wrap gap-2">
                  {['Smartphones', 'Laptops', 'Headphones', 'Smart Watches', 'Cameras'].map((term, index) => (
                    <motion.button
                      key={index}
                      onClick={() => {
                        setSearchQuery(term);
                        navigate(`/search?q=${encodeURIComponent(term)}`);
                        setIsSearchOpen(false);
                      }}
                      className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm hover:bg-indigo-200 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {term}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;