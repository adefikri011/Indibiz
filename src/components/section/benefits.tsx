import Container from "@/components/ui/Container";
import { Wifi, Zap, ShieldCheck, Infinity } from "lucide-react";

const benefits = [
  {
    icon: <Wifi className="w-6 h-6 text-primary" />,
    title: "Jaringan Stabil",
    desc: "Koneksi tanpa gangguan untuk mendukung semua aktivitas bisnis Anda setiap hari.",
  },
  {
    icon: <Zap className="w-6 h-6 text-primary" />,
    title: "Ratio 1:1 Simetris",
    desc: "Kecepatan upload dan download yang sama, sangat cocok untuk live streaming & cloud.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-primary" />,
    title: "100% Fiber Optik",
    desc: "Menggunakan teknologi kabel serat optik terkini untuk koneksi yang lebih cepat dan andal.",
  },
  {
    icon: <Infinity className="w-6 h-6 text-primary" />,
    title: "Unlimited Tanpa FUP",
    desc: "Nikmati internet sepuasnya tanpa batas kuota (Fair Usage Policy) yang membatasi.",
  },
];

export default function Benefits() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <Container>
        {/* Judul Section (Rata Kiri) */}
        <div className="mb-12 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Kenapa Memilih <span className="text-primary">INDIBIZ</span>?
          </h2>
          <p className="text-muted text-lg">
            Solusi internet semi-dedicated yang dirancang khusus untuk kebutuhan bisnis, perkantoran, hingga content creator.
          </p>
        </div>

        {/* Grid 2x2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl border border-gray-100 bg-[#F8FAFC] hover:shadow-lg hover:border-primary/20 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-4 border border-gray-50">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-muted leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}