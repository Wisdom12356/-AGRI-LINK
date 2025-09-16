'use client'
import React from 'react';
import { BarChart3 } from 'lucide-react';

export default function UnderDevelopment({ section }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center">
      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <BarChart3 className="w-8 h-8 text-slate-400" />
      </div>
      <h3 className="text-xl font-semibold text-slate-900 mb-2 capitalize">{section} Section</h3>
      <p className="text-slate-500 mb-6">This section is under development. The {section} management interface will be available here.</p>
      <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:shadow-lg transition-all">
        Coming Soon
      </button>
    </div>
  );
}
