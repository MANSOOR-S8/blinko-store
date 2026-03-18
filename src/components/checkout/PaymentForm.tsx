"use client";

import { useState } from "react";
import { CreditCard, Lock } from "lucide-react";

interface PaymentFormProps {
  onBack: () => void;
  onSubmit: () => void;
}

export default function PaymentForm({ onBack, onSubmit }: PaymentFormProps) {
  const [formData, setFormData] = useState({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      onSubmit();
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mt-8">
      <div className="flex items-center gap-2 mb-6">
        <Lock size={18} className="text-green-600" />
        <span className="text-sm font-medium text-gray-600">Secure 256-bit SSL encrypted payment processing</span>
      </div>

      <div className="border border-gray-200 rounded-2xl p-6 bg-gray-50/30">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Name on Card</label>
            <input required type="text" name="cardName" value={formData.cardName} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-white transition-all" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Card Number</label>
            <div className="relative">
              <input required type="text" name="cardNumber" value={formData.cardNumber} onChange={handleChange} maxLength={19} placeholder="0000 0000 0000 0000" className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-white transition-all tracking-widest" />
              <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Expiration Date</label>
              <input required type="text" name="expiryDate" value={formData.expiryDate} onChange={handleChange} placeholder="MM/YY" maxLength={5} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-white transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">CVV</label>
              <input required type="text" name="cvv" value={formData.cvv} onChange={handleChange} placeholder="123" maxLength={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-white transition-all" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
        <button type="button" onClick={onBack} className="px-6 py-3 font-medium text-gray-600 hover:text-gray-900 transition-colors">
          Back to Shipping
        </button>
        <button 
          type="submit" 
          disabled={isProcessing}
          className="bg-gray-900 text-white px-8 py-3 rounded-xl font-medium hover:bg-black transition-all shadow-md flex items-center gap-2 disabled:bg-gray-400"
        >
          {isProcessing ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            "Complete Order"
          )}
        </button>
      </div>
    </form>
  );
}
