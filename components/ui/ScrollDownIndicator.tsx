"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";

/**
 * Indicador "scrollea siempre hacia abajo" para la demo de Moda.
 * - Aparece inmediatamente al entrar al hero (sin persistencia de sesión).
 * - Se oculta apenas el usuario hace scroll (>40px) o pasan 8s.
 * - Respeta reduced-motion.
 */
export const ScrollDownIndicator = ({
  text = "Scrollea siempre hacia abajo para vivir la experiencia",
  accent = "#ffffff",
  textColor = "#ffffff",
  dark = false,
}: {
  text?: string;
  accent?: string;
  textColor?: string;
  /** Si la página de fondo es clara, dark=true vuelve la cápsula oscura. */
  dark?: boolean;
}) => {
  const [visible, setVisible] = useState(true);
  const reduced = useReducedMotion();

  useEffect(() => {
    setVisible(true);

    const onScroll = () => {
      if (window.scrollY > 40) {
        setVisible(false);
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    const t = setTimeout(() => {
      setVisible(false);
    }, 8000);
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(t);
    };
  }, []);

  const fingerY = reduced
    ? { y: 0 }
    : { y: [0, -14, 0], opacity: [0.4, 1, 0.4] };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
          className="fixed inset-x-0 bottom-6 sm:bottom-10 z-[99999] flex justify-center pointer-events-none px-4"
          aria-live="polite"
        >
          <div
            className={`pointer-events-auto flex items-center gap-3 sm:gap-4 rounded-full backdrop-blur-md border px-4 sm:px-5 py-2 sm:py-3 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] ${
              dark
                ? "bg-black/85 border-white/15"
                : "bg-white/15 border-white/30"
            }`}
            style={{ color: textColor }}
          >
            {/* Mano scrolleando */}
            <svg
              width="36"
              height="44"
              viewBox="0 0 36 44"
              fill="none"
              aria-hidden
              className="shrink-0"
            >
              {/* Trazo del dedo + mano simplificada */}
              <g stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
                <path d="M14 6 v15" />
                <path d="M14 6 a3 3 0 0 1 6 0 v13" />
                <path d="M20 14 a3 3 0 0 1 5 0 v8" />
                <path d="M25 16 a3 3 0 0 1 5 0 v10 a8 8 0 0 1 -8 8 h-3 a8 8 0 0 1 -8 -8 v-7" />
                <path d="M11 19 q -3 3 -2 7" />
              </g>
              {/* Flecha que baja, animada */}
              <motion.g
                animate={fingerY}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <path
                  d="M4 4 v8"
                  stroke={accent}
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
                <path
                  d="M1.5 9 L4 12 L6.5 9"
                  stroke={accent}
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </motion.g>
            </svg>

            <div className="leading-tight">
              <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-bold opacity-80">
                Tip
              </div>
              <div className="text-xs sm:text-sm font-medium max-w-[60vw] sm:max-w-none">
                {text}
              </div>
            </div>

            <ChevronDown
              className="shrink-0 opacity-80 ml-1"
              size={18}
              aria-hidden
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollDownIndicator;
