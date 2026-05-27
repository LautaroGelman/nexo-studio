import {
  Home,
  Building2,
  Utensils,
  Briefcase,
  Gem,
  Shirt,
} from "lucide-react";
import { NavItem, StyleCard } from "./types";

/** Número de WhatsApp único — se usa en toda la app. */
export const WHATSAPP_NUMBER = "5492616527611";
export const WHATSAPP_DEFAULT_MSG =
  "Hola Nexo! Vi el sitio y me interesa hablar de un proyecto.";

export const whatsappLink = (msg = WHATSAPP_DEFAULT_MSG) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

export const NAV_ITEMS: NavItem[] = [
  { id: "Home", label: "Estudio", icon: <Home size={18} /> },
  { id: "Corporativa", label: "Corporativa", icon: <Building2 size={18} /> },
  { id: "Gastronomica", label: "Gastronómica", icon: <Utensils size={18} /> },
  { id: "Catalogo", label: "Catálogo / Shop", icon: <Briefcase size={18} /> },
  { id: "Salud", label: "Salud / Estética", icon: <Gem size={18} /> },
  { id: "Moda", label: "Moda / Fashion", icon: <Shirt size={18} /> },
];

/**
 * Style cards — sin precios. La conversión la hacemos por contacto.
 * Las descripciones se reescribieron para no usar bullets visuales
 * dentro de cada card (limpia ruido).
 */
export const STYLE_CARDS: StyleCard[] = [
  {
    id: "Corporativa",
    title: "Corporativa",
    subtitle: "Autoridad, confianza y performance premium.",
    bullets: ["Hero cinematográfico", "Señales de confianza", "Servicios + FAQ"],
    accent: "from-blue-600/20 via-slate-900/10 to-emerald-600/20",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80",
    icon: <Building2 size={18} />,
  },
  {
    id: "Gastronomica",
    title: "Gastronómica",
    subtitle: "Experiencia sensorial, elegante, con vibra de autor.",
    bullets: ["Diseño editorial", "Menú animado", "Reserva directa"],
    accent: "from-amber-500/20 via-black/10 to-rose-500/15",
    image:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80",
    icon: <Utensils size={18} />,
  },
  {
    id: "Catalogo",
    title: "Catálogo / Shop",
    subtitle: "E-commerce moderno: filtro, búsqueda, grid premium.",
    bullets: ["Filtros vivos", "Quick add", "Carrito persistente"],
    accent: "from-orange-500/20 via-neutral-900/5 to-amber-500/15",
    image: "/interior-design.jpg",
    icon: <Briefcase size={18} />,
  },
  {
    id: "Salud",
    title: "Salud / Estética",
    subtitle: "Minimal, clínico, calmo y ultra confiable.",
    bullets: ["Look médico premium", "Equipo visible", "Reserva con un toque"],
    accent: "from-emerald-500/20 via-slate-900/5 to-sky-500/15",
    image:
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80",
    icon: <Gem size={18} />,
  },
  {
    id: "Moda",
    title: "Moda / Fashion",
    subtitle: "Editorial, cinematográfica, elegante, con identidad propia.",
    bullets: ["Hero a pantalla", "Scroll narrativo", "Grid de comunidad"],
    accent: "from-rose-400/20 via-neutral-900/5 to-pink-300/20",
    image: "/moda1.png",
    icon: <Shirt size={18} />,
  },
];
