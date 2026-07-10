import { prisma } from "@/lib/prisma";
import PricingClient from "./PricingClient";

export default async function Pricing() {
  const plans = await prisma.pricingPlan.findMany({
    include: { features: true },
    orderBy: { order: "asc" },
  });

  return <PricingClient plans={plans} />;
}