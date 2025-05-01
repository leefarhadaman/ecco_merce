import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    fetch('/products.json')
      .then((res) => res.json())
      .then((data) => {
        const trending = data.filter((p: Product) => p.rating > 4.5).slice(0, 6);
        setFeaturedProducts(trending);
      });
  }, []);

  const categories = [
    { name: 'Fashion', image: 'https://img.freepik.com/free-vector/hand-drawn-fashion-shop-pattern-background_23-2150849915.jpg?semt=ais_hybrid&w=740' },
    { name: 'Electronics', image: 'https://ecelectronics.com/wp-content/uploads/2020/04/Modern-Electronics-EC-.jpg' },
    { name: 'Home', image: 'https://www.shutterstock.com/image-illustration/3d-variety-home-appliances-concept-600nw-2048419898.jpg' },
    { name: 'Beauty', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUhejO33GvUBrdyhWShK6WPwNGCCQKibGEWA&s' },
  ];

  const nextSlide = () => {
    setCarouselIndex((prev) => (prev + 1) % Math.ceil(featuredProducts.length / 3));
  };

  const prevSlide = () => {
    setCarouselIndex((prev) => (prev - 1 + Math.ceil(featuredProducts.length / 3)) % Math.ceil(featuredProducts.length / 3));
  };

  return (
    <motion.div
      className="max-w-7xl mx-auto pt-20 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Toaster position="top-right" />
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-indigo-600 to-amber-500 text-white rounded-2xl p-8 mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold font-roboto mb-4">Discover the Latest Trends</h1>
        <p className="text-lg sm:text-xl font-open-sans mb-6">Shop exclusive deals on fashion, electronics, and more!</p>
        <Link
          to="/categories"
          className="bg-white text-indigo-600 px-6 py-3 rounded-full font-open-sans font-semibold hover:bg-amber-100 transition-all duration-300"
        >
          Shop Now
        </Link>
        <img
          src="https://via.placeholder.com/300x300?text=Hero"
          alt="Hero"
          className="absolute right-4 top-4 w-32 sm:w-48 h-32 sm:h-48 object-cover rounded-lg hidden sm:block"
        />
      </div>

      {/* Featured Products Carousel */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 font-roboto mb-6">Featured Products</h2>
        <div className="relative">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            animate={{ x: -carouselIndex * 100 + '%' }}
            transition={{ duration: 0.5 }}
          >
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </motion.div>
          {featuredProducts.length > 3 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-indigo-600 text-white p-2 rounded-full"
              >
                <ChevronLeftIcon className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-indigo-600 text-white p-2 rounded-full"
              >
                <ChevronRightIcon className="w-6 h-6" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Category Tiles */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 font-roboto mb-6">Shop by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/category/${category.name.toLowerCase()}`}
              className="relative rounded-2xl overflow-hidden shadow-lg group"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent flex items-end">
                <h3 className="text-white text-xl font-roboto font-semibold p-4">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Home;