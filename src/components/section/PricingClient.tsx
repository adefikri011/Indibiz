"use client";

import { useRef } from "react";
import Container from "@/components/ui/Container";
import WALink from "@/components/ui/WALink";
import { Check, Star, ChevronLeft, ChevronRight } from "lucide-react";

type Feature = {
  id: string;
  name: string;
};

type Plan = {
  id: string;
  speed: number;
  normalPrice: number;
  price: number;
  isPopular: boolean;
  order: number;
  features: Feature[];
};

type Props = {
  plans: Plan[];
};

export default function PricingClient({ plans }: Props) {
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
        <div className="mb-14 max-w-3xl mx-auto text-center">
          <h2
            data-animate="scale"
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{
              ["--animate-delay" as never]: "40ms",
              color: "#0F172A",
            }}
          >
            Pilih <span style={{ color: "#2F5FD0" }}>Paket</span> Sesuai
            Kebutuhan
          </h2>

          <p
            data-animate
            className="text-lg"
            style={{
              ["--animate-delay" as never]: "120ms",
              color: "#64748B",
            }}
          >
            Harga terjangkau, kualitas enterprise. Semua paket sudah termasuk
            unlimited tanpa FUP dan tagihan flat setiap bulan.
          </p>
        </div>

        <div className="relative">
          <button
            onClick={scrollLeft}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 hidden md:flex"
            style={{ backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0" }}
            aria-label="Scroll kiri"
          >
            <ChevronLeft className="w-5 h-5" style={{ color: "#2F5FD0" }} />
          </button>

          <button
            onClick={scrollRight}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 hidden md:flex"
            style={{ backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0" }}
            aria-label="Scroll kanan"
          >
            <ChevronRight className="w-5 h-5" style={{ color: "#2F5FD0" }} />
          </button>

          <div
            className="absolute left-0 top-0 bottom-6 w-8 z-10 pointer-events-none hidden md:block"
            style={{
              background: "linear-gradient(to right, #F8FAFC, transparent)",
            }}
          />

          <div
            className="absolute right-0 top-0 bottom-6 w-8 z-10 pointer-events-none hidden md:block"
            style={{
              background: "linear-gradient(to left, #F8FAFC, transparent)",
            }}
          />

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
            {plans.map((plan) => {
              const finalPrice =
                !plan.price || plan.price <= 0 ? plan.normalPrice : plan.price;

              const hasDiscount =
                plan.normalPrice > 0 &&
                finalPrice > 0 &&
                plan.normalPrice !== finalPrice;

              return (
                <div
                  key={plan.id}
                  data-animate="scale"
                  className="relative flex flex-col flex-shrink-0 rounded-2xl p-6 transition-all duration-300"
                  style={{
                    ["--animate-delay" as never]: `${plan.speed === 100 ? 180 : 120 + plan.speed / 2}ms`,
                    width: "270px",
                    scrollSnapAlign: "start",
                    backgroundColor: plan.isPopular ? "#2F5FD0" : "#FFFFFF",
                    border: plan.isPopular
                      ? "2px solid #2F5FD0"
                      : "1px solid #E2E8F0",
                    boxShadow: plan.isPopular
                      ? "0 20px 40px rgba(47, 95, 208, 0.25)"
                      : "0 2px 12px rgba(0,0,0,0.06)",
                    marginTop: plan.isPopular ? "0" : "8px",
                  }}
                >
                  {plan.isPopular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span
                        className="inline-flex items-center gap-1 text-sm font-bold px-4 py-1.5 rounded-full shadow-md whitespace-nowrap"
                        style={{
                          backgroundColor: "#FCD34D",
                          color: "#78350F",
                        }}
                      >
                        <Star className="w-4 h-4 fill-current" />
                        POPULER
                      </span>
                    </div>
                  )}

                  <div className="mb-3 mt-2">
                    <span
                      className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: plan.isPopular
                          ? "rgba(255,255,255,0.15)"
                          : "#DCFCE7",
                        color: plan.isPopular ? "#FFFFFF" : "#15803D",
                      }}
                    >
                      <Check className="w-3 h-3" />
                      Mulai Dari
                    </span>
                  </div>

                  <div className="flex items-end gap-1 mb-1">
                    <span
                      className="text-5xl font-extrabold leading-none"
                      style={{ color: plan.isPopular ? "#FFFFFF" : "#0F172A" }}
                    >
                      {plan.speed}
                    </span>
                    <span
                      className="text-lg font-bold mb-1"
                      style={{ color: plan.isPopular ? "#BFDBFE" : "#64748B" }}
                    >
                      Mbps
                    </span>
                  </div>

                  {hasDiscount && (
                    <p
                      className="text-sm line-through mb-1"
                      style={{ color: plan.isPopular ? "#BFDBFE" : "#94A3B8" }}
                    >
                      Rp {plan.normalPrice.toLocaleString("id-ID")}
                    </p>
                  )}

                  <div className="flex items-baseline gap-1 mb-5">
                    <span
                      className="text-sm font-semibold"
                      style={{ color: plan.isPopular ? "#BFDBFE" : "#64748B" }}
                    >
                      Rp
                    </span>
                    <span
                      className="text-2xl font-extrabold"
                      style={{ color: plan.isPopular ? "#FFFFFF" : "#2F5FD0" }}
                    >
                      {finalPrice.toLocaleString("id-ID")}
                    </span>
                    <span
                      className="text-sm"
                      style={{ color: plan.isPopular ? "#BFDBFE" : "#64748B" }}
                    >
                      /bulan
                    </span>
                  </div>

                  <div
                    className="h-px w-full mb-4"
                    style={{
                      backgroundColor: plan.isPopular
                        ? "rgba(255,255,255,0.2)"
                        : "#F1F5F9",
                    }}
                  />

                  <ul className="space-y-2 mb-6 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature.id} className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{
                            backgroundColor: plan.isPopular
                              ? "rgba(255,255,255,0.2)"
                              : "#EFF6FF",
                          }}
                        >
                          <Check
                            className="w-2.5 h-2.5"
                            style={{
                              color: plan.isPopular ? "#FFFFFF" : "#2F5FD0",
                            }}
                          />
                        </div>
                        <span
                          className="text-sm"
                          style={{
                            color: plan.isPopular ? "#BFDBFE" : "#475569",
                          }}
                        >
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <WALink
                    href={`https://wa.me/6285189300718?text=Halo%20Deska,%20saya%20tertarik%20paket%20INDIBIZ%20${plan.speed}%20Mbps%20seharga%20Rp%20${finalPrice.toLocaleString("id-ID")}/bulan`}
                  >
                    <div
                      data-animate="slide-left"
                      className="w-full py-2.5 rounded-xl font-semibold text-center text-sm cursor-pointer hover:opacity-90 transition-opacity"
                      style={{
                        ["--animate-delay" as never]: "240ms",
                        backgroundColor: plan.isPopular ? "#FFFFFF" : "#2F5FD0",
                        color: plan.isPopular ? "#2F5FD0" : "#FFFFFF",
                      }}
                    >
                      Pilih Paket {plan.speed} Mbps
                    </div>
                  </WALink>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center mt-1 md:hidden">
            <p className="text-xs" style={{ color: "#94A3B8" }}>
              ← Geser untuk lihat paket lainnya →
            </p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <div
            data-animate="scale"
            className="inline-block px-6 py-3 rounded-2xl"
            style={{
              ["--animate-delay" as never]: "220ms",
              backgroundColor: "#EFF6FF",
            }}
          >
            <p className="text-sm font-medium" style={{ color: "#64748B" }}>
              Diskon{" "}
              <span className="font-bold" style={{ color: "#2F5FD0" }}>
                70%
              </span>{" "}
              biaya pasang baru — Bayar bulan pertama di bulan berikutnya
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}