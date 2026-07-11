export type ProjectStatus = "en_cours" | "livre" | "finalisation" | "lancement";

export interface Project {
  slug: string;
  name: string;
  location: string;
  area: string;
  units: string;
  status: ProjectStatus;
  image: string;
  title?: string;
  metaDescription?: string;
  heroTagline?: string;
  sections?: ProjectSection[];
  deliveredRange?: string;
}

export interface ProjectSection {
  heading: string;
  level: "h2" | "h3";
  paragraphs?: string[];
  bullets?: string[];
}

export const STATUS_LABELS: Record<ProjectStatus, string> = {
  en_cours: "En cours",
  livre: "Livré",
  finalisation: "Finalisation",
  lancement: "Lancement",
};
