"use client";

import { useState } from "react";
import { Eye, Download, Trash2, Plus, Edit2, Check, X } from "lucide-react";

export default function RecentOrders() {
  const [orders, setOrders] = useState([
    { id: "ORD-001", customer: "Sarah Johnson", date: "Oct 24, 2026", amount: "$124.00", status: "Delivered", items: 3 },
    { id: "ORD-002", customer: "Michael Chen", date: "Oct 23, 2026", amount: "$89.99", status: "Processing", items: 1 },
    { id: "ORD-003", customer: "Emma Wilson", date: "Oct 22, 2026", amount: "$345.50", status: "Delivered", items: 5 },
    { id: "ORD-004", customer: "James Rodriguez", date: "Oct 21, 2026", amount: "$42.00", status: "Cancelled", items: 1 },
    { id: "ORD-005", customer: "Sophia Taylor", date: "Oct 21, 2026", amount: "$210.25", status: "Shipped", items: 2 },
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>({});

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered": return "bg-green-100 text-green-700 border-green-200";
      case "Processing": return "bg-blue-100 text-blue-700 border-blue-200";
      case "Shipped": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Cancelled": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const handleDelete = (id: string) => {
    setOrders(orders.filter(order => order.id !== id));
  };

  const startEdit = (order: any) => {
    setEditingId(order.id);
    setEditForm({ ...order });
  };

  const handleCancel = () => {
    if (editingId === "NEW") {
      setOrders(orders.filter(o => o.id !== "NEW"));
    }
    setEditingId(null);
  };

  const handleSave = () => {
    const finalForm = { ...editForm, id: editingId === "NEW" ? `ORD-00${Math.floor(Math.random() * 90) + 10}` : editingId };
    setOrders(orders.map(o => o.id === editingId ? finalForm : o));
    setEditingId(null);
  };

  const handleAddInitiate = () => {
    if (editingId) return; // prevent multiple simultaneous edits
    const newOrder = {
      id: "NEW",
      customer: "",
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      amount: "$0.00",
      status: "Processing",
      items: 1,
    };
    setOrders([newOrder, ...orders]);
    setEditingId("NEW");
    setEditForm({ ...newOrder });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-4">
      {/* Dynamic Actions Header */}
      <div className="flex justify-end mb-4">
        <button 
          onClick={handleAddInitiate}
          disabled={editingId !== null}
          className="flex items-center gap-2 px-4 py-2 bg-[var(--primary-color)] hover:bg-[var(--primary-hover)] text-white rounded-xl shadow-sm transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus size={16} /> Add Custom Order
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-[var(--border-color)]">
        <table className="w-full text-left border-collapse bg-white">
          <thead className="bg-gray-50/50">
            <tr className="border-b border-[var(--border-color)] text-[var(--light-text)] text-sm">
              <th className="py-3 font-medium px-4">Order ID</th>
              <th className="py-3 font-medium px-4">Customer</th>
              <th className="py-3 font-medium px-4">Date</th>
              <th className="py-3 font-medium px-4">Items</th>
              <th className="py-3 font-medium px-4">Status</th>
              <th className="py-3 font-medium px-4">Amount</th>
              <th className="py-3 font-medium px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-[var(--light-text)]">
                  No orders found. Add one dynamically to test!
                </td>
              </tr>
            ) : (
              orders.map((order) => {
                const isEditing = editingId === order.id;

                if (isEditing) {
                   return (
                     <tr key={order.id} className="border-b last:border-b-0 border-[var(--primary-color)] bg-yellow-50/30">
                       <td className="py-4 px-4 font-medium text-[var(--heading-color)]">
                         {order.id === "NEW" ? "Auto-generated" : order.id}
                       </td>
                       <td className="py-4 px-4">
                         <input type="text" name="customer" value={editForm.customer} onChange={handleEditChange} placeholder="Enter name" className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[var(--primary-color)]" autoFocus />
                       </td>
                       <td className="py-4 px-4">
                         <input type="text" name="date" value={editForm.date} onChange={handleEditChange} className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[var(--primary-color)]" />
                       </td>
                       <td className="py-4 px-4">
                         <input type="number" name="items" value={editForm.items} onChange={handleEditChange} min="1" className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[var(--primary-color)]" />
                       </td>
                       <td className="py-4 px-4">
                         <select name="status" value={editForm.status} onChange={handleEditChange} className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[var(--primary-color)]">
                           <option value="Processing">Processing</option>
                           <option value="Shipped">Shipped</option>
                           <option value="Delivered">Delivered</option>
                           <option value="Cancelled">Cancelled</option>
                         </select>
                       </td>
                       <td className="py-4 px-4">
                         <input type="text" name="amount" value={editForm.amount} onChange={handleEditChange} className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[var(--primary-color)]" />
                       </td>
                       <td className="py-4 px-4 text-right">
                         <div className="flex items-center justify-end gap-2">
                           <button onClick={handleSave} className="p-1.5 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors" title="Save">
                             <Check size={18} />
                           </button>
                           <button onClick={handleCancel} className="p-1.5 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors" title="Cancel">
                             <X size={18} />
                           </button>
                         </div>
                       </td>
                     </tr>
                   )
                }

                return (
                  <tr key={order.id} className="border-b last:border-b-0 border-[var(--border-color)] hover:bg-gray-50/50 transition-colors group">
                    <td className="py-4 px-4 font-medium text-[var(--heading-color)]">
                      {order.id}
                    </td>
                    <td className="py-4 px-4 text-[var(--text-color)]">{order.customer}</td>
                    <td className="py-4 px-4 text-[var(--light-text)] text-sm">{order.date}</td>
                    <td className="py-4 px-4 text-[var(--text-color)]">{order.items}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-semibold text-[var(--heading-color)]">{order.amount}</td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => startEdit(order)}
                          className="p-2 hover:bg-blue-50 rounded-lg text-gray-500 hover:text-blue-600 transition-colors" title="Edit Order"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(order.id)}
                          className="p-2 hover:bg-red-50 rounded-lg text-gray-500 hover:text-red-600 transition-colors" title="Delete Order"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
