import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HeroBanner = () => {
  const banners = [
    {
      image: 'https://images.unsplash.com/photo-1476966502122-c26b7830def9?q=80&w=3590&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Timeless Elegance Awaits',
      subtitle: 'Up to 50% Off Designer Fashion',
      cta: 'Shop Now',
      link: '/category/fashion',
    },
    {
      image: 'https://plus.unsplash.com/premium_photo-1675362077900-280fe84c996c?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Cutting-Edge Innovation',
      subtitle: 'Discover the Latest in Tech',
      cta: 'Explore Now',
      link: '/category/electronics',
    },
    {
      image: 'https://eu-images.contentstack.com/v3/assets/blt07f68461ccd75245/blt0a3d4f098433d5aa/6679d89c88feaef9eb676ff0/innovation-1716x965.jpg?width=1280&auto=webp&quality=95&format=jpg&disable=upscale',
      title: 'Complimentary Shipping',
      subtitle: 'On Orders Over $100',
      cta: 'Start Shopping',
      link: '/',
    },
  ];
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <div className="relative max-w-full mx-auto my-8 overflow-hidden">
      <motion.div
        key={currentBanner}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        <img
          src={banners[currentBanner].image}
          alt={banners[currentBanner].title}
          className="w-full h-[600px] object-cover"
          style={{ filter: 'brightness(0.7)' }}
        />
        <div className="absolute top-1/2 left-12 transform -translate-y-1/2 text-ivory-100">
          <h2 className="text-5xl font-bold mb-4 font-playfair">{banners[currentBanner].title}</h2>
          <p className="text-xl mb-6 font-montserrat">{banners[currentBanner].subtitle}</p>
          <Link
            to={banners[currentBanner].link}
            className="bg-gradient-to-r from-navy-700 to-navy-900 text-ivory-100 px-8 py-4 rounded-full hover:bg-gold-500 hover:text-charcoal-900 transition-all duration-300 transform hover:scale-105 font-montserrat"
          >
            {banners[currentBanner].cta}
          </Link>
        </div>
      </motion.div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentBanner(index)}
            className={`w-3 h-3 rounded-full ${index === currentBanner ? 'bg-gold-500' : 'bg-ivory-300'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;