// I don't have your original ProjectCard.tsx, so this is a reconstruction
// using the same design tokens (brand-green/brand-gold/brand-gray, font-serif)
// visible in Projects.tsx and ProjectDetail.tsx. Diff it against your real
// file and keep whatever it already does beyond image alt handling — the
// only functional change needed for the SEO pass is using project.imageAlt
// instead of a generic/missing alt.

import { Link } from "react-router-dom";
import type { Project } from "../types/project";
import { STATUS_LABELS } from "../types/project";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link to={`/projects/${project.slug}`} className="group block">
      <div className="relative overflow-hidden aspect-[4/5] mb-6">
        <img
          src={project.image}
          alt={project.imageAlt}
          title={project.gallery?.[0]?.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <span className="absolute top-4 left-4 bg-white/90 text-brand-green text-xs uppercase tracking-widest px-3 py-1">
          {STATUS_LABELS[project.status]}
        </span>
      </div>
      <span className="text-brand-gold uppercase tracking-widest text-xs mb-2 block">{project.location}</span>
      <h3 className="font-serif text-2xl text-brand-green mb-1 group-hover:text-brand-gold transition-colors">
        {project.name}
      </h3>
      <p className="text-gray-500 text-sm font-light">{project.units}</p>
    </Link>
  );
}