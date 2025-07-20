import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "./AuthProvider";
import ClientBody from "./ClientBody";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // title: "Casa Nala - Comida de México", // Opción simple
  title: {
    // Opción con plantilla para páginas específicas
    default: "Casa Nala - Comida de México",
    template: "%s | Casa Nala",
  },
  description:
    "Restaurante Casa Nala, auténtica comida mexicana en Guadalajara. Haz tu pedido en línea, plataforma UBER, DIDI, RAPPI o reserva tu mesa.",
  icons: {
    icon: "/logos/favicon.ico", // Ruta actualizada al favicon correcto
    // apple: '/apple-icon.png', // Opcional: para dispositivos Apple
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const bodyClassNames = `${geistSans.variable} ${geistMono.variable}`;

  return (
    <html lang="es">
      <AuthProvider>
        <ClientBody className={bodyClassNames}>{children}</ClientBody>
      </AuthProvider>
    </html>
  );
}
