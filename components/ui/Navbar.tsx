import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ViewType } from "../types";
import { NAV_ITEMS } from "../constants";

export const Navbar = ({
  activeView,
  setView,
}: {
  activeView: ViewType;
  setView: (v: ViewType) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all safe-top">
      <div className="container mx-auto px-3 sm:px-6 h-12 sm:h-20 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xl sm:text-2xl font-bold cursor-pointer text-black shrink-0" onClick={() => { setView("Home"); setIsOpen(false); }}>
          <img 
            src="/nexo-logo.png" 
            alt="Nexo Studio Logo" 
            className="h-8 sm:h-10 w-auto max-h-10 max-w-[160px] object-contain" 
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }}
          />
          <div className="hidden flex items-center gap-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white text-xs sm:text-sm font-bold">N</span>
            </div>
            <span>Nexo Studio</span>
          </div>
        </div>

        <div className="hidden lg:flex items-end gap-8">
            {/* Nosotros (Home) */}
             <div className="flex flex-col justify-end h-full pb-3"> 
                <button
                onClick={() => setView("Home")}
                className={`text-sm font-medium transition-colors ${
                    activeView === "Home" ? "text-black font-bold" : "text-gray-600 hover:text-black"
                }`}
                >
                Nosotros
                </button>
            </div>

            {/* Demos Group */}
            <div className="flex flex-col items-center">
                <span className="text-[10px] uppercase tracking-widest text-gray-400 mb-1 font-semibold">Demos</span>
                <div className="flex items-center gap-1 bg-black p-1.5 rounded-full border border-gray-800">
                    {NAV_ITEMS.filter(item => item.id !== "Home").map((item) => {
                    const isActive = activeView === item.id;
                    return (
                        <button
                        key={item.id}
                        onClick={() => setView(item.id)}
                        className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 outline-none ${
                            isActive ? "text-black bg-white" : "text-gray-400 hover:text-white"
                        }`}
                        >
                        {isActive && (
                             <motion.div
                                layoutId="nav-pill"
                                className="absolute inset-0 bg-white rounded-full shadow-sm"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        <span className="relative z-10 flex items-center gap-2 text-xs">{item.label}</span>
                        </button>
                    );
                    })}
                </div>
            </div>
        </div>

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
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 top-12 sm:top-20 bg-black/20 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: "spring", bounce: 0, duration: 0.35 }}
              className="lg:hidden fixed left-0 right-0 top-12 sm:top-20 z-50 bg-white border-b border-gray-100 shadow-xl max-h-[calc(100dvh-3rem)] sm:max-h-[calc(100dvh-5rem)] overflow-y-auto"
            >
              <div className="flex flex-col p-3 gap-1 safe-bottom">
                {/* Home / Nosotros item */}
                <button
                  onClick={() => {
                    setView("Home");
                    setIsOpen(false);
                  }}
                  className={`p-3 rounded-xl text-left flex items-center gap-3 transition-all text-sm font-medium ${
                    activeView === "Home" 
                      ? "bg-black text-white shadow-lg shadow-black/10" 
                      : "hover:bg-gray-50 text-gray-800 active:bg-gray-100"
                  }`}
                >
                  {NAV_ITEMS.find(i => i.id === "Home")?.icon}
                  <span>Nosotros</span>
                </button>

                {/* Demos label */}
                <div className="px-4 pt-3 pb-1">
                  <span className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
                    Demos
                  </span>
                </div>

                {/* Demo items */}
                {NAV_ITEMS.filter(item => item.id !== "Home").map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setView(item.id);
                      setIsOpen(false);
                    }}
                    className={`p-3 rounded-xl text-left flex items-center gap-3 transition-all text-sm font-medium ${
                      activeView === item.id 
                        ? "bg-black text-white shadow-lg shadow-black/10" 
                        : "hover:bg-gray-50 text-gray-800 active:bg-gray-100"
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};
