"use client";

import { useState } from "react";
import { Bell, Lock, Globe, Moon, Shield, Save } from "lucide-react";

export default function SettingsForm() {
  const [isSaving, setIsSaving] = useState(false);
  const [options, setOptions] = useState({
    emailNotifications: true,
    smsNotifications: false,
    darkMode: false,
    twoFactorAuth: true,
    publicProfile: false,
  });

  const handleToggle = (key: keyof typeof options) => {
    setOptions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 800);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-fadeIn delay-200">
      
      {/* Notifications Section */}
      <div className="space-y-4 pb-6 border-b border-[var(--border-color)]">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-yellow-50 rounded-lg text-[var(--primary-color)]">
            <Bell size={20} />
          </div>
          <h3 className="text-lg font-bold text-[var(--heading-color)]">Notifications</h3>
        </div>
        
        <div className="flex items-center justify-between p-4 rounded-xl border border-[var(--border-color)] bg-gray-50/50">
          <div>
            <h4 className="font-medium text-[var(--heading-color)]">Email Alerts</h4>
            <p className="text-sm text-[var(--light-text)]">Receive order updates and promotions via email.</p>
          </div>
          <button 
            type="button" 
            onClick={() => handleToggle("emailNotifications")}
            className={`w-12 h-6 rounded-full transition-colors relative ${options.emailNotifications ? "bg-[var(--primary-color)]" : "bg-gray-300"}`}
          >
            <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${options.emailNotifications ? "translate-x-7" : "translate-x-1"}`} />
          </button>
        </div>

        <div className="flex items-center justify-between p-4 rounded-xl border border-[var(--border-color)] bg-gray-50/50">
          <div>
            <h4 className="font-medium text-[var(--heading-color)]">SMS Notifications</h4>
            <p className="text-sm text-[var(--light-text)]">Receive tracking updates on your phone.</p>
          </div>
          <button 
            type="button" 
            onClick={() => handleToggle("smsNotifications")}
            className={`w-12 h-6 rounded-full transition-colors relative ${options.smsNotifications ? "bg-[var(--primary-color)]" : "bg-gray-300"}`}
          >
            <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${options.smsNotifications ? "translate-x-7" : "translate-x-1"}`} />
          </button>
        </div>
      </div>

      {/* Security Section */}
      <div className="space-y-4 pb-6 border-b border-[var(--border-color)]">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-yellow-50 rounded-lg text-[var(--primary-color)]">
            <Shield size={20} />
          </div>
          <h3 className="text-lg font-bold text-[var(--heading-color)]">Security & Privacy</h3>
        </div>

        <div className="flex items-center justify-between p-4 rounded-xl border border-[var(--border-color)] bg-gray-50/50">
          <div>
            <h4 className="font-medium text-[var(--heading-color)]">Two-Factor Authentication</h4>
            <p className="text-sm text-[var(--light-text)]">Add an extra layer of security to your account.</p>
          </div>
          <button 
            type="button" 
            onClick={() => handleToggle("twoFactorAuth")}
            className={`w-12 h-6 rounded-full transition-colors relative ${options.twoFactorAuth ? "bg-[var(--primary-color)]" : "bg-gray-300"}`}
          >
            <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${options.twoFactorAuth ? "translate-x-7" : "translate-x-1"}`} />
          </button>
        </div>

        <div className="flex items-center justify-between p-4 rounded-xl border border-[var(--border-color)] bg-gray-50/50">
          <div>
            <h4 className="font-medium text-[var(--heading-color)]">Public Profile</h4>
            <p className="text-sm text-[var(--light-text)]">Allow others to view your profile and wishlist.</p>
          </div>
          <button 
            type="button" 
            onClick={() => handleToggle("publicProfile")}
            className={`w-12 h-6 rounded-full transition-colors relative ${options.publicProfile ? "bg-[var(--primary-color)]" : "bg-gray-300"}`}
          >
            <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${options.publicProfile ? "translate-x-7" : "translate-x-1"}`} />
          </button>
        </div>
      </div>

      {/* Preferences Section */}
      <div className="space-y-4 pb-6 border-b border-[var(--border-color)]">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-yellow-50 rounded-lg text-[var(--primary-color)]">
            <Globe size={20} />
          </div>
          <h3 className="text-lg font-bold text-[var(--heading-color)]">Preferences</h3>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex-1 space-y-2">
            <label className="text-sm font-medium text-[var(--heading-color)]">Language</label>
            <select className="w-full px-4 py-3 rounded-xl border border-[var(--border-color)] bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]/50 focus:border-[var(--primary-color)] appearance-none cursor-pointer">
              <option value="en">English (US)</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
            </select>
          </div>
          <div className="flex-1 space-y-2">
            <label className="text-sm font-medium text-[var(--heading-color)]">Currency</label>
            <select className="w-full px-4 py-3 rounded-xl border border-[var(--border-color)] bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]/50 focus:border-[var(--primary-color)] appearance-none cursor-pointer">
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={isSaving}
          className="px-6 py-2.5 rounded-xl font-medium text-white bg-[var(--primary-color)] hover:bg-[var(--primary-hover)] shadow-md shadow-[#f8bd19]/20 transition-all flex items-center justify-center min-w-[150px]"
        >
          {isSaving ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Save size={18} className="mr-2" /> Save Preferences
            </>
          )}
        </button>
      </div>

    </form>
  );
}
