// src/app/layout.tsx

import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

// Añadimos el peso '600' para font-semibold
const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"] // Light, Regular, SemiBold, Bold
});

export const metadata: Metadata = {
  title: "On the Brand",
  description: "Marketing para E-commerce Potenciado por IA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}