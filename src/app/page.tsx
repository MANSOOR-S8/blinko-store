"use client";

import Navbar from "@/components/layout/Navbar";
import HomeBanner from "@/app/homeSlide";
import ServicesCard from "@/components/product/Services";
import ProductGallery from "@/components/product/ProductGallery";
import Footer from "@/components/layout/Footer";
export default function Home() {
  return (
    <>
      <Navbar />
      <HomeBanner />
      <ServicesCard />
      <ProductGallery />
      <Footer />
    </>
  );
}
