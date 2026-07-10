"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

export default function FloatingWhatsApp() {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Lead");
    }

    window.open(
      "https://wa.me/6285189300718?text=Halo,%20saya%20tertarik%20dengan%20INDIBIZ",
      "_blank"
    );

    setOpen(false);
  };

  return (
    <>
      {/* ===== FLOATING BUTTON ===== */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 group"
        aria-label="Chat WhatsApp"
      >
        <div
          className="relative w-14 h-14 flex items-center justify-center rounded-full shadow-2xl transition-all duration-300 hover:scale-110"
          style={{
            backgroundColor: "#1D4ED8",
            boxShadow: "0 15px 35px rgba(29,78,216,0.4)",
          }}
        >
          {/* Subtle Pulse */}
          <span
            className="absolute inset-0 rounded-full opacity-30 animate-ping"
            style={{ backgroundColor: "#1D4ED8" }}
          />

          <MessageCircle className="w-7 h-7 relative z-10 text-white" />
        </div>
      </button>

      {/* ===== MODAL CONFIRMATION ===== */}
      {open && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center px-6">
          
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Modal Box */}
          <div
            className="relative w-full max-w-md rounded-3xl p-8 bg-white shadow-2xl"
            style={{
              border: "1px solid #E2E8F0",
            }}
          >
            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Lanjut ke WhatsApp?
            </h3>

            <p className="text-slate-600 mb-6 leading-relaxed">
              Anda akan diarahkan ke WhatsApp untuk konsultasi langsung dengan tim kami.
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => setOpen(false)}
                className="flex-1 py-3 rounded-xl font-semibold border border-slate-200 text-slate-600 hover:bg-slate-100 transition"
              >
                Batal
              </button>

              <button
                onClick={handleConfirm}
                className="flex-1 py-3 rounded-xl font-semibold text-white transition hover:opacity-90"
                style={{ backgroundColor: "#1D4ED8" }}
              >
                Ya, Lanjut
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}