import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Star, Download, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handlePurchase = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    
    try {
      await axios.post('http://localhost:5000/api/orders', 
        { product_id: product.id, amount: product.price },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Purchase successful! (In a real app, you would now download the file)');
      navigate('/catalog');
    } catch (err) {
      alert('Error processing purchase');
    }
  };

  if (loading) return <div className="container mx-auto px-4 py-20 text-center">Loading...</div>;
  if (!product) return <div className="container mx-auto px-4 py-20 text-center">Product not found</div>;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left Content */}
        <div className="lg:w-2/3">
          <div className="card mb-8">
            <img src={product.thumbnail_url} alt={product.title} className="w-full aspect-video object-cover" />
          </div>
          
          <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
          
          <div className="flex items-center gap-6 mb-8 text-slate-500">
            <div className="flex items-center gap-1 text-amber">
              <Star className="w-5 h-5 fill-amber" />
              <Star className="w-5 h-5 fill-amber" />
              <Star className="w-5 h-5 fill-amber" />
              <Star className="w-5 h-5 fill-amber" />
              <Star className="w-5 h-5 fill-amber" />
              <span className="ml-1 font-bold">5.0</span>
            </div>
            <span className="flex items-center gap-1"><Download className="w-5 h-5" /> 1,240 Sales</span>
            <span className="flex items-center gap-1 uppercase font-bold text-xs bg-slate-100 px-2 py-1 rounded">{product.category}</span>
          </div>

          <div className="prose prose-slate max-w-none mb-12">
            <h3 className="text-2xl font-bold mb-4">Description</h3>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">{product.description}</p>
            
            <h4 className="text-xl font-bold mb-4">What's included:</h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 list-none p-0">
              {['High-resolution files', 'Full commercial license', 'Lifetime updates', '24/7 Support access'].map(item => (
                <li key={item} className="flex items-center gap-2 text-slate-600">
                  <CheckCircle2 className="w-5 h-5 text-emerald" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Sidebar - Purchase Box */}
        <div className="lg:w-1/3">
          <div className="card p-8 sticky top-24 border-indigo/20 shadow-xl shadow-indigo/5">
            <div className="flex items-center justify-between mb-6">
              <span className="text-slate-500 font-medium">Standard License</span>
              <span className="text-3xl font-bold text-indigo">${product.price.toFixed(2)}</span>
            </div>

            <button 
              onClick={handlePurchase}
              className="w-full py-4 bg-indigo text-white rounded-xl font-bold text-lg hover:bg-indigo-dark transition-colors mb-6 flex items-center justify-center gap-2"
            >
              Add to Cart
            </button>

            <div className="space-y-4 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <ShieldCheck className="w-5 h-5 text-emerald" />
                <span>Secure Payment Guarantee</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Clock className="w-5 h-5 text-indigo" />
                <span>Instant Digital Download</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
