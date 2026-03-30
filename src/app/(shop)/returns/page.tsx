"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import {
  RotateCcw,
  Package,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Truck,
} from "lucide-react";

/* ─── Step timeline data ────────────────────────────────────────────── */
const returnSteps = [
  {
    icon: <Package size={24} />,
    title: "Initiate Return",
    description:
      "Log into your account, go to My Orders, and click \"Request Return\" on the eligible item.",
  },
  {
    icon: <Truck size={24} />,
    title: "Ship the Item",
    description:
      "Pack the item in its original packaging and use the prepaid shipping label we email you.",
  },
  {
    icon: <CheckCircle2 size={24} />,
    title: "Quality Inspection",
    description:
      "Once received, our team inspects the item within 2 business days and approves your return.",
  },
  {
    icon: <RotateCcw size={24} />,
    title: "Refund or Exchange",
    description:
      "Choose a full refund to your original payment method or exchange for a different item.",
  },
];

/* ─── Policy items ──────────────────────────────────────────────────── */
const eligibleItems = [
  "Unused items in original packaging with all tags attached",
  "Items returned within 30 days of delivery",
  "Defective or damaged products (report within 48 hours)",
  "Items that don't match the product description",
  "Wrong item received",
];

const nonEligibleItems = [
  "Items marked as \"Final Sale\" or \"Non-Returnable\"",
  "Perishable goods (food, flowers, etc.)",
  "Personal care items that have been opened or used",
  "Customized or personalized products",
  "Gift cards and downloadable products",
  "Items returned after the 30-day window",
];

export default function ReturnsPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[var(--section-bg)] min-h-screen">
        {/* ── Hero Banner ── */}
        <section className="bg-[var(--footer-bg)] text-white">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
            <div className="flex justify-center mb-4">
              <RotateCcw size={48} className="text-[var(--primary-color)]" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
              Returns & Exchanges
            </h1>
            <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
              We want you to love your purchase. If something isn&apos;t right,
              our hassle-free return process makes it easy to get a refund or
              exchange.
            </p>
          </div>
        </section>

        {/* ── Return Process Steps ── */}
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--heading-color)] text-center mb-4">
            How It Works
          </h2>
          <p className="text-[var(--text-color)] text-center max-w-xl mx-auto mb-12">
            Our return process is simple and straightforward. Follow these four
            steps.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {returnSteps.map((step, idx) => (
              <div
                key={idx}
                className="relative bg-white rounded-2xl border border-[var(--border-color)] p-6 sm:p-8 text-center shadow-sm hover:shadow-md transition-shadow group"
              >
                {/* Step number badge */}
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-[var(--primary-color)] text-gray-900 flex items-center justify-center text-sm font-bold shadow-md">
                  {idx + 1}
                </div>
                <div className="w-14 h-14 rounded-full bg-[var(--primary-color)]/10 flex items-center justify-center mx-auto mb-4 text-[var(--primary-color)] group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                <h3 className="font-bold text-[var(--heading-color)] mb-2 text-base sm:text-lg">
                  {step.title}
                </h3>
                <p className="text-sm text-[var(--text-color)] leading-relaxed">
                  {step.description}
                </p>
                {/* Arrow connector (hidden on last item & mobile) */}
                {idx < returnSteps.length - 1 && (
                  <ArrowRight
                    size={20}
                    className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 text-[var(--primary-color)] z-10"
                  />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── Eligibility ── */}
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Eligible */}
            <div className="bg-white rounded-2xl border border-[var(--border-color)] overflow-hidden shadow-sm">
              <div className="flex items-center gap-3 px-6 py-5 bg-emerald-50 border-b border-emerald-100">
                <CheckCircle2 size={22} className="text-emerald-600" />
                <h3 className="text-lg font-bold text-emerald-800">
                  Eligible for Return
                </h3>
              </div>
              <ul className="p-6 space-y-4">
                {eligibleItems.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm sm:text-base text-[var(--text-color)]"
                  >
                    <CheckCircle2
                      size={18}
                      className="text-emerald-500 shrink-0 mt-0.5"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Not Eligible */}
            <div className="bg-white rounded-2xl border border-[var(--border-color)] overflow-hidden shadow-sm">
              <div className="flex items-center gap-3 px-6 py-5 bg-red-50 border-b border-red-100">
                <AlertTriangle size={22} className="text-red-600" />
                <h3 className="text-lg font-bold text-red-800">
                  Not Eligible for Return
                </h3>
              </div>
              <ul className="p-6 space-y-4">
                {nonEligibleItems.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm sm:text-base text-[var(--text-color)]"
                  >
                    <AlertTriangle
                      size={18}
                      className="text-red-400 shrink-0 mt-0.5"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Additional Info Cards ── */}
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl border border-[var(--border-color)] p-6 sm:p-8 text-center shadow-sm">
              <Clock
                size={32}
                className="text-[var(--primary-color)] mx-auto mb-3"
              />
              <h3 className="font-bold text-[var(--heading-color)] mb-2">
                30-Day Window
              </h3>
              <p className="text-sm text-[var(--text-color)]">
                You have 30 days from delivery to initiate a return or exchange
                for eligible items.
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-[var(--border-color)] p-6 sm:p-8 text-center shadow-sm">
              <ShieldCheck
                size={32}
                className="text-[var(--primary-color)] mx-auto mb-3"
              />
              <h3 className="font-bold text-[var(--heading-color)] mb-2">
                Free Returns on Defects
              </h3>
              <p className="text-sm text-[var(--text-color)]">
                Return shipping is completely free for defective or incorrectly
                shipped items.
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-[var(--border-color)] p-6 sm:p-8 text-center shadow-sm">
              <RotateCcw
                size={32}
                className="text-[var(--primary-color)] mx-auto mb-3"
              />
              <h3 className="font-bold text-[var(--heading-color)] mb-2">
                Easy Exchanges
              </h3>
              <p className="text-sm text-[var(--text-color)]">
                Swap for a different size, color, or product — no extra hassle.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <p className="text-[var(--text-color)] mb-4">
              Have questions about a specific return?
            </p>
            <Link
              href="/help"
              className="inline-flex items-center gap-2 bg-[var(--primary-color)] hover:bg-[var(--primary-hover)] text-gray-900 font-semibold px-8 py-3.5 rounded-xl transition-colors shadow-md"
            >
              Visit Help Center
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
