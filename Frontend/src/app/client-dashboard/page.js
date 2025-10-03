'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { Search, MapPin, Filter, Bell, User, ShoppingCart, TrendingUp, Star, Package, Truck, Phone, Mail, Globe, Menu, X, ChevronDown, Heart, MessageSquare } from 'lucide-react';
import { io } from 'socket.io-client';
import ProductCard from '../components/ProductCard';
import ChatModal from '../components/Chat/ChatModal';

const AgriculturalDashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState('Yaoundé, Centre');
  const [language, setLanguage] = useState('en');
  const [favorites, setFavorites] = useState(new Set());
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [socket, setSocket] = useState(null);

  const handleLogout = () => {
    // Clear all authentication data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    
    // Disconnect socket
    if (socket) {
      socket.disconnect();
    }
    
    // Redirect to login page
    window.location.href = '/login';
  };

  const fetchChatHistory = async (orderId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch(`http://localhost:5000/api/chat/order/${orderId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch chat history');
      }

      const messages = await response.json();
      setMessages(messages);
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await fetch('http://localhost:5000/api/orders/my-orders', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setOrders(data.orders || []);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    // Initialize Socket.IO with auth token
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    
    console.log('Initializing socket with credentials:', { hasToken: !!token, hasUserId: !!userId });
    
    const newSocket = io('http://localhost:5000', {
      auth: {
        token,
        userId
      },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
    
    // Handle socket events
    newSocket.on('connect', () => {
      console.log('Socket connected');
    });

    newSocket.on('chat-message', (message) => {
      console.log('Received message:', message);
      setMessages(prev => [...prev, message]);
    });

    newSocket.on('error', (error) => {
      console.error('Socket error:', error);
    });

    newSocket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    setSocket(newSocket);

    // Fetch initial data
    fetchProducts();
    fetchOrders();

    // Cleanup function
    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, []);

  const categories = [
    { id: 'all', name: 'All Products', icon: '🌾' },
    { id: 'vegetables', name: 'Vegetables', icon: '🥕' },
    { id: 'fruits', name: 'Fruits', icon: '🍎' },
    { id: 'grains', name: 'Grains', icon: '🌽' },
    { id: 'cash-crops', name: 'Cash Crops', icon: '☕' }
  ];

  const stats = [
    { label: 'Total Orders', value: orders?.length || 0, icon: Package },
    { label: 'Active Orders', value: orders?.filter(o => o.status === 'pending').length || 0, icon: TrendingUp },
    { label: 'Completed Orders', value: orders?.filter(o => o.status === 'delivered').length || 0, icon: Star }
  ];

  const handleSendMessageAsync = async (message) => {
    if (!currentChat?.orderId) return;
    
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`http://localhost:5000/api/chat/order/${currentChat.orderId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          message,
          recipientId: currentChat.farmerId
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      // The actual message will be received through the socket
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category.toLowerCase() === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (product.farmerId?.name || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFavorite = (productId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  const handleSendMessage = async (messageText) => {
    if (!currentChat || !messageText.trim() || !socket) {
      console.log('Cannot send message:', { currentChat, messageText, hasSocket: !!socket });
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      
      console.log('Authentication check:', {
        hasToken: !!token,
        tokenValue: token,
        hasUserId: !!userId,
        userIdValue: userId
      });
      
      if (!userId || !token) {
        console.error('Missing authentication data:', { hasToken: !!token, hasUserId: !!userId });
        throw new Error('Not authenticated - missing ' + (!token ? 'token' : 'userId'));
      }

      // Create message object
      if (!currentChat.farmerId) {
        console.error('No farmer ID available');
        return;
      }

      const newMessage = {
        orderId: currentChat.orderId,
        senderId: userId,
        recipientId: currentChat.farmerId,
        message: messageText, // Changed from content to message to match backend
        timestamp: new Date().toISOString(),
      };
      
      console.log('Sending message:', newMessage);
      
      // Emit the message through socket
      socket.emit('chat-message', newMessage, (acknowledgement) => {
        console.log('Message acknowledgement:', acknowledgement);
      });
      
      // Add to local messages
      const localMessage = {
        ...newMessage,
        content: messageText, // Keep content for local display
        _id: Date.now().toString(),
      };
      
      setMessages(prev => [...prev, localMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">🌾</span>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                AgriLink
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{userLocation}</span>
              </div>
              
              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
                className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="en">English</option>
                <option value="fr">Français</option>
              </select>

              <button className="relative p-2 text-gray-600 hover:text-green-600 transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>

              <button className="relative p-2 text-gray-600 hover:text-green-600 transition-colors">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></span>
              </button>

              <div className="flex items-center space-x-2 bg-gray-100 rounded-full px-3 py-2">
                <User className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium">Client</span>
                <button
                  onClick={handleLogout}
                  className="ml-2 text-sm text-red-600 hover:text-red-800 hover:underline"
                  title="Logout"
                >
                  Logout
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-green-600 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-3 space-y-3">
              <div className="flex items-center space-x-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{userLocation}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Language:</span>
                <select 
                  value={language} 
                  onChange={(e) => setLanguage(e.target.value)}
                  className="text-sm border border-gray-300 rounded px-2 py-1"
                >
                  <option value="en">English</option>
                  <option value="fr">Français</option>
                </select>
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left text-sm text-red-600 hover:text-red-800 hover:underline py-2"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Chat Toggle Button */}
        <button
          onClick={() => setShowChat(!showChat)}
          className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors"
        >
          {showChat ? <X /> : <MessageSquare />}
        </button>

        {/* Chat will be rendered through ChatModal component */}

        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, Client! 👋
          </h2>
          <p className="text-gray-600">Discover fresh produce from local farmers in your area</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-green-600 font-medium">{stat.trend}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products, farmers, or locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-xl px-4 py-3 pr-8 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent min-w-48"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.icon} {category.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>

            {/* Filter Button */}
            <button className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all font-medium">
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                isFavorite={favorites.has(product._id)}
                onFavoriteToggle={toggleFavorite}
              />
            ))}
          </div>
        )}

        {/* Recent Orders */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {!orders?.length ? (
              <div className="p-6 text-center text-gray-500">
                <Package className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-lg font-medium">No orders yet</p>
                <p className="text-sm">Start shopping and your orders will appear here</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          #{order._id.slice(-8)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.productId?.name || 'Unknown Product'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.quantity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Intl.NumberFormat('fr-FR', {
                            style: 'currency',
                            currency: 'XAF',
                            minimumFractionDigits: 0
                          }).format(order.totalPrice)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${order.status === 'delivered' ? 'bg-green-100 text-green-800' : 
                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-gray-100 text-gray-800'}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => {
                              // Debug log the complete order object
                              console.log('Debug - Complete order object:', JSON.stringify(order, null, 2));
                              
                              // Get farmer info directly from the order
                              const farmerId = order.farmerId._id;
                              const farmerName = order.farmerId.name;
                              
                              if (!farmerId) {
                                console.error('No farmer ID found in order:', order._id);
                                return;
                              }
                              
                              console.log('Debug - Final Chat Info:', {
                                orderId: order._id,
                                farmerId: farmerId,
                                farmerName: farmerName,
                                productName: order.productId.name
                              });
                              
                              const chatInfo = {
                                orderId: order._id,
                                farmerId: farmerId,
                                farmerName: farmerName || 'Farmer'
                              };
                              
                              console.log('Debug - Chat Info:', chatInfo);
                              
                              // Verify we have the required IDs
                              if (!chatInfo.farmerId) {
                                console.error('Missing farmerId:', {
                                  productId: order.productId,
                                  farmerInfo: order.productId?.farmerId
                                });
                                return;
                              }
                              
                              setCurrentChat(chatInfo);
                              setShowChat(true);
                              
                              // Fetch chat history
                              fetchChatHistory(order._id);
                              
                              // Join chat room
                              if (socket) {
                                socket.emit('join-chat-room', {
                                  orderId: order._id,
                                  userId: localStorage.getItem('userId')
                                });
                              }
                            }}
                            className="text-green-600 hover:text-green-900 inline-flex items-center space-x-2"
                          >
                            <MessageSquare className="w-4 h-4" />
                            <span>Chat with Farmer</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Load More Button */}
        <div className="text-center mt-8">
          <button className="bg-white border border-gray-300 text-gray-700 px-8 py-3 rounded-xl hover:border-green-500 hover:text-green-600 transition-colors font-medium">
            Load More Products
          </button>
        </div>
      </div>

      {/* Quick Action Buttons (Mobile) */}
      <div className="fixed bottom-4 right-4 md:hidden">
        <div className="flex flex-col space-y-3">
          <button className="w-12 h-12 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-full shadow-lg flex items-center justify-center">
            <ShoppingCart className="w-5 h-5" />
          </button>
          <button className="w-12 h-12 bg-white text-gray-600 border border-gray-300 rounded-full shadow-lg flex items-center justify-center">
            <Phone className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Chat Modal */}
      <ChatModal
        isOpen={showChat}
        onClose={() => setShowChat(false)}
        currentChat={currentChat}
        messages={messages}
        onSendMessage={handleSendMessage}
        orderId={currentChat?.orderId}
        farmerId={currentChat?.farmerId}
        clientId={localStorage.getItem('userId')}
      />
    </div>
  );
};

export default AgriculturalDashboard;