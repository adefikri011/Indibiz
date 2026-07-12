import { Metadata, Viewport } from "next";
import "./globals.css";
import MetaPixel from "@/components/MetaPixel";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import "maplibre-gl/dist/maplibre-gl.css";
import "@/styles/animation.css";
import { Toaster } from "sonner";
import Script from "next/script"; 

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Indibiz Sumedang & Bandung - Internet Bisnis Stabil & Unlimited | Telkom Indonesia",
  description:
    "Indibiz Datel Sumedang menyediakan layanan internet bisnis stabil, simetris & unlimited untuk area Sumedang, Bandung, Cijawura, dan Tanjungsari. Solusi terbaik untuk kantor & UMKM.",

  verification: {
    google: "8V_d-TsI3iNt08bgo34g5Aed55mR1Cpm68eSwBUVA-w",
  },

  icons: {
    icon: "/image/indibizlogo2.png",
    apple: "/image/indibizlogo2.png",
  },

  openGraph: {
    title:
      "Indibiz Sumedang & Bandung - Internet Bisnis Stabil & Unlimited",
    description:
      "Layanan internet bisnis Indibiz untuk wilayah Sumedang, Bandung, Cijawura & Tanjungsari. Stabil, simetris dan unlimited untuk kebutuhan usaha Anda.",
    url: "https://www.indibizdatsum.com",
    siteName: "Indibiz Datel Sumedang",
    images: [
      {
        url: "https://www.indibizdatsum.com/image/indibizlogo2.png",
        width: 1200,
        height: 630,
        alt: "Indibiz Datel Sumedang Telkom Indonesia",
      },
    ],
    locale: "id_ID",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Indibiz Sumedang - Internet Bisnis Stabil & Unlimited",
    description:
      "Internet bisnis stabil & unlimited untuk area Sumedang, Bandung, Cijawura, dan Tanjungsari.",
    images: [
      "https://www.indibizdatsum.com/image/indibizlogo2.png",
    ],
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

        <Script
          async
          src="https://cloud.umami.is/script.js"
          data-website-id="41442e7f-fbfe-40d1-945c-cca5d9eb3e5a"
          strategy="afterInteractive"
        />

        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}