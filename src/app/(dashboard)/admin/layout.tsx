"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  Tags,
  Menu,
  X,
  House,
} from "lucide-react";

import { useState } from "react";

const sidebarLinks = [
  { name: "Home", href: "/", icon: House },
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Upload Product", href: "/admin/products/new", icon: Package },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { name: "Categories", href: "/admin/categories", icon: Tags },
  { name: "Reports", href: "/admin/analytics", icon: Users },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-[var(--border-color)] fixed h-full z-20">
        <div className="p-6 border-b border-[var(--border-color)]">
          <Link
            href="/admin"
            className="text-2xl font-bold text-[var(--primary-color)]">
            Admin Panel
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (pathname.startsWith(link.href) && link.href !== "/admin");
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive
                    ? "bg-[var(--primary-color)] text-white shadow-md shadow-[#f8bd19]/20"
                    : "text-[var(--light-text)] hover:bg-gray-50 hover:text-[var(--heading-color)]"
                }`}>
                <link.icon size={20} />
                <span className="font-medium">{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile  Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`lg:hidden fixed inset-y-0 left-0 w-64 bg-white border-r border-[var(--border-color)] z-50 transform transition-transform duration-300 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-6 border-b border-[var(--border-color)] flex items-center justify-between">
          <Link
            href="/admin"
            className="text-2xl font-bold text-[var(--primary-color)]">
            Admin Panel
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-[var(--light-text)]">
            <X size={24} />
          </button>
        </div>
        <nav className="p-4 space-y-2">
          {sidebarLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (pathname.startsWith(link.href) && link.href !== "/admin");
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive
                    ? "bg-[var(--primary-color)] text-white shadow-md shadow-[#f8bd19]/20"
                    : "text-[var(--light-text)] hover:bg-gray-50 hover:text-[var(--heading-color)]"
                }`}>
                <link.icon size={20} />
                <span className="font-medium">{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="bg-white border-b border-[var(--border-color)] h-16 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-10">
          <button
            className="lg:hidden text-[var(--text-color)]"
            onClick={() => setIsMobileMenuOpen(true)}>
            <Menu size={24} />
          </button>

          <div className="flex-1" />

          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 rounded-full bg-[var(--primary-color)] text-white flex items-center justify-center font-bold">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 sm:p-6 lg:p-8 flex-1">{children}</div>
      </main>
    </div>
  );
}
