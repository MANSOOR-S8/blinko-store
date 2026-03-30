"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Search,
  ChevronDown,
  ChevronUp,
  Package,
  CreditCard,
  Truck,
  RotateCcw,
  ShieldCheck,
  UserCircle,
  HelpCircle,
  MessageCircle,
  Mail,
  Phone,
} from "lucide-react";

/* ─── FAQ Data ──────────────────────────────────────────────────────── */
interface FaqItem {
  question: string;
  answer: string;
}

interface FaqCategory {
  title: string;
  icon: React.ReactNode;
  items: FaqItem[];
}

const faqCategories: FaqCategory[] = [
  {
    title: "Orders & Shipping",
    icon: <Truck size={22} className="text-[var(--primary-color)]" />,
    items: [
      {
        question: "How do I track my order?",
        answer:
          "Once your order is shipped, you will receive an email with a tracking number. You can also track your order from your Dashboard under \"My Orders\". Simply click the tracking link to see real-time updates on your delivery status.",
      },
      {
        question: "How long does shipping take?",
        answer:
          "Standard shipping takes 5–7 business days. Express shipping delivers within 2–3 business days. International orders may take 10–15 business days depending on the destination country and customs processing.",
      },
      {
        question: "Do you ship internationally?",
        answer:
          "Yes! We ship to over 50 countries worldwide. International shipping rates and delivery times vary based on destination. You can see the exact shipping cost at checkout after entering your address.",
      },
      {
        question: "Can I change my shipping address after placing an order?",
        answer:
          "You can update your shipping address within 1 hour of placing your order by contacting our support team. After the order has been processed and shipped, address changes are no longer possible.",
      },
    ],
  },
  {
    title: "Payments & Billing",
    icon: <CreditCard size={22} className="text-[var(--primary-color)]" />,
    items: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept Visa, MasterCard, PayPal, Apple Pay, and bank transfers. All transactions are securely encrypted using SSL technology to protect your financial information.",
      },
      {
        question: "Is my payment information secure?",
        answer:
          "Absolutely. We use industry-standard 256-bit SSL encryption and are PCI-DSS compliant. We never store your full card details on our servers — all payment processing is handled by our certified payment partners.",
      },
      {
        question: "Can I pay in installments?",
        answer:
          "Yes, for orders over $100, we offer installment plans through our payment partners. You can split your payment into 3 or 6 interest-free installments at checkout.",
      },
    ],
  },
  {
    title: "Returns & Refunds",
    icon: <RotateCcw size={22} className="text-[var(--primary-color)]" />,
    items: [
      {
        question: "What is your return policy?",
        answer:
          "We offer a 30-day return policy for most items. Products must be unused, in their original packaging, and in the same condition you received them. Visit our Returns & Exchanges page for full details.",
      },
      {
        question: "How long does a refund take?",
        answer:
          "Once we receive your returned item, we will inspect it and notify you within 2 business days. Approved refunds are processed within 5–7 business days back to your original payment method.",
      },
      {
        question: "Do I have to pay for return shipping?",
        answer:
          "If the return is due to our error (wrong item, defective product), we cover the return shipping costs. For other returns, a flat return shipping fee of $5.99 will be deducted from your refund.",
      },
    ],
  },
  {
    title: "Products & Stock",
    icon: <Package size={22} className="text-[var(--primary-color)]" />,
    items: [
      {
        question: "What if an item is out of stock?",
        answer:
          "You can click the \"Notify Me\" button on any out-of-stock product page, and we'll email you as soon as it's back in stock. Most items are restocked within 1–2 weeks.",
      },
      {
        question: "Are your products authentic?",
        answer:
          "Yes. We source all products directly from manufacturers or authorized distributors. Every item comes with a certificate of authenticity and is backed by our quality guarantee.",
      },
    ],
  },
  {
    title: "Account & Security",
    icon: <UserCircle size={22} className="text-[var(--primary-color)]" />,
    items: [
      {
        question: "How do I reset my password?",
        answer:
          "Click \"Forgot Password\" on the login page and enter your email address. You'll receive a password reset link within a few minutes. If you don't see the email, check your spam folder.",
      },
      {
        question: "How do I delete my account?",
        answer:
          "To delete your account, go to Dashboard → Settings → Account, and click \"Delete Account\". Please note this action is permanent and cannot be undone. All your order history and saved information will be removed.",
      },
    ],
  },
  {
    title: "Warranty & Protection",
    icon: <ShieldCheck size={22} className="text-[var(--primary-color)]" />,
    items: [
      {
        question: "Do your products come with a warranty?",
        answer:
          "Most products include a manufacturer's warranty of 1–2 years. We also offer an extended protection plan you can add at checkout for additional coverage up to 3 years.",
      },
      {
        question: "How do I file a warranty claim?",
        answer:
          "Contact our support team with your order number and a description of the issue. We'll guide you through the warranty claim process, which typically takes 5–10 business days to resolve.",
      },
    ],
  },
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  /* Filter FAQs based on search */
  const filteredCategories = faqCategories
    .map((cat) => ({
      ...cat,
      items: cat.items.filter(
        (item) =>
          item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((cat) => cat.items.length > 0);

  return (
    <>
      <Navbar />
      <main className="bg-[var(--section-bg)] min-h-screen">
        {/* ── Hero Banner ── */}
        <section className="bg-[var(--footer-bg)] text-white">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
            <div className="flex justify-center mb-4">
              <HelpCircle size={48} className="text-[var(--primary-color)]" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
              Help Center & FAQ
            </h1>
            <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto mb-8">
              Find answers to commonly asked questions. Can&apos;t find what
              you&apos;re looking for? Reach out to our support team.
            </p>
            {/* Search Bar */}
            <div className="max-w-xl mx-auto relative">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                id="help-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for answers..."
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white text-gray-900 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] shadow-lg placeholder:text-gray-400"
              />
            </div>
          </div>
        </section>

        {/* ── FAQ Sections ── */}
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-20">
              <HelpCircle
                size={48}
                className="mx-auto text-gray-300 mb-4"
              />
              <h2 className="text-xl font-semibold text-[var(--heading-color)] mb-2">
                No results found
              </h2>
              <p className="text-[var(--text-color)]">
                Try different keywords or browse the categories below.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredCategories.map((category) => (
                <div
                  key={category.title}
                  className="bg-white rounded-2xl border border-[var(--border-color)] shadow-sm overflow-hidden"
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-3 px-6 py-5 border-b border-[var(--border-color)] bg-gray-50/50">
                    {category.icon}
                    <h2 className="text-lg sm:text-xl font-bold text-[var(--heading-color)]">
                      {category.title}
                    </h2>
                  </div>

                  {/* Questions */}
                  <div className="divide-y divide-[var(--border-color)]">
                    {category.items.map((item, idx) => {
                      const itemId = `${category.title}-${idx}`;
                      const isOpen = openIndex === itemId;
                      return (
                        <div key={idx}>
                          <button
                            id={`faq-${category.title.replace(/\s+/g, "-").toLowerCase()}-${idx}`}
                            onClick={() => toggleFaq(itemId)}
                            className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left hover:bg-gray-50 transition-colors cursor-pointer"
                          >
                            <span className="font-medium text-sm sm:text-base text-[var(--heading-color)]">
                              {item.question}
                            </span>
                            {isOpen ? (
                              <ChevronUp
                                size={18}
                                className="shrink-0 text-[var(--primary-color)]"
                              />
                            ) : (
                              <ChevronDown
                                size={18}
                                className="shrink-0 text-[var(--light-text)]"
                              />
                            )}
                          </button>
                          {isOpen && (
                            <div className="px-6 pb-5 text-sm sm:text-base text-[var(--text-color)] leading-relaxed animate-fadeIn">
                              {item.answer}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── Contact Support ── */}
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
          <div className="bg-white rounded-2xl border border-[var(--border-color)] shadow-sm p-8 sm:p-12">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--heading-color)] mb-2">
                Still need help?
              </h2>
              <p className="text-[var(--text-color)]">
                Our support team is here to assist you.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="flex flex-col items-center text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <MessageCircle
                  size={32}
                  className="text-[var(--primary-color)] mb-3"
                />
                <h3 className="font-semibold text-[var(--heading-color)] mb-1">
                  Live Chat
                </h3>
                <p className="text-sm text-[var(--text-color)]">
                  Chat with us 24/7
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <Mail
                  size={32}
                  className="text-[var(--primary-color)] mb-3"
                />
                <h3 className="font-semibold text-[var(--heading-color)] mb-1">
                  Email Us
                </h3>
                <p className="text-sm text-[var(--text-color)]">
                  support@store.com
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <Phone
                  size={32}
                  className="text-[var(--primary-color)] mb-3"
                />
                <h3 className="font-semibold text-[var(--heading-color)] mb-1">
                  Call Us
                </h3>
                <p className="text-sm text-[var(--text-color)]">
                  +92 (314) 9697543
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
