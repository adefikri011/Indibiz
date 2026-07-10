"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="py-20 md:py-24 bg-[#F8FAFC]">
      <div className="max-w-6xl mx-auto px-6">

        <div
          className="relative rounded-3xl p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-10"
          style={{
            background: "linear-gradient(135deg, #FFFFFF 0%, #F1F5F9 100%)",
            border: "1px solid #E2E8F0",
          }}
        >

          {/* LEFT TEXT */}
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
              Siap Tingkatkan Performa Internet Bisnis Anda?
              <br />
              <span className="text-blue-600">
                Tim Kami Siap Membantu.
              </span>
            </h2>

            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              Konsultasikan kebutuhan bisnis Anda sekarang dan dapatkan
              rekomendasi paket terbaik sesuai skala usaha Anda.
            </p>
          </div>

          {/* RIGHT CTA */}
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
                className="group flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 cursor-pointer"
                style={{
                  backgroundColor: "#1D4ED8",
                  color: "#FFFFFF",
                }}
              >
                Konsultasi Sekarang
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </Link>

            <span className="text-sm text-slate-500">
              Gratis konsultasi • Respon cepat
            </span>

          </div>

        </div>

      </div>
    </section>
  );
}