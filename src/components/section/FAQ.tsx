"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Apakah internet INDIBIZ benar-benar unlimited tanpa FUP?",
    answer:
      "Ya. Semua paket INDIBIZ menggunakan sistem unlimited tanpa pembatasan Fair Usage Policy (FUP), sehingga Anda bisa menggunakan internet secara maksimal untuk kebutuhan bisnis.",
  },
  {
    question: "Berapa lama proses pemasangan setelah daftar?",
    answer:
      "Proses pemasangan biasanya memakan waktu 3–7 hari kerja setelah survei lokasi dan konfirmasi teknis selesai dilakukan.",
  },
  {
    question: "Apakah tersedia untuk semua area Bandung & Sumedang?",
    answer:
      "Saat ini layanan tersedia di area tertentu Bandung dan Sumedang. Silakan hubungi kami untuk pengecekan detail ketersediaan jaringan di lokasi Anda.",
  },
  {
    question: "Apakah ada biaya tambahan selain biaya paket bulanan?",
    answer:
      "Tidak ada biaya tersembunyi. Promo saat ini memberikan diskon 70% biaya pasang baru, dan tagihan bulanan dibayarkan di bulan berikutnya.",
  },
  {
    question: "Apakah cocok untuk live streaming dan kantor?",
    answer:
      "Sangat cocok. Dengan rasio upload dan download 1:1 simetris serta jaringan fiber optik stabil, layanan ini ideal untuk live streaming, kantor, UMKM, hingga corporate.",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-white">
      <Container>

        {/* ===== HEADING CENTERED ===== */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Pertanyaan yang Sering Ditanyakan
          </h2>

          <p className="text-slate-600 text-lg">
            Beberapa pertanyaan umum sebelum Anda berlangganan INDIBIZ.
            Jika masih ada pertanyaan, tim kami siap membantu.
          </p>
        </div>

        {/* ===== FAQ LIST ===== */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;

            return (
              <div
                key={index}
                className="border border-slate-200 rounded-2xl transition-all duration-300"
                style={{
                  backgroundColor: isOpen ? "#F8FAFC" : "#FFFFFF",
                }}
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between text-left px-6 py-5"
                >
                  <span className="font-semibold text-slate-900 text-base md:text-lg">
                    {faq.question}
                  </span>

                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-blue-600" : "text-slate-400"
                    }`}
                  />
                </button>

                <div
                  className={`px-6 overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-60 pb-6 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </Container>
    </section>
  );
}