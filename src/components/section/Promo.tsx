import Container from "@/components/ui/Container";
import Link from "next/link";
import { Gift, ArrowRight } from "lucide-react";

export default function Promo() {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-primary to-primary-dark text-white overflow-hidden relative">
      {/* Efek Glow Background (Biar makin premium) */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-60 h-60 bg-white/10 rounded-full blur-3xl"></div>

      <Container>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          
          {/* Teks Promo */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border border-white/20">
              <Gift className="w-4 h-4" />
              Promo Terbatas
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
              Diskon <span className="text-amber-300">70%</span> Biaya Pasang Baru!
            </h2>
            
            <p className="text-blue-100 text-lg md:text-xl leading-relaxed">
              Jangan lewatkan kesempatan ini. Nikmati internet bisnis premium dengan harga spesial.
              <br className="hidden md:block" />
              <span className="font-medium text-white">Bayar paket bulanan di bulan berikutnya.</span>
            </p>
          </div>

          {/* Tombol CTA */}
          <div className="flex-shrink-0">
            <Link
              href="https://wa.me/6285189300718?text=Halo,%20saya%20mau%20klaim%20promo%20diskon%2070%25%20pasang%20baru%20INDIBIZ"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-xl font-bold text-lg hover:bg-amber-50 hover:scale-105 transition-all duration-300 shadow-xl"
            >
              Klaim Promo Sekarang
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

        </div>
      </Container>
    </section>
  );
}