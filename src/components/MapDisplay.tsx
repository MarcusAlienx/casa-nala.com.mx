"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useRef } from "react";

declare module "leaflet" {
  namespace Icon {
    interface Default {
      _getIconUrl?: string;
    }
  }
}

const customIcon = L.icon({
  iconUrl: "/images/marker-icon.png",
  iconRetinaUrl: "/images/marker-icon-2x.png",
  shadowUrl: "/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const MapDisplay = () => {
  const position: [number, number] = [20.6381875, -103.3755625];
  const address =
    "Av. Miguel López de Legaspi & Vasco de Gama, 18 de Marzo, 44960 Guadalajara, Jal.";

  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null); // Use ref to avoid re-renders

  useEffect(() => {
    // Ensure this code runs only on the client
    if (typeof window === "undefined" || !mapRef.current) {
      return;
    }

    // Initialize the map only if it hasn't been initialized yet
    if (!mapInstanceRef.current) {
      const map = L.map(mapRef.current).setView(position, 16);
      mapInstanceRef.current = map; // Store instance in ref

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.marker(position, { icon: customIcon })
        .addTo(map)
        .bindPopup(`
          <strong>Casa NALA</strong><br>
          ${address}<br>
          Plus Code: JJQF+7Q
        `);
    }

    // Cleanup function to run when the component unmounts
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div
      ref={mapRef}
      style={{ height: "400px", width: "100%", background: "#f0f0f0" }}
    />
  );
};

export default MapDisplay;
