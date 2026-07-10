import Container from "@/components/ui/Container";
import { Wifi, Zap, ShieldCheck, Infinity } from "lucide-react";

const benefits = [
  {
    icon: Wifi,
    title: "Jaringan Stabil",
    desc: "Koneksi konsisten tanpa gangguan untuk mendukung operasional bisnis setiap hari.",
  },
  {
    icon: Zap,
    title: "Rasio 1:1 Simetris",
    desc: "Kecepatan upload dan download seimbang, ideal untuk meeting online & live streaming.",
  },
  {
    icon: ShieldCheck,
    title: "100% Fiber Optik",
    desc: "Teknologi fiber optik modern untuk performa cepat dan latensi rendah.",
  },
  {
    icon: Infinity,
    title: "Unlimited Tanpa FUP",
    desc: "Tanpa pembatasan kuota sehingga aktivitas bisnis tetap optimal sepanjang waktu.",
  },
];

export default function Benefits() {
  return (
    <section id="keunggulan" className="py-16 md:py-24 bg-[#F8FAFC]">
      <Container>

        {/* Heading */}
        <div className="mb-10 md:mb-14 max-w-3xl mx-auto md:mx-0 text-center md:text-left">
          <h2
            data-animate="scale"
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
            style={{ ["--animate-delay" as never]: "40ms" }}
          >
            Kenapa Memilih{" "}
            <span style={{ color: "#2F5FD0" }}>
              INDIBIZ
            </span>
            ?
          </h2>

          <p
            data-animate
            className="text-slate-600 text-base md:text-lg leading-relaxed"
            style={{ ["--animate-delay" as never]: "120ms" }}
          >
            Layanan internet semi-dedicated dengan performa profesional untuk
            menunjang pertumbuhan usaha, kantor, hingga kebutuhan digital skala besar.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto md:max-w-full">
          {benefits.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                data-animate="scale"
                className="group p-6 md:p-8 rounded-3xl transition-all duration-300 hover:-translate-y-1"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  boxShadow: "0 8px 20px rgba(15,23,42,0.04)",
                }}
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center mb-5 md:mb-6 transition-all duration-300"
                  style={{
                    backgroundColor: "#EEF2FF",
                    color: "#2F5FD0",
                  }}
                >
                  <Icon className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:scale-110" />
                </div>

                {/* Title */}
                <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-3 transition-colors duration-300 group-hover:text-[#2F5FD0]">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                  {item.desc}
                </p>

                {/* Subtle Hover Border Effect */}
                <div
                  className="absolute inset-0 rounded-3xl pointer-events-none transition-all duration-300 opacity-0 group-hover:opacity-100"
                  style={{
                    border: "1px solid #2F5FD0",
                  }}
                />
              </div>
            );
          })}
        </div>

      </Container>
    </section>
  );
}