"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  animate,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  TrendingUp,
  Shield,
  Globe,
  Briefcase,
  Users,
  BarChart2,
  Smartphone,
  MapPin,
  CheckCircle2,
  ArrowUpRight,
  Minus,
} from "lucide-react";

// ─── Animated counter ────────────────────────────────────────────────────────
function AnimatedStat({ valueString }: { valueString: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!isInView || !ref.current) return;
    const numeric = parseInt(valueString.replace(/[^0-9]/g, ""), 10);
    const prefix = valueString.match(/^[^0-9]*/)?.[0] ?? "";
    const suffix = valueString.match(/[^0-9]*$/)?.[0] ?? "";
    const ctrl = animate(0, numeric, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => { if (ref.current) ref.current.textContent = prefix + Math.round(v) + suffix; },
    });
    return () => ctrl.stop();
  }, [isInView, valueString]);

  return <span ref={ref}>{valueString.replace(/\d+/, "0")}</span>;
}

// ─── Infinite marquee ─────────────────────────────────────────────────────────
function Marquee({ items, speed = 28, reverse = false }: { items: string[]; speed?: number; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex items-center gap-10 sm:gap-14 whitespace-nowrap"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
        style={{ willChange: "transform" }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="text-xs sm:text-sm font-bold uppercase tracking-[0.22em] text-slate-600 flex items-center gap-3 sm:gap-5 shrink-0"
          >
            <span className="w-1 h-1 rounded-full bg-[#3b82f6] opacity-60 shrink-0" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ─── Magnetic button ──────────────────────────────────────────────────────────
function MagneticButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 14 });
  const sy = useSpring(y, { stiffness: 200, damping: 14 });

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.28);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.28);
  };
  const handleLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.button
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
    >
      {children}
    </motion.button>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export const CorporateView = () => {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);

  // ── Hero parallax ──────────────────────────────────────────────────────────
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroP } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroBgY     = useTransform(heroP, [0, 1], ["0%", "25%"]);
  const heroTextY   = useTransform(heroP, [0, 1], ["0%", "18%"]);
  const heroOpacity = useTransform(heroP, [0, 0.7], [1, 0]);

  // ── About parallax ─────────────────────────────────────────────────────────
  const aboutRef = useRef<HTMLElement>(null);
  const { scrollYProgress: aboutP } = useScroll({ target: aboutRef, offset: ["start end", "end start"] });
  const aboutImgY = useTransform(aboutP, [0, 1], ["-10%", "10%"]);

  // ── Process parallax & light ───────────────────────────────────────────────
  const processRef = useRef<HTMLElement>(null);
  // Ampliamos el offset para que la luz empiece antes y termine después de la sección
  const { scrollYProgress: processP } = useScroll({ target: processRef, offset: ["start end", "end start"] });
  // Aumentamos el damping y bajamos el stiffness para que el movimiento sea mucho más suave y menos "shaky" en móviles
  const smoothProcessP = useSpring(processP, { damping: 40, stiffness: 50, mass: 1 });
  
  // La luz viaja desde arriba (fuera de la pantalla) hasta abajo (fuera de la pantalla)
  const lightY = useTransform(smoothProcessP, [0, 1], ["-20%", "120%"]);
  
  // La luz entra desde la derecha, serpentea por las tarjetas, y sale por la izquierda
  // 0: entra por derecha (120%)
  // 0.3: centro tarjeta izquierda (23%)
  // 0.5: centro tarjeta derecha (77%)
  // 0.7: centro tarjeta izquierda (23%)
  // 1: sale por izquierda (-20%)
  const lightX = useTransform(smoothProcessP, [0, 0.3, 0.5, 0.7, 1], ["120%", "23%", "77%", "23%", "-20%"]);

  // ─── Data ──────────────────────────────────────────────────────────────────
  const brands = [
    "AEXA CAPITAL", "NOVUS GROUP", "VERTEX HOLDINGS", "MERIDIAN PARTNERS",
    "ALTUS ADVISORY", "CROWN VENTURES", "POLARIS CORP", "SUMMIT FINANCIAL",
  ];

  const stats = [
    { value: "25+",  label: "Años de Experiencia",   icon: <Shield size={18} /> },
    { value: "500+", label: "Empresas Asesoradas",    icon: <Briefcase size={18} /> },
    { value: "98%",  label: "Tasa de Éxito",          icon: <TrendingUp size={18} /> },
    { value: "$2M+", label: "Ahorro Fiscal Generado", icon: <BarChart2 size={18} /> },
  ];

  const services = [
    {
      num: "01",
      tag: "Strategy",
      title: "Transformación Estratégica",
      desc: "Diagnóstico profundo y roadmaps de crecimiento personalizados. Convertimos la ambigüedad en ventajas competitivas sostenibles.",
      features: ["Planificación a 5 años", "Análisis de mercado", "Gestión del cambio"],
      accent: "#3b82f6",
      glow: "59,130,246",
      img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=900",
    },
    {
      num: "02",
      tag: "Finance",
      title: "Corporate Finance & M&A",
      desc: "Fusiones, adquisiciones y planificación fiscal avanzada. Cada decisión financiera, respaldada por inteligencia cuantitativa de primer nivel.",
      features: ["Auditoría estratégica", "M&A end-to-end", "Valuación de activos"],
      accent: "#8b5cf6",
      glow: "139,92,246",
      img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=900",
    },
    {
      num: "03",
      tag: "People",
      title: "Talento & Liderazgo",
      desc: "Headhunting ejecutivo y cultura organizacional de alto rendimiento. Su activo más valioso, potenciado al máximo.",
      features: ["Headhunting C-suite", "Cultura organizacional", "Compensaciones ejecutivas"],
      accent: "#10b981",
      glow: "16,185,129",
      img: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=900",
    },
  ];

  const process = [
    { num: "01", title: "Diagnóstico", desc: "Análisis 360° de su organización: procesos, finanzas, capital humano y posicionamiento competitivo." },
    { num: "02", title: "Diseño Estratégico", desc: "Construcción de un plan de acción a medida, con KPIs claros y cronograma de implementación." },
    { num: "03", title: "Ejecución Acompañada", desc: "Presencia activa en cada fase. No solo asesoramos, co-ejecutamos para garantizar resultados tangibles." },
  ];

  const faqs = [
    { q: "¿Cómo se estructura la tarifa de sus servicios?", a: "Trabajamos con esquema de iguala mensual personalizado o por proyecto, según la magnitud y alcance del requerimiento." },
    { q: "¿Tienen experiencia en mercados internacionales?", a: "Sí. Contamos con alianzas en LATAM, USA y Europa para facilitar operaciones transfronterizas y expansiones internacionales." },
    { q: "¿Cuál es el tiempo de respuesta habitual?", a: "Garantizamos respuesta inicial en menos de 4 horas para clientes corporativos, con atención prioritaria 24/7 en emergencias." },
    { q: "¿Trabajan con PyMEs o sólo grandes corporaciones?", a: "Acompañamos a empresas en todas las etapas: desde scale-ups de alto crecimiento hasta conglomerados multinacionales." },
  ];

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#07080d] text-white font-sans overflow-x-hidden"
    >

      {/* ══════════════════════════════════
          HERO
      ══════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-[100svh] flex items-center overflow-hidden pt-16 sm:pt-20">

        {/* Parallax background */}
        <motion.div className="absolute inset-0 z-0" style={{ y: heroBgY }}>
          <div
            className="absolute inset-0 scale-110 bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1800')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#07080d]/80 via-[#07080d]/70 to-[#07080d]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07080d] via-[#07080d]/30 to-transparent" />
        </motion.div>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none opacity-30"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />

        {/* Glow blobs */}
        <div className="absolute top-1/4 right-[-10%] w-[500px] h-[500px] rounded-full bg-[#3b82f6]/10 blur-[130px] z-[1]" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full bg-blue-600/8 blur-[120px] z-[1]" />

        {/* Content */}
        <motion.div
          style={{ y: heroTextY, opacity: heroOpacity }}
          className="relative z-10 container mx-auto px-5 sm:px-8 lg:px-16 py-16 sm:py-24 max-w-6xl"
        >
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7 }}
              className="inline-flex items-center gap-2.5 mb-6 sm:mb-8"
            >
              <span className="w-8 h-px bg-[#3b82f6]" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-[#3b82f6]">
                Corporate Advisory
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="text-[2.6rem] sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.04] tracking-tight mb-6 sm:mb-8"
            >
              Decisiones que{" "}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] via-[#93c5fd] to-[#3b82f6]">
                transforman
              </span>
              empresas.
            </motion.h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.8 }}
              className="text-base sm:text-lg lg:text-xl text-slate-400 leading-relaxed max-w-xl mb-8 sm:mb-12"
            >
              Más de dos décadas acompañando a las compañías más ambiciosas de la región.
              Estrategia, finanzas y talento: todo bajo un mismo techo.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4"
            >
              <MagneticButton className="group relative overflow-hidden bg-[#3b82f6] text-[#07080d] px-7 sm:px-9 py-4 rounded-full font-black text-sm uppercase tracking-[0.12em] hover:bg-[#93c5fd] transition-colors flex items-center justify-center gap-3">
                <span>Agendar Consultoría</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </MagneticButton>
              <button className="px-7 sm:px-9 py-4 rounded-full font-bold text-sm uppercase tracking-[0.12em] text-white/70 border border-white/10 hover:border-white/25 hover:text-white hover:bg-white/5 transition-all backdrop-blur-sm">
                Ver Casos de Éxito
              </button>
            </motion.div>

            {/* Scroll hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="mt-16 sm:mt-24 hidden sm:flex items-center gap-3"
            >
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-px h-12 bg-gradient-to-b from-[#3b82f6]/60 to-transparent"
              />
              <span className="text-[9px] uppercase tracking-[0.3em] text-slate-600">Scroll para explorar</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Floating stat card — desktop only */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="absolute right-8 bottom-24 z-10 hidden lg:block"
        >
          <div className="bg-white/4 backdrop-blur-xl border border-white/8 rounded-2xl p-6 w-56 shadow-2xl">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">En tiempo real</span>
            </div>
            <div className="text-3xl font-black text-white mb-1"><AnimatedStat valueString="98%" /></div>
            <div className="text-xs text-slate-500">Satisfacción cliente 2025</div>
            <div className="mt-4 h-1 rounded-full bg-white/5 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "98%" }}
                transition={{ delay: 1.2, duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                className="h-full rounded-full bg-gradient-to-r from-[#3b82f6] to-emerald-400"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════
          MARQUEE — Brands
      ══════════════════════════════════ */}
      <div className="border-y border-white/5 bg-[#0a0b10] py-5 sm:py-6 overflow-hidden">
        <p className="text-center text-[9px] uppercase tracking-[0.3em] text-slate-600 mb-4 font-bold">
          Empresas que confían en nosotros
        </p>
        <div className="space-y-3">
          <Marquee items={brands} speed={34} />
          <Marquee items={[...brands].reverse()} speed={28} reverse />
        </div>
      </div>

      {/* ══════════════════════════════════
          STATS BENTO
      ══════════════════════════════════ */}
      <section className="py-12 sm:py-20 bg-[#07080d]">
        <div className="container mx-auto px-5 sm:px-8 max-w-5xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group bg-[#0c0e15] border border-white/5 rounded-2xl p-5 sm:p-7 hover:border-[#3b82f6]/25 hover:bg-[#0f1019] transition-all duration-500 cursor-default"
              >
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="p-2 rounded-lg bg-[#3b82f6]/10 text-[#3b82f6]">{s.icon}</div>
                  <Minus size={12} className="text-white/10 group-hover:text-[#3b82f6]/30 transition-colors" />
                </div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-1.5 tracking-tighter">
                  <AnimatedStat valueString={s.value} />
                </div>
                <div className="text-[11px] text-slate-500 uppercase tracking-wider font-bold leading-tight">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          SERVICES
      ══════════════════════════════════ */}
      <section className="py-20 sm:py-32 bg-[#07080d]">
        <div className="container mx-auto px-5 sm:px-8 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-20"
          >
            <div className="inline-flex items-center gap-2.5 mb-4">
              <span className="w-6 h-px bg-[#3b82f6]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#3b82f6]">Servicios</span>
              <span className="w-6 h-px bg-[#3b82f6]" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.4rem] font-black text-white tracking-tight leading-[1.06]">
              Soluciones para{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] via-[#93c5fd] to-[#3b82f6]">
                cada desafío.
              </span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7">
            {services.map((svc, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 48 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.85, delay: idx * 0.14, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex flex-col rounded-3xl overflow-hidden min-h-[480px]"
                style={{ background: "#0d0f18", boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.05)" }}
              >
                {/* Image Background */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={svc.img}
                    alt={svc.title}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110 opacity-40 group-hover:opacity-50 mix-blend-luminosity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07080d] via-[#07080d]/80 to-transparent" />
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col flex-1 p-6 sm:p-8 justify-end">
                  <div className="absolute top-6 left-6">
                    <span
                      className="text-[10px] font-black tracking-[0.22em] px-3 py-1.5 rounded-full border backdrop-blur-md"
                      style={{ color: svc.accent, borderColor: `${svc.accent}40`, background: `${svc.accent}12` }}
                    >
                      {svc.num}
                    </span>
                  </div>
                  <div className="absolute top-6 right-6">
                    <span
                      className="text-[10px] font-bold tracking-[0.18em] px-3 py-1.5 rounded-full backdrop-blur-md"
                      style={{ color: svc.accent, background: `${svc.accent}18` }}
                    >
                      {svc.tag}
                    </span>
                  </div>

                  <div className="mt-auto">
                    <div className="w-10 h-[2px] rounded-full mb-5 transition-all duration-500 group-hover:w-16" style={{ backgroundColor: svc.accent }} />
                    <h3 className="text-2xl font-black text-white mb-3 leading-tight">{svc.title}</h3>
                    <p className="text-slate-300 text-sm leading-relaxed mb-6">{svc.desc}</p>
                    
                    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-in-out">
                      <div className="overflow-hidden">
                        <div className="pt-5 border-t flex flex-col gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                          <ul className="space-y-2">
                            {svc.features.map((f, fi) => (
                              <li key={fi} className="flex items-center gap-3 text-[13px] text-slate-300">
                                <CheckCircle2 size={14} style={{ color: svc.accent, flexShrink: 0 }} />
                                {f}
                              </li>
                            ))}
                          </ul>
                          <button className="self-start flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-white/50 hover:text-white transition-colors duration-300 group/btn mt-2">
                            <span>Explorar solución</span>
                            <ArrowUpRight size={14} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" style={{ color: svc.accent }} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover border glow */}
                <div
                  className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ boxShadow: `inset 0 0 0 1px ${svc.accent}50, 0 0 60px ${svc.accent}20` }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          ABOUT — Parallax split
      ══════════════════════════════════ */}
      <section ref={aboutRef} className="py-16 sm:py-28 bg-[#07080d] overflow-hidden">
        <div className="container mx-auto px-5 sm:px-8 max-w-6xl">
          <div className="flex flex-col md:flex-row gap-10 lg:gap-20 items-center">
            <div className="md:w-1/2 relative">
              <div
                className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[3/4] max-h-[520px]"
                style={{ boxShadow: "0 0 80px rgba(59,130,246,0.08)" }}
              >
                <motion.img
                  src="https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&q=80&w=900"
                  alt="Philosophy"
                  style={{ y: aboutImgY }}
                  className="absolute inset-0 w-full h-[115%] object-cover top-[-7.5%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07080d]/60 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-full h-full rounded-2xl border border-[#3b82f6]/12 -z-10" />
              <div className="absolute -bottom-8 -right-8 w-full h-full rounded-2xl border border-[#3b82f6]/5 -z-20" />
              <div className="absolute bottom-6 left-6 bg-[#07080d]/80 backdrop-blur-xl border border-white/8 rounded-xl px-4 py-3">
                <div className="flex items-center gap-2">
                  <Globe size={14} className="text-[#3b82f6]" />
                  <span className="text-xs font-bold text-white">Presencia regional</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">LATAM · USA · Europa</div>
              </div>
            </div>

            <div className="md:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="inline-flex items-center gap-2.5 mb-5">
                  <span className="w-6 h-px bg-[#3b82f6]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#3b82f6]">Nuestra Filosofía</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-5 leading-[1.08] tracking-tight">
                  No solo asesoramos.{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#93c5fd]">
                    Co-creamos
                  </span>{" "}
                  su futuro.
                </h2>
                <p className="text-slate-400 text-base leading-relaxed mb-8 border-l-2 border-[#3b82f6]/40 pl-5">
                  En un entorno empresarial volátil, la claridad es la mayor ventaja competitiva.
                  Nuestro enfoque multidisciplinario integra visión legal, perspicacia financiera
                  y estrategia corporativa para blindar su negocio y acelerar su crecimiento.
                </p>
                <ul className="space-y-4">
                  {[
                    { icon: <Shield size={15} />, text: "Análisis de riesgo proactivo y multidimensional." },
                    { icon: <BarChart2 size={15} />, text: "Estructuras fiscales 100% eficientes y transparentes." },
                    { icon: <Globe size={15} />, text: "Red de alianzas internacionales para expansión global." },
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: i * 0.15 }}
                      className="flex items-start gap-3 text-slate-300 text-sm font-medium"
                    >
                      <div className="mt-0.5 w-7 h-7 rounded-lg bg-[#3b82f6]/10 text-[#3b82f6] flex items-center justify-center shrink-0">
                        {item.icon}
                      </div>
                      {item.text}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          PROCESS
      ══════════════════════════════════ */}
      {/* Quitamos overflow-hidden para que la luz pueda "salir" de la sección sin cortarse abruptamente */}
      <section ref={processRef} className="py-16 sm:py-28 bg-[#0a0b10] relative">
        {/* Moving Light */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full blur-[60px] pointer-events-none z-0"
          style={{
            background: "radial-gradient(circle, rgba(59,130,246,0.6) 0%, rgba(59,130,246,0.1) 40%, rgba(59,130,246,0) 70%)",
            top: lightY,
            left: lightX,
            x: "-50%",
            y: "-50%",
            willChange: "transform, top, left" // Optimización para móviles
          }}
        />
        
        <div className="container mx-auto px-5 sm:px-8 max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-20"
          >
            <div className="inline-flex items-center gap-2.5 mb-4">
              <span className="w-6 h-px bg-[#3b82f6]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#3b82f6]">Metodología</span>
              <span className="w-6 h-px bg-[#3b82f6]" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Cómo trabajamos.
            </h2>
          </motion.div>

          <div className="relative">
            <div className="hidden md:block absolute left-[50%] top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />
            <div className="space-y-10 sm:space-y-0">
              {process.map((step, i) => {
                // Ajustamos el cálculo de proximidad porque ahora el scrollYProgress va de "start end" a "end start"
                // La sección central donde están las tarjetas ocurre aproximadamente entre 0.3 y 0.7 del progreso total
                const targetY = 0.3 + (i * 0.2); // i=0 -> 0.3, i=1 -> 0.5, i=2 -> 0.7
                const distance = useTransform(smoothProcessP, (v) => Math.abs(v - targetY));
                
                // Transformamos la distancia en opacidad y brillo para la tarjeta
                const cardOpacity = useTransform(distance, [0, 0.15], [1, 0.5]);
                const cardScale = useTransform(distance, [0, 0.15], [1.02, 1]);
                const cardBorder = useTransform(distance, [0, 0.15], ["rgba(59,130,246,0.6)", "rgba(255,255,255,0.1)"]);
                const cardBg = useTransform(distance, [0, 0.15], ["rgba(15,18,25,0.9)", "rgba(13,15,24,0.6)"]);

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 36 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                    className={`md:flex md:items-center md:gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} md:mb-20`}
                  >
                    <div className={`md:w-[46%] ${i % 2 !== 0 ? "md:text-right" : ""}`}>
                      <motion.div 
                        style={{ 
                          opacity: cardOpacity, 
                          scale: cardScale,
                          borderColor: cardBorder,
                          backgroundColor: cardBg
                        }}
                        className="group backdrop-blur-xl border rounded-2xl p-6 sm:p-7 transition-all duration-300 shadow-2xl"
                      >
                        <div className={`flex items-center gap-3 mb-3 ${i % 2 !== 0 ? "md:justify-end" : ""}`}>
                          <span className="text-4xl font-black text-[#3b82f6]/15 leading-none">{step.num}</span>
                          <div className="w-4 h-px bg-[#3b82f6]/40" />
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#3b82f6]">{`Paso ${i + 1}`}</span>
                        </div>
                        <h3 className="text-xl font-black text-white mb-2">{step.title}</h3>
                        <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                      </motion.div>
                    </div>
                    <div className="hidden md:flex w-[8%] justify-center">
                      <motion.div 
                        style={{ scale: cardScale, borderColor: cardBorder }}
                        className="w-4 h-4 rounded-full bg-[#07080d] border-2 relative z-10 transition-colors duration-300"
                      >
                        <motion.div 
                          style={{ opacity: cardOpacity }}
                          className="absolute inset-[3px] rounded-full bg-[#3b82f6] transition-opacity duration-300" 
                        />
                      </motion.div>
                    </div>
                    <div className="hidden md:block md:w-[46%]" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          CTA BANNER
      ══════════════════════════════════ */}
      <section className="py-14 sm:py-20 bg-[#07080d] overflow-hidden">
        <div className="container mx-auto px-5 sm:px-8 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9 }}
            className="relative rounded-3xl overflow-hidden p-8 sm:p-14 text-center"
            style={{ background: "linear-gradient(135deg, #0e1016 0%, #0d1118 100%)", boxShadow: "inset 0 0 0 1px rgba(59,130,246,0.15), 0 0 100px rgba(59,130,246,0.06)" }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-56 bg-[#3b82f6]/8 blur-[80px] rounded-full pointer-events-none" />
            <div className="relative z-10">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#3b82f6] font-bold mb-4">Empecemos hoy</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-5 leading-tight">
                ¿Listo para llevar su<br />empresa al siguiente nivel?
              </h2>
              <p className="text-slate-400 text-base max-w-2xl mx-auto mb-8">
                30 minutos bastan para identificar el mayor freno a su crecimiento.
                Primera consulta, sin costo.
              </p>
              <MagneticButton className="group inline-flex items-center gap-3 bg-[#3b82f6] text-[#07080d] px-8 py-4 rounded-full font-black text-sm uppercase tracking-[0.12em] hover:bg-[#93c5fd] transition-colors shadow-lg shadow-[#3b82f6]/20">
                <span>Reservar Mi Lugar</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════
          FAQ
      ══════════════════════════════════ */}
      <section className="py-16 sm:py-24 bg-[#0a0b10]">
        <div className="container mx-auto px-5 sm:px-8 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-10 sm:mb-14"
          >
            <div className="inline-flex items-center gap-2.5 mb-4">
              <span className="w-6 h-px bg-[#3b82f6]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#3b82f6]">FAQ</span>
              <span className="w-6 h-px bg-[#3b82f6]" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Preguntas Frecuentes</h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className="border border-white/6 rounded-xl overflow-hidden"
                style={{ background: "#0d0f18" }}
              >
                <button
                  onClick={() => setActiveAccordion(activeAccordion === idx ? null : idx)}
                  className="w-full flex justify-between items-center px-5 sm:px-7 py-5 text-left font-bold text-white hover:bg-white/3 transition-colors text-sm sm:text-base gap-4"
                >
                  <span>{item.q}</span>
                  <motion.div animate={{ rotate: activeAccordion === idx ? 45 : 0 }} transition={{ duration: 0.25 }} className="shrink-0">
                    <div className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-slate-400">
                      <ChevronDown size={14} />
                    </div>
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {activeAccordion === idx && (
                    <motion.div
                      key="body"
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-7 pb-5 text-slate-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          FOOTER / CONTACT
      ══════════════════════════════════ */}
      <footer className="bg-[#04050a] border-t border-white/5 py-14 sm:py-24">
        <div className="container mx-auto px-5 sm:px-8 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-10 sm:gap-16 items-start mb-12 sm:mb-20">
            <div>
              <div className="inline-flex items-center gap-2.5 mb-5">
                <span className="w-6 h-px bg-[#3b82f6]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#3b82f6]">Contacto</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 leading-tight">
                Empecemos a<br />trabajar juntos.
              </h2>
              <p className="text-slate-400 text-base leading-relaxed mb-8 max-w-sm">
                Agenda una consulta inicial gratuita de 30 minutos para evaluar sus necesidades.
              </p>
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#3b82f6]/10 flex items-center justify-center text-[#3b82f6] shrink-0">
                    <Smartphone size={16} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider font-bold text-slate-600 mb-0.5">Teléfono</div>
                    <div className="text-white font-semibold">+54 11 5555 0123</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#3b82f6]/10 flex items-center justify-center text-[#3b82f6] shrink-0">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider font-bold text-slate-600 mb-0.5">Oficinas</div>
                    <div className="text-white font-semibold">Av. Libertador 1000, Piso 25 — CABA</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#3b82f6]/10 flex items-center justify-center text-[#3b82f6] shrink-0">
                    <Globe size={16} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider font-bold text-slate-600 mb-0.5">Sedes</div>
                    <div className="text-white font-semibold">Buenos Aires · Miami · Madrid</div>
                  </div>
                </div>
              </div>
            </div>

            <motion.form
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="bg-[#0d0f18] border border-white/6 rounded-2xl p-6 sm:p-8"
              style={{ boxShadow: "0 0 60px rgba(59,130,246,0.04)" }}
            >
              <h3 className="text-lg font-black text-white mb-5">Formulario de Contacto</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Nombre completo"
                  className="w-full bg-white/4 border border-white/7 text-white placeholder:text-slate-600 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-[#3b82f6]/50 focus:bg-white/6 transition-all"
                />
                <input
                  type="email"
                  placeholder="Email corporativo"
                  className="w-full bg-white/4 border border-white/7 text-white placeholder:text-slate-600 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-[#3b82f6]/50 focus:bg-white/6 transition-all"
                />
                <input
                  type="text"
                  placeholder="Empresa"
                  className="w-full bg-white/4 border border-white/7 text-white placeholder:text-slate-600 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-[#3b82f6]/50 focus:bg-white/6 transition-all"
                />
                <textarea
                  rows={4}
                  placeholder="¿En qué le podemos ayudar?"
                  className="w-full bg-white/4 border border-white/7 text-white placeholder:text-slate-600 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-[#3b82f6]/50 focus:bg-white/6 transition-all resize-none"
                />
                <MagneticButton className="w-full group bg-[#3b82f6] text-[#07080d] font-black py-4 rounded-xl hover:bg-[#93c5fd] transition-colors flex items-center justify-center gap-3 text-sm uppercase tracking-[0.1em]">
                  <span>Enviar Solicitud</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </MagneticButton>
              </div>
            </motion.form>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 text-slate-600 text-xs">
            <div className="font-bold tracking-wider uppercase">Nexo Corporate Advisory</div>
            <div>&copy; 2026 · Todos los derechos reservados.</div>
            <div className="flex gap-5">
              <span className="hover:text-[#3b82f6] cursor-pointer transition-colors">Privacidad</span>
              <span className="hover:text-[#3b82f6] cursor-pointer transition-colors">Términos</span>
            </div>
          </div>
        </div>
      </footer>
    </motion.div>
  );
};