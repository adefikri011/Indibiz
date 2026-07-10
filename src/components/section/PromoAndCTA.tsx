"use client";

import Container from "@/components/ui/Container";
import Link from "next/link";
import { Gift, ArrowRight } from "lucide-react";

export default function PromoAndCTA() {
  return (
    <section className="relative">
      {/* ================= PROMO SECTION ================= */}
      <div
        className="relative py-16 md:py-20 pb-28 md:pb-32 text-white overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #1E3A8A 0%, #1D4ED8 55%, #2563EB 100%)",
        }}
      >
        {/* Glow */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-60 h-60 bg-white/10 rounded-full blur-3xl" />

        <Container>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10 text-center md:text-left">
            {/* LEFT CONTENT */}
            <div className="max-w-2xl">
              <div
                data-animate="scale"
                className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-semibold mb-6 border border-white/20"
                style={{
                  ["--animate-delay" as never]: "40ms",
                }}
              >
                <Gift className="w-4 h-4" />
                Promo Terbatas
              </div>

              <h2
                data-animate="scale"
                className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight"
                style={{ ["--animate-delay" as never]: "100ms" }}
              >
                Diskon {" "}
                <span className="text-amber-300">70%</span> {" "}
                Biaya Pasang Baru!
              </h2>

              <p
                data-animate
                className="text-blue-100 text-lg md:text-xl leading-relaxed"
                style={{ ["--animate-delay" as never]: "180ms" }}
              >
                Jangan lewatkan kesempatan ini. Nikmati internet bisnis premium
                dengan harga spesial dan bayar paket bulanan di bulan berikutnya.
              </p>
            </div>

            {/* RIGHT BUTTON */}
            <div className="flex-shrink-0">
              <Link
                href="https://wa.me/6285189300718?text=Halo..."
                target="_blank"
                onClick={() =>
                  typeof window !== "undefined" &&
                  (window as any).fbq?.("track", "Lead")
                }
              >
                <div
                  data-animate="slide-left"
                  className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-xl transition-all duration-300 cursor-pointer hover:scale-[1.02]"
                  style={{
                    ["--animate-delay" as never]: "240ms",
                    backgroundColor: "rgba(255,255,255,0.95)",
                    color: "#1D4ED8",
                    boxShadow: "0 12px 30px rgba(0,0,0,0.18)",
                  }}
                >
                  Klaim Promo Sekarang
                  <ArrowRight className="w-5 h-5" />
                </div>
              </Link>
            </div>
          </div>
        </Container>

        {/* Smooth Wave Divider */}
        <svg
          className="absolute bottom-0 left-0 w-full text-[#EEF2FF]"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          style={{ height: "60px" }}
        >
          <path
            d="M0,32 C480,80 960,0 1440,48 L1440,80 L0,80 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* ================= CTA SECTION ================= */}
      <div className="pt-6 pb-20 md:pb-24 bg-[#EEF2FF]">
        <div className="max-w-6xl mx-auto px-6">
          <div
            data-animate="scale"
            className="relative -mt-16 md:-mt-20 rounded-3xl p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-10"
            style={{
              ["--animate-delay" as never]: "60ms",
              backgroundColor: "#FFFFFF",
              border: "1px solid #E2E8F0",
              boxShadow: "0 25px 60px rgba(15,23,42,0.08)",
            }}
          >
            {/* TEXT */}
            <div className="max-w-2xl">
              <h2
                data-animate="scale"
                className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight"
                style={{ ["--animate-delay" as never]: "120ms" }}
              >
                Siap Tingkatkan Performa Internet Bisnis Anda?
                <br />
                <span style={{ color: "#2563EB" }}>
                  Tim Kami Siap Membantu.
                </span>
              </h2>

              <p
                data-animate
                className="mt-4 text-lg text-slate-600 leading-relaxed"
                style={{ ["--animate-delay" as never]: "200ms" }}
              >
                Konsultasikan kebutuhan bisnis Anda sekarang dan dapatkan
                rekomendasi paket terbaik sesuai skala usaha Anda.
              </p>
            </div>

            {/* BUTTON */}
            <div className="flex flex-col items-start md:items-end gap-4">
              <Link
                href="https://wa.me/6285189300718?text=Halo,%20saya%20ingin%20konsultasi%20paket%20INDIBIZ"
                target="_blank"
                onClick={() =>
                  typeof window !== "undefined" &&
                  (window as any).fbq?.("track", "Lead")
                }
              >
                <div
                  data-animate="slide-left"
                  className="group flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 cursor-pointer hover:scale-[1.02]"
                  style={{
                    ["--animate-delay" as never]: "260ms",
                    backgroundColor: "#1D4ED8",
                    color: "#FFFFFF",
                    boxShadow: "0 12px 30px rgba(29,78,216,0.35)",
                  }}
                >
                  Konsultasi Sekarang
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Link>

              <span
                data-animate
                className="text-sm text-slate-500"
                style={{ ["--animate-delay" as never]: "320ms" }}
              >
                Gratis konsultasi • Respon cepat
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
