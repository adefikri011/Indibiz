"use client";

import Container from "@/components/ui/Container";
import Link from "next/link";

export default function Navbar() {
  const handleClick = () => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Lead");
    }
  };

  return (
    <header
      className="w-full py-4 sticky top-0 z-50"
      style={{
        backgroundColor: "#FFFFFF",
      }}
    >
      <Container>
        <div className="flex items-center justify-between">

          {/* ===== Logo ===== */}
          <Link href="/" className="flex items-center gap-1">
            <span
              className="text-2xl font-bold"
              style={{ color: "#0F172A" }}
            >
              <span style={{ color: "#1D4ED8" }}>i</span>ndibiz
            </span>
          </Link>

          <Link
            href="https://wa.me/6285189300718?text=Halo%20saya%20tertarik%20dengan%20INDIBIZ"
            target="_blank"
            onClick={handleClick}
          >
            <div
              className="px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 hover:opacity-90 cursor-pointer"
              style={{
                backgroundColor: "#1D4ED8",
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