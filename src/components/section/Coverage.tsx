"use client"

import { useRef, useState } from "react"
import Container from "@/components/ui/Container"
import { Map, MapControls, MapMarker } from "@/components/ui/map"
import { Card } from "@/components/ui/card"
import { MapPin } from "lucide-react"
import type { MapRef } from "@/components/ui/map"

export default function Coverage() {
  const mapRef = useRef<MapRef>(null)
  const [activeCity, setActiveCity] = useState("Bandung")

  const locations = {
    Bandung: {
      longitude: 107.6191,
      latitude: -6.9175,
    },
    Sumedang: {
      longitude: 108.1128,
      latitude: -6.8541,
    },
  }

  const handleFlyTo = (city: "Bandung" | "Sumedang") => {
    const location = locations[city]

    mapRef.current?.flyTo({
      center: [location.longitude, location.latitude],
      zoom: 12,
      speed: 1.2,
    })

    setActiveCity(city)
  }

  return (
    <section className="py-16 md:py-24 bg-white">
      <Container>

        {/* ===== Heading ===== */}
        <div className="mb-12 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-4 bg-blue-50 text-blue-600">
            <MapPin className="w-4 h-4" />
            Area Layanan
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
            Coverage Area{" "}
            <span className="text-blue-600">
              Bandung & Sumedang
            </span>
          </h2>

          <p className="text-lg text-slate-600">
            Klik tombol di atas map untuk melihat lokasi layanan kami.
          </p>
        </div>

        {/* ===== Map Card ===== */}
        <Card className="relative h-[450px] p-0 overflow-hidden rounded-2xl shadow-lg">

          {/* ===== Location Buttons ===== */}
          <div className="absolute top-4 left-4 z-10 flex gap-2">
            {Object.keys(locations).map((city) => (
              <button
                key={city}
                onClick={() =>
                  handleFlyTo(city as "Bandung" | "Sumedang")
                }
                className="px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200"
                style={{
                  backgroundColor:
                    activeCity === city ? "#1D4ED8" : "#1F2937",
                  color: "#FFFFFF",
                  boxShadow:
                    activeCity === city
                      ? "0 4px 12px rgba(29,78,216,0.4)"
                      : "0 2px 6px rgba(0,0,0,0.2)",
                }}
              >
                {city}
              </button>
            ))}
          </div>

          <Map
            ref={mapRef}
            center={[107.85, -6.9]}
            zoom={10}
            className="h-full w-full"
          >
            <MapControls />

            {/* Bandung Marker */}
            <MapMarker
              longitude={locations.Bandung.longitude}
              latitude={locations.Bandung.latitude}
            >
              <div className="w-4 h-4 bg-blue-600 rounded-full shadow-lg border-2 border-white" />
            </MapMarker>

            {/* Sumedang Marker */}
            <MapMarker
              longitude={locations.Sumedang.longitude}
              latitude={locations.Sumedang.latitude}
            >
              <div className="w-4 h-4 bg-blue-600 rounded-full shadow-lg border-2 border-white" />
            </MapMarker>

          </Map>

        </Card>

      </Container>
    </section>
  )
}