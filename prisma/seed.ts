import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

async function seedPricing() {
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

async function seedFaqs() {
  const existingCount = await prisma.faq.count();

  if (existingCount > 0) {
    console.log(
      `⚠️  Tabel Faq sudah berisi ${existingCount} data. Seed FAQ dilewati supaya tidak duplikat.`
    );
    console.log(
      "   Kalau mau seed ulang dari awal, kosongkan dulu tabelnya lewat halaman admin atau Prisma Studio."
    );
    return;
  }

  for (const faq of faqSeedData) {
    await prisma.faq.create({ data: faq });
  }

  console.log(`✅ Berhasil menambahkan ${faqSeedData.length} FAQ awal.`);
}

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