import React from "react";
import { BarChart3, Users, ShoppingCart, Star, TrendingUp, X, Zap, UserIcon, Store, MessageSquare } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen }) {
    const sidebarItems = [
        { id: 'overview', label: 'Overview', icon: BarChart3 },
        { id: 'marketplace', label: 'Marketplace', icon: Store },
        { id: 'orders', label: 'Orders', icon: ShoppingCart },
        { id: 'products', label: 'Products', icon: Star },
        { id: 'marketing', label: 'Marketing Trends', icon: TrendingUp },
        { id: 'customers', label: 'Customers', icon: Users },
        { id: 'reviews', label: 'Reviews', icon: Star },
        { id: 'messages', label: 'Messages', icon: MessageSquare, badge: true },
        { id: 'profile', label: 'Profile', icon: UserIcon },
      ];
    return(
        <div className={`fixed left-0 top-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 z-50 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
                <div className="p-6 border-b border-slate-200">
                  <div className="flex items-center justify-between">
                    <a href="/" className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                        <Zap className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h1 className="font-bold text-slate-900">AgriSales</h1>
                        <p className="text-xs text-slate-500">Admin Dashboard</p>
                      </div>
                    </a>
                    <button 
                      onClick={() => setSidebarOpen(false)}
                      className="lg:hidden p-1 rounded-lg hover:bg-slate-100"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                <nav className="p-4 space-y-2">
                  {sidebarItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                          activeTab === item.id 
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg' 
                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center space-x-3">
                            <Icon className="w-5 h-5" />
                            <span>{item.label}</span>
                          </div>
                          {item.badge && (
                            <div className="px-2 py-1 bg-red-500 text-white text-xs rounded-full">
                              2
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </nav>
            </div>
    )
}