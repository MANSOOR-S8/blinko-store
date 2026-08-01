"use client";

import { useState } from "react";
import {
  UploadCloud,
  X,
  Plus,
  Save,
  ArrowLeft,
  Info,
  Tags,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addProduct } from "@/store/slices/productSlice";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function AddProductPage() {
  const [images, setImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [variants, setVariants] = useState([
    { id: 1, name: "Color", values: ["Red", "Blue"] },
  ]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSave = async () => {
    if (!title) return alert("Please enter a product title");

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", title); // Backend uses "name"
      formData.append("price", price);
      formData.append("description", description);
      formData.append("category", category);

      if (imageFiles.length > 0) {
        formData.append("image", imageFiles[0]);
      }

      const res = await axios.post(
        "http://localhost:5000/api/products",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      const data = res.data;

      // Dispatch locally if you still want Redux updated immediately
      dispatch(
        addProduct({
          id: data.product?._id || Date.now(),
          title,
          price: Number(price) || 0,
          description,
          discount: 0,
          img: data.product?.image
            ? `http://localhost:5000/uploads/${data.product.image}`
            : images.length > 0
              ? images[0]
              : "/images/products/product-1.png",
        }),
      );

      router.push("/admin/products");
    } catch (error) {
      console.error(error);
      alert("Error creating product");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const newImage = URL.createObjectURL(file);
      setImages([...images, newImage]);
      setImageFiles([...imageFiles, file]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    setImageFiles(imageFiles.filter((_, i) => i !== index));
  };

  const addVariant = () => {
    setVariants([...variants, { id: Date.now(), name: "", values: [] }]);
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-[1200px] mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-4">
          <Link
            href="/admin/products"
            className="p-2 bg-white rounded-xl border border-[var(--border-color)] hover:bg-gray-50 transition-colors">
            <ArrowLeft size={20} className="text-[var(--text-color)]" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-[var(--heading-color)]">
              Add New Product
            </h1>
            <p className="text-[var(--light-text)] mt-1">
              Create a new product listing with details and variants.
            </p>
          </div>
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
                <label className="block text-sm font-medium text-[var(--heading-color)] mb-2">
                  Product Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Premium Wireless Headphones"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]/20 focus:border-[var(--primary-color)] transition-all bg-gray-50 focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--heading-color)] mb-2">
                  Detailed Description
                </label>
                <textarea
                  rows={6}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your product... Features, materials, care instructions, etc."
                  className="w-full px-4 py-3 rounded-xl border border-[var(--border-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]/20 focus:border-[var(--primary-color)] transition-all bg-gray-50 focus:bg-white resize-y"></textarea>
                <p className="text-xs text-[var(--light-text)] mt-2">
                  Provide a comprehensive description to be displayed on the
                  product details page. HTML is supported.
                </p>
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
                <label className="block text-sm font-medium text-[var(--heading-color)] mb-2">
                  Regular Price ($)
                </label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]/20 focus:border-[var(--primary-color)] transition-all flex-[1]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--heading-color)] mb-2">
                  Sale Price ($)
                </label>
                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]/20 focus:border-[var(--primary-color)] transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--heading-color)] mb-2">
                  SKU (Stock Keeping Unit)
                </label>
                <input
                  type="text"
                  placeholder="e.g. PROD-12345"
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]/20 focus:border-[var(--primary-color)] transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--heading-color)] mb-2">
                  Stock Quantity
                </label>
                <input
                  type="number"
                  placeholder="0"
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]/20 focus:border-[var(--primary-color)] transition-all"
                />
              </div>
            </div>
          </div>

          {/* Variants/Options */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[var(--border-color)]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-[var(--heading-color)]">
                Product Options / Variants
              </h2>
              <button
                onClick={addVariant}
                className="text-sm font-medium text-[var(--primary-color)] flex items-center hover:underline">
                <Plus size={16} className="mr-1" /> Add Option
              </button>
            </div>

            <div className="space-y-6">
              {variants.map((v, i) => (
                <div
                  key={v.id}
                  className="p-4 border border-[var(--border-color)] rounded-xl bg-gray-50/50">
                  <div className="flex items-center justify-between mb-4">
                    <input
                      type="text"
                      placeholder="Option Name (e.g. Size, Color)"
                      defaultValue={v.name}
                      className="px-3 py-1.5 border border-[var(--border-color)] rounded-lg text-sm font-medium focus:outline-none focus:border-[var(--primary-color)]"
                    />
                    <button className="text-red-500 hover:text-red-700 cursor-pointer bg-white p-1.5 rounded-md border border-[var(--border-color)] shadow-sm">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Enter values separated by commas (e.g. Red, Blue, Green)"
                      defaultValue={v.values.join(", ")}
                      className="w-full px-4 py-2 rounded-lg border border-[var(--border-color)] focus:outline-none focus:border-[var(--primary-color)] bg-white"
                    />
                  </div>
                </div>
              ))}
              {variants.length === 0 && (
                <div className="text-center py-8 text-[var(--light-text)] bg-gray-50 rounded-xl border border-dashed border-gray-300">
                  No options added. Click "Add Option" to add sizes, colors,
                  etc.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column (Media & Metdata) */}
        <div className="space-y-6">
          {/* Media Upload */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[var(--border-color)]">
            <h2 className="text-xl font-bold text-[var(--heading-color)] mb-4">
              Product Images
            </h2>

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
                <p className="font-medium text-[var(--heading-color)]">
                  Click to upload or drag & drop
                </p>
                <p className="text-xs text-[var(--light-text)]">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
            </div>

            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-3">
                {images.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-square rounded-lg border border-[var(--border-color)] overflow-hidden group">
                    <img
                      src={img}
                      alt="Product upload"
                      className="w-full h-full object-cover relative z-0"
                    />
                    <button
                      onClick={() => removeImage(idx)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-md p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Organization */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[var(--border-color)]">
            <h2 className="text-xl font-bold text-[var(--heading-color)] mb-4">
              Organization
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--heading-color)] mb-2">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]/20 focus:border-[var(--primary-color)] bg-gray-50">
                  <option value="">Select a category</option>
                  <option value="electronics">Electronics</option>
                  <option value="clothing">Clothing</option>
                  <option value="furniture">Furniture</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--heading-color)] mb-2">
                  Brand
                </label>
                <input
                  type="text"
                  placeholder="e.g. Nike, Apple"
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]/20 focus:border-[var(--primary-color)] bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--heading-color)] mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  placeholder="Separate tags with commas"
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]/20 focus:border-[var(--primary-color)] bg-gray-50"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* buttons */}
      <div className="flex items-center space-x-3 w-full sm:w-auto">
        <button className="flex-1 cursor-pointer sm:flex-none px-6 py-2.5 bg-white border border-[var(--border-color)] text-[var(--heading-color)] rounded-xl font-medium hover:bg-gray-50 transition-colors shadow-sm">
          Save Draft
        </button>
        <button
          onClick={handleSave}
          disabled={isSubmitting}
          className={`flex-1 sm:flex-none flex items-center cursor-pointer justify-center space-x-2 px-6 py-2.5 bg-[var(--primary-color)] hover:bg-[#e5a800] text-white rounded-xl font-medium transition-colors shadow-md shadow-[#f8bd19]/20 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}>
          <Save size={20} />
          <span>{isSubmitting ? "Publishing..." : "Publish Product"}</span>
        </button>
      </div>
    </div>
  );
}
