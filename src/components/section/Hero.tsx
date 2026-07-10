import Container from "@/components/ui/Container";
import WALink from "@/components/ui/WALink";
import { MessageCircle } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="beranda"
      className="pt-6 pb-16 md:pt-8 md:pb-20 bg-white relative overflow-hidden"
    >
      <Container>
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">

          {/* ===== LEFT CONTENT ===== */}
          <div className="flex-1 space-y-5 md:space-y-6 relative z-10 text-center md:text-left">

            <h1
              data-animate="scale"
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              style={{
                ["--animate-delay" as never]: "60ms",
                color: "#0F172A",
              }}
            >
              Internet Bisnis Stabil untuk{" "}
              <span style={{ color: "#2F5FD0" }}>
                Pertumbuhan Usaha Anda
              </span>
            </h1>

            <p
              data-animate
              className="text-base md:text-xl max-w-xl leading-relaxed mx-auto md:mx-0"
              style={{
                ["--animate-delay" as never]: "120ms",
                color: "#64748B",
              }}
            >
              Solusi internet semi-dedicated dengan performa konsisten,
              upload &amp; download simetris, dan tanpa FUP — cocok untuk
              kantor, UMKM, sekolah, hingga live streaming bisnis Anda.
            </p>

            <div className="pt-2 md:pt-4 flex justify-center md:justify-start">
              <WALink href="https://wa.me/6285189300718?text=Halo,%20saya%20ingin%20konsultasi%20paket%20INDIBIZ">
                <div
                  data-animate="slide-left"
                  className="inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-xl font-semibold text-base md:text-lg transition-all duration-300 cursor-pointer hover:scale-[1.02]"
                  style={{
                    ["--animate-delay" as never]: "180ms",
                    backgroundColor: "#2F5FD0",
                    color: "#FFFFFF",
                    boxShadow: "0 12px 30px rgba(47,95,208,0.3)",
                  }}
                >
                  Konsultasi Sekarang
                  <MessageCircle className="w-5 h-5" />
                </div>
              </WALink>
            </div>
          </div>

          {/* ===== RIGHT: ILUSTRASI ===== */}
          <div className="flex-1 w-full flex justify-center relative">

            {/* Blob — hanya muncul di desktop (md ke atas) */}
            <div
              data-animate="scale"
              className="absolute -z-10 hidden md:block"
              style={{
                ["--animate-delay" as never]: "120ms",
                top: "-15%",
                left: "-5%",
                width: "115%",
                height: "130%",
                borderRadius: "40px 120px 120px 40px / 40px 90px 90px 40px",
                background:
                  "linear-gradient(160deg, #E4ECFF 0%, #D6E2FF 55%, #F3F6FF 100%)",
              }}
            />

            {/* Ilustrasi */}
            <div
              data-animate="scale"
              className="w-full max-w-[320px] md:max-w-[480px] relative z-10"
              style={{
                ["--animate-delay" as never]: "140ms",
                filter: "drop-shadow(0 25px 50px rgba(29,78,216,0.15))",
              }}
            >
              <object
                type="image/svg+xml"
                data="/illustrations/online-connection.svg"
                className="w-full h-auto"
              />
            </div>

          </div>

        </div>
      </Container>
    </section>
  );
}