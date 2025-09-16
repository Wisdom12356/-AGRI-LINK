'use client';

import Header from './components/header';
import React, { useState } from 'react';
import { Search, MapPin, ShoppingCart, User, Menu, X, ChevronRight, Globe, Shield, TrendingUp, Truck } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('English');
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen bg-white text-gray-800" style={{ fontFamily: 'cursive' }}>
      {/* Hero Section */}
      <Header />
      
      {/* Mobile Menu */}
      <div className="relative">
        <div className="bg-gray-100 h-120 md:h-screen/2">
          {/* Updated to use an image as the background */}
          <div 
            className="h-full bg-cover bg-center flex items-center" 
            style={{ backgroundImage: "url('/images/hero.jpg')" }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-white ">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Connect Directly with Farmers For Fresh Products.</h1>
              <p className="text-xl mb-8 max-w-2xl">Cut out the middleman and get fresher products at better prices. Support local farmers and know exactly where your food comes from.</p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link href='/client-dashboard' className="bg-white text-green-700 px-6 py-3 rounded-lg font-medium text-lg hover:bg-gray-100">
                  I'm a Buyer
                </Link>
                <Link href='/farmer-dashboard' className="border-2 border-white text-white px-6 py-3 rounded-lg font-medium text-lg hover:bg-white/10">
                  I'm a Farmer
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Search Bar Overlay */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-8">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-1 relative">
                <Search size={20} className="absolute left-3 top-3 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search for products (corn, dairy, organic apples...)" 
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div className="relative">
                <MapPin size={20} className="absolute left-3 top-3 text-gray-400" />
                <select className="pl-10 pr-8 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none">
                  <option>Your Location</option>
                  <option>Within 10 miles</option>
                  <option>Within 25 miles</option>
                  <option>Within 50 miles</option>
                </select>
              </div>
              <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 flex items-center justify-center">
                <Search size={20} className="mr-2" />
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose AgriConnect?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-green-50 p-6 rounded-lg text-center">
              <div className="bg-green-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp size={28} className="text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Direct Market Access</h3>
              <p className="text-gray-600">Connect directly with buyers and sellers without intermediaries, maximizing your profits.</p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg text-center">
              <div className="bg-green-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield size={28} className="text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Transactions</h3>
              <p className="text-gray-600">Our secure payment system and verification process ensures safe transactions every time.</p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg text-center">
              <div className="bg-green-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck size={28} className="text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Local Distribution</h3>
              <p className="text-gray-600">Find products in your area to reduce transportation costs and support local agriculture.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-green-100 h-12 w-12 rounded-full flex items-center justify-center mb-4 text-green-600 font-bold">1</div>
              <h3 className="text-xl font-semibold mb-2">Create Your Account</h3>
              <p className="text-gray-600">Sign up as a farmer or buyer. Verify your profile to start using the platform.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-green-100 h-12 w-12 rounded-full flex items-center justify-center mb-4 text-green-600 font-bold">2</div>
              <h3 className="text-xl font-semibold mb-2">List or Browse Products</h3>
              <p className="text-gray-600">Farmers list their produce with details, pricing and availability. Buyers browse and search for what they need.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-green-100 h-12 w-12 rounded-full flex items-center justify-center mb-4 text-green-600 font-bold">3</div>
              <h3 className="text-xl font-semibold mb-2">Connect & Trade</h3>
              <p className="text-gray-600">Make offers, arrange delivery, and complete secure transactions through our platform.</p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 inline-flex items-center">
              <span>Learn More</span>
              <ChevronRight size={20} className="ml-1" />
            </button>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section id="products" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Categories</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div 
              className="bg-gray-100 rounded-lg p-4 text-center hover:shadow-md cursor-pointer transition-shadow" 
              style={{ backgroundImage: "url('/images/picframe.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#EAE2F8' }}
            >
              <h3 className="font-semibold text-white">Organic Vegetables</h3>
            </div>
            
            <div 
              className="bg-gray-100 rounded-lg p-4 text-center hover:shadow-md cursor-pointer transition-shadow" 
              style={{ backgroundImage: "url('/images/grainsand cereals.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#EAE2F8' }}
            >
              <h3 className="font-semibold text-white">Grains & Cereals</h3>
            </div>
            
            <div 
              className="bg-gray-100 rounded-lg p-4 text-center hover:shadow-md cursor-pointer transition-shadow" 
              style={{ backgroundImage: "url('/images/freshfruits.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#EAE2F8' }}
            >
              <h3 className="font-semibold text-white">Fresh Fruits</h3>
            </div>
            
            <div 
              className="bg-gray-100 rounded-lg p-4 text-center hover:shadow-md cursor-pointer transition-shadow" 
              style={{ backgroundImage: "url('/images/dairyproducts.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#EAE2F8' }}
            >
              <h3 className="font-semibold text-white">Dairy Products</h3>
            </div>
          </div>
          
          <div className="text-center">
            <a href="#" className="text-green-600 font-medium inline-flex items-center hover:text-green-700">
              <span>View All Categories</span>
              <ChevronRight size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-4xl font-bold text-green-600 mb-2">5,000+</h3>
              <p className="text-gray-600">Registered Farmers</p>
            </div>
            
            <div>
              <h3 className="text-4xl font-bold text-green-600 mb-2">12,000+</h3>
              <p className="text-gray-600">Active Buyers</p>
            </div>
            
            <div>
              <h3 className="text-4xl font-bold text-green-600 mb-2">50+</h3>
              <p className="text-gray-600">Agricultural Categories</p>
            </div>
            
            <div>
              <h3 className="text-4xl font-bold text-green-600 mb-2">98%</h3>
              <p className="text-gray-600">Satisfied Customers</p>
            </div>
          </div>
          
          <div className="flex justify-center space-x-8 mt-12">
            <div className="bg-white p-4 rounded-lg shadow">
              <img src="/api/placeholder/120/60" alt="Payment Secure" className="h-8" />
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <img src="/api/placeholder/120/60" alt="SSL Secured" className="h-8" />
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <img src="/api/placeholder/120/60" alt="Quality Guaranteed" className="h-8" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to revolutionize your agricultural business?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">Join thousands of farmers and buyers already benefiting from our platform.</p>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-white text-green-700 px-6 py-3 rounded-lg font-medium text-lg hover:bg-gray-100">
              Create Your Account
            </button>
            <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-medium text-lg hover:bg-white/10">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">AgriConnect</h3>
              <p className="text-gray-300 mb-4">Connecting farmers and buyers directly for a more sustainable agricultural economy.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <div className="h-6 w-6 bg-gray-600 rounded"></div>
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <div className="h-6 w-6 bg-gray-600 rounded"></div>
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <span className="sr-only">Instagram</span>
                  <div className="h-6 w-6 bg-gray-600 rounded"></div>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">Home</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">How It Works</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">For Farmers</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">For Buyers</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">Help Center</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Contact Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">FAQ</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Community</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2025 AgriConnect. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <select className="bg-gray-700 text-white px-3 py-1 rounded">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
          </div>
        </div>
        <div className="text-center mt-4">
          <Link href="/about" className="text-gray-300 hover:text-white">About Us</Link>
        </div>
      </footer>
    </div>
  );
}