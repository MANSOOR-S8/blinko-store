"use client";

import { useState } from "react";
import ShippingForm from "./ShippingForm";
import PaymentForm from "./PaymentForm";
import OrderSummary from "./OrderSummary";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function CheckoutForm() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [shippingData, setShippingData] = useState<any>(null);

  const handleShippingSubmit = (data: any) => {
    setShippingData(data);
    setStep(2);
  };

  const handlePaymentSubmit = () => {
    setStep(3);
  };

  if (step === 3) {
    return (
      <div className="max-w-2xl mx-auto bg-white p-10 rounded-2xl shadow-sm border border-gray-200 text-center animate-slideUp">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Payment Successful!</h2>
        <p className="text-gray-500 mb-8">
          Thank you for your order, {shippingData?.firstName || "Customer"}. We have received your payment and your order is currently processing. A confirmation email has been sent to {shippingData?.email || "your email"}.
        </p>
        <Link 
          href="/dashboard/orders"
          className="inline-block bg-[var(--primary-color)] text-white font-medium px-8 py-3 rounded-xl hover:bg-[var(--primary-hover)] transition-colors shadow-md shadow-[#f8bd19]/20"
        >
          View My Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      <div className="flex-1 w-full bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
        
        {/* Stepper Header */}
        <div className="flex items-center justify-between mb-8 relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-100 z-0 rounded-full"></div>
          <div className={`absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[var(--primary-color)] z-0 transition-all duration-500 rounded-full ${step === 2 ? 'w-full' : 'w-0'}`}></div>
          
          <div className="relative z-10 flex flex-col items-center gap-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white transition-colors duration-300 ${step >= 1 ? 'bg-[var(--primary-color)]' : 'bg-gray-200'}`}>1</div>
            <span className={`text-sm font-medium ${step >= 1 ? 'text-gray-900' : 'text-gray-400'}`}>Shipping</span>
          </div>

          <div className="relative z-10 flex flex-col items-center gap-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors duration-300 ${step >= 2 ? 'bg-[var(--primary-color)] text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
            <span className={`text-sm font-medium ${step >= 2 ? 'text-gray-900' : 'text-gray-400'}`}>Payment</span>
          </div>
        </div>

        {/* Dynamic Forms */}
        {step === 1 && (
          <div className="animate-fadeIn">
            <ShippingForm initialData={shippingData} onSubmit={handleShippingSubmit} />
          </div>
        )}
        
        {step === 2 && (
          <div className="animate-fadeIn">
            <PaymentForm onBack={() => setStep(1)} onSubmit={handlePaymentSubmit} />
          </div>
        )}
      </div>

      <div className="w-full lg:w-[400px] xl:w-[450px] shrink-0 sticky top-28">
        <OrderSummary shippingFee={shippingData?.shippingMethod === 'express' ? 15.00 : 0.00} />
      </div>
    </div>
  );
}
