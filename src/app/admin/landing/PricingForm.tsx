"use client";

import { useTransition } from "react";
import { toast } from "sonner";

export default function PricingForm({
  children,
  action,
  successMessage = "Perubahan berhasil disimpan",
  errorMessage = "Gagal menyimpan perubahan",
}: {
  children: React.ReactNode;
  action: (formData: FormData) => Promise<void>;
  successMessage?: string;
  errorMessage?: string;
}) {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      try {
        await action(formData);
        toast.success(successMessage);
      } catch {
        toast.error(errorMessage);
      }
    });
  };

  return (
    <form action={handleSubmit}>
      {children}
    </form>
  );
}