"use client";

import { useEffect } from "react";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/store/hooks";
import { fetchProducts } from "../../store/slices/productSlice";

import {
  TbTruckReturn,
  TbSend,
  TbLifebuoy,
  TbCreditCard,
  TbLock,
  TbHeadset,
} from "react-icons/tb";
import FeaturedCategories from "../home/FeaturedCategories";

type ServiceType = {
  id: number;
  icon: React.ElementType;
  title: string;
  description: string;
};
type Props = {
  showAddToCart?: boolean;
};
const services: ServiceType[] = [
  {
    id: 1,
    icon: TbTruckReturn,
    title: "FREE RETURN",
    description: "30 days money back guarantee!",
  },
  {
    id: 2,
    icon: TbSend,
    title: "FREE SHIPPING",
    description: "Free shipping on all order",
  },
  {
    id: 3,
    icon: TbLifebuoy,
    title: "SUPPORT 24/7",
    description: "We support online 24 hrs a day",
  },
  {
    id: 4,
    icon: TbCreditCard,
    title: "RECEIVE GIFT CARD",
    description: "Recieve gift all over order $50",
  },
  {
    id: 5,
    icon: TbLock,
    title: "SECURE PAYMENT",
    description: "We Value Your Security",
  },
  {
    id: 6,
    icon: TbHeadset,
    title: "ONLINE SERVICE",
    description: "Free return products in 30 days",
  },
];

export default function ServicesCard({ showAddToCart = false }: Props) {
  const dispatch = useAppDispatch();

  const { products, loading, error } = useSelector(
    (state: any) => state.products,
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      {/* Services Section */}

      <section className="bg-white border-gray-200 border-y">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.id}
                className="flex items-start gap-4 p-6 border-r border-gray-200 last:border-r-0">
                <div className="text-orange-500 text-4xl">
                  <Icon />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-800">
                    {service.title}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <FeaturedCategories />
      </section>

      {/* Product Cards Section */}
      <section className="max-w-[1400px] mx-auto py-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 4).map((product: any) => (
            <ProductCard
              key={product.id}
              product={product}
              showAddToCart={showAddToCart}
            />
          ))}
        </div>
      </section>
    </>
  );
}
