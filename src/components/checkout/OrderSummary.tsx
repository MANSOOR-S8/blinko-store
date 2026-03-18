"use client";

import { useSelector } from "react-redux";
import Image from "next/image";

interface OrderSummaryProps {
  shippingFee: number;
}

export default function OrderSummary({ shippingFee }: OrderSummaryProps) {
  const cartItem = useSelector((state: any) => state.cart.cartItem || []);
  
  const subtotal = cartItem.reduce((total: number, item: any) => total + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% mock tax
  const total = subtotal + tax + shippingFee;

  return (
    <div className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-200 h-full">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
      
      <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 scrollbar-hide">
        {cartItem.length === 0 ? (
          <p className="text-gray-500 text-sm">Your cart is empty.</p>
        ) : (
          cartItem.map((item: any) => (
            <div key={item.id} className="flex gap-4 items-center">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-white border border-gray-100 shrink-0">
                <Image src={item.img || "/images/products/p1.png"} alt={item.title || "Product"} fill className="object-contain p-2" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-sm text-gray-900 line-clamp-2">{item.title}</h4>
                <p className="text-gray-500 text-sm mt-1">Qty: {item.quantity}</p>
              </div>
              <div className="font-semibold text-gray-900">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="space-y-4 border-t border-gray-200 pt-6">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Shipping</span>
          <span>{shippingFee === 0 ? "Free" : `$${shippingFee.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-lg font-bold text-gray-900 pt-4 border-t border-gray-200">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
