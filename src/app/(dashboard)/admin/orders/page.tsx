"use client";

import { useState } from "react";
import { Search, Eye, Download, CheckCircle, Clock, XCircle } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/store/index";
import { updateOrderStatus } from "@/store/slices/orderSlice";

export default function AdminOrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const dispatch = useDispatch<AppDispatch>();
  const { orders } = useSelector((state: RootState) => state.orders);

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Completed': return <CheckCircle size={16} className="mr-1.5" />;
      case 'Processing': return <Clock size={16} className="mr-1.5" />;
      case 'Cancelled': return <XCircle size={16} className="mr-1.5" />;
      default: return <Clock size={16} className="mr-1.5" />;
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--heading-color)]">Orders Management</h1>
          <p className="text-[var(--light-text)] mt-1">Track and process customer orders.</p>
        </div>
        <button className="flex items-center space-x-2 px-5 py-2.5 bg-white border border-[var(--border-color)] hover:bg-gray-50 text-[var(--heading-color)] rounded-xl font-medium transition-colors shadow-sm">
          <Download size={20} />
          <span>Export CSV</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-[var(--border-color)] overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-[var(--border-color)] flex flex-col sm:flex-row gap-4 items-center justify-between bg-gray-50/50">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search by customer or order ID..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[var(--border-color)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]/20 focus:border-[var(--primary-color)] transition-all bg-white"
            />
          </div>
          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="flex-1 sm:w-auto px-4 py-2 border border-[var(--border-color)] rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]/20 transition-all font-medium text-[var(--text-color)]"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="processing">Processing</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-[var(--border-color)]">
                <th className="p-4 font-semibold text-[var(--light-text)] whitespace-nowrap">Order ID</th>
                <th className="p-4 font-semibold text-[var(--light-text)] whitespace-nowrap">Customer</th>
                <th className="p-4 font-semibold text-[var(--light-text)] whitespace-nowrap">Date</th>
                <th className="p-4 font-semibold text-[var(--light-text)] whitespace-nowrap">Items</th>
                <th className="p-4 font-semibold text-[var(--light-text)] whitespace-nowrap">Total</th>
                <th className="p-4 font-semibold text-[var(--light-text)] whitespace-nowrap">Payment</th>
                <th className="p-4 font-semibold text-[var(--light-text)] whitespace-nowrap">Status</th>
                <th className="p-4 font-semibold text-[var(--light-text)] text-right whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.filter(o => {
                const matchesSearch = o.customer.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                      o.id.toLowerCase().includes(searchQuery.toLowerCase());
                const matchesStatus = statusFilter === "all" || o.status.toLowerCase() === statusFilter.toLowerCase();
                return matchesSearch && matchesStatus;
              }).map((order, idx) => (
                <tr key={idx} className="border-b border-[var(--border-color)] last:border-0 hover:bg-gray-50/80 transition-colors">
                  <td className="p-4 font-bold text-[var(--heading-color)] whitespace-nowrap">{order.id}</td>
                  <td className="p-4 text-[var(--heading-color)] font-medium whitespace-nowrap">{order.customer}</td>
                  <td className="p-4 text-[var(--text-color)] whitespace-nowrap">{order.date}</td>
                  <td className="p-4 text-[var(--text-color)] whitespace-nowrap">{order.items} items</td>
                  <td className="p-4 font-bold text-[var(--heading-color)] whitespace-nowrap">{order.total}</td>
                  <td className="p-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      order.payment === 'Paid' ? 'bg-green-100 text-green-700' : 
                      order.payment === 'Refunded' ? 'bg-purple-100 text-purple-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {order.payment}
                    </span>
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${
                      order.status === 'Completed' ? 'bg-green-100 text-green-700' :
                      order.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                      order.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {getStatusIcon(order.status)}
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 text-right whitespace-nowrap">
                    <button className="p-2 text-indigo-500 hover:bg-indigo-50 rounded-lg transition-colors" title="View Details">
                      <Eye size={18} />
                    </button>
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
