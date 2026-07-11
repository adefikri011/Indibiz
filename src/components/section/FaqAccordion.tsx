"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export default function FaqAccordion({ faqs }: { faqs: FaqItem[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  if (faqs.length === 0) return null;

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = activeIndex === index;

        return (
          <div
            key={faq.id}
            data-animate="scale"
            className="border border-slate-200 rounded-2xl transition-all duration-300"
            style={{
              ["--animate-delay" as never]: `${index * 90 + 160}ms`,
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
  );
}