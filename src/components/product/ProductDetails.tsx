"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchProductById,
  clearSingleProduct,
} from "@/store/slices/productSlice";
import { addToCart } from "@/store/slices/cartSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Navbar from "../layout/Navbar";
import {
  FaStar,
  FaStarHalfAlt,
  FaCheck,
  FaShieldAlt,
  FaUndo,
  FaTruck,
} from "react-icons/fa";

interface ProductDetailProps {
  productId: number;
}

export default function ProductDetail({ productId }: ProductDetailProps) {
  const dispatch = useAppDispatch();
  const { singleProduct, loading, error } = useAppSelector(
    (state) => state.products,
  );
  
  const router = useRouter();
  const [qty, setQty] = useState(1);

  const handleAddToCart = () => {
    if (singleProduct) {
      dispatch(addToCart({
        id: singleProduct.id,
        title: singleProduct.title,
        price: singleProduct.price - singleProduct.discount,
        img: singleProduct.img,
        quantity: qty,
      }));
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/checkout");
  };

  useEffect(() => {
    dispatch(fetchProductById(productId));

    // Cleanup
    return () => {
      dispatch(clearSingleProduct());
    };
  }, [dispatch, productId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error || !singleProduct) {
    return (
      <>
        <div></div>
        <div className="text-center text-red-600 py-16">
          <h2 className="text-2xl font-bold">Product not found</h2>
          <p className="mt-2 text-gray-600">
            {error || "The product you're looking for does not exist."}
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-[1400px] mx-auto p-4 sm:p-6 lg:p-8 bg-white">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          {/* Left Column: Product Image Gallery */}
          <div className="w-full lg:w-4/12 flex-shrink-0">
            <div className="sticky top-24">
              <div className="relative aspect-square w-full rounded-xl border border-gray-200 overflow-hidden bg-white flex items-center justify-center p-8 group">
                <Image
                  src={singleProduct.img}
                  alt={singleProduct.title}
                  fill
                  className="object-contain p-8 group-hover:scale-105 transition-transform duration-300 ease-in-out"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Middle Column: Product Details */}
          <div className="w-full lg:w-5/12 flex-col space-y-4">
            <div className="border-b border-gray-200 pb-4">
              <h1 className="text-2xl sm:text-3xl font-medium text-gray-900 leading-tight">
                {singleProduct.title}
              </h1>
              <a
                href="#"
                className="text-sm text-blue-600 hover:text-orange-500 hover:underline mt-1 inline-block">
                Visit the Brand Store
              </a>

              {/* Rating */}
              <div className="flex items-center mt-3 gap-4">
                <div className="flex items-center gap-1 text-amber-500">
                  <FaStar className="w-5 h-5" />
                  <FaStar className="w-5 h-5" />
                  <FaStar className="w-5 h-5" />
                  <FaStar className="w-5 h-5" />
                  <FaStarHalfAlt className="w-5 h-5" />
                  <span className="text-blue-600 hover:underline ml-2 text-sm font-medium cursor-pointer">
                    1,482 ratings
                  </span>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="py-2 border-b border-gray-200">
              <div className="flex items-start gap-2">
                <span className="text-sm text-red-600 font-semibold mt-1.5">
                  -
                  {(
                    (singleProduct.discount / singleProduct.price) *
                    100
                  ).toFixed(0)}
                  %
                </span>
                <div className="flex items-start">
                  <span className="text-sm font-medium pt-1.5">$</span>
                  <span className="text-4xl font-semibold">
                    {singleProduct.price - singleProduct.discount}
                  </span>
                </div>
              </div>
              <div className="text-sm text-gray-500 mt-1">
                List Price:{" "}
                <span className="line-through">${singleProduct.price}</span>
              </div>
              <div className="text-sm text-gray-600 mt-2">
                Earn rewarding points with your purchase.
              </div>
            </div>

            {/* About this item */}
            <div className="pt-4">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                About this item
              </h3>
              <ul className="space-y-2 text-base text-gray-800 list-disc pl-5">
                <li>{singleProduct.description}</li>
                <li>
                  Premium quality materials designed to last and provide
                  excellent performance in everyday use.
                </li>
                <li>
                  Sleek and attractive design that fits perfectly with your
                  lifestyle and everyday needs.
                </li>
                <li>
                  Backed by our 1-year comprehensive manufacturer warranty and
                  excellent customer service.
                </li>
              </ul>
            </div>

            {/* Feature Badges */}
            {/* <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-200">
              <div className="flex flex-col items-center justify-center p-3 text-center w-24">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
                  <FaUndo className="w-5 h-5" />
                </div>
                <span className="text-xs text-blue-600 hover:underline cursor-pointer">
                  30 days Return
                </span>
              </div>
              <div className="flex flex-col items-center justify-center p-3 text-center w-24">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
                  <FaTruck className="w-5 h-5" />
                </div>
                <span className="text-xs text-blue-600 hover:underline cursor-pointer">
                  Secure Delivery
                </span>
              </div>
              <div className="flex flex-col items-center justify-center p-3 text-center w-24">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
                  <FaShieldAlt className="w-5 h-5" />
                </div>
                <span className="text-xs text-blue-600 hover:underline cursor-pointer">
                  1 Year Warranty
                </span>
              </div>
            </div> */}
          </div>

          {/* Right Column: Add to Cart / Buy Box */}
          <div className="w-full lg:w-3/12 flex-shrink-0">
            <div className="border border-gray-200 rounded-xl p-5 sticky top-24 shadow-sm bg-white">
              <div className="text-2xl font-bold flex items-start mb-4">
                <span className="text-sm font-medium pt-1">$</span>
                <span>{singleProduct.price - singleProduct.discount}</span>
              </div>

              <div className="text-sm mb-4">
                <span className="text-blue-600 hover:underline cursor-pointer">
                  FREE Returns
                </span>
              </div>

              <div className="text-sm mb-4 leading-relaxed">
                <span className="font-semibold text-gray-900">
                  FREE delivery
                </span>
                <span className="font-bold"> Wednesday, March 18</span>. Order
                within <span className="text-green-700">14 hrs 30 mins</span>
              </div>

              <div className="flex items-center gap-2 mb-6">
                <div className="text-green-700 text-lg font-medium">
                  In Stock
                </div>
              </div>

              <div className="mb-5">
                <label
                  htmlFor="quantity"
                  className="text-sm mr-2 shadow-sm rounded-md border border-gray-300 py-1.5 px-3 bg-[#f0f2f2] hover:bg-[#e3e6e6] cursor-pointer">
                  Qty:
                  <select
                    id="quantity"
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                    className="bg-transparent border-none outline-none ml-1 cursor-pointer">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="space-y-3">
                <button onClick={handleAddToCart} className="w-full bg-[#f8bd19] hover:bg-[#e5a800] text-black py-2.5 px-4 rounded-full text-sm font-medium transition-colors shadow-sm">
                  Add to Cart
                </button>
                <button onClick={handleBuyNow} className="w-full bg-[#fa8900] hover:bg-[#e07b00] text-black py-2.5 px-4 rounded-full text-sm font-medium transition-colors shadow-sm">
                  Buy Now
                </button>
              </div>

              <div className="mt-4 space-y-2 text-xs text-gray-500">
                <div className="flex items-center gap-4">
                  <span className="w-16">Ships from</span>
                  <span className="text-gray-900 text-sm">Blinko</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-16">Sold by</span>
                  <span className="text-gray-900 text-sm">Blinko</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-16">Returns</span>
                  <span className="text-blue-600 hover:underline cursor-pointer">
                    Eligible for Return
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-16">Payment</span>
                  <span className="text-blue-600 hover:underline cursor-pointer">
                    Secure transaction
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
