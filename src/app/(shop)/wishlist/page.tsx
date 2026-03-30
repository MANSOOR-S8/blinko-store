"use client";

import { Heart, Trash2, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";

export default function WishlistPage() {
  const wishlistItems = [
    { id: 1, name: "Premium Wireless Headphones", price: "$299.00", image: "/images/products/p1.png", stock: "In Stock" },
    { id: 2, name: "Minimalist Cotton T-Shirt", price: "$25.00", image: "/images/products/p2.png", stock: "In Stock" },
    { id: 3, name: "Ergonomic Office Chair", price: "$199.00", image: "/images/products/p3.png", stock: "Out of Stock" },
  ];

  return (
    <>
      <Navbar />
      <div className="max-w-[1400px] mx-auto px-4 py-8 md:py-12 animate-fadeIn">
        <div className="flex items-center space-x-3 mb-8">
          <Heart size={32} className="text-[var(--primary-color)]" />
          <h1 className="text-3xl font-bold text-[var(--heading-color)]">My Wishlist</h1>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-2xl border border-[var(--border-color)]">
            <Heart size={48} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold text-[var(--heading-color)] mb-4">Your Wishlist is Empty</h2>
            <Link href="/products" className="inline-block bg-[var(--primary-color)] text-white px-8 py-3 rounded-xl font-medium hover:bg-[#e5a800] transition-colors shadow-md shadow-[#f8bd19]/20">
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-[var(--border-color)] overflow-hidden group hover:shadow-md transition-all">
                <div className="relative aspect-square bg-gray-50 p-6 flex items-center justify-center">
                  <Image 
                    src={item.image} 
                    alt={item.name} 
                    fill 
                    className="object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500 p-4" 
                  />
                  <button className="absolute top-4 right-4 p-2.5 bg-white rounded-full text-red-400 hover:text-red-600 hover:bg-red-50 shadow-sm transition-colors" title="Remove">
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg text-[var(--heading-color)] line-clamp-1 mb-1">{item.name}</h3>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-bold text-[var(--primary-color)]">{item.price}</span>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-md ${
                      item.stock === 'In Stock' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {item.stock}
                    </span>
                  </div>
                  <button 
                    disabled={item.stock !== 'In Stock'}
                    className={`w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl font-medium transition-colors ${
                      item.stock === 'In Stock' 
                      ? 'bg-[var(--heading-color)] text-white hover:bg-gray-800 shadow-md' 
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingCart size={18} />
                    <span>{item.stock === 'In Stock' ? 'Add to Cart' : 'Out of Stock'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
