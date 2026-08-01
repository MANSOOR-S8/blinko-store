"use client";

import { useState } from "react";
import { Star, ShoppingCart, Heart, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import { useDispatch } from "react-redux";
// mock import for Redux
import { increaseQuantity } from "@/store/slices/cartSlice"; 

export default function ProductDetailsPage({ params }: { params: { slug: string } }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const dispatch = useDispatch();

  const product = {
    id: params.slug,
    name: "Premium Wireless Headphones",
    price: 299.00,
    rating: 4.8,
    reviews: 124,
    description: "Experience crystal-clear audio with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and ultra-comfortable ear cushions for all-day listening.",
    images: [
      "/images/products/product-1.png",
      "/images/products/product-2.png",
      "/images/products/p3.png",
    ],
    features: [
      "Active Noise Cancellation (ANC)",
      "Up to 30 hours of battery life",
      "Bluetooth 5.2 connectivity",
      "Built-in microphone for calls"
    ]
  };

  const handleAddToCart = () => {
    // Mock dispatch
    console.log(`Added ${quantity} of ${product.name} to cart`);
  };

  return (
    <>
      <Navbar />
      <div className="max-w-[1400px] mx-auto px-4 py-8 md:py-16 animate-fadeIn">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* Gallery Sections */}
          <div className="w-full lg:w-1/2 flex flex-col-reverse sm:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex sm:flex-col gap-4 overflow-x-auto sm:overflow-visible no-scrollbar shrink-0">
              {product.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 sm:w-24 sm:h-24 rounded-xl border-2 overflow-hidden flex items-center justify-center p-2 transition-all ${
                    selectedImage === idx ? 'border-[var(--primary-color)]' : 'border-transparent bg-gray-50'
                  }`}
                >
                  <Image src={img} alt={`Thumbnail ${idx}`} width={80} height={80} className="object-contain mix-blend-multiply" />
                </button>
              ))}
            </div>
            {/* Main Image */}
            <div className="w-full aspect-square bg-gray-50 rounded-3xl flex items-center justify-center p-8 relative">
              <span className="absolute top-6 left-6 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">SALE</span>
              <button className="absolute top-6 right-6 p-3 bg-white hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-full transition-colors shadow-sm">
                <Heart size={20} />
              </button>
              <Image 
                src={product.images[selectedImage]} 
                alt={product.name} 
                fill 
                className="object-contain p-8 mix-blend-multiply" 
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="w-full lg:w-1/2">
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--heading-color)] mb-4">{product.name}</h1>
            
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center text-[#f8bd19]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                ))}
              </div>
              <span className="text-sm font-medium text-[var(--light-text)]">{product.rating} ({product.reviews} reviews)</span>
            </div>

            <div className="mb-8 flex items-end space-x-4">
              <span className="text-4xl font-bold text-[var(--heading-color)]">${product.price.toFixed(2)}</span>
              <span className="text-xl text-[var(--light-text)] line-through mb-1">${(product.price * 1.2).toFixed(2)}</span>
            </div>

            <p className="text-[var(--text-color)] mb-8 leading-relaxed">
              {product.description}
            </p>

            <div className="space-y-6 mb-10 pb-10 border-b border-[var(--border-color)]">
              {/* Quantity */}
              <div>
                <span className="block text-sm font-bold text-[var(--heading-color)] mb-3">Quantity</span>
                <div className="flex items-center border border-[var(--border-color)] rounded-xl w-fit overflow-hidden bg-gray-50">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >-</button>
                  <span className="w-12 text-center font-bold text-[var(--heading-color)] bg-white h-12 flex items-center justify-center">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >+</button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center space-x-2 bg-[var(--primary-color)] hover:bg-[#e5a800] text-white font-medium py-4 px-8 rounded-xl transition-all shadow-md shadow-[#f8bd19]/20"
                >
                  <ShoppingCart size={20} />
                  <span>Add to Cart</span>
                </button>
                <button className="flex-1 bg-[var(--heading-color)] hover:bg-gray-800 text-white font-medium py-4 px-8 rounded-xl transition-all shadow-md">
                  Buy it Now
                </button>
              </div>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 text-[var(--text-color)]">
                <ShieldCheck className="text-[var(--primary-color)]" size={24} />
                <span className="font-medium text-sm">2 Year Warranty</span>
              </div>
              <div className="flex items-center space-x-3 text-[var(--text-color)]">
                <Truck className="text-[var(--primary-color)]" size={24} />
                <span className="font-medium text-sm">Free Global Shipping</span>
              </div>
              <div className="flex items-center space-x-3 text-[var(--text-color)]">
                <RotateCcw className="text-[var(--primary-color)]" size={24} />
                <span className="font-medium text-sm">30 Days Return</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
