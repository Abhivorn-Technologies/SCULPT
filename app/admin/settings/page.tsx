"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import {
  UserCircle,
  Key,
  Mail,
  User,
  Lock,
  CheckCircle,
  AlertCircle,
  Save,
  Sparkles,
  ShieldCheck,
  Eye,
  EyeOff,
} from "lucide-react";

export default function AdminSettingsPage() {
  const { data: session, update } = useSession();

  const [name, setName] = useState(session?.user?.name || "Sculpt Admin");
  const [email, setEmail] = useState(session?.user?.email || "admin@sculptaesthetics.com");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleUpdateSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword && newPassword !== confirmPassword) {
      setError("New password and confirmation do not match.");
      return;
    }

    if (newPassword && newPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setSaving(true);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          newPassword,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSuccess("Settings & Password updated successfully in database! Your new credentials are active.");
        setNewPassword("");
        setConfirmPassword("");
        if (update) update({ name, email });
      } else {
        setError(data.error || "Failed to update settings.");
      }
    } catch (err) {
      setError("An error occurred while saving settings.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto font-sans pb-12">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#E6663A] text-xs font-bold uppercase tracking-widest mb-1">
            <Sparkles className="w-4 h-4" /> Account Management
          </div>
          <h1 className="text-2xl font-bold text-[#151515] tracking-tight font-serif">
            Admin Profile & Security
          </h1>
          <p className="text-[#555555] text-xs md:text-sm mt-0.5">
            Update your admin profile name, login email address, and account password
          </p>
        </div>
      </div>

      {/* Notifications */}
      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-3 shadow-xs">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
          <span className="font-semibold">{error}</span>
        </div>
      )}

      {success && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-3 shadow-xs">
          <CheckCircle className="w-5 h-5 shrink-0 text-emerald-600" />
          <span className="font-semibold">{success}</span>
        </div>
      )}

      {/* Main Settings Card */}
      <div className="bg-white border border-[#EFE8E0] rounded-3xl shadow-sm overflow-hidden">
        {/* Card Banner Header */}
        <div className="p-6 bg-gradient-to-r from-[#F8F6F2] via-white to-white border-b border-[#EFE8E0] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#E6663A]/10 border border-[#E6663A]/20 flex items-center justify-center text-[#E6663A]">
              <UserCircle className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#151515] font-serif">
                {session?.user?.name || "Sculpt Admin"}
              </h2>
              <p className="text-xs text-[#555555]">
                {session?.user?.email || "admin@sculptaesthetics.com"}
              </p>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> Authorized Admin
          </span>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleUpdateSettings} className="p-6 space-y-6">
          {/* Profile Section */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#E6663A] flex items-center gap-2">
              <User className="w-4 h-4" /> Admin Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#151515] mb-1.5">
                  Admin Name <span className="text-rose-600">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888]" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Sculpt Admin"
                    className="w-full bg-[#F8F6F2] border border-[#EFE8E0] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#151515] font-bold focus:outline-none focus:border-[#E6663A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#151515] mb-1.5">
                  Login Email Address <span className="text-rose-600">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888]" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@sculptaesthetics.com"
                    className="w-full bg-[#F8F6F2] border border-[#EFE8E0] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#151515] font-bold focus:outline-none focus:border-[#E6663A]"
                  />
                </div>
              </div>
            </div>
          </div>

          <hr className="border-[#EFE8E0]" />

          {/* Security & Password Section */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#E6663A] flex items-center gap-2">
              <Key className="w-4 h-4" /> Security & Password Update
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#151515] mb-1.5">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888]" />
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Leave blank to keep current"
                    className="w-full bg-[#F8F6F2] border border-[#EFE8E0] rounded-xl pl-10 pr-10 py-2.5 text-xs text-[#151515] focus:outline-none focus:border-[#E6663A]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#777777] hover:text-[#E6663A] transition-colors p-1 cursor-pointer"
                    title={showNewPassword ? "Hide password" : "Show password"}
                  >
                    {showNewPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#151515] mb-1.5">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888]" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-type new password"
                    className="w-full bg-[#F8F6F2] border border-[#EFE8E0] rounded-xl pl-10 pr-10 py-2.5 text-xs text-[#151515] focus:outline-none focus:border-[#E6663A]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#777777] hover:text-[#E6663A] transition-colors p-1 cursor-pointer"
                    title={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-[#EFE8E0] flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#E6663A] via-[#F28C28] to-[#F6B73C] text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-[#E6663A]/20 hover:opacity-95 transition-all cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? "Updating Credentials..." : "Save Settings"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
