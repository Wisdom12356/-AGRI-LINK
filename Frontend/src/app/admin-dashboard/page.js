'use client'

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  ShoppingCart,
  CheckCircle,
  XCircle,
  Eye,
  Download,
  Filter,
  Search,
  Calendar,
  BarChart3,
  PieChart,
  AlertTriangle,
  Leaf
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTimeRange, setSelectedTimeRange] = useState('7days');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data - replace with actual API calls
  const [dashboardData, setDashboardData] = useState({
    overview: {
      totalUsers: 1247,
      totalSales: 89650,
      pendingAccounts: 23,
      monthlyGrowth: 12.5
    },
    pendingAccounts: [
      { id: 1, name: 'Green Valley Farm', email: 'contact@greenvalley.com', type: 'Seller', location: 'California', submitted: '2024-01-15', documents: 5 },
      { id: 2, name: 'Fresh Produce Co.', email: 'orders@freshproduce.com', type: 'Buyer', location: 'New York', submitted: '2024-01-14', documents: 3 },
      { id: 3, name: 'Organic Harvest Ltd.', email: 'info@organicharvest.com', type: 'Seller', location: 'Oregon', submitted: '2024-01-13', documents: 4 },
    ],
    salesData: [
      { id: 1, buyer: 'FreshMart Chain', seller: 'Sunny Acres Farm', product: 'Organic Tomatoes', quantity: '500 kg', amount: 2500, date: '2024-01-15', status: 'Completed' },
      { id: 2, buyer: 'Local Grocery', seller: 'Green Fields', product: 'Fresh Lettuce', quantity: '200 kg', amount: 800, date: '2024-01-15', status: 'Processing' },
      { id: 3, buyer: 'Restaurant Supply', seller: 'Valley Produce', product: 'Bell Peppers', quantity: '300 kg', amount: 1800, date: '2024-01-14', status: 'Completed' },
    ]
  });

  const handleAccountAction = (accountId, action) => {
    setDashboardData(prev => ({
      ...prev,
      pendingAccounts: prev.pendingAccounts.filter(account => account.id !== accountId)
    }));
    // Here you would make an API call to approve/reject the account
    console.log(`Account ${accountId} ${action}`);
  };

  const generateReport = (type) => {
    // Mock report generation - replace with actual implementation
    console.log(`Generating ${type} report...`);
    alert(`${type} report generated and downloaded!`);
  };

  const filteredAccounts = dashboardData.pendingAccounts.filter(account => 
    account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const StatCard = ({ icon: Icon, title, value, change, color = 'blue' }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {change && (
            <div className={`flex items-center mt-2 text-sm ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              <TrendingUp className="w-4 h-4 mr-1" />
              {change > 0 ? '+' : ''}{change}%
            </div>
          )}
        </div>
        <div className={`bg-${color}-100 p-3 rounded-lg`}>
          <Icon className={`w-8 h-8 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Leaf className="w-8 h-8 text-green-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Agri-Link Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <select 
                value={selectedTimeRange} 
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="7days">Last 7 days</option>
                <option value="30days">Last 30 days</option>
                <option value="90days">Last 90 days</option>
                <option value="1year">Last year</option>
              </select>
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-medium">
                A
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'accounts', label: 'Account Management', icon: Users },
              { id: 'sales', label: 'Sales Records', icon: ShoppingCart },
              { id: 'reports', label: 'Reports', icon: PieChart }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-3 py-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-5 h-5 mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard 
                icon={Users} 
                title="Total Users" 
                value={dashboardData.overview.totalUsers.toLocaleString()} 
                change={dashboardData.overview.monthlyGrowth}
                color="blue"
              />
              <StatCard 
                icon={DollarSign} 
                title="Total Sales" 
                value={`$${dashboardData.overview.totalSales.toLocaleString()}`} 
                change={15.3}
                color="green"
              />
              <StatCard 
                icon={AlertTriangle} 
                title="Pending Accounts" 
                value={dashboardData.overview.pendingAccounts} 
                color="orange"
              />
              <StatCard 
                icon={ShoppingCart} 
                title="Active Transactions" 
                value="156" 
                change={8.1}
                color="purple"
              />
            </div>

            {/* Charts Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Trend</h3>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
                  <BarChart3 className="w-16 h-16 mr-4" />
                  <span>Sales chart would be rendered here</span>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">User Distribution</h3>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
                  <PieChart className="w-16 h-16 mr-4" />
                  <span>Distribution chart would be rendered here</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Account Management Tab */}
        {activeTab === 'accounts' && (
          <div className="space-y-6">
            {/* Search and Filter Bar */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search accounts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <select 
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="all">All Types</option>
                  <option value="seller">Sellers</option>
                  <option value="buyer">Buyers</option>
                </select>
              </div>
            </div>

            {/* Pending Accounts */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Pending Account Approvals</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documents</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredAccounts.map((account) => (
                      <tr key={account.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{account.name}</div>
                            <div className="text-sm text-gray-500">{account.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            account.type === 'Seller' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {account.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{account.location}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{account.submitted}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{account.documents} files</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <button className="text-blue-600 hover:text-blue-900 p-1">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleAccountAction(account.id, 'approved')}
                            className="text-green-600 hover:text-green-900 p-1"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleAccountAction(account.id, 'rejected')}
                            className="text-red-600 hover:text-red-900 p-1"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Sales Records Tab */}
        {activeTab === 'sales' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Recent Sales Transactions</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {dashboardData.salesData.map((sale) => (
                      <tr key={sale.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{sale.buyer}</div>
                            <div className="text-sm text-gray-500">← {sale.seller}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sale.product}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sale.quantity}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${sale.amount.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sale.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            sale.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {sale.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Sales Report', description: 'Detailed sales analytics and trends', icon: TrendingUp, color: 'green' },
                { title: 'User Activity Report', description: 'User engagement and activity metrics', icon: Users, color: 'blue' },
                { title: 'Financial Report', description: 'Revenue and financial analytics', icon: DollarSign, color: 'purple' },
                { title: 'Product Performance', description: 'Top selling products and categories', icon: ShoppingCart, color: 'orange' },
                { title: 'Regional Analysis', description: 'Geographic distribution of sales', icon: BarChart3, color: 'pink' },
                { title: 'Custom Report', description: 'Generate custom analytics report', icon: PieChart, color: 'indigo' }
              ].map((report, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className={`bg-${report.color}-100 p-3 rounded-lg mr-4`}>
                      <report.icon className={`w-6 h-6 text-${report.color}-600`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{report.title}</h3>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{report.description}</p>
                  <button 
                    onClick={() => generateReport(report.title)}
                    className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Generate Report
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;