import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, ShoppingBag, ArrowRight, Mail, Lock } from 'lucide-react';

const Login = () => {
  const [loginType, setLoginType] = useState(null); // 'user' or 'shopper'

  const LoginForm = ({ type }) => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md border border-gray-100"
    >
      <button 
        onClick={() => setLoginType(null)}
        className="text-xs font-bold text-accent uppercase tracking-widest mb-6 hover:underline"
      >
        ← Back to selection
      </button>
      <h2 className="text-3xl font-black text-primary mb-2">
        {type === 'user' ? 'User Login' : 'Shopper Login'}
      </h2>
      <p className="text-gray-500 text-sm mb-8">Enter your credentials to access your Dheza account.</p>
      
      <form className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
            <input 
              type="email" 
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 ring-accent transition-all outline-none text-sm"
              placeholder="name@example.com"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Password</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
            <input 
              type="password" 
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 ring-accent transition-all outline-none text-sm"
              placeholder="••••••••"
            />
          </div>
        </div>
        <button className="w-full bg-primary text-white py-4 rounded-2xl font-bold hover:bg-secondary transition-all shadow-lg flex items-center justify-center space-x-2 group">
          <span>Sign In</span>
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </form>
      
      <div className="mt-8 pt-8 border-t border-gray-100 text-center">
        <p className="text-sm text-gray-400">
          Don't have an account? <a href="#" className="text-accent font-bold hover:underline">Create one</a>
        </p>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 bg-bg-light">
      {!loginType ? (
        <div className="max-w-5xl w-full">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-black text-primary mb-4 tracking-tighter">Welcome to Dheza</h1>
            <p className="text-gray-500 font-medium">Please select your login type to continue</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* User Login Option */}
            <motion.div 
              whileHover={{ y: -10 }}
              onClick={() => setLoginType('user')}
              className="relative overflow-hidden bg-white rounded-[2.5rem] shadow-xl border border-gray-50 cursor-pointer group hover:border-accent transition-all"
            >
              <div className="h-64 overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&q=80&w=2070" 
                  alt="Happy Shopping" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
              </div>
              <div className="p-10 -mt-10 relative z-10">
                <div className="w-16 h-16 bg-accent bg-opacity-10 rounded-2xl flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-white transition-all">
                  <User size={32} />
                </div>
                <h2 className="text-3xl font-black text-primary mb-4">User Login</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-8">
                  Access your personal dashboard, track orders, and manage your wishlist with ease.
                </p>
                <div className="flex items-center text-accent font-bold group-hover:translate-x-2 transition-transform">
                  Get Started <ArrowRight size={20} className="ml-2" />
                </div>
              </div>
            </motion.div>

            {/* Shopper Login Option */}
            <motion.div 
              whileHover={{ y: -10 }}
              onClick={() => setLoginType('shopper')}
              className="relative overflow-hidden bg-primary rounded-[2.5rem] shadow-xl cursor-pointer group hover:ring-4 ring-accent ring-opacity-50 transition-all"
            >
              <div className="h-64 overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?auto=format&fit=crop&q=80&w=2070" 
                  alt="Shopper Professional" 
                  className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent"></div>
              </div>
              <div className="p-10 -mt-10 relative z-10">
                <div className="w-16 h-16 bg-white bg-opacity-10 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:bg-accent transition-all">
                  <ShoppingBag size={32} />
                </div>
                <h2 className="text-3xl font-black text-white mb-4">Shopper Login</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-8">
                  Log in to your professional shopper account to manage deliveries and earnings.
                </p>
                <div className="flex items-center text-white font-bold group-hover:text-accent transition-colors">
                  Enter Portal <ArrowRight size={20} className="ml-2" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      ) : (
        <LoginForm type={loginType} />
      )}
    </div>
  );
};

export default Login;
