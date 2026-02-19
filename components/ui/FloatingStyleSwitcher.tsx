import { motion } from "framer-motion";
import { LayoutTemplate, ArrowRight } from "lucide-react";

export const FloatingStyleSwitcher = ({
  onOpen,
  label = "Cambiar diseño",
}: {
  onOpen: () => void;
  label?: string;
}) => (
  <motion.button
    onClick={onOpen}
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -2 }}
    className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 rounded-full border border-black/10 bg-white/90 backdrop-blur px-3 py-2 sm:px-4 sm:py-2 shadow-lg shadow-black/10 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-gray-900 hover:bg-white transition-colors active:scale-95"
  >
    <LayoutTemplate size={14} className="shrink-0" />
    <span className="hidden sm:inline">{label}</span>
    <span className="sm:hidden">Diseños</span>
    <ArrowRight size={14} className="opacity-60 shrink-0" />
  </motion.button>
);
