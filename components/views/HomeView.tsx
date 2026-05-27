"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Sparkles,
  LayoutTemplate,
  Layers,
  ShieldCheck,
  Zap,
  CheckCircle2,
  MessageCircle,
  Hand,
} from "lucide-react";
import { ViewType, StyleCard } from "../types";
import { STYLE_CARDS, whatsappLink } from "../constants";
import Particles from "../ui/Particles";

/* ─────────────────────────────────────────────────────────────────
   Hooks
   ──────────────────────────────────────────────────────────────── */
function useIsMobile(breakpoint = "(max-width: 1023px)") {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const m = window.matchMedia(breakpoint);
    setMatches(m.matches);
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    m.addEventListener("change", listener);
    return () => m.removeEventListener("change", listener);
  }, [breakpoint]);
  return matches;
}

/* ─────────────────────────────────────────────────────────────────
   CardBody — contenido visual reutilizable
   ──────────────────────────────────────────────────────────────── */
const CardBody = ({ card }: { card: StyleCard }) => (
  <>
    <div className="relative h-48 sm:h-64">
      <div className={`absolute inset-0 bg-gradient-to-br ${card.accent}`} />
      <img
        src={card.image}
        alt=""
        loading="eager"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute left-5 bottom-5 right-5">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/20 border border-white/30 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md shadow-sm">
          {card.icon}
          {card.title}
        </div>
        <div className="mt-3 text-lg md:text-xl font-extrabold text-white leading-tight">
          {card.subtitle}
        </div>
      </div>
    </div>
    <div className="p-5 sm:p-6 bg-black/90 backdrop-blur-xl relative z-10">
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {card.bullets.map((b, idx) => (
          <div
            key={idx}
            className="rounded-xl bg-white/10 border border-white/5 px-3 py-2 text-[10px] sm:text-xs font-semibold text-white/90 text-center"
          >
            {b}
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
        <div className="text-xs font-medium text-white/50">Abrir demo</div>
        <div className="inline-flex items-center gap-2 text-sm font-bold text-white group">
          Ver demo
          <ArrowRight
            size={16}
            className="text-white/70 group-hover:translate-x-1 transition-transform"
          />
        </div>
      </div>
    </div>
  </>
);

/* ─────────────────────────────────────────────────────────────────
   Stacked card del showcase 3D (desktop)
   ──────────────────────────────────────────────────────────────── */
const StackedCard = ({
  card,
  i,
  total,
  progress,
  onNavigate,
}: {
  card: StyleCard;
  i: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  onNavigate: (view: ViewType) => void;
}) => {
  const entryStart = i === 0 ? 0 : (i - 1) / total;
  const entryEnd = i === 0 ? 0 : i / total;

  const x = useTransform(
    progress,
    [entryStart, entryEnd],
    i === 0 ? ["0vw", "0vw"] : ["100vw", "0vw"]
  );
  const scale = useTransform(progress, [entryEnd, 1], [1, 1 - (total - i) * 0.05]);
  const y = useTransform(
    progress,
    [entryEnd, 1],
    ["0%", `-${(total - i) * 8}%`]
  );
  const rotate = useTransform(
    progress,
    [entryStart, entryEnd],
    i === 0 ? [0, 0] : [15, 0]
  );
  const opacity = useTransform(
    progress,
    [entryStart, entryEnd - 0.05],
    i === 0 ? [1, 1] : [0, 1]
  );

  return (
    <motion.button
      onClick={() => onNavigate(card.id)}
      style={{ x, y, scale, rotate, opacity, zIndex: i, willChange: "transform, opacity" }}
      className="absolute origin-top w-full max-w-[320px] sm:max-w-md text-left rounded-[2rem] border border-gray-200/60 overflow-hidden bg-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.4)] transition-shadow"
      aria-label={`Ver demo ${card.title}`}
    >
      <CardBody card={card} />
    </motion.button>
  );
};

/* ─────────────────────────────────────────────────────────────────
   Mini formulario de brief — 60 segundos
   ──────────────────────────────────────────────────────────────── */
const BriefForm = () => {
  const [name, setName] = useState("");
  const [project, setProject] = useState("");
  const [budget, setBudget] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !project.trim()) return;
    const msg = `Hola Nexo! Soy ${name}.
Proyecto: ${project}
Presupuesto: ${budget || "a definir"}`;
    setSent(true);
    window.open(whatsappLink(msg), "_blank", "noopener,noreferrer");
  };

  return (
    <form
      onSubmit={submit}
      className="grid gap-3 sm:gap-4 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-5 sm:p-6"
    >
      <div className="grid sm:grid-cols-2 gap-3">
        <label className="block">
          <span className="text-[10px] uppercase tracking-widest text-white/60 font-semibold">
            Tu nombre
          </span>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej. Camila"
            className="mt-1 w-full bg-white/5 border border-white/15 text-white placeholder:text-white/30 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-white/40 focus:bg-white/10 transition-colors"
          />
        </label>
        <label className="block">
          <span className="text-[10px] uppercase tracking-widest text-white/60 font-semibold">
            Presupuesto aprox.
          </span>
          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="mt-1 w-full bg-white/5 border border-white/15 text-white rounded-lg px-3 py-2.5 text-sm outline-none focus:border-white/40 focus:bg-white/10 transition-colors"
          >
            <option value="" className="text-black">A definir</option>
            <option value="$200k–500k" className="text-black">$200k – $500k</option>
            <option value="$500k–1M" className="text-black">$500k – $1M</option>
            <option value="$1M+" className="text-black">$1M+</option>
          </select>
        </label>
      </div>
      <label className="block">
        <span className="text-[10px] uppercase tracking-widest text-white/60 font-semibold">
          Contame del proyecto
        </span>
        <textarea
          required
          value={project}
          onChange={(e) => setProject(e.target.value)}
          rows={3}
          placeholder="Soy dueño de un restaurante, quiero un sitio editorial con reservas…"
          className="mt-1 w-full bg-white/5 border border-white/15 text-white placeholder:text-white/30 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-white/40 focus:bg-white/10 transition-colors resize-none"
        />
      </label>
      <button
        type="submit"
        className="mt-1 inline-flex items-center justify-center gap-2 bg-white text-black font-bold rounded-xl py-3.5 px-5 text-sm hover:bg-gray-200 transition-colors"
      >
        <MessageCircle size={16} />
        {sent ? "Abriendo WhatsApp…" : "Enviar por WhatsApp"}
      </button>
      <p className="text-[11px] text-white/50">
        Te respondo personalmente en menos de 4hs hábiles. Sin formularios eternos.
      </p>
    </form>
  );
};

/* ─────────────────────────────────────────────────────────────────
   HomeView
   ──────────────────────────────────────────────────────────────── */
export const HomeView = ({
  onNavigate,
}: {
  onNavigate: (view: ViewType) => void;
}) => {
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const { scrollY } = useScroll();
  // Reveal rápido: el texto se desvanece/desnubla entre 0 y 120px de scroll.
  const convertOpacity = useTransform(scrollY, [0, 120], reduced ? [1, 1] : [0.25, 1]);
  const convertBlur = useTransform(scrollY, [0, 120], reduced ? ["blur(0)", "blur(0)"] : ["blur(8px)", "blur(0px)"]);

  // Refs para el Showcase 3D
  const showcaseRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: showcaseProgress } = useScroll({
    target: showcaseRef,
    offset: ["start start", "end end"],
  });

  const scrollToShowcase = () => {
    document
      .getElementById("showcase-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToContact = () => {
    document
      .getElementById("contact-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen pt-14 sm:pt-16 bg-white selection:bg-black selection:text-white">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* ── HERO ── */}
          <section className="relative overflow-hidden">
            {/* Capa de partículas (full-bleed dentro del hero) */}
            <div className="absolute inset-0 z-0">
              <Particles density={80} color="rgba(15,15,15,0.55)" linkDistance={140} />
            </div>
            {/* Grid sutil sobre las partículas */}
            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
            {/* Fade superior para ayudar la lectura del headline */}
            <div className="absolute inset-x-0 top-0 z-0 h-[60%] bg-gradient-to-b from-white via-white/85 to-transparent" />

            <div className="container mx-auto px-4 sm:px-6 pt-6 pb-12 sm:pt-10 sm:pb-16 md:pt-16 md:pb-20">
              <div className="max-w-5xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 backdrop-blur px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm"
                >
                  <Sparkles size={14} className="shrink-0" />
                  <span className="text-xs sm:text-sm">
                    Estudio de diseño y desarrollo web · 2026
                  </span>
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
                  <motion.span
                    style={{
                      opacity: convertOpacity,
                      filter: convertBlur,
                      display: "inline-block",
                    }}
                  >
                    Y diseñados para{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                      convertir
                    </span>
                    .
                  </motion.span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.7 }}
                  className="mt-4 sm:mt-6 text-base sm:text-lg md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed px-1 sm:px-0"
                >
                  Diseño y desarrollo de alto nivel, 100% a medida. Dos ciclos de
                  refinamiento para asegurar tu visión, y una entrega 100% funcional
                  en hasta 7 días.
                </motion.p>

                {/* Aviso destacado: estos son demos, no plantillas */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="mt-6 sm:mt-7 inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 rounded-full border border-black/15 bg-black text-white text-[11px] sm:text-xs font-semibold"
                >
                  <span className="inline-flex items-center gap-1.5">
                    <Layers size={12} /> Estas son demos
                  </span>
                  <span className="opacity-30">·</span>
                  <span className="opacity-90 font-normal">
                    no son plantillas. Cada diseño es hecho 100% a medida.
                  </span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65, duration: 0.6 }}
                  className="mt-7 sm:mt-9 flex flex-col sm:flex-row justify-center gap-3 px-2 sm:px-0"
                >
                  <button
                    onClick={scrollToShowcase}
                    className="group px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-black text-white font-semibold text-base sm:text-lg hover:bg-gray-900 transition-all shadow-xl shadow-black/10 flex items-center justify-center gap-2"
                  >
                    Explorar demos
                    <ArrowRight
                      size={20}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </button>
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-white border border-gray-200 text-gray-900 font-semibold text-base sm:text-lg hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={18} />
                    Hablar por WhatsApp
                  </a>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.85, duration: 0.8 }}
                  className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-sm text-gray-600 px-2 sm:px-0"
                >
                  {[
                    { icon: <Zap size={16} />, text: "Entrega hasta 7 días" },
                    { icon: <ShieldCheck size={16} />, text: "Código limpio, Lighthouse 95+" },
                    { icon: <Layers size={16} />, text: "Diseño 100% a medida" },
                    { icon: <CheckCircle2 size={16} />, text: "Vos sos dueño del código" },
                  ].map((b, i) => (
                    <div
                      key={i}
                      className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-gray-200 bg-white/80 backdrop-blur px-3 sm:px-4 py-1.5 sm:py-2 shadow-sm"
                    >
                      <span className="shrink-0">{b.icon}</span>
                      <span className="font-semibold text-xs sm:text-sm">
                        {b.text}
                      </span>
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

          {/* ── SHOWCASE ── */}
          {isMobile ? (
            <section
              id="showcase-section"
              className="relative py-10 sm:py-16 bg-slate-50 border-y border-gray-200/50"
            >
              <div className="container mx-auto px-4 sm:px-6">
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col z-10">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="inline-flex items-center w-fit gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-bold text-gray-700 shadow-sm"
                    >
                      <LayoutTemplate size={14} />
                      Showcase interactivo
                    </motion.div>
                    <h2 className="mt-5 text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 leading-[1.1]">
                      Algunos ejemplos de lo que podemos hacer.
                    </h2>
                    <p className="mt-6 text-gray-600 text-lg sm:text-xl leading-relaxed max-w-lg">
                      Son <b>demos</b> — no plantillas. A cada cliente le diseñamos una
                      solución a medida, pensada como un ecosistema premium para
                      convertir visitas en clientes.
                    </p>
                    <div className="mt-6 inline-flex items-center gap-2 text-xs text-gray-500 self-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      5 estilos · deslizá para ver cada uno
                    </div>

                    {/* Indicador de scroll horizontal — fondo negro, agresivo */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="mt-6 self-center w-full max-w-lg"
                    >
                      <div className="flex items-center justify-between gap-4 w-full rounded-full bg-black border border-white/10 px-5 py-3 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]">
                        <motion.div
                          animate={{ x: [-4, 18, -4] }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <Hand size={20} className="text-white" />
                        </motion.div>
                        <div className="leading-tight flex-1 text-center">
                          <div className="text-[10px] uppercase tracking-[0.25em] font-bold text-white/60">
                            Acción
                          </div>
                          <div className="text-base font-semibold text-white">
                            Deslizá para explorar y elegir
                          </div>
                        </div>
                        <motion.div
                          animate={{ x: [0, 10, 0], opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
                        >
                          <ArrowRight size={18} className="text-white" />
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>

                  <div className="w-full">
                    <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-6 -mx-4 px-3 sm:-mx-6 sm:px-4 no-scrollbar">
                      {STYLE_CARDS.map((card) => (
                        <motion.button
                          key={card.id}
                          onClick={() => onNavigate(card.id)}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.3 }}
                          transition={{ duration: 0.4 }}
                          className="snap-center shrink-0 w-[72vw] sm:w-[60vw] md:w-[45vw] max-w-sm text-left rounded-[2rem] border border-gray-200/60 overflow-hidden bg-white shadow-lg active:scale-[0.98] transition-transform"
                          aria-label={`Ver demo ${card.title}`}
                        >
                          <CardBody card={card} />
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ) : (
            <section
              id="showcase-section"
              ref={showcaseRef}
              className="relative h-[400vh] w-full bg-slate-50 border-y border-gray-200/50"
            >
              <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-4 sm:px-6">
                <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-20">
                  <div className="w-full lg:w-5/12 flex flex-col z-10">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="inline-flex items-center w-fit gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-bold text-gray-700 shadow-sm"
                    >
                      <LayoutTemplate size={14} />
                      Showcase interactivo
                    </motion.div>
                    <h2 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.1]">
                      Algunos ejemplos de lo que podemos hacer.
                    </h2>
                    <p className="mt-6 text-gray-600 text-lg sm:text-xl leading-relaxed max-w-lg">
                      Son <b>demos</b> — no plantillas. A cada cliente le diseñamos una
                      solución a medida, pensada como un ecosistema premium para
                      convertir visitas en clientes.
                    </p>
                    <div className="mt-6 inline-flex items-center gap-2 text-xs text-gray-500 self-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      5 estilos · navegá cada uno desde el menú "Demos"
                    </div>
                  </div>

                  <div className="w-full lg:w-1/2 relative h-[55vh] sm:h-[65vh] flex items-center justify-center perspective-[1200px]">
                    {STYLE_CARDS.map((card, i) => (
                      <StackedCard
                        key={card.id}
                        card={card}
                        i={i}
                        total={STYLE_CARDS.length}
                        progress={showcaseProgress}
                        onNavigate={onNavigate}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ── PROCESO (sin precios) ── */}
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
                <p className="mt-4 text-gray-600 text-lg leading-relaxed max-w-2xl">
                  No es plantilla. Diseñamos el look &amp; feel, el contenido y los
                  componentes con criterio de marca y conversión. Entregamos un
                  sitio funcional, listo para usar.
                </p>

                <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  {[
                    {
                      icon: <Layers size={18} />,
                      title: "100% a medida",
                      desc: "Cero plantillas. Diseño y código únicos para tu marca.",
                    },
                    {
                      icon: <ShieldCheck size={18} />,
                      title: "Código limpio",
                      desc: "Lighthouse 95+, accesible y mantenible.",
                    },
                    {
                      icon: <Zap size={18} />,
                      title: "Hasta 7 días",
                      desc: "Entrega funcional posterior al pedido.",
                    },
                    {
                      icon: <CheckCircle2 size={18} />,
                      title: "2 iteraciones",
                      desc: "Dos rondas formales de revisión y cambios.",
                    },
                  ].map((f, i) => (
                    <div
                      key={i}
                      className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                    >
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
                    Ver demos
                  </button>
                  <button
                    onClick={scrollToContact}
                    className="px-6 py-3.5 sm:py-3 rounded-xl bg-white border border-gray-200 text-gray-900 font-semibold hover:bg-gray-50 transition-colors text-center"
                  >
                    Pedir cotización a medida
                  </button>
                </div>
              </motion.div>

              {/* Timeline de pasos */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className="rounded-2xl sm:rounded-3xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-4 sm:p-6 md:p-8 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.18)]"
              >
                <div className="flex items-center justify-between gap-3 sm:gap-4">
                  <div>
                    <div className="text-xs sm:text-sm font-semibold text-gray-600">
                      Entrega
                    </div>
                    <div className="text-xl sm:text-2xl font-extrabold text-gray-900">
                      Hasta 7 días
                    </div>
                  </div>
                  <div className="rounded-xl sm:rounded-2xl bg-black text-white px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold shrink-0">
                    100% a medida
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {[
                    { step: "D0", title: "Brief + referencia", desc: "Definimos objetivo (ventas, reservas, contacto)." },
                    { step: "D2", title: "Diseño premium", desc: "Layout, tipografía, jerarquías y look & feel." },
                    { step: "D4", title: "Iteración 1", desc: "Primera revisión, ajustes por feedback." },
                    { step: "D6", title: "Iteración 2", desc: "Refinamiento de detalles finales." },
                    { step: "D7", title: "Entrega funcional", desc: "Sitio listo para publicar, responsive." },
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
                        <div className="shrink-0 w-10 h-10 rounded-2xl bg-gray-900 text-white flex items-center justify-center font-extrabold text-xs tracking-tight">
                          {s.step}
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-gray-900 text-sm leading-snug">
                            {s.title}
                          </div>
                          <div className="text-xs text-gray-600 leading-relaxed mt-1">
                            {s.desc}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-5 sm:mt-6 rounded-xl sm:rounded-2xl border border-gray-200 bg-gray-50 p-4 sm:p-5">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 text-gray-900">
                      <ShieldCheck size={18} />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Nota</div>
                      <div className="text-sm text-gray-600">
                        "2 iteraciones" = dos rondas formales de revisión con
                        pedidos de cambios, para asegurar calidad sin desbordes.
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* ── CTA FINAL CON FORM REAL + WHATSAPP ── */}
          <section
            id="contact-section"
            className="container mx-auto px-4 sm:px-6 pb-14 sm:pb-20"
          >
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl sm:rounded-[2.5rem] bg-black text-white p-5 sm:p-8 md:p-12 overflow-hidden relative"
            >
              <div className="absolute inset-0 z-0 opacity-50">
                <Particles density={50} color="rgba(255,255,255,0.55)" linkDistance={140} />
              </div>
              <div className="absolute -top-40 -right-40 z-0 w-[520px] h-[520px] rounded-full bg-white/10 blur-[80px]" />
              <div className="absolute -bottom-48 -left-48 z-0 w-[520px] h-[520px] rounded-full bg-white/10 blur-[90px]" />

              <div className="relative z-10 grid md:grid-cols-2 gap-10 items-start">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold">
                    <Sparkles size={14} />
                    Hablemos de tu proyecto
                  </div>
                  <h3 className="mt-4 text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight">
                    Hagamos tu próximo sitio.
                  </h3>
                  <p className="mt-4 text-white/70 text-base sm:text-lg max-w-md">
                    Contame qué necesitás y te respondo personalmente. Sin formularios eternos, sin promesas
                    vacías.
                  </p>

                  <div className="mt-6 grid gap-3">
                    <a
                      href={whatsappLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 bg-[#25D366] text-black font-bold rounded-xl px-5 py-3.5 hover:brightness-110 transition w-fit"
                    >
                      <Hand size={18} />
                      Abrir WhatsApp directo
                      <ArrowRight size={18} />
                    </a>
                    <div className="text-[12px] text-white/50">
                      O dejá un brief breve a la derecha — te respondo por WhatsApp.
                    </div>
                  </div>
                </div>

                <BriefForm />
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
              <div className="flex items-center gap-4 flex-wrap justify-center">
                <button
                  onClick={scrollToShowcase}
                  className="hover:text-gray-900 transition-colors"
                >
                  Demos
                </button>
                <span className="opacity-30">•</span>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-900 transition-colors"
                >
                  WhatsApp
                </a>
                <span className="opacity-30">•</span>
                <span>&copy; 2026</span>
              </div>
            </div>
          </footer>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
