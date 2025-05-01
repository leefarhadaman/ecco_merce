import { useState, useEffect, useRef, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import ProductFilters from '../components/ProductFilters';
import QuickViewModal from '../components/QuickViewModal';
import { CompareContext } from '../components/CompareContext';
import { Product, type Category } from '../types';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { FunnelIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Category = () => {
  const { categoryName, subCategory, subSubCategory } = useParams<{
    categoryName?: string;
    subCategory?: string;
    subSubCategory?: string;
  }>();
  const { compareProducts } = useContext(CompareContext);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const loaderRef = useRef<HTMLDivElement>(null);

  const categories: Category[] = [
    {
      name: 'Fashion',
      subcategories: [
        { name: 'Men', subcategories: [{ name: 'Shirts' }, { name: 'Pants' }] },
        { name: 'Women', subcategories: [{ name: 'Dresses' }, { name: 'Tops' }] },
      ],
    },
    {
      name: 'Electronics',
      subcategories: [
        { name: 'Phones', subcategories: [{ name: 'Smartphones' }, { name: 'Accessories' }] },
        { name: 'Laptops', subcategories: [{ name: 'Gaming' }, { name: 'Ultrabooks' }] },
      ],
    },
    { name: 'Home', subcategories: [{ name: 'Furniture' }, { name: 'Decor' }] },
    { name: 'Beauty', subcategories: [{ name: 'Skincare' }, { name: 'Makeup' }] },
  ];

  useEffect(() => {
    fetch('/products.json')
      .then((res) => res.json())
      .then((data) => {
        let filtered = data;
        if (categoryName) {
          filtered = filtered.filter((p: Product) =>
            p.category[0].toLowerCase() === categoryName.toLowerCase()
          );
        }
        if (subCategory) {
          filtered = filtered.filter((p: Product) =>
            p.category[1]?.toLowerCase() === subCategory.toLowerCase()
          );
        }
        if (subSubCategory) {
          filtered = filtered.filter((p: Product) =>
            p.category[2]?.toLowerCase() === subSubCategory.toLowerCase()
          );
        }
        setProducts(filtered);
        setFilteredProducts(filtered.slice(0, 12));
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
  }, [categoryName, subCategory, subSubCategory]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.1 }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [loading]);

  useEffect(() => {
    setFilteredProducts(products.slice(0, page * 12));
  }, [page, products]);

  const handleFilterChange = (filters: {
    sort: string;
    category: string;
    minPrice: number;
    maxPrice: number;
    minRating: number;
  }) => {
    let result = [...products];
    if (filters.category && !categoryName) {
      result = result.filter((p) => p.category[0] === filters.category);
    }
    result = result.filter((p) => p.price >= filters.minPrice && p.price <= filters.maxPrice);
    result = result.filter((p) => p.rating >= filters.minRating);
    if (filters.sort === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.sort === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (filters.sort === 'rating-desc') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (filters.sort === 'newest') {
      result.sort((a, b) => b.id - a.id);
    }
    setProducts(result);
    setFilteredProducts(result.slice(0, page * 12));
  };

  if (loading && page === 1) {
    return <div className="text-center text-gray-900 my-10 animate-pulse font-open-sans">Loading...</div>;
  }

  return (
    <motion.div
      className="max-w-7xl mx-auto my-8 pt-20 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Toaster position="top-right" />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 font-roboto">
          {subSubCategory || subCategory || categoryName || 'All Categories'}
        </h2>
        <div className="flex gap-2">
          <button
            className="p-2 bg-indigo-600 text-white rounded-full hover:bg-amber-500"
            onClick={() => setIsCategoryModalOpen(true)}
          >
            <Bars3Icon className="w-6 h-6" />
          </button>
          <button
            className="p-2 bg-indigo-600 text-white rounded-full hover:bg-amber-500"
            onClick={() => setIsFilterOpen(true)}
          >
            <FunnelIcon className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Category Modal */}
      {isCategoryModalOpen && (
        <motion.div
          className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl p-6 max-w-md w-full mx-4"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-gray-900 font-roboto">Categories</h3>
              <button
                onClick={() => setIsCategoryModalOpen(false)}
                className="text-gray-600 hover:text-amber-500"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              {categories.map((category) => (
                <div key={category.name}>
                  <Link
                    to={`/category/${category.name.toLowerCase()}`}
                    className="block py-2 text-gray-700 hover:text-amber-500 font-open-sans"
                    onClick={() => setIsCategoryModalOpen(false)}
                  >
                    {category.name}
                  </Link>
                  {category.subcategories && (
                    <div className="pl-4">
                      {category.subcategories.map((sub) => (
                        <div key={sub.name}>
                          <Link
                            to={`/category/${category.name.toLowerCase()}/${sub.name.toLowerCase()}`}
                            className="block py-1 text-gray-600 hover:text-amber-500 font-open-sans text-sm"
                            onClick={() => setIsCategoryModalOpen(false)}
                          >
                            {sub.name}
                          </Link>
                          {sub.subcategories && (
                            <div className="pl-4">
                              {sub.subcategories.map((subSub) => (
                                <Link
                                  key={subSub.name}
                                  to={`/category/${category.name.toLowerCase()}/${sub.name.toLowerCase()}/${subSub.name.toLowerCase()}`}
                                  className="block py-1 text-gray-600 hover:text-amber-500 font-open-sans text-sm"
                                  onClick={() => setIsCategoryModalOpen(false)}
                                >
                                  {subSub.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Filter Modal */}
      {isFilterOpen && (
        <motion.div
          className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <ProductFilters
            onFilterChange={handleFilterChange}
            isMobile
            onClose={() => setIsFilterOpen(false)}
          />
        </motion.div>
      )}

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center text-gray-700 font-open-sans">
          <p className="text-xl mb-4">No products found in this category.</p>
          <Link
            to="/"
            className="bg-gradient-to-r from-indigo-600 to-amber-500 text-white px-6 py-3 rounded-full hover:bg-amber-600 transition-all duration-300 font-open-sans"
          >
            Back to Home
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
      <div ref={loaderRef} className="h-10" />
      {loading && <div className="text-center text-gray-900 animate-pulse font-open-sans">Loading more...</div>}

      {compareProducts.length > 1 && (
        <div className="fixed bottom-4 right-4 bg-indigo-600 text-white p-4 rounded-full shadow-xl">
          <Link to="/compare" className="font-open-sans">
            Compare {compareProducts.length} Products
          </Link>
        </div>
      )}

      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </motion.div>
  );
};

export default Category;