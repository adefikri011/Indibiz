import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/* ===========================
   FAQ SEED
=========================== */

const faqSeedData = [
  {
    question: "Apakah internet INDIBIZ benar-benar unlimited tanpa FUP?",
    answer:
      "Ya. Semua paket INDIBIZ menggunakan sistem unlimited tanpa pembatasan Fair Usage Policy (FUP), sehingga Anda bisa menggunakan internet secara maksimal untuk kebutuhan bisnis.",
    order: 1,
  },
  {
    question: "Berapa lama proses pemasangan setelah daftar?",
    answer:
      "Proses pemasangan memiliki estimasi waktu 1–3 hari kerja setelah survei lokasi dan konfirmasi teknis selesai dilakukan.",
    order: 2,
  },
  {
    question: "Apakah tersedia untuk semua area Bandung & Sumedang?",
    answer:
      "Tersedia diseluruh wilayah Indonesia. Bandung dan Sumedang merupakan area teritori kami, namun Anda dari seluruh Indonesia tetap bisa melakukan registrasi melalui website ini.",
    order: 3,
  },
  {
    question: "Apakah ada biaya tambahan selain biaya paket bulanan?",
    answer:
      "Tidak ada biaya tersembunyi. Promo saat ini memberikan diskon 70% biaya pasang baru, dan tagihan bulanan dibayarkan di bulan berikutnya.",
    order: 4,
  },
  {
    question: "Apakah cocok untuk live streaming dan kantor?",
    answer:
      "Sangat cocok. Dengan rasio upload dan download 1:1 simetris serta jaringan fiber optik stabil, layanan ini ideal untuk live streaming, kantor, UMKM, hingga corporate.",
    order: 5,
  },
];

/* ===========================
   HELPER
=========================== */

async function createPlan(
  productId: string,
  speed: number,
  price: number,
  order: number,
  features: string[]
) {
  const plan = await prisma.pricingPlan.create({
    data: {
      productId,
      speed,
      normalPrice: price,
      price: price,
      isPopular: false,
      order,
    },
  });

  for (const feature of features) {
    await prisma.pricingFeature.create({
      data: {
        name: feature,
        planId: plan.id,
      },
    });
  }
}

/* ===========================
   PRICING SEED
=========================== */

