function LandingPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80)' }}>
      <div className="bg-black bg-opacity-50 p-10 rounded-xl flex flex-col items-center">
        <h1 className="text-5xl font-extrabold text-white mb-4 drop-shadow-lg">Paradise Nursery</h1>
        <p className="text-lg md:text-xl text-white mb-8 drop-shadow-lg max-w-xl text-center">
          Welcome to Paradise Nursery! We are passionate about bringing the beauty and benefits of houseplants into your home. Our curated selection of lush, healthy plants is perfect for both beginners and seasoned plant lovers. Discover your next green companion and let your indoor paradise flourish!
        </p>
        <a href="/products" className="px-8 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition text-lg font-semibold">Get Started</a>
      </div>
    </main>
  );
}

export default LandingPage; 