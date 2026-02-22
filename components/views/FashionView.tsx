// @ts-nocheck
"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Heart, ArrowRight } from 'lucide-react';

// --- Custom Hooks ---

const useScrollReveal = (options = { threshold: 0.1 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    }, options);
    
    const { current } = domRef;
    if (current) observer.observe(current);
    
    return () => {
      if (current) observer.unobserve(current);
    };
  }, [options]);

  return [domRef, isVisible];
};

// --- Sophisticated Animation Components ---

const TextReveal = ({ text, className = "", as: Component = "div", delay = 0 }) => {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.2 });
  const words = text.split(/(\s+)/);

  return (
    <Component ref={ref} className={className}>
      {words.map((word, i) => {
        if (word.trim() === '') return <span key={i}>{word}</span>;
        return (
          <span key={i} className="inline-block overflow-hidden align-bottom">
            <span
              className={`inline-block transform transition-transform duration-[1.2s] ease-out-expo ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-[120%] opacity-0'
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

const ClipImage = ({ src, alt, className = "", tag }) => {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.15 });
  
  return (
    <div ref={ref} className={`relative overflow-hidden group ${className}`}>
      {tag && (
        <div className={`absolute top-4 left-4 z-10 bg-black text-white text-[10px] font-bold px-3 py-1.5 uppercase tracking-widest transition-opacity duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {tag}
        </div>
      )}
      <div
        className={`w-full h-full transition-all duration-[1.5s] ease-out-expo ${
          isVisible ? 'clip-reveal-active' : 'clip-reveal'
        }`}
      >
        <img 
          src={src} 
          alt={alt} 
          className={`w-full h-full object-contain transform transition-transform duration-[2s] ease-out-expo ${
            isVisible ? 'scale-100' : 'scale-110'
          } group-hover:scale-105`}
        />
      </div>
    </div>
  );
};

// --- Page Components ---

const ProductCard = ({ image, title, price, tag, aspectClass = 'aspect-[3/4]' }) => {
  return (
    <div className="group cursor-pointer flex flex-col">
      <div className={`relative ${aspectClass} mb-5 overflow-hidden bg-[#f5f4f2]`}>
        <ClipImage src={image} alt={title} tag={tag} className="w-full h-full" />
        <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110">
          <Heart size={20} className="text-gray-800 hover:fill-current" />
        </div>
      </div>
      <TextReveal text={title} className="text-sm font-bold uppercase tracking-widest text-gray-900 group-hover:opacity-70 transition-opacity" />
      <div className="flex items-center space-x-3 mt-2 text-xs font-medium tracking-widest">
        <span className="text-gray-600">{price} €</span>
      </div>
    </div>
  );
};

// --- New Horizontal Scroll Section ---
const HorizontalScrollSection = () => {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const { top, height } = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress between 0 and 100% of the scrollable area
      if (top <= 0 && top >= -(height - windowHeight)) {
        const progress = (-top / (height - windowHeight)) * 100;
        setScrollProgress(progress);
      } else if (top > 0) {
        setScrollProgress(0);
      } else {
        setScrollProgress(100);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="sticky-zone fashion-sticky-zone relative h-[300vh] bg-[#050505] text-white"
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        
        {/* Background Title */}
        <div className="absolute top-1/2 left-8 md:left-24 -translate-y-1/2 z-0 opacity-20 pointer-events-none">
          <h2 className="text-[15vw] leading-none font-black tracking-tighter uppercase whitespace-nowrap">
            La Esencia
          </h2>
        </div>

        {/* Sliding Track */}
        {/* We translate up to -100% of the track width PLUS the 100vw of the viewport so it stops exactly at the end */}
        <div 
          className="relative z-10 flex items-center gap-8 md:gap-16 px-8 md:px-24 w-max will-change-transform"
          style={{ transform: `translate3d(calc(-${scrollProgress}% + ${scrollProgress}vw), 0, 0)` }}
        >
          <div className="w-[80vw] md:w-[40vw] flex-shrink-0">
            <h3 className="text-3xl md:text-5xl font-light leading-tight mb-6">
              El arte de la transición diaria.
            </h3>
            <p className="text-gray-400 text-sm tracking-widest leading-loose uppercase">
              Materiales puros. Volúmenes estudiados. Cada puntada es una declaración de intenciones diseñada para fluir contigo.
            </p>
          </div>
          
          {/* moda9: 565×745 (3:4) — tall portrait, narrow */}
          <div className="flex-shrink-0 w-[55vw] md:w-[28vw] bg-[#111] flex items-center justify-center">
            <img src="/moda9.png" className="w-full object-contain grayscale hover:grayscale-0 transition-all duration-1000" style={{aspectRatio:'565/745'}} alt="Detail 1" />
          </div>
          {/* moda10: 561×745 (3:4) — dominant central piece, taller */}
          <div className="flex-shrink-0 w-[70vw] md:w-[40vw] bg-[#0a0a0a] flex items-center justify-center self-stretch">
            <img src="/moda10.png" className="w-full h-full object-contain" style={{aspectRatio:'561/745'}} alt="Detail 2" />
          </div>
          {/* moda11: 555×742 (3:4) — narrow, grayscale accent */}
          <div className="flex-shrink-0 w-[55vw] md:w-[26vw] bg-[#111] flex items-center justify-center">
            <img src="/moda11.png" className="w-full object-contain grayscale hover:grayscale-0 transition-all duration-1000" style={{aspectRatio:'555/742'}} alt="Detail 3" />
          </div>
          
          <div className="w-[80vw] md:w-[30vw] flex-shrink-0 flex justify-center items-center">
             <a href="#" className="group flex flex-col items-center space-y-4">
                <span className="w-16 h-16 rounded-full border border-white/30 flex items-center justify-center group-hover:scale-125 group-hover:bg-white group-hover:text-black transition-all duration-500">
                  <ArrowRight size={20} />
                </span>
                <span className="text-xs uppercase tracking-[0.3em] font-bold">Ver Colección</span>
             </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export const FashionView = ({ onStickyChange }: { onStickyChange?: (v: boolean) => void }) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const anyVisible = entries.some(e => e.isIntersecting && e.intersectionRatio > 0.05);
        onStickyChange?.(anyVisible);
      },
      { threshold: [0.05, 0.95] }
    );
    document.querySelectorAll('.fashion-sticky-zone').forEach(el => observer.observe(el));
    return () => { observer.disconnect(); onStickyChange?.(false); };
  }, [onStickyChange]);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-black selection:text-white">

      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img 
            src="/moda1.png" 
            alt="Hero Fashion" 
            className="w-full h-full object-cover object-top opacity-95 animate-hero-scale"
          />
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white text-center px-4">
            <h2 className="text-xs md:text-sm tracking-[0.4em] uppercase mb-6 animate-fade-in-up" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
              Colección SS26
            </h2>
            <TextReveal 
              text="VÉLURE" 
              as="h1" 
              className="text-7xl md:text-[10rem] font-black tracking-tighter mb-10 leading-none drop-shadow-lg" 
              delay={0.2} 
            />
            <a href="#shop" className="group flex items-center space-x-3 text-xs uppercase tracking-[0.2em] font-bold border border-white/30 bg-white/10 backdrop-blur-sm px-6 py-3 hover:bg-white hover:text-black transition-all duration-500 animate-fade-in-up" style={{ animationDelay: '1s', animationFillMode: 'both' }}>
              <span>Descubrir la Colección</span>
              <ArrowRight size={14} className="transform group-hover:translate-x-2 transition-transform" />
            </a>
          </div>
        </div>
        {/* Transparent spacer */}
        <div className="h-screen bg-transparent relative z-10 pointer-events-none"></div>
      </section>

      {/* Main Content Wrapper */}
      <div className="relative z-20 bg-white">
        
        {/* Marquee Banner */}
        <div className="bg-black text-white py-2 overflow-hidden whitespace-nowrap border-b border-gray-800">
          <div className="animate-marquee inline-block font-bold tracking-[0.2em] text-[10px] uppercase">
            NUEVA CÁPSULA SS26 — ENVÍOS GRATUITOS A PARTIR DE 200€ — PIEZAS DE EDICIÓN LIMITADA — MATERIALES DE PRIMERA SELECCIÓN — ATELIER VÉLURE &nbsp;
          </div>
        </div>

        {/* Selected Products Section — staggered editorial grid */}
        <section id="shop" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 space-y-4 md:space-y-0">
            <TextReveal text="DESTACADOS" as="h2" className="text-3xl md:text-5xl font-black uppercase tracking-tighter" />
            <a href="#" className="flex items-center space-x-2 text-xs uppercase font-bold tracking-widest hover:opacity-60 transition-opacity">
              <span>Ver Todo</span> <ArrowRight size={14} />
            </a>
          </div>

          {/* Three uniform 3:4 portrait cards with staggered vertical offsets */}
          <div className="hidden md:flex items-start gap-8 lg:gap-14">
            <div className="flex-1">
              <ProductCard image="/moda4.png" title="Esencia Oversize" price="165,00" tag="EXCLUSIVO" aspectClass="aspect-[3/4]" />
            </div>
            <div className="flex-1 pt-6">
              <ProductCard image="/moda3.png" title="Winona Traje Atelier" price="409,00" tag="NUEVO" aspectClass="aspect-[3/4]" />
            </div>
            <div className="flex-1 pt-10">
              <ProductCard image="/moda7.png" title="Marigold Pantalón" price="219,00" tag="SS26" aspectClass="aspect-[3/4]" />
            </div>
          </div>
          {/* Mobile: Card Stack Experience */}
          <div className="md:hidden relative w-full pb-20" style={{ height: '220vh' }}>
            <div className="sticky top-[12vh] h-[65vh] w-full px-4 z-10">
              <div className="w-full h-full bg-white shadow-[0_0_40px_rgba(0,0,0,0.1)] rounded-2xl overflow-hidden border border-gray-100 flex flex-col">
                <div className="relative h-[75%] w-full overflow-hidden bg-[#f5f4f2]">
                  <img src="/moda4.png" alt="Esencia Oversize" className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4 bg-black text-white text-[10px] font-bold px-3 py-1.5 uppercase tracking-widest">EXCLUSIVO</div>
                </div>
                <div className="flex-1 flex flex-col justify-center items-center text-center px-4">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-2">Esencia Oversize</h4>
                  <span className="text-gray-600 text-xs font-medium tracking-widest">165,00 €</span>
                </div>
              </div>
            </div>
            <div className="sticky top-[16vh] h-[65vh] w-full px-4 z-20 mt-[40vh]">
              <div className="w-full h-full bg-white shadow-[0_0_40px_rgba(0,0,0,0.1)] rounded-2xl overflow-hidden border border-gray-100 flex flex-col">
                <div className="relative h-[75%] w-full overflow-hidden bg-[#f5f4f2]">
                  <img src="/moda3.png" alt="Winona Traje Atelier" className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4 bg-black text-white text-[10px] font-bold px-3 py-1.5 uppercase tracking-widest">NUEVO</div>
                </div>
                <div className="flex-1 flex flex-col justify-center items-center text-center px-4">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-2">Winona Traje Atelier</h4>
                  <span className="text-gray-600 text-xs font-medium tracking-widest">409,00 €</span>
                </div>
              </div>
            </div>
            <div className="sticky top-[20vh] h-[65vh] w-full px-4 z-30 mt-[40vh]">
              <div className="w-full h-full bg-white shadow-[0_0_40px_rgba(0,0,0,0.1)] rounded-2xl overflow-hidden border border-gray-100 flex flex-col">
                <div className="relative h-[75%] w-full overflow-hidden bg-[#f5f4f2]">
                  <img src="/moda7.png" alt="Marigold Pantalón" className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4 bg-black text-white text-[10px] font-bold px-3 py-1.5 uppercase tracking-widest">SS26</div>
                </div>
                <div className="flex-1 flex flex-col justify-center items-center text-center px-4">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-2">Marigold Pantalón</h4>
                  <span className="text-gray-600 text-xs font-medium tracking-widest">219,00 €</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vertical Sticky Scroll Experience (First Sticky Zone) */}
        <section className="sticky-zone fashion-sticky-zone bg-[#fcfcfc] border-y border-gray-100 relative">

          {/* ── MOBILE: sticky-scroll layout ── */}
          {/* Section must be tall enough for sticky to work */}
          <div className="md:hidden relative" style={{ minHeight: 'calc(100vh + 160vw)' }}>

            {/* Sticky image — pinned at top while content scrolls over it */}
            <div className="sticky top-0 h-[52vh] w-full z-0 overflow-hidden">
              <img
                src="/moda5.png"
                alt="Cápsula de Viaje"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
              {/* Badge */}
              <div className="absolute top-6 left-6">
                <span className="text-white text-[9px] font-bold tracking-[0.35em] uppercase border border-white/50 px-3 py-1.5 backdrop-blur-sm">
                  Enfoque de Categoría
                </span>
              </div>
              {/* Title bottom-left */}
              <div className="absolute bottom-0 left-0 right-0 px-6 pb-6">
                <h3 className="text-white text-[11vw] font-black tracking-tighter leading-none uppercase">Cápsula<br />de Viaje</h3>
              </div>
            </div>

            {/* Scrolling content slides over the sticky image */}
            <div className="relative z-10 bg-white rounded-t-2xl -mt-6 px-6 pt-10 pb-14 flex flex-col gap-10">

              {/* Intro text */}
              <p className="text-[4.2vw] font-light leading-relaxed text-gray-700">
                Diseñado para la transición. Materiales ligeros, volúmenes fluidos y elegancia sin esfuerzo — de lo formal a lo informal.
              </p>

              {/* Product cards — full width stacked */}
              <ProductCard
                image="/moda6.png"
                title="Honolulu Cárdigan"
                price="195,00"
                tag="NUEVO"
                aspectClass="aspect-[3/4]"
              />
              <ProductCard
                image="/moda7.png"
                title="Sirmione Camiseta"
                price="109,00"
                aspectClass="aspect-[3/4]"
              />

              {/* CTA */}
              <div className="pt-6 border-t border-black">
                <a
                  href="#"
                  className="flex justify-between items-center text-sm font-black uppercase tracking-widest text-gray-900 active:opacity-50 transition-opacity"
                >
                  <span>Descubrir la cápsula</span>
                  <ArrowRight size={20} />
                </a>
              </div>

            </div>
          </div>

          {/* ── DESKTOP: sticky split layout ── */}
          <div className="hidden md:flex md:flex-row">
            
            {/* Left: Sticky Image Container */}
            <div className="md:w-1/2 relative">
              <div className="sticky top-0 h-[55vh] md:h-screen w-full overflow-hidden">
                <img 
                  src="/moda5.png" 
                  alt="Categoría Cápsula"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-8 left-6 md:bottom-12 md:left-12">
                  <span className="text-white text-[10px] font-bold tracking-[0.3em] uppercase border border-white/50 px-4 py-2 backdrop-blur-md">
                    Enfoque de Categoría
                  </span>
                  <h3 className="text-white text-3xl md:text-5xl font-black mt-4 md:mt-6 tracking-tighter">Cápsula de Viaje</h3>
                </div>
              </div>
            </div>

            {/* Right: Scrolling Content */}
            <div className="md:w-1/2 p-6 sm:p-10 md:p-24 lg:p-32 space-y-14 md:space-y-24">
              <TextReveal 
                text="Diseñado para la transición. Materiales ligeros, volúmenes fluidos y elegancia sin esfuerzo para tu día a día, de lo formal a lo informal."
                as="h4"
                className="text-2xl md:text-3xl font-light leading-snug text-gray-800"
              />

              {/* moda6 uniform 3:4 */}
              <ProductCard 
                image="/moda6.png"
                title="Honolulu Cárdigan"
                price="195,00"
                tag="NUEVO"
                aspectClass="aspect-[3/4]"
              />
              {/* moda7 uniform 3:4 */}
              <ProductCard 
                image="/moda7.png"
                title="Sirmione Camiseta"
                price="109,00"
                aspectClass="aspect-[3/4]"
              />

              <div className="pt-8 border-t border-black">
                <a href="#" className="group flex justify-between items-center text-lg font-bold uppercase tracking-widest hover:opacity-60 transition-opacity">
                  <span>Descubrir la cápsula</span>
                  <ArrowRight size={24} className="transform group-hover:translate-x-4 transition-transform duration-500" />
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* Parallax Split — text FIXED left, tall image scrolls on right */}
        <section className="relative">

          {/* ── DESKTOP only: sticky split occupies 200vh ── */}
          <div className="hidden md:flex md:flex-row" style={{ minHeight: '200vh' }}>

            {/* LEFT: sticky text */}
            <div className="md:w-1/2 relative">
              <div className="sticky top-0 h-screen flex flex-col justify-center px-14 md:px-20 lg:px-28 bg-white">
                <span className="text-[9px] font-bold tracking-[0.45em] uppercase text-gray-400 mb-6 block">Atelier SS26</span>
                <h3 className="text-xl md:text-2xl font-black tracking-tighter text-gray-900 leading-snug mb-6 uppercase">
                  La materia prima<br />es la primera<br />decisión.
                </h3>
                <p className="text-gray-400 text-xs md:text-sm leading-loose max-w-xs font-light">
                  Cada tela seleccionada a mano. Cada corte pensado para durar. VÉLURE no sigue tendencias — las anticipa con silencio y precisión.
                </p>
                <div className="mt-10">
                  <a href="#" className="group inline-flex items-center gap-3 text-[10px] uppercase font-bold tracking-[0.25em] border-b border-black pb-1 hover:opacity-40 transition-opacity">
                    <span>Nuestra filosofía</span>
                    <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>

            {/* RIGHT: 200vh tall image — scrolls past the fixed text */}
            <div className="md:w-1/2 overflow-hidden" style={{ height: '200vh' }}>
              <img
                src="/moda9.png"
                alt="Atelier VÉLURE"
                className="w-full h-full object-cover object-top"
              />
            </div>

          </div>

          {/* ── MOBILE: Split Screen Sticky (Top Fixed, Bottom Scrolls) ── */}
          <div className="md:hidden relative bg-black" style={{ height: '250vh' }}>
            {/* Top Half - Sticky */}
            <div className="sticky top-0 h-[50vh] w-full bg-black text-white flex flex-col justify-center px-8 z-20 shadow-2xl">
              <span className="text-[9px] font-bold tracking-[0.45em] uppercase text-gray-400 mb-4 block">
                Atelier SS26
              </span>
              <h3 className="text-[7vw] font-black tracking-tighter uppercase leading-[1.1] mb-4">
                La materia prima<br />es la primera<br />decisión.
              </h3>
              <p className="text-gray-400 text-[3.5vw] leading-relaxed font-light">
                VÉLURE no sigue tendencias — las anticipa con silencio y precisión.
              </p>
            </div>
            
            {/* Bottom Half - Scrolling Content */}
            <div className="relative z-10 w-full flex flex-col">
              <div className="h-[50vh] w-full relative">
                <img src="/moda9.png" className="w-full h-full object-cover grayscale" alt="Atelier 1" />
                <div className="absolute inset-0 bg-black/20"></div>
              </div>
              <div className="h-[50vh] w-full relative">
                <img src="/moda10.png" className="w-full h-full object-cover" alt="Atelier 2" />
                <div className="absolute inset-0 bg-black/10"></div>
              </div>
              <div className="h-[50vh] w-full relative">
                <img src="/moda11.png" className="w-full h-full object-cover grayscale" alt="Atelier 3" />
                <div className="absolute inset-0 bg-black/20"></div>
              </div>
              <div className="h-[50vh] w-full bg-white flex flex-col items-center justify-center text-black">
                <span className="w-12 h-12 rounded-full border border-black flex items-center justify-center mb-4 animate-bounce">
                  <ArrowRight size={16} className="transform rotate-90" />
                </span>
                <a href="#" className="text-xs font-bold uppercase tracking-[0.3em] border-b border-black pb-1">
                  Descubrir Atelier
                </a>
              </div>
            </div>
          </div>

        </section>

        {/* Our Story / Parallax Text Reveal */}
        <section className="py-20 md:py-40 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
          <h3 className="text-xs font-bold tracking-[0.4em] uppercase text-gray-400 mb-12">Nuestra Historia</h3>
          <TextReveal 
            text="VÉLURE nace de la pasión por la costura, los materiales preciosos, los volúmenes refinados y el arte intemporal de la sastrería."
            as="p"
            className="text-3xl md:text-5xl font-serif text-gray-900 leading-tight mb-12"
          />
          <p className="text-sm uppercase tracking-widest text-gray-500 font-bold">Desde 2009</p>
        </section>

        {/* NEW: Horizontal Scroll Section */}
        <HorizontalScrollSection />

        {/* Must Have - Surprising Cinematic Images */}
        <section className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-2 hide-scrollbar">
          {/* moda12: 560×745 portrait — shown full inside letterboxed container */}
          <div className="snap-center shrink-0 w-[90vw] md:w-auto group relative overflow-hidden h-[70vh] md:h-screen cursor-pointer bg-[#0d0d0d] flex items-center justify-center mx-4 md:mx-0 rounded-2xl md:rounded-none my-8 md:my-0">
            <img 
              src="/moda12.png" 
              alt="Abrigos Must Have"
              className="h-full w-auto max-w-full object-contain transform scale-100 group-hover:scale-105 transition-transform duration-[2s] ease-out-expo"
            />
            <div className="absolute inset-0"></div>
            <div className="absolute inset-0 bg-black/40 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col items-center justify-center">
              <span className="text-white text-xs font-bold tracking-[0.5em] md:translate-y-10 group-hover:translate-y-0 transition-transform duration-700 ease-out-expo">DESCUBRE</span>
              <h3 className="text-white text-5xl md:text-6xl font-black mt-4 uppercase tracking-tighter md:-translate-y-10 group-hover:translate-y-0 transition-transform duration-700 ease-out-expo delay-75">Abrigos</h3>
            </div>
          </div>
          {/* moda13: 555×743 portrait — full image visible */}
          <div className="snap-center shrink-0 w-[90vw] md:w-auto group relative overflow-hidden h-[70vh] md:h-screen cursor-pointer bg-[#111] flex items-center justify-center mx-4 md:mx-0 rounded-2xl md:rounded-none my-8 md:my-0">
            <img 
              src="/moda13.png" 
              alt="Archivo Must Have"
              className="h-full w-auto max-w-full object-contain transform scale-100 group-hover:scale-105 transition-transform duration-[2s] ease-out-expo"
            />
            <div className="absolute inset-0"></div>
            <div className="absolute inset-0 bg-black/40 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col items-center justify-center">
              <span className="text-white text-xs font-bold tracking-[0.5em] md:translate-y-10 group-hover:translate-y-0 transition-transform duration-700 ease-out-expo">EXPLORA</span>
              <h3 className="text-white text-5xl md:text-6xl font-black mt-4 uppercase tracking-tighter md:-translate-y-10 group-hover:translate-y-0 transition-transform duration-700 ease-out-expo delay-75">Archivo</h3>
            </div>
          </div>
          {/* Spacer for mobile scroll snap to end nicely */}
          <div className="snap-center shrink-0 w-[10vw] md:hidden"></div>
        </section>

        {/* Instagram/Community Grid */}
        <section className="bg-white py-24">
          <div className="max-w-[1600px] mx-auto px-4">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-sm font-bold uppercase tracking-[0.3em]">@VELURE_Official</h2>
              <a href="#" className="text-xs uppercase font-bold tracking-widest hover:text-gray-500 transition-colors">Síguenos →</a>
            </div>
            {/* Varied grid: mix square and portrait for editorial rhythm */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1 items-end">
              {/* moda8: portrait — taller cell */}
              <div className="relative aspect-[3/4] overflow-hidden group cursor-pointer bg-[#f5f4f2]"><img src="/moda8.png" alt="Lookbook 1" className="w-full h-full object-contain group-hover:scale-105 group-hover:opacity-90 transition-all duration-[1.5s] ease-out-expo" /></div>
              {/* moda14: 565×745 portrait */}
              <div className="relative aspect-[565/745] overflow-hidden group cursor-pointer bg-[#f5f4f2]"><img src="/moda14.png" alt="Lookbook 2" className="w-full h-full object-contain group-hover:scale-105 group-hover:opacity-90 transition-all duration-[1.5s] ease-out-expo" /></div>
              {/* moda15: 561×746 portrait */}
              <div className="relative aspect-[561/746] overflow-hidden group cursor-pointer bg-[#f5f4f2]"><img src="/moda15.png" alt="Lookbook 3" className="w-full h-full object-contain group-hover:scale-105 group-hover:opacity-90 transition-all duration-[1.5s] ease-out-expo" /></div>
              {/* moda16: 516×542 ≈ square */}
              <div className="relative aspect-[516/542] overflow-hidden group cursor-pointer bg-[#f5f4f2]"><img src="/moda16.png" alt="Lookbook 4" className="w-full h-full object-contain group-hover:scale-105 group-hover:opacity-90 transition-all duration-[1.5s] ease-out-expo" /></div>
              {/* moda3: portrait */}
              <div className="relative aspect-[3/4] overflow-hidden group cursor-pointer bg-[#f5f4f2]"><img src="/moda3.png" alt="Lookbook 5" className="w-full h-full object-contain group-hover:scale-105 group-hover:opacity-90 transition-all duration-[1.5s] ease-out-expo" /></div>
              {/* moda6: 444×586 ≈ 3:4 */}
              <div className="relative aspect-[444/586] overflow-hidden group cursor-pointer bg-[#f5f4f2]"><img src="/moda6.png" alt="Lookbook 6" className="w-full h-full object-contain group-hover:scale-105 group-hover:opacity-90 transition-all duration-[1.5s] ease-out-expo" /></div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#050505] text-white pt-24 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-16">
            
            {/* Newsletter */}
            <div className="md:col-span-2">
              <h3 className="text-3xl font-black mb-4 tracking-tighter">ÚNETE A VÉLURE</h3>
              <p className="text-gray-400 mb-8 text-sm">Regístrate y obtén un 10% de descuento en tu primera compra.</p>
              <form className="flex border-b border-gray-700 pb-3 max-w-md group">
                <input 
                  type="email" 
                  placeholder="Tu correo electrónico" 
                  className="flex-grow bg-transparent outline-none text-sm placeholder-gray-500 text-white"
                />
                <button type="submit" className="font-bold text-xs tracking-[0.2em] uppercase group-hover:text-gray-400 transition-colors">
                  Enviar
                </button>
              </form>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-bold uppercase tracking-[0.2em] text-[10px] text-gray-500 mb-8">Navegación</h4>
              <ul className="space-y-4 text-xs tracking-widest uppercase">
                <li><a href="#" className="hover:text-gray-400 transition-colors">Quiénes Somos</a></li>
                <li><a href="#" className="hover:text-gray-400 transition-colors">Cápsula de Viaje</a></li>
                <li><a href="#" className="hover:text-gray-400 transition-colors">Contacto</a></li>
                <li><a href="#" className="hover:text-gray-400 transition-colors">Tienda</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-bold uppercase tracking-[0.2em] text-[10px] text-gray-500 mb-8">Soporte</h4>
              <ul className="space-y-4 text-xs tracking-widest uppercase">
                <li><a href="#" className="hover:text-gray-400 transition-colors">Envíos</a></li>
                <li><a href="#" className="hover:text-gray-400 transition-colors">Pagos</a></li>
                <li><a href="#" className="hover:text-gray-400 transition-colors">Devoluciones</a></li>
                <li className="pt-6 mt-6 border-t border-gray-800">
                  <a href="mailto:support@velure.it" className="text-gray-400 hover:text-white transition-colors lowercase tracking-normal text-sm">support@velure.it</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-gray-600">
            <div className="flex space-x-6 mb-4 md:mb-0">
              <a href="#" className="hover:text-white transition-colors">Privacidad</a>
              <a href="#" className="hover:text-white transition-colors">Términos</a>
            </div>
            <p>Copyright © 2026 GRUPPO M.G. S.r.l.</p>
          </div>
        </footer>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        :root { scroll-behavior: smooth; }
        
        /* Advanced Easing Utility */
        .ease-out-expo {
          transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Marquee Animation */
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
          padding-left: 100%;
        }

        /* Fade in up Animation */
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* Hero Image slow scale */
        @keyframes hero-scale {
          0% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        .animate-hero-scale {
          animation: hero-scale 3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

          /* Hide Scrollbar */
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
      `}} />
    </div>
  );
}