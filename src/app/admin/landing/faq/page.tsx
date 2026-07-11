import { prisma } from "@/lib/prisma";
import {
  createFaq,
  updateFaq,
  deleteFaq,
  moveFaqUp,
  moveFaqDown,
} from "./actions";
import FaqForm from "./FaqForm";
import {
  Plus,
  Trash2,
  Save,
  ChevronUp,
  ChevronDown,
  HelpCircle,
} from "lucide-react";

export default async function AdminFaqPage() {
  const faqs = await prisma.faq.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div className="space-y-10 max-w-5xl">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Kelola FAQ
        </h1>
        <p className="text-gray-500 mt-1">
          Atur pertanyaan, jawaban, dan urutan tampil di halaman utama.
        </p>
      </div>

      {/* ================= CREATE ================= */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Plus className="h-4.5 w-4.5" />
          </span>
          <h2 className="font-semibold text-lg text-gray-900">
            Tambah FAQ Baru
          </h2>
        </div>

        <FaqForm
          action={createFaq}
          successMessage="FAQ baru berhasil ditambahkan"
          className="space-y-4"
        >
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-gray-600">Pertanyaan</span>
            <input
              type="text"
              name="question"
              placeholder="Contoh: Berapa lama proses pemasangan?"
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </label>

          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-gray-600">Jawaban</span>
            <textarea
              name="answer"
              placeholder="Tulis jawaban lengkap di sini..."
              required
              rows={3}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
            />
          </label>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 transition text-white py-2.5 rounded-xl font-semibold"
          >
            <Plus className="h-4 w-4" />
            Tambah FAQ
          </button>
        </FaqForm>
      </div>

      {/* ================= LIST ================= */}
      {faqs.length === 0 && (
        <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-10 text-center text-gray-500">
          Belum ada FAQ. Tambahkan pertanyaan pertama Anda di atas.
        </div>
      )}

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div
            key={faq.id}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-5"
          >
            {/* Header: nomor urut + tombol reorder + hapus */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <HelpCircle className="h-5 w-5" />
                </span>
                <span className="text-sm font-semibold text-gray-400">
                  Urutan #{index + 1}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Reorder naik */}
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={async () => {
                    "use server";
                    await moveFaqUp(faq.id);
                  }}
                  className="flex items-center justify-center h-9 w-9 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-500 transition disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-gray-50"
                  aria-label="Naikkan urutan"
                >
                  <ChevronUp className="h-4 w-4" />
                </button>

                {/* Reorder turun */}
                <button
                  type="button"
                  disabled={index === faqs.length - 1}
                  onClick={async () => {
                    "use server";
                    await moveFaqDown(faq.id);
                  }}
                  className="flex items-center justify-center h-9 w-9 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-500 transition disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-gray-50"
                  aria-label="Turunkan urutan"
                >
                  <ChevronDown className="h-4 w-4" />
                </button>

                {/* Hapus */}
                <button
                  type="button"
                  onClick={async () => {
                    "use server";
                    await deleteFaq(faq.id);
                  }}
                  className="flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-xl text-sm font-semibold transition"
                >
                  <Trash2 className="h-4 w-4" />
                  Hapus
                </button>
              </div>
            </div>

            {/* Form edit */}
            <FaqForm
              action={updateFaq}
              successMessage="FAQ berhasil diperbarui"
              className="space-y-4"
            >
              <input type="hidden" name="id" value={faq.id} />

              <label className="flex flex-col gap-1.5 text-sm">
                <span className="font-medium text-gray-600">Pertanyaan</span>
                <input
                  type="text"
                  name="question"
                  defaultValue={faq.question}
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
              </label>

              <label className="flex flex-col gap-1.5 text-sm">
                <span className="font-medium text-gray-600">Jawaban</span>
                <textarea
                  name="answer"
                  defaultValue={faq.answer}
                  required
                  rows={3}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
                />
              </label>

              <div className="flex justify-end pt-2 border-t border-gray-100">
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-semibold transition mt-4"
                >
                  <Save className="h-4 w-4" />
                  Simpan Perubahan
                </button>
              </div>
            </FaqForm>
          </div>
        ))}
      </div>
    </div>
  );
}