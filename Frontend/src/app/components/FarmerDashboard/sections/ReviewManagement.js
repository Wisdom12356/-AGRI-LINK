'use client'
import React, { useState } from 'react';
import { Search, Star, MessageCircle, ThumbsUp, Flag } from 'lucide-react';

export default function ReviewManagement() {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      customerName: 'Mellor Wisdom',
      productName: 'Organic Tomatoes',
      rating: 5,
      comment: 'Excellent quality tomatoes, very fresh!',
      date: '2024-02-20',
      helpful: 12,
      status: 'published'
    },
    // Add more mock reviews...
  ]);

  const [filterRating, setFilterRating] = useState('all');

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex gap-4 flex-grow">
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search reviews..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
          <select
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
          >
            <option value="all">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">{review.customerName}</h3>
                <p className="text-sm text-gray-500">{review.productName}</p>
              </div>
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={`w-4 h-4 ${
                      index < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            <p className="text-gray-600 mb-4">{review.comment}</p>
            
            <div className="flex justify-between items-center text-sm text-gray-500">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-1 hover:text-gray-700">
                  <ThumbsUp className="w-4 h-4" />
                  <span>{review.helpful}</span>
                </button>
                <button className="flex items-center space-x-1 hover:text-gray-700">
                  <MessageCircle className="w-4 h-4" />
                  <span>Reply</span>
                </button>
                <button className="flex items-center space-x-1 hover:text-gray-700">
                  <Flag className="w-4 h-4" />
                  <span>Report</span>
                </button>
              </div>
              <span>{new Date(review.date).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
