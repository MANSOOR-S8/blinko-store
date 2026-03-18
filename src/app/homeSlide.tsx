//Home Page
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

// TypeScript Interface for Slide
interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  alt: string;
  buttonText: string;
  buttonLink: string;
  bgColor: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Transform Your Body",
    subtitle: "Join the best gym in town",
    description: "State-of-the-art equipment & expert trainers",
    image: "/images/banners/carousel-1.webp",
    alt: "",
    buttonText: "Join Now",
    buttonLink: "/join",
    bgColor: "from-blue-600 to-purple-600",
  },
  {
    id: 2,
    title: "Personal Training",
    subtitle: "Get custom workout plans",
    description: "1-on-1 sessions with professional trainers",
    image: "/images/banners/carousel-2.webp",
    alt: "",
    buttonText: "Learn More",
    buttonLink: "/services",
    bgColor: "from-green-600 to-teal-600",
  },
  {
    id: 3,
    title: "Nutrition Plans",
    subtitle: "Fuel your fitness journey",
    description: "Customized meal plans for your goals",
    image: "/images/banners/carousel-3.webp",
    alt: "",
    buttonText: "Get Started",
    buttonLink: "/nutrition",
    bgColor: "from-orange-600 to-red-600",
  },
];
export default function HeroSection() {
  return (
    <div className="relative w-full max-w-[1400px] mx-auto">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px]">
        {slides.map((slide: Slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full ">
              {/* Background Image with Overlay */}
              <div className="absolute inset-0">
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  className="object-cover mix-blend-overlay"
                  priority={slide.id === 1}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1400px"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>

              {/* Content Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-left  px-4 max-w-4xl mx-auto">
                  <p className="text-white text-sm sm:text-base md:text-lg uppercase tracking-wider mb-2 animate-fadeIn ">
                    {slide.subtitle}
                  </p>
                  <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 animate-slideUp">
                    {slide.title}
                  </h1>
                  <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl mb-6 md:mb-8 animate-slideUp delay-200">
                    {slide.description}
                  </p>
                  <Link
                    href={slide.buttonLink}
                    className="inline-block bg-white text-gray-900 px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 text-sm sm:text-base animate-slideUp delay-300">
                    {slide.buttonText}
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
