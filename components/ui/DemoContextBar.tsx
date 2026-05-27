"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Layers } from "lucide-react";
import { whatsappLink } from "../constants";

/**
 * Barra contextual que se monta arriba de cada demo.
 * Recuerda al visitante:
 *   - está dentro de un DEMO de Nexo Studio,
 *   - no es una plantilla — es trabajo a medida,
 *   - puede volver al estudio o pedir uno así.
 *
 * Se la pinta por encima del navbar del demo y no se oculta.
 */
export const DemoContextBar = ({
  styleName,
  onBackToStudio,
  accent = "#0ea5e9",
}: {
  styleName: string;
  onBackToStudio: () => void;
  /** Color de acento opcional para que sintonice con cada demo. */
  accent?: string;
}) => {
  const msg = `Hola Nexo! Vi la demo "${styleName}" y me gustaría que diseñen algo así para mi marca.`;
  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-[60] bg-black text-white"
      role="region"
      aria-label="Contexto de la demo"
    >
      <div className="container mx-auto px-3 sm:px-6 h-9 sm:h-10 flex items-center justify-between gap-3 text-[11px] sm:text-xs">
        <button
          onClick={onBackToStudio}
          className="group inline-flex items-center gap-2 font-semibold tracking-wide hover:opacity-70 transition-opacity"
        >
          <ArrowLeft
            size={14}
            className="group-hover:-translate-x-0.5 transition-transform"
          />
          <span className="hidden sm:inline">Volver a Nexo Studio</span>
          <span className="sm:hidden">Nexo</span>
        </button>

        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <span
            className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[9px] sm:text-[10px] font-extrabold tracking-[0.2em] uppercase"
            style={{ background: accent, color: "#0a0a0a" }}
          >
            <Layers size={10} /> Demo
          </span>
          <span className="hidden md:inline opacity-60">·</span>
          <span className="hidden md:inline truncate max-w-[40vw] opacity-80">
            Estilo {styleName} — diseño 100% a medida, no es plantilla
          </span>
          <span className="md:hidden truncate opacity-80">{styleName}</span>
        </div>

        <a
          href={whatsappLink(msg)}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold inline-flex items-center gap-1 hover:opacity-70 transition-opacity"
          style={{ color: accent }}
        >
          <span className="hidden sm:inline">Quiero uno así</span>
          <span className="sm:hidden">Quiero uno</span>
          <span aria-hidden>→</span>
        </a>
      </div>
    </motion.div>
  );
};

/** Spacer para que el contenido de cada demo no quede tapado por la barra. */
export const DemoContextBarSpacer = () => (
  <div aria-hidden className="h-9 sm:h-10" />
);
