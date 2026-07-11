import { prisma } from "@/lib/prisma";
import {
  updatePricing,
  createPricing,
  deletePricing,
  addFeature,
  deleteFeature,
} from "./actions";
import PricingForm from "./PricingForm";
import {
  AddFeatureControl,
  DeleteFeatureButton,
  DeletePlanButton,
} from "./PricingActionControls";
import {
  Wifi,
  Plus,
  Save,
  Tag,
  Gauge,
  Sparkles,
  Percent,
  Fingerprint,
} from "lucide-react";

export default async function AdminPricingPage() {
  const plans = await prisma.pricingPlan.findMany({
    include: { features: true },
    orderBy: { order: "asc" },
  });

  return (
    <div className="space-y-8 sm:space-y-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-0">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
          Kelola Pricing
        </h1>
        <p className="text-sm sm:text-base text-gray-500 mt-1">
          Atur paket, harga, dan fitur yang tampil di halaman utama.
        </p>
      </div>

      {/* ================= CREATE ================= */}
      <div className="bg-white border border-gray-200 rounded-3xl p-4 sm:p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-5 sm:mb-6">
          <span className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-sm shadow-blue-200">
            <Plus className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-semibold text-base sm:text-lg text-gray-900 leading-tight">
              Tambah Paket Baru
            </h2>
            <p className="text-xs text-gray-400">
              Buat paket internet dengan kecepatan dan harga baru
            </p>
          </div>
        </div>

        <PricingForm
          action={createPricing}
          successMessage="Paket berhasil ditambahkan"
          errorMessage="Gagal menambahkan paket"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <label className="flex flex-col gap-1.5 text-sm">
              <span className="font-medium text-gray-600">
                Kecepatan (Mbps)
              </span>
              <div className="relative">
                <Gauge className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="number"
                  name="speed"
                  placeholder="100"
                  required
                  className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
              </div>
            </label>

            <label className="flex flex-col gap-1.5 text-sm">
              <span className="font-medium text-gray-600">Harga Normal</span>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                  Rp
                </span>
                <input
                  type="number"
                  name="normalPrice"
                  placeholder="605.000"
                  required
                  className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
              </div>
            </label>

            <label className="flex flex-col gap-1.5 text-sm">
              <span className="font-medium text-gray-600">
                Harga Promo{" "}
                <span className="font-normal text-gray-400">(opsional)</span>
              </span>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                  Rp
                </span>
                <input
                  type="number"
                  name="price"
                  placeholder="535.000"
                  className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
              </div>
            </label>

            <button
              type="submit"
              className="sm:col-span-3 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition text-white py-2.5 rounded-xl font-semibold shadow-sm shadow-blue-200"
            >
              <Plus className="h-4 w-4" />
              Tambah Paket
            </button>
          </div>
        </PricingForm>
      </div>

      {/* ================= LIST ================= */}
      {plans.length === 0 && (
        <div className="bg-white border border-dashed border-gray-300 rounded-3xl p-8 sm:p-10 text-center text-gray-500 text-sm sm:text-base">
          Belum ada paket. Tambahkan paket pertama Anda di atas.
        </div>
      )}

      <div className="space-y-5 sm:space-y-6">
        {plans.map((plan) => {
          const hasPromo =
            plan.price !== null &&
            plan.price !== undefined &&
            Number(plan.price) < Number(plan.normalPrice);
          const discountPercent = hasPromo
            ? Math.round(
                100 - (Number(plan.price) / Number(plan.normalPrice)) * 100
              )
            : null;

          return (
            <div
              key={plan.id}
              className="bg-white border border-gray-200 rounded-3xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow space-y-5 sm:space-y-6"
            >
              <PricingForm
                action={updatePricing}
                successMessage="Perubahan berhasil disimpan"
                errorMessage="Gagal menyimpan perubahan"
              >
                <input type="hidden" name="id" value={plan.id} />

                {/* Header */}
                <div className="flex items-start sm:items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-sm shadow-blue-200">
                      <Wifi className="h-5 w-5 sm:h-6 sm:w-6" />
                    </span>
                    <div className="min-w-0">
                      <h2 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">
                        {plan.speed} Mbps
                      </h2>
                      <span className="inline-flex items-center gap-1 mt-0.5 text-[11px] font-mono text-gray-400 truncate max-w-[190px] sm:max-w-xs">
                        <Fingerprint className="h-3 w-3 shrink-0" />
                        {plan.id}
                      </span>
                    </div>
                  </div>

                  <DeletePlanButton
                    onDeletePlan={async () => {
                      "use server";
                      await deletePricing(plan.id);
                    }}
                  />
                </div>

                {/* Harga */}
                <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-4 sm:p-5 space-y-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-blue-700/70">
                      <Tag className="h-3.5 w-3.5" />
                      Harga &amp; Promo
                    </p>
                    {hasPromo && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold px-2.5 py-1">
                        <Percent className="h-3 w-3" />
                        Hemat {discountPercent}%
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <label className="flex flex-col gap-1.5 text-sm">
                      <span className="font-medium text-gray-600">
                        Harga Normal
                      </span>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                          Rp
                        </span>
                        <input
                          type="number"
                          name="normalPrice"
                          defaultValue={plan.normalPrice}
                          className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        />
                      </div>
                    </label>

                    <label className="flex flex-col gap-1.5 text-sm">
                      <span className="font-medium text-gray-600 flex items-center gap-1">
                        <Tag className="h-3.5 w-3.5 text-blue-500" />
                        Harga Promo
                      </span>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                          Rp
                        </span>
                        <input
                          type="number"
                          name="price"
                          defaultValue={plan.price ?? undefined}
                          className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        />
                      </div>
                    </label>
                  </div>
                </div>

                {/* ================= FITUR ================= */}
                <div>
                  <p className="font-semibold mb-3 text-xs sm:text-sm uppercase tracking-wide text-gray-500">
                    Fitur Paket
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {plan.features.length === 0 && (
                      <p className="sm:col-span-2 text-sm text-gray-400 italic">
                        Belum ada fitur untuk paket ini.
                      </p>
                    )}

                    {plan.features.map((feature) => (
                      <div
                        key={feature.id}
                        className="flex gap-2 items-center bg-gray-50 rounded-xl p-1.5 pr-2"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-blue-500 shadow-sm">
                          <Sparkles className="h-4 w-4" />
                        </span>
                        <input
                          type="text"
                          name={`feature_${feature.id}`}
                          defaultValue={feature.name}
                          className="flex-1 min-w-0 bg-transparent border border-transparent rounded-lg px-2.5 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition"
                        />

                        <div className="shrink-0">
                          <DeleteFeatureButton
                            onDeleteFeature={async () => {
                              "use server";
                              await deleteFeature(feature.id);
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-2.5 w-full max-w-full overflow-hidden rounded-xl bg-gray-50 p-1.5">
                    <div className="flex items-center gap-2 w-full [&>*]:flex [&>*]:w-full [&>*]:items-center [&>*]:gap-2 [&_input]:min-w-0 [&_input]:flex-1 [&_input]:w-full [&_input]:bg-white [&_input]:border [&_input]:border-gray-200 [&_input]:rounded-lg [&_input]:px-3 [&_input]:py-2 [&_input]:text-sm [&_input]:outline-none [&_input]:focus:ring-2 [&_input]:focus:ring-blue-500 [&_button]:shrink-0 [&_button]:whitespace-nowrap [&_button]:rounded-lg [&_button]:px-3 [&_button]:py-2 [&_button]:text-sm">
                      <AddFeatureControl
                        onAddFeature={async (name) => {
                          "use server";
                          await addFeature(plan.id, name);
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-stretch sm:justify-end pt-4 border-t border-gray-100">
                  <button
                    type="submit"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-6 py-2.5 rounded-xl font-semibold transition shadow-sm shadow-blue-200"
                  >
                    <Save className="h-4 w-4" />
                    Simpan Perubahan
                  </button>
                </div>
              </PricingForm>
            </div>
          );
        })}
      </div>
    </div>
  );
}