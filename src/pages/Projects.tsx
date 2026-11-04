import { useEffect, useMemo, useState } from "react";
import { getProjects } from "../services/projects.service";
import type { Project } from "../types/project";
import ProjectCard from "../components/ProjectCard";
import { useInView } from "../hooks/useInView";

type StatusFilter = "all" | "en_cours" | "livre" | "a_venir";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [locationFilter, setLocationFilter] = useState("all");

  const headerView = useInView({ threshold: 0.2 });

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
        (statusFilter === "en_cours" && (p.status === "en_cours" || p.status === "finalisation")) ||
        (statusFilter === "livre" && p.status === "livre") ||
        (statusFilter === "a_venir" && (p.status === "a_venir" || p.status === "lancement"));
      const locationMatch = locationFilter === "all" || p.area === locationFilter;
      return statusMatch && locationMatch;
    });
  }, [projects, statusFilter, locationFilter]);

  return (
    <>
      <section ref={headerView.ref} className="pt-40 pb-16 bg-brand-gray/20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className={`reveal-fade-up ${headerView.inView ? "is-visible" : ""}`}>
            <span className="text-brand-gold uppercase tracking-[0.2em] text-xs mb-3 block font-semibold">
              Des résidences d'exception implantées dans les emplacements les plus stratégiques d'Alger
            </span>
            <h1 className="font-serif text-5xl md:text-6xl text-brand-green mb-6">Nos réalisations</h1>
            <p className="text-gray-600 max-w-2xl text-lg leading-relaxed font-light">
              De Hydra à El Biar, en passant par Tixeraïne, PROVECO façonne le paysage urbain d'Alger à travers des
              résidences pensées comme des actifs patrimoniaux durables et des lieux de vie raffinés.
            </p>
          </div>
        </div>
      </section>

      <section className="py-6 border-b border-brand-gray sticky top-20 md:top-24 bg-white/95 backdrop-blur-md z-40 transition-all shadow-xs">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {[
              { id: "all", label: "Tous" },
              { id: "en_cours", label: "En cours" },
              { id: "livre", label: "Livrés" },
              { id: "a_venir", label: "À venir" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id as StatusFilter)}
                className={`px-6 py-2.5 text-xs uppercase tracking-wider font-medium transition-all duration-300 cursor-pointer ${
                  statusFilter === tab.id
                    ? "bg-brand-green text-white shadow-sm"
                    : "border border-brand-gray text-gray-700 hover:border-brand-green hover:text-brand-green"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative">
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="appearance-none bg-white border border-brand-gray px-6 py-2.5 pr-10 text-xs focus:outline-none focus:border-brand-green cursor-pointer uppercase tracking-wider font-medium shadow-xs transition-colors"
            >
              <option value="all">Localisation : Toutes</option>
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

      <section className="py-20 bg-white min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          {loading ? (
            <div className="flex justify-center items-center py-24">
              <div className="w-8 h-8 border-2 border-brand-gold border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-sm uppercase tracking-widest">
                Aucun projet ne correspond à ces filtres.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {filtered.map((project, index) => (
                <div
                  key={project.slug}
                  className="page-enter"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
