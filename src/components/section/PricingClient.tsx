"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import WALink from "@/components/ui/WALink";
import { Check, Star, ChevronDown, Filter, Zap, Gauge } from "lucide-react";
import { Prisma } from "@prisma/client";

// ✅ 1. Gunakan Type langsung dari Prisma supaya aman saat di-build
type PlanWithRelations = Prisma.PricingPlanGetPayload<{
  include: {
    features: true;
    product: {
      include: {
        category: true;
      };
    };
  };
}>;

export default function PricingClient({
  plans,
}: {
  plans: PlanWithRelations[];
}) {
  const [showAll, setShowAll] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSpeed, setSelectedSpeed] = useState<string>("all");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSpeedOpen, setIsSpeedOpen] = useState(false);

  // ✅ Group & Sort Plans by Category (Aman dengan optional chaining ?.)
  const groupedPlans = plans.reduce((acc, plan) => {
    const categoryName = plan.product?.category?.name ?? "Lainnya";
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(plan);
    return acc;
  }, {} as Record<string, PlanWithRelations[]>);

  // Sort each group by speed
  Object.keys(groupedPlans).forEach((key) => {
    groupedPlans[key].sort((a, b) => a.speed - b.speed);
  });

  // Flatten back to array but grouped
  const sortedPlans = Object.values(groupedPlans).flat();

  // ✅ Filter Plans
  const filteredPlans = sortedPlans.filter((plan) => {
    const categoryMatch =
      selectedCategory === "all" ||
      plan.product?.category?.name === selectedCategory;
    const speedMatch =
      selectedSpeed === "all" || plan.speed.toString() === selectedSpeed;
    return categoryMatch && speedMatch;
  });

  // ✅ Show only 6 plans initially
  const displayedPlans = showAll ? filteredPlans : filteredPlans.slice(0, 6);

  // ✅ Get unique categories for filter
  const categories = Array.from(
    new Set(plans.map((p) => p.product?.category?.name ?? "Lainnya"))
  );

  // ✅ Get unique speeds for filter
  const speeds = Array.from(new Set(plans.map((p) => p.speed))).sort(
    (a, b) => a - b
  );

  // ✅ Close dropdown when clicking outside
  const closeDropdowns = () => {
    setIsCategoryOpen(false);
    setIsSpeedOpen(false);
  };

  if (!plans || plans.length === 0) {
    return (
      <section id="pricing" className="py-16 bg-white">
        <Container>
          <p className="text-center text-gray-400">Paket belum tersedia</p>
        </Container>
      </section>
    );
  }

  return (
    <section id="pricing" className="py-16 md:py-24 bg-white" onClick={closeDropdowns}>
      <Container>

        {/* HEADER */}
        <div className="mb-10 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#0F172A]">
            Pilih <span className="text-[#2F5FD0]">Paket</span> Sesuai
            Kebutuhan
          </h2>
          <p className="text-lg text-[#64748B]">
            Harga terjangkau, kualitas enterprise. Semua paket sudah termasuk
            unlimited tanpa FUP dan tagihan flat setiap bulan.
          </p>
        </div>

        {/* ✅ PROFESSIONAL FILTER DROPDOWNS */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          
          {/* Category Filter */}
          <div className="relative">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsCategoryOpen(!isCategoryOpen);
                setIsSpeedOpen(false);
              }}
              className={`flex items-center gap-2 bg-white border rounded-xl px-4 py-2.5 text-sm font-medium transition shadow-sm hover:shadow-md ${
                isCategoryOpen
                  ? "border-[#2F5FD0] ring-2 ring-[#2F5FD0]/20"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <Filter className="w-4 h-4 text-[#2F5FD0]" />
              <span className="text-gray-700">
                {selectedCategory === "all"
                  ? "Semua Paket"
                  : selectedCategory.length > 25
                  ? selectedCategory.substring(0, 25) + "..."
                  : selectedCategory}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-gray-400 transition-transform ${
                  isCategoryOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isCategoryOpen && (
              <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="max-h-64 overflow-y-auto">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory("all");
                      setIsCategoryOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition ${
                      selectedCategory === "all"
                        ? "bg-[#2F5FD0]/10 text-[#2F5FD0] font-semibold"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Semua Paket
                  </button>
                  <div className="h-px bg-gray-100" />
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(cat);
                        setIsCategoryOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition ${
                        selectedCategory === cat
                          ? "bg-[#2F5FD0]/10 text-[#2F5FD0] font-semibold"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Speed Filter */}
          <div className="relative">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsSpeedOpen(!isSpeedOpen);
                setIsCategoryOpen(false);
              }}
              className={`flex items-center gap-2 bg-white border rounded-xl px-4 py-2.5 text-sm font-medium transition shadow-sm hover:shadow-md ${
                isSpeedOpen
                  ? "border-[#2F5FD0] ring-2 ring-[#2F5FD0]/20"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <Gauge className="w-4 h-4 text-[#2F5FD0]" />
              <span className="text-gray-700">
                {selectedSpeed === "all"
                  ? "Semua Kecepatan"
                  : `${selectedSpeed} Mbps`}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-gray-400 transition-transform ${
                  isSpeedOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isSpeedOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="max-h-64 overflow-y-auto">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedSpeed("all");
                      setIsSpeedOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition ${
                      selectedSpeed === "all"
                        ? "bg-[#2F5FD0]/10 text-[#2F5FD0] font-semibold"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Semua Kecepatan
                  </button>
                  <div className="h-px bg-gray-100" />
                  {speeds.map((speed) => (
                    <button
                      key={speed}
                      type="button"
                      onClick={() => {
                        setSelectedSpeed(speed.toString());
                        setIsSpeedOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition flex items-center justify-between ${
                        selectedSpeed === speed.toString()
                          ? "bg-[#2F5FD0]/10 text-[#2F5FD0] font-semibold"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <span>{speed} Mbps</span>
                      {selectedSpeed === speed.toString() && (
                        <Check className="w-4 h-4" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Reset Filter */}
          {(selectedCategory !== "all" || selectedSpeed !== "all") && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("all");
                setSelectedSpeed("all");
              }}
              className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#2F5FD0] transition px-4 py-2.5"
            >
              <Zap className="w-4 h-4" />
              Reset Filter
            </button>
          )}
        </div>

        {/* ✅ GRID - 3 COLUMNS, MAX 2 ROWS (6 PLANS) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {displayedPlans.map((plan) => {
            const finalPrice =
              !plan.price || plan.price <= 0
                ? plan.normalPrice
                : plan.price;

            const hasDiscount = plan.normalPrice !== finalPrice;

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col rounded-2xl p-6 transition-all duration-300 ${
                  plan.isPopular
                    ? "bg-[#2F5FD0] text-white shadow-xl"
                    : "bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-[#2F5FD0]/30"
                }`}
              >
                {/* POPULAR BADGE */}
                {plan.isPopular && (
                  <div className="absolute -top-3 right-4">
                    <span className="inline-flex items-center text-xs font-bold px-3 py-1 rounded-full bg-red-500 text-white shadow-sm">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      Promo Spesial
                    </span>
                  </div>
                )}

                {/* CATEGORY BADGE */}
                <div className="mb-4 mt-2">
                  <span
                    className={`inline-flex items-center text-[11px] font-semibold px-3 py-1 rounded-full truncate max-w-[240px] ${
                      plan.isPopular
                        ? "bg-white/20 text-white"
                        : "bg-blue-50 text-[#2F5FD0]"
                    }`}
                  >
                    {plan.product?.category?.name ?? "Lainnya"}
                  </span>
                </div>

                {/* SPEED */}
                <div className="flex items-end gap-1 mb-2">
                  <span
                    className={`text-5xl font-extrabold leading-none ${
                      plan.isPopular ? "text-white" : "text-[#0F172A]"
                    }`}
                  >
                    {plan.speed}
                  </span>
                  <span
                    className={`text-lg font-bold mb-1 ${
                      plan.isPopular ? "text-blue-100" : "text-gray-500"
                    }`}
                  >
                    Mbps
                  </span>
                </div>

                {/* PRICE */}
                <div className="flex items-baseline gap-1 mb-4">
                  <span
                    className={`text-sm font-semibold ${
                      plan.isPopular ? "text-blue-100" : "text-gray-500"
                    }`}
                  >
                    Rp
                  </span>
                  <span
                    className={`text-2xl font-extrabold ${
                      plan.isPopular ? "text-white" : "text-[#2F5FD0]"
                    }`}
                  >
                    {finalPrice.toLocaleString("id-ID")}
                  </span>
                  <span
                    className={`text-sm ${
                      plan.isPopular ? "text-blue-100" : "text-gray-500"
                    }`}
                  >
                    /bulan
                  </span>
                </div>

                {/* DIVIDER */}
                <div
                  className={`h-px w-full mb-4 ${
                    plan.isPopular ? "bg-white/20" : "bg-gray-100"
                  }`}
                />

                {/* FEATURES */}
                <ul className="space-y-2 mb-6 flex-1">
                  {plan.features.slice(0, 3).map((feature) => (
                    <li
                      key={feature.id}
                      className="flex items-center gap-2 text-sm"
                    >
                      <Check
                        className={`w-4 h-4 shrink-0 ${
                          plan.isPopular ? "text-white" : "text-[#2F5FD0]"
                        }`}
                      />
                      <span
                        className={
                          plan.isPopular ? "text-blue-100" : "text-gray-600"
                        }
                      >
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* BUTTON */}
                <WALink
                  href={`https://wa.me/6285189300718?text=Halo%20Deska,%20saya%20tertarik%20paket%20${plan.speed}%20Mbps`}
                >
                  <div
                    className={`w-full py-2.5 rounded-xl font-semibold text-center text-sm cursor-pointer hover:opacity-90 transition ${
                      plan.isPopular
                        ? "bg-white text-[#2F5FD0]"
                        : "bg-[#2F5FD0] text-white hover:bg-[#2F5FD0]/90"
                    }`}
                  >
                    Pilih Paket
                  </div>
                </WALink>
              </div>
            );
          })}
        </div>

        {/* ✅ LIHAT SEMUA BUTTON */}
        {filteredPlans.length > 6 && (
          <div className="text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 text-[#2F5FD0] font-semibold text-sm hover:underline transition px-6 py-3 rounded-xl hover:bg-[#2F5FD0]/5"
            >
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  showAll ? "rotate-180" : ""
                }`}
              />
              {showAll ? "Sembunyikan Beberapa" : `Tampilkan Semua (${filteredPlans.length})`}
            </button>
          </div>
        )}

        {/* Bottom Info */}
        <div className="mt-16 text-center">
          <div className="inline-block px-6 py-3 rounded-2xl bg-blue-50">
            <p className="text-sm font-medium text-gray-500">
              Diskon{" "}
              <span className="font-bold text-[#2F5FD0]">70%</span>{" "}
              biaya pasang baru — Bayar bulan pertama di bulan berikutnya
            </p>
          </div>
        </div>

      </Container>
    </section>
  );
}