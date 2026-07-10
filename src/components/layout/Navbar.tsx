"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import Container from "@/components/ui/Container";
import Link from "next/link";
import Image from "next/image";

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
              <span
                className="text-lg md:text-xl font-bold transition-colors duration-300 ease-out"
                style={{ color: "#0F172A" }}
              >
                indibiz
              </span>

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

          {/* Button — hanya muncul di desktop (md ke atas) */}
          <Link
            href="https://wa.me/6285189300718?text=Halo%20saya%20tertarik%20dengan%20INDIBIZ"
            target="_blank"
            onClick={handleClick}
            className="hidden md:block"
          >
            <div
              className="px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 cursor-pointer"
              style={{
                backgroundColor: "#2F5FD0",
                color: "#FFFFFF",
                boxShadow: "0 4px 14px rgba(29,78,216,0.25)",
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