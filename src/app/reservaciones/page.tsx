"use client";

import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Poiret_One, Amatic_SC } from "next/font/google"; // Amatic_SC podría no ser necesaria aquí, pero Poiret_One sí.

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

// Si el formulario de reservaciones usa amaticSC, también se debe importar y configurar aquí.
// Por ahora, solo incluyo Poiret_One que se usa en los títulos de sección.

export default function ReservacionesPage() {
  // El estado y los manejadores del formulario de reservaciones se moverían aquí
  // Por simplicidad, estoy omitiendo la lógica del formulario por ahora,
  // asumiendo que se copiará de page.tsx. El foco es la estructura.

  return (
    <main className="min-h-screen bg-[#F5E8D2] py-8 px-4">
      {/* Formulario de Reservaciones (se copiará de page.tsx) */}
      <section
        id="reservas"
        className="max-w-2xl mx-auto p-6 rounded-xl shadow-lg bg-[#fff] border border-[#D9D4CE] mb-16"
      >
        <h1
          className={`text-3xl font-bold text-[#6C3A3A] mb-3 text-center ${poiretOne.className}`}
        >
          Reservaciones
        </h1>
        <p className="text-[#9DA17B] mb-6 text-center">
          Aparta tu mesa en Casa NALA y disfruta de nuestra comida tradicional
          mexicana en el mejor ambiente.
        </p>
        <form className="flex flex-col gap-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-[#6C3A3A] font-medium">Nombre</label>
              <input
                type="text"
                className="border border-[#D9D4CE] rounded w-full p-2 mt-1 bg-[#F5E8D2] focus:outline-none"
                placeholder="Tu nombre"
                required
              />
            </div>
            <div>
              <label className="text-[#6C3A3A] font-medium">Teléfono</label>
              <input
                type="tel"
                className="border border-[#D9D4CE] rounded w-full p-2 mt-1 bg-[#F5E8D2] focus:outline-none"
                placeholder="(55) 1234-5678"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="text-[#6C3A3A] font-medium">Personas</label>
              <input
                type="number"
                min="1"
                max="20"
                className="border border-[#D9D4CE] rounded w-full p-2 mt-1 bg-[#F5E8D2] focus:outline-none"
                placeholder="2"
                required
              />
            </div>
            <div>
              <label className="text-[#6C3A3A] font-medium">Fecha</label>
              <input
                type="date"
                className="border border-[#D9D4CE] rounded w-full p-2 mt-1 bg-[#F5E8D2] focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="text-[#6C3A3A] font-medium">Hora</label>
              <input
                type="time"
                className="border border-[#D9D4CE] rounded w-full p-2 mt-1 bg-[#F5E8D2] focus:outline-none"
                required
              />
            </div>
          </div>
          <div>
            <label className="text-[#6C3A3A] font-medium">
              Ocasión especial
            </label>
            <select className="border border-[#D9D4CE] rounded w-full p-2 mt-1 bg-[#F5E8D2] focus:outline-none">
              <option value="">Ninguna</option>
              <option value="cumpleaños">Cumpleaños</option>
              <option value="aniversario">Aniversario</option>
              <option value="trabajo">Reunión de trabajo</option>
              <option value="otra">Otra</option>
            </select>
          </div>
          <div>
            <label className="text-[#6C3A3A] font-medium">
              Comentarios adicionales
            </label>
            <textarea
              rows={3}
              className="border border-[#D9D4CE] rounded w-full p-2 mt-1 bg-[#F5E8D2] focus:outline-none"
              placeholder="Alguna solicitud especial"
            />
          </div>
          <button
            className="bg-[#6C3A3A] text-[#F5E8D2] rounded py-2 px-4 mt-4 font-semibold w-full hover:bg-[#9DA17B] transition"
            type="button"
          >
            {" "}
            {/* Cambiado type a button si no hay submit handler aún */}
            Reservar Mesa
          </button>
        </form>
      </section>

      {/* Sección de Ubicación con Mapa */}
      <section
        id="ubicacion-mapa"
        className="max-w-4xl mx-auto mt-12 p-6 rounded-xl shadow-lg bg-[#fff] border border-[#D9D4CE]"
      >
        <h2
          className={`text-2xl font-bold text-[#6C3A3A] mb-4 text-center ${poiretOne.className}`}
        >
          Encuéntranos Aquí
        </h2>
        <div className="border border-[#D9D4CE] h-[450px] rounded-lg overflow-hidden">
          <MapDisplay />
        </div>
      </section>

      <div className="mt-12 text-center">
        <Link
          href="/"
          className="px-6 py-2 bg-[#6C3A3A] text-white rounded-lg font-medium hover:bg-[#6C3A3A]/90 transition"
        >
          Volver al Inicio
        </Link>
      </div>
    </main>
  );
}
