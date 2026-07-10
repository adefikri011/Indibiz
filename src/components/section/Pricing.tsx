"use client";

import { useRef } from "react";
import Container from "@/components/ui/Container";
import WALink from "@/components/ui/WALink";
import { Check, Star, Zap, ChevronLeft, ChevronRight } from "lucide-react";

const plans = [
  {
    speed: "50",
    normalPrice: "405.000",
    price: "355.000",
    popular: false,
  },
  {
    speed: "75",
    normalPrice: "472.000",
    price: "415.000",
    popular: false,
  },
  {
    speed: "100",
    normalPrice: "605.000",
    price: "535.000",
    popular: true,
  },
  {
    speed: "150",
    normalPrice: "795.000",
    price: "620.000",
    popular: false,
  },
  {
    speed: "200",
    normalPrice: "995.000",
    price: "790.000",
    popular: false,
  },
  {
    speed: "300",
    normalPrice: "1.320.000",
    price: "1.130.000",
    popular: false,
  },
];

const features = [
  "Kuota Unlimited Tanpa FUP",
  "Rasio UL:DL 1:1 Simetris",
  "100% Fiber Optik",
  "ONT/Modem Premium",
  "Tagihan Flat Setiap Bulan",
  "Service 3 ON 3",
];

export default function Pricing() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  return (
    <section id="pricing" className="py-16 md:py-24 bg-white">
      <Container>
        {/* ===== JUDUL ===== */}
        <div className="mb-14 max-w-3xl mx-auto text-center">

          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: "#0F172A" }}
          >
            Pilih <span style={{ color: "#1D4ED8" }}>Paket</span> Sesuai
            Kebutuhan
          </h2>

          <p className="text-lg" style={{ color: "#64748B" }}>
            Harga terjangkau, kualitas enterprise. Semua paket sudah termasuk
            unlimited tanpa FUP dan tagihan flat setiap bulan.
          </p>
        </div>

        {/* ===== CAROUSEL WRAPPER ===== */}
        <div className="relative">

          {/* Tombol Panah Kiri */}
          <button
            onClick={scrollLeft}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 hidden md:flex"
            style={{ backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0" }}
            aria-label="Scroll kiri"
          >
            <ChevronLeft className="w-5 h-5" style={{ color: "#1D4ED8" }} />
          </button>

          {/* Tombol Panah Kanan */}
          <button
            onClick={scrollRight}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 hidden md:flex"
            style={{ backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0" }}
            aria-label="Scroll kanan"
          >
            <ChevronRight className="w-5 h-5" style={{ color: "#1D4ED8" }} />
          </button>

          {/* Fade Kiri */}
          <div
            className="absolute left-0 top-0 bottom-6 w-8 z-10 pointer-events-none hidden md:block"
            style={{
              background: "linear-gradient(to right, #F8FAFC, transparent)",
            }}
          />

          {/* Fade Kanan */}
          <div
            className="absolute right-0 top-0 bottom-6 w-8 z-10 pointer-events-none hidden md:block"
            style={{
              background: "linear-gradient(to left, #F8FAFC, transparent)",
            }}
          />

          {/* ===== SCROLL AREA ===== */}
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto pb-8 pt-6 px-2"
            style={{
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {plans.map((plan) => (
              <div
                key={plan.speed}
                className="relative flex flex-col flex-shrink-0 rounded-2xl p-6 transition-all duration-300"
                style={{
                  width: "270px",
                  scrollSnapAlign: "start",
                  backgroundColor: plan.popular ? "#1D4ED8" : "#FFFFFF",
                  border: plan.popular
                    ? "2px solid #1D4ED8"
                    : "1px solid #E2E8F0",
                  boxShadow: plan.popular
                    ? "0 20px 40px rgba(29, 78, 216, 0.25)"
                    : "0 2px 12px rgba(0,0,0,0.06)",
                  marginTop: plan.popular ? "0" : "8px",
                }}
              >
                {/* Badge Terpopuler */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span
                      className="inline-flex items-center gap-1 text-sm font-bold px-4 py-1.5 rounded-full shadow-md whitespace-nowrap"
                      style={{
                        backgroundColor: "#FCD34D",
                        color: "#78350F",
                      }}
                    >
                      <Star className="w-4 h-4 fill-current" />
                      TERPOPULER
                    </span>
                  </div>
                )}

                {/* Badge Mulai Dari */}
                <div className="mb-3 mt-2">
                  <span
                    className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: plan.popular
                        ? "rgba(255,255,255,0.15)"
                        : "#DCFCE7",
                      color: plan.popular ? "#FFFFFF" : "#15803D",
                    }}
                  >
                    <Check className="w-3 h-3" />
                    Mulai Dari
                  </span>
                </div>

                {/* Kecepatan */}
                <div className="flex items-end gap-1 mb-1">
                  <span
                    className="text-5xl font-extrabold leading-none"
                    style={{ color: plan.popular ? "#FFFFFF" : "#0F172A" }}
                  >
                    {plan.speed}
                  </span>
                  <span
                    className="text-lg font-bold mb-1"
                    style={{ color: plan.popular ? "#BFDBFE" : "#64748B" }}
                  >
                    Mbps
                  </span>
                </div>

                {/* Harga Coret */}
                <p
                  className="text-sm line-through mb-1"
                  style={{ color: plan.popular ? "#BFDBFE" : "#94A3B8" }}
                >
                  Rp {plan.normalPrice}
                </p>

                {/* Harga Promo */}
                <div className="flex items-baseline gap-1 mb-5">
                  <span
                    className="text-sm font-semibold"
                    style={{ color: plan.popular ? "#BFDBFE" : "#64748B" }}
                  >
                    Rp
                  </span>
                  <span
                    className="text-2xl font-extrabold"
                    style={{ color: plan.popular ? "#FFFFFF" : "#1D4ED8" }}
                  >
                    {plan.price}
                  </span>
                  <span
                    className="text-sm"
                    style={{ color: plan.popular ? "#BFDBFE" : "#64748B" }}
                  >
                    /bulan
                  </span>
                </div>

                {/* Divider */}
                <div
                  className="h-px w-full mb-4"
                  style={{
                    backgroundColor: plan.popular
                      ? "rgba(255,255,255,0.2)"
                      : "#F1F5F9",
                  }}
                />

                {/* Fitur */}
                <ul className="space-y-2 mb-6 flex-1">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{
                          backgroundColor: plan.popular
                            ? "rgba(255,255,255,0.2)"
                            : "#EFF6FF",
                        }}
                      >
                        <Check
                          className="w-2.5 h-2.5"
                          style={{
                            color: plan.popular ? "#FFFFFF" : "#1D4ED8",
                          }}
                        />
                      </div>
                      <span
                        className="text-sm"
                        style={{
                          color: plan.popular ? "#BFDBFE" : "#475569",
                        }}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Tombol CTA */}
                <WALink
                  href={`https://wa.me/6285189300718?text=Halo%20Deska,%20saya%20tertarik%20paket%20INDIBIZ%20${plan.speed}%20Mbps%20seharga%20Rp%20${plan.price}/bulan`}
                >
                  <div
                    className="w-full py-2.5 rounded-xl font-semibold text-center text-sm cursor-pointer hover:opacity-90 transition-opacity"
                    style={{
                      backgroundColor: plan.popular ? "#FFFFFF" : "#1D4ED8",
                      color: plan.popular ? "#1D4ED8" : "#FFFFFF",
                    }}
                  >
                    Pilih Paket {plan.speed} Mbps
                  </div>
                </WALink>
              </div>
            ))}
          </div>

          {/* Hint Mobile */}
          <div className="flex justify-center mt-1 md:hidden">
            <p className="text-xs" style={{ color: "#94A3B8" }}>
              ← Geser untuk lihat paket lainnya →
            </p>
          </div>
        </div>

        {/* ===== INFO PROMO ===== */}
        <div className="mt-10 text-center">
          <div
            className="inline-block px-6 py-3 rounded-2xl"
            style={{ backgroundColor: "#EFF6FF" }}
          >
            <p className="text-sm font-medium" style={{ color: "#64748B" }}>
              ✨ Diskon{" "}
              <span className="font-bold" style={{ color: "#1D4ED8" }}>
                70%
              </span>{" "}
              biaya pasang baru — Bayar bulan pertama di bulan berikutnya
            </p>
            <p className="text-xs mt-1" style={{ color: "#94A3B8" }}>
              Hubungi Deska: 0851 8930 0718
            </p>
          </div>
        </div>

      </Container>
    </section>
  );
}