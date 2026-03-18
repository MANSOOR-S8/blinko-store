"use client";

import SettingsForm from "@/components/dashboard/SettingsForm";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl space-y-6 animate-fadeIn">
      {/* Header Section */}
      <div>
        <h2 className="text-3xl font-bold text-[var(--heading-color)]">Account Settings</h2>
        <p className="text-[var(--light-text)] mt-1">Manage your notifications, security, and preferences.</p>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-2xl shadow-sm border border-[var(--border-color)] p-6 sm:p-8">
        <SettingsForm />
      </div>
    </div>
  );
}
