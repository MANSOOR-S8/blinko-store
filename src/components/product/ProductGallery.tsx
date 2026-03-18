"use client";

import Image from "next/image";
import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./product.css";

const trendingProducts = [
  { id: 1, img: "/images/products/p1.png" },
  { id: 2, img: "/images/products/p2.png" },
  { id: 3, img: "/images/products/p3.png" },
  { id: 4, img: "/images/products/p4.png" },
  { id: 5, img: "/images/products/p5.png" },
  { id: 6, img: "/images/products/p6.png" },
  { id: 7, img: "/images/products/p7.png" },
  { id: 8, img: "/images/products/p8.png" },
  { id: 9, img: "/images/products/p9.png" },
  { id: 10, img: "/images/products/p10.png" },
  { id: 11, img: "/images/products/p11.png" },
  { id: 12, img: "/images/products/p12.png" },
  { id: 13, img: "/images/products/p13.png" },
  { id: 14, img: "/images/products/p14.png" },
  { id: 15, img: "/images/products/p15.png" },
];

const computerProducts = [
  { id: 1, img: "/images/categories/hr1.jpg" },
  { id: 2, img: "/images/categories/hr2.jpg" },
  { id: 3, img: "/images/categories/hr3.jpg" },
  { id: 4, img: "/images/categories/hr4.jpg" },
  { id: 5, img: "/images/categories/hr5.jpg" },
  { id: 6, img: "/images/categories/hr1.jpg" },
  { id: 7, img: "/images/categories/hr2.jpg" },
  { id: 8, img: "/images/categories/hr3.jpg" },
  { id: 9, img: "/images/categories/hr4.jpg" },
  { id: 10, img: "/images/categories/hr5.jpg" },
  { id: 11, img: "/images/categories/hr1.jpg" },
  { id: 12, img: "/images/categories/hr2.jpg" },
  { id: 13, img: "/images/categories/hr3.jpg" },
  { id: 14, img: "/images/categories/hr4.jpg" },
  { id: 15, img: "/images/categories/hr5.jpg" },
];

export default function ProductGallery() {
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);

  const scroll = (
    ref: React.RefObject<HTMLDivElement>,
    dir: "left" | "right",
  ) => {
    if (!ref.current) return;
    ref.current.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  const imageSize = 200; // increased image size

  return (
    <div className="max-w-[1400px] mx-auto space-y-10 px-4">
      {/* Section 1 */}
      <section className="relative bg-white p-4 rounded-lg group">
        <h2 className="text-2xl font-semibold mb-4">
          Trending Internationally: Top Picks
        </h2>

        {/* Scroll Buttons */}
        <button
          onClick={() => scroll(ref1, "left")}
          aria-label="scroll left"
          className="opacity-0 group-hover:opacity-100 md:opacity-100 transition duration-200 absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow p-2 rounded-full z-10">
          <FaChevronLeft />
        </button>
        <button
          onClick={() => scroll(ref1, "right")}
          aria-label="scroll right"
          className="opacity-0 group-hover:opacity-100 md:opacity-100 transition duration-200 absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow p-2 rounded-full z-10">
          <FaChevronRight />
        </button>

        {/* Product List */}
        <div
          ref={ref1}
          className="flex gap-4 overflow-x-auto overflow-y-hidden scrollbar-hide py-2 items-center">
          {trendingProducts.map((p) => (
            <div
              key={p.id}
              className="flex-shrink-0 w-[120px] sm:w-[160px] md:w-[200px] lg:w-[240px] h-[120px] sm:h-[160px] md:h-[200px] flex items-center justify-center rounded bg-gray-50">
              <Image
                src={p.img}
                alt={`Product ${p.id}`}
                width={imageSize}
                height={imageSize}
                className="object-contain cursor-pointer"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Section 2 */}
      <section className="relative bg-white p-4 rounded-lg group">
        <h2 className="text-2xl font-semibold mb-4">
          Best Sellers in Computers & Accessories
        </h2>

        {/* Scroll Buttons */}
        <button
          onClick={() => scroll(ref2, "left")}
          aria-label="scroll left"
          className="opacity-0 group-hover:opacity-100 md:opacity-100 transition duration-200 absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow p-2 rounded-full z-10">
          <FaChevronLeft />
        </button>
        <button
          onClick={() => scroll(ref2, "right")}
          aria-label="scroll right"
          className="opacity-0 group-hover:opacity-100 md:opacity-100 transition duration-200 absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow p-2 rounded-full z-10">
          <FaChevronRight />
        </button>

        {/* Product List */}
        <div
          ref={ref2}
          className="flex gap-4 overflow-x-auto overflow-y-hidden scrollbar-hide py-2 items-center">
          {computerProducts.map((pro) => (
            <div
              key={pro.id}
              className="flex-shrink-0 w-[120px] sm:w-[160px] md:w-[200px] lg:w-[240px] h-[120px] sm:h-[160px] md:h-[200px] flex items-center justify-center rounded bg-gray-50">
              <Image
                src={pro.img}
                alt={`Computer Product ${pro.id}`}
                width={imageSize}
                height={imageSize}
                className="object-contain cursor-pointer"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
