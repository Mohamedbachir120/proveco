import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { ProjectImage } from "../types/project";
import { EASE } from "./motion";

interface HeroGalleryProps {
  images: ProjectImage[];
  intervalMs?: number;
}

/** Full-bleed crossfading slideshow with a slow zoom on the active slide. */
export default function HeroGallery({ images, intervalMs = 6000 }: HeroGalleryProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (images.length <= 1 || paused || reduced) return;
    const id = setInterval(() => setActive((i) => (i + 1) % images.length), intervalMs);
    return () => clearInterval(id);
  }, [images.length, intervalMs, paused, reduced, active]);

  if (images.length === 0) return null;
  const img = images[active];
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div
      className="absolute inset-0 z-0 overflow-hidden bg-brand-green"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence initial={false}>
        <motion.img
          key={img.src}
          src={img.src}
          alt={img.alt}
          title={img.title}
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 0, scale: 1.12 }}
          animate={{
            opacity: 1,
            scale: 1.02,
            transition: { opacity: { duration: 1.4, ease: EASE }, scale: { duration: intervalMs / 1000 + 1.5, ease: "linear" } },
          }}
          exit={{ opacity: 0, transition: { duration: 1.4, ease: EASE } }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 hero-vignette" />

      {images.length > 1 && (
        <div className="absolute bottom-8 right-6 sm:right-12 z-20 flex items-center gap-5 text-white">
          <span className="font-serif text-sm tabular-nums">
            <span className="text-brand-gold">{pad(active + 1)}</span>
            <span className="text-white/50"> / {pad(images.length)}</span>
          </span>
          <div className="flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Voir l'image ${i + 1} sur ${images.length}`}
                aria-current={i === active}
                className="relative h-[3px] w-8 bg-white/25 overflow-hidden"
              >
                {i === active && (
                  <motion.span
                    key={`${active}-${paused}`}
                    className="absolute inset-0 bg-brand-gold origin-left"
                    initial={{ scaleX: paused || reduced ? 1 : 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: paused || reduced ? 0 : intervalMs / 1000, ease: "linear" }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
