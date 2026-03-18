"use client";

import { Users, DollarSign, Package, TrendingUp } from "lucide-react";
import RecentOrders from "@/components/dashboard/RecentOrders";

export default function DashboardPage() {
  const stats = [
    { title: "Total Revenue", amount: "$45,231.89", icon: DollarSign, trend: "+20.1%", positive: true },
    { title: "Active Users", amount: "2,350", icon: Users, trend: "+15.2%", positive: true },
    { title: "New Orders", amount: "1,200", icon: Package, trend: "-3.4%", positive: false },
    { title: "Conversion Rate", amount: "4.8%", icon: TrendingUp, trend: "+1.2%", positive: true },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-[var(--heading-color)]">Dashboard Overview</h2>
          <p className="text-[var(--light-text)] mt-1">Welcome back, here&apos;s what&apos;s happening today.</p>
        </div>
        <button className="px-5 py-2.5 bg-[var(--primary-color)] text-white hover:bg-[var(--primary-hover)] transition-colors rounded-xl font-medium shadow-md shadow-[#f8bd19]/20">
          Download Report
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div 
            key={i} 
            className="bg-white rounded-2xl p-6 shadow-sm border border-[var(--border-color)] hover:shadow-md transition-shadow relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity group-hover:scale-110 duration-500 transform">
              <stat.icon size={80} className="text-[var(--primary-color)]" />
            </div>
            
            <div className="flex justify-between items-start relative z-10">
              <div>
                <p className="text-sm font-medium text-[var(--light-text)]">{stat.title}</p>
                <h3 className="text-2xl font-bold text-[var(--heading-color)] mt-2">{stat.amount}</h3>
              </div>
              <div className={`p-3 rounded-lg flex items-center justify-center ${stat.positive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                <stat.icon size={20} />
              </div>
            </div>
            <div className={`mt-4 text-sm font-medium flex items-center gap-1 ${stat.positive ? 'text-green-600' : 'text-red-500'} relative z-10`}>
              <span>{stat.trend}</span>
              <span className="text-[var(--light-text)] font-normal ml-1">from last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-white rounded-2xl shadow-sm border border-[var(--border-color)] p-6">
         <div className="mb-6 flex items-center justify-between">
            <h3 className="text-xl font-bold text-[var(--heading-color)]">Recent Activity</h3>
         </div>
         <RecentOrders />
      </div>
    </div>
  );
}
