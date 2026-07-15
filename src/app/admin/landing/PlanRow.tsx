"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import {
  ChevronDown,
  ChevronUp,
  Trash2,
  Loader2,
  Save,
  Star,
} from "lucide-react";
import { updatePricing, deletePricing } from "./actions";
import PricingForm from "./PricingForm";
import PlanFeatures from "./PlanFeatures";
import { Prisma } from "@prisma/client";

/* ✅ Type langsung dari Prisma */
type PlanWithRelations = Prisma.PricingPlanGetPayload<{
  include: {
    features: true;
  };
}>;

export default function PlanRow({
  plan,
}: {
  plan: PlanWithRelations;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPendingDelete, startDeleteTransition] = useTransition();

  const hasPromo =
    plan.price !== null &&
    plan.price !== undefined &&
    Number(plan.price) < Number(plan.normalPrice);

  const handleDelete = () => {
    if (!confirm(`Hapus paket ${plan.speed} Mbps?`)) return;

    startDeleteTransition(async () => {
      try {
        await deletePricing(plan.id);
        toast.success("Paket berhasil dihapus");
      } catch {
        toast.error("Gagal menghapus paket");
      }
    });
  };

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">

      {/* ===== ROW HEADER ===== */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50">
        <div className="flex items-center gap-4">
          <h4 className="font-semibold text-gray-900">
            {plan.speed} Mbps
          </h4>

          <div className="text-sm text-gray-600 flex items-center gap-3">
            <span>
              Normal: Rp {plan.normalPrice.toLocaleString("id-ID")}
            </span>

            {hasPromo && (
              <span className="text-emerald-600 font-semibold">
                Promo: Rp {plan.price.toLocaleString("id-ID")}
              </span>
            )}

            {plan.isPopular && (
              <span className="flex items-center gap-1 text-yellow-500 font-medium">
                <Star className="h-3.5 w-3.5" />
                Popular
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleDelete}
            disabled={isPendingDelete}
            className="h-8 w-8 flex items-center justify-center rounded-lg bg-red-100 hover:bg-red-200 text-red-600 transition disabled:opacity-60"
          >
            {isPendingDelete ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-8 w-8 flex items-center justify-center rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 transition"
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* ===== EXPANDED ===== */}
      {isExpanded && (
        <div className="px-4 py-5 space-y-5 border-t border-gray-100">

          {/* EDIT PLAN */}
          <PricingForm
            action={updatePricing}
            successMessage="Perubahan berhasil disimpan"
            errorMessage="Gagal menyimpan perubahan"
          >
            <input type="hidden" name="id" value={plan.id} />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="number"
                name="normalPrice"
                defaultValue={plan.normalPrice}
                className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm"
              />

              <input
                type="number"
                name="price"
                defaultValue={plan.price ?? undefined}
                className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm"
              />

              <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                <input
                  type="checkbox"
                  name="isPopular"
                  defaultChecked={plan.isPopular}
                  className="h-4 w-4"
                />
                Popular
              </label>

              <button
                type="submit"
                className="sm:col-span-3 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl font-semibold transition"
              >
                <Save className="h-4 w-4" />
                Simpan
              </button>
            </div>
          </PricingForm>

          {/* FEATURES */}
          <PlanFeatures plan={plan} />
        </div>
      )}
    </div>
  );
}