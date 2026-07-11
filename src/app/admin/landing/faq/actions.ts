"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const ADMIN_PATH = "/admin/landing/faq";
const PUBLIC_PATH = "/";

/**
 * Tambah FAQ baru.
 * Order otomatis diletakkan paling akhir (setelah FAQ yang sudah ada).
 */
export async function createFaq(formData: FormData) {
  const question = formData.get("question") as string;
  const answer = formData.get("answer") as string;

  if (!question?.trim() || !answer?.trim()) return;

  const last = await prisma.faq.findFirst({
    orderBy: { order: "desc" },
  });

  await prisma.faq.create({
    data: {
      question: question.trim(),
      answer: answer.trim(),
      order: (last?.order ?? 0) + 1,
    },
  });

  revalidatePath(ADMIN_PATH);
  revalidatePath(PUBLIC_PATH);
}

/**
 * Update pertanyaan & jawaban FAQ yang sudah ada.
 */
export async function updateFaq(formData: FormData) {
  const id = formData.get("id") as string;
  const question = formData.get("question") as string;
  const answer = formData.get("answer") as string;

  if (!id) return;

  await prisma.faq.update({
    where: { id },
    data: {
      question: question?.trim(),
      answer: answer?.trim(),
    },
  });

  revalidatePath(ADMIN_PATH);
  revalidatePath(PUBLIC_PATH);
}

/**
 * Hapus FAQ.
 */
export async function deleteFaq(id: string) {
  if (!id) return;

  await prisma.faq.delete({ where: { id } });

  revalidatePath(ADMIN_PATH);
  revalidatePath(PUBLIC_PATH);
}

/**
 * Pindahkan urutan FAQ naik satu posisi (tukar 'order' dengan FAQ di atasnya).
 */
export async function moveFaqUp(id: string) {
  const current = await prisma.faq.findUnique({ where: { id } });
  if (!current) return;

  const above = await prisma.faq.findFirst({
    where: { order: { lt: current.order } },
    orderBy: { order: "desc" },
  });
  if (!above) return; // sudah paling atas

  await prisma.$transaction([
    prisma.faq.update({ where: { id: current.id }, data: { order: above.order } }),
    prisma.faq.update({ where: { id: above.id }, data: { order: current.order } }),
  ]);

  revalidatePath(ADMIN_PATH);
  revalidatePath(PUBLIC_PATH);
}

/**
 * Pindahkan urutan FAQ turun satu posisi (tukar 'order' dengan FAQ di bawahnya).
 */
export async function moveFaqDown(id: string) {
  const current = await prisma.faq.findUnique({ where: { id } });
  if (!current) return;

  const below = await prisma.faq.findFirst({
    where: { order: { gt: current.order } },
    orderBy: { order: "asc" },
  });
  if (!below) return; // sudah paling bawah

  await prisma.$transaction([
    prisma.faq.update({ where: { id: current.id }, data: { order: below.order } }),
    prisma.faq.update({ where: { id: below.id }, data: { order: current.order } }),
  ]);

  revalidatePath(ADMIN_PATH);
  revalidatePath(PUBLIC_PATH);
}