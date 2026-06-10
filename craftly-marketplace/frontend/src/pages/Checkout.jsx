import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';

const Checkout = () => {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <div className="max-w-md mx-auto card p-12">
        <div className="w-20 h-20 bg-emerald/10 rounded-full flex items-center justify-center text-emerald mx-auto mb-8">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-bold mb-4">Payment Successful!</h2>
        <p className="text-slate-600 mb-8">Your digital assets are ready for download. Check your email for the receipt and download links.</p>
        <Link to="/catalog" className="btn-primary inline-block">
          Return to Marketplace
        </Link>
      </div>
    </div>
  );
};

export default Checkout;
