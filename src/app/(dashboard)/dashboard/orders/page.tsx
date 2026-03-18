"use client";

import RecentOrders from "@/components/dashboard/RecentOrders";
import { Filter, Search } from "lucide-react";

export default function OrdersPage() {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div>
          <h2 className="text-3xl font-bold text-[var(--heading-color)]">Orders</h2>
          <p className="text-[var(--light-text)] mt-1">Manage and track your recent orders.</p>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2.5 border border-[var(--border-color)] rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--primary-hover)] focus:border-[var(--primary-hover)] sm:text-sm transition-shadow shadow-sm"
            placeholder="Search orders by ID, Customer..."
          />
        </div>
        <button className="inline-flex items-center justify-center px-4 py-2.5 border border-[var(--border-color)] font-medium rounded-xl text-[var(--text-color)] bg-white hover:bg-gray-50 shadow-sm transition-colors gap-2">
          <Filter size={18} />
          <span>Filters</span>
        </button>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-2xl shadow-sm border border-[var(--border-color)] p-6">
        <RecentOrders />
        
        {/* Pagination Dummy */}
        <div className="flex items-center justify-between border-t border-[var(--border-color)] pt-6 mt-6">
          <span className="text-sm text-[var(--light-text)]">
            Showing <span className="font-medium text-[var(--heading-color)]">1</span> to <span className="font-medium text-[var(--heading-color)]">5</span> of <span className="font-medium text-[var(--heading-color)]">24</span> results
          </span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-[var(--border-color)] rounded-lg text-sm text-[var(--text-color)] hover:bg-gray-50 disabled:opacity-50" disabled>
              Previous
            </button>
            <button className="px-3 py-1 border border-[var(--border-color)] rounded-lg text-sm text-[var(--text-color)] hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
