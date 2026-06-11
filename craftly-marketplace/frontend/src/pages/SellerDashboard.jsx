import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LayoutDashboard, Package, DollarSign, PlusCircle } from 'lucide-react';

const SellerDashboard = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: '', description: '', price: '', category: 'Templates', thumbnail_url: '', file_url: ''
  });

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const res = await axios.get('/api/orders/seller-sales', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSales(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchSales();
  }, [token]);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/products', newProduct, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Product added successfully!');
      setShowAddForm(false);
      // In a real app, you'd refresh the product list here
    } catch (err) {
      alert('Error adding product');
    }
  };

  const totalRevenue = sales.reduce((acc, sale) => acc + sale.amount, 0);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-bold">Seller Dashboard</h1>
          <p className="text-slate-500">Welcome back, {user?.name}</p>
        </div>
        <button 
          onClick={() => setShowAddForm(true)}
          className="btn-primary flex items-center gap-2"
        >
          <PlusCircle className="w-5 h-5" /> Add New Product
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="card p-8 flex items-center gap-6">
          <div className="w-16 h-16 bg-indigo/10 rounded-2xl flex items-center justify-center text-indigo">
            <DollarSign className="w-8 h-8" />
          </div>
          <div>
            <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Revenue</div>
            <div className="text-3xl font-bold">${totalRevenue.toFixed(2)}</div>
          </div>
        </div>
        <div className="card p-8 flex items-center gap-6">
          <div className="w-16 h-16 bg-emerald/10 rounded-2xl flex items-center justify-center text-emerald">
            <Package className="w-8 h-8" />
          </div>
          <div>
            <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Sales</div>
            <div className="text-3xl font-bold">{sales.length}</div>
          </div>
        </div>
        <div className="card p-8 flex items-center gap-6">
          <div className="w-16 h-16 bg-amber/10 rounded-2xl flex items-center justify-center text-amber">
            <LayoutDashboard className="w-8 h-8" />
          </div>
          <div>
            <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">Active Products</div>
            <div className="text-3xl font-bold">4</div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6">Recent Sales</h2>
      <div className="card overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-bold text-sm text-slate-600 uppercase tracking-wider">Product</th>
              <th className="px-6 py-4 font-bold text-sm text-slate-600 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-4 font-bold text-sm text-slate-600 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 font-bold text-sm text-slate-600 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {sales.map(sale => (
              <tr key={sale.id}>
                <td className="px-6 py-4 font-medium">{sale.product_title}</td>
                <td className="px-6 py-4 font-bold text-indigo">${sale.amount.toFixed(2)}</td>
                <td className="px-6 py-4 text-slate-500">{new Date(sale.created_at).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-emerald/10 text-emerald rounded-full text-xs font-bold uppercase">{sale.status}</span>
                </td>
              </tr>
            ))}
            {sales.length === 0 && (
              <tr>
                <td colSpan="4" className="px-6 py-12 text-center text-slate-500 italic">No sales recorded yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showAddForm && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">Add New Digital Product</h2>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <input type="text" required className="w-full border rounded p-2" value={newProduct.title} onChange={e => setNewProduct({...newProduct, title: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Price ($)</label>
                  <input type="number" step="0.01" required className="w-full border rounded p-2" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select className="w-full border rounded p-2" value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})}>
                  <option>Templates</option>
                  <option>Graphics</option>
                  <option>Fonts</option>
                  <option>Courses</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea rows="3" required className="w-full border rounded p-2" value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})}></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Thumbnail URL</label>
                <input type="text" required className="w-full border rounded p-2" value={newProduct.thumbnail_url} onChange={e => setNewProduct({...newProduct, thumbnail_url: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">File URL (Download Link)</label>
                <input type="text" required className="w-full border rounded p-2" value={newProduct.file_url} onChange={e => setNewProduct({...newProduct, file_url: e.target.value})} />
              </div>
              <div className="flex gap-4 pt-4">
                <button type="submit" className="btn-primary flex-1">Create Product</button>
                <button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2 border rounded-lg flex-1">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerDashboard;
