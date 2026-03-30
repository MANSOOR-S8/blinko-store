"use client";

import { useState } from "react";
import { Search, MoreVertical, Edit, Trash2, UserPlus } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/store/index";
import { deleteUser } from "@/store/slices/userSlice";

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const dispatch = useDispatch<AppDispatch>();
  const { users } = useSelector((state: RootState) => state.users);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--heading-color)]">Users Management</h1>
          <p className="text-[var(--light-text)] mt-1">Manage your platform users and their roles.</p>
        </div>
        <button className="flex items-center space-x-2 px-5 py-2.5 bg-[var(--primary-color)] hover:bg-[#e5a800] text-white rounded-xl font-medium transition-colors shadow-md shadow-[#f8bd19]/20">
          <UserPlus size={20} />
          <span>Add New User</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-[var(--border-color)] overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-[var(--border-color)] flex flex-col sm:flex-row gap-4 items-center justify-between bg-gray-50/50">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[var(--border-color)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]/20 focus:border-[var(--primary-color)] transition-all bg-white"
            />
          </div>
          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <select 
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="flex-1 sm:w-auto px-4 py-2 border border-[var(--border-color)] rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]/20 transition-all font-medium text-[var(--text-color)]"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-[var(--border-color)]">
                <th className="p-4 font-semibold text-[var(--light-text)] whitespace-nowrap">User Info</th>
                <th className="p-4 font-semibold text-[var(--light-text)] whitespace-nowrap">Role</th>
                <th className="p-4 font-semibold text-[var(--light-text)] whitespace-nowrap">Status</th>
                <th className="p-4 font-semibold text-[var(--light-text)] whitespace-nowrap">Joined Date</th>
                <th className="p-4 font-semibold text-[var(--light-text)] text-right whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.filter(u => {
                const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                      u.email.toLowerCase().includes(searchQuery.toLowerCase());
                const matchesRole = roleFilter === "all" || u.role.toLowerCase() === roleFilter.toLowerCase();
                return matchesSearch && matchesRole;
              }).map((user, idx) => (
                <tr key={idx} className="border-b border-[var(--border-color)] last:border-0 hover:bg-gray-50/80 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-[var(--light-text)] shrink-0">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-[var(--heading-color)] leading-none mb-1.5">{user.name}</p>
                        <p className="text-sm text-[var(--light-text)] leading-none">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-[var(--text-color)] font-medium">
                    {user.role}
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4 text-[var(--text-color)]">{user.joined}</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => dispatch(deleteUser(user.id))}
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
