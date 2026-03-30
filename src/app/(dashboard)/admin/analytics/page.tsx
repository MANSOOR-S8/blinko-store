"use client";

import { BarChart3, TrendingUp, Users, DollarSign, Package } from "lucide-react";

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-3xl font-bold text-[var(--heading-color)]">Detailed Analytics</h1>
        <p className="text-[var(--light-text)] mt-1">Deep dive into your store's performance metrics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[var(--border-color)]">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <DollarSign size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--light-text)]">Monthly Revenue</p>
              <h3 className="text-2xl font-bold text-[var(--heading-color)]">$45,231</h3>
            </div>
          </div>
          <p className="text-sm text-green-600 font-medium flex items-center">
            <TrendingUp size={16} className="mr-1" /> +12% from last month
          </p>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[var(--border-color)]">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
              <Users size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--light-text)]">New Customers</p>
              <h3 className="text-2xl font-bold text-[var(--heading-color)]">1,204</h3>
            </div>
          </div>
          <p className="text-sm text-green-600 font-medium flex items-center">
            <TrendingUp size={16} className="mr-1" /> +8% from last month
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[var(--border-color)]">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
              <Package size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--light-text)]">Products Sold</p>
              <h3 className="text-2xl font-bold text-[var(--heading-color)]">8,432</h3>
            </div>
          </div>
          <p className="text-sm text-green-600 font-medium flex items-center">
            <TrendingUp size={16} className="mr-1" /> +15% from last month
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[var(--border-color)]">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-green-50 text-green-600 rounded-xl">
              <BarChart3 size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--light-text)]">Conversion Rate</p>
              <h3 className="text-2xl font-bold text-[var(--heading-color)]">4.8%</h3>
            </div>
          </div>
          <p className="text-sm text-green-600 font-medium flex items-center">
            <TrendingUp size={16} className="mr-1" /> +1.2% from last month
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-[var(--border-color)] p-6 mt-8 h-96 flex flex-col items-center justify-center text-center">
        <BarChart3 size={64} className="text-gray-300 mb-4" />
        <h3 className="text-xl font-bold text-[var(--heading-color)] mb-2">Revenue Overview Chart</h3>
        <p className="text-[var(--light-text)]">Chart visualization component goes here. Integrates with typical charting libraries.</p>
      </div>
    </div>
  );
}
