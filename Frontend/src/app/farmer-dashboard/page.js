'use client'
import React, { useState } from 'react';
import { Bell, Search, Menu, LogOut, User } from 'lucide-react';
import Sidebar from '../components/FarmerDashboard/sidebar';
import Overview from '../components/FarmerDashboard/sections/Overview';
import UnderDevelopment from '../components/FarmerDashboard/sections/UnderDevelopment';
import OrderManagement from '../components/FarmerDashboard/sections/OrderManagement';
import ProductManagement from '../components/FarmerDashboard/sections/ProductManagement';
import CustomerManagement from '../components/FarmerDashboard/sections/CustomerManagement';
import ReviewManagement from '../components/FarmerDashboard/sections/ReviewManagement';
import ProfileManagement from '../components/FarmerDashboard/sections/ProfileManagement';
import Marketplace from '../components/FarmerDashboard/sections/Marketplace';
import Messages from '../components/FarmerDashboard/sections/Messages';
import MarketingTrends from '../components/FarmerDashboard/MarketingTrends';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Get user info from localStorage on component mount and validate token
  React.useEffect(() => {
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (userData && token) {
      try {
        // Check if token is expired
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Date.now() / 1000;
        
        if (payload.exp < currentTime) {
          console.log('Token expired, redirecting to login');
          handleLogout();
          return;
        }
        
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data or token:', error);
        // If there's an error parsing, clear everything and redirect to login
        handleLogout();
      }
    } else {
      // No user data or token, redirect to login
      console.log('No user data or token found, redirecting to login');
      window.location.href = '/login';
    }
  }, []);

  // Logout function
  const handleLogout = () => {
    // Clear all stored data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    
    // Redirect to login page
    window.location.href = '/login';
  };

  // Close user menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUserMenu && !event.target.closest('.user-menu-container')) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
      
      {/* Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-slate-100"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 capitalize">{activeTab}</h2>
                <p className="text-slate-500">Manage your agricultural marketplace</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              <button className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              
              {/* User Menu */}
              <div className="relative user-menu-container">
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-3 p-2 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" 
                    alt="Farmer" 
                    className="w-8 h-8 rounded-full" 
                  />
                  <div className="hidden md:block text-left">
                    <p className="font-medium text-slate-900">
                      {user?.name || 'Farmer User'}
                    </p>
                    <p className="text-xs text-slate-500">
                      {user?.email || 'farmer@example.com'}
                    </p>
                  </div>
                </button>

                {/* Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-sm font-medium text-slate-900">
                        {user?.name || 'Farmer User'}
                      </p>
                      <p className="text-xs text-slate-500">
                        {user?.email || 'farmer@example.com'}
                      </p>
                    </div>
                    
                    <button
                      onClick={() => {
                        setActiveTab('profile');
                        setShowUserMenu(false);
                      }}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      <User className="w-4 h-4" />
                      <span>Profile</span>
                    </button>
                    
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {activeTab === 'overview' ? (
            <Overview />
          ) : activeTab === 'marketplace' ? (
            <Marketplace />
          ) : activeTab === 'orders' ? (
            <OrderManagement />
          ) : activeTab === 'products' ? (
            <ProductManagement />
          ) : activeTab === 'customers' ? (
            <CustomerManagement />
          ) : activeTab === 'reviews' ? (
            <ReviewManagement />
          ) : activeTab === 'messages' ? (
            <Messages />
          ) : activeTab === 'profile' ? (
            <ProfileManagement />
          ) : activeTab === 'marketing' ? (
            <MarketingTrends />
          ) : (
            <UnderDevelopment section={activeTab} />
          )}
        </main>
      </div>
    </div>
  );
}