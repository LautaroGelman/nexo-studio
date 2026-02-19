"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { ViewType } from "@/components/types";
import { Navbar } from "@/components/ui/Navbar";
import { HomeView } from "@/components/views/HomeView";
import { CorporateView } from "@/components/views/CorporateView";
import { GastroView } from "@/components/views/GastroView";
import { CatalogView } from "@/components/views/CatalogView";
import { HealthView } from "@/components/views/HealthView";
import { IndustrialView } from "@/components/views/IndustrialView";

export default function Page() {
  const [currentView, setCurrentView] = useState<ViewType>("Home");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  return (
    <main className="min-h-screen bg-white relative font-sans text-gray-900 overflow-x-hidden">
      <Navbar activeView={currentView} setView={setCurrentView} />

      <AnimatePresence mode="wait">
        {currentView === "Home" && (
          <HomeView key="home" onNavigate={setCurrentView} />
        )}

        {currentView === "Corporativa" && (
          <CorporateView key="corporate" />
        )}

        {currentView === "Gastronomica" && (
          <GastroView key="gastro" />
        )}

        {currentView === "Catalogo" && (
          <CatalogView key="catalog" />
        )}

        {currentView === "Salud" && (
          <HealthView key="health" />
        )}

        {currentView === "Industrial" && (
          <IndustrialView key="industrial" />
        )}
      </AnimatePresence>
    </main>
  );
}
