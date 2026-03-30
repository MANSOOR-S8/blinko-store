import Link from "next/link";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaCcApplePay,
} from "react-icons/fa";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const footerSections: FooterSection[] = [
  {
    title: "Shop",
    links: [
      { label: "Home", href: "/" },
      { label: "All Products", href: "/products" },
      { label: "Categories", href: "/categories" },
      { label: "Cart", href: "/cart" },
      { label: "Wishlist", href: "/wishlist" },
      { label: "Checkout", href: "/checkout" },
    ],
  },
  {
    title: "My Account",
    links: [
      { label: "Login", href: "/login" },
      { label: "Register", href: "/register" },
      { label: "Dashboard", href: "/dashboard" },
      { label: "My Orders", href: "/dashboard/orders" },
      { label: "My Profile", href: "/dashboard/profile" },
      { label: "Settings", href: "/dashboard/settings" },
    ],
  },
  {
    title: "Customer Support",
    links: [
      { label: "Help Center & FAQ", href: "/help" },
      { label: "Track Your Order", href: "/dashboard/orders" },
      { label: "Shipping Policy", href: "/help" },
      { label: "Returns & Exchanges", href: "/returns" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

const socialLinks = [
  { icon: FaFacebookF, href: "#", hoverClass: "hover:bg-blue-600", size: 16 },
  { icon: FaTwitter, href: "#", hoverClass: "hover:bg-blue-400", size: 16 },
  { icon: FaInstagram, href: "#", hoverClass: "hover:bg-pink-600", size: 18 },
  { icon: FaYoutube, href: "#", hoverClass: "hover:bg-red-600", size: 18 },
];

const paymentIcons = [FaCcVisa, FaCcMastercard, FaCcPaypal, FaCcApplePay];

export default function Footer() {
  return (
    <footer className="bg-[var(--footer-bg)] text-[var(--footer-text)]">
      {/* ── Newsletter ── */}
      <div className="border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
              Subscribe to our Newsletter
            </h3>
            <p className="text-sm sm:text-base text-[var(--footer-text)]">
              Get the latest updates on new products and upcoming sales.
            </p>
          </div>
          <form className="flex w-full md:w-auto md:min-w-[360px] lg:min-w-[460px]">
            <input
              id="footer-email-input"
              type="email"
              placeholder="Enter your email address"
              className="w-full bg-white/95 border border-white/20 text-gray-900 px-4 py-3 rounded-l-lg focus:outline-none focus:border-[var(--primary-color)] focus:ring-1 focus:ring-[var(--primary-color)] transition-colors placeholder:text-gray-400 text-sm sm:text-base"
              required
            />
            <button
              id="footer-subscribe-btn"
              type="submit"
              className="bg-[var(--primary-color)] hover:bg-[var(--primary-hover)] text-gray-900 px-5 sm:px-6 py-3 rounded-r-lg transition-colors font-semibold flex items-center gap-2 shrink-0 cursor-pointer">
              <span className="hidden sm:inline text-sm sm:text-base">
                Subscribe
              </span>
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>

      {/* ── Main Footer Grid ── */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Column — spans full width on mobile */}
          <div className="col-span-2 sm:col-span-2 md:col-span-3 lg:col-span-1 space-y-5">
            <Link href="/" className="inline-block">
              <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Blinko<span className="text-[var(--primary-color)]">.</span>
              </span>
            </Link>
            <p className="text-[var(--footer-text)] leading-relaxed text-sm sm:text-base max-w-md lg:max-w-none">
              Your one-stop destination for premium quality products. We offer
              the best deals and top-notch customer service.
            </p>
            <div className="flex items-center gap-3 pt-1">
              {socialLinks.map(({ icon: Icon, href, hoverClass, size }) => (
                <a
                  key={hoverClass}
                  href={href}
                  aria-label="Social media"
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[var(--primary-color)] text-gray-900 flex items-center justify-center ${hoverClass} hover:text-white hover:-translate-y-1 transition-all duration-300`}>
                  <Icon size={size} />
                </a>
              ))}
            </div>
          </div>

          {/* Dynamic Link Columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-white text-base sm:text-lg font-semibold mb-4 sm:mb-6">
                {section.title}
              </h4>
              <ul className="space-y-3 sm:space-y-4">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[var(--footer-text)] hover:text-white hover:translate-x-1 inline-block transition-all duration-300 text-sm sm:text-base">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Column */}
          <div className="col-span-2 sm:col-span-1">
            <h4 className="text-white text-base sm:text-lg font-semibold mb-4 sm:mb-6">
              Contact Us
            </h4>
            <ul className="space-y-4 sm:space-y-5">
              <li className="flex items-start gap-3 sm:gap-4">
                <MapPin
                  className="text-[var(--primary-color)] shrink-0 mt-0.5"
                  size={20}
                />
                <span className="text-sm sm:text-base">
                  123 Peshawar Pakistan,
                  <br />
                  Sadar, st 10001
                </span>
              </li>
              <li className="flex items-center gap-3 sm:gap-4">
                <Phone
                  className="text-[var(--primary-color)] shrink-0"
                  size={20}
                />
                <span className="text-sm sm:text-base">+92 (314) 9697543</span>
              </li>
              <li className="flex items-center gap-3 sm:gap-4">
                <Mail
                  className="text-[var(--primary-color)] shrink-0"
                  size={20}
                />
                <a
                  href="mailto:support@store.com"
                  className="hover:text-white transition-colors text-sm sm:text-base">
                  support@store.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[var(--footer-text)] text-xs sm:text-sm text-center sm:text-left">
            &copy; {new Date().getFullYear()} Blinko. All rights reserved.
          </p>
          <div className="flex items-center gap-2 sm:gap-3 text-[var(--footer-text)]">
            {paymentIcons.map((Icon, i) => (
              <Icon
                key={i}
                size={32}
                className="hover:text-white/80 transition-colors cursor-pointer sm:[font-size:36px]"
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
