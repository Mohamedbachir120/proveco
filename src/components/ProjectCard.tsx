import { Link } from "react-router-dom";
import type { Project } from "../types/project";
import { STATUS_LABELS } from "../types/project";

interface ProjectCardProps {
  project: Project;
}

const BADGE_STYLES: Record<Project["status"], string> = {
  en_cours: "bg-brand-gold text-white",
  finalisation: "bg-brand-gold text-white",
  lancement: "bg-brand-gold text-white",
  livre: "bg-brand-green text-white",
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link to={`/projects/${project.slug}`} className="group block">
      <div className="overflow-hidden aspect-[4/5] relative bg-gray-200">
        <img
          src={project.image}
          alt={project.name}
          loading="lazy"
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
        />
        <div
          className={`absolute top-4 right-4 text-[10px] px-3 py-1 uppercase tracking-[0.2em] font-bold ${BADGE_STYLES[project.status]}`}
        >
          {STATUS_LABELS[project.status]}
        </div>
      </div>
      <div className="mt-8">
        <h3 className="font-serif text-2xl text-brand-green group-hover:text-brand-gold transition-colors">
          {project.name}
        </h3>
        <p className="text-gray-400 text-sm uppercase tracking-widest mt-2">
          {project.location} • {project.units}
        </p>
      </div>
    </Link>
  );
}
