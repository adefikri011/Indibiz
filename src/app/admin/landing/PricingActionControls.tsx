"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Loader2, Plus, Trash2 } from "lucide-react";

export function DeletePlanButton({
  onDeletePlan,
}: {
  onDeletePlan: () => Promise<void>;
}) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await onDeletePlan();
        toast.success("Paket berhasil dihapus");
      } catch {
        toast.error("Gagal menghapus paket");
      }
    });
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className="flex items-center gap-1.5 bg-red-50 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60 text-red-600 px-4 py-2 rounded-xl text-sm font-semibold transition"
    >
      {isPending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Trash2 className="h-4 w-4" />
      )}
      Hapus Paket
    </button>
  );
}

export function DeleteFeatureButton({
  onDeleteFeature,
  ariaLabel = "Hapus fitur",
}: {
  onDeleteFeature: () => Promise<void>;
  ariaLabel?: string;
}) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await onDeleteFeature();
        toast.success("Fitur berhasil dihapus");
      } catch {
        toast.error("Gagal menghapus fitur");
      }
    });
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className="flex items-center justify-center h-9 w-9 shrink-0 bg-red-50 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60 text-red-600 rounded-xl transition"
      aria-label={ariaLabel}
    >
      {isPending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Trash2 className="h-4 w-4" />
      )}
    </button>
  );
}

export function AddFeatureControl({
  onAddFeature,
}: {
  onAddFeature: (name: string) => Promise<void>;
}) {
  const [name, setName] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleAdd = () => {
    const trimmedName = name.trim();

    if (!trimmedName) {
      toast.error("Nama fitur wajib diisi");
      return;
    }

    startTransition(async () => {
      try {
        await onAddFeature(trimmedName);
        setName("");
        toast.success("Fitur berhasil ditambahkan");
      } catch {
        toast.error("Gagal menambahkan fitur");
      }
    });
  };

  return (
    <div className="flex gap-2 pt-1">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">
        <Plus className="h-4 w-4" />
      </span>
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Tambah fitur baru..."
        className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
      />

      <button
        type="button"
        onClick={handleAdd}
        disabled={isPending}
        className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60 text-white px-4 py-2 rounded-xl text-sm font-semibold transition shrink-0"
      >
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Plus className="h-4 w-4" />
        )}
        Tambah
      </button>
    </div>
  );
}