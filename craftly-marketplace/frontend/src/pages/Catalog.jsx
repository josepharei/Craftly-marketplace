import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Filter, Star } from 'lucide-react';

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('/api/products');
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = ['All', 'Templates', 'Graphics', 'Fonts', 'Courses'];
  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64">
          <div className="card p-6 sticky top-24">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Filter className="w-5 h-5 text-indigo" />
              Filters
            </h3>
            
            <div className="mb-8">
              <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Category</h4>
              <div className="space-y-2">
                {categories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${activeCategory === cat ? 'bg-indigo/10 text-indigo font-bold' : 'text-slate-600 hover:bg-slate-100'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">{activeCategory} Assets</h2>
            <p className="text-slate-500">{filteredProducts.length} products found</p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(n => (
                <div key={n} className="card h-80 animate-pulse bg-slate-100"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <Link to={`/product/${product.id}`} key={product.id} className="card group">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={product.thumbnail_url} 
                      alt={product.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <div className="text-xs font-bold text-indigo uppercase mb-1">{product.category}</div>
                    <h3 className="font-bold text-lg mb-2 group-hover:text-indigo transition-colors">{product.title}</h3>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-xl font-bold text-slate-900">${product.price.toFixed(2)}</span>
                      <div className="flex items-center gap-1 text-amber text-sm font-medium">
                        <Star className="w-4 h-4 fill-amber" />
                        <span>4.9</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
