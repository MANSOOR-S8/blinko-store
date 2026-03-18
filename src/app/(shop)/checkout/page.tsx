"use client";

import CheckoutForm from "@/components/checkout/CheckoutForm";
import Navbar from "@/components/layout/Navbar";

export default function CheckoutPage() {
  return (
    <>
      <Navbar />
    <div className="max-w-[1400px] mx-auto px-4 py-8 animate-fadeIn">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        <p className="text-gray-500 mt-2">Complete your order swiftly and securely.</p>
      </div>
      <CheckoutForm />
    </div>
    </>
  );
}
