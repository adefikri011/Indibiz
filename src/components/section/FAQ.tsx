import { prisma } from "@/lib/prisma";
import Container from "@/components/ui/Container";
import FaqAccordion from "./FaqAccordion";

export default async function FAQ() {
  const faqs = await prisma.faq.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <section className="py-24 bg-white">
      <Container>

        {/* ===== HEADING CENTERED ===== */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2
            data-animate="scale"
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
            style={{ ["--animate-delay" as never]: "40ms" }}
          >
            Pertanyaan yang Sering Ditanyakan
          </h2>

          <p
            data-animate
            className="text-slate-600 text-lg"
            style={{ ["--animate-delay" as never]: "120ms" }}
          >
            Beberapa pertanyaan umum sebelum Anda berlangganan INDIBIZ.
            Jika masih ada pertanyaan, tim kami siap membantu.
          </p>
        </div>

        {/* ===== FAQ LIST (interaktif, client component) ===== */}
        <FaqAccordion
          faqs={faqs.map((faq) => ({
            id: faq.id,
            question: faq.question,
            answer: faq.answer,
          }))}
        />

      </Container>
    </section>
  );
}