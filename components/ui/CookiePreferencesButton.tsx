"use client";

import { Cookie } from "lucide-react";

export default function CookiePreferencesButton({
  className = "hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1",
}: {
  className?: string;
}) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("open-cookie-preferences"));
    }
  };

  return (
    <button type="button" onClick={handleClick} className={className}>
      <Cookie className="w-3.5 h-3.5 text-[#F6B73C]" />
      <span>Cookie Preferences</span>
    </button>
  );
}
