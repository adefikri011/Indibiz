"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updatePricing(formData: FormData) {
  const id = formData.get("id") as string;
  const normalPrice = Number(formData.get("normalPrice"));
  const priceRaw = Number(formData.get("price"));
  const isPopular = formData.get("isPopular") === "on";

  const price = priceRaw === 0 ? normalPrice : priceRaw;

  if (isPopular) {
    await prisma.pricingPlan.updateMany({
      data: { isPopular: false },
    });
  }

  await prisma.pricingPlan.update({
    where: { id },
    data: {
      normalPrice,
      price,
      isPopular,
    },
  });

  const features = await prisma.pricingFeature.findMany({
    where: { planId: id },
  });

  for (const feature of features) {
    const newName = formData.get(`feature_${feature.id}`) as string;
    if (newName && newName !== feature.name) {
      await prisma.pricingFeature.update({
        where: { id: feature.id },
        data: { name: newName },
      });
    }
  }

  revalidatePath("/admin/landing");
}

export async function createPricing(formData: FormData) {
  const speed = Number(formData.get("speed"));
  const normalPrice = Number(formData.get("normalPrice"));
  const priceRaw = Number(formData.get("price"));

  const price = priceRaw === 0 ? normalPrice : priceRaw;

  const lastPlan = await prisma.pricingPlan.findFirst({
    orderBy: { order: "desc" },
  });

  const nextOrder = lastPlan ? lastPlan.order + 1 : 0;

  await prisma.pricingPlan.create({
    data: {
      speed,
      normalPrice,
      price,
      order: nextOrder,
      isPopular: false,
    },
  });

  revalidatePath("/admin/landing");
}

export async function deletePricing(id: string) {
  if (!id) return;

  await prisma.pricingFeature.deleteMany({
    where: { planId: id },
  });

  await prisma.pricingPlan.deleteMany({
    where: { id },
  });

  revalidatePath("/admin/landing");
}

export async function addFeature(planId: string, name: string) {
  if (!planId || !name) return;

  await prisma.pricingFeature.create({
    data: {
      name,
      planId,
    },
  });

  revalidatePath("/admin/landing");
}

export async function deleteFeature(id: string) {
  if (!id) return;

  await prisma.pricingFeature.deleteMany({
    where: { id },
  });

  revalidatePath("/admin/landing");
}