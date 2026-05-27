"use client";

import React, { useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { Heart, ArrowRight } from "lucide-react";
import { DemoProps } from "../types";
import { whatsappLink } from "../constants";
import { ScrollDownIndicator } from "../ui/ScrollDownIndicator";

/* ─────────────────────────────────────────────────────────────────
   Hooks
   ──────────────────────────────────────────────────────────────── */
const useScrollReveal = (options: IntersectionObserverInit = { threshold: 0.1 }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setIsVisible(true);
      });
    }, options);

    const { current } = domRef;
    if (current) observer.observe(current);
    return () => {
      if (current) observer.unobserve(current);
    };
  }, [options]);

  return [domRef, isVisible] as const;
};

/* ─────────────────────────────────────────────────────────────────
   Helpers de animación
   ──────────────────────────────────────────────────────────────── */
const TextReveal = ({
  text,
  className = "",
  as = "div",
  delay = 0,
  style,
}: {
  text: string;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  delay?: number;
  style?: React.CSSProperties;
}) => {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.2 });
  const words = text.split(/(\s+)/);
  const Component = as as React.ElementType;

  return (
    <Component ref={ref as React.Ref<HTMLElement>} className={className} style={style}>
      {words.map((word, i) => {
        if (word.trim() === "") return <span key={i}>{word}</span>;
        return (
          <span key={i} className="inline-block overflow-hidden align-bottom">
            <span
              className={`inline-block transform transition-transform duration-[1.2s] ease-out-expo ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-[120%] opacity-0"
              }`}
              style={{ transitionDelay: `${delay + i * 0.04}s` }}
            >
              {word}
            </span>
          </span>
        );
      })}
    </Component>
  );
};

