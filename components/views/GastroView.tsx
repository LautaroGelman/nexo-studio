"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ChevronDown,
  ChefHat,
  Star,
  MapPin,
  Clock,
  Smartphone,
  Instagram,
  Facebook,
  CalendarCheck,
} from "lucide-react";
import { DemoProps } from "../types";
import { whatsappLink } from "../constants";

export const GastroView = ({ onBackToStudio }: DemoProps) => {
  const [activeTab, setActiveTab] = useState<"food" | "drinks">("food");
  const [reservaOpen, setReservaOpen] = useState(false);
  const reduced = useReducedMotion();

  const menuItems = {
    food: [
      { name: "Ribeye Steak Aged", price: "$45", desc: "Corte premium madurado 45 días, acompañado de puré trufado.", tags: "Carne / Premium" },
      { name: "Salmón Noruego", price: "$32", desc: "A la parrilla con salsa de cítricos y vegetales orgánicos.", tags: "Pescado / Fresco" },
      { name: "Risotto de Hongos", price: "$28", desc: "Arroz arborio, selección de hongos silvestres y aceite de trufa.", tags: "Vegetariano" },
      { name: "Magret de Pato", price: "$36", desc: "Pato laqueado con miel de agave y reducción de balsámico.", tags: "Aves / Gourmet" },
    ],
    drinks: [
      { name: "Old Fashioned Smoked", price: "$18", desc: "Bourbon, angostura bitters, azúcar y humo de roble americano.", tags: "Clásico" },
      { name: "Gin Basil Smash", price: "$16", desc: "Gin infusionado, albahaca fresca y toque de limón.", tags: "Refrescante" },
      { name: "Mezcalita de Jamaica", price: "$15", desc: "Mezcal artesanal, infusión de jamaica y borde de sal de gusano.", tags: "Mexicano" },
      { name: "Negroni Sbagliato", price: "$14", desc: "Campari, Vermouth Rosso y Prosecco.", tags: "Aperitivo" },
    ],
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20 sm:pt-24 bg-[#0c0c0c] text-stone-200 selection:bg-amber-500/30 overflow-x-hidden"
      style={{ fontFamily: "var(--font-serif-editorial), 'EB Garamond', 'Cormorant Garamond', Georgia, serif" }}
    >
      {/* HERO */}
      <section className="relative min-h-[50vh] md:min-h-[60vh] py-16 md:py-24 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#0c0c0c] z-10" />
          <motion.div
            initial={{ scale: reduced ? 1 : 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "easeOut" }}
            className="w-full h-full bg-[url('https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80')] bg-cover bg-center"
          />
        </div>

        <div className="relative z-20 text-center px-4 sm:px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p
              className="text-amber-500 text-xs sm:text-sm md:text-base font-medium tracking-[0.3em] sm:tracking-[0.4em] uppercase mb-4 sm:mb-6"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              Est. 2024 · Demo Nexo
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-white mb-4 sm:mb-6 tracking-tight leading-none">
              La Boheme
            </h1>
            <p className="text-stone-300 text-base sm:text-lg md:text-2xl font-light italic opacity-90 mb-8 sm:mb-10 px-2">
              Donde la gastronomía se encuentra con el arte
            </p>
            <motion.button
              whileHover={reduced ? undefined : { scale: 1.05 }}
              whileTap={reduced ? undefined : { scale: 0.95 }}
              onClick={() => setReservaOpen(true)}
              className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white text-sm tracking-widest uppercase transition-colors inline-flex items-center gap-2"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              <CalendarCheck size={16} />
              Reservar Mesa
            </motion.button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white/50 animate-bounce"
        >
          <ChevronDown size={32} />
        </motion.div>
      </section>

      {/* PHILOSOPHY */}
      <section className="py-14 sm:py-24 md:py-32 px-4 sm:px-6">
        <div className="container mx-auto grid md:grid-cols-2 gap-10 sm:gap-16 items-center">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span
                className="text-amber-500 text-sm tracking-widest uppercase block mb-3"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                Nuestra Esencia
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl text-white mb-4 sm:mb-6">
                Cocina de Autor &amp; <br /> Alma Libre
              </h2>
              <div className="w-20 h-0.5 bg-amber-500 mb-6" />
              <p className="text-stone-400 text-lg leading-relaxed font-light">
                En La Boheme, cada plato es una historia contada a través de sabores.
                Fusionamos técnicas clásicas con ingredientes locales de temporada para
                crear una experiencia sensorial inolvidable.
              </p>
              <br />
              <p className="text-stone-400 text-lg leading-relaxed font-light">
                Nuestro ambiente está diseñado para detener el tiempo, permitiéndote
                disfrutar de la compañía, el vino y la vida misma.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-6 sm:gap-8 pt-4">
              <div>
                <ChefHat className="text-amber-500 mb-3" size={28} />
                <h4 className="text-white text-lg sm:text-xl mb-1">Chef Ejecutivo</h4>
                <p className="text-stone-500 text-sm">Alejandro M.</p>
              </div>
              <div>
                <Star className="text-amber-500 mb-3" size={28} />
                <h4 className="text-white text-lg sm:text-xl mb-1">Experiencia</h4>
                <p className="text-stone-500 text-sm">Curada y memorable</p>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 border border-white/10 z-0 rotate-3" />
            <img
              src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80"
              alt=""
              className="relative z-10 w-full h-[350px] sm:h-[450px] md:h-[600px] object-cover filter brightness-75"
            />
          </motion.div>
        </div>
      </section>

      {/* MENU */}
      <section className="py-14 sm:py-24 bg-[#111] relative">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl relative z-10">
          <div className="text-center mb-10 sm:mb-16">
            <span
              className="text-amber-500 text-xs sm:text-sm tracking-widest uppercase"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              Descubre
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-white mt-2 mb-6 sm:mb-8">
              Nuestro Menú
            </h2>

            <div className="flex justify-center gap-6 sm:gap-8 mb-8" style={{ fontFamily: "var(--font-geist-sans)" }}>
              <button
                onClick={() => setActiveTab("food")}
                className={`text-sm tracking-widest uppercase py-2 border-b-2 transition-colors ${
                  activeTab === "food"
                    ? "border-amber-500 text-white"
                    : "border-transparent text-stone-500 hover:text-stone-300"
                }`}
              >
                Cocina
              </button>
              <button
                onClick={() => setActiveTab("drinks")}
                className={`text-sm tracking-widest uppercase py-2 border-b-2 transition-colors ${
                  activeTab === "drinks"
                    ? "border-amber-500 text-white"
                    : "border-transparent text-stone-500 hover:text-stone-300"
                }`}
              >
                Coctelería
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 sm:gap-x-12 gap-y-10 sm:gap-y-16">
            <AnimatePresence mode="wait">
              {menuItems[activeTab].map((item, idx) => (
                <motion.div
                  key={`${activeTab}-${idx}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: idx * 0.1 }}
                  className="group relative"
                >
                  <div className="flex justify-between items-baseline mb-2 sm:mb-3 relative z-10">
                    <h3 className="text-lg sm:text-2xl text-stone-100 group-hover:text-amber-500 transition-colors">
                      {item.name}
                    </h3>
                    <div className="flex-grow mx-3 sm:mx-4 border-b border-stone-800 border-dashed opacity-30" />
                    <span className="text-lg sm:text-xl text-amber-500 font-medium shrink-0">
                      {item.price}
                    </span>
                  </div>
                  <p className="text-stone-400 italic font-light text-sm sm:text-base">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="text-center mt-10 sm:mt-16">
            <button
              className="text-stone-400 hover:text-white border border-stone-700 hover:border-amber-500 px-8 py-3 transition-all text-xs tracking-widest uppercase"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              Ver Menú Completo
            </button>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="grid grid-cols-1 sm:grid-cols-3 h-[600px] sm:h-[400px] md:h-[600px]">
        {[
          { img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80", label: "Ambiente" },
          { img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80", label: "Gastronomía" },
          { img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80", label: "Mixología" },
        ].map((g, i) => (
          <div key={i} className="group relative overflow-hidden">
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/0 transition-colors z-10" />
            <img
              src={g.img}
              alt=""
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div
              className="absolute bottom-8 left-8 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              <span className="text-white tracking-widest uppercase text-sm">{g.label}</span>
            </div>
          </div>
        ))}
      </section>

      {/* INFO */}
      <section className="py-14 sm:py-24 bg-stone-950 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-12">
            <div>
              <MapPin className="text-stone-500 mb-4" size={22} />
              <h3
                className="text-white text-lg sm:text-xl mb-3 sm:mb-4 tracking-wide uppercase"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                Ubicación
              </h3>
              <p className="text-stone-300">Av. Libertador 1234</p>
              <p className="text-stone-300">Palermo Soho, Buenos Aires</p>
            </div>

            <div>
              <Clock className="text-stone-500 mb-4" size={22} />
              <h3
                className="text-white text-lg sm:text-xl mb-3 sm:mb-4 tracking-wide uppercase"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                Horarios
              </h3>
              <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-stone-300 max-w-[240px]">
                <dt className="text-stone-500">Mar - Jue</dt>
                <dd>19:00 — 01:00</dd>
                <dt className="text-stone-500">Vie - Sáb</dt>
                <dd>19:00 — 03:00</dd>
                <dt className="text-stone-500">Domingos</dt>
                <dd>12:00 — 17:00</dd>
              </dl>
            </div>

            <div>
              <Smartphone className="text-stone-500 mb-4" size={22} />
              <h3
                className="text-white text-lg sm:text-xl mb-3 sm:mb-4 tracking-wide uppercase"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                Contacto
              </h3>
              <a
                href={whatsappLink("Hola! Quiero reservar mesa en La Boheme (demo Nexo).")}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-300 hover:text-amber-500 transition-colors block mb-4"
              >
                +54 9 2616 52 7611
              </a>
              <div className="flex gap-4">
                <a
                  href="#"
                  aria-label="Instagram"
                  className="p-2 border border-stone-800 rounded-full hover:border-amber-500 hover:text-amber-500 transition-colors inline-flex"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="#"
                  aria-label="Facebook"
                  className="p-2 border border-stone-800 rounded-full hover:border-amber-500 hover:text-amber-500 transition-colors inline-flex"
                >
                  <Facebook size={18} />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-stone-800 text-stone-500 text-xs text-center">
            <button
              onClick={onBackToStudio}
              className="hover:text-amber-500 transition-colors uppercase tracking-widest"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              ← Volver al estudio
            </button>
          </div>
        </div>
      </section>

      {/* MODAL DE RESERVA (deriva a WhatsApp) */}
      <AnimatePresence>
        {reservaOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setReservaOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[70]"
            />
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[71] flex items-center justify-center p-4 pointer-events-none"
            >
              <ReservaModal
                onClose={() => setReservaOpen(false)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ─── Modal de reserva ─────────────────────────────────────────────── */
function ReservaModal({ onClose }: { onClose: () => void }) {
  const [data, setData] = useState({
    name: "",
    date: "",
    time: "21:00",
    people: 2,
    notes: "",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hola! Quiero reservar mesa en La Boheme (demo Nexo).
Nombre: ${data.name}
Fecha: ${data.date}
Hora: ${data.time}
Personas: ${data.people}
Notas: ${data.notes || "-"}`;
    window.open(whatsappLink(msg), "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <form
      onSubmit={submit}
      className="pointer-events-auto w-full max-w-lg bg-[#111] border border-stone-800 rounded-2xl p-6 sm:p-7 text-stone-200 shadow-2xl"
      style={{ fontFamily: "var(--font-geist-sans)" }}
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-amber-500 font-bold">
            La Boheme
          </div>
          <h3 className="text-2xl font-semibold text-white mt-1">Reservar mesa</h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="text-stone-400 hover:text-white text-xl px-2"
        >
          ×
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="block sm:col-span-2">
          <span className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">
            Nombre
          </span>
          <input
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            required
            className="mt-1 w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-amber-500/60"
          />
        </label>
        <label className="block">
          <span className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">
            Fecha
          </span>
          <input
            type="date"
            value={data.date}
            onChange={(e) => setData({ ...data, date: e.target.value })}
            required
            className="mt-1 w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-amber-500/60"
          />
        </label>
        <label className="block">
          <span className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">
            Hora
          </span>
          <input
            type="time"
            value={data.time}
            onChange={(e) => setData({ ...data, time: e.target.value })}
            required
            className="mt-1 w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-amber-500/60"
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">
            Comensales
          </span>
          <input
            type="number"
            min={1}
            max={20}
            value={data.people}
            onChange={(e) => setData({ ...data, people: parseInt(e.target.value || "1", 10) })}
            className="mt-1 w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-amber-500/60"
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">
            Notas
          </span>
          <textarea
            value={data.notes}
            onChange={(e) => setData({ ...data, notes: e.target.value })}
            rows={3}
            placeholder="Alergias, ocasión especial, preferencias…"
            className="mt-1 w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-amber-500/60 resize-none"
          />
        </label>
      </div>

      <button
        type="submit"
        className="mt-5 w-full bg-amber-600 text-white font-semibold rounded-lg py-3 hover:bg-amber-700 transition-colors uppercase tracking-widest text-xs"
      >
        Confirmar por WhatsApp
      </button>
      <p className="text-[11px] text-stone-500 mt-3 text-center">
        Demo · en el sitio final esto se conecta con Cover Manager, Resy u OpenTable.
      </p>
    </form>
  );
}
