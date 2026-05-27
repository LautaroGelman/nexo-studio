"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Heart,
  SlidersHorizontal,
  ShoppingBag,
  Briefcase,
  Clock,
  ShieldCheck,
  MessageCircle,
  X,
  Plus,
  Minus,
} from "lucide-react";
import { DemoProps } from "../types";
import { whatsappLink } from "../constants";

type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  img: string;
  tag: string | null;
};

export const CatalogView = ({ onBackToStudio }: DemoProps) => {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<{ id: number; qty: number }[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const categories = ["Todos", "Mobiliario", "Iluminación", "Decoración", "Cocina", "Accesorios"];

  const products: Product[] = [
    { id: 1, title: "Sillón Eames Replica", price: 450, category: "Mobiliario", img: "/sillon-design.jpg", tag: "Best Seller" },
    { id: 2, title: "Lámpara Industrial", price: 120, category: "Iluminación", img: "/lampara-industrial.jpg", tag: "Nuevo" },
    { id: 3, title: "Mesa de Roble", price: 890, category: "Mobiliario", img: "/mesa-desing.jpg", tag: null },
    { id: 4, title: "Florero Cerámica", price: 45, category: "Accesorios", img: "/ceramica-jarron-desing.jpg", tag: "Limited" },
    { id: 5, title: "Set de Tazas", price: 35, category: "Cocina", img: "/set-tazaz-desing.jpg", tag: null },
    { id: 6, title: "Silla Minimalista", price: 180, category: "Mobiliario", img: "/silla-minimalista.jpg", tag: "Sale" },
    { id: 7, title: "Lámpara de Pie", price: 210, category: "Iluminación", img: "/lampara-pie.jpg", tag: null },
    { id: 8, title: "Maceta Geométrica", price: 25, category: "Decoración", img: "/planta-geometrica.jpg", tag: null },
  ];

  const filtered = products.filter(
    (p) =>
      (activeCategory === "Todos" || p.category === activeCategory) &&
      p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const cartCount = cart.reduce((a, b) => a + b.qty, 0);
  const cartItems = cart
    .map((c) => {
      const p = products.find((p) => p.id === c.id);
      return p ? { ...p, qty: c.qty } : null;
    })
    .filter(Boolean) as (Product & { qty: number })[];

  const cartTotal = cartItems.reduce((a, b) => a + b.price * b.qty, 0);

  const addToCart = (id: number) => {
    setCart((cur) => {
      const existing = cur.find((c) => c.id === id);
      if (existing)
        return cur.map((c) => (c.id === id ? { ...c, qty: c.qty + 1 } : c));
      return [...cur, { id, qty: 1 }];
    });
    setCartOpen(true);
  };
  const dec = (id: number) =>
    setCart((cur) =>
      cur
        .map((c) => (c.id === id ? { ...c, qty: c.qty - 1 } : c))
        .filter((c) => c.qty > 0)
    );
  const inc = (id: number) =>
    setCart((cur) => cur.map((c) => (c.id === id ? { ...c, qty: c.qty + 1 } : c)));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20 sm:pt-24 bg-[#FDFBF7] text-gray-900 font-sans selection:bg-orange-200 overflow-x-hidden"
    >
      <div className="bg-gray-900 text-white text-[10px] sm:text-xs text-center py-2 tracking-widest uppercase font-medium px-4">
        Envío gratis en compras superiores a $200 · Devoluciones sin cargo
      </div>

      {/* HERO */}
      <section className="relative min-h-[50vh] md:min-h-[60vh] pt-20 sm:pt-28 pb-12 sm:pb-20 flex items-center bg-gray-100 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/interior-design.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/20" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10 grid md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/90 backdrop-blur-sm p-5 sm:p-8 md:p-12 max-w-xl shadow-xl"
          >
            <span className="text-orange-600 font-bold tracking-widest uppercase text-[10px] sm:text-xs mb-3 sm:mb-4 block">
              Demo Nexo · Nueva Temporada
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-serif text-gray-900 mb-4 sm:mb-6 leading-tight">
              Redefiní tu <br /> Espacio
            </h1>
            <p className="text-gray-600 mb-6 sm:mb-8 text-base sm:text-lg font-light leading-relaxed">
              Descubrí nuestra colección curada de mobiliario y decoración. Piezas
              que cuentan historias y transforman ambientes.
            </p>
            <button className="bg-gray-900 text-white px-6 sm:px-8 py-3 sm:py-4 uppercase text-[10px] sm:text-xs font-bold tracking-widest hover:bg-orange-600 transition-colors w-full sm:w-auto text-center">
              Ver Colección
            </button>
          </motion.div>
        </div>
      </section>

      {/* FILTERS sticky bajo navbar + barra contextual */}
      <div className="sticky z-40 bg-[#FDFBF7]/95 backdrop-blur border-b border-gray-200 py-3 sm:py-4 shadow-sm" style={{ top: "calc(var(--demo-bar-h, 0px) + 56px)" }}>
        <div className="container mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-4">
          <div className="flex overflow-x-auto pb-1 sm:pb-0 gap-4 sm:gap-8 w-full sm:w-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs sm:text-sm tracking-widest uppercase whitespace-nowrap transition-colors relative py-1 ${
                  activeCategory === cat
                    ? "text-orange-600 font-bold"
                    : "text-gray-400 hover:text-gray-900"
                }`}
              >
                {cat}
                {activeCategory === cat && (
                  <motion.div
                    layoutId="cat-underline"
                    className="absolute -bottom-2 left-0 right-0 h-0.5 bg-orange-600"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <div className="relative group flex-1 sm:flex-initial sm:w-64">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-600 transition-colors"
                size={16}
              />
              <input
                type="text"
                placeholder="Buscar productos..."
                aria-label="Buscar productos"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-full pl-10 pr-4 py-2 text-sm outline-none focus:border-orange-600 transition-all font-light"
              />
            </div>
            <button
              aria-label="Filtros avanzados"
              className="p-2 border border-gray-200 rounded-full hover:bg-gray-100 transition-colors text-gray-600"
            >
              <SlidersHorizontal size={18} />
            </button>
            <button
              onClick={() => setCartOpen(true)}
              aria-label={`Abrir carrito (${cartCount} items)`}
              className="relative p-2 border border-gray-200 rounded-full hover:bg-gray-100 transition-colors text-gray-600"
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-orange-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* GRID */}
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-3 sm:gap-x-8 gap-y-6 sm:gap-y-12">
          <AnimatePresence mode="popLayout">
            {filtered.map((prod) => (
              <motion.div
                layout
                key={prod.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-200 mb-3 sm:mb-4">
                  {prod.tag && (
                    <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-20 bg-white/90 backdrop-blur px-2 sm:px-3 py-0.5 sm:py-1 text-[8px] sm:text-[10px] font-bold uppercase tracking-wider shadow-sm">
                      {prod.tag}
                    </div>
                  )}

                  {/* Acciones — siempre visibles en mobile, fade-in en desktop */}
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-20 flex flex-col gap-1.5 sm:gap-2 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 sm:translate-x-4 sm:group-hover:translate-x-0">
                    <button
                      aria-label={`Agregar ${prod.title} a favoritos`}
                      className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-white rounded-full shadow hover:bg-orange-600 hover:text-white transition-colors"
                    >
                      <Heart size={12} />
                    </button>
                    <button
                      onClick={() => addToCart(prod.id)}
                      aria-label={`Agregar ${prod.title} al carrito`}
                      className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-white rounded-full shadow hover:bg-orange-600 hover:text-white transition-colors"
                    >
                      <ShoppingBag size={12} />
                    </button>
                  </div>

                  <img
                    src={prod.img}
                    alt={prod.title}
                    className="absolute inset-0 w-full h-full block object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 sm:translate-y-full sm:group-hover:translate-y-0 transition-transform duration-300">
                    <button
                      onClick={() => addToCart(prod.id)}
                      className="w-full bg-white/95 backdrop-blur-sm text-gray-900 py-2.5 sm:py-3 uppercase text-[9px] sm:text-[10px] font-bold tracking-widest hover:bg-gray-900 hover:text-white transition-colors shadow-lg"
                    >
                      Añadir al Carrito
                    </button>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-start mb-1 gap-1">
                    <h3 className="font-medium text-sm sm:text-lg leading-tight group-hover:text-orange-600 transition-colors">
                      {prod.title}
                    </h3>
                    <span className="font-bold text-gray-900 text-sm sm:text-base shrink-0">
                      ${prod.price}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-400 mb-1 sm:mb-2">
                    {prod.category}
                  </p>
                  {/* Info de confianza siempre visible (antes era solo hover) */}
                  <div className="flex flex-wrap gap-2 text-[10px] sm:text-xs text-gray-500">
                    <span className="inline-flex items-center gap-1">
                      <Clock size={10} /> 48hs
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <ShieldCheck size={10} /> Garantía 12m
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24 text-gray-400">
            <Search size={48} className="mx-auto mb-4 opacity-20" />
            <p className="text-lg">No encontramos productos con esa búsqueda.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("Todos");
              }}
              className="mt-4 underline text-orange-600 text-sm"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>

      {/* FEATURES */}
      <section className="bg-white py-10 sm:py-16 border-t border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
          {[
            { icon: <Briefcase size={24} />, title: "Calidad Premium", desc: "Materiales seleccionados y certificados." },
            { icon: <Clock size={24} />, title: "Envío Rápido", desc: "Entrega garantizada en 48hs." },
            { icon: <ShieldCheck size={24} />, title: "Garantía", desc: "12 meses de garantía directa." },
            { icon: <MessageCircle size={24} />, title: "Soporte 24/7", desc: "Atención personalizada siempre." },
          ].map((feat, i) => (
            <div key={i} className="flex flex-col items-center text-center p-2 sm:p-4">
              <div className="text-orange-600 mb-3 sm:mb-4 bg-orange-50 p-2.5 sm:p-3 rounded-full">
                {feat.icon}
              </div>
              <h4 className="font-bold uppercase text-[10px] sm:text-sm tracking-widest mb-1 sm:mb-2">
                {feat.title}
              </h4>
              <p className="text-gray-500 text-xs sm:text-sm">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="bg-gray-900 text-white py-14 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 text-center max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-serif mb-3 sm:mb-4">
            Únete a nuestra comunidad
          </h2>
          <p className="text-gray-400 mb-6 sm:mb-8 font-light text-sm sm:text-base">
            Recibí las últimas tendencias en diseño, ofertas exclusivas y novedades antes que nadie.
          </p>
          <form className="flex flex-col sm:flex-row gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Tu correo electrónico"
              aria-label="Email"
              className="flex-grow bg-white/10 border border-white/20 text-white px-4 sm:px-6 py-3 sm:py-4 outline-none focus:border-white transition-colors"
            />
            <button className="bg-white text-gray-900 px-6 sm:px-8 py-3 sm:py-4 font-bold uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-colors text-sm">
              Suscribirse
            </button>
          </form>
          <button
            onClick={onBackToStudio}
            className="mt-8 text-gray-400 hover:text-white text-xs uppercase tracking-widest"
          >
            ← Volver al estudio Nexo
          </button>
        </div>
      </section>

      {/* CART DRAWER */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 bg-black/40 z-[70]"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 w-full sm:w-[420px] bg-white z-[71] shadow-2xl flex flex-col"
              aria-label="Carrito"
            >
              <header className="flex items-center justify-between p-5 border-b border-gray-100">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                    Tu carrito · demo
                  </div>
                  <div className="text-lg font-bold text-gray-900">
                    {cartCount} {cartCount === 1 ? "ítem" : "ítems"}
                  </div>
                </div>
                <button
                  aria-label="Cerrar carrito"
                  onClick={() => setCartOpen(false)}
                  className="p-2 text-gray-500 hover:text-black"
                >
                  <X size={20} />
                </button>
              </header>

              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {cartItems.length === 0 && (
                  <div className="text-center text-gray-400 py-16">
                    <ShoppingBag size={36} className="mx-auto opacity-30 mb-3" />
                    <p>Tu carrito está vacío.</p>
                  </div>
                )}
                {cartItems.map((it) => (
                  <div
                    key={it.id}
                    className="flex gap-3 border border-gray-100 rounded-lg p-3"
                  >
                    <img
                      src={it.img}
                      alt=""
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm leading-tight">
                        {it.title}
                      </div>
                      <div className="text-xs text-gray-400 mb-2">{it.category}</div>
                      <div className="flex items-center justify-between">
                        <div className="inline-flex items-center gap-2 border border-gray-200 rounded-full px-2 py-0.5">
                          <button
                            aria-label="Restar"
                            onClick={() => dec(it.id)}
                            className="p-1 text-gray-600 hover:text-black"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-sm font-semibold w-5 text-center">
                            {it.qty}
                          </span>
                          <button
                            aria-label="Sumar"
                            onClick={() => inc(it.id)}
                            className="p-1 text-gray-600 hover:text-black"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <div className="font-bold text-sm">
                          ${it.price * it.qty}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <footer className="border-t border-gray-100 p-5 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-bold text-gray-900">${cartTotal}</span>
                </div>
                <a
                  href={whatsappLink(
                    `Hola! Quiero pedir: ${cartItems
                      .map((c) => `${c.qty}× ${c.title}`)
                      .join(", ")} (demo Nexo)`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block text-center w-full bg-gray-900 text-white font-bold uppercase tracking-widest text-xs py-3.5 hover:bg-orange-600 transition-colors ${
                    cartItems.length === 0 ? "pointer-events-none opacity-40" : ""
                  }`}
                >
                  Finalizar por WhatsApp
                </a>
                <p className="text-[11px] text-gray-400 text-center">
                  Demo · en el sitio final, conecta con tu pasarela (MercadoPago, Stripe…)
                </p>
              </footer>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
