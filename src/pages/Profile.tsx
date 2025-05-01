import { useState } from 'react';
import { Order, Address, Product } from '../types';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://via.placeholder.com/100',
  });
  const [orders] = useState<Order[]>([
    {
      id: 1,
      date: '2025-04-20',
      total: 149.98,
      status: 'Delivered',
      items: [
        {
          id: 1,
          name: "Men's Casual Shirt",
          category: ['Fashion', 'Men', 'Topwear'],
          price: 49.99,
          quantity: 2,
          image: 'https://via.placeholder.com/150',
          description: 'A comfortable casual shirt for men.',
          specifications: { Material: 'Cotton', Size: 'M' },
          rating: 4.5,
        },
        {
          id: 2,
          name: "Women's Sneakers",
          category: ['Fashion', 'Women', 'Footwear'],
          price: 79.99,
          quantity: 1,
          image: 'https://via.placeholder.com/150',
          description: 'Stylish and comfortable sneakers for women.',
          specifications: { Material: 'Leather', Size: '7' },
          rating: 4.7,
        },
      ],
    },
  ]);
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 1,
      name: 'John Doe',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zip: '10001',
    },
  ]);
  const [newAddress, setNewAddress] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    zip: '',
  });

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    setAddresses([
      ...addresses,
      { id: addresses.length + 1, ...newAddress },
    ]);
    setNewAddress({ name: '', street: '', city: '', state: '', zip: '' });
  };

  return (
    <div className="max-w-7xl mx-auto my-6 pt-20 animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Profile</h2>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
          <h3 className="text-xl font-bold text-gray-800 text-center">{user.name}</h3>
          <p className="text-gray-600 text-center mb-4">{user.email}</p>
          <button className="bg-teal-500 text-white px-4 py-2 rounded-full hover:bg-teal-600 transition-all duration-300 w-full">
            Edit Profile
          </button>
        </div>
        <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow-md">
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 rounded-full ${
                activeTab === 'orders'
                  ? 'bg-teal-500 text-white'
                  : 'bg-gray-200 text-gray-800'
              } transition-all duration-300`}
            >
              Orders
            </button>
            <button
              onClick={() => setActiveTab('addresses')}
              className={`px-4 py-2 rounded-full ${
                activeTab === 'addresses'
                  ? 'bg-teal-500 text-white'
                  : 'bg-gray-200 text-gray-800'
              } transition-all duration-300`}
            >
              Addresses
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2 rounded-full ${
                activeTab === 'settings'
                  ? 'bg-teal-500 text-white'
                  : 'bg-gray-200 text-gray-800'
              } transition-all duration-300`}
            >
              Settings
            </button>
          </div>
          {activeTab === 'orders' && (
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Order History</h3>
              {orders.map((order) => (
                <div key={order.id} className="bg-gray-100 p-4 rounded-lg mb-4">
                  <p className="text-gray-800">
                    <strong>Order #{order.id}</strong> - {order.date}
                  </p>
                  <p className="text-gray-600">Status: {order.status}</p>
                  <p className="text-coral-500">Total: ${order.total.toFixed(2)}</p>
                  <ul className="mt-2">
                    {order.items.map((item: Product) => (
                      <li key={item.id} className="text-gray-600">
                        {item.name} - ${item.price.toFixed(2)} x {item.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'addresses' && (
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Saved Addresses</h3>
              {addresses.map((address) => (
                <div key={address.id} className="bg-gray-100 p-4 rounded-lg mb-4">
                  <p className="text-gray-800 font-medium">{address.name}</p>
                  <p className="text-gray-600">
                    {address.street}, {address.city}, {address.state} {address.zip}
                  </p>
                  <button className="text-coral-500 hover:text-coral-600 mt-2">
                    Edit
                  </button>
                </div>
              ))}
              <h3 className="text-xl font-bold text-gray-800 mb-4">Add New Address</h3>
              <form onSubmit={handleAddAddress}>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={newAddress.name}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, name: e.target.value })
                  }
                  className="w-full p-3 mb-4 rounded-full bg-gray-100 focus:outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="Street Address"
                  value={newAddress.street}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, street: e.target.value })
                  }
                  className="w-full p-3 mb-4 rounded-full bg-gray-100 focus:outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="City"
                  value={newAddress.city}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, city: e.target.value })
                  }
                  className="w-full p-3 mb-4 rounded-full bg-gray-100 focus:outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="State"
                  value={newAddress.state}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, state: e.target.value })
                  }
                  className="w-full p-3 mb-4 rounded-full bg-gray-100 focus:outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="ZIP Code"
                  value={newAddress.zip}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, zip: e.target.value })
                  }
                  className="w-full p-3 mb-4 rounded-full bg-gray-100 focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="bg-teal-500 text-white px-6 py-3 rounded-full hover:bg-teal-600 transition-all duration-300 w-full"
                >
                  Add Address
                </button>
              </form>
            </div>
          )}
          {activeTab === 'settings' && (
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Account Settings</h3>
              <input
                type="text"
                placeholder="Full Name"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                className="w-full p-3 mb-4 rounded-full bg-gray-100 focus:outline-none"
              />
              <input
                type="email"
                placeholder="Email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="w-full p-3 mb-4 rounded-full bg-gray-100 focus:outline-none"
              />
              <button className="bg-teal-500 text-white px-6 py-3 rounded-full hover:bg-teal-600 transition-all duration-300 w-full">
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;