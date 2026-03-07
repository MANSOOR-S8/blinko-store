//Navbar
"use client";

import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";

export default function Navbar() {
  return (
    <header className="w-full border-b bg-[#1d1c1c]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-white">
          Shop<span className="text-orange-400">X</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="hover:text-orange-400 text-white">
            Home
          </Link>
          <Link href="/products" className="hover:text-orange-400 text-white">
            Products
          </Link>
          {/* <Link href="/about" className="hover:text-blue-600 text-black">
            About
          </Link> */}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-6">
          <Link href="/cart" className="relative">
            <ShoppingCart className="h-6 w-6 text-white" />
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-orange-400 text-xs text-white">
              0
            </span>
          </Link>

          <Link href="/auth/register">
            <User className="h-6 w-6 text-white" />
          </Link>
        </div>
      </div>
    </header>
  );
}
