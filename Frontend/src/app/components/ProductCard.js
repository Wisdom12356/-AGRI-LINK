'use client';
import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { SERVER_URL } from '@/app/apiClient';
import OrderForm from './OrderForm';

export default function ProductCard({ product, isFavorite, onFavoriteToggle }) {
  const [showOrderForm, setShowOrderForm] = useState(false);
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XAF',
      minimumFractionDigits: 0,
      currencyDisplay: 'name'
    }).format(price);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={product.image ? `${SERVER_URL}/${product.image}` : '/images/default-product.jpg'}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={() => onFavoriteToggle(product._id)}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
        >
          <Heart
            className={`w-5 h-5 ${
              isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'
            }`}
          />
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-2">
          By {product.farmerId?.name || 'Unknown Farmer'}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-green-600">
            {formatPrice(product.price)}/{product.unit}
          </span>
          <span className={`text-sm ${
            product.stock > 0 ? 'text-green-500' : 'text-red-500'
          }`}>
            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
        
        {product.stock > 0 && (
          <button
            onClick={() => setShowOrderForm(true)}
            className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors"
          >
            Place Order
          </button>
        )}

        {showOrderForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
              <OrderForm product={product} onClose={() => setShowOrderForm(false)} />
            </div>
          </div>
        )}
        <div className="mt-4">
          <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
