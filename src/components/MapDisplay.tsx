"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet"; // Import Leaflet library itself
import { useState, useEffect } from "react";

// Fix for default icon issue with Webpack/Next.js
// You might need to copy marker-icon.png, marker-icon-2x.png, and marker-shadow.png
// from 'leaflet/dist/images' to your public/images directory
(L.Icon.Default.prototype as { _getIconUrl?: unknown })._getIconUrl = undefined;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/images/marker-icon-2x.png", // Adjust path if needed
  iconUrl: "/images/marker-icon.png", // Adjust path if needed
  shadowUrl: "/images/marker-shadow.png", // Adjust path if needed
});

const MapDisplay = () => {
  const position: [number, number] = [20.6381875, -103.3755625]; // Coordinates for JJQF+7Q
  const address =
    "Av. Miguel López de Legaspi & Vasco de Gama, 18 de Marzo, 44960 Guadalajara, Jal.";

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div
        style={{
          height: "400px",
          width: "100%",
          background: "#f0f0f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Cargando mapa...
      </div>
    );
  }

  return (
    <MapContainer
      center={position}
      zoom={16}
      scrollWheelZoom={false}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          <strong>Casa NALA</strong>
          <br />
          {address}
          <br />
          Plus Code: JJQF+7Q
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapDisplay;
