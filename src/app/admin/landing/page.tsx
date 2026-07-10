import { prisma } from "@/lib/prisma";
import { updatePricing } from "./actions";

export default async function AdminPricingPage() {
  const plans = await prisma.pricingPlan.findMany({
    include: { features: true },
    orderBy: { order: "asc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Kelola Pricing
      </h1>

      <div className="space-y-6">
        {plans.map((plan) => (
          <form
            key={plan.id}
            action={updatePricing}
            className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4"
          >
            <input type="hidden" name="id" value={plan.id} />

            {/* Header */}
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-[#10182e]">
                {plan.speed} Mbps
              </h2>

              <label className="flex items-center gap-2 text-sm font-medium">
                <input
                  type="checkbox"
                  name="isPopular"
                  defaultChecked={plan.isPopular}
                  className="w-4 h-4 accent-[#2F5FD0]"
                />
                Terpopuler
              </label>
            </div>

            {/* Harga */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-slate-500">
                  Harga Normal
                </label>
                <input
                  type="number"
                  name="normalPrice"
                  defaultValue={plan.normalPrice}
                  className="w-full mt-1 border border-slate-200 rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="text-sm text-slate-500">
                  Harga Promo
                </label>
                <input
                  type="number"
                  name="price"
                  defaultValue={plan.price}
                  className="w-full mt-1 border border-slate-200 rounded-lg px-3 py-2"
                />
              </div>
            </div>

            {/* Fitur */}
            <div>
              <label className="text-sm text-slate-500 mb-2 block">
                Fitur Paket
              </label>
              <div className="space-y-2">
                {plan.features.map((feature, index) => (
                  <div key={feature.id} className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 w-5">
                      {index + 1}.
                    </span>
                    <input
                      type="text"
                      name={`feature_${feature.id}`}
                      defaultValue={feature.name}
                      className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Tombol Simpan */}
            <button
              type="submit"
              className="bg-[#2F5FD0] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition"
            >
              Simpan Perubahan
            </button>
          </form>
        ))}
      </div>
    </div>
  );
}