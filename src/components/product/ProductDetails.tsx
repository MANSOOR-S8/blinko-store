"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchProductById,
  clearSingleProduct,
} from "@/store/slices/productSlice";
import Image from "next/image";

interface ProductDetailProps {
  productId: number;
}

export default function ProductDetail({ productId }: ProductDetailProps) {
  const dispatch = useAppDispatch();
  const { singleProduct, loading, error } = useAppSelector(
    (state) => state.products,
  );

  useEffect(() => {
    dispatch(fetchProductById(productId));

    // Cleanup
    return () => {
      dispatch(clearSingleProduct());
    };
  }, [dispatch, productId]);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error || !singleProduct) {
    return (
      <div className="text-center text-red-600 py-8">Product not found</div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative h-96 w-full">
          <Image
            src={singleProduct.img}
            alt={singleProduct.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            {singleProduct.title}
          </h1>
          <p className="text-gray-600 mt-4">{singleProduct.description}</p>
          <div className="mt-6">
            <span className="text-3xl font-bold text-blue-600">
              ${singleProduct.price}
            </span>
          </div>
          <button className="mt-8 w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
