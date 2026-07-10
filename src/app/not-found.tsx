"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center justify-center gap-16">

        {/* LEFT CONTENT */}
        <div className="flex-1 text-center lg:text-left space-y-6">

          <h1 className="text-6xl md:text-7xl font-bold text-slate-900">
            404
          </h1>

          <h2 className="text-2xl md:text-3xl font-semibold text-slate-800">
            Halaman Tidak Ditemukan
          </h2>

          <p className="text-slate-600 max-w-md mx-auto lg:mx-0 leading-relaxed">
            Halaman yang Anda cari mungkin telah dipindahkan,
            dihapus, atau tidak tersedia. Silakan kembali
            ke halaman utama.
          </p>

          <Link href="/">
            <div
              className="inline-flex items-center justify-center px-7 py-3 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-[1.03]"
              style={{
                backgroundColor: "#2F5FD0",
                boxShadow: "0 15px 35px rgba(47,95,208,0.35)",
              }}
            >
              Kembali ke Beranda
            </div>
          </Link>

        </div>

        {/* RIGHT SVG */}
        <div className="flex-1 flex justify-center">

          <div className="w-full max-w-[420px]">
            <object
              type="image/svg+xml"
              data="/illustrations/404-illustration.svg"
              className="w-full h-auto"
            />
          </div>

        </div>

      </div>
    </div>
  );
}