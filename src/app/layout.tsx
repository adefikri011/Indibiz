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
  title:
    "Internet Bisnis Stabil untuk Pertumbuhan Usaha | Indibiz Datel Sumedang Telkom Indonesia",
  description:
    "Indibiz Datel Sumedang menghadirkan layanan internet bisnis stabil, simetris dan tanpa FUP untuk area Sumedang, Bandung, Cijawura dan Tanjungsari. Solusi terbaik untuk kantor, UMKM dan perusahaan.",

  verification: {
    google: "8V_d-TsI3iNt08bgo34g5Aed55mR1Cpm68eSwBUVA-w",
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },

  openGraph: {
    title:
      "Internet Bisnis Stabil | Indibiz Datel Sumedang",
    description:
      "Layanan internet bisnis stabil dan unlimited untuk wilayah Sumedang, Bandung, Cijawura & Tanjungsari.",
    url: "https://www.indibizdatsum.com",
    siteName: "Indibiz Datel Sumedang",
    images: [
      {
        url: "https://www.indibizdatsum.com/image/logo_indibiz.jpg",
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
    title: "Internet Bisnis Stabil | Indibiz Sumedang",
    description:
      "Internet bisnis stabil dan unlimited untuk area Sumedang dan Bandung.",
    images: [
      "https://www.indibizdatsum.com/image/logo_indibiz.jpg",
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