async function seedPricing() {
  console.log("🗑 Menghapus semua data pricing lama...");

  await prisma.pricingFeature.deleteMany();
  await prisma.pricingPlan.deleteMany();
  await prisma.pricingProduct.deleteMany();
  await prisma.pricingCategory.deleteMany();

  /* ===========================
     HSI + NETMON
  ============================ */

  const netmonCategory = await prisma.pricingCategory.create({
    data: {
      name: "HSI BISNIS 2S (INTERNET + NETMON)",
      order: 1,
    },
  });

  const netmonProduct = await prisma.pricingProduct.create({
    data: {
      name: "NETMON HI",
      categoryId: netmonCategory.id,
      order: 1,
    },
  });

  const netmonPrices = [
    { speed: 50, price: 462000 },
    { speed: 75, price: 540000 },
    { speed: 100, price: 685000 },
    { speed: 150, price: 830000 },
    { speed: 200, price: 1055000 },
  ];

  for (let i = 0; i < netmonPrices.length; i++) {
    await createPlan(
      netmonProduct.id,
      netmonPrices[i].speed,
      netmonPrices[i].price,
      i,
      ["NETMON HI"]
    );
  }

  /* ===========================
     HSI + PIJAR SEKOLAH
  ============================ */

  const pijarCategory = await prisma.pricingCategory.create({
    data: {
      name: "HSI BISNIS 2S (INTERNET + PIJAR SEKOLAH)",
      order: 2,
    },
  });

  const pijarProduct = await prisma.pricingProduct.create({
    data: {
      name: "Pijar Sekolah Flatrate",
      categoryId: pijarCategory.id,
      order: 1,
    },
  });

  const pijarPrices = [
    { speed: 50, price: 1022000 },
    { speed: 75, price: 1102000 },
    { speed: 100, price: 1252000 },
    { speed: 150, price: 1402000 },
    { speed: 200, price: 1632000 },
  ];

  for (let i = 0; i < pijarPrices.length; i++) {
    await createPlan(
      pijarProduct.id,
      pijarPrices[i].speed,
      pijarPrices[i].price,
      i,
      ["Pijar Sekolah Flatrate"]
    );
  }

  /* ===========================
     HSI + ANTARES EAZY
  ============================ */

  const antaresCategory = await prisma.pricingCategory.create({
    data: {
      name: "HSI BISNIS 2S (ANTARES EAZY)",
      order: 3,
    },
  });

  const antaresProduct = await prisma.pricingProduct.create({
    data: {
      name: "IP Camera Antares Eazy Indoor - K5",
      categoryId: antaresCategory.id,
      order: 1,
    },
  });

  const antaresPrices = [
    { speed: 50, price: 474000 },
    { speed: 75, price: 554000 },
    { speed: 100, price: 704000 },
    { speed: 150, price: 854000 },
    { speed: 200, price: 1084000 },
    { speed: 300, price: 1534000 },
  ];

  for (let i = 0; i < antaresPrices.length; i++) {
    await createPlan(
      antaresProduct.id,
      antaresPrices[i].speed,
      antaresPrices[i].price,
      i,
      ["IP Camera Antares Eazy Indoor - K5"]
    );
  }

  /* ===========================
     HSI + OCA
  ============================ */

  const ocaCategory = await prisma.pricingCategory.create({
    data: {
      name: "HSI BISNIS 2S (INTERNET + OCA)",
      order: 4,
    },
  });

  const ocaBlast = await prisma.pricingProduct.create({
    data: {
      name: "OCA Blast Lite",
      categoryId: ocaCategory.id,
      order: 1,
    },
  });

  const ocaInteraction = await prisma.pricingProduct.create({
    data: {
      name: "OCA Interaction Lite",
      categoryId: ocaCategory.id,
      order: 2,
    },
  });

  const ocaBlastPrices = [
    668900, 746900, 891900, 1036900, 1261900, 1708900,
  ];

  const ocaInteractionPrices = [
    543000, 623000, 773000, 923000, 1153000,
  ];

  const speeds = [50, 75, 100, 150, 200, 300];

  for (let i = 0; i < ocaBlastPrices.length; i++) {
    await createPlan(
      ocaBlast.id,
      speeds[i],
      ocaBlastPrices[i],
      i,
      ["OCA Blast Lite"]
    );
  }

  for (let i = 0; i < ocaInteractionPrices.length; i++) {
    await createPlan(
      ocaInteraction.id,
      speeds[i],
      ocaInteractionPrices[i],
      i,
      ["OCA Interaction Lite"]
    );
  }

  /* ===========================
     WMS STANDAR
  ============================ */

  const wmsStandar = await prisma.pricingCategory.create({
    data: {
      name: "WMS Standar",
      order: 5,
    },
  });

  const wmsStandarProducts = [
    { name: "WMS Silver", speed: 20, price: 435000 },
    { name: "WMS Gold", speed: 50, price: 950000 },
    { name: "WMS Platinum", speed: 100, price: 1500000 },
    { name: "WMS Titanium", speed: 150, price: 2400000 },
    { name: "WMS Diamond", speed: 200, price: 3050000 },
    { name: "WMS Crown", speed: 300, price: 4500000 },
  ];

  for (let i = 0; i < wmsStandarProducts.length; i++) {
    const product = await prisma.pricingProduct.create({
      data: {
        name: wmsStandarProducts[i].name,
        categoryId: wmsStandar.id,
        order: i,
      },
    });

    await createPlan(
      product.id,
      wmsStandarProducts[i].speed,
      wmsStandarProducts[i].price,
      0,
      ["Diskon PSB 70%"]
    );
  }

  console.log("✅ Pricing seed berhasil dibuat ulang sesuai gambar.");
}

/* ===========================
   FAQ SEED
=========================== */

async function seedFaqs() {
  await prisma.faq.deleteMany();

  for (const faq of faqSeedData) {
    await prisma.faq.create({ data: faq });
  }

  console.log("✅ FAQ berhasil dibuat ulang.");
}

/* ===========================
   MAIN
=========================== */

async function main() {
  await seedPricing();
  await seedFaqs();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });