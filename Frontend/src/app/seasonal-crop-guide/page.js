//seasonalguide.js
'use client';
import React, { useState, useEffect } from 'react';
import { Calendar, Sprout, ShoppingCart, TrendingUp, MapPin, Clock, Thermometer, Droplets } from 'lucide-react';
import Header from '../components/header';
import Head from 'next/head';
import Link from 'next/link';
const SeasonalCropGuide = () => {
  const [selectedSeason, setSelectedSeason] = useState('spring');
  const [userType, setUserType] = useState('farmer');
  const [selectedCrop, setSelectedCrop] = useState(null);

  // Get current season based on month
  useEffect(() => {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) setSelectedSeason('spring');
    else if (month >= 5 && month <= 7) setSelectedSeason('summer');
    else if (month >= 8 && month <= 10) setSelectedSeason('autumn');
    else setSelectedSeason('winter');
  }, []);

  const cropData = {
    spring: {
      name: 'Spring',
      color: 'from-green-400 to-emerald-600',
      icon: '🌱',
      crops: [
        {
          name: 'Tomatoes',
          image: '🍅',
          plantTime: 'March - April',
          harvestTime: 'June - September',
          buyTime: 'June - September',
          price: '$2.50/lb',
          trend: 'up',
          difficulty: 'Medium',
          climate: 'Warm, well-drained soil',
          tips: 'Plant after last frost. Requires consistent watering.'
        },
        {
          name: 'Lettuce',
          image: '🥬',
          plantTime: 'March - May',
          harvestTime: 'May - July',
          buyTime: 'May - July',
          price: '$1.80/head',
          trend: 'stable',
          difficulty: 'Easy',
          climate: 'Cool, moist conditions',
          tips: 'Succession plant every 2 weeks for continuous harvest.'
        },
        {
          name: 'Carrots',
          image: '🥕',
          plantTime: 'March - June',
          harvestTime: 'June - October',
          buyTime: 'June - November',
          price: '$1.20/lb',
          trend: 'up',
          difficulty: 'Easy',
          climate: 'Cool weather, loose soil',
          tips: 'Direct seed. Thin seedlings for proper root development.'
        },
        {
          name: 'Peas',
          image: '🫛',
          plantTime: 'March - April',
          harvestTime: 'May - June',
          buyTime: 'May - July',
          price: '$3.00/lb',
          trend: 'down',
          difficulty: 'Easy',
          climate: 'Cool, moist conditions',
          tips: 'Plant early. Provide support for climbing varieties.'
        }
      ]
    },
    summer: {
      name: 'Summer',
      color: 'from-yellow-400 to-orange-600',
      icon: '☀️',
      crops: [
        {
          name: 'Corn',
          image: '🌽',
          plantTime: 'May - July',
          harvestTime: 'August - October',
          buyTime: 'August - October',
          price: '$0.75/ear',
          trend: 'up',
          difficulty: 'Medium',
          climate: 'Warm, full sun',
          tips: 'Plant in blocks for better pollination. High water needs.'
        },
        {
          name: 'Watermelon',
          image: '🍉',
          plantTime: 'May - June',
          harvestTime: 'July - September',
          buyTime: 'July - September',
          price: '$0.50/lb',
          trend: 'stable',
          difficulty: 'Hard',
          climate: 'Hot, long growing season',
          tips: 'Needs lots of space and consistent heat.'
        },
        {
          name: 'Peppers',
          image: '🌶️',
          plantTime: 'May - June',
          harvestTime: 'July - October',
          buyTime: 'July - November',
          price: '$2.25/lb',
          trend: 'up',
          difficulty: 'Medium',
          climate: 'Warm, well-drained soil',
          tips: 'Start indoors. Harvest regularly to encourage production.'
        },
        {
          name: 'Cucumber',
          image: '🥒',
          plantTime: 'May - July',
          harvestTime: 'July - September',
          buyTime: 'July - September',
          price: '$1.50/lb',
          trend: 'stable',
          difficulty: 'Easy',
          climate: 'Warm, consistent moisture',
          tips: 'Provide support. Harvest frequently when young.'
        }
      ]
    },
    autumn: {
      name: 'Autumn',
      color: 'from-orange-400 to-red-600',
      icon: '🍂',
      crops: [
        {
          name: 'Pumpkins',
          image: '🎃',
          plantTime: 'June - July',
          harvestTime: 'September - November',
          buyTime: 'September - December',
          price: '$0.80/lb',
          trend: 'up',
          difficulty: 'Medium',
          climate: 'Warm start, cool finish',
          tips: 'Long growing season. Harvest before hard frost.'
        },
        {
          name: 'Brussels Sprouts',
          image: '🥬',
          plantTime: 'July - August',
          harvestTime: 'October - December',
          buyTime: 'October - February',
          price: '$2.80/lb',
          trend: 'stable',
          difficulty: 'Medium',
          climate: 'Cool weather preferred',
          tips: 'Taste improves after light frost. Harvest bottom to top.'
        },
        {
          name: 'Apples',
          image: '🍎',
          plantTime: 'Spring (trees)',
          harvestTime: 'September - November',
          buyTime: 'September - March',
          price: '$1.60/lb',
          trend: 'down',
          difficulty: 'Hard',
          climate: 'Cool winters, warm summers',
          tips: 'Tree crop. Multiple varieties for extended harvest.'
        },
        {
          name: 'Sweet Potato',
          image: '🍠',
          plantTime: 'May - June',
          harvestTime: 'September - October',
          buyTime: 'September - March',
          price: '$1.40/lb',
          trend: 'up',
          difficulty: 'Medium',
          climate: 'Warm, well-drained soil',
          tips: 'Long season crop. Cure after harvest for better storage.'
        }
      ]
    },
    winter: {
      name: 'Winter',
      color: 'from-blue-400 to-purple-600',
      icon: '❄️',
      crops: [
        {
          name: 'Kale',
          image: '🥬',
          plantTime: 'August - September',
          harvestTime: 'November - March',
          buyTime: 'November - April',
          price: '$2.20/bunch',
          trend: 'stable',
          difficulty: 'Easy',
          climate: 'Cold hardy, frost tolerant',
          tips: 'Sweetens after frost. Harvest outer leaves first.'
        },
        {
          name: 'Winter Squash',
          image: '🎃',
          plantTime: 'June - July',
          harvestTime: 'September - October',
          buyTime: 'October - March',
          price: '$1.10/lb',
          trend: 'stable',
          difficulty: 'Medium',
          climate: 'Long warm season, store cool',
          tips: 'Harvest before frost. Cure for long-term storage.'
        },
        {
          name: 'Cabbage',
          image: '🥬',
          plantTime: 'August - September',
          harvestTime: 'November - February',
          buyTime: 'November - March',
          price: '$1.30/head',
          trend: 'down',
          difficulty: 'Easy',
          climate: 'Cool weather crop',
          tips: 'Cold tolerant. Can withstand light frost.'
        },
        {
          name: 'Citrus',
          image: '🍊',
          plantTime: 'Spring (trees)',
          harvestTime: 'November - April',
          buyTime: 'November - May',
          price: '$2.40/lb',
          trend: 'up',
          difficulty: 'Hard',
          climate: 'Warm zones, frost protection',
          tips: 'Tree crop. Protect from frost. Peak season winter.'
        }
      ]
    }
  };

  const seasons = Object.keys(cropData);
  const currentSeasonData = cropData[selectedSeason];

  const getTrendIcon = (trend) => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (trend === 'down') return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
    return <div className="w-4 h-4 bg-yellow-500 rounded-full" />;
  };

  const getDifficultyColor = (difficulty) => {
    if (difficulty === 'Easy') return 'text-green-600 bg-green-100';
    if (difficulty === 'Medium') return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-[cursive]">
      {/* Header */}
      <Header/>
      <div className="bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 font-[cursive]">
              🌾 Seasonal Crop Guide
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-[cursive]">
              Your comprehensive guide to optimal planting and purchasing times. 
              Maximize profits and freshness with data-driven seasonal insights.
            </p>
          </div>

          {/* User Type Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 rounded-full p-1 flex font-[cursive]">
              <button
                onClick={() => setUserType('farmer')}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  userType === 'farmer'
                    ? 'bg-green-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Sprout className="w-5 h-5 inline mr-2" />
                For Farmers
              </button>
              <button
                onClick={() => setUserType('buyer')}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  userType === 'buyer'
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <ShoppingCart className="w-5 h-5 inline mr-2" />
                For Buyers
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Season Navigation */}
      <div className="max-w-7xl mx-auto px-6 py-8 font-[cursive]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {seasons.map((season) => {
            const seasonData = cropData[season];
            return (
              <button
                key={season}
                onClick={() => setSelectedSeason(season)}
                className={`relative overflow-hidden rounded-2xl p-6 text-center transition-all transform hover:scale-105 ${
                  selectedSeason === season
                    ? 'ring-4 ring-white shadow-2xl'
                    : 'hover:shadow-xl'
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${seasonData.color} opacity-90`}></div>
                <div className="relative z-10 text-white">
                  <div className="text-3xl mb-2">{seasonData.icon}</div>
                  <h3 className="font-bold text-lg">{seasonData.name}</h3>
                  <p className="text-sm opacity-90">{seasonData.crops.length} crops</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Current Season Info */}
        <div className={`bg-gradient-to-r ${currentSeasonData.color} rounded-3xl p-8 mb-12 text-white font-[cursive]`}>
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-6xl mb-4">{currentSeasonData.icon}</div>
            <h2 className="text-4xl font-bold mb-4">{currentSeasonData.name} Guide</h2>
            <p className="text-xl opacity-90 mb-6">
              {userType === 'farmer' 
                ? `Perfect time to plan your ${currentSeasonData.name.toLowerCase()} plantings and prepare for optimal harvests.`
                : `Discover the freshest ${currentSeasonData.name.toLowerCase()} produce and best buying opportunities.`
              }
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Current Season
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Temperate Climate
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Updated Daily
              </div>
            </div>
          </div>
        </div>

        {/* Crops Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 font-[cursive]">
          {currentSeasonData.crops.map((crop, index) => (
            <div
              key={crop.name}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 overflow-hidden cursor-pointer"
              onClick={() => setSelectedCrop(selectedCrop === crop.name ? null : crop.name)}
            >
              <div className="p-6">
                <div className="text-center mb-4">
                  <div className="text-5xl mb-3">{crop.image}</div>
                  <h3 className="text-xl font-bold text-gray-900">{crop.name}</h3>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Price</span>
                    <div className="flex items-center">
                      <span className="font-bold text-green-600">{crop.price}</span>
                      {getTrendIcon(crop.trend)}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Difficulty</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(crop.difficulty)}`}>
                      {crop.difficulty}
                    </span>
                  </div>

                  {userType === 'farmer' ? (
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-600">Plant Time</span>
                        <span className="text-sm font-medium">{crop.plantTime}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Harvest</span>
                        <span className="text-sm font-medium">{crop.harvestTime}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Best Buy Time</span>
                      <span className="text-sm font-medium">{crop.buyTime}</span>
                    </div>
                  )}
                </div>

                {/* Expanded Details */}
                {selectedCrop === crop.name && (
                  <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
                    <div>
                      <div className="flex items-center mb-2">
                        <Thermometer className="w-4 h-4 mr-2 text-gray-500" />
                        <span className="font-medium text-gray-700">Climate Needs</span>
                      </div>
                      <p className="text-sm text-gray-600 ml-6">{crop.climate}</p>
                    </div>
                    
                    <div>
                      <div className="flex items-center mb-2">
                        <Sprout className="w-4 h-4 mr-2 text-gray-500" />
                        <span className="font-medium text-gray-700">Tips</span>
                      </div>
                      <p className="text-sm text-gray-600 ml-6">{crop.tips}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Action Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 text-center font-[cursive]">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to {userType === 'farmer' ? 'Start Farming' : 'Start Buying'}?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            {userType === 'farmer' 
              ? 'Connect with buyers, track your plantings, and maximize your harvest profits with our agricultural platform.'
              : 'Find the freshest local produce, connect directly with farmers, and get the best seasonal deals.'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-green-500 text-white px-8 py-4 rounded-full font-medium hover:bg-green-600 transition-colors">
              {userType === 'farmer' ? 'Join as Farmer' : 'Browse Local Produce'}
            </button>
            <button className="bg-gray-100 text-gray-700 px-8 py-4 rounded-full font-medium hover:bg-gray-200 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20 font-[cursive]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="text-2xl mb-4">🌾</div>
          <p className="text-gray-400">
            Connecting farmers and buyers through seasonal intelligence
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SeasonalCropGuide;