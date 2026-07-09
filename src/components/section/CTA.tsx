import Container from "@/components/ui/Container";
import Link from "next/link";
import { MessageCircle, Sparkles } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <Container>
        <div className="max-w-3xl mx-auto text-center space-y-6">
          
          {/* Badge Kecil */}
          <div className="inline-flex items-center gap-2 text-primary bg-primary/10 px-4 py-1.5 rounded-full text-sm font-semibold">
            <Sparkles className="w-4 h-4" />
            Ciptakan Peluang, Wujudkan Harapan
          </div>

          {/* Headline */}
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground leading-tight">
            Jadilah Konsumen yang Cerdas dan Bijak. <br className="hidden md:block" />
            <span className="text-primary">Ada Harga, Ada Kualitas.</span>
          </h2>

          {/* Subheadline */}
          <p className="text-muted text-lg md:text-xl max-w-2xl mx-auto">
            Jangan biarkan internet lambat menghambat bisnis Anda. Beralih ke INDIBIZ sekarang dan rasakan perbedaannya.
          </p>

          {/* Tombol CTA Besar */}
          <div className="pt-4">
            <Link
              href="https://wa.me/6285189300718?text=Halo,%20saya%20ingin%20berlangganan%20INDIBIZ"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary-dark transition-all duration-300 shadow-xl shadow-primary/20 hover:scale-105"
            >
              <MessageCircle className="w-6 h-6" />
              Hubungi Kami via WhatsApp
            </Link>
            <p className="text-sm text-muted mt-4">
              Konsultasi gratis & respon cepat
            </p>
          </div>

        </div>
      </Container>
    </section>
  );
}