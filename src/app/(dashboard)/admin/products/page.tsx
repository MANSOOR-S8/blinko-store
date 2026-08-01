"use client";

import { Search, Plus, Edit, Trash2, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, deleteProduct } from "@/store/slices/productSlice";
import type { RootState, AppDispatch } from "@/store/index";

export default function AdminProductsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Fallback data if backend is not running or products array is empty
  const displayProducts = products.length > 0 ? products : [


    // ider ma na change keya ha Fahad images ka name ghalat ha 
    
    
    
    { id: 1, title: "Premium Wireless Headphones", price: 299.00, img: "/images/products/product-1.png" },
    { id: 2, title: "Minimalist Cotton T-Shirt", price: 25.00, img: "/images/products/product-2.png" },
  ];

  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = displayProducts.filter((p: any) => {
    const pName = (p.title || p.name || "").toLowerCase();
    const pPrice = String(p.price).toLowerCase();
    const query = searchQuery.toLowerCase();
    return pName.includes(query) || pPrice.includes(query);
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--heading-color)]">Products</h1>
          <p className="text-[var(--light-text)] mt-1">Manage your product inventory and catalog.</p>
        </div>
        <Link href="/admin/products/new" className="flex items-center space-x-2 px-5 py-2.5 bg-[var(--primary-color)] hover:bg-[#e5a800] text-white rounded-xl font-medium transition-colors shadow-md shadow-[#f8bd19]/20">
          <Plus size={20} />
          <span>Add New Product</span>
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-[var(--border-color)] overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-[var(--border-color)] flex flex-col sm:flex-row gap-4 items-center justify-between bg-gray-50/50">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search products by name or price..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[var(--border-color)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]/20 focus:border-[var(--primary-color)] transition-all bg-white"
            />
          </div>
          <div className="flex items-center space-x-3 w-full sm:w-auto">
             <select className="flex-1 sm:w-auto px-4 py-2 border border-[var(--border-color)] rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]/20 transition-all font-medium text-[var(--text-color)]">
              <option value="all">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-[var(--border-color)]">
                <th className="p-4 font-semibold text-[var(--light-text)] whitespace-nowrap">Product</th>
                <th className="p-4 font-semibold text-[var(--light-text)] whitespace-nowrap">Category</th>
                <th className="p-4 font-semibold text-[var(--light-text)] whitespace-nowrap">Price</th>
                <th className="p-4 font-semibold text-[var(--light-text)] whitespace-nowrap">Stock</th>
                <th className="p-4 font-semibold text-[var(--light-text)] whitespace-nowrap">Status</th>
                <th className="p-4 font-semibold text-[var(--light-text)] text-right whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-[var(--light-text)]">
                    Loading products...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-red-500">
                    Error loading products: {error}
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product: any, idx: number) => (
                  <tr key={idx} className="border-b border-[var(--border-color)] last:border-0 hover:bg-gray-50/80 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 relative rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 shrink-0 overflow-hidden">
                          {product.img ? (
                            <Image src={product.img} alt={product.title} fill className="object-cover" />
                          ) : (
                            <ImageIcon size={20} />
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-[var(--heading-color)] line-clamp-1">{product.title || product.name}</p>
                          <p className="text-xs text-[var(--light-text)]">ID: {product.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-[var(--text-color)] whitespace-nowrap">{"N/A"}</td>
                    <td className="p-4 font-medium text-[var(--heading-color)] whitespace-nowrap">${Number(product.price).toFixed(2)}</td>
                    <td className="p-4 text-[var(--text-color)] whitespace-nowrap">{"N/A"}</td>
                    <td className="p-4 whitespace-nowrap">
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                        Active
                      </span>
                    </td>
                    <td className="p-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => dispatch(deleteProduct(product.id))}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" 
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
