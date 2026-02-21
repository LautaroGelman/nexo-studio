"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView, animate, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Gem,
  Scale,
  Briefcase,
  Users,
  Smartphone,
  Home,
} from "lucide-react";

// Helper component to animate the stats
function AnimatedStat({ valueString }: { valueString: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });

  useEffect(() => {
    if (isInView && ref.current) {
      const numericValue = parseInt(valueString.replace(/[^0-9]/g, ""), 10);
      const prefix = valueString.match(/^[^0-9]*/)?.[0] || "";
      const suffix = valueString.match(/[^0-9]*$/)?.[0] || "";

      const controls = animate(0, numericValue, {
        duration: 1.1,
        ease: [0.16, 1, 0.3, 1], // swift exponential-out: fast rush then sharp stop
        onUpdate(value) {
          ref.current!.textContent = prefix + Math.round(value) + suffix;
        },
      });
      return () => controls.stop();
    }
  }, [isInView, valueString]);

  const initialDisplay = valueString.replace(/\d+/g, "0");

  return <span ref={ref}>{initialDisplay}</span>;
}


export const CorporateView = () => {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);
  const [philosophyTouched, setPhilosophyTouched] = useState(false);

  // ── Hero Scroll (mobile background image) ────────────────────────────────
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const mobileHeroX       = useTransform(heroProgress, [0, 0.75], ["0%", "90%"]);
  const mobileHeroOpacity = useTransform(heroProgress, [0, 0.55], [1, 0]);

  // ── Scroll-Driven Services (desktop) ─────────────────────────────────────
  const servicesRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: servicesRef,
    offset: ["start start", "end end"],
  });

  // ── Scroll-Driven Services (mobile) ─────────────────────────────────────
  const mobileServicesRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: mobileSvcProgress } = useScroll({
    target: mobileServicesRef,
    offset: ["start start", "end end"],
  });

  // Each card slides up + fades in sequentially, then stays visible
  const mc0o = useTransform(mobileSvcProgress, [0.00, 0.13], [0, 1]);
  const mc0y = useTransform(mobileSvcProgress, [0.00, 0.13], [48, 0]);
  const mc1o = useTransform(mobileSvcProgress, [0.20, 0.36], [0, 1]);
  const mc1y = useTransform(mobileSvcProgress, [0.20, 0.36], [48, 0]);
  const mc2o = useTransform(mobileSvcProgress, [0.44, 0.60], [0, 1]);
  const mc2y = useTransform(mobileSvcProgress, [0.44, 0.60], [48, 0]);
  const mobileCards = [
    { opacity: mc0o, y: mc0y },
    { opacity: mc1o, y: mc1y },
    { opacity: mc2o, y: mc2y },
  ];

  // Hide navbar while pinned inside the services section (desktop only)
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      if (v > 0.01 && v < 0.99) {
        document.documentElement.classList.add("services-active");
      } else {
        document.documentElement.classList.remove("services-active");
      }
    });
    return () => {
      unsubscribe();
      document.documentElement.classList.remove("services-active");
    };
  }, [scrollYProgress]);

  // Header
  const hO  = useTransform(scrollYProgress, [0.00, 0.07], [0, 1]);
  const hY  = useTransform(scrollYProgress, [0.00, 0.07], [36, 0]);

  // Card 1 — slides in from right, settles at ~28 %
  const c1x = useTransform(scrollYProgress, [0.06, 0.28], [1100, 0]);
  const c1o = useTransform(scrollYProgress, [0.06, 0.18], [0, 1]);
  // Glow appears once card has settled
  const g1  = useTransform(scrollYProgress, [0.24, 0.34], [0, 1]);

  // Card 2 — settles at ~52 %
  const c2x = useTransform(scrollYProgress, [0.30, 0.52], [1100, 0]);
  const c2o = useTransform(scrollYProgress, [0.30, 0.42], [0, 1]);
  const g2  = useTransform(scrollYProgress, [0.48, 0.58], [0, 1]);

  // Card 3 — settles at ~76 %
  const c3x = useTransform(scrollYProgress, [0.54, 0.76], [1100, 0]);
  const c3o = useTransform(scrollYProgress, [0.54, 0.66], [0, 1]);
  const g3  = useTransform(scrollYProgress, [0.72, 0.82], [0, 1]);

  const services = [
    {
      num: "01",
      imageUrl: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=1400",
      title: "Derecho Corporativo",
      desc: "Fusiones, adquisiciones y litigios comerciales complejos manejados con precisión quirúrgica y visión estratégica de largo plazo.",
      features: ["Contratos Internacionales", "Propiedad Intelectual", "Litigio Mercantil"],
      accent: "#3b82f6",
      glow: "59,130,246",
      icon: <Scale size={16} />,
    },
    {
      num: "02",
      imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80",
      title: "Consultoría Financiera",
      desc: "Auditoría forense y planificación fiscal estratégica para optimizar cada recurso y maximizar la rentabilidad corporativa.",
      features: ["Auditoría Externa", "Planning Fiscal", "Valuación de Activos"],
      accent: "#10b981",
      glow: "16,185,129",
      icon: <Briefcase size={16} />,
    },
    {
      num: "03",
      imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80",
      title: "Gestión de Talento",
      desc: "Transformamos el capital humano en la mayor ventaja competitiva de su organización mediante cultura y liderazgo de alto impacto.",
      features: ["Headhunting Ejecutivo", "Desarrollo Organizacional", "Compensaciones"],
      accent: "#a78bfa",
      glow: "167,139,250",
      icon: <Users size={16} />,
    },
  ];

  const cardMotion = [
    { x: c1x, opacity: c1o, glow: g1 },
    { x: c2x, opacity: c2o, glow: g2 },
    { x: c3x, opacity: c3o, glow: g3 },
  ];

  const stats = [
    { value: "25+", label: "Años de Experiencia" },
    { value: "500+", label: "Empresas Asesoradas" },
    { value: "98%", label: "Tasa de Éxito" },
    { value: "$2M+", label: "Ahorro Fiscal Generado" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-12 sm:pt-20 bg-white font-sans text-slate-900"
    >

      {/* IMPROVED HERO */}
      <section ref={heroRef} className="relative min-h-[70vh] sm:min-h-[80vh] flex items-center justify-center overflow-hidden bg-slate-950 px-4 sm:px-6">
        {/* Background Grid & Effects */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-0 right-0 w-[400px] sm:w-[800px] h-[400px] sm:h-[800px] bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-emerald-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3" />

        {/* ── Mobile floating background image (hidden on lg+) ── */}
        <motion.div
          className="lg:hidden absolute z-[5] pointer-events-none"
          style={{
            top: "8%",
            left: "-5%",
            width: "80%",
            height: "68%",
            x: mobileHeroX,
            opacity: mobileHeroOpacity,
          }}
        >
          <div className="w-full h-full rounded-2xl overflow-hidden border border-slate-700/20 shadow-2xl">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950/35 via-transparent to-slate-950/55" />
          </div>
        </motion.div>

        <div className="container mx-auto relative z-20 grid lg:grid-cols-2 gap-8 lg:gap-16 items-center pt-10 sm:pt-10">
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left flex flex-col items-center lg:items-start relative"
          >
            {/* Blur panel — mobile only, sits behind all text */}
            <div
              aria-hidden
              className="lg:hidden absolute -inset-x-3 -inset-y-5 rounded-2xl -z-10 pointer-events-none overflow-hidden"
            >
              <div className="absolute inset-0 backdrop-blur-[6px]" />
              <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/45 to-slate-950/60" />
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-800 text-blue-300 text-[10px] sm:text-xs font-semibold tracking-widest uppercase mb-4 sm:mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              Corporate Intelligence
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-[1.1] tracking-tight">
              Redefiniendo el <br />
              <span className="font-extralight tracking-[0.18em] text-white/80 lg:font-bold lg:tracking-tight lg:text-transparent lg:bg-clip-text lg:bg-gradient-to-r lg:from-blue-400 lg:via-blue-200 lg:to-emerald-400">
                Futuro Empresarial
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-400 mb-8 sm:mb-10 leading-relaxed max-w-xl border-l-4 border-emerald-500 pl-4 sm:pl-6 text-left">
              Integramos consultoría de alto nivel con soluciones financieras y legales. 
              Transformamos la complejidad corporativa en ventajas competitivas sostenibles.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
              <button className="group relative bg-white text-slate-900 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold hover:bg-slate-100 transition-all flex items-center justify-center gap-3 overflow-hidden">
                <span className="relative z-10">Agendar Consultoría</span>
                <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-medium text-white border border-slate-700 hover:border-slate-500 hover:bg-slate-800/50 transition-all backdrop-blur-sm text-center">
                Explorar Soluciones
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-800/60 w-full flex flex-col items-center lg:items-start gap-4">
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Confían en nosotros</p>
              <div className="flex gap-4 sm:gap-6 opacity-70 grayscale items-center flex-wrap justify-center lg:justify-start">
                 <div className="flex items-center gap-2"><div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-white"></div><span className="font-bold text-sm sm:text-lg">AEXA</span></div>
                 <div className="flex items-center gap-2"><div className="w-5 h-5 sm:w-6 sm:h-6 rotate-45 border-2 border-white"></div><span className="font-bold text-sm sm:text-lg">NOVUS</span></div>
                 <div className="flex items-center gap-2"><div className="w-5 h-5 sm:w-6 sm:h-6 rounded-sm border-2 border-white"></div><span className="font-bold text-sm sm:text-lg">VERTEX</span></div>
              </div>
            </div>
          </motion.div>

          {/* Visual Content - Right Side */}
          <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.3, duration: 0.8 }}
             className="relative hidden lg:block h-[600px] w-full"
          >
            {/* Main Image with sophisticated masking */}
            <div className="absolute inset-0 bg-slate-800 rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl">
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-60 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700 hover:scale-105" />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
               
               {/* Floating Cards Overlays */}
               <div className="absolute bottom-8 left-8 right-8 grid grid-cols-2 gap-4">
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-xl hover:bg-white/10 transition-colors cursor-default">
                    <div className="flex items-center gap-2 mb-2">
                       <div className="p-1.5 bg-emerald-500/20 rounded-lg text-emerald-400"><Gem size={16}/></div>
                       <span className="text-xs text-slate-300 uppercase tracking-wider font-semibold">Crecimiento</span>
                    </div>
                    <div className="text-white text-2xl font-bold mb-1">
                      <AnimatedStat valueString="+240%" />
                    </div>
                    <div className="text-slate-400 text-xs">Incremento en Q3 2024</div>
                  </div>
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-xl hover:bg-white/10 transition-colors cursor-default">
                    <div className="flex items-center gap-2 mb-2">
                       <div className="p-1.5 bg-blue-500/20 rounded-lg text-blue-400"><Briefcase size={16}/></div>
                       <span className="text-xs text-slate-300 uppercase tracking-wider font-semibold">Capital</span>
                    </div>
                    <div className="text-white text-2xl font-bold mb-1">
                      <AnimatedStat valueString="$500M+" />
                    </div>
                    <div className="text-slate-400 text-xs">Activos bajo gestión</div>
                  </div>
               </div>
            </div>

            {/* Decorative Elements around image */}
            <div className="absolute -z-10 top-[-20px] right-[-20px] w-full h-full border border-slate-800 rounded-2xl"></div>
            <div className="absolute -z-20 top-[20px] left-[-20px] w-full h-full bg-slate-900/50 rounded-2xl"></div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 mb-1 sm:mb-2">
                  <AnimatedStat valueString={stat.value} />
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-14 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row gap-10 sm:gap-16 items-center">
            <div className="md:w-1/2 relative">
              <div className="absolute top-[-20px] left-[-20px] w-24 h-24 bg-blue-100 rounded-full z-0 opacity-50" />
              <div className="absolute bottom-[-20px] right-[-20px] w-32 h-32 bg-emerald-100 rounded-full z-0 opacity-50" />
              <img
                src="https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&q=80"
                alt="Meeting"
                className={`relative z-10 rounded-2xl shadow-2xl transition-all duration-700 cursor-pointer ${
                  philosophyTouched ? 'grayscale-0' : 'grayscale'
                } hover:grayscale-0`}
                onTouchStart={() => setPhilosophyTouched(true)}
                onTouchEnd={() => setTimeout(() => setPhilosophyTouched(false), 600)}
                onTouchCancel={() => setPhilosophyTouched(false)}
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-blue-600 font-bold uppercase tracking-widest mb-4 text-sm">
                Nuestra Filosofía
              </h2>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight">
                Más que asesores, somos sus{" "}
                <span className="underline decoration-blue-500 decoration-4 underline-offset-4">
                  socios estratégicos
                </span>
                .
              </h3>
              <p className="text-slate-600 text-base sm:text-lg mb-6 leading-relaxed">
                En un entorno empresarial volátil, la claridad es poder. Nuestro
                enfoque multidisciplinario integra visión legal, perspicacia
                financiera y estrategia corporativa para blindar su negocio y
                acelerar su crecimiento.
              </p>
              <ul className="space-y-4">
                {[
                  "Análisis de riesgo proactivo 360°.",
                  "Implementación de estructuras fiscales eficientes.",
                  "Defensa corporativa implacable.",
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.2 }}
                    className="flex items-center gap-3 text-slate-800 font-medium"
                  >
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <ArrowRight size={14} />
                    </div>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES — Scroll-Driven Sticky ── */}

      {/* ── SERVICES — Mobile Scroll-Driven Sticky (md:hidden) ── */}
      <div ref={mobileServicesRef} className="md:hidden relative h-[240vh]">
        <div
          className="sticky top-0 h-screen overflow-hidden flex flex-col"
          style={{ backgroundColor: "#04060f" }}
        >
          {/* Background grid */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_30%,#04060f_100%)]" />
            <div
              className="absolute inset-0 blur-[120px]"
              style={{ background: "radial-gradient(ellipse at 50% 40%, rgba(59,130,246,0.15) 0%, transparent 70%)" }}
            />
          </div>

          {/* Header */}
          <div className="relative z-10 text-center pt-10 pb-5 shrink-0">
            <p className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.2em] uppercase text-slate-500 mb-3">
              <span className="block w-5 h-px bg-slate-700" />
              Servicios Corporativos
              <span className="block w-5 h-px bg-slate-700" />
            </p>
            <h2 className="text-3xl font-bold text-white tracking-tight leading-tight">
              Nuestra{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-300 via-white to-slate-400">
                Expertise
              </span>
            </h2>
          </div>

          {/* Cards — grid, 3 equal rows */}
          <div
            className="relative z-10 px-4 pt-2 pb-6 overflow-hidden flex-1"
            style={{ display: "grid", gridTemplateRows: "1fr 1fr 1fr", gap: "20px" }}
          >
            {services.map((svc, idx) => (
              <motion.div
                key={idx}
                style={{
                  opacity: mobileCards[idx].opacity,
                  y: mobileCards[idx].y,
                  backgroundColor: "#0c1120",
                  boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.08), 0 0 30px rgba(${svc.glow},0.08)`,
                }}
                className="relative rounded-2xl overflow-hidden"
              >
                {/* Image — bg-image fills right 44% top-to-bottom */}
                <div
                  className="absolute top-0 right-0 bottom-0 w-[44%]"
                  style={{
                    backgroundImage: `url('${svc.imageUrl}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(to left, transparent 30%, #0c1120 100%)` }}
                  />
                  <div className="absolute top-2 right-2">
                    <span
                      className="text-[10px] font-bold tracking-widest px-1.5 py-0.5 rounded-full border"
                      style={{ color: svc.accent, borderColor: `${svc.accent}50`, backgroundColor: `${svc.accent}15` }}
                    >
                      {svc.num}
                    </span>
                  </div>
                </div>

                {/* Content — left side */}
                <div className="relative z-10 flex flex-col justify-center w-[58%] h-full px-4 py-4">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-5 h-[2px] rounded-full" style={{ backgroundColor: svc.accent }} />
                    <h3 className="text-sm font-bold text-white leading-tight">{svc.title}</h3>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed mb-2 line-clamp-2">{svc.desc}</p>
                  <ul className="space-y-0.5 mb-2">
                    {svc.features.map((f, fi) => (
                      <li key={fi} className="text-[10px] text-slate-500 tracking-wide leading-relaxed">{f}</li>
                    ))}
                  </ul>
                  <button className="self-start flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.12em] uppercase text-white/40 hover:text-white transition-colors duration-300 group/mbtn">
                    <span>Conocer más</span>
                    <ArrowRight size={9} className="group-hover/mbtn:translate-x-0.5 transition-transform" style={{ color: svc.accent }} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SERVICES — Desktop Scroll-Driven (hidden on mobile) ── */}
      <section ref={servicesRef} className="hidden md:block relative h-[320vh]">
        <div
          className="sticky top-0 h-screen overflow-hidden"
          style={{ backgroundColor: "#04060f" }}
        >
          {/* ── WALL ── */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Perspective grid — fine lines */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
                backgroundSize: "68px 68px",
                transform: "perspective(900px) rotateX(6deg) scaleY(1.1)",
                transformOrigin: "50% 0%",
              }}
            />
            {/* Bold grid — structural depth */}
            <div
              className="absolute inset-0 opacity-[0.55]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
                backgroundSize: "204px 204px",
                transform: "perspective(900px) rotateX(6deg) scaleY(1.1)",
                transformOrigin: "50% 0%",
              }}
            />
            {/* Central radial fade — keeps center readable */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_60%,transparent_30%,#04060f_100%)]" />
            {/* Edge vignettes */}
            <div className="absolute inset-y-0 left-0  w-20 bg-gradient-to-r from-[#04060f] to-transparent" />
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#04060f] to-transparent" />
            <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#04060f] to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#04060f] to-transparent" />

            {/* Per-card wall glow — 3 columns */}
            {services.map((s, i) => (
              <motion.div
                key={i}
                style={{
                  opacity: cardMotion[i].glow,
                  left: `${10 + i * 30}%`,
                  width: "30%",
                  background: `radial-gradient(ellipse at 50% 55%, rgba(${s.glow},0.28) 0%, transparent 70%)`,
                }}
                className="absolute top-0 bottom-0 blur-[140px]"
              />
            ))}
          </div>

          {/* ── CONTENT ── */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center px-5 sm:px-8 md:px-12 lg:px-16 pb-16">

            {/* Header */}
            <motion.div
              style={{ opacity: hO, y: hY }}
              className="text-center mb-10 md:mb-14 shrink-0"
            >
              <p className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.2em] uppercase text-slate-500 mb-5">
                <span className="block w-6 h-px bg-slate-600" />
                Servicios Corporativos
                <span className="block w-6 h-px bg-slate-600" />
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white tracking-tight leading-[1.08]">
                Nuestra{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-300 via-white to-slate-400">
                  Expertise
                </span>
              </h2>
            </motion.div>

            {/* Cards row */}
            <div className="w-full max-w-[960px] flex flex-col md:flex-row gap-4 md:gap-7 lg:gap-8">
              {services.map((svc, idx) => (
                <motion.div
                  key={idx}
                  style={{ x: cardMotion[idx].x, opacity: cardMotion[idx].opacity }}
                  className="relative flex-1 flex flex-col rounded-2xl overflow-hidden group h-[200px] sm:h-[240px] md:h-[560px] lg:h-[620px]"
                >
                  {/* ── IMAGE ── top 52% */}
                  <div className="relative w-full overflow-hidden" style={{ flex: "0 0 52%" }}>
                    <img
                      src={svc.imageUrl}
                      alt={svc.title}
                      className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    />
                    {/* Fade image into content below */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(to bottom, transparent 45%, #0c1120 100%)`,
                      }}
                    />
                    {/* Index number badge — top-left */}
                    <div className="absolute top-4 left-4">
                      <span
                        className="text-[11px] font-bold tracking-[0.22em] px-2.5 py-1 rounded-full border"
                        style={{
                          color: svc.accent,
                          borderColor: `${svc.accent}40`,
                          backgroundColor: `${svc.accent}12`,
                        }}
                      >
                        {svc.num}
                      </span>
                    </div>
                    {/* Large dim number */}
                    <div
                      className="absolute bottom-3 right-4 text-[4rem] font-black leading-none select-none"
                      style={{ color: `${svc.accent}18` }}
                    >
                      {svc.num}
                    </div>
                  </div>

                  {/* ── CONTENT ── bottom 42% */}
                  <div
                    className="flex flex-col justify-between flex-1 px-6 pt-5 pb-7"
                    style={{ backgroundColor: "#0c1120" }}
                  >
                    {/* Top */}
                    <div>
                      {/* Accent bar */}
                      <div
                        className="w-8 h-[3px] rounded-full mb-4"
                        style={{ backgroundColor: svc.accent }}
                      />
                      <h3 className="text-lg md:text-xl font-bold text-white mb-3 leading-tight">
                        {svc.title}
                      </h3>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        {svc.desc}
                      </p>
                    </div>

                    {/* Features — clean list + CTA */}
                    <div className="mt-6 border-t pt-5 flex flex-col gap-3" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                      <ul className="space-y-2">
                        {svc.features.map((f, fi) => (
                          <li key={fi} className="text-[13px] text-slate-400 tracking-wide leading-relaxed">
                            {f}
                          </li>
                        ))}
                      </ul>
                      <button className="mt-1 self-start flex items-center gap-2 text-[11px] font-semibold tracking-[0.14em] uppercase text-white/50 hover:text-white transition-colors duration-300 group/btn">
                        <span>Conocer más</span>
                        <ArrowRight size={11} className="group-hover/btn:translate-x-1 transition-transform duration-300" style={{ color: svc.accent }} />
                      </button>
                    </div>
                  </div>

                  {/* Glass border overlay */}
                  <div
                    className="absolute inset-0 rounded-2xl pointer-events-none transition-all duration-500"
                    style={{ boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.07)` }}
                  />
                  {/* Hover glow border */}
                  <div
                    className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ boxShadow: `inset 0 0 0 1px ${svc.accent}55, 0 0 40px ${svc.accent}18` }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Scroll cue — fixed to bottom of viewport, below all cards */}
            <motion.div
              style={{ opacity: hO }}
              className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
            >
              <motion.div
                animate={{ scaleY: [1, 1.8, 1], opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="w-px h-8 origin-top"
                style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.35), transparent)" }}
              />
              <span className="text-[8px] uppercase tracking-[0.28em] text-slate-700 font-medium">scroll</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8 sm:mb-12 text-center">
            Preguntas Frecuentes
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "¿Cómo se estructura la tarifa de sus servicios?",
                a: "Trabajamos mediante un esquema de iguala mensual personalizado o por proyecto específico, dependiendo de la magnitud y duración del requerimiento.",
              },
              {
                q: "¿Tienen experiencia en mercados internacionales?",
                a: "Sí, contamos con alianzas estratégicas en LATAM, USA y Europa para facilitar la expansión y operaciones transfronterizas de nuestros clientes.",
              },
              {
                q: "¿Cuál es el tiempo de respuesta promedio?",
                a: "Para nuestros clientes corporativos, garantizamos una respuesta inicial en menos de 4 horas y atención prioritaria 24/7 para emergencias legales.",
              },
            ].map((item, idx) => (
              <div key={idx} className="border border-slate-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setActiveAccordion(activeAccordion === idx ? null : idx)}
                  className="w-full flex justify-between items-center p-4 sm:p-6 bg-slate-50 hover:bg-slate-100 text-left font-bold text-slate-800 transition-colors text-sm sm:text-base"
                >
                  {item.q}
                  <motion.div
                    animate={{ rotate: activeAccordion === idx ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown size={20} className="text-slate-400" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {activeAccordion === idx && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 sm:p-6 text-slate-600 bg-white border-t border-slate-100 text-sm sm:text-base">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-white py-14 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-10 sm:gap-16 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Empecemos a trabajar.</h2>
              <p className="text-slate-400 text-base sm:text-lg mb-8 sm:mb-10 max-w-md">
                Agenda una consulta inicial gratuita de 30 minutos para evaluar
                sus necesidades y cómo podemos ayudarle.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-blue-400">
                    <Smartphone />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 uppercase font-bold">Llámenos</div>
                    <div className="text-lg sm:text-xl font-medium">+54 11 5555 0123</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-blue-400">
                    <Home />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 uppercase font-bold">Oficinas</div>
                    <div className="text-base sm:text-xl font-medium">Av. Libertador 1000, Piso 25, CABA</div>
                  </div>
                </div>
              </div>
            </div>

            <form className="bg-white rounded-2xl p-6 sm:p-8 text-slate-900 shadow-2xl">
              <h3 className="text-xl font-bold mb-6">Formulario de Contacto</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Nombre completo"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
                <input
                  type="email"
                  placeholder="Email de trabajo"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
                <textarea
                  rows={4}
                  placeholder="Mensaje o Requerimiento"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
                <button
                  type="button"
                  className="w-full bg-blue-600 text-white font-bold py-4 rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
                >
                  Enviar Solicitud
                </button>
              </div>
            </form>
          </div>

          <div className="mt-12 sm:mt-20 pt-6 sm:pt-8 border-t border-slate-800 text-center text-slate-500 text-xs sm:text-sm">
            &copy; 2026 Nexo Corporate Solutions. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </motion.div>
  );
};
