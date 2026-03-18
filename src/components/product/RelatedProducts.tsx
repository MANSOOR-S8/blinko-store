"use client";

import { useAppSelector } from "@/store/hooks";
import ProductCard from "./ProductCard";

export default function RelatedProducts() {
  const { products } = useAppSelector((state) => state.products);

  const suggested = products.slice(0, 4);

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold mb-4">Suggested Products</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {suggested.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
