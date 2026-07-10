import Container from "@/components/ui/Container";
import { Wifi, Zap, ShieldCheck, Infinity } from "lucide-react";

const benefits = [
  {
    icon: <Wifi className="w-6 h-6 text-blue-600" />,
    title: "Jaringan Stabil",
    desc: "Koneksi tanpa gangguan untuk mendukung semua aktivitas bisnis Anda setiap hari.",
  },
  {
    icon: <Zap className="w-6 h-6 text-blue-600" />,
    title: "Ratio 1:1 Simetris",
    desc: "Kecepatan upload dan download yang sama, sangat cocok untuk live streaming & cloud.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
    title: "100% Fiber Optik",
    desc: "Menggunakan teknologi kabel serat optik terkini untuk koneksi yang lebih cepat dan andal.",
  },
  {
    icon: <Infinity className="w-6 h-6 text-blue-600" />,
    title: "Unlimited Tanpa FUP",
    desc: "Nikmati internet sepuasnya tanpa batas kuota (Fair Usage Policy) yang membatasi.",
  },
];

export default function Benefits() {
  return (
   <section id="keunggulan" className="py-16 md:py-24 bg-white">
      <Container>
        {/* Heading */}
        <div className="mb-12 max-w-3xl">
          <h2
            data-animate="scale"
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
            style={{ ["--animate-delay" as never]: "40ms" }}
          >
            Kenapa Memilih <span className="text-blue-600">INDIBIZ</span>?
          </h2>
          <p
            data-animate
            className="text-slate-600 text-lg"
            style={{ ["--animate-delay" as never]: "120ms" }}
          >
            Solusi internet semi-dedicated yang dirancang khusus untuk kebutuhan bisnis, perkantoran, hingga content creator.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((item, index) => (
            <div
              data-animate="scale"
              key={index}
              className="p-6 rounded-2xl border border-slate-200 bg-slate-50 hover:shadow-lg transition-all duration-300"
              style={{ ["--animate-delay" as never]: `${index * 90 + 140}ms` }}
            >
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-4 border border-slate-200">
                {item.icon}
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {item.title}
              </h3>

              <p className="text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}