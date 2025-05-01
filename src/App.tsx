import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './components/CartContext';
import { WishlistProvider } from './components/WishlistContext';
import { CompareProvider } from './components/CompareContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Category from './pages/Category';
import Wishlist from './pages/Wishlist';
import Compare from './pages/Compare';
import OrderTracking from './pages/OrderTracking';
import Product from './pages/ProductDetails';
import Search from './pages/Search';
import Cart from './pages/Cart';
import Profile from './pages/Profile';

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <CompareProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:categoryName" element={<Category />} />
            <Route path="/category/:categoryName/:subCategory" element={<Category />} />
            <Route path="/category/:categoryName/:subCategory/:subSubCategory" element={<Category />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/orders" element={<OrderTracking />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/search" element={<Search />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </CompareProvider>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;