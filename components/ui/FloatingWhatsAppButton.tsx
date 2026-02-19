"use client";
import React, { useState } from "react";

type Props = {
  phoneNumber?: string;
  message?: string;
  size?: number;
  bottom?: string;
  right?: string;
};

export default function FloatingWhatsAppButton({
  phoneNumber = "",
  message = "",
  size = 60, // 96px suele ser muy grande, 60-64px es el estándar ideal para web
  bottom = "24px",
  right = "24px",
}: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const normalized = (phoneNumber || "").replace(/\D/g, "");
  if (!normalized) return null;

  const href = `https://wa.me/${normalized}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

  // Manejo de animaciones de forma reactiva (evita mutar el DOM directamente)
  const scale = isActive ? "scale(0.95)" : isHovered ? "scale(1.05)" : "scale(1)";

  const commonStyle: React.CSSProperties = {
    position: "fixed",
    bottom,
    right,
    width: size,
    height: size,
    borderRadius: "50%", // "50%" es más semántico que "9999px" para círculos perfectos
    background: "#25D366",
    boxShadow: "0 6px 18px rgba(37,211,102,0.4)", // Sombra ligeramente más intensa
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    cursor: "pointer",
    transition: "transform 200ms ease-in-out, box-shadow 200ms ease",
    transform: scale,
    textDecoration: "none",
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      style={commonStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsActive(false);
      }}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
    >
      {/* Usamos el SVG completo de WhatsApp. Sin dependencias externas ni estados de error */}
      <svg
        width={size * 0.45} // El ícono ocupa el 45% del botón, dando respiro a los bordes
        height={size * 0.45}
        viewBox="0 0 24 24"
        fill="white"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          // Este filtro recrea la sombra oscura central que se ve en tu imagen
          filter: "drop-shadow(0px 2px 4px rgba(0, 100, 0, 0.5))"
        }}
      >
        <path d="M12.031 0C5.385 0 0 5.384 0 12.034c0 2.12.553 4.179 1.604 5.991L.445 24l6.147-1.612c1.738.955 3.708 1.458 5.744 1.458h.005c6.645 0 12.03-5.385 12.03-12.035C24.37 5.166 18.847 0 12.031 0zm0 21.848c-1.874 0-3.714-.504-5.32-1.457l-.382-.226-3.953 1.037 1.056-3.856-.248-.395C2.115 15.346 1.55 13.722 1.55 12.035c0-5.79 4.712-10.5 10.504-10.5 5.79 0 10.485 4.71 10.485 10.5 0 5.789-4.708 10.495-10.508 10.495zm5.759-7.864c-.316-.158-1.867-.922-2.157-1.028-.289-.105-.5-.158-.71.158-.211.316-.816 1.028-1.002 1.238-.184.21-.368.237-.684.079-2.052-1.028-3.385-1.928-4.66-3.83-.158-.237-.018-.363.14-.52.146-.145.315-.368.473-.553.158-.184.21-.316.316-.526.105-.21.053-.395-.026-.553-.08-.158-.71-1.71-1.003-2.338-.283-.605-.57-.523-.786-.533l-.634-.01c-.21 0-.554.079-.844.395-.29.316-1.106 1.08-1.106 2.633 0 1.554 1.133 3.055 1.29 3.266.158.21 2.228 3.402 5.397 4.764.756.326 1.346.521 1.808.667.759.24 1.45.206 1.995.125.613-.092 1.867-.764 2.13-1.501.264-.737.264-1.369.185-1.501-.08-.132-.29-.21-.606-.369z"/>
      </svg>
    </a>
  );
}