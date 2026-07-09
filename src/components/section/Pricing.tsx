import Container from "@/components/ui/Container";
import Link from "next/link";
import { Check, Star } from "lucide-react";

const plans = [
  {
    speed: "50 Mbps",
    price: "355",
    features: [
      "Kecepatan Tinggi",
      "Kuota Unlimited",
      "Rasio UL:DL 1:1",
      "100% Fiber Optik",
    ],
    popular: false,
  },
  {
    speed: "100 Mbps",
    price: "535",
    features: [
      "Kecepatan Tinggi",
      "Kuota Unlimited",
      "Rasio UL:DL 1:1",
      "100% Fiber Optik",
      "ONT/Modem Premium",
    ],
    popular: true,
  },
  {
    speed: "200 Mbps",
    price: "835",
    features: [
      "Kecepatan Tinggi",
      "Kuota Unlimited",
      "Rasio UL:DL 1:1",
      "100% Fiber Optik",
      "ONT/Modem Premium",
      "Priority Support",
    ],
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-16 md:py-24 bg-[#F8FAFC]">
      <Container>
        {/* Judul Section (Rata Tengah) */}
        <div className="mb-14 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Pilih <span className="text-primary">Paket</span> Sesuai Kebutuhan
          </h2>
          <p className="text-muted text-lg">
            Harga terjangkau, kualitas enterprise. Semua paket sudah termasuk unlimited tanpa FUP dan tagihan flat.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`
                relative rounded-2xl p-8 flex flex-col transition-all duration-300
                ${
                  plan.popular
                    ? "bg-primary text-white shadow-2xl shadow-primary/20 scale-[1.02] border-2 border-primary"
                    : "bg-white text-foreground border border-gray-100 hover:shadow-lg hover:border-primary/20"
                }
              `}
            >
              {/* Badge Populer */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 bg-amber-400 text-amber-900 text-sm font-bold px-4 py-1.5 rounded-full shadow-md">
                    <Star className="w-4 h-4 fill-amber-900" />
                    TERPOPULER
                  </span>
                </div>
              )}

              {/* Kecepatan */}
              <h3
                className={`text-xl font-bold mb-6 mt-2 text-center ${
                  plan.popular ? "text-white" : "text-foreground"
                }`}
              >
                {plan.speed}
              </h3>

              {/* Harga */}
              <div className="mb-6 text-center">
                <div className="flex items-baseline justify-center gap-1">
                  <span
                    className={`text-sm font-medium ${
                      plan.popular ? "text-blue-100" : "text-muted"
                    }`}
                  >
                    Rp
                  </span>
                  <span className="text-5xl font-extrabold tracking-tight">
                    {plan.price}
                  </span>
                  <span
                    className={`text-sm font-medium ${
                      plan.popular ? "text-blue-100" : "text-muted"
                    }`}
                  >
                    rb/bln
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div
                className={`h-px w-full mb-6 ${
                  plan.popular ? "bg-white/20" : "bg-gray-100"
                }`}
              />

              {/* Fitur */}
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                        plan.popular ? "bg-white/20" : "bg-primary/10"
                      }`}
                    >
                      <Check
                        className={`w-3 h-3 ${
                          plan.popular ? "text-white" : "text-primary"
                        }`}
                      />
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        plan.popular ? "text-blue-50" : "text-muted"
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Tombol CTA */}
              <Link
                href={`https://wa.me/6285189300718?text=Halo,%20saya%20tertarik%20dengan%20paket%20INDIBIZ%20${plan.speed}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  w-full py-3 rounded-xl font-semibold text-center transition-all duration-200 block
                  ${
                    plan.popular
                      ? "bg-white text-primary hover:bg-blue-50 shadow-lg"
                      : "bg-primary text-white hover:bg-primary-dark shadow-md"
                  }
                `}
              >
                Pilih Paket
              </Link>
            </div>
          ))}
        </div>

        {/* Info Tambahan */}
        <div className="mt-12 text-center">
          <p className="text-muted text-sm">
            ✨ Diskon <span className="font-bold text-primary">70%</span> biaya pasang baru &mdash; Bayar bulan pertama di bulan berikutnya
          </p>
        </div>
      </Container>
    </section>
  );
}