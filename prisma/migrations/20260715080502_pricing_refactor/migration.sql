-- AlterTable
ALTER TABLE "PricingPlan" ADD COLUMN     "productId" TEXT;

-- CreateTable
CREATE TABLE "PricingCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PricingCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PricingProduct" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "categoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PricingProduct_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PricingProduct" ADD CONSTRAINT "PricingProduct_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "PricingCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PricingPlan" ADD CONSTRAINT "PricingPlan_productId_fkey" FOREIGN KEY ("productId") REFERENCES "PricingProduct"("id") ON DELETE CASCADE ON UPDATE CASCADE;
