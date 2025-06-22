import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import ProductListingPage from './ProductListingPage';
import ShoppingCartPage from './ShoppingCartPage';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, updateCartItem, removeCartItem } from './store';

function App() {
  const products = useSelector((state) => state.cart.products);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<ProductListingPage products={products} cartItems={cartItems} addToCart={(product) => dispatch(addToCart(product))} />} />
        <Route path="/cart" element={<ShoppingCartPage cartItems={cartItems} updateCartItem={(id, quantity) => dispatch(updateCartItem({ id, quantity }))} removeCartItem={(id) => dispatch(removeCartItem(id))} />} />
      </Routes>
    </Router>
  );
}

export default App;
