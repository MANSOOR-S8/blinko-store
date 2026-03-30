"use client";

import { useEffect } from "react";
import ProductCard from "@/components/product/ProductCard";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/store/hooks";
import { fetchProducts } from "@/store/slices/productSlice";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function AllCategories() {
  const dispatch = useAppDispatch();

  const { products, loading, error } = useSelector(
    (state: any) => state.products,
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      {/* All Categories */}
      <section>
        <div className=" sticky top-0 z-10 ">
          <Navbar />
        </div>
        <div>
          <section className="max-w-[1400px] mx-auto py-8 product-cardSection">
            <div className="my-6 ">
              <h2 className="text-3xl font-semibold">All Categories</h2>
            </div>
            <div>
              {loading && (
                <p className="text-center py-6">Loading products...</p>
              )}

              {error && (
                <p className="text-red-500 text-center py-6">Error: {error}</p>
              )}

              {!loading && !error && (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {products.map((product: any) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </section>
      <div>
        <Footer />
      </div>
    </>
  );
}
