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

const categories = ['Large Plants', 'Easy Care', 'Vines'];

function ProductListingPage({ products, cartItems, addToCart }) {
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [toast, setToast] = useState("");

  const handleAddToCart = (product) => {
    addToCart(product);
    setToast(`${product.name} added to cart!`);
    setTimeout(() => setToast(""), 2000);
  };

  const isInCart = (productId) => cartItems.some(item => item.id === productId);

  return (
    <div>
      <Header cartCount={cartCount} />
      <main className="max-w-5xl mx-auto p-4">
        <h2 className="text-3xl font-bold mb-8">Browse Houseplants</h2>
        {categories.map(category => (
          <section key={category} className="mb-10">
            <h3 className="text-2xl font-semibold mb-4 text-green-700">{category}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {products.filter(p => p.category === category).map(product => {
                const disabled = isInCart(product.id);
                return (
                  <div key={product.id} className="bg-white rounded-xl shadow p-4 flex flex-col">
                    <img src={product.image} alt={product.name} className="w-full h-56 object-cover rounded mb-4" />
                    <div className="font-bold text-lg mb-2">{product.name}</div>
                    <div className="text-green-700 font-semibold mb-4">${product.price}</div>
                    <button
                      className={`px-4 py-2 rounded font-medium transition w-full ${disabled ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`}
                      onClick={() => handleAddToCart(product)}
                      disabled={disabled}
                    >
                      {disabled ? 'Added' : 'Add to Cart'}
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </main>
      {toast && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-green-700 text-white px-6 py-3 rounded shadow-lg z-50 transition-all">
          {toast}
        </div>
      )}
    </div>
  );
}

export default ProductListingPage; 