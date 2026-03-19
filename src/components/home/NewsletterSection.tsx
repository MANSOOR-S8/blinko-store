import { Mail } from "lucide-react";

export default function NewsletterSection() {
  return (
    <section className="py-8 bg-white">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="relative rounded-3xl overflow-hidden bg-gray-900 border border-gray-800 shadow-2xl">
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 px-6 py-16 md:py-20 md:px-12 lg:px-24 flex flex-col items-center text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800 mb-6 border border-gray-700 shadow-inner">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Subscribe to our newsletter
            </h2>
            <p className="text-gray-400 max-w-2xl mb-10 text-lg">
              Get the latest updates on new products, exclusive offers, and
              upcoming sales delivered straight to your inbox.
            </p>

            <form
              className="w-full max-w-md flex flex-col sm:flex-row gap-3"
              onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                required
              />
              <button
                type="submit"
                className="bg-[var(--primary-color)] text-white shadow-md shadow-[#f8bd19]/30  font-semibold py-3.5 px-8 rounded-xl transition-colors duration-300  whitespace-nowrap">
                Subscribe
              </button>
            </form>
            <p className="text-gray-500 text-sm mt-4">
              We care about your data. Read our Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
