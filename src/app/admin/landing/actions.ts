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