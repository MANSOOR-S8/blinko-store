"use client";
import Navbar from "@/components/layout/Navbar";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProducts } from "@/store/slices/productSlice";
import Image from "next/image";
import { useEffect } from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import Link from "next/link";

export default function CardLayout() {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector(
    (state) => state.products,
  );
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-auto w- border-b-2 border-blue-600"></div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        <p>Error: {error}</p>
        <button
          onClick={() => dispatch(fetchProducts())}
          className="mt-2 px-4 py-2 bg-orange-400 text-white rounded hover:bg-orange-500">
          Try Again
        </button>
      </div>
    );
  }
  return (
    <>
      <Navbar />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="products">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <Link href={`/product/${product.id}`}>
                  <div className="relative h-80 w-auto">
                    <Image
                      src={product.img}
                      alt={product.title}
                      fill
                      className="object-cover p-5 cursor-pointer"
                    />
                  </div>
                </Link>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 cursor-pointer hover:text-orange-500 transition-colors line-clamp-1">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 mt-1 text-sm line-clamp-2">
                    {product.description}
                  </p>

                  {/* Rating Section */}
                  <div className="flex items-center mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center text-amber-500 gap-0.5">
                      <FaStar className="w-4 h-4" />
                      <FaStar className="w-4 h-4" />
                      <FaStar className="w-4 h-4" />
                      <FaStar className="w-4 h-4" />
                      <FaStarHalfAlt className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-gray-700 ml-2 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      4.5
                    </span>
                    <span className="text-xs text-gray-400 ml-2 hover:text-gray-600 cursor-pointer transition-colors">
                      (128 reviews)
                    </span>
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-black">
                        ${product.price - product.discount}
                      </span>

                      <span className="text-gray-500 line-through text-[16px] font-bold">
                        ${product.price}
                      </span>
                    </div>

                    <button className="px-4 py-2 bg-[#f8bd19] text-black rounded hover:bg-[#e5a800] transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
