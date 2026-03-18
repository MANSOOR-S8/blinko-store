"use client";

import { useState } from "react";
import { Camera, Mail, Phone, MapPin, User, Save } from "lucide-react";

export default function ProfileForm() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1000); // Mock save
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-fadeIn delay-200">
      {/* Avatar Section */}
      <div className="flex flex-col sm:flex-row items-center gap-6 pb-8 border-b border-[var(--border-color)]">
        <div className="relative group cursor-pointer">
          <div className="w-24 h-24 rounded-full bg-gray-200 border-4 border-white shadow-md overflow-hidden flex items-center justify-center">
            <span className="text-3xl font-bold text-gray-400">AB</span>
          </div>
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <Camera className="text-white" size={24} />
          </div>
        </div>
        <div className="text-center sm:text-left">
          <h3 className="text-xl font-bold text-[var(--heading-color)]">Mansoor Shah</h3>
          <p className="text-[var(--light-text)] text-sm">Update your photo and personal details here.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--heading-color)] flex items-center gap-2">
            <User size={16} className="text-[var(--light-text)]" /> Full Name
          </label>
          <input
            type="text"
            defaultValue="Mansoor Shah"
            className="w-full px-4 py-3 rounded-xl border border-[var(--border-color)] bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]/50 focus:border-[var(--primary-color)] transition-all"
          />
        </div>

        {/* Email Address */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--heading-color)] flex items-center gap-2">
            <Mail size={16} className="text-[var(--light-text)]" /> Email Address
          </label>
          <input
            type="email"
            defaultValue="blinko.becker@example.com"
            className="w-full px-4 py-3 rounded-xl border border-[var(--border-color)] bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]/50 focus:border-[var(--primary-color)] transition-all"
          />
        </div>

        {/* Phone Number */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--heading-color)] flex items-center gap-2">
            <Phone size={16} className="text-[var(--light-text)]" /> Phone Number
          </label>
          <input
            type="tel"
            defaultValue="+92 (314) 9697543"
            className="w-full px-4 py-3 rounded-xl border border-[var(--border-color)] bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]/50 focus:border-[var(--primary-color)] transition-all"
          />
        </div>

        {/* Location */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--heading-color)] flex items-center gap-2">
            <MapPin size={16} className="text-[var(--light-text)]" /> Location
          </label>
          <input
            type="text"
            defaultValue="Peshawar , PK"
            className="w-full px-4 py-3 rounded-xl border border-[var(--border-color)] bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]/50 focus:border-[var(--primary-color)] transition-all"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-[var(--border-color)]">
        <button
          type="button"
          className="px-6 py-2.5 rounded-xl font-medium text-[var(--text-color)] border border-[var(--border-color)] hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSaving}
          className="px-6 py-2.5 rounded-xl font-medium text-white bg-[var(--primary-color)] hover:bg-[var(--primary-hover)] shadow-md shadow-[#f8bd19]/20 transition-all flex items-center justify-center min-w-[120px]"
        >
          {isSaving ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Save size={18} className="mr-2" /> Save Changes
            </>
          )}
        </button>
      </div>
    </form>
  );
}