const ClipImage = ({
  src,
  alt,
  className = "",
  tag,
}: {
  src: string;
  alt: string;
  className?: string;
  tag?: string;
}) => {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.15 });
  return (
    <div ref={ref} className={`relative overflow-hidden group ${className}`}>
      {tag && (
        <div
          className={`absolute top-4 left-4 z-10 bg-black text-white text-[10px] font-bold px-3 py-1.5 uppercase tracking-widest transition-opacity duration-1000 delay-500 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {tag}
        </div>
      )}
      <div
        className={`w-full h-full transition-all duration-[1.5s] ease-out-expo ${
          isVisible ? "clip-reveal-active" : "clip-reveal"
        }`}
      >
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-contain transform transition-transform duration-[2s] ease-out-expo ${
            isVisible ? "scale-100" : "scale-110"
          } group-hover:scale-105`}
        />
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────
   Product Card (sin precio — la conversión es por contacto)
   ──────────────────────────────────────────────────────────────── */
const ProductCard = ({
  image,
  title,
  tag,
  aspectClass = "aspect-[3/4]",
  onAsk,
}: {
  image: string;
  title: string;
  tag?: string;
  aspectClass?: string;
  onAsk: (title: string) => void;
}) => {
  return (
    <div className="group cursor-pointer flex flex-col">
      <div className={`relative ${aspectClass} mb-5 overflow-hidden bg-[#f5f4f2]`}>
        <ClipImage src={image} alt={title} tag={tag} className="w-full h-full" />
        <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            aria-label={`Marcar ${title} como favorito`}
            className="p-1.5 bg-white/80 rounded-full backdrop-blur-sm"
          >
            <Heart size={16} className="text-gray-800 hover:fill-current" />
          </button>
        </div>
      </div>
      <TextReveal
        text={title}
        className="text-sm font-bold uppercase tracking-widest text-gray-900 group-hover:opacity-70 transition-opacity"
      />
      <button
        onClick={() => onAsk(title)}
        className="mt-3 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] font-bold text-gray-800 hover:text-black self-start border-b border-gray-300 hover:border-black pb-0.5 transition-colors"
      >
        Consultar disponibilidad
        <ArrowRight size={12} />
      </button>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────
   Horizontal Scroll Section — scroll vinculado al progreso global
   para evitar problemas con AnimatePresence + target refs.
   ──────────────────────────────────────────────────────────────── */
const HorizontalScrollSection = ({ onAsk }: { onAsk: (title: string) => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [bounds, setBounds] = React.useState({ top: 0, height: 1 });

  // Medimos la posición del contenedor en el documento
  React.useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const rect = el.getBoundingClientRect();
      setBounds({ top: rect.top + window.scrollY, height: rect.height });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const { scrollY } = useScroll();
  // Progreso 0→1 mientras el viewport recorre los 300vh del contenedor
  const rawProgress = useTransform(
    scrollY,
    [bounds.top, bounds.top + bounds.height - window.innerHeight],
    [0, 1]
  );
  const progress = useTransform(rawProgress, (v) => Math.min(1, Math.max(0, v)));
  const x = useTransform(progress, [0, 1], ["0%", "-65%"]);

  return (
    <section
      ref={containerRef}
      className="relative bg-[#050505] text-white"
      style={{ height: "300vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        <div className="absolute top-1/2 left-8 md:left-24 -translate-y-1/2 z-0 opacity-20 pointer-events-none">
          <h2 className="text-[15vw] leading-none font-black tracking-tighter uppercase whitespace-nowrap">
            La Esencia
          </h2>
        </div>

        <motion.div
          style={{ x }}
          className="relative z-10 flex items-center gap-8 md:gap-16 px-8 md:px-24 w-max will-change-transform"
        >
          <div className="w-[80vw] md:w-[40vw] flex-shrink-0">
            <h3
              className="text-3xl md:text-5xl font-light leading-tight mb-6"
              style={{ fontFamily: "var(--font-serif-editorial), serif" }}
            >
              El arte de la transición diaria.
            </h3>
            <p className="text-gray-400 text-sm tracking-widest leading-loose uppercase">
              Materiales puros. Volúmenes estudiados. Cada puntada es una
              declaración de intenciones diseñada para fluir contigo.
            </p>
          </div>

          {/* moda12 */}
          <div className="flex-shrink-0 w-[55vw] md:w-[28vw] bg-[#111] flex items-center justify-center">
            <img
              src="/moda12.png"
              className="w-full object-contain grayscale hover:grayscale-0 transition-all duration-1000"
              style={{ aspectRatio: "3/4" }}
              alt="Detalle de colección 01"
            />
          </div>
          {/* moda13 */}
          <div className="flex-shrink-0 w-[70vw] md:w-[40vw] bg-[#0a0a0a] flex items-center justify-center self-stretch">
            <img
              src="/moda13.png"
              className="w-full h-full object-contain"
              style={{ aspectRatio: "3/4" }}
              alt="Pieza central de colección"
            />
          </div>
          {/* moda14 */}
          <div className="flex-shrink-0 w-[55vw] md:w-[26vw] bg-[#111] flex items-center justify-center">
            <img
              src="/moda14.png"
              className="w-full object-contain grayscale hover:grayscale-0 transition-all duration-1000"
              style={{ aspectRatio: "3/4" }}
              alt="Detalle de colección 03"
            />
          </div>

          <div className="w-[80vw] md:w-[30vw] flex-shrink-0 flex justify-center items-center">
            <button
              onClick={() => onAsk("Colección completa SS26")}
              className="group flex flex-col items-center space-y-4"
            >
              <span className="w-16 h-16 rounded-full border border-white/30 flex items-center justify-center group-hover:scale-125 group-hover:bg-white group-hover:text-black transition-all duration-500">
                <ArrowRight size={20} />
              </span>
              <span className="text-xs uppercase tracking-[0.3em] font-bold">
                Ver colección
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────────
   Main view
   ──────────────────────────────────────────────────────────────── */
export const FashionView = ({ onBackToStudio }: DemoProps) => {
  const reduced = useReducedMotion();

  const askForPiece = (piece: string) => {
    const msg = `Hola Nexo (demo Moda)! Me interesó "${piece}". ¿Podemos charlar?`;
    window.open(whatsappLink(msg), "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="min-h-screen bg-white text-gray-900 selection:bg-black selection:text-white"
      style={{ fontFamily: "var(--font-geist-sans)" }}
    >
      {/* Indicador "scrollea siempre hacia abajo" — capa fija */}
      <ScrollDownIndicator
        text="Scrollea siempre hacia abajo para vivir la experiencia"
        dark
      />

      {/* HERO */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img
            src="/moda1.png"
            alt=""
            className={`w-full h-full object-cover object-top opacity-95 ${
              reduced ? "" : "animate-hero-scale"
            }`}
          />
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white text-center px-4">
            <h2
              className="text-xs md:text-sm tracking-[0.4em] uppercase mb-6 animate-fade-in-up"
              style={{ animationDelay: "0.5s", animationFillMode: "both" }}
            >
              Colección SS26 · Demo Nexo
            </h2>
            <TextReveal
              text="VÉLURE"
              as="h1"
              className="text-7xl md:text-[10rem] font-black tracking-tighter mb-10 leading-none drop-shadow-lg"
              delay={0.2}
            />
            <a
              href="#shop"
              className="group flex items-center space-x-3 text-xs uppercase tracking-[0.2em] font-bold border border-white/30 bg-white/10 backdrop-blur-sm px-6 py-3 hover:bg-white hover:text-black transition-all duration-500 animate-fade-in-up"
              style={{ animationDelay: "1s", animationFillMode: "both" }}
            >
              <span>Descubrir la colección</span>
              <ArrowRight
                size={14}
                className="transform group-hover:translate-x-2 transition-transform"
              />
            </a>
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="relative z-20 bg-white">
        {/* Marquee */}
        <div className="bg-black text-white py-2 overflow-hidden whitespace-nowrap border-b border-gray-800">
          <div className="animate-marquee inline-block font-bold tracking-[0.2em] text-[10px] uppercase">
            NUEVA CÁPSULA SS26 — PIEZAS DE EDICIÓN LIMITADA — MATERIALES DE PRIMERA SELECCIÓN — ATELIER VÉLURE — DISEÑO 100% A MEDIDA POR NEXO STUDIO &nbsp;
          </div>
        </div>

        {/* DESTACADOS — moda2, moda3, moda4 */}
        <section
          id="shop"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32"
        >
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 space-y-4 md:space-y-0">
            <TextReveal
              text="DESTACADOS"
              as="h2"
              className="text-3xl md:text-5xl font-black uppercase tracking-tighter"
            />
            <a
              href={whatsappLink(
                "Hola Nexo (demo Moda)! Me interesa la colección completa."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-xs uppercase font-bold tracking-widest hover:opacity-60 transition-opacity"
            >
              <span>Ver Todo</span> <ArrowRight size={14} />
            </a>
          </div>

          {/* Desktop: tres cards con stagger vertical */}
          <div className="hidden md:flex items-start gap-8 lg:gap-14">
            <div className="flex-1">
              <ProductCard
                image="/moda2.png"
                title="Esencia Oversize"
                tag="EXCLUSIVO"
                onAsk={askForPiece}
              />
            </div>
            <div className="flex-1 pt-6">
              <ProductCard
                image="/moda3.png"
                title="Winona Traje Atelier"
                tag="NUEVO"
                onAsk={askForPiece}
              />
            </div>
            <div className="flex-1 pt-10">
              <ProductCard
                image="/moda4.png"
                title="Marigold Pantalón"
                tag="SS26"
                onAsk={askForPiece}
              />
            </div>
          </div>

          {/* Mobile: stack vertical */}
          <div className="md:hidden grid grid-cols-1 gap-10">
            <ProductCard
              image="/moda2.png"
              title="Esencia Oversize"
              tag="EXCLUSIVO"
              onAsk={askForPiece}
            />
            <ProductCard
              image="/moda3.png"
              title="Winona Traje Atelier"
              tag="NUEVO"
              onAsk={askForPiece}
            />
            <ProductCard
              image="/moda4.png"
              title="Marigold Pantalón"
              tag="SS26"
              onAsk={askForPiece}
            />
          </div>
        </section>

        {/* CAPSULE — sticky: moda5 / products: moda6, moda7 */}
        <section className="bg-[#fcfcfc] border-y border-gray-100 relative">
          {/* DESKTOP */}
          <div className="hidden md:flex md:flex-row">
            <div className="md:w-1/2 relative">
              <div className="sticky top-0 h-[55vh] md:h-screen w-full overflow-hidden">
                <img
                  src="/moda5.png"
                  alt=""
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-8 left-6 md:bottom-12 md:left-12">
                  <span className="text-white text-[10px] font-bold tracking-[0.3em] uppercase border border-white/50 px-4 py-2 backdrop-blur-md">
                    Enfoque de Categoría
                  </span>
                  <h3 className="text-white text-3xl md:text-5xl font-black mt-4 md:mt-6 tracking-tighter">
                    Cápsula de Viaje
                  </h3>
                </div>
              </div>
            </div>

            <div className="md:w-1/2 p-6 sm:p-10 md:p-24 lg:p-32 space-y-14 md:space-y-24">
              <TextReveal
                text="Diseñado para la transición. Materiales ligeros, volúmenes fluidos y elegancia sin esfuerzo para tu día a día, de lo formal a lo informal."
                as="h4"
                className="text-2xl md:text-3xl font-light leading-snug text-gray-800"
              />
              <ProductCard
                image="/moda6.png"
                title="Honolulu Cárdigan"
                tag="NUEVO"
                onAsk={askForPiece}
              />
              <ProductCard
                image="/moda7.png"
                title="Sirmione Camiseta"
                onAsk={askForPiece}
              />
              <div className="pt-8 border-t border-black">
                <button
                  onClick={() => askForPiece("Cápsula de Viaje completa")}
                  className="group w-full flex justify-between items-center text-lg font-bold uppercase tracking-widest hover:opacity-60 transition-opacity"
                >
                  <span>Descubrir la cápsula</span>
                  <ArrowRight
                    size={24}
                    className="transform group-hover:translate-x-4 transition-transform duration-500"
                  />
                </button>
              </div>
            </div>
          </div>

          {/* MOBILE */}
          <div className="md:hidden relative" style={{ minHeight: "calc(100vh + 160vw)" }}>
            <div className="sticky top-0 h-[52vh] w-full z-0 overflow-hidden">
              <img
                src="/moda5.png"
                alt=""
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
              <div className="absolute top-6 left-6">
                <span className="text-white text-[9px] font-bold tracking-[0.35em] uppercase border border-white/50 px-3 py-1.5 backdrop-blur-sm">
                  Enfoque de Categoría
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 px-6 pb-6">
                <h3 className="text-white text-[11vw] font-black tracking-tighter leading-none uppercase">
                  Cápsula
                  <br />
                  de Viaje
                </h3>
              </div>
            </div>

            <div className="relative z-10 bg-white rounded-t-2xl -mt-6 px-6 pt-10 pb-14 flex flex-col gap-10">
              <p className="text-[4.2vw] font-light leading-relaxed text-gray-700">
                Diseñado para la transición. Materiales ligeros, volúmenes
                fluidos y elegancia sin esfuerzo — de lo formal a lo informal.
              </p>

              <ProductCard
                image="/moda6.png"
                title="Honolulu Cárdigan"
                tag="NUEVO"
                onAsk={askForPiece}
              />
              <ProductCard
                image="/moda7.png"
                title="Sirmione Camiseta"
                onAsk={askForPiece}
              />

              <div className="pt-6 border-t border-black">
                <button
                  onClick={() => askForPiece("Cápsula de Viaje completa")}
                  className="w-full flex justify-between items-center text-sm font-black uppercase tracking-widest text-gray-900 active:opacity-50 transition-opacity"
                >
                  <span>Descubrir la cápsula</span>
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ATELIER — desktop tall image: moda8 / mobile imgs: moda9, moda10, moda11 */}
        <section className="relative">
          <div className="hidden md:flex md:flex-row" style={{ minHeight: "200vh" }}>
            <div className="md:w-1/2 relative">
              <div className="sticky top-0 h-screen flex flex-col justify-center px-14 md:px-20 lg:px-28 bg-white">
                <span className="text-[9px] font-bold tracking-[0.45em] uppercase text-gray-400 mb-6 block">
                  Atelier SS26
                </span>
                <h3
                  className="text-xl md:text-2xl font-black tracking-tighter text-gray-900 leading-snug mb-6 uppercase"
                  style={{ fontFamily: "var(--font-serif-editorial), serif" }}
                >
                  La materia prima
                  <br />
                  es la primera
                  <br />
                  decisión.
                </h3>
                <p className="text-gray-400 text-xs md:text-sm leading-loose max-w-xs font-light">
                  Cada tela seleccionada a mano. Cada corte pensado para durar.
                  VÉLURE no sigue tendencias — las anticipa con silencio y
                  precisión.
                </p>
                <div className="mt-10">
                  <button
                    onClick={() => askForPiece("Filosofía del atelier")}
                    className="group inline-flex items-center gap-3 text-[10px] uppercase font-bold tracking-[0.25em] border-b border-black pb-1 hover:opacity-40 transition-opacity"
                  >
                    <span>Nuestra filosofía</span>
                    <ArrowRight
                      size={11}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="md:w-1/2 overflow-hidden" style={{ height: "200vh" }}>
              <img
                src="/moda8.png"
                alt=""
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* Mobile split */}
          <div className="md:hidden relative bg-black" style={{ height: "250vh" }}>
            <div className="sticky top-0 h-[50vh] w-full bg-black text-white flex flex-col justify-center px-8 z-20 shadow-2xl">
              <span className="text-[9px] font-bold tracking-[0.45em] uppercase text-gray-400 mb-4 block">
                Atelier SS26
              </span>
              <h3
                className="text-[7vw] font-black tracking-tighter uppercase leading-[1.1] mb-4"
                style={{ fontFamily: "var(--font-serif-editorial), serif" }}
              >
                La materia prima
                <br />
                es la primera
                <br />
                decisión.
              </h3>
              <p className="text-gray-400 text-[3.5vw] leading-relaxed font-light">
                VÉLURE no sigue tendencias — las anticipa con silencio y
                precisión.
              </p>
            </div>

            <div className="relative z-10 w-full flex flex-col">
              <div className="h-[50vh] w-full relative">
                <img
                  src="/moda9.png"
                  className="w-full h-full object-cover grayscale"
                  alt=""
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>
              <div className="h-[50vh] w-full relative">
                <img
                  src="/moda10.png"
                  className="w-full h-full object-cover"
                  alt=""
                />
                <div className="absolute inset-0 bg-black/10" />
              </div>
              <div className="h-[50vh] w-full relative">
                <img
                  src="/moda11.png"
                  className="w-full h-full object-cover grayscale"
                  alt=""
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>
              <div className="h-[50vh] w-full bg-white flex flex-col items-center justify-center text-black">
                <span className="w-12 h-12 rounded-full border border-black flex items-center justify-center mb-4 animate-bounce">
                  <ArrowRight size={16} className="transform rotate-90" />
                </span>
                <button
                  onClick={() => askForPiece("Atelier VÉLURE")}
                  className="text-xs font-bold uppercase tracking-[0.3em] border-b border-black pb-1"
                >
                  Descubrir Atelier
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* HISTORIA */}
        <section className="py-20 md:py-40 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
          <h3 className="text-xs font-bold tracking-[0.4em] uppercase text-gray-400 mb-12">
            Nuestra historia
          </h3>
          <TextReveal
            text="VÉLURE nace de la pasión por la costura, los materiales preciosos, los volúmenes refinados y el arte intemporal de la sastrería."
            as="p"
            className="text-3xl md:text-5xl text-gray-900 leading-tight mb-12"
            style={{ fontFamily: "var(--font-serif-editorial), serif" }}
          />
          <p className="text-sm uppercase tracking-widest text-gray-500 font-bold">
            Desde 2009
          </p>
        </section>

        {/* HORIZONTAL SCROLL — moda12, moda13, moda14 */}
        <HorizontalScrollSection onAsk={askForPiece} />

        {/* MUST HAVE — moda15, moda16 */}
        <section className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-2 hide-scrollbar">
          {[
            { src: "/moda15.png", label: "Abrigos", title: "Descubre" },
            { src: "/moda16.png", label: "Archivo", title: "Explora" },
          ].map((it, i) => (
            <div
              key={i}
              className="snap-center shrink-0 w-[90vw] md:w-auto group relative overflow-hidden h-[70vh] md:h-screen cursor-pointer bg-[#0d0d0d] flex items-center justify-center mx-4 md:mx-0 rounded-2xl md:rounded-none my-8 md:my-0"
            >
              <img
                src={it.src}
                alt=""
                className="h-full w-auto max-w-full object-contain transform scale-100 group-hover:scale-105 transition-transform duration-[2s] ease-out-expo"
              />
              <div className="absolute inset-0 bg-black/40 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col items-center justify-center">
                <span className="text-white text-xs font-bold tracking-[0.5em] md:translate-y-10 group-hover:translate-y-0 transition-transform duration-700 ease-out-expo">
                  {it.title}
                </span>
                <h3 className="text-white text-5xl md:text-6xl font-black mt-4 uppercase tracking-tighter md:-translate-y-10 group-hover:translate-y-0 transition-transform duration-700 ease-out-expo delay-75">
                  {it.label}
                </h3>
              </div>
            </div>
          ))}
          <div className="snap-center shrink-0 w-[10vw] md:hidden" />
        </section>

        {/* INSTAGRAM — selección mixta (6 piezas) */}
        <section className="bg-white py-24">
          <div className="max-w-[1600px] mx-auto px-4">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-sm font-bold uppercase tracking-[0.3em]">
                @VELURE_Official
              </h2>
              <a
                href="#"
                className="text-xs uppercase font-bold tracking-widest hover:text-gray-500 transition-colors"
              >
                Síguenos →
              </a>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1 items-end">
              {["/moda3.png", "/moda2.png", "/moda6.png", "/moda11.png", "/moda14.png", "/moda16.png"].map(
                (src, i) => (
                  <div
                    key={i}
                    className="relative aspect-[3/4] overflow-hidden group cursor-pointer bg-[#f5f4f2]"
                  >
                    <img
                      src={src}
                      alt={`Lookbook ${i + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 group-hover:opacity-90 transition-all duration-[1.5s] ease-out-expo"
                    />
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-[#050505] text-white pt-24 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-16">
            <div className="md:col-span-2">
              <h3 className="text-3xl font-black mb-4 tracking-tighter">
                ÚNETE A VÉLURE
              </h3>
              <p className="text-gray-400 mb-8 text-sm">
                Registrate y obtené acceso anticipado a nuevas piezas.
              </p>
              <form
                className="flex border-b border-gray-700 pb-3 max-w-md group"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  placeholder="Tu correo electrónico"
                  aria-label="Email"
                  className="flex-grow bg-transparent outline-none text-sm placeholder-gray-500 text-white"
                />
                <button
                  type="submit"
                  className="font-bold text-xs tracking-[0.2em] uppercase group-hover:text-gray-400 transition-colors"
                >
                  Enviar
                </button>
              </form>
            </div>

            <div>
              <h4 className="font-bold uppercase tracking-[0.2em] text-[10px] text-gray-500 mb-8">
                Navegación
              </h4>
              <ul className="space-y-4 text-xs tracking-widest uppercase">
                <li><a href="#" className="hover:text-gray-400 transition-colors">Quiénes Somos</a></li>
                <li><a href="#" className="hover:text-gray-400 transition-colors">Cápsula de Viaje</a></li>
                <li><a href="#" className="hover:text-gray-400 transition-colors">Contacto</a></li>
                <li><a href="#" className="hover:text-gray-400 transition-colors">Tienda</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold uppercase tracking-[0.2em] text-[10px] text-gray-500 mb-8">
                Soporte
              </h4>
              <ul className="space-y-4 text-xs tracking-widest uppercase">
                <li><a href="#" className="hover:text-gray-400 transition-colors">Envíos</a></li>
                <li><a href="#" className="hover:text-gray-400 transition-colors">Pagos</a></li>
                <li><a href="#" className="hover:text-gray-400 transition-colors">Devoluciones</a></li>
                <li className="pt-6 mt-6 border-t border-gray-800">
                  <a
                    href={whatsappLink(
                      "Hola Nexo (demo Moda)! Quiero más info."
                    )}
                    className="text-gray-400 hover:text-white transition-colors lowercase tracking-normal text-sm"
                  >
                    +54 9 2616 52 7611 · whatsapp
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-gray-600 gap-4">
            <div className="flex space-x-6">
              <button
                onClick={onBackToStudio}
                className="hover:text-white transition-colors"
              >
                ← Volver al estudio Nexo
              </button>
            </div>
            <p>Demo · diseño 100% a medida por Nexo Studio · © 2026</p>
          </div>
        </footer>
      </div>

      {/* Estilos locales */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .ease-out-expo { transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1); }

        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
          padding-left: 100%;
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes hero-scale {
          0% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        .animate-hero-scale {
          animation: hero-scale 3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `,
        }}
      />
    </div>
  );
};
