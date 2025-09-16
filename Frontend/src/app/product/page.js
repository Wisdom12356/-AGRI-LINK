'use client'
import React, { useState, useEffect } from 'react';
import { Search, Filter, List, Grid, ChevronDown, Star, ShoppingBag, Heart, AlertCircle, ArrowUpDown } from 'lucide-react';
import Header from '../components/header';
import Link from 'next/link';
import Head from 'next/head';

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState('grid');
  const [sortOption, setSortOption] = useState('popularity');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeFilters, setActiveFilters] = useState({
    category: 'all',
    priceRange: [0, 1000],
    organic: false,
    farmType: 'all',
    certifications: []
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Simulate loading products
  useEffect(() => {
    // Mock data - in a real app, you would fetch this from an API
    const mockProducts = [
      {
        id: 1,
        name: 'Organic Heirloom Tomatoes',
        farm: 'Sunshine Valley Farm',
        verified: true,
        description: 'Locally grown heirloom tomatoes, perfect for salads and cooking.',
        price: 4.99,
        unit: 'lb',
        image: '/images/tomatoes.jpg', // Updated image
        category: 'produce',
        organic: true,
        inStock: true,
        rating: 4.8,
        farmType: 'family',
        certifications: ['USDA Organic'],
        harvestDate: '2025-04-20'
      },
      {
        id: 2,
        name: 'Premium Alfalfa Hay',
        farm: 'Green Meadows',
        verified: true,
        description: 'High-quality alfalfa hay for livestock. Cut and baled fresh.',
        price: 12.50,
        unit: 'bale',
        image: '/images/hay.jpg', // Updated image
        category: 'livestock feed',
        organic: false,
        inStock: true,
        rating: 4.5,
        farmType: 'cooperative',
        certifications: [],
        harvestDate: '2025-04-15'
      },
      {
        id: 3,
        name: 'Raw Wildflower Honey',
        farm: 'Buzzing Acres Apiary',
        verified: true,
        description: 'Unfiltered wildflower honey collected from local fields.',
        price: 8.75,
        unit: 'jar',
        image: '/images/honey.jpg', // Updated image
        category: 'honey',
        organic: true,
        inStock: true,
        rating: 5.0,
        farmType: 'family',
        certifications: ['Certified Natural'],
        harvestDate: '2025-04-10'
      },
      {
        id: 4,
        name: 'Non-GMO Corn Feed',
        farm: 'Heritage Grains Co-op',
        verified: false,
        description: 'Non-GMO corn feed for poultry and livestock.',
        price: 22.99,
        unit: '50lb bag',
        image: '/images/cornfeed.jpg', // Updated image
        category: 'grains',
        organic: false,
        inStock: true,
        rating: 4.3,
        farmType: 'cooperative',
        certifications: ['Non-GMO Project'],
        harvestDate: '2025-03-30'
      },
      {
        id: 5,
        name: 'Fresh Free-Range Eggs',
        farm: 'Happy Hen Farmstead',
        verified: true,
        description: 'Farm fresh eggs from free-range, pasture-raised chickens.',
        price: 6.25,
        unit: 'dozen',
        image: '/images/eggs.jpg', // Updated image
        category: 'dairy',
        organic: true,
        inStock: false,
        rating: 4.9,
        farmType: 'family',
        certifications: ['Certified Humane'],
        harvestDate: '2025-04-27'
      },
      {
        id: 6,
        name: 'Grass-Fed Beef Quarter',
        farm: 'Rolling Hills Ranch',
        verified: true,
        description: 'Premium grass-fed beef, sold by the quarter. Custom processing available.',
        price: 750.00,
        unit: 'quarter',
        image: '/images/beef.jpg', // Updated image
        category: 'meat',
        organic: false,
        inStock: true,
        rating: 4.7,
        farmType: 'family',
        certifications: ['Grass-fed Certified'],
        harvestDate: '2025-04-01'
      }
    ];
    
    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
  }, []);

  // Apply filters and search
  useEffect(() => {
    let results = [...products];
    
    // Apply search
    if (searchQuery) {
      results = results.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.farm.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply category filter
    if (activeFilters.category !== 'all') {
      results = results.filter(p => p.category === activeFilters.category);
    }
    
    // Apply organic filter
    if (activeFilters.organic) {
      results = results.filter(p => p.organic);
    }
    
    // Apply farm type filter
    if (activeFilters.farmType !== 'all') {
      results = results.filter(p => p.farmType === activeFilters.farmType);
    }
    
    // Apply certification filters
    if (activeFilters.certifications.length > 0) {
      results = results.filter(p => 
        activeFilters.certifications.some(cert => 
          p.certifications.includes(cert)
        )
      );
    }
    
    // Apply sorting
    switch(sortOption) {
      case 'price-low':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        results.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        results.sort((a, b) => new Date(b.harvestDate) - new Date(a.harvestDate));
        break;
      default: // popularity (by rating)
        results.sort((a, b) => b.rating - a.rating);
    }
    
    setFilteredProducts(results);
  }, [products, searchQuery, activeFilters, sortOption]);

  const toggleFilter = (filterType, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const openProductDetails = (product) => {
    setSelectedProduct(product);
  };

  const closeProductDetails = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50" style={{ fontFamily: 'cursive' }}>
      {/* Header */}
      <Header/>
      <header className="sticky top-0 z-10 bg-white shadow-md p-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-green-800">Farm Fresh Market</h1>
            <div className="flex items-center space-x-4">
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center">
                <ShoppingBag className="mr-2 w-4 h-4" />
                <span>Cart (0)</span>
              </button>
            </div>
          </div>
          
          {/* Search bar */}
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Search for products, farms, or categories..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto flex-grow p-4">
        {/* Mobile filter toggle */}
        <div className="lg:hidden mb-4">
          <button 
            className="w-full bg-white border border-gray-300 rounded-lg p-3 flex items-center justify-between shadow-sm"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <div className="flex items-center">
              <Filter className="h-5 w-5 mr-2 text-gray-600" />
              <span>Filters</span>
            </div>
            <ChevronDown className={`h-5 w-5 transition-transform ${isFilterOpen ? 'transform rotate-180' : ''}`} />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters sidebar - hidden on mobile unless toggled */}
          <aside className={`lg:w-1/4 bg-white p-4 rounded-lg shadow-sm ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-3">Categories</h3>
              <div className="space-y-2">
                {['all', 'produce', 'dairy', 'meat', 'grains', 'livestock feed', 'honey'].map(category => (
                  <div key={category} className="flex items-center">
                    <input
                      type="radio"
                      id={`category-${category}`}
                      name="category"
                      checked={activeFilters.category === category}
                      onChange={() => toggleFilter('category', category)}
                      className="mr-2 text-green-600 focus:ring-green-500"
                    />
                    <label htmlFor={`category-${category}`} className="capitalize">
                      {category === 'all' ? 'All Categories' : category}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-3">Production Method</h3>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="organic"
                  checked={activeFilters.organic}
                  onChange={() => toggleFilter('organic', !activeFilters.organic)}
                  className="mr-2 text-green-600 focus:ring-green-500"
                />
                <label htmlFor="organic">Organic Only</label>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-3">Farm Type</h3>
              <div className="space-y-2">
                {['all', 'family', 'cooperative', 'commercial'].map(type => (
                  <div key={type} className="flex items-center">
                    <input
                      type="radio"
                      id={`farm-${type}`}
                      name="farmType"
                      checked={activeFilters.farmType === type}
                      onChange={() => toggleFilter('farmType', type)}
                      className="mr-2 text-green-600 focus:ring-green-500"
                    />
                    <label htmlFor={`farm-${type}`} className="capitalize">
                      {type === 'all' ? 'All Farm Types' : type}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-3">Certifications</h3>
              <div className="space-y-2">
                {['USDA Organic', 'Non-GMO Project', 'Certified Humane', 'Grass-fed Certified', 'Certified Natural'].map(cert => (
                  <div key={cert} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`cert-${cert}`}
                      checked={activeFilters.certifications.includes(cert)}
                      onChange={() => {
                        const newCerts = activeFilters.certifications.includes(cert)
                          ? activeFilters.certifications.filter(c => c !== cert)
                          : [...activeFilters.certifications, cert];
                        toggleFilter('certifications', newCerts);
                      }}
                      className="mr-2 text-green-600 focus:ring-green-500"
                    />
                    <label htmlFor={`cert-${cert}`}>{cert}</label>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Products main content */}
          <div className="flex-grow">
            {/* Controls bar */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center">
                <span className="text-gray-600 mr-2">{filteredProducts.length} products</span>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <label htmlFor="sort" className="mr-2 text-gray-600">Sort by:</label>
                  <select 
                    id="sort" 
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="popularity">Popularity</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Customer Rating</option>
                    <option value="newest">Newest Arrivals</option>
                  </select>
                </div>
                
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button 
                    className={`p-2 ${viewMode === 'grid' ? 'bg-green-100 text-green-700' : 'text-gray-600'}`}
                    onClick={() => setViewMode('grid')}
                    aria-label="Grid View"
                  >
                    <Grid className="h-5 w-5" />
                  </button>
                  <button 
                    className={`p-2 ${viewMode === 'list' ? 'bg-green-100 text-green-700' : 'text-gray-600'}`}
                    onClick={() => setViewMode('list')}
                    aria-label="List View"
                  >
                    <List className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products grid/list */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <AlertCircle className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
                <h3 className="text-lg font-semibold mb-2">No products found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map(product => (
                  <div 
                    key={product.id} 
                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => openProductDetails(product)}
                  >
                    <div className="relative h-48">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                      />
                      {product.organic && (
                        <span className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                          Organic
                        </span>
                      )}
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <span className="text-white font-semibold text-lg">Out of Stock</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold">{product.name}</h3>
                        <div className="flex items-center text-yellow-500">
                          <Star className="fill-current w-4 h-4" />
                          <span className="ml-1 text-sm">{product.rating}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <span>{product.farm}</span>
                        {product.verified && (
                          <span className="ml-1 text-blue-500 text-xs">✓ Verified</span>
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-500 mb-3 line-clamp-2">{product.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-900">
                          ${product.price.toFixed(2)} <span className="text-gray-600 text-sm font-normal">per {product.unit}</span>
                        </span>
                        <button className="p-2 rounded-full bg-green-50 text-green-600 hover:bg-green-100">
                          <Heart className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map(product => (
                  <div 
                    key={product.id} 
                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer flex"
                    onClick={() => openProductDetails(product)}
                  >
                    <div className="relative w-40 h-32 sm:w-48 sm:h-36">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                      />
                      {product.organic && (
                        <span className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                          Organic
                        </span>
                      )}
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">Out of Stock</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-grow p-4 flex flex-col sm:flex-row">
                      <div className="flex-grow">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold">{product.name}</h3>
                          <div className="flex items-center text-yellow-500">
                            <Star className="fill-current w-4 h-4" />
                            <span className="ml-1 text-sm">{product.rating}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <span>{product.farm}</span>
                          {product.verified && (
                            <span className="ml-1 text-blue-500 text-xs">✓ Verified</span>
                          )}
                        </div>
                        
                        <p className="text-sm text-gray-500 mb-3">{product.description}</p>
                        
                        <div className="flex flex-wrap gap-1 mb-2">
                          {product.certifications.map(cert => (
                            <span key={cert} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                              {cert}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex flex-row sm:flex-col items-center justify-between sm:justify-center sm:w-36 mt-2 sm:mt-0 sm:ml-4 gap-2">
                        <span className="font-bold text-gray-900 text-right sm:text-center">
                          ${product.price.toFixed(2)} 
                          <div className="text-gray-600 text-sm font-normal">per {product.unit}</div>
                        </span>
                        <div className="flex gap-2">
                          <button className="p-2 rounded-full bg-green-50 text-green-600 hover:bg-green-100">
                            <Heart className="w-5 h-5" />
                          </button>
                          <button className="p-2 rounded-full bg-green-600 text-white hover:bg-green-700">
                            <ShoppingBag className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Product detail modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-screen overflow-auto">
            <div className="relative">
              <button 
                className="absolute top-4 right-4 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                onClick={closeProductDetails}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2">
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name} 
                    className="w-full h-64 md:h-96 object-cover"
                  />
                </div>
                
                <div className="p-6 md:w-1/2">
                  <div className="flex items-center mb-2">
                    {selectedProduct.organic && (
                      <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full mr-2">
                        Organic
                      </span>
                    )}
                    <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600 mb-4">
                    <span className="font-medium">{selectedProduct.farm}</span>
                    {selectedProduct.verified && (
                      <span className="ml-2 text-blue-500 text-xs">✓ Verified Seller</span>
                    )}
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <div className="flex items-center text-yellow-500 mr-2">
                      <Star className="fill-current w-4 h-4" />
                      <span className="ml-1 font-medium">{selectedProduct.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-6">{selectedProduct.description}</p>
                  
                  <div className="mb-6">
                    <h3 className="font-semibold mb-2">Details</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex">
                        <span className="w-32 text-gray-600">Category:</span>
                        <span className="capitalize">{selectedProduct.category}</span>
                      </li>
                      <li className="flex">
                        <span className="w-32 text-gray-600">Farm Type:</span>
                        <span className="capitalize">{selectedProduct.farmType}</span>
                      </li>
                      <li className="flex">
                        <span className="w-32 text-gray-600">Harvest Date:</span>
                        <span>{new Date(selectedProduct.harvestDate).toLocaleDateString()}</span>
                      </li>
                      <li className="flex">
                        <span className="w-32 text-gray-600">Certifications:</span>
                        <div className="flex flex-wrap gap-1">
                          {selectedProduct.certifications.length > 0 ? selectedProduct.certifications.map(cert => (
                            <span key={cert} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                              {cert}
                            </span>
                          )) : <span className="text-gray-500">None</span>}
                        </div>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-gray-900">
                          {new Intl.NumberFormat('fr-FR', {
                            style: 'currency',
                            currency: 'XAF',
                            minimumFractionDigits: 0,
                            currencyDisplay: 'name'
                          }).format(selectedProduct.price)}
                        </span>
                        <span className="text-gray-600 ml-1">per {selectedProduct.unit}</span>
                      </div>
                      <div className="flex items-center">
                        <span className={`px-2 py-1 rounded text-sm ${selectedProduct.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {selectedProduct.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 mt-8">
                    <button 
                      className={`flex-grow py-3 px-4 rounded-lg font-medium flex items-center justify-center ${
                        selectedProduct.inStock 
                          ? 'bg-green-600 hover:bg-green-700 text-white' 
                          : 'bg-gray-300 cursor-not-allowed text-gray-500'
                      }`}
                      disabled={!selectedProduct.inStock}
                    >
                      <ShoppingBag className="mr-2 w-5 h-5" />
                      Add to Cart
                    </button>
                    <button className="py-3 px-4 rounded-lg border border-gray-300 hover:bg-gray-50 flex items-center justify-center">
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="mt-8">
                    <h3 className="font-semibold mb-4">You might also like</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {products.filter(p => p.id !== selectedProduct.id).slice(0, 3).map(product => (
                        <div 
                          key={product.id} 
                          className="bg-gray-100 rounded p-2 cursor-pointer hover:bg-gray-200"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProduct(product);
                          }}
                        >
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-16 object-cover rounded mb-1"
                          />
                          <h4 className="text-xs font-medium truncate">{product.name}</h4>
                          <p className="text-xs text-gray-700">${product.price.toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}