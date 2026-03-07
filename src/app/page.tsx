"use client";
import Navbar from "@/components/layout/Header";
import HomeBanner from "@/app/homeSlide";
import ProductsCard from "@/components/product/ProductCard";
export default function Home() {
  return (
    <>
      <Navbar />
      <HomeBanner />
      <ProductsCard />
    </>
  );
}
