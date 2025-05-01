import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../components/CartContext';
import { Product } from '../types';

const Checkout = () => {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    zip: '',
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const handleConfirmOrder = () => {
    alert('Order placed successfully!');
    navigate('/');
  };

  return (
    <div className="max-w-7xl mx-auto my-6 pt-20 animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Checkout</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="flex justify-between mb-6">
            <button
              className={`flex-1 py-2 rounded-full ${
                step === 1 ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-800'
              }`}
            >
              Cart Review
            </button>
            <button
              className={`flex-1 py-2 rounded-full ${
                step === 2 ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-800'
              }`}
            >
              Shipping
            </button>
            <button
              className={`flex-1 py-2 rounded-full ${
                step === 3 ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-800'
              }`}
            >
              Payment
            </button>
          </div>
          {step === 1 && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Cart Review</h3>
              {cart.map((item: Product) => (
                <div key={item.id} className="flex items-center mb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md mr-4"
                  />
                  <div>
                    <p className="text-gray-800 font-medium">{item.name}</p>
                    <p className="text-coral-500">
                      ${item.price.toFixed(2)} x {item.quantity || 1}
                    </p>
                  </div>
                </div>
              ))}
              <button
                onClick={() => setStep(2)}
                className="bg-teal-500 text-white px-6 py-3 rounded-full hover:bg-teal-600 transition-all duration-300 w-full"
              >
                Proceed to Shipping
              </button>
            </div>
          )}
          {step === 2 && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Shipping Information</h3>
              <form onSubmit={handleShippingSubmit}>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={shippingInfo.name}
                  onChange={(e) =>
                    setShippingInfo({ ...shippingInfo, name: e.target.value })
                  }
                  className="w-full p-3 mb-4 rounded-full bg-gray-100 focus:outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="Street Address"
                  value={shippingInfo.street}
                  onChange={(e) =>
                    setShippingInfo({ ...shippingInfo, street: e.target.value })
                  }
                  className="w-full p-3 mb-4 rounded-full bg-gray-100 focus:outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="City"
                  value={shippingInfo.city}
                  onChange={(e) =>
                    setShippingInfo({ ...shippingInfo, city: e.target.value })
                  }
                  className="w-full p-3 mb-4 rounded-full bg-gray-100 focus:outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="State"
                  value={shippingInfo.state}
                  onChange={(e) =>
                    setShippingInfo({ ...shippingInfo, state: e.target.value })
                  }
                  className="w-full p-3 mb-4 rounded-full bg-gray-100 focus:outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="ZIP Code"
                  value={shippingInfo.zip}
                  onChange={(e) =>
                    setShippingInfo({ ...shippingInfo, zip: e.target.value })
                  }
                  className="w-full p-3 mb-4 rounded-full bg-gray-100 focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="bg-teal-500 text-white px-6 py-3 rounded-full hover:bg-teal-600 transition-all duration-300 w-full"
                >
                  Proceed to Payment
                </button>
              </form>
            </div>
          )}
          {step === 3 && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Payment Information</h3>
              <form onSubmit={handlePaymentSubmit}>
                <input
                  type="text"
                  placeholder="Card Number"
                  value={paymentInfo.cardNumber}
                  onChange={(e) =>
                    setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })
                  }
                  className="w-full p-3 mb-4 rounded-full bg-gray-100 focus:outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={paymentInfo.expiry}
                  onChange={(e) =>
                    setPaymentInfo({ ...paymentInfo, expiry: e.target.value })
                  }
                  className="w-full p-3 mb-4 rounded-full bg-gray-100 focus:outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="CVV"
                  value={paymentInfo.cvv}
                  onChange={(e) =>
                    setPaymentInfo({ ...paymentInfo, cvv: e.target.value })
                  }
                  className="w-full p-3 mb-4 rounded-full bg-gray-100 focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="bg-teal-500 text-white px-6 py-3 rounded-full hover:bg-teal-600 transition-all duration-300 w-full"
                >
                  Confirm Order
                </button>
              </form>
            </div>
          )}
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h3>
          {cart.map((item: Product) => (
            <div key={item.id} className="flex items-center mb-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 object-cover rounded-md mr-3"
              />
              <div>
                <p className="text-gray-800">{item.name}</p>
                <p className="text-coral-500">
                  ${item.price.toFixed(2)} x {item.quantity || 1}
                </p>
              </div>
            </div>
          ))}
          <p className="text-gray-600 mb-2">Subtotal: ${total.toFixed(2)}</p>
          <p className="text-gray-600 mb-4">Shipping: Free</p>
          <p className="text-coral-500 font-bold text-lg mb-4">
            Total: ${total.toFixed(2)}
          </p>
          {step === 3 && (
            <button
              onClick={handleConfirmOrder}
              className="bg-coral-500 text-white px-6 py-3 rounded-full hover:bg-coral-600 transition-all duration-300 w-full"
            >
              Place Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;