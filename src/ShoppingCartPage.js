import { Link } from 'react-router-dom';
import { useState } from 'react';

function Header({ cartCount }) {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md mb-8">
      <Link to="/" className="text-2xl font-bold text-green-700">Paradise Nursery</Link>
      <nav className="flex items-center gap-6">
        <Link to="/products" className="text-lg font-medium text-gray-700 hover:text-green-700 transition">Products</Link>
        <Link to="/cart" className="relative">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-green-700">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437m0 0l1.7 6.385m-.383-7.822L6.75 15.75A2.25 2.25 0 008.988 18h6.023a2.25 2.25 0 002.238-2.25V6.75m-12.75 0h15.75" />
          </svg>
          <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full px-2 py-0.5 font-bold">{cartCount}</span>
        </Link>
      </nav>
    </header>
  );
}

function ShoppingCartPage({ cartItems, updateCartItem, removeCartItem }) {
  const [toast, setToast] = useState("");
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalCost = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    setToast("Checkout coming soon!");
    setTimeout(() => setToast(""), 2000);
  };

  return (
    <div>
      <Header cartCount={cartCount} />
      <main className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
        <div className="mb-4 text-lg font-medium">Total items: {cartCount}</div>
        <div className="mb-8 text-lg font-medium">Total cost: <span className="text-green-700 font-bold">${totalCost}</span></div>
        <div className="space-y-6 mb-8">
          {cartItems.length === 0 ? (
            <div className="text-gray-500">Your cart is empty.</div>
          ) : cartItems.map(item => (
            <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg shadow-sm">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
              <div className="flex-1">
                <div className="font-semibold text-lg">{item.name}</div>
                <div className="text-gray-600">Unit price: ${item.price}</div>
                <div className="flex items-center gap-2 mt-2">
                  <button className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300" onClick={() => updateCartItem(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                  <span className="px-2">{item.quantity}</span>
                  <button className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300" onClick={() => updateCartItem(item.id, item.quantity + 1)}>+</button>
                </div>
              </div>
              <div className="text-lg font-bold text-green-700">${item.price * item.quantity}</div>
              <button className="ml-4 text-red-600 hover:text-red-800 font-bold text-xl" onClick={() => removeCartItem(item.id)}>&times;</button>
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <Link to="/products" className="px-6 py-2 bg-gray-200 rounded hover:bg-gray-300 font-medium">Continue Shopping</Link>
          <button className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-medium" disabled={cartItems.length === 0} onClick={handleCheckout}>Checkout</button>
        </div>
      </main>
      {toast && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-green-700 text-white px-6 py-3 rounded shadow-lg z-50 transition-all">
          {toast}
        </div>
      )}
    </div>
  );
}

export default ShoppingCartPage; 