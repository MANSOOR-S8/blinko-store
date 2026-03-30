"use client";

import { useState } from "react";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/store/index";
import { deleteCategory } from "@/store/slices/categorySlice";

export default function AdminCategoriesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const { categories } = useSelector((state: RootState) => state.categories);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--heading-color)]">Categories</h1>
          <p className="text-[var(--light-text)] mt-1">Manage product categories and collections.</p>
        </div>
        <button className="flex items-center space-x-2 px-5 py-2.5 bg-[var(--primary-color)] hover:bg-[#e5a800] text-white rounded-xl font-medium transition-colors shadow-md shadow-[#f8bd19]/20">
          <Plus size={20} />
          <span>Add Category</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-[var(--border-color)] overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-[var(--border-color)] flex flex-col sm:flex-row gap-4 items-center justify-between bg-gray-50/50">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search categories by name..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[var(--border-color)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]/20 focus:border-[var(--primary-color)] transition-all bg-white"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-[var(--border-color)]">
                <th className="p-4 font-semibold text-[var(--light-text)] whitespace-nowrap">Category ID</th>
                <th className="p-4 font-semibold text-[var(--light-text)] whitespace-nowrap">Name</th>
                <th className="p-4 font-semibold text-[var(--light-text)] whitespace-nowrap">Items Count</th>
                <th className="p-4 font-semibold text-[var(--light-text)] whitespace-nowrap">Status</th>
                <th className="p-4 font-semibold text-[var(--light-text)] text-right whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.filter(c => 
                c.name.toLowerCase().includes(searchQuery.toLowerCase())
              ).map((category, idx) => (
                <tr key={idx} className="border-b border-[var(--border-color)] last:border-0 hover:bg-gray-50/80 transition-colors">
                  <td className="p-4 font-medium text-[var(--light-text)] whitespace-nowrap">{category.id}</td>
                  <td className="p-4 font-bold text-[var(--heading-color)] whitespace-nowrap">{category.name}</td>
                  <td className="p-4 text-[var(--text-color)] whitespace-nowrap">{category.items} products</td>
                  <td className="p-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      category.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {category.status}
                    </span>
                  </td>
                  <td className="p-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => dispatch(deleteCategory(category.id))}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" 
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
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
