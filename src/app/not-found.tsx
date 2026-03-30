"use client";

import Link from "next/link";
import { Frown } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-10 shadow-sm border border-[var(--border-color)] text-center animate-slideUp">
        <div className="w-24 h-24 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Frown size={48} />
        </div>
        <h1 className="text-4xl font-bold text-[var(--heading-color)] mb-4">404</h1>
        <h2 className="text-xl font-bold text-[var(--heading-color)] mb-4">Page Not Found</h2>
        <p className="text-[var(--text-color)] mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link 
          href="/" 
          className="inline-block w-full bg-[var(--primary-color)] hover:bg-[#e5a800] text-white font-medium py-3 rounded-xl transition-all shadow-md shadow-[#f8bd19]/20"
        >
          Return to Details / Home
        </Link>
      </div>
    </div>
  );
}
