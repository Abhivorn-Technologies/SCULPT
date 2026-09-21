"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Lock, Mail, ShieldAlert, Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError(res.error || "Invalid login credentials");
        setLoading(false);
      } else if (res?.ok) {
        router.push("/admin");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F6F2] text-[#151515] flex flex-col justify-center items-center px-4 relative overflow-hidden font-sans">
      {/* Background Soft Warm Glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#E6663A]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#F6B73C]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-white border border-[#EFE8E0] rounded-3xl shadow-xl p-8 z-10">
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="relative w-44 h-16 mb-4 flex items-center justify-center">
            <Image
              src="https://res.cloudinary.com/grm13j3k/image/upload/v1789990763/sculpt_aesthetics/assets/logo/logo.png"
              alt="SCULPT Aesthetics Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-[#151515] font-serif">
            SCULPT Admin Portal
          </h1>
          <p className="text-xs text-[#555555] mt-1">
            Sign in to manage appointments & website content
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-3 text-rose-700 text-xs">
            <ShieldAlert className="w-5 h-5 shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#151515] mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#555555]" />
              <input
                type="email"
                required
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                className="w-full bg-[#F8F6F2] border border-[#EFE8E0] rounded-xl pl-10 pr-4 py-3 text-sm text-[#151515] placeholder-[#888888] focus:outline-none focus:border-[#E6663A] focus:ring-1 focus:ring-[#E6663A] transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#151515] mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#555555]" />
              <input
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-[#F8F6F2] border border-[#EFE8E0] rounded-xl pl-10 pr-11 py-3 text-sm text-[#151515] placeholder-[#888888] focus:outline-none focus:border-[#E6663A] focus:ring-1 focus:ring-[#E6663A] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#777777] hover:text-[#E6663A] transition-colors p-1 cursor-pointer"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-[#E6663A] via-[#F28C28] to-[#F6B73C] hover:opacity-95 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md shadow-[#E6663A]/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              "Sign In to Dashboard"
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-[11px] text-[#888888]">
          Sculpt Aesthetics &bull; Authorized Admin Portal
        </div>
      </div>
    </div>
  );
}
