"use client";

import { useTransition } from "react";
import { toast } from "sonner";

type FaqFormProps = {
  /** Server action yang menerima FormData (mis. createFaq, updateFaq) */
  action: (formData: FormData) => Promise<void> | void;
  children: React.ReactNode;
  /** Pesan toast saat berhasil, boleh dikustomisasi per pemakaian */
  successMessage?: string;
  className?: string;
};

export default function FaqForm({
  action,
  children,
  successMessage = "Perubahan berhasil disimpan",
  className,
}: FaqFormProps) {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      try {
        await action(formData);
        toast.success(successMessage);
      } catch (error) {
        toast.error("Gagal menyimpan perubahan, coba lagi.");
      }
    });
  };

  return (
    <form
      action={handleSubmit}
      className={className ?? "space-y-4"}
      aria-busy={isPending}
    >
      <fieldset disabled={isPending} className="contents">
        {children}
      </fieldset>
    </form>
  );
}