import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, type Variants } from "motion/react";

/** Signature easing shared by every reveal (same curve as --ease-luxury). */
export const EASE = [0.16, 1, 0.3, 1] as const;

const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" } as const;

/* ------------------------------------------------------------------ */
/* Fade / rise reveal                                                  */
/* ------------------------------------------------------------------ */

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "li" | "article" | "figure";
}

export function Reveal({ children, className, delay = 0, y = 40, as = "div" }: RevealProps) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 1.1, ease: EASE, delay }}
    >
      {children}
    </Comp>
  );
}

/* ------------------------------------------------------------------ */
/* Staggered children                                                  */
/* ------------------------------------------------------------------ */

const staggerParent: Variants = {
  hidden: {},
  show: (stagger: number = 0.09) => ({ transition: { staggerChildren: stagger } }),
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE } },
};

export function Stagger({
  children,
  className,
  stagger = 0.09,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={staggerParent}
      custom={stagger}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={staggerItem}>
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Line-by-line title: each line rises from behind a mask              */
/* ------------------------------------------------------------------ */

interface SplitLinesProps {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  as?: "h1" | "h2" | "h3";
  delay?: number;
  /** animate on mount instead of when scrolled into view */
  immediate?: boolean;
}

export function SplitLines({
  lines,
  className,
  lineClassName = "",
  as = "h2",
  delay = 0,
  immediate = false,
}: SplitLinesProps) {
  const Comp = motion[as];
  const trigger = immediate
    ? { initial: "hidden", animate: "show" }
    : { initial: "hidden", whileInView: "show", viewport: VIEWPORT };
  return (
    <Comp
      className={className}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: delay } } }}
      {...trigger}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
          <motion.span
            className={`block ${lineClassName}`}
            variants={{
              hidden: { y: "110%" },
              show: { y: "0%", transition: { duration: 1.15, ease: EASE } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Comp>
  );
}

/* ------------------------------------------------------------------ */
/* Eyebrow: a gold rule draws, then the label fades in                 */
/* ------------------------------------------------------------------ */

export function Eyebrow({
  children,
  className = "",
  light = false,
  center = false,
}: {
  children: ReactNode;
  className?: string;
  light?: boolean;
  center?: boolean;
}) {
  return (
    <motion.div
      className={`flex items-center gap-4 ${center ? "justify-center" : ""} ${className}`}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      <motion.span
        aria-hidden
        className="block h-px w-10 bg-brand-gold origin-left"
        variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.9, ease: EASE } } }}
      />
      <motion.span
        className={`uppercase tracking-[0.3em] text-[11px] font-semibold ${light ? "text-brand-gold" : "text-brand-gold"}`}
        variants={{
          hidden: { opacity: 0, x: -8 },
          show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE, delay: 0.35 } },
        }}
      >
        {children}
      </motion.span>
      {center && (
        <motion.span
          aria-hidden
          className="block h-px w-10 bg-brand-gold origin-right"
          variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.9, ease: EASE } } }}
        />
      )}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Curtain image: mask slides away, image settles from a slight zoom,  */
/* then keeps a gentle parallax while scrolling                        */
/* ------------------------------------------------------------------ */

interface CurtainImageProps {
  src: string;
  alt: string;
  title?: string;
  className?: string;
  imgClassName?: string;
  parallax?: number;
  delay?: number;
  direction?: "up" | "left" | "right";
  eager?: boolean;
}

const CLIP_FROM = {
  up: "inset(100% 0% 0% 0%)",
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
};

export function CurtainImage({
  src,
  alt,
  title,
  className = "",
  imgClassName = "",
  parallax = 8,
  delay = 0,
  direction = "up",
  eager = false,
}: CurtainImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${parallax}%`, `${parallax}%`]);

  // The observer sits on an unclipped wrapper: a fully clipped element never reports as visible.
  return (
    <motion.div ref={ref} className={className} initial="hidden" whileInView="show" viewport={VIEWPORT}>
      <motion.div
        className="relative h-full w-full overflow-hidden"
        variants={{
          hidden: { clipPath: CLIP_FROM[direction] },
          show: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.3, ease: EASE, delay } },
        }}
      >
        <motion.div className="absolute inset-[-10%]" style={{ y }}>
          <motion.img
            src={src}
            alt={alt}
            title={title}
            loading={eager ? "eager" : "lazy"}
            className={`h-full w-full object-cover ${imgClassName}`}
            variants={{
              hidden: { scale: 1.18 },
              show: { scale: 1, transition: { duration: 1.8, ease: EASE, delay } },
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Draw-in gold line (horizontal or vertical)                          */
/* ------------------------------------------------------------------ */

export function GoldRule({
  vertical = false,
  className = "",
  delay = 0,
}: {
  vertical?: boolean;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.span
      aria-hidden
      className={`block bg-brand-gold/60 ${vertical ? "w-px origin-top" : "h-px origin-left"} ${className}`}
      initial={vertical ? { scaleY: 0 } : { scaleX: 0 }}
      whileInView={vertical ? { scaleY: 1 } : { scaleX: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 1.2, ease: EASE, delay }}
    />
  );
}
