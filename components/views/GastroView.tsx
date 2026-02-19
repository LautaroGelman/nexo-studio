"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Utensils,
  ChefHat,
  Star,
  MapPin,
  Clock,
  Smartphone,
  Instagram,
  Facebook,
} from "lucide-react";

export const GastroView = () => {
  const [activeTab, setActiveTab] = useState<"food" | "drinks">("food");

  const menuItems = {
    food: [
      {
        name: "Ribeye Steak Aged",
        price: "$45",
        desc: "Corte premium madurado 45 días, acompañado de puré trufado.",
        tags: "Carne / Premium",
      },
      {
        name: "Salmón Noruego",
        price: "$32",
        desc: "A la parrilla con salsa de cítricos y vegetales orgánicos.",
        tags: "Pescado / Fresco",
      },
      {
        name: "Risotto de Hongos",
        price: "$28",
        desc: "Arroz arborio, selección de hongos silvestres y aceite de trufa.",
        tags: "Vegetariano",
      },
      {
        name: "Magret de Pato",
        price: "$36",
        desc: "Pato laqueado con miel de agave y reducción de balsámico.",
        tags: "Aves / Gourmet",
      },
    ],
    drinks: [
      {
        name: "Old Fashioned Smoked",
        price: "$18",
        desc: "Bourbon, angostura bitters, azúcar y humo de roble americano.",
        tags: "Clásico",
      },
      {
        name: "Gin Basil Smash",
        price: "$16",
        desc: "Gin infusionado, albahaca fresca y toque de limón.",
        tags: "Refrescante",
      },
      {
        name: "Mezcalita de Jamaica",
        price: "$15",
        desc: "Mezcal artesanal, infusión de jamaica y borde de sal de gusano.",
        tags: "Mexicano",
      },
      {
        name: "Negroni Sbagliato",
        price: "$14",
        desc: "Campari, Vermouth Rosso y Prosecco.",
        tags: "Aperitivo",
      },
    ],
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-16 sm:pt-20 bg-[#0c0c0c] text-stone-200 font-serif selection:bg-amber-500/30 overflow-x-hidden"
    >

      {/* HERO */}
      <section className="relative min-h-[50vh] md:min-h-[60vh] py-16 md:py-24 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#0c0c0c] z-10" />
          <motion.div
            initial={{ scale: 1.1 }}
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
            <p className="text-amber-500 text-xs sm:text-sm md:text-base font-sans font-medium tracking-[0.3em] sm:tracking-[0.4em] uppercase mb-4 sm:mb-6">
              Est. 2024
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-white mb-4 sm:mb-6 tracking-tight leading-none">
              La Boheme
            </h1>
            <p className="text-stone-300 text-base sm:text-lg md:text-2xl font-light italic opacity-90 mb-8 sm:mb-10 px-2">
              Donde la gastronomía se encuentra con el arte
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-sans text-sm tracking-widest uppercase transition-colors"
            >
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
              <span className="text-amber-500 font-sans text-sm tracking-widest uppercase block mb-3">
                Nuestra Esencia
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl text-white mb-4 sm:mb-6">
                Cocina de Autor & <br /> Alma Libre
              </h2>
              <div className="w-20 h-0.5 bg-amber-500 mb-6" />
              <p className="text-stone-400 text-lg leading-relaxed font-light">
                En La Boheme, cada plato es una historia contada a través de sabores.
                Fusionamos técnicas clásicas con ingredientes locales de temporada para
                crear una experiencia sensorial inolvidable.
              </p>
              <br />
              <p className="text-stone-400 text-lg leading-relaxed font-light">
                Nuestro ambiente está diseñado para detener el tiempo, permitiéndole
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
              alt="Chef plating"
              className="relative z-10 w-full h-[350px] sm:h-[450px] md:h-[600px] object-cover filter brightness-75"
            />
          </motion.div>
        </div>
      </section>

      {/* MENU */}
      <section className="py-14 sm:py-24 bg-[#111] relative">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl relative z-10">
          <div className="text-center mb-10 sm:mb-16">
            <span className="text-amber-500 font-sans text-xs sm:text-sm tracking-widest uppercase">
              Descubre
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-white mt-2 mb-6 sm:mb-8">Nuestro Menú</h2>

            <div className="flex justify-center gap-6 sm:gap-8 mb-8 font-sans">
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
                    <span className="text-lg sm:text-xl text-amber-500 font-medium shrink-0">{item.price}</span>
                  </div>
                  <p className="text-stone-400 italic font-light text-sm sm:text-base">{item.desc}</p>
                  <div className="absolute -left-4 top-2 w-0.5 h-0 bg-amber-500 group-hover:h-8 transition-all duration-300" />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="text-center mt-10 sm:mt-16">
            <button className="text-stone-400 hover:text-white border border-stone-700 hover:border-amber-500 px-8 py-3 transition-all font-sans text-xs tracking-widest uppercase">
              Ver Menú Completo
            </button>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="grid grid-cols-1 sm:grid-cols-3 h-[600px] sm:h-[400px] md:h-[600px]">
        {[
          {
            img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80",
            label: "Ambiente",
          },
          {
            img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80",
            label: "Gastronomía",
          },
          {
            img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80",
            label: "Mixología",
          },
        ].map((g, i) => (
          <div key={i} className="group relative overflow-hidden">
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/0 transition-colors z-10" />
            <img
              src={g.img}
              alt={g.label}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute bottom-8 left-8 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <span className="text-white font-sans tracking-widest uppercase text-sm">
                {g.label}
              </span>
            </div>
          </div>
        ))}
      </section>

      {/* INFO */}
      <section className="py-14 sm:py-24 bg-stone-950 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-12 text-center sm:text-left">
            <div className="flex flex-col items-center sm:items-start">
              <MapPin className="text-stone-600 mb-4" size={22} />
              <h3 className="text-white text-lg sm:text-xl mb-3 sm:mb-4 font-sans tracking-wide uppercase">
                Ubicación
              </h3>
              <p className="text-stone-400">Av. Libertador 1234</p>
              <p className="text-stone-400">Palermo Soho, Buenos Aires</p>
            </div>

            <div className="flex flex-col items-center sm:items-start">
              <Clock className="text-stone-600 mb-4" size={22} />
              <h3 className="text-white text-lg sm:text-xl mb-3 sm:mb-4 font-sans tracking-wide uppercase">
                Horarios
              </h3>
              <p className="text-stone-400 flex justify-between w-full max-w-[200px]">
                <span className="text-stone-600">Mar - Jue:</span> 19:00 - 01:00
              </p>
              <p className="text-stone-400 flex justify-between w-full max-w-[200px]">
                <span className="text-stone-600">Vie - Sáb:</span> 19:00 - 03:00
              </p>
              <p className="text-stone-400 flex justify-between w-full max-w-[200px]">
                <span className="text-stone-600">Dom:</span> 12:00 - 17:00
              </p>
            </div>

            <div className="flex flex-col items-center sm:items-start">
              <Smartphone className="text-stone-600 mb-4" size={22} />
              <h3 className="text-white text-lg sm:text-xl mb-3 sm:mb-4 font-sans tracking-wide uppercase">
                Contacto
              </h3>
              <p className="text-stone-400 mb-4">+54 11 1234-5678</p>
              <div className="flex gap-4">
                <div className="p-2 border border-stone-800 rounded-full hover:border-amber-500 hover:text-amber-500 transition-colors cursor-pointer">
                  <Instagram size={18} />
                </div>
                <div className="p-2 border border-stone-800 rounded-full hover:border-amber-500 hover:text-amber-500 transition-colors cursor-pointer">
                  <Facebook size={18} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAB */}
      <motion.a
        href="https://wa.me/"
        target="_blank"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-6 right-4 sm:bottom-8 sm:right-8 bg-amber-600/90 text-white p-3.5 sm:p-4 rounded-full shadow-2xl z-50 hover:bg-amber-600 transition-colors border border-white/10 backdrop-blur-sm"
      >
        <Utensils size={24} />
      </motion.a>
    </motion.div>
  );
};
