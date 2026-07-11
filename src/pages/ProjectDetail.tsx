import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProjectBySlug } from "../services/projects.service";
import type { Project } from "../types/project";
import { STATUS_LABELS } from "../types/project";

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null | undefined>(undefined);

  useEffect(() => {
    if (!slug) return;
    setProject(undefined);
    getProjectBySlug(slug).then((p) => setProject(p ?? null));
  }, [slug]);

  if (project === undefined) {
    return (
      <section className="pt-40 pb-24 max-w-7xl mx-auto px-6 sm:px-12">
        <p className="text-gray-400 text-sm uppercase tracking-widest">Chargement…</p>
      </section>
    );
  }

  if (project === null) {
    return (
      <section className="pt-40 pb-24 max-w-7xl mx-auto px-6 sm:px-12 text-center">
        <h1 className="font-serif text-3xl text-brand-green mb-4">Projet introuvable</h1>
        <Link to="/projects" className="text-brand-gold hover:text-brand-green transition-colors">
          &larr; Retour au portfolio
        </Link>
      </section>
    );
  }

  return (
    <>
      <header className="relative h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 image-overlay" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 pb-16 w-full">
          <span className="text-brand-gold uppercase tracking-[0.3em] text-xs mb-4 block">
            {STATUS_LABELS[project.status]} • {project.location}
          </span>
          <h1 className="font-serif text-4xl md:text-6xl text-white leading-tight max-w-3xl">
            {project.heroTagline ?? project.name}
          </h1>
        </div>
      </header>

      <section className="py-16 border-b border-brand-gray">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 flex flex-wrap gap-x-16 gap-y-6">
          <div>
            <span className="text-brand-gold uppercase tracking-widest text-xs block mb-1">Localisation</span>
            <span className="font-serif text-lg text-brand-green">{project.location}</span>
          </div>
          <div>
            <span className="text-brand-gold uppercase tracking-widest text-xs block mb-1">Programme</span>
            <span className="font-serif text-lg text-brand-green">{project.units}</span>
          </div>
          {project.deliveredRange && (
            <div>
              <span className="text-brand-gold uppercase tracking-widest text-xs block mb-1">Calendrier</span>
              <span className="font-serif text-lg text-brand-green">{project.deliveredRange}</span>
            </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 sm:px-12 space-y-16">
          {project.sections?.map((section, i) => {
            const Heading = section.level === "h2" ? "h2" : "h3";
            return (
              <div key={i}>
                <Heading
                  className={
                    section.level === "h2"
                      ? "font-serif text-3xl text-brand-green mb-6"
                      : "font-serif text-2xl text-brand-green mb-4"
                  }
                >
                  {section.heading}
                </Heading>
                {section.paragraphs?.map((p, j) => (
                  <p key={j} className="text-gray-500 leading-relaxed mb-4 font-light">
                    {p}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="space-y-2 mt-4">
                    {section.bullets.map((b, k) => (
                      <li key={k} className="flex items-start text-gray-600 font-light">
                        <span className="text-brand-gold mr-3">—</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-16 bg-brand-gray/20 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-serif text-3xl text-brand-green mb-4">Intéressé par {project.name} ?</h2>
          <p className="text-gray-500 mb-8 font-light">
            Notre équipe vous accompagne à chaque étape, de la première visite à la signature.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-brand-green text-white px-8 py-4 uppercase tracking-widest text-sm hover:bg-brand-gold transition-colors duration-300"
          >
            Échanger avec un conseiller
          </Link>
        </div>
      </section>
    </>
  );
}
