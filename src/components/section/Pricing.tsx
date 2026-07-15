import { prisma } from "@/lib/prisma";
import PricingClient from "./PricingClient";

export const dynamic = "force-dynamic";

export default async function Pricing() {
  const plans = await prisma.pricingPlan.findMany({
    orderBy: { 
      product: {
        category: {
          order: "asc"
        }
      }
    },
    include: {
      features: true,
      product: {
        include: {
          category: true,
        },
      },
    },
  });

  if (!plans || plans.length === 0) {
    return null;
  }

  return <PricingClient plans={plans} />;
}