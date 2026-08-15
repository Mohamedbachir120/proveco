import { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { getProjectBySlug } from "../services/projects.service";
import type { Project } from "../types/project";
import { STATUS_LABELS } from "../types/project";
import HeroGallery from "../components/HeroGalery";

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null | undefined>(undefined);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!slug) return;
    setProject(undefined);
    getProjectBySlug(slug).then((p) => setProject(p ?? null));
  }, [slug]);

  // Page <title> and meta description now come from the SEO fields on each
  // project instead of staying on whatever the previous page set.
  useEffect(() => {
    if (!project) return;
    document.title = project.title;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", project.metaDescription);
  }, [project]);

  const gallery = project?.gallery ?? [];

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const showPrev = useCallback(
    () => setLightboxIndex((i) => (i === null ? null : (i - 1 + gallery.length) % gallery.length)),
    [gallery.length]
  );
  const showNext = useCallback(
    () => setLightboxIndex((i) => (i === null ? null : (i + 1) % gallery.length)),
    [gallery.length]
  );

  // Lock body scroll + wire up keyboard nav while the lightbox is open
  useEffect(() => {
    if (lightboxIndex === null) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [lightboxIndex, closeLightbox, showPrev, showNext]);

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
        {project.gallery && project.gallery.length > 0 ? (
          <HeroGallery images={project.gallery} />
        ) : (
          <div className="absolute inset-0 z-0">
            <img src={project.image} alt={project.imageAlt} className="w-full h-full object-cover" />
            <div className="absolute inset-0 image-overlay" />
          </div>
        )}
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

      {gallery.length > 0 && (
        <section className="py-20 bg-brand-gray/10">
          <div className="max-w-7xl mx-auto px-6 sm:px-12">
            <span className="text-brand-gold uppercase tracking-[0.3em] text-xs mb-4 block">Galerie</span>
            <h2 className="font-serif text-3xl text-brand-green mb-10">{project.name} en images</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {gallery.map((img, i) => (
                <figure
                  key={i}
                  className="group overflow-hidden cursor-zoom-in"
                  onClick={() => setLightboxIndex(i)}
                >
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img
                      src={img.src}
                      alt={img.alt}
                      title={img.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0a7.5 7.5 0 10-10.6 0 7.5 7.5 0 0010.6 0zM10.5 7.5v6m-3-3h6" />
                      </svg>
                    </div>
                  </div>
                  {img.caption && (
                    <figcaption className="text-gray-500 text-sm font-light mt-3">{img.caption}</figcaption>
                  )}
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

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

      {lightboxIndex !== null && (
        <Lightbox
          images={gallery}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={showPrev}
          onNext={showNext}
        />
      )}
    </>
  );
}

function Lightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  images: NonNullable<Project["gallery"]>;
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  // Mounts closed, then flips to open on next frame so the CSS transition runs
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const raf = requestAnimationFrame(() => setIsOpen(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const img = images[index];

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(onClose, 250); // let the fade-out finish before unmounting
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center px-4 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose}
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

      <button
        onClick={handleClose}
        aria-label="Fermer"
        className="absolute top-6 right-6 z-10 text-white/70 hover:text-white transition-colors"
      >
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            aria-label="Image précédente"
            className="absolute left-4 sm:left-8 z-10 text-white/70 hover:text-white transition-colors"
          >
            <svg className="w-9 h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            aria-label="Image suivante"
            className="absolute right-4 sm:right-8 z-10 text-white/70 hover:text-white transition-colors"
          >
            <svg className="w-9 h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      <figure
        className={`relative z-10 max-w-5xl w-full transition-all duration-300 ease-out ${
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          key={img.src}
          src={img.src}
          alt={img.alt}
          className="w-full max-h-[80vh] object-contain animate-[fadeIn_0.3s_ease-out]"
        />
        {img.caption && (
          <figcaption className="text-white/70 text-sm font-light mt-4 text-center">{img.caption}</figcaption>
        )}
        {images.length > 1 && (
          <p className="text-white/40 text-xs text-center mt-2 tracking-widest uppercase">
            {index + 1} / {images.length}
          </p>
        )}
      </figure>
    </div>
  );
}