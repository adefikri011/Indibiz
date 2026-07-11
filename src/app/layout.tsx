import { Metadata, Viewport } from "next";
import "./globals.css";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import MetaPixel from "@/components/MetaPixel";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import "maplibre-gl/dist/maplibre-gl.css";
import "@/styles/animation.css";
import { Toaster } from "sonner";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "INDIBIZ - Internet Digital Bisnis by Telkom Indonesia",
  description: "Solusi internet stabil, simetris, dan unlimited untuk semua kebutuhan bisnis Anda.",
  
  // 1. Konfigurasi Favicon / Icon Browser
  icons: {
    icon: "/image/indibizlogo2.png",
    apple: "/image/indibizlogo2.png",
  },

  // 2. Konfigurasi Link Preview untuk WhatsApp, Telegram, Facebook, dll.
  openGraph: {
    title: "INDIBIZ - Internet Digital Bisnis by Telkom Indonesia",
    description: "Solusi internet stabil, simetris, dan unlimited untuk semua kebutuhan bisnis Anda.",
    url: "https://www.indibizdatsum.com",
    siteName: "Indibiz Datsum",
    images: [
      {
        url: "https://www.indibizdatsum.com/image/indibizlogo2.png", // URL absolut gambar preview
        width: 1200,
        height: 630,
        alt: "INDIBIZ Telkom Indonesia",
      },
    ],
    locale: "id_ID",
    type: "website",
  },

  // 3. Konfigurasi Link Preview khusus Twitter/X
  twitter: {
    card: "summary_large_image",
    title: "INDIBIZ - Internet Digital Bisnis by Telkom Indonesia",
    description: "Solusi internet stabil, simetris, dan unlimited untuk semua kebutuhan bisnis Anda.",
    images: ["https://www.indibizdatsum.com/image/indibizlogo2.png"],
  },
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

        {/* <FloatingWhatsApp /> */}

        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}