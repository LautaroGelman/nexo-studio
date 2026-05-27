export type ViewType =
  | "Home"
  | "Corporativa"
  | "Gastronomica"
  | "Catalogo"
  | "Salud"
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

/** Props que cada demo recibe del shell de Nexo. */
export interface DemoProps {
  /** Vuelve al Home del estudio (lo provee page.tsx). */
  onBackToStudio: () => void;
  /** Salta a otra demo. */
  onSwitchDemo: (v: ViewType) => void;
}
