import {
  Home,
  Building2,
  Utensils,
  Briefcase,
  Gem,
  Cpu,
  ShoppingBag,
  Factory,
} from "lucide-react";
import { NavItem, StyleCard } from "./types";

export const NAV_ITEMS: NavItem[] = [
  { id: "Home", label: "Nosotros", icon: <Home size={18} /> },
  { id: "Corporativa", label: "Corporativa", icon: <Building2 size={18} /> },
  { id: "Gastronomica", label: "Gastronómica", icon: <Utensils size={18} /> },
  { id: "Catalogo", label: "Catálogo", icon: <Briefcase size={18} /> },
  { id: "Salud", label: "Salud/Estética", icon: <Gem size={18} /> },
  { id: "Industrial", label: "Industrial", icon: <Cpu size={18} /> },
];

export const STYLE_CARDS: StyleCard[] = [
  {
    id: "Corporativa",
    title: "Corporativa",
    subtitle: "Autoridad, confianza y performance premium.",
    bullets: ["Hero cinematográfico", "Señales de confianza", "Servicios + FAQ pro"],
    accent: "from-blue-600/20 via-slate-900/10 to-emerald-600/20",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80",
    icon: <Building2 size={18} />,
  },
  {
    id: "Gastronomica",
    title: "Gastronómica",
    subtitle: "Experiencia sensorial, elegante, con vibra de autor.",
    bullets: ["Secciones editorial", "Menú animado", "Galería + CTA reserva"],
    accent: "from-amber-500/20 via-black/10 to-rose-500/15",
    image:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80",
    icon: <Utensils size={18} />,
  },
  {
    id: "Catalogo",
    title: "Catálogo",
    subtitle: "E-commerce moderno: filtro, búsqueda, grid premium.",
    bullets: ["Sticky filters", "Cards hover + quick add", "Newsletter + features"],
    accent: "from-orange-500/20 via-neutral-900/5 to-amber-500/15",
    image:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80",
    icon: <ShoppingBag size={18} />,
  },
  {
    id: "Salud",
    title: "Salud / Estética",
    subtitle: "Minimal, clínico, calmo y ultra confiable.",
    bullets: ["Look premium", "Servicios interactivos", "Testimonios + CTA"],
    accent: "from-emerald-500/20 via-slate-900/5 to-sky-500/15",
    image:
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80",
    icon: <Gem size={18} />,
  },
  {
    id: "Industrial",
    title: "Industrial",
    subtitle: "Fuerza, impacto, ultra legible y contundente.",
    bullets: ["Hero brutalista", "Stats banner", "Marquee clients + CTA"],
    accent: "from-yellow-400/20 via-neutral-900/10 to-orange-500/10",
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80",
    icon: <Factory size={18} />,
  },
];
