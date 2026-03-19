"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, KeyRound } from "lucide-react";

export default function ForgotPasswordForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Forgot password submitted");
    setIsSubmitted(true);
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center">
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
          <KeyRound className="w-8 h-8 text-orange-600" />
        </div>
      </div>
      
      {!isSubmitted ? (
        <>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Forgot Password?</h2>
          <p className="text-gray-500 mb-8">
            No worries! Enter your email address below and we'll send you a link to reset your password.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold flex items-center justify-center py-3.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-orange-600/30 active:scale-[0.98]"
            >
              Send Reset Link
            </button>
          </form>
        </>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Check your mail</h2>
          <p className="text-gray-500 mb-8">
            We have sent a password reset link to your email. Please check your inbox and spam folder.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold flex items-center justify-center py-3.5 rounded-xl transition-all duration-300 mb-4"
          >
            Try another email
          </button>
        </>
      )}

      <div className="mt-8">
        <Link
          href="/login"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to log in
        </Link>
      </div>
    </div>
  );
}
