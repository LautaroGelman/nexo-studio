"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { ViewType } from "../types";
import { NAV_ITEMS, whatsappLink } from "../constants";

export const Navbar = ({
  activeView,
  setView,
  isHidden = false,
}: {
  activeView: ViewType;
  setView: (v: ViewType) => void;
  isHidden?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);
  const [demosOpen, setDemosOpen] = useState(false);
  const demosRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Cierra el dropdown al clickear fuera o al apretar Escape
  useEffect(() => {
    if (!demosOpen) return;
    const onDocClick = (e: MouseEvent) => {
      if (
        demosRef.current &&
        !demosRef.current.contains(e.target as Node)
      ) {
        setDemosOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDemosOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [demosOpen]);

  const demos = NAV_ITEMS.filter((i) => i.id !== "Home");
  const activeDemo = demos.find((d) => d.id === activeView);

  return (
    <nav
      className={`studio-nav fixed left-0 w-full z-50 bg-white/85 backdrop-blur-md border-b border-gray-100 transition-all duration-500 ease-in-out safe-top ${
        isHidden ? "-translate-y-full" : "translate-y-0"
      }`}
      // Offset para dejar lugar a la DemoContextBar cuando exista
      style={{ top: "var(--demo-bar-h, 0px)" }}
      aria-label="Navegación principal"
    >
      <div className="container mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-4">
        {/* Logo / brand */}
        <button
          onClick={() => {
            setView("Home");
            setIsOpen(false);
          }}
          className="flex items-center gap-2 text-xl sm:text-2xl font-bold cursor-pointer text-black shrink-0"
          aria-label="Ir al inicio de Nexo Studio"
        >
          {!logoFailed ? (
            <img
              src="/nexo-logo.png"
              alt="Nexo Studio"
              onError={() => setLogoFailed(true)}
              className="h-8 sm:h-9 w-auto max-h-9 max-w-[160px] object-contain"
            />
          ) : (
            <span className="flex items-center gap-2">
              <span className="w-7 h-7 sm:w-8 sm:h-8 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white text-xs sm:text-sm font-bold">N</span>
              </span>
              <span>Nexo Studio</span>
            </span>
          )}
        </button>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-7">
          <button
            onClick={() => setView("Home")}
            className={`text-sm font-medium transition-colors ${
              activeView === "Home"
                ? "text-black font-semibold"
                : "text-gray-600 hover:text-black"
            }`}
          >
            Estudio
          </button>

          {/* Demos dropdown */}
          <div className="relative" ref={demosRef}>
            <button
              onClick={() => setDemosOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={demosOpen}
              className={`text-sm font-medium transition-colors flex items-center gap-1.5 ${
                activeView !== "Home"
                  ? "text-black font-semibold"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              Demos
              <ChevronDown
                size={14}
                className={`transition-transform ${
                  demosOpen ? "rotate-180" : ""
                }`}
              />
              {activeDemo && (
                <span className="ml-1 inline-block px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wider bg-black text-white">
                  {activeDemo.label}
                </span>
              )}
            </button>

            <AnimatePresence>
              {demosOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  role="menu"
                  className="absolute right-0 mt-3 w-[320px] bg-white border border-gray-100 rounded-xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)] p-2"
                >
                  <div className="px-3 pt-2 pb-1 text-[10px] uppercase tracking-widest text-gray-400 font-bold flex justify-between items-center">
                    <span>5 estilos · solo demos</span>
                    <span className="normal-case tracking-normal text-gray-400 font-normal">
                      no son plantillas
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-1">
                    {demos.map((d) => {
                      const isActive = activeView === d.id;
                      return (
                        <button
                          key={d.id}
                          role="menuitem"
                          onClick={() => {
                            setView(d.id);
                            setDemosOpen(false);
                          }}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm transition-colors ${
                            isActive
                              ? "bg-black text-white"
                              : "hover:bg-gray-50 text-gray-800"
                          }`}
                        >
                          <span
                            className={`shrink-0 ${
                              isActive ? "text-white" : "text-gray-500"
                            }`}
                          >
                            {d.icon}
                          </span>
                          <span className="font-medium">{d.label}</span>
                          <span
                            aria-hidden
                            className={`ml-auto text-xs ${
                              isActive ? "opacity-100" : "opacity-40"
                            }`}
                          >
                            →
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white text-sm font-semibold hover:bg-gray-900 transition-colors"
          >
            Hablemos
          </a>
        </div>

        {/* Mobile burger */}
        <button
          className="lg:hidden p-2.5 text-black rounded-lg active:bg-gray-100 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 top-14 sm:top-16 bg-black/20 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: "spring", bounce: 0, duration: 0.35 }}
              className="lg:hidden fixed left-0 right-0 top-14 sm:top-16 z-50 bg-white border-b border-gray-100 shadow-xl max-h-[calc(100dvh-3.5rem)] overflow-y-auto"
            >
              <div className="flex flex-col p-3 gap-1 safe-bottom">
                <button
                  onClick={() => {
                    setView("Home");
                    setIsOpen(false);
                  }}
                  className={`p-3 rounded-xl text-left flex items-center gap-3 text-sm font-medium ${
                    activeView === "Home"
                      ? "bg-black text-white"
                      : "hover:bg-gray-50 text-gray-800"
                  }`}
                >
                  {NAV_ITEMS.find((i) => i.id === "Home")?.icon}
                  <span>Estudio</span>
                </button>

                <div className="px-3 pt-3 pb-1 flex justify-between items-center">
                  <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                    Demos
                  </span>
                  <span className="text-[10px] text-gray-400">
                    diseño 100% a medida — no son plantillas
                  </span>
                </div>

                {demos.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setView(item.id);
                      setIsOpen(false);
                    }}
                    className={`p-3 rounded-xl text-left flex items-center gap-3 text-sm font-medium ${
                      activeView === item.id
                        ? "bg-black text-white"
                        : "hover:bg-gray-50 text-gray-800"
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}

                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 p-3 rounded-xl text-center flex items-center justify-center gap-2 text-sm font-semibold bg-black text-white"
                >
                  Hablemos por WhatsApp →
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};
