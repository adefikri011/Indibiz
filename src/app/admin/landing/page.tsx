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
  Wifi,
  Plus,
  Trash2,
  Save,
  Tag,
  Gauge,
  Sparkles,
} from "lucide-react";

export default async function AdminPricingPage() {
  const plans = await prisma.pricingPlan.findMany({
    include: { features: true },
    orderBy: { order: "asc" },
  });

  return (
    <div className="space-y-10 max-w-5xl">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Kelola Pricing
        </h1>
        <p className="text-gray-500 mt-1">
          Atur paket, harga, dan fitur yang tampil di halaman utama.
        </p>
      </div>

      {/* ================= CREATE ================= */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Plus className="h-4.5 w-4.5" />
          </span>
          <h2 className="font-semibold text-lg text-gray-900">
            Tambah Paket Baru
          </h2>
        </div>

        <form action={createPricing} className="grid md:grid-cols-3 gap-4">
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-gray-600">Kecepatan (Mbps)</span>
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
            className="md:col-span-3 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 transition text-white py-2.5 rounded-xl font-semibold"
          >
            <Plus className="h-4 w-4" />
            Tambah Paket
          </button>
        </form>
      </div>

      {/* ================= LIST ================= */}
      {plans.length === 0 && (
        <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-10 text-center text-gray-500">
          Belum ada paket. Tambahkan paket pertama Anda di atas.
        </div>
      )}

      <div className="space-y-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-6"
          >
            <PricingForm action={updatePricing}>
              <input type="hidden" name="id" value={plan.id} />

              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Wifi className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 leading-tight">
                      {plan.speed} Mbps
                    </h2>
                    <span className="text-xs text-gray-400">
                      ID Paket: {plan.id}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={async () => {
                    "use server";
                    await deletePricing(plan.id);
                  }}
                  className="flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-xl text-sm font-semibold transition"
                >
                  <Trash2 className="h-4 w-4" />
                  Hapus Paket
                </button>
              </div>

              {/* Harga */}
              <div className="grid md:grid-cols-2 gap-4">
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
                      className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
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
                      className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    />
                  </div>
                </label>
              </div>

              {/* ================= FITUR ================= */}
              <div>
                <p className="font-semibold mb-3 text-sm uppercase tracking-wide text-gray-500">
                  Fitur Paket
                </p>

                <div className="space-y-2.5">
                  {plan.features.length === 0 && (
                    <p className="text-sm text-gray-400 italic">
                      Belum ada fitur untuk paket ini.
                    </p>
                  )}

                  {plan.features.map((feature) => (
                    <div key={feature.id} className="flex gap-2 items-center">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-gray-400">
                        <Sparkles className="h-4 w-4" />
                      </span>
                      <input
                        type="text"
                        name={`feature_${feature.id}`}
                        defaultValue={feature.name}
                        className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      />

                      <button
                        type="button"
                        onClick={async () => {
                          "use server";
                          await deleteFeature(feature.id);
                        }}
                        className="flex items-center justify-center h-9 w-9 shrink-0 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition"
                        aria-label="Hapus fitur"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}

                  {/* TAMBAH FITUR (TIDAK ADA FORM DI DALAM FORM) */}
                  <div className="flex gap-2 pt-1">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">
                      <Plus className="h-4 w-4" />
                    </span>
                    <input
                      type="text"
                      name={`new_feature_${plan.id}`}
                      placeholder="Tambah fitur baru..."
                      className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                    />

                    <button
                      type="submit"
                      formAction={async (formData) => {
                        "use server";
                        const name = formData.get(
                          `new_feature_${plan.id}`
                        ) as string;
                        await addFeature(plan.id, name);
                      }}
                      className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition shrink-0"
                    >
                      <Plus className="h-4 w-4" />
                      Tambah
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-2 border-t border-gray-100">
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-semibold transition mt-4"
                >
                  <Save className="h-4 w-4" />
                  Simpan Perubahan
                </button>
              </div>
            </PricingForm>
          </div>
        ))}
      </div>
    </div>
  );
}