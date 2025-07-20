"use client";

import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Poiret_One } from "next/font/google";

const MapDisplay = dynamic(() => import("@/components/MapDisplay"), {
  ssr: false,
  loading: () => (
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
  ),
});

const poiretOne = Poiret_One({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

// Iconos SVG como componentes de React (definidos fuera del componente UbicacionPage)
// Tamaño por defecto ajustado para ser más pequeño
const IconMapPin = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001zm.612-1.426a5.02 5.02 0 00-7.002 0C3.503 17.968 3 18.495 3 19s.503 1.032.902.574a4.999 4.999 0 007.196 0c.399.458.902.074.902-.574s-.503-1.032-.902-.574zM10 2a5 5 0 00-5 5c0 3.564 4.204 8.09 5 9.434 1.058-1.668 5-6.168 5-9.434a5 5 0 00-5-5zM10 9a2 2 0 100-4 2 2 0 000 4z"
      clipRule="evenodd"
    />
  </svg>
);

const IconWhatsApp = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2M12.04 3.67c4.52 0 8.21 3.69 8.21 8.21s-3.69 8.21-8.21 8.21h-.01c-1.53 0-3.01-.42-4.31-1.19l-.31-.18-3.21.84.86-3.12-.2-.33a8.17 8.17 0 0 1-1.26-4.42c0-4.52 3.69-8.21 8.21-8.21m5.02 10.29c-.28-.14-1.64-.81-1.89-.9s-.43-.14-.62.14-.71.9-.88 1.08-.32.19-.59.07c-.28-.12-1.17-.43-2.23-1.37-.83-.73-1.39-1.63-1.55-1.91-.16-.28-.02-.43.12-.57.13-.13.28-.32.42-.48.11-.13.14-.23.22-.38.07-.14.04-.28-.02-.42s-.62-1.48-.85-2.02c-.22-.54-.45-.47-.62-.47h-.52c-.19 0-.49.07-.74.35-.25.28-.96.94-.96 2.29 0 1.35.99 2.65 1.13 2.83.14.19 1.95 2.98 4.74 4.19 2.79 1.21 2.79.81 3.3.78.5-.04 1.64-.67 1.87-1.32.23-.65.23-1.21.16-1.32Z" />
  </svg>
);

const IconEnvelope = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className={className}
  >
    <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
    <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
  </svg>
);

const IconGlobeAlt = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A11.978 11.978 0 0112 16.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 3c2.485 0 4.5 4.03 4.5 9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3"
    />
  </svg>
);

export default function UbicacionPage() {
  return (
    <main className="min-h-screen bg-[#F5E8D2] py-8 px-4">
      <section
        id="ubicacion"
        className="max-w-4xl mx-auto p-6 md:p-8 rounded-xl shadow-lg bg-[#fff] border border-[#D9D4CE]"
      >
        <h1
          className={`text-3xl lg:text-4xl font-bold text-[#6C3A3A] mb-6 text-center ${poiretOne.className}`}
        >
          Nuestra Ubicación y Contacto
        </h1>
        <p className="text-lg text-[#9DA17B] mb-6 text-center">
          Encuéntranos en: Av. Miguel López de Legaspi & Vasco de Gama, Col. 18
          de Marzo, 44960 Guadalajara, Jal.
        </p>
        <div className="border border-[#D9D4CE] h-[300px] md:h-[450px] rounded-lg overflow-hidden mb-8">
          <MapDisplay />
        </div>

        <div className="bg-[#FDFBF7] p-6 rounded-lg shadow-sm border border-[#EAE0D3] text-[#6C3A3A]">
          <h2
            className={`text-2xl font-semibold text-center mb-4 ${poiretOne.className}`}
          >
            ¿Tienes dudas o un pedido especial?
          </h2>
          <p className="mb-6 text-center text-gray-700">
            En Casa Nala estamos encantados de escucharte. Nuestro compromiso es
            ofrecerte el auténtico sabor de México con atención cercana y de
            calidad.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-sm mb-6">
            <div className="flex flex-col items-center">
              <IconMapPin className="mb-2 text-red-600 w-8 h-8" />
              <p className="font-semibold text-[#6C3A3A]">Visítanos</p>
              <p className="text-xs text-gray-600">
                Av. López de Legaspi & Vasco de Gama,
                <br />
                Col. 18 de Marzo, 44960 Guadalajara, Jal.
              </p>
              <a
                href="https://www.google.com/maps?q=JJQF%2B7Q"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#D7A556] hover:underline mt-1"
              >
                Ver en Google Maps
              </a>
            </div>

            <div className="flex flex-col items-center">
              <img
                src="/logos/waze.svg"
                alt="Waze Logo"
                className="mb-2 w-8 h-8"
              />
              <p className="font-semibold text-[#6C3A3A]">Navega con Waze</p>
              <a
                href="https://waze.com/ul/h9ewmrth4p"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#D7A556] hover:underline mt-1"
              >
                Abrir en Waze
              </a>
            </div>

            <div className="flex flex-col items-center">
              <img
                src="/logos/waze.svg"
                alt="Waze Logo"
                className="mb-2 w-8 h-8"
              />
              <p className="font-semibold text-[#6C3A3A]">Navega con Waze</p>
              <a
                href="https://waze.com/ul/h9ewmrth4p"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#D7A556] hover:underline mt-1"
              >
                Abrir en Waze
              </a>
            </div>

            <div className="flex flex-col items-center">
              <IconWhatsApp className="mb-2 text-green-500 w-8 h-8" />
              <p className="font-semibold text-sm text-[#6C3A3A]">WhatsApp</p>
              <a
                href="https://wa.me/523332531118"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#D7A556] hover:underline"
              >
                +52 33 3253 1118
              </a>
            </div>

            <div className="flex flex-col items-center">
              <IconEnvelope className="mb-2 text-orange-500 w-8 h-8" />
              <p className="font-semibold text-sm text-[#6C3A3A]">Correo</p>
              <a
                href="mailto:ordenes@casanala.com.mx"
                className="text-xs text-[#D7A556] hover:underline"
              >
                ordenes@casanala.com.mx
              </a>
            </div>
          </div>

          <div className="text-center text-sm text-gray-600 mb-6">
            <p className="flex items-center justify-center">
              <IconGlobeAlt className="text-blue-500 w-4 h-4 mr-1.5" />
              Sitio Web:
              <a
                href="https://casanala.com.mx"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 text-[#D7A556] hover:underline"
              >
                https://casanala.com.mx
              </a>
            </p>
          </div>

          <p className="text-center text-gray-700">
            Ya sea para eventos, pedidos para llevar o simplemente por antojo,
            en Casa Nala estamos para servirte. ¡Gracias por elegirnos!
          </p>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="px-6 py-2 bg-[#6C3A3A] text-white rounded-lg font-medium hover:bg-[#6C3A3A]/90 transition"
          >
            Volver al Inicio
          </Link>
        </div>
      </section>
    </main>
  );
}
