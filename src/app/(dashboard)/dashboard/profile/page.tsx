"use client";

import ProfileForm from "@/components/dashboard/ProfileForm";

export default function ProfilePage() {
  return (
    <div className="max-w-4xl space-y-6 animate-fadeIn">
      {/* Header Section */}
      <div>
        <h2 className="text-3xl font-bold text-[var(--heading-color)]">My Profile</h2>
        <p className="text-[var(--light-text)] mt-1">Manage your personal information and preferences.</p>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-2xl shadow-sm border border-[var(--border-color)] p-6 sm:p-8">
        <ProfileForm />
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50 rounded-2xl border border-red-100 p-6 sm:p-8 mt-8">
        <h3 className="text-lg font-semibold text-red-800 mb-2">Danger Zone</h3>
        <p className="text-red-600/80 text-sm mb-4">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <button className="px-5 py-2.5 bg-white border border-red-200 text-red-600 rounded-xl font-medium hover:bg-red-600 hover:text-white transition-colors">
          Delete Account
        </button>
      </div>
    </div>
  );
}
