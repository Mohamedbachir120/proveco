import { Link } from "react-router-dom";
import type { Project } from "../types/project";
import { STATUS_LABELS } from "../types/project";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link to={`/projects/${project.slug}`} className="group block h-full">
      <div className="relative overflow-hidden aspect-[4/5] mb-5 bg-brand-gray/30 shadow-sm group-hover:shadow-xl transition-all duration-700">
        <img
          src={project.image}
          alt={project.imageAlt}
          title={project.gallery?.[0]?.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 will-change-transform"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <span className="absolute top-4 left-4 backdrop-blur-md bg-white/90 text-brand-green text-[11px] font-semibold uppercase tracking-widest px-3.5 py-1.5 shadow-sm border border-white/50">
          {STATUS_LABELS[project.status]}
        </span>
        <div className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-brand-green text-white flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </div>
      <span className="text-brand-gold uppercase tracking-[0.2em] text-xs mb-1.5 block font-semibold">
        {project.location}
      </span>
      <h3 className="font-serif text-2xl text-brand-green mb-1.5 group-hover:text-brand-gold transition-colors duration-300">
        {project.name}
      </h3>
      <p className="text-gray-500 text-sm font-light">{project.units}</p>
    </Link>
  );
}
