import PricingClient from "./PricingClient";
import { Prisma } from "@prisma/client";

type PlanWithFeatures = Prisma.PricingPlanGetPayload<{
  include: { features: true };
}>;

type Props = {
  plans: PlanWithFeatures[];
};

export default function Pricing({ plans }: Props) {
  return <PricingClient plans={plans} />;
}