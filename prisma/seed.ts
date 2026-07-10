import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Hapus data lama dulu (biar tidak double)
  await prisma.pricingFeature.deleteMany();
  await prisma.pricingPlan.deleteMany();

  const features = [
    "Kuota Unlimited Tanpa FUP",
    "Rasio UL:DL 1:1 Simetris",
    "100% Fiber Optik",
    "ONT/Modem Premium",
    "Tagihan Flat Setiap Bulan",
    "Service 3 ON 3",
  ];

  const plans = [
    { speed: 50, normalPrice: 405000, price: 355000, isPopular: false },
    { speed: 75, normalPrice: 472000, price: 415000, isPopular: false },
    { speed: 100, normalPrice: 605000, price: 535000, isPopular: true },
    { speed: 150, normalPrice: 795000, price: 620000, isPopular: false },
    { speed: 200, normalPrice: 995000, price: 790000, isPopular: false },
    { speed: 300, normalPrice: 1320000, price: 1130000, isPopular: false },
  ];

  for (let i = 0; i < plans.length; i++) {
    const plan = plans[i];

    const createdPlan = await prisma.pricingPlan.create({
      data: {
        speed: plan.speed,
        normalPrice: plan.normalPrice,
        price: plan.price,
        isPopular: plan.isPopular,
        order: i,
      },
    });

    for (const feature of features) {
      await prisma.pricingFeature.create({
        data: {
          name: feature,
          planId: createdPlan.id,
        },
      });
    }
  }

  console.log("✅ Pricing seed berhasil dibuat");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });