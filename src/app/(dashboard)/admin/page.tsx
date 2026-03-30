"use client";

import { Users, DollarSign, Package, ShoppingBag, TrendingUp, TrendingDown } from "lucide-react";

export default function AdminDashboardOverview() {
  const stats = [
    { title: "Total Revenue", amount: "$124,563.00", icon: DollarSign, trend: "+12.5%", positive: true },
    { title: "Total Users", amount: "8,234", icon: Users, trend: "+5.2%", positive: true },
    { title: "Total Products", amount: "450", icon: Package, trend: "+2.4%", positive: true },
    { title: "Total Orders", amount: "1,254", icon: ShoppingBag, trend: "-1.8%", positive: false },
  ];

  const recentOrders = [
    { id: "#ORD-001", customer: "John Doe", total: "$120.00", status: "Completed", date: "2026-03-25" },
    { id: "#ORD-002", customer: "Jane Smith", total: "$450.50", status: "Processing", date: "2026-03-24" },
    { id: "#ORD-003", customer: "Robert Brown", total: "$89.99", status: "Pending", date: "2026-03-24" },
    { id: "#ORD-004", customer: "Emily Davis", total: "$299.00", status: "Completed", date: "2026-03-23" },
    { id: "#ORD-005", customer: "Michael Wilson", total: "$1,200.00", status: "Processing", date: "2026-03-23" },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--heading-color)]">Dashboard Overview</h1>
          <p className="text-[var(--light-text)] mt-1">Welcome to the admin control panel.</p>
        </div>
        <button className="px-6 py-2.5 bg-[var(--primary-color)] hover:bg-[#e5a800] text-white rounded-xl font-medium transition-colors shadow-md shadow-[#f8bd19]/20">
          Generate Report
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-[var(--border-color)] hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-[var(--light-text)]">{stat.title}</p>
                <h3 className="text-2xl font-bold text-[var(--heading-color)] mt-2">{stat.amount}</h3>
              </div>
              <div className={`p-3 rounded-xl ${stat.positive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                <stat.icon size={24} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              {stat.positive ? (
                <TrendingUp size={16} className="text-green-600 mr-1" />
              ) : (
                <TrendingDown size={16} className="text-red-500 mr-1" />
              )}
              <span className={`font-medium ${stat.positive ? 'text-green-600' : 'text-red-500'}`}>
                {stat.trend}
              </span>
              <span className="text-[var(--light-text)] ml-2">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-[var(--border-color)] overflow-hidden">
        <div className="p-6 border-b border-[var(--border-color)] flex justify-between items-center">
          <h2 className="text-xl font-bold text-[var(--heading-color)]">Recent Orders</h2>
          <button className="text-[var(--primary-color)] font-medium hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-[var(--border-color)]">
                <th className="p-4 font-medium text-[var(--light-text)] whitespace-nowrap">Order ID</th>
                <th className="p-4 font-medium text-[var(--light-text)] whitespace-nowrap">Customer</th>
                <th className="p-4 font-medium text-[var(--light-text)] whitespace-nowrap">Date</th>
                <th className="p-4 font-medium text-[var(--light-text)] whitespace-nowrap">Total</th>
                <th className="p-4 font-medium text-[var(--light-text)] whitespace-nowrap">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, idx) => (
                <tr key={idx} className="border-b border-[var(--border-color)] last:border-0 hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-medium text-[var(--heading-color)] whitespace-nowrap">{order.id}</td>
                  <td className="p-4 text-[var(--text-color)] whitespace-nowrap">{order.customer}</td>
                  <td className="p-4 text-[var(--text-color)] whitespace-nowrap">{order.date}</td>
                  <td className="p-4 font-medium text-[var(--heading-color)] whitespace-nowrap">{order.total}</td>
                  <td className="p-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      order.status === 'Completed' ? 'bg-green-100 text-green-700' :
                      order.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                      'bg-orange-100 text-orange-700'
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
    </div>
  );
}
