"use client";

import Navbar from "@/components/layout/Navbar";
import ProductGallery from "@/components/product/ProductGallery";

export default function CategoryDetailsPage({ params }: { params: { categoryId: string } }) {
  const categoryName = params.categoryId.charAt(0).toUpperCase() + params.categoryId.slice(1);

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 py-12 md:py-20 border-b border-[var(--border-color)]">
        <div className="max-w-[1400px] mx-auto px-4 text-center animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--heading-color)] mb-4">{categoryName} Collection</h1>
          <p className="text-[var(--text-color)] max-w-2xl mx-auto">Explore our wide range of premium {categoryName.toLowerCase()} tailored for your lifestyle.</p>
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto px-4 py-12 animate-fadeIn">
         <ProductGallery />
      </div>
    </>
  );
}
