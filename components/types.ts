export type ViewType =
  | "Home"
  | "Corporativa"
  | "Gastronomica"
  | "Catalogo"
  | "Salud"
  | "Industrial"
  | "Moda";

export interface NavItem {
  id: ViewType;
  label: string;
  icon: React.ReactNode;
}

export type StyleCard = {
  id: Exclude<ViewType, "Home">;
  title: string;
  subtitle: string;
  bullets: string[];
  accent: string;
  image: string;
  icon: React.ReactNode;
};
