import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ShoppingCart, User, Package, Search, LayoutDashboard } from 'lucide-react';
import Landing from './pages/Landing';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import SellerDashboard from './pages/SellerDashboard';
import Checkout from './pages/Checkout';

function App() {
  const [user, setUser] = React.useState(JSON.parse(localStorage.getItem('user')));

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/';
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-indigo flex items-center gap-2">
              <Package className="w-8 h-8" />
              <span>Craftly</span>
            </Link>
            
            <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Search digital products..." 
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo/20 focus:border-indigo"
                />
              </div>
            </div>

            <nav className="flex items-center gap-6">
              <Link to="/catalog" className="text-slate-600 hover:text-indigo font-medium">Browse</Link>
              <Link to="/cart" className="text-slate-600 hover:text-indigo relative">
                <ShoppingCart className="w-6 h-6" />
              </Link>
              {user ? (
                <div className="flex items-center gap-4">
                  {user.role === 'seller' && (
                    <Link to="/dashboard" className="text-slate-600 hover:text-indigo">
                      <LayoutDashboard className="w-6 h-6" />
                    </Link>
                  )}
                  <button onClick={logout} className="text-slate-600 hover:text-indigo font-medium">Logout</button>
                </div>
              ) : (
                <Link to="/login" className="text-slate-600 hover:text-indigo font-medium flex items-center gap-2">
                  <User className="w-6 h-6" />
                  <span>Login</span>
                </Link>
              )}
            </nav>
          </div>
        </header>

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<SellerDashboard />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </main>

        <footer className="bg-slate-900 text-slate-400 py-12">
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <Link to="/" className="text-2xl font-bold text-white mb-4 block">Craftly</Link>
              <p className="max-w-xs">The premium marketplace for high-quality digital assets. Empowering creators and builders worldwide.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Marketplace</h4>
              <ul className="space-y-2">
                <li><Link to="/catalog" className="hover:text-white">All Products</Link></li>
                <li><Link to="/catalog?cat=Templates" className="hover:text-white">Templates</Link></li>
                <li><Link to="/catalog?cat=Graphics" className="hover:text-white">Graphics</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Become a Seller</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="container mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-center text-sm">
            &copy; 2024 Craftly. All rights reserved.
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
