import type { Metadata, Viewport } from "next";
import "./globals.css";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import MetaPixel from "@/components/MetaPixel";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import "maplibre-gl/dist/maplibre-gl.css"
import "@/styles/animation.css";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "INDIBIZ - Internet Digital Bisnis by Telkom Indonesia",
  description: "Solusi internet stabil, simetris, dan unlimited untuk semua kebutuhan bisnis Anda.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1D4ED8",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={cn("font-sans", geist.variable)}>
      <body className="antialiased bg-background text-foreground">
        <MetaPixel /> 
        
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}