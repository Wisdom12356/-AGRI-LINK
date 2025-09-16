// pages/login.js
'use client';

import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Eye, EyeOff, ChevronRight, AlertCircle } from 'lucide-react';
import Header from '../components/header';
import apiClient from '../apiClient';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    try {
      // This is where you would integrate with your authentication system
      const response = await apiClient.post('/users/login', { email, password });
      
      if (response.status !== 200) {
        throw new Error('Login failed');
      }
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      // Redirect to dashboard on successful login
      window.location.href = response?.data?.user?.role === 'farmer' ? '/farmer-dashboard' : '/client-dashboard';
    } catch (err) {
      setError('Invalid email or password. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center" style={{ fontFamily: 'cursive' }}>
      <Header/>
      <Head>
        <title>Login to AgiLink - Agricultural Marketplace</title>
        <meta name="description" content="Log in to your FarmConnect account to buy or sell agricultural products." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex-grow flex items-center justify-center px-4">
        <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden max-w-5xl w-full">
          {/* Left side - Form */}
          <div className="w-full md:w-1/2 p-8 md:p-12">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome back</h1>
              <p className="text-gray-600">Sign in to access your AgriLink account</p>
            </div>

            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded flex items-start">
                <AlertCircle size={20} className="mr-2 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <Link href="/forgot-password" className="text-sm text-green-600 hover:text-green-700 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </button>
              </div>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link href="/signup" className="text-green-600 hover:text-green-700 hover:underline font-medium">
                  Sign up
                </Link>
              </p>
            </div>

           

            <div className="mt-8 border-t pt-6">
              <p className="text-sm text-gray-600 mb-4 text-center">Or continue with</p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <img src="/api/placeholder/20/20" alt="Google" className="mr-2" />
                  Google
                </button>
                <button
                  type="button"
                  className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <img src="/api/placeholder/20/20" alt="Facebook" className="mr-2" />
                  Facebook
                </button>
              </div>
            </div>
          </div>

          {/* Right side - Image and content */}
          <div className="hidden md:block w-1/2 bg-green-600 p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('/api/placeholder/800/1000')" }}></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-6">Grow your agricultural business with AgriLink</h2>
              <p className="text-white text-lg mb-8">Connect directly with farmers and buyers across the country.</p>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="flex items-start mb-4">
                  <div className="mr-4 mt-1">
                    <div className="bg-amber-500 rounded-full w-8 h-8 flex items-center justify-center text-white">
                      <ChevronRight size={18} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Sell directly to consumers</h3>
                    <p className="text-white/80">Cut out middlemen and increase your profits</p>
                  </div>
                </div>
                
                <div className="flex items-start mb-4">
                  <div className="mr-4 mt-1">
                    <div className="bg-amber-500 rounded-full w-8 h-8 flex items-center justify-center text-white">
                      <ChevronRight size={18} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Find high-quality produce</h3>
                    <p className="text-white/80">Source directly from verified farmers</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <div className="bg-amber-500 rounded-full w-8 h-8 flex items-center justify-center text-white">
                      <ChevronRight size={18} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Streamline your operations</h3>
                    <p className="text-white/80">Manage inventory, orders and deliveries in one place</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-4 bg-white shadow">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          <p>© {new Date().getFullYear()} AgriLink. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link href="/privacy" className="hover:text-green-600">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-green-600">Terms of Service</Link>
            <Link href="/help" className="hover:text-green-600">Help Center</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}