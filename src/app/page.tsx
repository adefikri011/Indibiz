import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/section/Hero";
import Benefits from "@/components/section/benefits";
import Pricing from "@/components/section/Pricing";
import PromoAndCTA from "@/components/section/PromoAndCTA";
import FAQ from "@/components/section/FAQ";
import Footer from "@/components/layout/Footer";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const dynamic = "force-dynamic";

export default async function Home() {
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

        {/* ✅ Tidak kirim props lagi */}
        <ScrollReveal delay={160}>
          <Pricing />
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