import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/section/Hero";
import Benefits from "@/components/section/benefits";
import Pricing from "@/components/section/Pricing";
import PromoAndCTA from "@/components/section/PromoAndCTA";
import FAQ from "@/components/section/FAQ";
import Footer from "@/components/layout/Footer";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic"; 

export default async function Home() {
  const plans = await prisma.pricingPlan.findMany({
    include: { features: true },
    orderBy: { order: "asc" },
  });

  return (
    <>
      <Navbar />
      <main>
        <ScrollReveal delay={80}>
          <Hero />
        </ScrollReveal>
        <ScrollReveal delay={120}>
          <Benefits />
        </ScrollReveal>
        <ScrollReveal delay={160}>
          <Pricing plans={plans} /> {/* ✅ Pass sebagai props */}
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <PromoAndCTA />
        </ScrollReveal>
        <ScrollReveal delay={240}>
          <FAQ />
        </ScrollReveal>
        <ScrollReveal delay={280}>
          <Footer />
        </ScrollReveal>
      </main>
    </>
  );
}
