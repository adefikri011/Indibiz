import { Metadata, Viewport } from "next";
import "./globals.css";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import MetaPixel from "@/components/MetaPixel";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import "maplibre-gl/dist/maplibre-gl.css";
import "@/styles/animation.css";
import { Toaster } from "sonner";
import Script from "next/script"; 

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "INDIBIZ - Internet Digital Bisnis by Telkom Indonesia",
  description: "Solusi internet stabil, simetris, dan unlimited untuk semua kebutuhan bisnis Anda.",
  
  icons: {
    icon: "/image/indibizlogo2.png",
    apple: "/image/indibizlogo2.png",
  },

  openGraph: {
    title: "INDIBIZ - Internet Digital Bisnis by Telkom Indonesia",
    description: "Solusi internet stabil, simetris, dan unlimited untuk semua kebutuhan bisnis Anda.",
    url: "https://www.indibizdatsum.com",
    siteName: "Indibiz Datsum",
    images: [
      {
        url: "https://www.indibizdatsum.com/image/indibizlogo2.png",
        width: 1200,
        height: 630,
        alt: "INDIBIZ Telkom Indonesia",
      },
    ],
    locale: "id_ID",
    type: "website",
  },

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

        {/* ✅ UMAMI ANALYTICS */}
        <Script
          async
          src="https://cloud.umami.is/script.js"
          data-website-id="41442e7f-fbfe-40d1-945c-cca5d9eb3e5a"
          strategy="afterInteractive"
        />

        {/* <FloatingWhatsApp /> */}

        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}