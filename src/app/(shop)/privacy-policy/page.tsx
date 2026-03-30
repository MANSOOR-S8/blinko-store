"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import {
  Shield,
  Eye,
  Lock,
  Database,
  Share2,
  Cookie,
  UserCheck,
  Globe,
  ArrowRight,
} from "lucide-react";

/* ─── Policy section data ───────────────────────────────────────────── */
interface PolicySection {
  icon: React.ReactNode;
  title: string;
  content: string[];
}

const policySections: PolicySection[] = [
  {
    icon: <Database size={22} className="text-[var(--primary-color)]" />,
    title: "Information We Collect",
    content: [
      "Personal Information: When you create an account or make a purchase, we collect your name, email address, shipping address, phone number, and payment information.",
      "Usage Data: We automatically collect information about how you interact with our website, including pages visited, products viewed, search queries, and browsing patterns.",
      "Device Information: We collect data about the device you use to access our site, including IP address, browser type, operating system, and device identifiers.",
      "Cookies & Tracking: We use cookies and similar technologies to enhance your browsing experience, remember your preferences, and analyze site traffic.",
    ],
  },
  {
    icon: <Eye size={22} className="text-[var(--primary-color)]" />,
    title: "How We Use Your Information",
    content: [
      "Order Processing: To process and fulfill your orders, send order confirmations, and provide shipping updates.",
      "Account Management: To create and manage your account, maintain your wishlist, and store your preferences.",
      "Communication: To send you promotional emails, newsletters, and special offers (you can opt out at any time).",
      "Improvement: To analyze usage patterns and improve our website, products, and customer service.",
      "Security: To detect and prevent fraud, unauthorized access, and other security threats.",
    ],
  },
  {
    icon: <Share2 size={22} className="text-[var(--primary-color)]" />,
    title: "Information Sharing & Disclosure",
    content: [
      "Service Providers: We share information with trusted third-party service providers who assist us in operating our website, processing payments, and delivering orders.",
      "Legal Requirements: We may disclose your information when required by law, in response to legal proceedings, or to protect our rights and safety.",
      "Business Transfers: In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the business transaction.",
      "We do NOT sell your personal information to third parties for their marketing purposes.",
    ],
  },
  {
    icon: <Lock size={22} className="text-[var(--primary-color)]" />,
    title: "Data Security",
    content: [
      "We implement industry-standard security measures including 256-bit SSL encryption, firewalls, and secure server infrastructure.",
      "Payment information is processed through PCI-DSS compliant payment processors. We never store your complete credit card details.",
      "Access to personal data is restricted to authorized employees who need it to perform their job functions.",
      "We regularly review and update our security practices to protect against unauthorized access, alteration, or destruction of data.",
    ],
  },
  {
    icon: <Cookie size={22} className="text-[var(--primary-color)]" />,
    title: "Cookies Policy",
    content: [
      "Essential Cookies: Required for the website to function properly (e.g., shopping cart, login sessions). These cannot be disabled.",
      "Analytics Cookies: Help us understand how visitors interact with our website so we can improve the user experience.",
      "Marketing Cookies: Used to deliver relevant advertisements and track the effectiveness of our marketing campaigns.",
      "You can manage your cookie preferences through your browser settings. Disabling certain cookies may affect website functionality.",
    ],
  },
  {
    icon: <UserCheck size={22} className="text-[var(--primary-color)]" />,
    title: "Your Rights & Choices",
    content: [
      "Access & Portability: You have the right to request a copy of the personal data we hold about you in a portable format.",
      "Correction: You can update or correct your personal information at any time through your account settings.",
      "Deletion: You can request the deletion of your personal data. We will comply unless we are legally required to retain it.",
      "Opt-Out: You can unsubscribe from marketing emails at any time by clicking the \"Unsubscribe\" link in our emails or updating your account preferences.",
      "Do Not Track: We respect Do Not Track (DNT) browser signals and do not track users who have enabled this feature.",
    ],
  },
  {
    icon: <Globe size={22} className="text-[var(--primary-color)]" />,
    title: "International Data Transfers",
    content: [
      "If you access our services from outside Pakistan, your data may be transferred to and processed in Pakistan or other countries where our servers are located.",
      "We ensure appropriate safeguards are in place for international data transfers in compliance with applicable data protection laws.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[var(--section-bg)] min-h-screen">
        {/* ── Hero Banner ── */}
        <section className="bg-[var(--footer-bg)] text-white">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
            <div className="flex justify-center mb-4">
              <Shield size={48} className="text-[var(--primary-color)]" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
              Privacy Policy
            </h1>
            <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
              Your privacy is important to us. This policy explains how we
              collect, use, and protect your personal information.
            </p>
            <p className="text-gray-400 text-sm mt-4">
              Last updated: March 30, 2026
            </p>
          </div>
        </section>

        {/* ── Policy Content ── */}
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* Overview Card */}
          <div className="bg-white rounded-2xl border border-[var(--border-color)] p-6 sm:p-8 mb-10 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--heading-color)] mb-4">
              Overview
            </h2>
            <p className="text-[var(--text-color)] leading-relaxed text-sm sm:text-base">
              At Blinko, we are committed to protecting your privacy. This
              Privacy Policy describes how we collect, use, share, and safeguard
              your personal information when you visit our website, create an
              account, or make a purchase. By using our services, you agree to
              the collection and use of information in accordance with this
              policy.
            </p>
          </div>

          {/* Policy Sections */}
          <div className="space-y-8">
            {policySections.map((section, idx) => (
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

          {/* Contact & CTA */}
          <div className="mt-12 bg-white rounded-2xl border border-[var(--border-color)] p-6 sm:p-8 shadow-sm text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--heading-color)] mb-3">
              Questions About Your Privacy?
            </h2>
            <p className="text-[var(--text-color)] mb-6 max-w-xl mx-auto text-sm sm:text-base">
              If you have any questions about this Privacy Policy or how we
              handle your data, please contact our Data Protection Officer.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:privacy@store.com"
                className="inline-flex items-center gap-2 bg-[var(--primary-color)] hover:bg-[var(--primary-hover)] text-gray-900 font-semibold px-8 py-3.5 rounded-xl transition-colors shadow-md"
              >
                Email Privacy Team
                <ArrowRight size={18} />
              </a>
              <Link
                href="/help"
                className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-[var(--heading-color)] font-semibold px-8 py-3.5 rounded-xl transition-colors"
              >
                Visit Help Center
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
