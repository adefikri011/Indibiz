"use client";

import { useEffect, useState } from "react";
import Container from "@/components/ui/Container";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Lead");
    }
  };

  return (
    <header
      className="w-full py-4 sticky top-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "#FFFFFF" : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        boxShadow: scrolled
          ? "0 4px 20px rgba(0,0,0,0.05)"
          : "none",
      }}
    >
      <Container>
        <div className="flex items-center justify-between">

          {/* ===== Logo + Tagline ===== */}
          <Link href="/" className="flex items-center gap-3">

            {/* Iconic Logo */}
            <Image
              src="/image/indibizlogo2.png"
              alt="Indibiz Logo"
              width={36}
              height={36}
              className="h-9 w-auto"
              priority
            />

            {/* Text */}
            <div className="flex flex-col leading-tight">
              <span
                className="text-xl font-bold"
                style={{ color: scrolled ? "#0F172A" : "#0F172A" }}
              >
                indibiz
              </span>

              {/* Tagline */}
              <span
                className="text-xs font-medium tracking-wide"
                style={{
                  color: scrolled ? "#64748B" : "#475569",
                }}
              >
                Ciptakan Peluang, Wujudkan Harapan
              </span>
            </div>
          </Link>

          {/* Button */}
          <Link
            href="https://wa.me/6285189300718?text=Halo%20saya%20tertarik%20dengan%20INDIBIZ"
            target="_blank"
            onClick={handleClick}
          >
            <div
              className="px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 hover:opacity-90 cursor-pointer"
              style={{
                backgroundColor: "#2F5FD0",
                color: "#FFFFFF",
                boxShadow: scrolled
                  ? "0 4px 14px rgba(29,78,216,0.25)"
                  : "0 4px 14px rgba(29,78,216,0.25)",
              }}
            >
              Hubungi Kami
            </div>
          </Link>

        </div>
      </Container>
    </header>
  );
}