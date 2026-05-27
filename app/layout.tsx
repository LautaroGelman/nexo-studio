import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import FloatingWhatsAppButton from "../components/ui/FloatingWhatsAppButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Editorial serif para gastro / moda. Fija el peso para evitar caer en Times.
const cormorant = Cormorant_Garamond({
  variable: "--font-serif-editorial",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: "Nexo Studio — Diseño y Desarrollo Web a medida",
  description:
    "No vendemos plantillas. Cada sitio se diseña 100% a medida, con identidad de marca propia y pensado para convertir. Entrega en hasta 7 días.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} antialiased`}
      >
        {children}
        <FloatingWhatsAppButton
          phoneNumber="5492616527611"
          message={
            process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE ??
            "Hola Nexo! Te escribo desde el sitio web, me interesa hablar de un proyecto."
          }
        />
      </body>
    </html>
  );
}
