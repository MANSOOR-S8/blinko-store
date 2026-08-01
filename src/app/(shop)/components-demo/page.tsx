"use client";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Breadcrumb from "@/components/shared/Breadcrumb";
import ErrorBoundary from "@/components/shared/ErrorBoundary";
import ImageWithFallback from "@/components/shared/ImageWithFallback";
import Loader from "@/components/shared/Loader";
import Pagination from "@/components/shared/Pagination";
import Rating from "@/components/shared/Rating";
import Toast from "@/components/shared/Toast";

// Helper component to trigger an error
const BuggyComponent = () => {
  throw new Error("I crashed!");
  return <div>Invisible</div>;
};

export default function ComponentsDemoPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [showError, setShowError] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

  const showToast = (type: "success" | "error" | "info") => {
    setToast({ message: `This is a dynamic ${type} toast notification!`, type });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Navbar />
      
      <main className="max-w-[1200px] mx-auto px-6 pt-10 space-y-12">
        <div>
          <h1 className="text-4xl font-bold text-[var(--heading-color)] mb-2">Shared Components Demo</h1>
          <p className="text-[var(--light-text)]">A dynamic showcase of all the newly engineered UI components. Check them out in action below!</p>
        </div>

        {/* 1. Breadcrumb */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-[var(--border-color)]">
          <h2 className="text-2xl font-bold border-b pb-4 mb-6">1. Breadcrumb Component</h2>
          <Breadcrumb 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Components', href: '/components-demo' },
              { label: 'Current Page' }
            ]} 
          />
        </section>

        {/* 2. Rating */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-[var(--border-color)]">
          <h2 className="text-2xl font-bold border-b pb-4 mb-6">2. Interactive Rating Component</h2>
          <div className="flex gap-8">
            <div>
              <p className="mb-2 text-sm text-[var(--light-text)]">4.5 Stars Display:</p>
              <Rating value={4.5} size={24} />
            </div>
            <div>
              <p className="mb-2 text-sm text-[var(--light-text)]">2 Stars Display:</p>
              <Rating value={2} size={24} />
            </div>
          </div>
        </section>

        {/* 3. Pagination */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-[var(--border-color)]">
          <h2 className="text-2xl font-bold border-b pb-4 mb-6">3. Pagination Component</h2>
          <p className="mb-4 font-medium text-[var(--primary-color)]">Current Page selected: {currentPage}</p>
          <Pagination 
            currentPage={currentPage}
            totalPages={10}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </section>

        {/* 4. Loader */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-[var(--border-color)]">
          <h2 className="text-2xl font-bold border-b pb-4 mb-6">4. Loader Component</h2>
          <div className="flex justify-around items-center bg-gray-50 rounded-xl p-4 border border-dashed border-gray-300">
            <Loader size={24} text="Small Loader..." />
            <Loader size={48} text="Large Loader..." />
          </div>
        </section>

        {/* 5. ImageWithFallback */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-[var(--border-color)]">
          <h2 className="text-2xl font-bold border-b pb-4 mb-6">5. Image With Fallback</h2>
          <div className="flex gap-6">
            <div className="w-48 h-48 relative border rounded-xl overflow-hidden shadow-sm">
              <p className="absolute top-2 w-full text-center text-xs z-10 bg-white/80 p-1">Broken URL (Triggers Fallback)</p>
              <ImageWithFallback src="/broken-url.jpg" alt="test" fill className="object-cover" />
            </div>
            <div className="w-48 h-48 relative border rounded-xl overflow-hidden shadow-sm">
              <p className="absolute top-2 w-full text-center text-xs z-10 bg-white/80 p-1">Valid URL</p>
              <ImageWithFallback src="/images/products/product-1.png" alt="valid" fill className="object-cover" />
            </div>
          </div>
        </section>

        {/* 6. Toast Notifications */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-[var(--border-color)]">
          <h2 className="text-2xl font-bold border-b pb-4 mb-6">6. Toast Notifications</h2>
          <div className="flex gap-4">
            <button onClick={() => showToast('success')} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">Trigger Success</button>
            <button onClick={() => showToast('error')} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">Trigger Error</button>
            <button onClick={() => showToast('info')} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">Trigger Info</button>
          </div>
        </section>

        {/* 7. Error Boundary */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-[var(--border-color)]">
          <h2 className="text-2xl font-bold border-b pb-4 mb-6">7. Error Boundary</h2>
          <div className="mb-4">
            <button 
              onClick={() => setShowError(true)} 
              className="px-4 py-2 bg-[var(--heading-color)] text-white rounded-lg hover:bg-black transition"
            >
              Trigger Component Crash
            </button>
          </div>
          
          <div className="border border-dashed border-gray-300 rounded-xl p-4 bg-gray-50 min-h-[150px] flex items-center justify-center">
            <ErrorBoundary>
              {showError ? <BuggyComponent /> : <p className="text-[var(--light-text)]">I am a normal, non-crashed component. Click above to break me!</p>}
            </ErrorBoundary>
          </div>
        </section>

      </main>

      {/* Render Active Toast */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
