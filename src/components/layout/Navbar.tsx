"use client";

import Link from "next/link";
import { useState, Suspense } from "react";
import {
  ShoppingCart,
  User,
  Settings,
  Menu,
  X,
  Phone,
  HelpCircle,
  Mail,
  MapPin,
  CreditCard,
} from "lucide-react";
import { FaRegUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const cartItem = useSelector((state: any) => state.cart.cartItem);
  const cartCount = cartItem.reduce(
    (total: number, item: any) => total + item.quantity,
    0,
  );

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 shadow-md">
      {/* Top Utility Navbar - Hidden on mobile */}
      <div className="bg-[#111827] text-gray-300 hidden md:block border-b border-gray-800">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-2 text-sm">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
              <Phone size={14} /> +1 (800) 123-4567
            </span>
            <span className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
              <Mail size={14} /> support@blinkostore.com
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="/track-order"
              className="flex items-center gap-2 hover:text-white transition-colors">
              <MapPin size={14} /> Track Order
            </Link>
            <Link
              href="/help"
              className="flex items-center gap-2 hover:text-white transition-colors">
              <HelpCircle size={14} /> Help Center
            </Link>
            <div className="flex items-center gap-3 border-l border-gray-700 pl-6">
              <span className="cursor-pointer hover:text-white transition-colors">
                ENG
              </span>
              <span className="cursor-pointer hover:text-white transition-colors">
                USD
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <header className="w-full bg-[#1d1c1c]">
        <div className="mx-auto flex max-w-[1400px] flex-col md:flex-row items-center justify-between px-6 py-4 gap-4">
          <div className="flex w-full md:w-auto items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="text-3xl font-bold text-white tracking-tight shrink-0">
              Blinko<span className="text-[#e5a800]">.</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-white hover:text-orange-400 p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Desktop Search Center */}
          <div className="hidden md:flex flex-1 max-w-2xl px-8">
            <Suspense
              fallback={
                <div className="h-10 w-full animate-pulse bg-gray-800 rounded-full"></div>
              }>
              <SearchBar />
            </Suspense>
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-8 shrink-0">
            <nav className="flex items-center gap-6 font-medium">
              <Link
                href="/"
                className="text-gray-200 hover:text-[#e5a800] transition-colors">
                Home
              </Link>
              <Link
                href="/categories"
                className="text-gray-200 hover:text-[#e5a800] transition-colors">
                Products
              </Link>
            </nav>

            <div className="flex items-center gap-5 border-l border-gray-700 pl-8">
              <Link
                href="/checkout"
                title="Checkout"
                className="text-gray-300 hover:text-[#e5a800] transition-colors duration-300 transform font-medium flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                <span className="hidden lg:inline text-sm">Checkout</span>
              </Link>

              <Link
                href="/cart"
                className="relative p-1.5 rounded-full text-gray-300 hover:text-[#e5a800] font-medium text-sm">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white shadow-sm ring-2 ring-[#1d1c1c]">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </Link>

              <Link
                href="/admin"
                className="text-gray-300 hover:text-[#e5a800] font-medium text-sm">
                <FaRegUserCircle className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? "max-h-96 opacity-100 border-t border-gray-800" : "max-h-0 opacity-0"}`}>
          <div className="px-6 py-4 space-y-4 bg-[#1d1c1c]">
            <Suspense
              fallback={
                <div className="h-10 w-full animate-pulse bg-gray-800 rounded-full"></div>
              }>
              <SearchBar />
            </Suspense>

            <div className="flex flex-col gap-4 font-medium pt-2 pb-4">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-200 hover:text-orange-400">
                Home
              </Link>
              <Link
                href="/categories"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-200 hover:text-orange-400">
                Products
              </Link>
            </div>

            <div className="flex flex-col gap-4 pt-4 border-t border-gray-800">
              <Link
                href="/checkout"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 text-white bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg font-medium justify-center transition-colors">
                <CreditCard className="h-5 w-5" /> Proceed to Checkout
              </Link>
              <div className="flex items-center justify-between">
                <Link
                  href="/cart"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-orange-400 font-medium">
                  <ShoppingCart className="h-5 w-5" /> ({cartCount})
                </Link>
                <div className="flex gap-4 flex-wrap">
                  <Link
                    href="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 text-orange-400 hover:text-orange-300 font-medium">
                    <FaRegUserCircle className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
