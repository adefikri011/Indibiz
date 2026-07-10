"use client"

import Container from "@/components/ui/Container"
import Link from "next/link"
import Image from "next/image"
import { Map, MapMarker, MarkerContent, MarkerPopup } from "@/components/ui/map"
import { useRef, useState } from "react"
import type { MapRef } from "@/components/ui/map"

export default function Footer() {
  const mapRef = useRef<MapRef>(null)
  const [activeLocation, setActiveLocation] =
    useState<"bandung" | "sumedang" | "cja" | "tanjungsari">("bandung")

  const locations = {
    bandung: {
      name: "Bandung",
      latitude: -6.921820,
      longitude: 107.709558,
      gmaps: "https://maps.app.goo.gl/XK4RB8BkCBrVk6SZ9"
    },
    sumedang: {
      name: "Sumedang",
      latitude: -6.857538,
      longitude: 107.921248,
      gmaps: "https://maps.app.goo.gl/qtDMTMe3342SXZHy5"
    },
    cja: {
      name: "Area CJA",
      latitude: -6.9599248,
      longitude: 107.6622998,
      gmaps: "https://maps.app.goo.gl/N9u9h3FJK5T552CQ6"
    },
    tanjungsari: {
      name: "Tanjungsari",
      latitude: -6.902949,
      longitude: 107.801240,
      gmaps: "https://maps.app.goo.gl/j8BKL8dYAEyP5uoy7"
    }
  }

  const flyTo = (key: keyof typeof locations) => {
    const loc = locations[key]
    setActiveLocation(key)
    mapRef.current?.flyTo({
      center: [loc.longitude, loc.latitude],
      zoom: 14,
      speed: 1.2,
    })
  }

  return (
    <footer className="bg-[#0F172A] text-white pt-16 pb-10 border-t border-white/10 relative overflow-hidden">

      {/* subtle ambient glow, tidak mengubah warna dasar */}
      <div
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-[0.08] blur-3xl"
        style={{ backgroundColor: "#2F5FD0" }}
      />

      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.9fr_1.3fr] gap-x-8 gap-y-12">

          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5 mb-4">
              <Image
                src="/image/indibizlogo2.png"
                alt="Indibiz Logo"
                width={32}
                height={32}
                className="shrink-0"
              />
              <h3 className="text-2xl font-bold tracking-tight">
                <span style={{ color: "#2F5FD0" }}>i</span>ndibiz
              </h3>
            </div>

            <p className="text-sm font-medium text-gray-300 mb-3 italic">
              &ldquo;Ciptakan Peluang, Wujudkan Harapan&rdquo;
            </p>

            <p className="text-gray-400 text-sm leading-relaxed">
              Internet Digital Bisnis by Telkom Indonesia.
              Solusi internet andal untuk semua kebutuhan bisnis Anda.
            </p>
          </div>

          {/* Menu */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-300">
              Menu
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link
                  href="#pricing"
                  className="hover:text-white hover:translate-x-0.5 transition-all inline-block"
                >
                  Paket Harga
                </Link>
              </li>
              <li>
                <Link
                  href="https://wa.me/6285189300718"
                  target="_blank"
                  className="hover:text-white hover:translate-x-0.5 transition-all inline-block"
                >
                  Kontak
                </Link>
              </li>
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-300">
              Kontak
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: "#2F5FD0" }}
                />
                WA: +62 851-8930-0718
              </li>
              <li className="flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: "#2F5FD0" }}
                />
                Area: Bandung & Sumedang
              </li>
              <li className="flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: "#2F5FD0" }}
                />
                indibiz.co.id
              </li>
            </ul>
          </div>

          {/* ===== MINI MAP ===== */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-300">
              Area Layanan
            </h4>

            {/* Button Lokasi */}
            <div className="flex flex-wrap gap-2 mb-4">
              {Object.keys(locations).map((key) => {
                const isActive = activeLocation === key
                return (
                  <button
                    key={key}
                    onClick={() => flyTo(key as keyof typeof locations)}
                    className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                      isActive
                        ? "text-white shadow-[0_0_0_1px_rgba(47,95,208,0.5),0_4px_14px_rgba(47,95,208,0.35)]"
                        : "bg-white/[0.06] text-gray-300 hover:bg-white/[0.12] hover:text-white"
                    }`}
                    style={isActive ? { backgroundColor: "#2F5FD0" } : undefined}
                  >
                    {locations[key as keyof typeof locations].name}
                  </button>
                )
              })}
            </div>

            <div className="h-[200px] rounded-2xl overflow-hidden border border-white/10 relative shadow-[0_8px_30px_rgba(0,0,0,0.3)] ring-1 ring-white/5">
              <Map
                ref={mapRef}
                center={[107.75, -6.9]}
                zoom={10}
                className="h-full w-full"
              >

                {Object.keys(locations).map((key) => {
                  const loc = locations[key as keyof typeof locations]
                  return (
                    <MapMarker
                      key={key}
                      longitude={loc.longitude}
                      latitude={loc.latitude}
                      anchor="bottom"
                      onClick={() => window.open(loc.gmaps, "_blank")}
                    >
                      <MarkerContent>
                        <div className="group relative flex flex-col items-center cursor-pointer">
                          <div className="absolute -top-7 whitespace-nowrap bg-black/80 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none">
                            {loc.name}
                          </div>

                          {/* Pulse ring */}
                          <span
                            className="absolute rounded-full animate-ping"
                            style={{
                              width: "18px",
                              height: "18px",
                              backgroundColor: "#2F5FD0",
                              opacity: 0.4,
                            }}
                          />

                          {/* Pin */}
                          <div
                            style={{
                              width: "18px",
                              height: "18px",
                              backgroundColor: "#2F5FD0",
                              borderRadius: "50%",
                              border: "3px solid white",
                              boxShadow: "0 3px 10px rgba(0,0,0,0.4)",
                            }}
                          />
                        </div>
                      </MarkerContent>
                      <MarkerPopup>
                        <p className="text-foreground font-medium text-xs">
                          {loc.name}
                        </p>
                      </MarkerPopup>
                    </MapMarker>
                  )
                })}

              </Map>
            </div>

            <p className="text-xs text-gray-500 mt-2.5">
              Klik pin untuk buka Google Maps
            </p>
          </div>

        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-2 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} INDIBIZ. All rights reserved.</p>
        </div>

      </Container>
    </footer>
  )
}