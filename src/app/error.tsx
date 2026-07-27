"use client";

import { useEffect } from "react";
import { AlertCircle } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-10 shadow-sm border border-[var(--border-color)] text-center animate-slideUp">
        <div className="w-24 h-24 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle size={48} />
        </div>
        <h1 className="text-2xl font-bold text-[var(--heading-color)] mb-4">
          Something went wrong!
        </h1>
        <p className="text-[var(--text-color)] mb-8">
          We've encountered an unexpected error. Our team has been notified.
        </p>
        <button
          onClick={() => reset()}
          className="w-full bg-[var(--primary-color)] hover:bg-[#e5a800] cursor-pointer text-white font-medium py-3 rounded-xl transition-all shadow-md shadow-[#f8bd19]/20">
          Try Again
        </button>
      </div>
    </div>
  );
}
