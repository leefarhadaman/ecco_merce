import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CartContext } from '../components/CartContext';
import { Product } from '../types';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    fetch('/products.json')
      .then((res) => res.json())
      .then((data) => {
        const foundProduct = data.find((p: Product) => p.id === Number(id));
        setProduct(foundProduct || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching product:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="text-center text-gray-800 my-10 animate-pulse">Loading...</div>;
  }

  if (!product) {
    return (
      <div className="text-center text-gray-800 my-10 animate-fade-in">
        Product not found.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto my-6 pt-20 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg shadow-md"
          />
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
          <p className="text-coral-500 text-2xl font-bold mb-4">${product.price.toFixed(2)}</p>
          <div className="flex items-center mb-4">
            <svg
              className="w-5 h-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-gray-600 ml-2">{product.rating}</span>
          </div>
          <button
            onClick={() => addToCart(product)}
            className="bg-teal-500 text-white px-6 py-3 rounded-full hover:bg-teal-600 transition-all duration-300 transform hover:scale-105 w-full mb-4"
          >
            Add to Cart
          </button>
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => setActiveTab('description')}
              className={`px-4 py-2 rounded-full ${
                activeTab === 'description'
                  ? 'bg-teal-500 text-white'
                  : 'bg-gray-200 text-gray-800'
              } transition-all duration-300`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('specifications')}
              className={`px-4 py-2 rounded-full ${
                activeTab === 'specifications'
                  ? 'bg-teal-500 text-white'
                  : 'bg-gray-200 text-gray-800'
              } transition-all duration-300`}
            >
              Specifications
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-4 py-2 rounded-full ${
                activeTab === 'reviews'
                  ? 'bg-teal-500 text-white'
                  : 'bg-gray-200 text-gray-800'
              } transition-all duration-300`}
            >
              Reviews
            </button>
          </div>
          <div className="animate-fade-in">
            {activeTab === 'description' && (
              <p className="text-gray-600">{product.description}</p>
            )}
            {activeTab === 'specifications' && (
              <ul className="text-gray-600 list-disc pl-5">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key}:</strong> {value}
                  </li>
                ))}
              </ul>
            )}
            {activeTab === 'reviews' && (
              <p className="text-gray-600">No reviews yet. Be the first to review!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;