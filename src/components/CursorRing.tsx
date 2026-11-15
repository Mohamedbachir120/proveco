import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/** A small gold ring that trails the pointer and opens up over images and links (desktop only). */
export default function CursorRing() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<"idle" | "link" | "media">("idle");
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const t = e.target as HTMLElement | null;
      if (t?.closest("[data-cursor='media']")) setMode("media");
      else if (t?.closest("a, button, summary, select, [role='button']")) setMode("link");
      else setMode("idle");
    };
    const onLeave = () => setVisible(false);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [x, y]);

  if (!enabled) return null;

  const size = mode === "media" ? 84 : mode === "link" ? 46 : 26;

  return (
    <motion.div className="cursor-ring" style={{ x: sx, y: sy }} aria-hidden>
      <motion.div
        className="rounded-full border border-brand-gold -translate-x-1/2 -translate-y-1/2"
        animate={{
          width: size,
          height: size,
          opacity: visible ? 1 : 0,
          backgroundColor: mode === "media" ? "rgba(197,155,108,0.18)" : "rgba(197,155,108,0)",
        }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.div>
  );
}
