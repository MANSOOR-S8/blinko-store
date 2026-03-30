"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import {
  FileText,
  Users,
  ShoppingBag,
  CreditCard,
  Truck,
  Scale,
  AlertCircle,
  Shield,
  ArrowRight,
} from "lucide-react";

/* ─── Terms sections ────────────────────────────────────────────────── */
interface TermsSection {
  icon: React.ReactNode;
  title: string;
  content: string[];
}

const termsSections: TermsSection[] = [
  {
    icon: <Users size={22} className="text-[var(--primary-color)]" />,
    title: "1. Account Terms",
    content: [
      "You must be at least 18 years old or have parental consent to create an account and use our services.",
      "You are responsible for maintaining the confidentiality of your account credentials. Any activity under your account is your responsibility.",
      "You must provide accurate and up-to-date information when creating an account. Providing false information may result in account suspension.",
      "We reserve the right to suspend or terminate accounts that violate these terms, engage in fraudulent activity, or have been inactive for more than 24 months.",
    ],
  },
  {
    icon: <ShoppingBag size={22} className="text-[var(--primary-color)]" />,
    title: "2. Products & Pricing",
    content: [
      "All product prices are listed in USD and are subject to change without prior notice. Prices are final at the time of purchase.",
      "We make every effort to display product images and descriptions accurately. However, actual products may vary slightly in color or appearance due to monitor settings.",
      "We reserve the right to limit quantities, refuse orders, or cancel orders at our discretion, including in cases of pricing errors or suspected fraud.",
      "Promotional offers and discount codes cannot be combined unless specifically stated and may have additional terms and conditions.",
    ],
  },
  {
    icon: <CreditCard size={22} className="text-[var(--primary-color)]" />,
    title: "3. Payment Terms",
    content: [
      "By placing an order, you agree to pay the total amount including product price, applicable taxes, and shipping fees.",
      "Payment must be completed at the time of purchase using one of our accepted payment methods (Visa, MasterCard, PayPal, Apple Pay).",
      "If a payment is declined, your order will not be processed. We may hold authorization on your payment method until the order is confirmed.",
      "All prices are exclusive of customs duties and import taxes for international orders, which are the buyer's responsibility.",
    ],
  },
  {
    icon: <Truck size={22} className="text-[var(--primary-color)]" />,
    title: "4. Shipping & Delivery",
    content: [
      "Estimated delivery times are provided for guidance and are not guaranteed. Delays may occur due to weather, customs, carrier issues, or other circumstances beyond our control.",
      "Risk of loss and title for items pass to you upon delivery to the carrier. We are not responsible for packages lost or damaged during transit after handoff to the shipping carrier.",
      "It is your responsibility to provide an accurate shipping address. We are not liable for orders shipped to incorrect addresses provided by the customer.",
      "For full shipping details, please refer to our Shipping Policy page.",
    ],
  },
  {
    icon: <Scale size={22} className="text-[var(--primary-color)]" />,
    title: "5. Intellectual Property",
    content: [
      "All content on this website — including logos, text, images, graphics, software, and design — is the property of Blinko or its content suppliers and is protected by intellectual property laws.",
      "You may not reproduce, distribute, modify, or create derivative works from any content on our website without prior written consent.",
      "User-generated content (reviews, comments) remains your property, but by posting on our site, you grant us a non-exclusive, royalty-free license to use, display, and distribute that content.",
    ],
  },
  {
    icon: <AlertCircle size={22} className="text-[var(--primary-color)]" />,
    title: "6. Limitation of Liability",
    content: [
      "To the fullest extent permitted by law, Blinko shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services.",
      "Our total liability for any claim arising from your use of our services shall not exceed the amount you paid for the specific product or service giving rise to the claim.",
      "We do not warrant that our website will be uninterrupted, error-free, or free of viruses. You use the site at your own risk.",
      "These limitations apply regardless of the legal theory on which the claim is based, whether in contract, tort, negligence, or otherwise.",
    ],
  },
  {
    icon: <Shield size={22} className="text-[var(--primary-color)]" />,
    title: "7. Dispute Resolution",
    content: [
      "These Terms shall be governed by and construed in accordance with the laws of Pakistan, without regard to conflict of law principles.",
      "Any disputes arising from these terms or your use of our services shall first be attempted to be resolved through good-faith negotiation.",
      "If negotiation fails, disputes shall be submitted to binding arbitration in Peshawar, Pakistan, under the rules of the Pakistan Arbitration Act.",
      "You agree to waive any right to a jury trial or to participate in a class action lawsuit against Blinko.",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[var(--section-bg)] min-h-screen">
        {/* ── Hero Banner ── */}
        <section className="bg-[var(--footer-bg)] text-white">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
            <div className="flex justify-center mb-4">
              <FileText size={48} className="text-[var(--primary-color)]" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
              Terms of Service
            </h1>
            <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
              Please read these terms carefully before using our services. By
              accessing or using Blinko, you agree to be bound by these terms.
            </p>
            <p className="text-gray-400 text-sm mt-4">
              Effective date: March 30, 2026
            </p>
          </div>
        </section>

        {/* ── Terms Content ── */}
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* Intro Card */}
          <div className="bg-white rounded-2xl border border-[var(--border-color)] p-6 sm:p-8 mb-10 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--heading-color)] mb-4">
              Agreement to Terms
            </h2>
            <p className="text-[var(--text-color)] leading-relaxed text-sm sm:text-base">
              By accessing and using the Blinko e-commerce platform, you
              acknowledge that you have read, understood, and agree to be
              bound by these Terms of Service and our{" "}
              <Link
                href="/privacy-policy"
                className="text-[var(--primary-color)] hover:underline font-medium"
              >
                Privacy Policy
              </Link>
              . If you do not agree with any part of these terms, you must not
              use our services.
            </p>
          </div>

          {/* Terms Sections */}
          <div className="space-y-8">
            {termsSections.map((section, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[var(--border-color)] overflow-hidden shadow-sm"
              >
                <div className="flex items-center gap-3 px-6 py-5 border-b border-[var(--border-color)] bg-gray-50/50">
                  {section.icon}
                  <h2 className="text-lg sm:text-xl font-bold text-[var(--heading-color)]">
                    {section.title}
                  </h2>
                </div>
                <div className="p-6">
                  <ul className="space-y-4">
                    {section.content.map((para, pIdx) => (
                      <li
                        key={pIdx}
                        className="flex items-start gap-3 text-sm sm:text-base text-[var(--text-color)] leading-relaxed"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary-color)] shrink-0 mt-2" />
                        {para}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Changes Notice + CTA */}
          <div className="mt-12 bg-white rounded-2xl border border-[var(--border-color)] p-6 sm:p-8 shadow-sm">
            <div className="flex items-start gap-4 mb-6">
              <AlertCircle
                size={24}
                className="text-[var(--primary-color)] shrink-0 mt-0.5"
              />
              <div>
                <h3 className="font-bold text-[var(--heading-color)] mb-1">
                  Changes to These Terms
                </h3>
                <p className="text-sm sm:text-base text-[var(--text-color)] leading-relaxed">
                  We reserve the right to modify these Terms of Service at any
                  time. Material changes will be communicated via email or a
                  prominent notice on our website. Continued use of our services
                  after changes constitutes acceptance of the updated terms.
                </p>
              </div>
            </div>
            <div className="text-center pt-4 border-t border-[var(--border-color)]">
              <p className="text-[var(--text-color)] mb-4 text-sm sm:text-base">
                Have questions about our terms?
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/help"
                  className="inline-flex items-center gap-2 bg-[var(--primary-color)] hover:bg-[var(--primary-hover)] text-gray-900 font-semibold px-8 py-3.5 rounded-xl transition-colors shadow-md"
                >
                  Visit Help Center
                  <ArrowRight size={18} />
                </Link>
                <Link
                  href="/privacy-policy"
                  className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-[var(--heading-color)] font-semibold px-8 py-3.5 rounded-xl transition-colors"
                >
                  View Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
