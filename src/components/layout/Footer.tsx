"use client"

import Container from "@/components/ui/Container"
import Link from "next/link"
import { Map, MapMarker, MarkerContent, MarkerPopup } from "@/components/ui/map"
import { useRef, useState } from "react"
import type { MapRef } from "@/components/ui/map"

export default function Footer() {
  const mapRef = useRef<MapRef>(null)
  const [activeLocation, setActiveLocation] = useState<"bandung" | "sumedang">("bandung")

  const locations = {
    bandung: {
      name: "Bandung",
      latitude: -6.921820,
      longitude: 107.709558,
      gmaps: "https://www.google.com/maps?q=-6.921820,107.709558"
    },
    sumedang: {
      name: "Sumedang",
      latitude: -6.857538,
      longitude: 107.921248,
      gmaps: "https://www.google.com/maps?q=-6.857538,107.921248"
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
    <footer className="bg-[#0F172A] text-white pt-14 pb-8 border-t border-white/10">
      <Container>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-3">
              <span className="text-blue-500">i</span>ndibiz
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Internet Digital Bisnis by Telkom Indonesia.
              Solusi internet andal untuk semua kebutuhan bisnis Anda.
            </p>
          </div>

          {/* Menu */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-200">Menu</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="#pricing" className="hover:text-white transition">
                  Paket Harga
                </Link>
              </li>
              <li>
                <Link href="https://wa.me/6285189300718" target="_blank" className="hover:text-white transition">
                  Kontak
                </Link>
              </li>
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-200">Kontak</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>WA: +62 851-8930-0718</li>
              <li>Area: Bandung & Sumedang</li>
              <li>indibiz.co.id</li>
            </ul>
          </div>

          {/* ===== MINI MAP ===== */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-200">
              Area Layanan
            </h4>

            {/* Button Lokasi */}
            <div className="flex gap-2 mb-3">
              <button
                onClick={() => flyTo("bandung")}
                className={`px-3 py-1 text-xs rounded-full transition ${
                  activeLocation === "bandung"
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                Bandung
              </button>

              <button
                onClick={() => flyTo("sumedang")}
                className={`px-3 py-1 text-xs rounded-full transition ${
                  activeLocation === "sumedang"
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                Sumedang
              </button>
            </div>

            <div className="h-[200px] rounded-xl overflow-hidden border border-white/10 relative">
              <Map
                ref={mapRef}
                center={[107.815, -6.8897]}
                zoom={9.6}
                className="h-full w-full"
              >

                {/* ===== BANDUNG ===== */}
                <MapMarker
                  longitude={locations.bandung.longitude}
                  latitude={locations.bandung.latitude}
                  anchor="bottom"
                  onClick={() => window.open(locations.bandung.gmaps, "_blank")}
                >
                  <MarkerContent>
                    <div className="group relative flex flex-col items-center cursor-pointer">
                      {/* Tooltip */}
                      <div className="absolute -top-7 whitespace-nowrap bg-black/80 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none">
                        Bandung
                      </div>
                      {/* Pulse ring */}
                      <span
                        className="absolute rounded-full animate-ping"
                        style={{
                          width: "18px",
                          height: "18px",
                          backgroundColor: "#DC2626",
                          opacity: 0.4,
                        }}
                      />
                      {/* Pin */}
                      <div
                        style={{
                          width: "18px",
                          height: "18px",
                          backgroundColor: "#DC2626",
                          borderRadius: "50%",
                          border: "3px solid white",
                          boxShadow: "0 3px 10px rgba(0,0,0,0.4)",
                        }}
                      />
                    </div>
                  </MarkerContent>
                  <MarkerPopup>
                    <p className="text-foreground font-medium text-xs">Bandung</p>
                  </MarkerPopup>
                </MapMarker>

                {/* ===== SUMEDANG ===== */}
                <MapMarker
                  longitude={locations.sumedang.longitude}
                  latitude={locations.sumedang.latitude}
                  anchor="bottom"
                  onClick={() => window.open(locations.sumedang.gmaps, "_blank")}
                >
                  <MarkerContent>
                    <div className="group relative flex flex-col items-center cursor-pointer">
                      {/* Tooltip */}
                      <div className="absolute -top-7 whitespace-nowrap bg-black/80 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none">
                        Sumedang
                      </div>
                      {/* Pulse ring */}
                      <span
                        className="absolute rounded-full animate-ping"
                        style={{
                          width: "18px",
                          height: "18px",
                          backgroundColor: "#DC2626",
                          opacity: 0.4,
                        }}
                      />
                      {/* Pin */}
                      <div
                        style={{
                          width: "18px",
                          height: "18px",
                          backgroundColor: "#DC2626",
                          borderRadius: "50%",
                          border: "3px solid white",
                          boxShadow: "0 3px 10px rgba(0,0,0,0.4)",
                        }}
                      />
                    </div>
                  </MarkerContent>
                  <MarkerPopup>
                    <p className="text-foreground font-medium text-xs">Sumedang</p>
                  </MarkerPopup>
                </MapMarker>

              </Map>
            </div>

            <p className="text-xs text-gray-400 mt-2">
              Klik pin untuk buka Google Maps
            </p>
          </div>

        </div>

        <div className="mt-12 pt-6 border-t border-white/10 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} INDIBIZ. All rights reserved.</p>
        </div>

      </Container>
    </footer>
  )
}