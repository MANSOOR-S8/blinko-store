"use client";

import { useState } from "react";
import { Truck } from "lucide-react";

interface ShippingFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
}

export default function ShippingForm({ initialData, onSubmit }: ShippingFormProps) {
  const [formData, setFormData] = useState({
    firstName: initialData?.firstName || "",
    lastName: initialData?.lastName || "",
    email: initialData?.email || "",
    address: initialData?.address || "",
    city: initialData?.city || "",
    zipCode: initialData?.zipCode || "",
    shippingMethod: initialData?.shippingMethod || "standard",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">First Name</label>
          <input required type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] transition-all bg-gray-50/50" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Last Name</label>
          <input required type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] transition-all bg-gray-50/50" />
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Email Address</label>
        <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] transition-all bg-gray-50/50" />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Full Address</label>
        <input required type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Apartment, studio, or floor" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] transition-all bg-gray-50/50" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">City</label>
          <input required type="text" name="city" value={formData.city} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] transition-all bg-gray-50/50" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Zip Code</label>
          <input required type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] transition-all bg-gray-50/50" />
        </div>
      </div>

      <div className="pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Truck size={20} className="text-[var(--primary-color)]" /> Shipping Method
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className={`border rounded-xl p-4 cursor-pointer transition-all ${formData.shippingMethod === 'standard' ? 'border-[var(--primary-color)] bg-yellow-50' : 'border-gray-200 hover:border-gray-300'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <input type="radio" name="shippingMethod" value="standard" checked={formData.shippingMethod === 'standard'} onChange={handleChange} className="w-4 h-4 text-[var(--primary-color)] focus:ring-[var(--primary-color)]" />
                <span className="font-medium text-gray-900">Standard Delivery</span>
              </div>
              <span className="font-semibold text-gray-900">Free</span>
            </div>
            <p className="text-sm text-gray-500 mt-1 pl-7">Est. 3-5 business days</p>
          </label>
          
          <label className={`border rounded-xl p-4 cursor-pointer transition-all ${formData.shippingMethod === 'express' ? 'border-[var(--primary-color)] bg-yellow-50' : 'border-gray-200 hover:border-gray-300'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <input type="radio" name="shippingMethod" value="express" checked={formData.shippingMethod === 'express'} onChange={handleChange} className="w-4 h-4 text-[var(--primary-color)] focus:ring-[var(--primary-color)]" />
                <span className="font-medium text-gray-900">Express Delivery</span>
              </div>
              <span className="font-semibold text-gray-900">$15.00</span>
            </div>
            <p className="text-sm text-gray-500 mt-1 pl-7">Est. 1-2 business days</p>
          </label>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button type="submit" className="bg-[var(--primary-color)] text-white px-8 py-3 rounded-xl font-medium hover:bg-[var(--primary-hover)] transition-colors shadow-md shadow-[#f8bd19]/20">
          Continue to Payment
        </button>
      </div>
    </form>
  );
}
