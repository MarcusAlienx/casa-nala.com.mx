"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useRef } from "react";

// Fix for default icon issue with Webpack/Next.js
// This is a common workaround for Next.js
if (typeof window !== 'undefined') {
  delete (L.Icon.Default.prototype as any)._getIconUrl;

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "/images/marker-icon-2x.png",
    iconUrl: "/images/marker-icon.png",
    shadowUrl: "/images/marker-shadow.png",
  });
}

const MapDisplay = () => {
  const position: [number, number] = [20.6381875, -103.3755625];
  const address =
    "Av. Miguel López de Legaspi & Vasco de Gama, 18 de Marzo, 44960 Guadalajara, Jal.";

  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null); // Use ref to avoid re-renders

  useEffect(() => {
    // Ensure this code runs only on the client
    if (typeof window === 'undefined' || !mapRef.current) {
      return;
    }

    // Initialize the map only if it hasn't been initialized yet
    if (!mapInstanceRef.current) {
      const map = L.map(mapRef.current).setView(position, 16);
      mapInstanceRef.current = map; // Store instance in ref

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      L.marker(position).addTo(map)
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
  }, [address, position]); // Empty dependency array ensures this runs only once on mount

  return (
    <div
      ref={mapRef}
      style={{ height: "400px", width: "100%", background: "#f0f0f0" }}
    />
  );
};

export default MapDisplay;

