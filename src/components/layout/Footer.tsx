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

export default function Footer() {
  return (
    <footer className="bg-[#3d464d] text-[#d1d5db]">
      {/* Newsletter Section */}
      <div className="border-b border-slate-800/80 bg-[#3d464d]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-white mb-2">
              Subscribe to our Newsletter
            </h3>
            <p className="text-[#d1d5db]">
              Get the latest updates on new products and upcoming sales.
            </p>
          </div>
          <form className="flex w-full md:w-[400px] lg:w-[500px]">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full bg-[#fafafa] border border-slate-700 text-black px-4 py-3 rounded-l-lg focus:outline-none focus:border-[#e5a800] focus:ring-1 focus:ring-[#e5a800] transition-colors placeholder:text-slate-500"
              required
            />
            <button
              type="submit"
              className="bg-[#f8bd19] hover:bg-[#e5a800] text-black px-6 py-3 rounded-r-lg transition-colors font-medium flex items-center gap-2">
              <span className="hidden sm:inline">Subscribe</span>
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Info */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <span className="text-3xl font-extrabold text-white tracking-tight">
                Blinko<span className="text-[#f8bd19] ">.</span>
              </span>
            </Link>
            <p className="text-[#d1d5db] leading-relaxed pr-4">
              Your one-stop destination for premium quality products. We offer
              the best deals and top-notch customer service.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#f8bd19] text-black flex items-center justify-center hover:bg-blue-600 hover:text-white hover:-translate-y-1 transition-all duration-300">
                <FaFacebookF size={16} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#f8bd19] text-black flex items-center justify-center hover:bg-blue-400 hover:text-white hover:-translate-y-1 transition-all duration-300">
                <FaTwitter size={16} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#f8bd19] text-black flex items-center justify-center hover:bg-pink-600 hover:text-white hover:-translate-y-1 transition-all duration-300">
                <FaInstagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#f8bd19] text-black flex items-center justify-center hover:bg-red-600 hover:text-white hover:-translate-y-1 transition-all duration-300">
                <FaYoutube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-6">
              Quick Links
            </h4>
            <ul className="space-y-4">
              {[
                "Home",
                "Shop Catalog",
                "Categories",
                "Special Offers",
                "Our Blog",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-[#d1d5db] hover:text-white hover:translate-x-1 inline-block transition-transform duration-300">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-6">
              Customer Support
            </h4>
            <ul className="space-y-4">
              {[
                "Help Center & FAQ",
                "Track Your Order",
                "Shipping Rules",
                "Returns & Exchanges",
                "Contact Us",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-[#d1d5db] hover:text-white hover:translate-x-1 inline-block transition-transform duration-300">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-6">
              Contact Us
            </h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-4 text-[#d1d5db]">
                <MapPin className="text-[#f8bd19] shrink-0 mt-1" size={20} />
                <span>
                  123 Peshawar Pakistan,
                  <br />
                  Sadar, st 10001
                </span>
              </li>
              <li className="flex items-center gap-4 text-[#d1d5db]">
                <Phone className="text-[#f8bd19] shrink-0" size={20} />
                <span>+92 (314) 9697543</span>
              </li>
              <li className="flex items-center gap-4 text-[#d1d5db]">
                <Mail className="text-[#f8bd19] shrink-0" size={20} />
                <a
                  href="mailto:support@store.com"
                  className="hover:text-white transition-colors">
                  support@store.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-slate-800/50">
          <p className="text-[#d1d5db] text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Blinko All rights reserved.
          </p>
          <div className="flex items-center gap-3 text-[#d1d5db]">
            <FaCcVisa
              size={36}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            />
            <FaCcMastercard
              size={36}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            />
            <FaCcPaypal
              size={36}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            />
            <FaCcApplePay
              size={36}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
