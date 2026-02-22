import {
  Home,
  Building2,
  Utensils,
  Briefcase,
  Gem,
  ShoppingBag,
  Shirt,
} from "lucide-react";
import { NavItem, StyleCard } from "./types";

export const NAV_ITEMS: NavItem[] = [
  { id: "Home", label: "Nosotros", icon: <Home size={18} /> },
  { id: "Corporativa", label: "Corporativa", icon: <Building2 size={18} /> },
  { id: "Gastronomica", label: "Gastronómica", icon: <Utensils size={18} /> },
  { id: "Catalogo", label: "Catálogo", icon: <Briefcase size={18} /> },
  { id: "Salud", label: "Salud/Estética", icon: <Gem size={18} /> },
  { id: "Moda", label: "Moda / Fashion", icon: <Shirt size={18} /> },
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
    image: "/interior-design.jpg",
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
    id: "Moda",
    title: "Moda / Fashion",
    subtitle: "Editorial, cinematic, elegante y con identidad propia.",
    bullets: ["Hero paralax full-screen", "Catálogo con scroll horizontal", "Footer newsletter + comunidad"],
    accent: "from-rose-400/20 via-neutral-900/5 to-pink-300/20",
    image: "/moda1.png",
    icon: <Shirt size={18} />,
  },
];
