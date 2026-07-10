"use client";

import { useTransition } from "react";
import { toast } from "sonner";

export default function PricingForm({
  children,
  action,
}: {
  children: React.ReactNode;
  action: (formData: FormData) => Promise<void>;
}) {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      await action(formData);
      toast.success("Perubahan berhasil disimpan ");
    });
  };

  return (
    <form action={handleSubmit}>
      {children}
    </form>
  );
}