import { useEffect, useMemo, useState } from "react";
import { getProjects } from "../services/projects.service";
import type { Project, ProjectStatus } from "../types/project";
import ProjectCard from "../components/ProjectCard";

type StatusFilter = "all" | ProjectStatus;

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [locationFilter, setLocationFilter] = useState("all");

  useEffect(() => {
    getProjects()
      .then(setProjects)
      .finally(() => setLoading(false));
  }, []);

  const locations = useMemo(
    () => Array.from(new Set(projects.map((p) => p.area))),
    [projects]
  );

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const statusMatch =
        statusFilter === "all" ||
        (statusFilter === "en_cours" && (p.status === "en_cours" || p.status === "finalisation" || p.status === "lancement")) ||
        p.status === statusFilter;
      const locationMatch = locationFilter === "all" || p.area === locationFilter;
      return statusMatch && locationMatch;
    });
  }, [projects, statusFilter, locationFilter]);

  return (
    <>
      <section className="pt-40 pb-16 bg-brand-gray/20">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <span className="text-brand-gold uppercase tracking-[0.3em] text-xs mb-4 block">Portfolio Immobilier</span>
          <h1 className="font-serif text-5xl md:text-6xl text-brand-green mb-6">Nos réalisations d'exception</h1>
          <p className="text-gray-600 max-w-2xl text-lg leading-relaxed">
            De Hydra à El Biar, PROVECO façonne le paysage urbain d'Alger à travers des résidences pensées comme
            des actifs patrimoniaux durables et des lieux de vie raffinés.
          </p>
        </div>
      </section>

      <section className="py-6 border-b border-brand-gray sticky top-24 bg-white z-40">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setStatusFilter("all")}
              className={`px-6 py-2 text-xs uppercase tracking-wider transition-colors ${
                statusFilter === "all" ? "bg-brand-green text-white" : "border border-brand-gray hover:border-brand-green"
              }`}
            >
              Tous
            </button>
            <button
              onClick={() => setStatusFilter("en_cours")}
              className={`px-6 py-2 text-xs uppercase tracking-wider transition-colors ${
                statusFilter === "en_cours" ? "bg-brand-green text-white" : "border border-brand-gray hover:border-brand-green"
              }`}
            >
              En cours
            </button>
            <button
              onClick={() => setStatusFilter("livre")}
              className={`px-6 py-2 text-xs uppercase tracking-wider transition-colors ${
                statusFilter === "livre" ? "bg-brand-green text-white" : "border border-brand-gray hover:border-brand-green"
              }`}
            >
              Livrés
            </button>
          </div>
          <div className="relative">
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="appearance-none bg-white border border-brand-gray px-6 py-2 pr-10 text-sm focus:outline-none focus:border-brand-green cursor-pointer uppercase tracking-wider"
            >
              <option value="all">Toutes les localisations</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-brand-green">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white min-h-[40vh]">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          {loading ? (
            <p className="text-gray-400 text-sm uppercase tracking-widest">Chargement…</p>
          ) : filtered.length === 0 ? (
            <p className="text-gray-400 text-sm uppercase tracking-widest">Aucun projet ne correspond à ces filtres.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {filtered.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
