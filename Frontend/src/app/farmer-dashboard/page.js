'use client'
import React, { useState } from 'react';
import { Bell, Search, Menu } from 'lucide-react';
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
              <div className="flex items-center space-x-3">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" alt="Admin" className="w-8 h-8 rounded-full" />
                <div className="hidden md:block">
                  <p className="font-medium text-slate-900">Farmer User</p>
                  <p className="text-xs text-slate-500"></p>
                </div>
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