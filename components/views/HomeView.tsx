"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Sparkles,
  LayoutTemplate,
  Layers,
  ShieldCheck,
  Zap,
  CheckCircle2,
} from "lucide-react";
import { ViewType } from "../types";
import { STYLE_CARDS } from "../constants";

export const HomeView = ({
  onNavigate,
}: {
  onNavigate: (view: ViewType) => void;
}) => {
  const scrollToShowcase = () => {
    document.getElementById("showcase-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-16 sm:pt-20 bg-white selection:bg-black selection:text-white overflow-x-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

      {/* HERO premium */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-40 -left-40 w-[560px] h-[560px] rounded-full blur-[90px] bg-gradient-to-br from-black/10 to-transparent" />
          <div className="absolute -top-40 -right-40 w-[560px] h-[560px] rounded-full blur-[90px] bg-gradient-to-br from-emerald-500/10 to-transparent" />
          <div className="absolute bottom-[-220px] left-1/2 -translate-x-1/2 w-[900px] h-[420px] rounded-full blur-[90px] bg-gradient-to-r from-indigo-500/10 via-black/5 to-amber-500/10" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 pt-4 pb-12 sm:pt-6 sm:pb-16 md:pt-14 md:pb-20">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/70 backdrop-blur px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm"
            >
              <Sparkles size={14} className="shrink-0" />
              <span className="text-xs sm:text-sm">Diseño y desarrollo web premium · 2026</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.75 }}
              className="mt-5 sm:mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tighter text-gray-900 leading-[1.08]"
            >
              Sitios web con{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-black">
                identidad de marca
              </span>
              .
              <br />
              Y diseñados para{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                convertir
              </span>
              .
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="mt-4 sm:mt-6 text-base sm:text-lg md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed px-1 sm:px-0"
            >
              Tu sitio web profesional, diseñado por profesionales,{" "}
              <span className="font-semibold text-gray-900">desde $200.000</span>, hecho a medida.
              Incluye{" "}
              <span className="font-semibold text-gray-900">2 iteraciones con el cliente</span>{" "}
              (dos instancias de revisión con pedidos de cambios) y entrega{" "}
              <span className="font-semibold text-gray-900">hasta 7 días</span> después del pedido:
              web <span className="font-semibold text-gray-900">funcional</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center gap-3 px-2 sm:px-0"
            >
              <button
                onClick={scrollToShowcase}
                className="group px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-black text-white font-semibold text-base sm:text-lg hover:bg-gray-900 transition-all shadow-xl shadow-black/10 flex items-center justify-center gap-2"
              >
                Explorar diseños
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-sm text-gray-600 px-2 sm:px-0"
            >
              {[
                { icon: <ShieldCheck size={16} />, text: "Código limpio + performance" },
                { icon: <Layers size={16} />, text: "Diseño a medida" },
                { icon: <CheckCircle2 size={16} />, text: "2 iteraciones incluidas" },
                { icon: <Zap size={16} />, text: "Entrega hasta 7 días" },
              ].map((b, i) => (
                <div
                  key={i}
                  className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-gray-200 bg-white/70 backdrop-blur px-3 sm:px-4 py-1.5 sm:py-2 shadow-sm"
                >
                  <span className="shrink-0">{b.icon}</span>
                  <span className="font-semibold text-xs sm:text-sm">{b.text}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="pb-8 flex justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 8, 0] }}
            transition={{ delay: 1, duration: 2, repeat: Infinity }}
            className="text-gray-400 flex flex-col items-center gap-1"
          >
            <span className="text-[10px] uppercase tracking-widest">Scroll</span>
            <ChevronDown size={18} />
          </motion.div>
        </div>
      </section>

      {/* CARD HORIZONTAL: "Algunos ejemplos..." */}
      <section id="showcase-section" className="container mx-auto px-4 sm:px-6 pb-6 md:pb-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-gray-200 bg-white shadow-[0_20px_60px_-30px_rgba(0,0,0,0.18)] overflow-hidden"
        >
          <div className="p-4 sm:p-6 md:p-8 border-b border-gray-100 flex flex-col md:flex-row md:items-end md:justify-between gap-3 sm:gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-700">
                <LayoutTemplate size={14} />
                Showcase
              </div>
              <h2 className="mt-3 text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900">
                Algunos ejemplos de lo que podemos hacer
              </h2>
              <p className="mt-2 text-gray-600 max-w-2xl">
                Elegí un estilo. Podés navegar entre diseños como si fuera un portfolio real.
              </p>
            </div>
          </div>

          {/* horizontal scroller */}
          <div className="p-4 sm:p-6 md:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
              {STYLE_CARDS.map((card, i) => (
                <motion.button
                  key={card.id}
                  onClick={() => onNavigate(card.id)}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  whileHover={{ y: -4 }}
                  className="text-left rounded-2xl border border-gray-200 overflow-hidden bg-white hover:shadow-xl hover:shadow-black/10 transition-all"
                >
                  <div className="relative h-36 sm:h-40 md:h-44">
                    <div className={`absolute inset-0 bg-gradient-to-br ${card.accent}`} />
                    <img
                      src={card.image}
                      alt={card.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-70"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                    <div className="absolute left-4 bottom-4 right-4 sm:left-5 sm:bottom-5 sm:right-5 flex items-end justify-between gap-3 sm:gap-4">
                      <div>
                        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                          {card.icon}
                          {card.title}
                        </div>
                        <div className="mt-2 text-base md:text-lg font-bold text-white">
                          {card.subtitle}
                        </div>
                      </div>
                      <ArrowRight size={18} className="text-white/90" />
                    </div>
                  </div>

                  <div className="p-4 sm:p-5">
                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                      {card.bullets.map((b, idx) => (
                        <div
                          key={idx}
                          className="rounded-xl bg-gray-50 border border-gray-100 px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs font-semibold text-gray-700 text-center"
                        >
                          {b}
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-xs text-gray-500">
                        Abrir estilo
                      </div>
                      <div className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900">
                        Ver demo <ArrowRight size={16} className="opacity-70" />
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* PROCESO + pricing (premium) */}
      <section className="container mx-auto px-4 sm:px-6 py-10 sm:py-16 md:py-20">
        <div className="flex flex-col gap-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-700">
              <Sparkles size={14} />
              Proceso de trabajo
            </div>
            <h3 className="mt-4 text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900">
              Hecho a medida, con iteraciones claras.
            </h3>
            <p className="mt-4 text-gray-600 text-lg leading-relaxed max-w-xl">
              No es "plantilla". Diseñamos el look & feel, el contenido y los
              componentes con criterio de marca y conversión. Entregamos un sitio
              funcional, listo para usar.
            </p>

            <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {[
                { icon: <ShieldCheck size={18} />, title: "Desde $200.000", desc: "Diseño + desarrollo premium, a medida." },
                { icon: <Layers size={18} />, title: "2 iteraciones", desc: "Dos rondas formales de revisión y cambios." },
                { icon: <Zap size={18} />, title: "Hasta 7 días", desc: "Entrega posterior al pedido: web funcional." },
                { icon: <CheckCircle2 size={18} />, title: "Listo para publicar", desc: "Estructura, secciones, CTA y responsive." },
              ].map((f, i) => (
                <div key={i} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-900 text-white flex items-center justify-center">
                      {f.icon}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{f.title}</div>
                      <div className="text-sm text-gray-600">{f.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3">
              <button
                onClick={scrollToShowcase}
                className="px-6 py-3.5 sm:py-3 rounded-xl bg-black text-white font-semibold hover:bg-gray-900 transition-colors text-center"
              >
                Ver estilos
              </button>
              <button
                onClick={() => onNavigate("Corporativa")}
                className="px-6 py-3.5 sm:py-3 rounded-xl bg-white border border-gray-200 text-gray-900 font-semibold hover:bg-gray-50 transition-colors text-center"
              >
                Abrir demo corporativa
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl sm:rounded-3xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-4 sm:p-6 md:p-8 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.18)]"
          >
            <div className="flex items-center justify-between gap-3 sm:gap-4">
              <div>
                <div className="text-xs sm:text-sm font-semibold text-gray-600">Entrega</div>
                <div className="text-xl sm:text-2xl font-extrabold text-gray-900">Hasta 7 días</div>
              </div>
              <div className="rounded-xl sm:rounded-2xl bg-black text-white px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold shrink-0">
                Desde $200.000
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {[
                  {
                    step: "01",
                    title: "Brief + referencia",
                    desc: "Te pedimos contenido base y referencias. Definimos objetivo (ventas, reservas, contacto, catálogo).",
                  },
                  {
                    step: "02",
                    title: "Diseño premium",
                    desc: "Componemos layout, tipografía, jerarquías, CTA y look & feel de marca.",
                  },
                  {
                    step: "03",
                    title: "Iteración 1",
                    desc: "Primera revisión. Ajustes y mejoras por feedback.",
                  },
                  {
                    step: "04",
                    title: "Iteración 2",
                    desc: "Segunda revisión. Refinamos detalles finales y consistencia.",
                  },
                  {
                    step: "05",
                    title: "Entrega funcional",
                    desc: "Sitio listo para publicar, con responsive y buenas prácticas.",
                  },
                ].map((s, i, arr) => (
                  <motion.div
                    key={s.step}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.45 }}
                    className={`relative rounded-xl sm:rounded-2xl border border-gray-200 bg-white p-3.5 sm:p-4 md:p-5 ${
                      i < arr.length - 1
                        ? "lg:after:content-['→'] lg:after:absolute lg:after:-right-3 lg:after:top-1/2 lg:after:-translate-y-1/2 lg:after:text-gray-300 lg:after:text-xl lg:after:font-semibold"
                        : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="shrink-0 w-10 h-10 rounded-2xl bg-gray-900 text-white flex items-center justify-center font-extrabold text-sm">
                        {s.step}
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-gray-900 text-sm leading-snug">{s.title}</div>
                        <div className="text-xs text-gray-600 leading-relaxed mt-1">
                          {s.desc}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-5 sm:mt-6 rounded-xl sm:rounded-2xl border border-gray-200 bg-gray-50 p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 text-gray-900">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <div className="font-bold text-gray-900">Nota</div>
                  <div className="text-sm text-gray-600">
                    "2 iteraciones" = dos rondas formales de revisión con pedidos de cambios, para asegurar calidad sin desbordes.
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA final */}
      <section className="container mx-auto px-4 sm:px-6 pb-14 sm:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl sm:rounded-[2.5rem] bg-black text-white p-5 sm:p-8 md:p-12 overflow-hidden relative"
        >
          <div className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full bg-white/10 blur-[80px]" />
          <div className="absolute -bottom-48 -left-48 w-[520px] h-[520px] rounded-full bg-white/10 blur-[90px]" />

          <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold">
                <Sparkles size={14} />
                Listo para vender mejor
              </div>
              <h3 className="mt-4 text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight">
                Hagamos tu próxima landing.
              </h3>
              <p className="mt-3 text-white/80 text-base sm:text-lg leading-relaxed">
                Diseño de máxima calidad, con narrativa, jerarquías, y CTA. Entrega funcional hasta 7 días, con 2 iteraciones incluidas.
              </p>
            </div>

            <div className="rounded-2xl sm:rounded-3xl border border-white/15 bg-white/10 backdrop-blur p-4 sm:p-6">
              <div className="text-sm font-semibold text-white/80">Dejá tus datos</div>
              <div className="mt-3 grid grid-cols-1 gap-3">
                <input
                  placeholder="Nombre"
                  className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-white placeholder:text-white/50 outline-none focus:border-white/40"
                />
                <input
                  placeholder="WhatsApp"
                  className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-white placeholder:text-white/50 outline-none focus:border-white/40"
                />
                <button
                  type="button"
                  className="w-full rounded-xl bg-white text-black font-bold py-3 hover:bg-white/90 transition-colors flex items-center justify-center gap-2"
                >
                  Pedir mi sitio <ArrowRight size={18} />
                </button>

                <div className="text-xs text-white/60">
                  Respuesta rápida. Respetamos tu privacidad.
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <footer className="border-t border-gray-100 py-8 sm:py-10 safe-bottom">
        <div className="container mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2 font-semibold text-gray-900">
            <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center text-white font-extrabold">
              N
            </div>
            Nexo Studio
          </div>
          <div className="flex items-center gap-4">
            <button onClick={scrollToShowcase} className="hover:text-gray-900 transition-colors">
              Explorar diseños
            </button>
            <span className="opacity-30">•</span>
            <span>&copy; 2026</span>
          </div>
        </div>
      </footer>
    </motion.div>
  );
};
