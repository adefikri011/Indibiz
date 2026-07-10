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
        <div className="flex flex-col md:flex-row items-center gap-16">

          {/* ===== LEFT CONTENT (tetap putih polos) ===== */}
          <div className="flex-1 space-y-6 relative z-10">

            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              style={{ color: "#0F172A" }}
            >
              Internet Bisnis Stabil untuk{" "}
              <span style={{ color: "#1D4ED8" }}>
                Pertumbuhan Usaha Anda
              </span>
            </h1>

            <p
              className="text-lg md:text-xl max-w-xl leading-relaxed"
              style={{ color: "#64748B" }}
            >
              Solusi internet semi-dedicated dengan performa konsisten,
              upload &amp; download simetris, dan tanpa FUP — cocok untuk
              kantor, UMKM, sekolah, hingga live streaming bisnis Anda.
            </p>

            <div className="pt-4">
              <WALink href="https://wa.me/6285189300718?text=Halo,%20saya%20ingin%20konsultasi%20paket%20INDIBIZ">
                <div
                  className="inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-xl font-semibold text-lg transition-all duration-300 cursor-pointer hover:scale-[1.02]"
                  style={{
                    backgroundColor: "#1D4ED8",
                    color: "#FFFFFF",
                    boxShadow: "0 12px 30px rgba(29,78,216,0.3)",
                  }}
                >
                  Konsultasi Sekarang
                  <MessageCircle className="w-5 h-5" />
                </div>
              </WALink>
            </div>
          </div>

          {/* ===== RIGHT: BLOB LOKAL + SVG ===== */}
          <div className="flex-1 w-full flex justify-center relative">

            {/* Blob gradient — hanya di area ini, bukan full section.
               Bentuknya besar, rata di pojok kanan-atas, meniru wireframe */}
            <div
              className="absolute -z-10"
              style={{
                top: "-15%",
                left: "-5%",
                width: "115%",
                height: "130%",
                borderRadius: "40px 120px 120px 40px / 40px 90px 90px 40px",
                background:
                  "linear-gradient(160deg, #E4ECFF 0%, #D6E2FF 55%, #F3F6FF 100%)",
              }}
            />

            <div
              className="w-full max-w-[480px] relative z-10"
              style={{
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