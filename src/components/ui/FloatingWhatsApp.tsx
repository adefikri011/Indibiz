"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  const handleClick = () => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Lead");
    }
  };

  return (
    <Link
      href="https://wa.me/6285189300718?text=Halo,%20saya%20tertarik%20dengan%20INDIBIZ"
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      aria-label="Chat WhatsApp"
      className="fixed bottom-6 right-6 z-50 group"
    >
      {/* Tombol Utama */}
      <div className="relative w-14 h-14 flex items-center justify-center rounded-full shadow-2xl cursor-pointer"
        style={{ backgroundColor: '#25D366' }}
      >
        {/* Efek Pulse */}
        <span
          className="absolute inset-0 rounded-full animate-pulse opacity-40"
          style={{ backgroundColor: '#25D366' }}
        />

        {/* Ikon WA */}
        <MessageCircle className="w-7 h-7 relative z-10 text-white fill-white" />
      </div>

      {/* Tooltip */}
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white text-gray-800 text-sm font-semibold px-3 py-1.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none hidden md:block">
        Chat Kami! 💬
      </span>
    </Link>
  );
}