"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingBag, User, Settings, Menu, X, LogOut, Home, CreditCard } from "lucide-react";
import { useState } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navLinks = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Recent Orders", href: "/dashboard/orders", icon: ShoppingBag },
    { name: "Checkout", href: "/checkout", icon: CreditCard },
    { name: "Profile", href: "/dashboard/profile", icon: User },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[var(--section-bg)] text-[var(--text-color)] flex flex-col md:flex-row font-sans">
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between bg-white p-4 shadow-sm border-b border-[var(--border-color)] z-20 relative">
        <Link href="/" className="text-xl font-bold text-[var(--heading-color)]">Blinko<span className="text-[var(--primary-color)]">Store</span></Link>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 bg-gray-50 rounded-lg shadow-sm">
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside 
        className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 fixed md:static inset-y-0 left-0 w-64 bg-white border-r border-[var(--border-color)] z-10 transition-transform duration-300 ease-in-out flex flex-col`}
      >
        <div className="p-6 hidden md:block border-b border-[var(--border-color)]">
          <Link href="/" className="text-2xl font-bold text-[var(--heading-color)] hover:opacity-80 transition-opacity">Blinko<span className="text-[var(--primary-color)]">Store</span></Link>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2 mt-16 md:mt-0">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link 
                key={link.name} 
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? "bg-[var(--primary-color)] text-white shadow-md shadow-[#f8bd19]/30" 
                    : "text-[var(--text-color)] hover:bg-yellow-50 hover:text-[var(--primary-color)]"
                }`}
              >
                <Icon size={20} className={isActive ? "text-white" : "text-gray-500 group-hover:text-[var(--primary-color)] transition-colors"} />
                <span className="font-medium">{link.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[var(--border-color)] space-y-2">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-[var(--text-color)] hover:bg-gray-50 hover:text-[var(--primary-color)] transition-colors font-medium">
            <Home size={20} />
            <span>Back to Store</span>
          </Link>
          <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-500 hover:bg-red-50 transition-colors font-medium">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-0 md:hidden animate-fadeIn"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 w-full max-w-7xl mx-auto overflow-y-auto">
        <div className="animate-slideUp delay-200">
          {children}
        </div>
      </main>
    </div>
  );
}
