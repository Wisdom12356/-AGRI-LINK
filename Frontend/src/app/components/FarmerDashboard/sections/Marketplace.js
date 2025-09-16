'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

export default function Marketplace() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/products', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // This ensures cookies are sent with the request
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch products');
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error.message || 'Failed to load products. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Marketplace</h2>
          <p className="text-slate-500">Browse and manage your products in the marketplace</p>
        </div>
        <Link 
          href="/product"
          className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-colors"
        >
          View Full Marketplace
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
          <p className="text-slate-900 font-medium mb-2">Error Loading Products</p>
          <p className="text-slate-500 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            Try Again
          </button>
        </div>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <div className="h-12 w-12 text-slate-400 mb-4">📦</div>
          <p className="text-slate-900 font-medium mb-2">No Products Found</p>
          <p className="text-slate-500">Start by adding some products to your marketplace.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 bg-slate-100">
                {product.image ? (
                  <div className="relative w-full h-48">
                    <img 
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.log('Image failed to load:', product.image);
                        e.target.onerror = null;
                        e.target.src = '/images/default-product.jpg';
                      }}
                    />
                  </div>
                ) : (
                  <div className="w-full h-48 flex items-center justify-center bg-slate-50">
                    <span className="text-4xl">🌾</span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-slate-900">{product.name}</h3>
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-emerald-100 text-emerald-800">
                      {product.status || 'Available'}
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm">{product.description}</p>
                  <p className="text-sm text-slate-500">{product.category}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-emerald-600 font-bold text-lg">
                        {new Intl.NumberFormat('fr-FR', {
                          style: 'currency',
                          currency: 'XAF',
                          minimumFractionDigits: 0,
                          currencyDisplay: 'name'
                        }).format(product.price || 0)}
                      </span>
                      <span className="text-slate-500 text-sm ml-1">per {product.unit || 'piece'}</span>
                    </div>
                    <span className="text-slate-500 text-sm">Stock: {product.quantity} {product.unit || 'pieces'}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
