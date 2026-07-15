"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import {
  ChevronDown,
  ChevronUp,
  Folder,
  Pencil,
  Trash2,
  Plus,
  Loader2,
  Save,
} from "lucide-react";
import ProductCard from "./ProductCard";
import PricingForm from "./PricingForm";
import { updateCategory, deleteCategory } from "./actions";
import { Prisma } from "@prisma/client";

type CategoryWithRelations = Prisma.PricingCategoryGetPayload<{
  include: {
    products: {
      include: {
        plans: {
          include: {
            features: true;
          };
        };
      };
    };
  };
}>;

type Props = {
  category: CategoryWithRelations;
  createProductAction: (formData: FormData) => Promise<void>;
  createPricingAction: (formData: FormData) => Promise<void>;
};

export default function CategoryCard({
  category,
  createProductAction,
  createPricingAction,
}: Props) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isPendingDelete, startDeleteTransition] = useTransition();

  const handleDelete = () => {
    if (
      !confirm(
        `Hapus kategori "${category.name}"? Semua produk dan paket di dalamnya akan ikut terhapus.`
      )
    )
      return;

    startDeleteTransition(async () => {
      try {
        await deleteCategory(category.id);
        toast.success("Kategori berhasil dihapus");
      } catch {
        toast.error("Gagal menghapus kategori");
      }
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">
      {/* ===== HEADER ===== */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/20 text-white">
              <Folder className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <h2 className="text-white font-bold text-base sm:text-lg leading-tight truncate">
                {category.name}
              </h2>
              {category.description && (
                <p className="text-blue-100 text-xs mt-0.5 truncate">
                  {category.description}
                </p>
              )}
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className="h-8 w-8 flex items-center justify-center rounded-xl bg-white/20 hover:bg-white/30 text-white transition"
            >
              <Pencil className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={handleDelete}
              disabled={isPendingDelete}
              className="h-8 w-8 flex items-center justify-center rounded-xl bg-white/20 hover:bg-red-500 text-white transition disabled:opacity-60"
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
              className="h-8 w-8 flex items-center justify-center rounded-xl bg-white/20 hover:bg-white/30 text-white transition"
            >
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ===== EDIT FORM ===== */}
      {isEditing && (
        <div className="border-b border-gray-100 bg-blue-50/50 px-4 sm:px-6 py-4">
          <PricingForm
            action={updateCategory}
            successMessage="Kategori berhasil diupdate"
            errorMessage="Gagal mengupdate kategori"
            onSuccess={() => setIsEditing(false)}
          >
            <input type="hidden" name="id" value={category.id} />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                name="name"
                defaultValue={category.name}
                required
                className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm"
              />

              <input
                type="text"
                name="description"
                defaultValue={category.description ?? ""}
                className="sm:col-span-2 border border-gray-200 rounded-xl px-4 py-2.5 text-sm"
              />

              <button
                type="submit"
                className="sm:col-span-3 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl font-semibold transition"
              >
                <Save className="h-4 w-4" />
                Simpan
              </button>
            </div>
          </PricingForm>
        </div>
      )}

      {/* ===== BODY ===== */}
      {isExpanded && (
        <div className="p-4 sm:p-6 space-y-4">
          {category.products.length === 0 && (
            <div className="text-center text-gray-400 text-sm py-4 border border-dashed border-gray-200 rounded-2xl">
              Belum ada produk di kategori ini.
            </div>
          )}

          {category.products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              createPricingAction={createPricingAction}
            />
          ))}

          {/* ADD PRODUCT */}
          <div className="border border-dashed border-blue-200 rounded-2xl p-4 bg-blue-50/30">
            <PricingForm action={createProductAction}>
              <input type="hidden" name="categoryId" value={category.id} />
              <div className="flex gap-3">
                <input
                  type="text"
                  name="name"
                  placeholder="Nama Produk"
                  required
                  className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm"
                />
                <button
                  type="submit"
                  className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition"
                >
                  <Plus className="h-4 w-4" />
                  Tambah
                </button>
              </div>
            </PricingForm>
          </div>
        </div>
      )}
    </div>
  );
}