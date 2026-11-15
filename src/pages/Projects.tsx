import { useEffect, useMemo, useState } from "react";
import { getProjects } from "../services/projects.service";
import type { Project } from "../types/project";
import ProjectCard from "../components/ProjectCard";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { EASE, Eyebrow, Reveal, SplitLines } from "../components/motion";

type StatusFilter = "all" | "en_cours" | "livre" | "a_venir";

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
        (statusFilter === "en_cours" && (p.status === "en_cours" || p.status === "finalisation")) ||
        (statusFilter === "livre" && p.status === "livre") ||
        (statusFilter === "a_venir" && (p.status === "a_venir" || p.status === "lancement"));
      const locationMatch = locationFilter === "all" || p.area === locationFilter;
      return statusMatch && locationMatch;
    });
  }, [projects, statusFilter, locationFilter]);

  return (
    <>
      <section className="relative pt-44 pb-20 md:pb-28 bg-brand-gray/30 overflow-hidden">
        {/* Slow drifting strip of project photos behind the header */}
        {projects.length > 0 && (
          <div aria-hidden className="absolute inset-y-0 right-0 w-full md:w-[40%] opacity-[0.12] md:opacity-100 pointer-events-none">
            <motion.div
              className="flex gap-4 h-full py-28"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 60, ease: "linear", repeat: Infinity }}
            >
              {[...projects, ...projects].map((p, i) => (
                <img key={i} src={p.image} alt="" className="h-full w-64 object-cover flex-shrink-0" />
              ))}
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#f6f7f7] via-[#f6f7f7]/70 to-[#f6f7f7]/10" />
          </div>
        )}
        <div className="relative max-w-7xl mx-auto px-6 sm:px-12">
          <div className="max-w-xl">
            <Eyebrow className="mb-6">
              Des résidences d'exception implantées dans les emplacements les plus stratégiques d'Alger
            </Eyebrow>
            <SplitLines
              as="h1"
              immediate
              delay={0.9}
              className="font-serif text-5xl md:text-7xl text-brand-green mb-8"
              lines={["Nos réalisations"]}
            />
            <Reveal delay={1.1}>
              <p className="text-gray-600 text-lg leading-relaxed font-light">
                De Hydra à El Biar, en passant par Tixeraïne, PROVECO façonne le paysage urbain d'Alger à travers des
                résidences pensées comme des actifs patrimoniaux durables et des lieux de vie raffinés.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-5 border-b border-brand-gray sticky top-0 bg-white/90 backdrop-blur-xl z-40">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 flex flex-wrap gap-4 items-center justify-between">
          <LayoutGroup id="status-filter">
          <div className="flex flex-wrap gap-1">
            {[
              { id: "all", label: "Tous" },
              { id: "en_cours", label: "En cours" },
              { id: "livre", label: "Livrés" },
              { id: "a_venir", label: "À venir" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id as StatusFilter)}
                className={`relative px-6 py-2.5 text-xs uppercase tracking-[0.18em] font-medium transition-colors duration-500 cursor-pointer ${
                  statusFilter === tab.id ? "text-white" : "text-gray-700 hover:text-brand-green"
                }`}
              >
                {statusFilter === tab.id && (
                  <motion.span
                    layoutId="status-pill"
                    className="absolute inset-0 bg-brand-green"
                    transition={{ duration: 0.6, ease: EASE }}
                  />
                )}
                <span className="relative">{tab.label}</span>
              </button>
            ))}
          </div>
          </LayoutGroup>

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

      <section className="py-20 md:py-28 bg-white min-h-[50vh]">
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
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16 group/grid">
              <AnimatePresence mode="popLayout">
                {filtered.map((project, index) => (
                  <motion.div
                    key={project.slug}
                    layout
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.7, ease: EASE }}
                    className={`transition-opacity duration-500 group-hover/grid:opacity-60 hover:!opacity-100 ${
                      index % 3 === 1 ? "lg:mt-24" : ""
                    }`}
                  >
                    <ProjectCard project={project} variant={index % 3 === 1 ? "tall" : "default"} delay={(index % 3) * 0.12} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
