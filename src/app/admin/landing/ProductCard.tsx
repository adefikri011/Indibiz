"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import {
  ChevronDown,
  ChevronUp,
  Pencil,
  Trash2,
  Loader2,
  Plus,
  Package,
} from "lucide-react";
import { updateProduct, deleteProduct } from "./actions";
import PricingForm from "./PricingForm";
import PlanRow from "./PlanRow";
import { Prisma } from "@prisma/client";

type ProductWithRelations = Prisma.PricingProductGetPayload<{
  include: {
    plans: {
      include: {
        features: true;
      };
    };
  };
}>;

export default function ProductCard({
  product,
  createPricingAction,
}: {
  product: ProductWithRelations;
  createPricingAction: (formData: FormData) => Promise<void>;
}) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isPendingDelete, startDeleteTransition] = useTransition();

  const handleDelete = () => {
    if (
      !confirm(
        `Hapus produk "${product.name}"? Semua paket di dalamnya akan ikut terhapus.`
      )
    )
      return;

    startDeleteTransition(async () => {
      try {
        await deleteProduct(product.id);
        toast.success("Produk berhasil dihapus");
      } catch {
        toast.error("Gagal menghapus produk");
      }
    });
  };

  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm">
      {/* ===== HEADER ===== */}
      <div className="bg-gray-50 px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600 shrink-0">
            <Package className="h-4 w-4" />
          </span>
          <h3 className="font-semibold text-gray-900 truncate">
            {product.name}
          </h3>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className="h-8 w-8 flex items-center justify-center rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 transition"
          >
            <Pencil className="h-4 w-4" />
          </button>

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

      {/* ===== EDIT PRODUCT ===== */}
      {isEditing && (
        <div className="px-4 py-4 border-t border-gray-100 bg-gray-50">
          <PricingForm
            action={updateProduct}
            successMessage="Produk berhasil diupdate"
            errorMessage="Gagal mengupdate produk"
            onSuccess={() => setIsEditing(false)}
          >
            <input type="hidden" name="id" value={product.id} />
            <div className="flex gap-3">
              <input
                type="text"
                name="name"
                defaultValue={product.name}
                required
                className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition"
              >
                Simpan
              </button>
            </div>
          </PricingForm>
        </div>
      )}

      {/* ===== BODY ===== */}
      {isExpanded && (
        <div className="px-4 py-5 space-y-4">
          {product.plans.length === 0 && (
            <div className="text-sm text-gray-400 border border-dashed border-gray-200 rounded-xl p-4 text-center">
              Belum ada paket dalam produk ini.
            </div>
          )}

          <div className="space-y-3">
            {product.plans.map((plan) => (
              <PlanRow key={plan.id} plan={plan} />
            ))}
          </div>

          {/* ADD PLAN */}
          <div className="border border-dashed border-blue-200 rounded-xl p-4 bg-blue-50/30">
            <PricingForm action={createPricingAction}>
              <input type="hidden" name="productId" value={product.id} />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="number"
                  name="speed"
                  placeholder="Speed (Mbps)"
                  required
                  className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm"
                />
                <input
                  type="number"
                  name="normalPrice"
                  placeholder="Harga Normal"
                  required
                  className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm"
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Harga Promo (opsional)"
                  className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm"
                />
                <button
                  type="submit"
                  className="sm:col-span-3 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl text-sm font-semibold transition"
                >
                  Tambah Paket
                </button>
              </div>
            </PricingForm>
          </div>
        </div>
      )}
    </div>
  );
}