"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Plus, Trash2, Loader2, Sparkles } from "lucide-react";
import { addFeature, deleteFeature, updatePricing } from "./actions";

type Feature = {
  id: string;
  name: string;
  createdAt: Date;
};

type Plan = {
  id: string;
  features: Feature[];
};

export default function PlanFeatures({ plan }: { plan: Plan }) {
  const [newFeature, setNewFeature] = useState("");
  const [isPendingAdd, startAddTransition] = useTransition();

  const handleAdd = () => {
    const trimmed = newFeature.trim();
    if (!trimmed) {
      toast.error("Nama fitur wajib diisi");
      return;
    }

    startAddTransition(async () => {
      try {
        await addFeature(plan.id, trimmed);
        setNewFeature("");
        toast.success("Fitur berhasil ditambahkan");
      } catch {
        toast.error("Gagal menambahkan fitur");
      }
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm("Hapus fitur ini?")) return;

    startAddTransition(async () => {
      try {
        await deleteFeature(id);
        toast.success("Fitur berhasil dihapus");
      } catch {
        toast.error("Gagal menghapus fitur");
      }
    });
  };

  return (
    <div className="space-y-4">

      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
        Fitur Paket
      </p>

      {/* LIST FITUR */}
      <div className="space-y-2">
        {plan.features.length === 0 && (
          <p className="text-sm text-gray-400 italic">
            Belum ada fitur untuk paket ini.
          </p>
        )}

        {plan.features.map((feature) => (
          <div
            key={feature.id}
            className="flex items-center gap-3 bg-gray-50 rounded-xl px-3 py-2"
          >
            <Sparkles className="h-4 w-4 text-blue-500 shrink-0" />

            <span className="flex-1 text-sm text-gray-700">
              {feature.name}
            </span>

            <button
              type="button"
              onClick={() => handleDelete(feature.id)}
              className="h-8 w-8 flex items-center justify-center rounded-lg bg-red-100 hover:bg-red-200 text-red-600 transition"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {/* TAMBAH FITUR */}
      <div className="flex gap-3 pt-2">
        <input
          type="text"
          value={newFeature}
          onChange={(e) => setNewFeature(e.target.value)}
          placeholder="Tambah fitur baru..."
          className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
        />

        <button
          type="button"
          onClick={handleAdd}
          disabled={isPendingAdd}
          className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white px-4 py-2 rounded-xl text-sm font-semibold transition"
        >
          {isPendingAdd ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
          Tambah
        </button>
      </div>
    </div>
  );
}