import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/section/Hero";
import Benefits from "@/components/section/benefits";
import Pricing from "@/components/section/Pricing";
import Promo from "@/components/section/Promo";
import CTA from "@/components/section/CTA";
import Footer from "@/components/layout/Footer";
import FAQ from "@/components/section/FAQ";
import PromoAndCTA from "@/components/section/PromoAndCTA";


export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Benefits />
        <Pricing />
        {/* <Promo /> */}
        <PromoAndCTA />
        <FAQ />
        <Footer />
      </main>
    </>
  );
}