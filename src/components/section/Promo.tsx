"use client";
import Container from "@/components/ui/Container";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Promo() {
  return (
    <section
      className="relative py-20 md:py-24 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #1E3A8A 0%, #1D4ED8 100%)",
      }}
    >
      {/* Subtle Glow */}
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

      <Container>
        <div className="relative z-10 grid md:grid-cols-2 gap-14 items-center">

          {/* ===== LEFT (PROMO) ===== */}
          <div className="text-white">

            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Diskon <span className="text-amber-300">70%</span> 
              <br />
              Biaya Pasang Baru
            </h2>

            <p className="text-blue-100 text-lg leading-relaxed max-w-xl">
              Jangan lewatkan kesempatan ini. Nikmati internet bisnis premium 
              dengan harga spesial dan bayar paket bulanan di bulan berikutnya.
            </p>

            {/* Arrow Flow */}
            <div className="hidden md:flex items-center mt-12">
              <div className="h-[2px] w-24 bg-white/40"></div>
              <ArrowRight className="mx-4 text-white/60 w-6 h-6" />
              <span className="text-white/70 text-sm">
                Lanjutkan ke konsultasi
              </span>
            </div>

          </div>

          {/* ===== RIGHT (CTA PANEL) ===== */}
          <div
            className="rounded-3xl p-10"
            style={{
              backgroundColor: "rgba(255,255,255,0.95)",
              backdropFilter: "blur(10px)",
            }}
          >
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Siap Tingkatkan Performa Internet Bisnis Anda?
            </h3>

            <p className="text-slate-600 mb-8 leading-relaxed">
              Konsultasikan kebutuhan bisnis Anda sekarang dan dapatkan
              rekomendasi paket terbaik sesuai skala usaha Anda.
            </p>

            <Link
              href="https://wa.me/6285189300718?text=Halo,%20saya%20ingin%20klaim%20promo%2070%25%20INDIBIZ"
              target="_blank"
              onClick={() =>
                typeof window !== "undefined" &&
                (window as any).fbq?.("track", "Lead")
              }
            >
              <div
                className="group flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-semibold text-lg transition-all duration-300 cursor-pointer"
                style={{
                  backgroundColor: "#1D4ED8",
                  color: "#FFFFFF",
                }}
              >
                Konsultasi Sekarang
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </Link>

            <p className="text-xs text-slate-500 mt-4 text-center">
              Gratis konsultasi • Respon cepat
            </p>
          </div>

        </div>
      </Container>
    </section>
  );
}