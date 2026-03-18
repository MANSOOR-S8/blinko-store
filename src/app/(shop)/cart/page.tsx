"use client";

import { FaTrash } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeItem,
} from "@/store/slices/cartSlice";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";

export default function CartPage() {
  const dispatch = useDispatch();
  const cartItem = useSelector((state: any) => state.cart.cartItem);
  
  const subtotal = cartItem.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <>
      <Navbar />
      <div className="max-w-[1400px] mx-auto px-4 py-8 md:py-12 animate-fadeIn">
        <h1 className="text-3xl font-bold text-[var(--heading-color)] mb-8">Shopping Cart</h1>
        
        {cartItem.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-2xl border border-[var(--border-color)]">
            <h2 className="text-2xl font-bold text-[var(--light-text)] mb-4">Your Cart is Empty</h2>
            <Link href="/" className="inline-block bg-[var(--primary-color)] text-white px-8 py-3 rounded-xl font-medium hover:bg-[#e5a800] transition-colors shadow-sm">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 space-y-4">
              {cartItem.map((item: any) => (
                <div
                  key={item.id}
                  className="flex items-center bg-white rounded-xl shadow-sm border border-[var(--border-color)] p-4 justify-between transition-all hover:shadow-md">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 relative bg-gray-50 rounded-lg flex-shrink-0">
                      <Image
                        src={item.img || "/images/products/p1.png"}
                        alt={item.title}
                        fill
                        className="object-contain p-2 mix-blend-multiply"
                      />
                    </div>
                    <div className="max-w-[200px] sm:max-w-[300px]">
                      <p className="font-medium text-sm sm:text-base text-[var(--heading-color)] line-clamp-2">{item.title}</p>
                      <p className="text-yellow-600 font-bold mt-1">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-end sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                    <div className="flex items-center border border-[var(--border-color)] rounded-lg overflow-hidden shrink-0">
                      <button
                        onClick={() => dispatch(decreaseQuantity(item.id))}
                        className="px-3 py-1 bg-gray-50 hover:bg-gray-100 text-[var(--text-color)] transition-colors">
                        -
                      </button>
                      <span className="px-4 py-1 font-medium text-[var(--heading-color)] bg-white">{item.quantity}</span>
                      <button
                        onClick={() => dispatch(increaseQuantity(item.id))}
                        className="px-3 py-1 bg-gray-50 hover:bg-gray-100 text-[var(--text-color)] transition-colors">
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => dispatch(removeItem(item.id))}
                      className="p-2 sm:ml-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remove Item">
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full lg:w-[400px] shrink-0">
               <div className="bg-gray-50 rounded-2xl p-6 border border-[var(--border-color)] lg:sticky lg:top-28">
                 <h2 className="text-xl font-bold text-[var(--heading-color)] mb-6">Order Summary</h2>
                 <div className="space-y-3 mb-6">
                   <div className="flex justify-between text-[var(--text-color)]">
                     <span>Subtotal ({cartItem.length} items)</span>
                     <span className="font-medium text-[var(--heading-color)]">${subtotal.toFixed(2)}</span>
                   </div>
                   <div className="flex justify-between text-[var(--text-color)]">
                     <span>Estimated Tax (8%)</span>
                     <span className="font-medium text-[var(--heading-color)]">${tax.toFixed(2)}</span>
                   </div>
                   <div className="border-t border-[var(--border-color)] pt-4 mt-4 flex justify-between font-bold text-lg text-[var(--heading-color)]">
                     <span>Total</span>
                     <span>${total.toFixed(2)}</span>
                   </div>
                 </div>
                 
                 <Link href="/checkout" className="block w-full bg-[var(--primary-color)] text-white text-center font-medium py-3.5 rounded-xl hover:bg-[#e5a800] transition-all shadow-md shadow-[#f8bd19]/20">
                   Proceed to Checkout
                 </Link>
               </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
