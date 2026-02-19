import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: "Nexo Studio — Diseño y Desarrollo Web Premium",
  description: "Sitios web profesionales con identidad de marca, diseñados para convertir. Desde $200.000, entrega hasta 7 días.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <FloatingWhatsAppButton
          phoneNumber={process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ""}
          message={process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE ?? "Hola! Te escribo desde el sitio web."}
        />
      </body>
    </html>
  );
}
