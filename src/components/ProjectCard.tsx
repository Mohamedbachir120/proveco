import { Link } from "react-router-dom";
import type { Project } from "../types/project";
import { STATUS_LABELS } from "../types/project";
import { CurtainImage } from "./motion";

interface ProjectCardProps {
  project: Project;
  /** "large" = feature card in the home collage; "wide"/"tall" for the projects mosaic */
  variant?: "default" | "large" | "wide" | "tall";
  delay?: number;
}

const ASPECT: Record<NonNullable<ProjectCardProps["variant"]>, string> = {
  default: "aspect-[4/5]",
  large: "aspect-[4/5] md:aspect-auto md:h-full md:min-h-[640px]",
  wide: "aspect-[4/5] md:aspect-[16/10]",
  tall: "aspect-[4/5] md:aspect-[3/4]",
};

export default function ProjectCard({ project, variant = "default", delay = 0 }: ProjectCardProps) {
  const large = variant === "large";
  return (
    <Link
      to={`/projects/${project.slug}`}
      className={`group block h-full ${large ? "flex flex-col" : ""}`}
      data-cursor="media"
    >
      <div className={`relative overflow-hidden mb-5 bg-brand-gray/30 ${ASPECT[variant]} ${large ? "md:flex-1" : ""}`}>
        <CurtainImage
          src={project.image}
          alt={project.imageAlt}
          title={project.gallery?.[0]?.title}
          className="absolute inset-0"
          imgClassName="transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
          parallax={6}
          delay={delay}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-green/70 via-brand-green/0 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
        <span className="absolute top-5 left-5 backdrop-blur-md bg-white/90 text-brand-green text-[11px] font-semibold uppercase tracking-widest px-3.5 py-1.5 transition-transform duration-500 group-hover:translate-x-1">
          {STATUS_LABELS[project.status]}
        </span>
        <div className="absolute bottom-5 right-5 w-12 h-12 rounded-full border border-white/60 text-white flex items-center justify-center backdrop-blur-sm scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 group-hover:bg-brand-gold group-hover:border-brand-gold transition-all duration-500">
          <svg className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </div>
      <span className="text-brand-gold uppercase tracking-[0.2em] text-xs mb-1.5 block font-semibold">
        {project.location}
      </span>
      <h3
        className={`font-serif text-brand-green mb-1.5 transition-colors duration-500 group-hover:text-brand-gold ${
          large ? "text-3xl md:text-4xl" : "text-2xl"
        }`}
      >
        {project.name}
      </h3>
      <p className="text-gray-500 text-sm font-light">{project.units}</p>
    </Link>
  );
}
