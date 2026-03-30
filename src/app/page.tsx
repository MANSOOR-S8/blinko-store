"use client";

import Navbar from "@/components/layout/Navbar";
import HomeBanner from "@/app/homeSlide";
// import FeaturedCategories from "@/components/home/FeaturedCategories";
import ServicesCard from "@/components/product/Services";
import ProductGallery from "@/components/product/ProductGallery";
import NewsletterSection from "@/components/home/NewsletterSection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="">
      <Navbar />
      <HomeBanner />
      <ServicesCard />
      {/* <FeaturedCategories /> */}
      <ProductGallery />
      <NewsletterSection />
      <Footer />
    </main>
  );
}
