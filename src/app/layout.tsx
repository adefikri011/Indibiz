import type { Metadata } from "next";
import "./globals.css";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";

export const metadata: Metadata = {
  title: "INDIBIZ - Internet Digital Bisnis by Telkom Indonesia",
  description: "Solusi internet stabil, simetris, dan unlimited untuk semua kebutuhan bisnis Anda. Daftar sekarang!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased">
        {children}
        {/* Tombol WA Melayang */}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}