import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'Eclipse Total Quintanarraya 2026',
  description: 'Reserva tu entrada gratuita para el eclipse el 12 de agosto de 2026 en Quintanarraya, Burgos. Gestión de aforo y estaciones de observación.',
  keywords: ['eclipse 2026', 'Quintanarraya', 'Burgos', 'astronomia', 'oscuridad total', 'Astro-Pass'],
};
export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
