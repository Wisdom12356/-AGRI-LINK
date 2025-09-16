'use client'
import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-green-700 shadow top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <p className="text-2xl font-bold text-green-600">
              Agri<span className="text-amber-500">Link</span>
            </p>
          </Link>
        </div>
        
        <nav className="hidden md:flex space-x-8">
          <Link href="/product"><p className="text-white hover:text-green-600">Products</p></Link>
          <Link href="/about"><p className="text-white hover:text-green-600 font-medium">About Us</p></Link>
          <Link href="/contact"><p className="text-white hover:text-green-600">Contact</p></Link>
          <Link href="/seasonal-crop-guide"><p className="text-white hover:text-green-600">Seasonal Guide</p></Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Link href="/login"><p className="text-white hover:text-green-600">Login</p></Link>
          <Link href="/signup">
            <p className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Sign Up</p>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
