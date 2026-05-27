"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ViewType } from "@/components/types";
import { Navbar } from "@/components/ui/Navbar";
import { HomeView } from "@/components/views/HomeView";
import { CorporateView } from "@/components/views/CorporateView";
import { GastroView } from "@/components/views/GastroView";
import { CatalogView } from "@/components/views/CatalogView";
import { HealthView } from "@/components/views/HealthView";
import { FashionView } from "@/components/views/FashionView";
import { DemoContextBar } from "@/components/ui/DemoContextBar";

const DEMO_ACCENTS: Partial<Record<ViewType, string>> = {
  Corporativa: "#3b82f6",
  Gastronomica: "#f59e0b",
  Catalogo: "#ea580c",
  Salud: "#10b981",
  Moda: "#f43f5e",
};

export default function Page() {
  const [currentView, setCurrentView] = useState<ViewType>("Home");

  useEffect(() => {
    // Reset suave al tope al cambiar de vista
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [currentView]);

  // Mantenemos el navbar siempre visible (la decisión "ocultar" se reemplazó
  // por la barra contextual + Navbar fijo).
  const isDemo = currentView !== "Home";
  const backToStudio = () => setCurrentView("Home");

  // Exponemos la altura de la barra como CSS var para que el Navbar se reposicione.
  useEffect(() => {
    const root = document.documentElement;
    if (isDemo) {
      root.style.setProperty("--demo-bar-h", "36px");
      const m = window.matchMedia("(min-width: 640px)");
      const apply = () =>
        root.style.setProperty("--demo-bar-h", m.matches ? "40px" : "36px");
      apply();
      m.addEventListener("change", apply);
      return () => m.removeEventListener("change", apply);
    } else {
      root.style.setProperty("--demo-bar-h", "0px");
    }
  }, [isDemo]);

  const variants = {
    initial: { opacity: 0, y: 8 },
    enter: { opacity: 1, y: 0, transition: { duration: 0.32, ease: [0.16, 1, 0.3, 1] as const } },
    exit: { opacity: 0, y: -6, transition: { duration: 0.2 } },
  };

  return (
    <main className="min-h-screen bg-white relative font-sans text-gray-900">
      {isDemo && (
        <DemoContextBar
          styleName={String(currentView)}
          onBackToStudio={backToStudio}
          accent={DEMO_ACCENTS[currentView]}
        />
      )}

      <Navbar activeView={currentView} setView={setCurrentView} />

      <AnimatePresence mode="wait">
        {currentView === "Home" && (
          <motion.div
            key="home"
            variants={variants}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            <HomeView onNavigate={setCurrentView} />
          </motion.div>
        )}

        {currentView === "Corporativa" && (
          <motion.div
            key="corporate"
            variants={variants}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            <CorporateView onBackToStudio={backToStudio} onSwitchDemo={setCurrentView} />
          </motion.div>
        )}

        {currentView === "Gastronomica" && (
          <motion.div
            key="gastro"
            variants={variants}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            <GastroView onBackToStudio={backToStudio} onSwitchDemo={setCurrentView} />
          </motion.div>
        )}

        {currentView === "Catalogo" && (
          <motion.div
            key="catalog"
            variants={variants}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            <CatalogView onBackToStudio={backToStudio} onSwitchDemo={setCurrentView} />
          </motion.div>
        )}

        {currentView === "Salud" && (
          <motion.div
            key="health"
            variants={variants}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            <HealthView onBackToStudio={backToStudio} onSwitchDemo={setCurrentView} />
          </motion.div>
        )}

        {currentView === "Moda" && (
          <motion.div
            key="moda"
            variants={variants}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            <FashionView onBackToStudio={backToStudio} onSwitchDemo={setCurrentView} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
