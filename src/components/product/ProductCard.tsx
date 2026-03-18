"use client";

import Image from "next/image";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import Link from "next/link";
import { addToCart } from "@/store/slices/cartSlice";
import { useDispatch } from "react-redux";

type Props = {
  product: any;
  showAddToCart?: boolean;
};

export default function ProductCard({ product, showAddToCart = true }: Props) {
  const dispatch = useDispatch();

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <Link href={`/product/${product.id}`}>
        <div className="relative h-80 w-full">
          <Image
            src={product.img}
            alt={product.title}
            fill
            className="object-cover p-5 cursor-pointer"
          />
        </div>
      </Link>

      <div className="p-4 text-center flex flex-col items-center">
        <h3 className="text-lg font-semibold text-gray-800 cursor-pointer hover:text-orange-500 transition-colors line-clamp-1">
          {product.title}
        </h3>

        <p className="text-gray-600 mt-1 text-sm line-clamp-2">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center mt-3 pt-3 border-t border-gray-100">
          <span className="text-xs font-bold text-gray-700 ml-2 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
            4.5
          </span>
          <div className="flex items-center text-amber-500 gap-0.5">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStarHalfAlt />
          </div>

          <span className="text-xs text-gray-400 ml-2">(128 reviews)</span>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center gap-2 mx-4">
            <span className="text-2xl font-bold text-black">
              ${product.price - product.discount}
            </span>

            <span className="text-gray-500 line-through text-[16px] font-bold">
              ${product.price}
            </span>
          </div>
          {showAddToCart && (
            <button
              onClick={() => dispatch(addToCart(product))}
              className="cursor-pointer px-4 py-2 bg-[#f8bd19] text-black rounded hover:bg-[#e5a800] transition-colors">
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
