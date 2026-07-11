"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import Container from "@/components/ui/Container";
import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const tickingRef = useRef(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (!tickingRef.current) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          tickingRef.current = false;
        });
        tickingRef.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Lead");
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/");
    }
  };

  return (
    <header
      className="w-full py-3 md:py-4 sticky top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ease-out"
      style={{
        backgroundColor: scrolled ? "#FFFFFF" : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(10px)" : "none",
        boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.05)" : "none",
      }}
    >
      <Container>
        <div className="flex items-center justify-between">

          {/* ===== Logo + Tagline ===== */}
          <Link
            href="/"
            onClick={handleLogoClick}
            className="flex items-center gap-2.5 cursor-pointer"
          >

            {/* Iconic Logo */}
            <Image
              src="/image/indibizlogo2.png"
              alt="Indibiz Logo"
              width={36}
              height={36}
              className="h-8 w-auto md:h-9 transition-transform duration-300"
              priority
            />

            {/* Text */}
            <div className="flex flex-col leading-tight">
              <div className="flex items-center gap-1.5 md:gap-2">
                <span
                  className="text-lg md:text-xl font-bold transition-colors duration-300 ease-out"
                  style={{ color: "#0F172A" }}
                >
                  <span style={{ color: "#2F5FD0" }}>i</span>ndibiz
                </span>

                {/* Divider + Lokasi — Datel Sumedang */}
                <span className="flex h-4 w-px shrink-0" style={{ backgroundColor: "rgba(148,163,184,0.4)" }} />
                <span
                  className="inline-flex items-center gap-1 text-[9px] md:text-[10px] font-semibold uppercase tracking-wider whitespace-nowrap transition-colors duration-300 ease-out"
                  style={{ color: "#64748B" }}
                >
                  <MapPin
                    className="h-2.5 w-2.5 md:h-3 md:w-3 shrink-0"
                    style={{ color: "#E4002B" }}
                    strokeWidth={2.5}
                  />
                  Datel Sumedang
                </span>
              </div>

              {/* Tagline — lebih kecil di mobile */}
              <span
                className="text-[10px] md:text-xs font-medium tracking-wide transition-colors duration-300 ease-out"
                style={{
                  color: scrolled ? "#64748B" : "#475569",
                }}
              >
                Ciptakan Peluang, Wujudkan Harapan
              </span>
            </div>
          </Link>

          {/* Logo Telkom Indonesia — menggantikan tombol Hubungi Kami */}
          <Image
            src="/image/logo_telkom.png"
            alt="Telkom Indonesia"
            width={160}
            height={160}
            className="h-10 md:h-14 w-auto object-contain"
          />

        </div>
      </Container>
    </header>
  );
}