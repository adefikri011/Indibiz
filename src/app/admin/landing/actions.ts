"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createCategory(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;

  if (!name) return;

  const lastCategory = await prisma.pricingCategory.findFirst({
    orderBy: { order: "desc" },
  });

  const nextOrder = lastCategory ? lastCategory.order + 1 : 0;

  await prisma.pricingCategory.create({
    data: {
      name,
      description: description || null,
      order: nextOrder,
    },
  });

  revalidatePath("/admin/landing");
}

export async function updateCategory(formData: FormData) {
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;

  if (!id || !name) return;

  await prisma.pricingCategory.update({
    where: { id },
    data: {
      name,
      description: description || null,
    },
  });

  revalidatePath("/admin/landing");
}

export async function deleteCategory(id: string) {
  if (!id) return;

  // Cascade akan handle Product → Plan → Feature otomatis
  await prisma.pricingCategory.delete({
    where: { id },
  });

  revalidatePath("/admin/landing");
}

export async function createProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const categoryId = formData.get("categoryId") as string;

  if (!name || !categoryId) return;

  const lastProduct = await prisma.pricingProduct.findFirst({
    where: { categoryId },
    orderBy: { order: "desc" },
  });

  const nextOrder = lastProduct ? lastProduct.order + 1 : 0;

  await prisma.pricingProduct.create({
    data: {
      name,
      categoryId,
      order: nextOrder,
    },
  });

  revalidatePath("/admin/landing");
}

export async function updateProduct(formData: FormData) {
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;

  if (!id || !name) return;

  await prisma.pricingProduct.update({
    where: { id },
    data: { name },
  });

  revalidatePath("/admin/landing");
}

export async function deleteProduct(id: string) {
  if (!id) return;

  // Cascade akan handle Plan → Feature otomatis
  await prisma.pricingProduct.delete({
    where: { id },
  });

  revalidatePath("/admin/landing");
}

export async function createPricing(formData: FormData) {
  const productId = formData.get("productId") as string;
  const speed = Number(formData.get("speed"));
  const normalPrice = Number(formData.get("normalPrice"));
  const priceRaw = Number(formData.get("price"));

  if (!productId) return;

  const price = priceRaw === 0 ? normalPrice : priceRaw;

  const lastPlan = await prisma.pricingPlan.findFirst({
    where: { productId },
    orderBy: { order: "desc" },
  });

  const nextOrder = lastPlan ? lastPlan.order + 1 : 0;

  await prisma.pricingPlan.create({
    data: {
      productId,
      speed,
      normalPrice,
      price,
      order: nextOrder,
      isPopular: false,
    },
  });

  revalidatePath("/admin/landing");
}

export async function updatePricing(formData: FormData) {
  const id = formData.get("id") as string;
  const normalPrice = Number(formData.get("normalPrice"));
  const priceRaw = Number(formData.get("price"));
  const isPopular = formData.get("isPopular") === "on";

  if (!id) return;

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

export async function deletePricing(id: string) {
  if (!id) return;

  await prisma.pricingPlan.delete({
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

  await prisma.pricingFeature.delete({
    where: { id },
  });

  revalidatePath("/admin/landing");
}