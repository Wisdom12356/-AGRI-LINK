'use client'
import React, { useState } from 'react';
import { Search, Filter, Mail, Phone, MoreVertical, Star } from 'lucide-react';

export default function CustomerManagement() {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: 'Mellor Wisdom',
      email: 'mellorwisdom@gmail.com',
      phone: '+237 673952588',
      location: 'Yaoundé',
      totalOrders: 15,
      totalSpent: 2500.00,
      lastOrder: '2024-02-20',
      status: 'active'
    },
    {
      id: 2,
      name: 'Ehabe Joel',
      email: 'ehabejoel@gmail.com',
      phone: '+237 682147963',
      location: 'Yaoundé',
      totalOrders: 15,
      totalSpent: 2500.50,
      lastOrder: '2024-02-18',
      status: 'active'
    },
    {
      id: 3, // Changed from 1 to 3
      name: 'Ngenge Faith',
      email: 'ngengefaith@gmail.com',
      phone: '+237 673952588',
      location: 'Yaoundé',
      totalOrders: 15,
      totalSpent: 2500.00,
      lastOrder: '2024-02-20',
      status: 'active'
    },
    {
      id: 4, // Changed from 2 to 4
      name: 'Asaah Andu',
      email: 'asaahandu@gmail.com',
      phone: '+237 673952588',
      location: 'Yaoundé',
      totalOrders: 15,
      totalSpent: 2500.00,
      lastOrder: '2024-02-20',
      status: 'active'
    },
    {
      id: 5,
      name: 'Che Prince',
      email: 'cheprince@gmail.com',
      phone: '+237 673952588',
      location: 'Yaoundé',
      totalOrders: 15,
      totalSpent: 2500.00,
      lastOrder: '2024-02-20',
      status: 'active'
    },
    {
      id: 6,
      name: 'Dze Bryan',
      email: 'dzebryan@gmail.com',
      phone: '+237 673952588',
      location: 'Yaoundé',
      totalOrders: 15,
      totalSpent: 2500.00,
      lastOrder: '2024-02-20',
      status: 'active'
    },
    // Add more mock customers...
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex gap-4 flex-grow">
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
          >
            <option value="all">All Customers</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Orders</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Spent</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {customers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                        <span className="text-green-600 font-medium text-lg">
                          {customer.name[0].toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                      <div className="text-sm text-gray-500">{customer.location}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{customer.email}</div>
                  <div className="text-sm text-gray-500">{customer.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="text-gray-900">{customer.totalOrders} orders</div>
                  <div className="text-gray-500">Last: {new Date(customer.lastOrder).toLocaleDateString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${customer.totalSpent.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    customer.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {customer.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
