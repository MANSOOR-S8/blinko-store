"use client";

import { useState } from "react";
import { UploadCloud, X, Plus, Save, ArrowLeft, Info, Tags, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function EditProductPage({ params }: { params: { id: string } }) {
  const [images, setImages] = useState<string[]>(["/images/products/product-1.png"]);
  const [variants, setVariants] = useState([{ id: 1, name: "Color", values: ["Black", "Silver"] }]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImage = URL.createObjectURL(e.target.files[0]);
      setImages([...images, newImage]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const addVariant = () => {
    setVariants([...variants, { id: Date.now(), name: "", values: [] }]);
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-[1200px] mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-4">
          <Link href="/admin/products" className="p-2 bg-white rounded-xl border border-[var(--border-color)] hover:bg-gray-50 transition-colors">
            <ArrowLeft size={20} className="text-[var(--text-color)]" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-[var(--heading-color)]">Edit Product #{params.id}</h1>
            <p className="text-[var(--light-text)] mt-1">Update your product listing details and variants.</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none px-6 py-2.5 bg-white border border-[var(--border-color)] text-[var(--heading-color)] rounded-xl font-medium hover:bg-gray-50 transition-colors shadow-sm">
            Discard Changes
          </button>
          <button className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-6 py-2.5 bg-[var(--primary-color)] hover:bg-[#e5a800] text-white rounded-xl font-medium transition-colors shadow-md shadow-[#f8bd19]/20">
            <Save size={20} />
            <span>Update Product</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Main Details) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[var(--border-color)]">
            <h2 className="text-xl font-bold text-[var(--heading-color)] mb-6 flex items-center">
              <Info className="mr-2" size={20} /> Basic Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--heading-color)] mb-2">Product Title *</label>
                <input 
                  type="text" 
                  defaultValue="Premium Wireless Headphones"
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]/20 focus:border-[var(--primary-color)] transition-all bg-gray-50 focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--heading-color)] mb-2">Detailed Description</label>
                <textarea 
                  rows={6}
                  defaultValue="Experience crystal-clear audio with our premium wireless headphones. Featuring active noise cancellation."
                  className="w-full px-4 py-3 rounded-xl border border-[var(--border-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]/20 focus:border-[var(--primary-color)] transition-all bg-gray-50 focus:bg-white resize-y"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Pricing & Inventory */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[var(--border-color)]">
            <h2 className="text-xl font-bold text-[var(--heading-color)] mb-6 flex items-center">
              <Tags className="mr-2" size={20} /> Pricing & Inventory
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[var(--heading-color)] mb-2">Regular Price ($)</label>
                <input 
                  type="number" 
                  defaultValue={299.00}
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]/20 focus:border-[var(--primary-color)] transition-all flex-[1]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--heading-color)] mb-2">SKU</label>
                <input 
                  type="text" 
                  defaultValue={`PROD-${params.id}`}
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]/20 focus:border-[var(--primary-color)] transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--heading-color)] mb-2">Stock Quantity</label>
                <input 
                  type="number" 
                  defaultValue={45}
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]/20 focus:border-[var(--primary-color)] transition-all"
                />
              </div>
            </div>
          </div>

          {/* Variants/Options */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[var(--border-color)]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-[var(--heading-color)]">Product Options / Variants</h2>
              <button onClick={addVariant} className="text-sm font-medium text-[var(--primary-color)] flex items-center hover:underline">
                <Plus size={16} className="mr-1" /> Add Option
              </button>
            </div>
            
            <div className="space-y-6">
              {variants.map((v, i) => (
                <div key={v.id} className="p-4 border border-[var(--border-color)] rounded-xl bg-gray-50/50">
                  <div className="flex items-center justify-between mb-4">
                    <input 
                      type="text" 
                      defaultValue={v.name}
                      className="px-3 py-1.5 border border-[var(--border-color)] rounded-lg text-sm font-medium focus:outline-none focus:border-[var(--primary-color)]"
                    />
                    <button onClick={() => setVariants(variants.filter(variant => variant.id !== v.id))} className="text-red-500 hover:text-red-700 bg-white p-1.5 rounded-md border border-[var(--border-color)] shadow-sm">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div>
                    <input 
                      type="text" 
                      defaultValue={v.values.join(", ")}
                      className="w-full px-4 py-2 rounded-lg border border-[var(--border-color)] focus:outline-none focus:border-[var(--primary-color)] bg-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (Media & Metdata) */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[var(--border-color)]">
            <h2 className="text-xl font-bold text-[var(--heading-color)] mb-4">Product Images</h2>
            
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer relative group">
              <input 
                type="file" 
                multiple 
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
              />
              <div className="flex flex-col items-center justify-center space-y-2 pointer-events-none">
                <div className="w-12 h-12 bg-[var(--primary-color)]/10 text-[var(--primary-color)] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <UploadCloud size={24} />
                </div>
                <p className="font-medium text-[var(--heading-color)]">Click to upload</p>
              </div>
            </div>

            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-3">
                {images.map((img, idx) => (
                  <div key={idx} className="relative aspect-square rounded-lg border border-[var(--border-color)] overflow-hidden group">
                    <img src={img} alt="Product upload" className="w-full h-full object-cover relative z-0" />
                    <button 
                      onClick={() => removeImage(idx)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-md p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
