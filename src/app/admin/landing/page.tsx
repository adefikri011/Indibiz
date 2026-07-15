import { prisma } from "@/lib/prisma";
import { createCategory, createProduct, createPricing } from "./actions";
import CategoryCard from "./CategoryCard";
import PricingForm from "./PricingForm";
import { Plus, FolderPlus } from "lucide-react";

export default async function AdminPricingPage() {
  const categories = await prisma.pricingCategory.findMany({
    orderBy: { order: "asc" },
    include: {
      products: {
        orderBy: { order: "asc" },
        include: {
          plans: {
            orderBy: { order: "asc" },
            include: {
              features: {
                orderBy: { createdAt: "asc" },
              },
            },
          },
        },
      },
    },
  });

  return (
    <div className="space-y-8 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-0">

      {/* ======= HEADER ======= */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
          Kelola Pricing
        </h1>
        <p className="text-sm sm:text-base text-gray-500 mt-1">
          Atur kategori, produk, paket, dan fitur yang tampil di halaman utama.
        </p>
      </div>

      {/* ======= TAMBAH KATEGORI ======= */}
      <div className="bg-white border border-gray-200 rounded-3xl p-4 sm:p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-sm">
            <FolderPlus className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-semibold text-base sm:text-lg text-gray-900 leading-tight">
              Tambah Kategori Baru
            </h2>
            <p className="text-xs text-gray-400">
              Contoh: HSI Bisnis 2S (Internet + Netmon)
            </p>
          </div>
        </div>

        <PricingForm
          action={createCategory}
          successMessage="Kategori berhasil ditambahkan"
          errorMessage="Gagal menambahkan kategori"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <label className="flex flex-col gap-1.5 text-sm sm:col-span-1">
              <span className="font-medium text-gray-600">Nama Kategori</span>
              <input
                type="text"
                name="name"
                placeholder="HSI Bisnis 2S (Netmon)"
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </label>

            <label className="flex flex-col gap-1.5 text-sm sm:col-span-2">
              <span className="font-medium text-gray-600">
                Deskripsi{" "}
                <span className="font-normal text-gray-400">(opsional)</span>
              </span>
              <input
                type="text"
                name="description"
                placeholder="Internet + layanan Netmon HI"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </label>

            <button
              type="submit"
              className="sm:col-span-3 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition text-white py-2.5 rounded-xl font-semibold shadow-sm"
            >
              <Plus className="h-4 w-4" />
              Tambah Kategori
            </button>
          </div>
        </PricingForm>
      </div>

      {/* ======= EMPTY STATE ======= */}
      {categories.length === 0 && (
        <div className="bg-white border border-dashed border-gray-300 rounded-3xl p-8 sm:p-10 text-center text-gray-400 text-sm">
          Belum ada kategori. Tambahkan kategori pertama di atas.
        </div>
      )}

      {/* ======= LIST KATEGORI ======= */}
      <div className="space-y-6">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            createProductAction={createProduct}
            createPricingAction={createPricing}
          />
        ))}
      </div>
    </div>
  );
}