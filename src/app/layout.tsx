import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "./AuthProvider";

export const metadata: Metadata = {
  title: {
    default: "Casa Nala - Comida de México",
    template: "%s | Casa Nala",
  },
  description:
    "Restaurante Casa Nala, auténtica comida mexicana en Guadalajara. Haz tu pedido en línea, plataforma UBER, DIDI, RAPPI o reserva tu mesa.",
  icons: {
    icon: "/logos/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <AuthProvider>
        <body>{children}</body>
      </AuthProvider>
    </html>
  );
}
