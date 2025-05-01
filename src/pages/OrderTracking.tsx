import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const OrderTracking = () => {
  const orders = [
    {
      id: 'ORD12345',
      date: '2025-04-25',
      status: 'Delivered',
      items: [{ name: 'Smartphone', price: 699.99 }],
      total: 699.99,
      timeline: [
        { step: 'Order Placed', date: '2025-04-25', completed: true },
        { step: 'Processing', date: '2025-04-26', completed: true },
        { step: 'Shipped', date: '2025-04-27', completed: true },
        { step: 'Delivered', date: '2025-04-30', completed: true },
      ],
    },
    {
      id: 'ORD12346',
      date: '2025-04-28',
      status: 'Shipped',
      items: [{ name: 'Laptop', price: 1299.99 }],
      total: 1299.99,
      timeline: [
        { step: 'Order Placed', date: '2025-04-28', completed: true },
        { step: 'Processing', date: '2025-04-29', completed: true },
        { step: 'Shipped', date: '2025-04-30', completed: true },
        { step: 'Delivered', date: '', completed: false },
      ],
    },
  ];

  return (
    <motion.div
      className="max-w-7xl mx-auto my-8 pt-20 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Toaster position="top-right" />
      <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-poppins mb-6">Order Tracking</h2>
      {orders.length === 0 ? (
        <div className="text-center text-slate-700 font-inter">
          <p className="text-xl mb-4">No orders found.</p>
          <Link
            to="/"
            className="bg-gradient-to-r from-teal-500 to-coral-500 text-white px-6 py-3 rounded-full hover:bg-coral-600 transition-all duration-300 font-inter"
          >
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-2xl p-6 shadow-lg border border-teal-200">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 font-inter">Order #{order.id}</h3>
                  <p className="text-slate-700 font-inter">Placed on {order.date}</p>
                </div>
                <span
                  className={`mt-2 sm:mt-0 px-3 py-1 rounded-full text-sm font-inter ${
                    order.status === 'Delivered' ? 'bg-teal-100 text-teal-600' : 'bg-coral-100 text-coral-600'
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <div className="mb-4">
                {order.items.map((item, index) => (
                  <p key={index} className="text-slate-700 font-inter">
                    {item.name}: ${item.price.toFixed(2)}
                  </p>
                ))}
                <p className="text-lg font-semibold text-slate-900 font-inter mt-2">
                  Total: ${order.total.toFixed(2)}
                </p>
              </div>
              <div className="relative">
                <div className="flex justify-between items-center">
                  {order.timeline.map((step, index) => (
                    <div key={index} className="flex-1 text-center">
                      <div
                        className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${
                          step.completed ? 'bg-teal-500 text-white' : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {step.completed ? '✔' : index + 1}
                      </div>
                      <p className="text-sm text-slate-700 font-inter mt-2">{step.step}</p>
                      <p className="text-xs text-slate-600 font-inter">{step.date || 'Pending'}</p>
                    </div>
                  ))}
                </div>
                <div className="absolute top-4 left-0 w-full h-1 bg-slate-200">
                  <div
                    className="h-1 bg-teal-500"
                    style={{ width: `${(order.timeline.filter((s) => s.completed).length / order.timeline.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default OrderTracking;