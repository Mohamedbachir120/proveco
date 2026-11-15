import { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { getProjectBySlug } from "../services/projects.service";
import type { Project } from "../types/project";
import { STATUS_LABELS } from "../types/project";
import HeroGallery from "../components/HeroGalery";
import { motion } from "motion/react";
import { CurtainImage, EASE, Eyebrow, Reveal, SplitLines, Stagger, StaggerItem } from "../components/motion";
import { setScrollLocked } from "../components/smoothScroll";

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
    setScrollLocked(true);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      setScrollLocked(false);
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
      <header className="relative h-[100svh] min-h-[620px] flex items-end overflow-hidden">
        {project.gallery && project.gallery.length > 0 ? (
          <HeroGallery images={project.gallery} />
        ) : (
          <div className="absolute inset-0 z-0">
            <img src={project.image} alt={project.imageAlt} className="w-full h-full object-cover animate-hero-cinematic" />
            <div className="absolute inset-0 hero-vignette" />
          </div>
        )}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 pb-40 md:pb-44 w-full pointer-events-none">
          <motion.div
            className="flex items-center gap-4 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <motion.span
              className="block h-px w-12 bg-brand-gold origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.9, duration: 1, ease: EASE }}
            />
            <span className="text-brand-gold uppercase tracking-[0.3em] text-xs">
              {STATUS_LABELS[project.status]} • {project.location}
            </span>
          </motion.div>
          <SplitLines
            as="h1"
            immediate
            delay={1}
            className="font-serif text-4xl md:text-7xl text-white leading-[1.05] max-w-4xl"
            lines={[project.heroTagline ?? project.name]}
          />
        </div>
      </header>

      {/* Key facts: floating bar overlapping the hero */}
      <section className="relative z-20 -mt-24 px-6 sm:px-12">
        <motion.div
          className="max-w-7xl mx-auto bg-white shadow-[0_40px_80px_-40px_rgba(8,72,81,0.45)] grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-brand-gray"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 1.1, ease: EASE }}
        >
          <div className="p-8 md:p-10">
            <span className="text-brand-gold uppercase tracking-[0.25em] text-[11px] block mb-2">Localisation</span>
            <span className="font-serif text-xl text-brand-green">{project.location}</span>
          </div>
          <div className="p-8 md:p-10">
            <span className="text-brand-gold uppercase tracking-[0.25em] text-[11px] block mb-2">Programme</span>
            <span className="font-serif text-xl text-brand-green">{project.units}</span>
          </div>
          {project.deliveredRange && (
            <div className="p-8 md:p-10">
              <span className="text-brand-gold uppercase tracking-[0.25em] text-[11px] block mb-2">Calendrier</span>
              <span className="font-serif text-xl text-brand-green">{project.deliveredRange}</span>
            </div>
          )}
        </motion.div>
      </section>

      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-5xl mx-auto px-6 sm:px-12 space-y-20">
          {project.sections?.map((section, i) => {
            const Heading = section.level === "h2" ? "h2" : "h3";
            return (
              <div key={i} className="grid md:grid-cols-12 gap-6 md:gap-12">
                <div className="md:col-span-5">
                  <div className="md:sticky md:top-32">
                    <Reveal>
                      <span className="font-serif text-brand-gold text-sm block mb-3">{String(i + 1).padStart(2, "0")}</span>
                      <Heading
                        className={
                          section.level === "h2"
                            ? "font-serif text-3xl md:text-4xl text-brand-green leading-tight"
                            : "font-serif text-2xl md:text-3xl text-brand-green leading-tight"
                        }
                      >
                        {section.heading}
                      </Heading>
                    </Reveal>
                  </div>
                </div>
                <Reveal className="md:col-span-7" delay={0.12}>
                  {section.paragraphs?.map((p, j) => (
                    <p key={j} className="text-gray-500 leading-relaxed mb-5 font-light text-base md:text-lg">
                      {p}
                    </p>
                  ))}
                  {section.bullets && (
                    <Stagger className="mt-4 border-t border-brand-gray">
                      {section.bullets.map((b, k) => (
                        <StaggerItem key={k} className="flex items-start text-gray-600 font-light py-4 border-b border-brand-gray">
                          <span className="text-brand-gold mr-4">—</span>
                          {b}
                        </StaggerItem>
                      ))}
                    </Stagger>
                  )}
                </Reveal>
              </div>
            );
          })}
        </div>
      </section>

      {gallery.length > 0 && (
        <section className="py-24 md:py-32 bg-brand-gray/30">
          <div className="max-w-7xl mx-auto px-6 sm:px-12">
            <Eyebrow className="mb-6">Galerie</Eyebrow>
            <SplitLines
              className="font-serif text-4xl md:text-5xl text-brand-green mb-14"
              lines={[`${project.name} en images`]}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 md:gap-8">
              {gallery.map((img, i) => {
                // Mosaic rhythm: wide, narrow, narrow, wide...
                const pattern = i % 5;
                const span =
                  pattern === 0 ? "lg:col-span-4" : pattern === 1 ? "lg:col-span-2" : pattern === 4 ? "lg:col-span-3" : pattern === 3 ? "lg:col-span-3" : "lg:col-span-6";
                const aspect = pattern === 2 ? "aspect-[4/3] lg:aspect-[21/9]" : pattern === 1 ? "aspect-[4/3] lg:aspect-auto lg:h-full" : "aspect-[4/3]";
                return (
                  <figure
                    key={i}
                    className={`group cursor-zoom-in ${span} flex flex-col`}
                    onClick={() => setLightboxIndex(i)}
                    data-cursor="media"
                  >
                    <div className={`relative overflow-hidden ${aspect} flex-1`}>
                      <CurtainImage
                        src={img.src}
                        alt={img.alt}
                        title={img.title}
                        className="absolute inset-0"
                        imgClassName="transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                        delay={(i % 3) * 0.1}
                        parallax={5}
                      />
                      <div className="absolute inset-0 bg-brand-green/0 group-hover:bg-brand-green/25 transition-colors duration-500 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500">
                          <svg className="w-5 h-5 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0a7.5 7.5 0 10-10.6 0 7.5 7.5 0 0010.6 0zM10.5 7.5v6m-3-3h6" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    {img.caption && (
                      <figcaption className="text-gray-500 text-sm font-light pt-4">{img.caption}</figcaption>
                    )}
                  </figure>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className="relative py-28 md:py-36 bg-brand-green text-center overflow-hidden">
        <div aria-hidden className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] rounded-full border border-brand-gold/10" />
        <div className="relative max-w-3xl mx-auto px-6">
          <SplitLines
            className="font-serif text-4xl md:text-6xl text-white mb-6"
            lines={[`Intéressé par ${project.name} ?`]}
          />
          <Reveal delay={0.15}>
            <p className="text-white/65 mb-10 font-light leading-relaxed text-lg">
              Notre équipe vous accompagne à chaque étape, de la première visite à la signature.
            </p>
            <Link
              to="/contact"
              className="btn-fill btn-fill--white bg-brand-gold border border-brand-gold text-white px-10 py-4 uppercase tracking-[0.2em] text-xs font-medium"
            >
              Échanger avec un conseiller
            </Link>
          </Reveal>
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
      className={`fixed inset-0 z-[75] flex items-center justify-center px-4 transition-opacity duration-300 ${
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