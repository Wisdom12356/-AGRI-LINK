'use client'
import React from 'react';
import { TrendingUp, Users, ShoppingCart, MapPin, Filter, Download, Eye, Edit, BarChart3, Plus, Globe, Shield, Package, Leaf, Calendar } from 'lucide-react';

export default function Overview() {
  const stats = [
    { label: 'Monthly Revenue', value: '₱124,500', change: '+12.5%', icon: TrendingUp, color: 'bg-emerald-500' },
    { label: 'Active Products', value: '24', change: '+3', icon: Package, color: 'bg-blue-500' },
    { label: 'Pending Orders', value: '12', change: '+5', icon: ShoppingCart, color: 'bg-purple-500' },
    { label: 'Harvest Season', value: 'Active', icon: Leaf, color: 'bg-orange-500' }
  ];

  const recentOrders = [
    { id: 'ORD-001', customer: 'John Smith', product: 'Organic Rice', amount: '₱5,200', status: 'Pending' },
    { id: 'ORD-002', customer: 'Maria Garcia', product: 'Fresh Vegetables', amount: '₱3,800', status: 'Processing' },
    { id: 'ORD-003', customer: 'David Lee', product: 'Corn Feed', amount: '₱7,500', status: 'Shipped' },
  ];

  const inventory = [
    { product: 'Organic Rice', stock: '500kg', status: 'In Stock', price: '₱65/kg' },
    { product: 'Fresh Vegetables', stock: '200kg', status: 'Low Stock', price: '₱45/kg' },
    { product: 'Corn Feed', stock: '1000kg', status: 'In Stock', price: '₱35/kg' },
  ];

  const quickActions = [
    { label: 'Add New Product', icon: Plus, color: 'bg-blue-500', href: '/farmer-dashboard/add-product' },
    { label: 'View Orders', icon: Eye, color: 'bg-purple-500', href: '/farmer-dashboard/orders' },
    { label: 'Update Inventory', icon: Edit, color: 'bg-emerald-500', href: '/farmer-dashboard/inventory' },
    { label: 'Download Reports', icon: Download, color: 'bg-orange-500', href: '#' },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">{stat.label}</p>
                <h3 className="text-2xl font-semibold mt-2">{stat.value}</h3>
                {stat.change && (
                  <p className="text-sm font-medium text-emerald-600 mt-1">{stat.change}</p>
                )}
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                {React.createElement(stat.icon, { className: 'w-6 h-6 text-white' })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders and Inventory */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Recent Orders</h2>
            <a href="/farmer-dashboard/orders" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-slate-500">
                  <th className="pb-4">Order ID</th>
                  <th className="pb-4">Customer</th>
                  <th className="pb-4">Product</th>
                  <th className="pb-4">Amount</th>
                  <th className="pb-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, index) => (
                  <tr key={index} className="border-t border-slate-100">
                    <td className="py-4 text-sm">{order.id}</td>
                    <td className="py-4 text-sm">{order.customer}</td>
                    <td className="py-4 text-sm">{order.product}</td>
                    <td className="py-4 text-sm">{order.amount}</td>
                    <td className="py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Inventory Status */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Inventory Status</h2>
            <a href="/farmer-dashboard/inventory" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Manage Inventory
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-slate-500">
                  <th className="pb-4">Product</th>
                  <th className="pb-4">Stock</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4">Price</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item, index) => (
                  <tr key={index} className="border-t border-slate-100">
                    <td className="py-4 text-sm">{item.product}</td>
                    <td className="py-4 text-sm">{item.stock}</td>
                    <td className="py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        item.status === 'In Stock' ? 'bg-green-100 text-green-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 text-sm">{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-lg font-semibold mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <a
              key={index}
              href={action.href}
              className="flex items-center p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-sm transition-all"
            >
              <div className={`${action.color} p-3 rounded-lg mr-4`}>
                {React.createElement(action.icon, { className: 'w-5 h-5 text-white' })}
              </div>
              <span className="font-medium">{action.label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Calendar View */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Upcoming Schedule</h2>
          <div className={`bg-blue-500 p-2 rounded-lg`}>
            <Calendar className="w-5 h-5 text-white" />
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
            <div>
              <h3 className="font-medium">Rice Harvest</h3>
              <p className="text-sm text-slate-500">September 25, 2025</p>
            </div>
            <span className="px-3 py-1 text-xs bg-green-100 text-green-800 rounded-full">Scheduled</span>
          </div>
          <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
            <div>
              <h3 className="font-medium">Vegetable Planting</h3>
              <p className="text-sm text-slate-500">October 1, 2025</p>
            </div>
            <span className="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">Upcoming</span>
          </div>
        </div>
      </div>
    </div>
  );
}
