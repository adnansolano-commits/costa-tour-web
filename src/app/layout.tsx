import type { ReactNode } from 'react';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';

/**
 * Tipografía Oficial de Costa Tour (DESIGN.md Sección 3):
 * - Outfit: Titulares y Display (pesos 600, 700, 800; tracking -0.03em).
 * - Inter: Interfaz, cuerpo y precios con soporte tabular-nums (pesos 400, 500, 600).
 */
const outfit = Outfit({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-outfit',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  readonly children: ReactNode;
}) {
  return (
    <html lang="es" className={`${outfit.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-[#F8FAFC] text-[#0F172A] antialiased selection:bg-[#F59E0B] selection:text-[#0A1628]">
        {children}
      </body>
    </html>
  );
}
