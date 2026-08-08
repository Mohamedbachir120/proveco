export type ProjectStatus = "en_cours" | "livre" | "finalisation" | "lancement";
// Merge these additions into your existing src/types/project.ts.
// I don't have your current file, so don't overwrite it blindly —
// keep your existing ProjectStatus / STATUS_LABELS if they already exist,
// and just add ProjectImage + the `gallery` / `imageAlt` fields to Project.

export interface ProjectImage {
  /** Imported asset (Vite will turn this into a hashed URL at build time) */
  src: string;
  /** Required — this is the whole point of the SEO pass, never leave it empty */
  alt: string;
  /** Used as the <img title="..."> and easy to reuse as a figure caption */
  title?: string;
  /** Optional caption shown under the image in the gallery */
  caption?: string;
}

export interface ProjectSection {
  heading: string;
  level: "h2" | "h3";
  paragraphs?: string[];
  bullets?: string[];
}

export interface Project {
  slug: string;
  name: string;
  location: string;
  area: string;
  units: string;
  status: ProjectStatus;
  /** Cover image shown on the card + hero — keep this as gallery[0].src */
  image: string;
  /** Alt text for the cover image — was missing before, now required */
  imageAlt: string;
  /** Full SEO-optimized image set for the detail page gallery */
  gallery?: ProjectImage[];
  title: string;
  metaDescription: string;
  heroTagline?: string;
  deliveredRange?: string;
  sections: ProjectSection[];
}
export const STATUS_LABELS: Record<ProjectStatus, string> = {
  en_cours: "En cours",
  livre: "Livré",
  finalisation: "Finalisation",
  lancement: "Lancement",
};
