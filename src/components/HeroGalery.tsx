import { useEffect, useRef, useState } from "react";
import type { ProjectImage } from "../types/project";

interface HeroGalleryProps {
  images: ProjectImage[];
  intervalMs?: number;
}

export default function HeroGallery({ images, intervalMs = 5500 }: HeroGalleryProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (images.length <= 1 || paused || reducedMotion.current) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [images.length, intervalMs, paused]);

  if (images.length === 0) return null;

  return (
    <div
      className="absolute inset-0 z-0 overflow-hidden bg-brand-green"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {images.map((img, i) => (
        <img
          key={img.src}
          src={img.src}
          alt={i === active ? img.alt : ""}
          title={img.title}
          aria-hidden={i !== active}
          className={`hero-gallery-slide absolute inset-0 h-full w-full object-cover ${
            i === active ? "hero-gallery-slide--active" : ""
          }`}
        />
      ))}
      <div className="absolute inset-0 image-overlay" />

      {images.length > 1 && (
        <div className="absolute bottom-6 right-6 z-10 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Voir l'image ${i + 1} sur ${images.length}`}
              aria-current={i === active}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === active ? "w-8 bg-brand-gold" : "w-1.5 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}