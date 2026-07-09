import Container from "@/components/ui/Container";
import Link from "next/link";
import { CheckCircle2, ArrowRight, MessageCircle } from "lucide-react";

export default function Hero() {
  return (
    <section className="py-16 md:py-24 bg-[#F8FAFC]">
      <Container>
        <div className="flex flex-col md:flex-row items-center gap-12">
          
          {/* KOLOM KIRI: Text & CTA */}
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Temukan Internet Andal untuk <span className="text-primary">Semua Kebutuhan</span> Bisnis Anda
            </h1>
            
            <p className="text-lg text-muted max-w-xl">
              Solusi digital pilihan sesuai klasifikasi, skala, dan kebutuhan bisnis Anda. 
              Nikmati jaringan stabil, simetris, dan unlimited tanpa FUP.
            </p>

            {/* Fitur Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {["Transformasi Digital", "Pertumbuhan Bisnis", "Dukungan Berkelanjutan", "Kemudahan Mengelola Layanan"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground font-medium">{item}</span>
                </div>
              ))}
            </div>

            {/* Tombol CTA */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="https://wa.me/6285189300718?text=Halo,%20saya%20tertarik%20dengan%20paket%20INDIBIZ"
                target="_blank"
                className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors shadow-md"
              >
                <MessageCircle className="w-5 h-5" />
                Hubungi via WhatsApp
              </Link>
              
              <Link
                href="#pricing"
                className="inline-flex items-center justify-center gap-2 bg-white text-foreground border border-gray-200 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Lihat Paket
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* KOLOM KANAN: Visual / Gambar */}
          <div className="flex-1 w-full">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-100 bg-white p-2">
              {/* Placeholder Image (Bisa diganti gambar asli nanti) */}
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Indibiz Business Internet" 
                className="w-full h-auto rounded-xl object-cover"
              />
              
              {/* Floating Card (Hiasan biar mirip referensi) */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-gray-100 hidden md:block">
                <h3 className="font-bold text-foreground text-lg">Indibiz Ekosistem</h3>
                <p className="text-sm text-muted mt-1">Solusi internet terbaik untuk UMKM, Perkantoran, hingga Corporate.</p>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}