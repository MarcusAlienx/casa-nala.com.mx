"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Poiret_One, Amatic_SC } from "next/font/google";

const poiretOne = Poiret_One({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

const amaticSC = Amatic_SC({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#6C3A3A] text-[#F5E8D2] shadow-md">
      <div className="p-4 flex justify-between items-center">
        <div className="flex flex-grow items-center gap-2 md:flex-grow-0 md:gap-4">
          <Image
            src="/logos/logo_nala.avif"
            width={80}
            height={40}
            alt="Logo Casa Nala"
            className="bg-[#F5E8D2] p-0.5 h-12 w-auto object-contain flex-shrink-0"
          />
          <div className="flex-grow text-center md:text-left">
            <div
              className={`text-xl md:text-2xl tracking-wider ${poiretOne.className}`}
            >
              CASA NALA
            </div>
            <div
              className={`text-xs md:text-sm italic text-[#F5E8D2] font-light leading-none mt-0.5 ${amaticSC.className}`}
            >
              Comida de México
            </div>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-sm lg:text-lg flex-shrink-0">
          <Link href="/" className="hover:underline font-medium">
            Menú
          </Link>
          <Link href="/#pedidos" className="hover:underline font-medium">
            Pedidos
          </Link>
          <Link href="/reservaciones" className="hover:underline">
            Reservaciones
          </Link>
          <Link href="/ubicacion" className="hover:underline">
            Ubicación
          </Link>
        </nav>
        <div className="md:hidden flex items-center flex-shrink-0">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-[#F5E8D2] focus:outline-none p-1"
            aria-label="Abrir menú"
          >
            {isMobileMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-[#6C3A3A] text-[#F5E8D2] py-2 shadow-lg">
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block w-full text-left px-4 py-2 hover:bg-[#9DA17B]"
          >
            Menú
          </Link>
          <Link
            href="/#pedidos"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-4 py-2 hover:bg-[#9DA17B]"
          >
            Pedidos
          </Link>
          <Link
            href="/reservaciones"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-4 py-2 hover:bg-[#9DA17B]"
          >
            Reservaciones
          </Link>
          <Link
            href="/ubicacion"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-4 py-2 hover:bg-[#9DA17B]"
          >
            Ubicación
          </Link>
        </nav>
      )}
    </header>
  );
}
