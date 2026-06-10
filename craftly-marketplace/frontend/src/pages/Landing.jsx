import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const Landing = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center relative z-10">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-bold leading-tight mb-6"
            >
              The Premier Marketplace for <span className="text-indigo">Digital Assets</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-slate-600 mb-8 max-w-lg"
            >
              High-quality templates, graphics, and courses to accelerate your workflow. Created by the world's best digital artisans.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/catalog" className="btn-primary flex items-center gap-2">
                Browse Marketplace <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/register" className="btn-secondary">
                Become a Seller
              </Link>
            </motion.div>
          </div>
          <div className="md:w-1/2">
            <motion.img 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" 
              alt="Digital Workspace" 
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-indigo/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-emerald/5 rounded-full blur-3xl"></div>
      </section>

      {/* Features */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Why choose Craftly?</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">We provide a seamless experience for both buyers and sellers of digital goods.</p>
        </div>
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card p-8 text-center">
            <div className="w-16 h-16 bg-indigo/10 rounded-2xl flex items-center justify-center text-indigo mx-auto mb-6">
              <Zap className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3">Instant Delivery</h3>
            <p className="text-slate-600">Get your files immediately after purchase. No waiting, no friction.</p>
          </div>
          <div className="card p-8 text-center">
            <div className="w-16 h-16 bg-emerald/10 rounded-2xl flex items-center justify-center text-emerald mx-auto mb-6">
              <Shield className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3">Secure Payments</h3>
            <p className="text-slate-600">All transactions are protected and sellers are verified for quality.</p>
          </div>
          <div className="card p-8 text-center">
            <div className="w-16 h-16 bg-amber/10 rounded-2xl flex items-center justify-center text-amber mx-auto mb-6">
              <Globe className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3">Global Reach</h3>
            <p className="text-slate-600">Sell to customers worldwide and reach a massive audience of creators.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-indigo text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to start creating?</h2>
          <p className="text-indigo-100 mb-10 text-xl max-w-2xl mx-auto">Join thousands of creators who are already selling their digital products on Craftly.</p>
          <Link to="/register" className="px-8 py-4 bg-white text-indigo rounded-xl font-bold text-lg hover:bg-slate-100 transition-colors shadow-xl">
            Get Started for Free
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;
