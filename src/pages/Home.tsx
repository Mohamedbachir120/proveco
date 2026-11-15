import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import { getProjects } from "../services/projects.service";
import type { Project } from "../types/project";
import ProjectCard from "../components/ProjectCard";
import ContactSection from "../components/ContactSection";
import heroCoralliumNight from "../assets/hero-corallium-night.webp";
import aboutProjectImage from "../assets/facade-residence-savoie-hydra-alger.webp";
import { useInView } from "../hooks/useInView";
import { useCountUp } from "../hooks/useCountUp";
import {
  CurtainImage,
  EASE,
  Eyebrow,
  GoldRule,
  Reveal,
  SplitLines,
  Stagger,
  StaggerItem,
} from "../components/motion";
import { FAQS } from "../data/faq";

interface StatItemProps {
  value: number;
  suffix?: string;
  label: string;
  active: boolean;
}

function StatItem({ value, suffix = "", label, active }: StatItemProps) {
  const count = useCountUp(value, 2200, active);
  return (
    <div className="px-4 py-6 md:py-2">
      <div className="font-serif text-5xl md:text-7xl text-brand-gold mb-3 tracking-tight tabular-nums">
        {count}
        {suffix}
      </div>
      <p className="uppercase tracking-[0.25em] text-[11px] text-white/60 font-light">{label}</p>
    </div>
  );
}

const WHY_INVEST = [
  {
    title: "Forte demande locative",
    desc: "Un marché locatif tendu dans les grandes villes, garant d'une occupation rapide de votre bien.",
  },
  {
    title: "Croissance urbaine",
    desc: "L'expansion continue des pôles urbains algériens soutient la valeur du foncier sur le long terme.",
  },
  {
    title: "Prix encore accessibles",
    desc: "Des tickets d'entrée compétitifs comparés aux standards régionaux, pour un rendement optimisé.",
  },
  {
    title: "Potentiel de valorisation",
    desc: "Des projets neufs situés dans des zones à fort potentiel d'appréciation à moyen terme.",
  },
];

const JOURNEY = [
  {
    title: "1. On vous écoute",
    desc: "Vos besoins, votre budget, votre vision. Avant de parler de la pierre, on parle de vous.",
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  },
  {
    title: "2. On vous guide",
    desc: "Sélection du bien, conseil patrimonial, simulation financière. Chaque décision est éclairée.",
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
  {
    title: "3. On vous protège",
    desc: "Explication juridique et administrative complète. Aucune surprise, aucun vide.",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
  },
  {
    title: "4. On livre ce qu'on a promis",
    desc: "Délais tenus. Finitions conformes. Une remise des clés qui mérite d'être célébrée.",
    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "« Un professionnalisme exemplaire. La livraison a été ponctuelle, le suivi de chantier irréprochable et la qualité des finitions dépasse nos attentes. PROVECO a su instaurer un vrai climat de confiance. »",
    initials: "KB",
    name: "Karim B.",
    role: "Acheteur F4, Résidence Savoie, Alger",
  },
  {
    quote:
      "« L'équipe de PROVECO nous a accompagnés avec une transparence exemplaire. Un investissement patrimonial rentable et parfaitement sécurisé, mené avec une réelle rigueur. »",
    initials: "SL",
    name: "Samira L.",
    role: "Investisseuse, Hydra, Alger",
  },
];

const BLOG_POSTS = [
  {
    slug: "etapes-achat",
    title: "Les étapes d'un achat immobilier réussi",
    excerpt:
      "Réservation, contrat, paiement : le parcours détaillé, étape par étape.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=500&auto=format&fit=crop",
  },
  {
    slug: "erreurs-a-eviter",
    title: "5 erreurs à éviter avant d'investir",
    excerpt:
      "Les pièges les plus fréquents des primo-investisseurs, et comment les contourner.",
    image:
      "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?q=80&w=500&auto=format&fit=crop",
  },
  {
    slug: "choisir-emplacement",
    title: "Comment choisir le bon emplacement",
    excerpt:
      "Les critères qui font vraiment la différence sur la rentabilité d'un bien.",
    image:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=500&auto=format&fit=crop",
  },
  {
    slug: "louer-facilement",
    title: "Comment louer facilement votre bien",
    excerpt:
      "Fixer le bon loyer, cibler les bons profils, sécuriser la location.",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=500&auto=format&fit=crop",
  },
];

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const shade = useTransform(scrollYProgress, [0, 1], [0, 0.55]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <header ref={ref} className="relative h-[100svh] min-h-[620px] overflow-hidden bg-brand-green">
      <motion.div className="absolute inset-0" style={{ scale }}>
        <motion.img
          src={heroCoralliumNight}
          alt="Résidence Corallium - Vue 3D extérieure"
          className="w-full h-full object-cover"
          initial={{ scale: 1.25 }}
          animate={{ scale: 1.02 }}
          transition={{ duration: 2.8, ease: EASE, delay: 0.3 }}
        />
      </motion.div>
      <div className="absolute inset-0 hero-vignette" />
      <motion.div className="absolute inset-0 bg-brand-green" style={{ opacity: shade }} />

      <motion.div
        className="relative z-10 h-full max-w-7xl mx-auto px-6 sm:px-12 flex flex-col justify-end pb-28 md:pb-32"
        style={{ y: textY, opacity: textOpacity }}
      >
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
          <p className="text-brand-gold uppercase tracking-[0.35em] text-xs md:text-sm font-semibold">
            Proveco Promotion
          </p>
        </motion.div>

        <SplitLines
          as="h1"
          immediate
          delay={1}
          className="font-serif text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-[5.5rem] text-white mb-10 max-w-5xl"
          lines={[
            <span key="l1">Pas pour tout le monde,</span>,
            <span key="l2" className="italic text-white/90">et c’est précisément ce qui nous définit.</span>,
          ]}
        />

        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.45, duration: 1, ease: EASE }}
        >
          <Link
            to="/projects"
            className="btn-fill bg-brand-green border border-brand-green text-white px-9 py-4 uppercase tracking-[0.2em] text-xs font-medium"
          >
            Nos résidences
          </Link>
          <Link
            to="/contact"
            className="btn-fill border border-brand-gold text-white px-9 py-4 uppercase tracking-[0.2em] text-xs font-medium backdrop-blur-sm"
          >
            Saisir l'opportunité
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/70 flex flex-col items-center gap-3 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-[10px] uppercase tracking-[0.35em] font-light">Découvrir</span>
        <span className="relative block h-12 w-px bg-white/20 overflow-hidden">
          <motion.span
            className="absolute left-0 top-0 block h-1/2 w-px bg-brand-gold"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Votre parcours — scroll-linked timeline                             */
/* ------------------------------------------------------------------ */

function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.55"] });
  const [reached, setReached] = useState(-1);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setReached(v < 0.02 ? -1 : Math.min(3, Math.floor(v * 4)));
  });

  return (
    <section id="services" className="py-28 md:py-40 bg-brand-gray/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="mb-20 md:mb-24 grid md:grid-cols-12 gap-6 items-end">
          <div className="md:col-span-7">
            <Eyebrow className="mb-6">L'expérience client</Eyebrow>
            <SplitLines
              className="font-serif text-4xl md:text-6xl text-brand-green leading-[1.08]"
              lines={["Votre parcours avec PROVECO"]}
            />
          </div>
        </div>

        <div ref={ref} className="relative">
          {/* Track + scroll-linked fill (horizontal on desktop, vertical on mobile) */}
          <div className="hidden md:block absolute left-0 right-0 top-8 h-px bg-brand-green/15">
            <motion.div className="h-full bg-brand-gold origin-left" style={{ scaleX: scrollYProgress }} />
          </div>
          <div className="md:hidden absolute left-8 top-0 bottom-0 w-px bg-brand-green/15">
            <motion.div className="w-full h-full bg-brand-gold origin-top" style={{ scaleY: scrollYProgress }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-14 md:gap-10">
            {JOURNEY.map((step, i) => {
              const on = reached >= i;
              return (
                <Reveal key={step.title} delay={i * 0.08} className="relative pl-24 md:pl-0">
                  <div
                    className={`absolute left-0 top-0 md:relative w-16 h-16 rounded-full flex items-center justify-center mb-10 border transition-all duration-700 ${
                      on
                        ? "bg-brand-green border-brand-green text-brand-gold shadow-[0_0_0_8px_rgba(197,155,108,0.15)]"
                        : "bg-white border-brand-green/20 text-brand-green"
                    }`}
                  >
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={step.icon} />
                    </svg>
                  </div>
                  <h3
                    className={`font-serif text-2xl mb-4 transition-colors duration-700 ${
                      on ? "text-brand-green" : "text-brand-green/60"
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p className="text-gray-500 text-[15px] font-light leading-relaxed max-w-xs">{step.desc}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 3D tour — frame expands to full bleed as it enters                  */
/* ------------------------------------------------------------------ */

function Showcase() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const inset = useTransform(scrollYProgress, [0, 1], [8, 0]);
  const radius = useTransform(scrollYProgress, [0, 1], [24, 0]);
  const clipPath = useTransform(
    [inset, radius],
    ([i, r]) => `inset(0% ${i}% 0% ${i}% round ${r}px)`
  );
  const [hint, setHint] = useState(true);

  return (
    <section id="3d-showcase" ref={ref} className="pt-28 md:pt-36 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <Eyebrow className="mb-6">Immersion</Eyebrow>
          <SplitLines
            className="font-serif text-4xl md:text-6xl text-brand-green"
            lines={["Visite Virtuelle 3D"]}
          />
        </div>
      </div>

      <motion.div
        className="relative h-[75vh] min-h-[480px] bg-brand-green group"
        style={{ clipPath }}
        onMouseLeave={() => setHint(false)}
      >
        <iframe
          src="https://my.spline.design/untitled-copy-3d47946847c57d52af5e2d46f29f2a3b/"
          frameBorder="0"
          width="100%"
          height="100%"
          loading="lazy"
          className="absolute inset-0"
          title="Visite Virtuelle 3D"
        />
        <div
          className={`absolute inset-0 bg-brand-green/80 backdrop-blur-sm flex flex-col items-center justify-center text-center p-8 transition-opacity duration-700 group-hover:opacity-100 ${
            hint ? "opacity-100" : "opacity-0 pointer-events-none group-hover:pointer-events-auto"
          }`}
          onClick={() => setHint(false)}
        >
          <h3 className="font-serif text-4xl md:text-5xl text-white mb-5">Appartement F4 - Alger</h3>
          <p className="text-white/75 mb-8 max-w-md font-light">
            Découvrez nos agencements intérieurs en réalité virtuelle immersive.
          </p>
          <Link
            to="/projects"
            onClick={(e) => e.stopPropagation()}
            className="btn-fill btn-fill--green bg-brand-gold border border-brand-gold text-white px-8 py-4 uppercase text-xs tracking-[0.2em] font-semibold"
          >
            Voir les réalisations
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Testimonials — one large quote at a time                            */
/* ------------------------------------------------------------------ */

function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % TESTIMONIALS.length), 7000);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <section
      id="testimonials"
      className="py-28 md:py-40 bg-white overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-12 text-center">
        <Eyebrow center className="mb-6">Témoignages</Eyebrow>
        <SplitLines
          className="font-serif text-4xl md:text-5xl text-brand-green mb-16"
          lines={["Ils Nous Font Confiance"]}
        />

        <Reveal>
          <motion.svg
            viewBox="0 0 48 36"
            className="w-14 h-10 mx-auto mb-10 text-brand-gold"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden
          >
            <motion.path
              d="M4 34V20C4 10 9 4 18 2M28 34V20c0-10 5-16 14-18M4 20h14v14H4zM28 20h14v14H28z"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, ease: EASE }}
            />
          </motion.svg>

          {/* Both quotes stay in the DOM (one visible at a time) */}
          <div className="grid">
            {TESTIMONIALS.map((t, i) => (
              <motion.figure
                key={t.name}
                className="[grid-area:1/1]"
                aria-hidden={i !== active}
                initial={false}
                animate={{
                  opacity: i === active ? 1 : 0,
                  y: i === active ? 0 : 16,
                  filter: i === active ? "blur(0px)" : "blur(6px)",
                }}
                transition={{ duration: 0.9, ease: EASE }}
                style={{ pointerEvents: i === active ? "auto" : "none" }}
              >
                <div className="flex items-center justify-center mb-8 text-brand-gold gap-1">
                  {[...Array(5)].map((_, s) => (
                    <svg key={s} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="font-serif italic text-2xl md:text-4xl leading-snug text-brand-green mb-10">
                  {t.quote}
                </blockquote>
                <figcaption className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-green text-brand-gold border border-brand-gold/40 flex items-center justify-center font-serif font-bold text-base">
                    {t.initials}
                  </div>
                  <div className="text-left">
                    <h5 className="font-serif text-brand-green font-semibold text-base">{t.name}</h5>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">{t.role}</p>
                  </div>
                </figcaption>
              </motion.figure>
            ))}
          </div>

          <div className="flex items-center justify-center gap-6 mt-12">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.name}
                type="button"
                onClick={() => setActive(i)}
                aria-label={t.name}
                aria-current={i === active}
                className="group py-3"
              >
                <span className="block h-px w-14 bg-brand-green/15 overflow-hidden">
                  <span
                    className={`block h-full bg-brand-gold origin-left transition-transform ${
                      i === active ? "scale-x-100 duration-[7000ms] ease-linear" : "scale-x-0 duration-300"
                    }`}
                  />
                </span>
              </button>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* FAQ — sticky heading, smooth accordion                              */
/* ------------------------------------------------------------------ */

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-28 md:py-40 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 grid md:grid-cols-12 gap-12 md:gap-16">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-32">
            <Eyebrow className="mb-6">FAQ</Eyebrow>
            <SplitLines
              className="font-serif text-4xl md:text-5xl text-brand-green leading-[1.1]"
              lines={["Questions Fréquentes"]}
            />
          </div>
        </div>

        <Stagger className="md:col-span-8 border-t border-brand-gray">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <StaggerItem key={item.question}>
                <div className="faq-item border-b border-brand-gray" data-open={isOpen}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full flex justify-between items-center gap-6 py-7 text-left text-brand-green hover:text-brand-gold transition-colors duration-300"
                  >
                    <span className="font-serif text-xl md:text-2xl">{item.question}</span>
                    <span
                      className={`flex-shrink-0 w-10 h-10 rounded-full border flex items-center justify-center text-xl transition-all duration-500 ${
                        isOpen
                          ? "rotate-45 bg-brand-gold border-brand-gold text-white"
                          : "border-brand-gold/50 text-brand-gold"
                      }`}
                    >
                      +
                    </span>
                  </button>
                  <div className="faq-panel">
                    <div>
                      <p className="text-gray-600 font-light pb-8 leading-relaxed text-[15px] md:text-base max-w-3xl">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const statsView = useInView({ threshold: 0.3 });

  useEffect(() => {
    getProjects().then((all) => setProjects(all.slice(0, 3)));
  }, []);

  return (
    <>
      <Hero />

      {/* Notre conviction — asymmetric split, image bleeds off the left edge */}
      <section id="about" className="py-28 md:py-40 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-14 md:gap-10 items-center">
            <div className="relative md:col-span-7 md:-ml-24 lg:-ml-40">
              <motion.div
                aria-hidden
                className="absolute -top-6 -right-6 w-full h-full border border-brand-gold/70 hidden md:block"
                initial={{ opacity: 0, x: -30, y: 30 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 1.4, ease: EASE, delay: 0.35 }}
              />
              <CurtainImage
                src={aboutProjectImage}
                alt="Architecture de la Résidence Savoie à Hydra par PROVECO"
                className="relative z-10 aspect-[4/3] md:aspect-[5/4] shadow-2xl"
                direction="left"
                parallax={10}
              />
            </div>

            <div className="md:col-span-5 md:pl-10 md:pt-24">
              <Eyebrow className="mb-6">Notre conviction</Eyebrow>
              <SplitLines
                className="font-serif text-4xl md:text-5xl text-brand-green mb-10 leading-[1.08]"
                lines={["Ce qui nous distingue"]}
              />
              <Reveal delay={0.15}>
                <p className="text-gray-600 leading-relaxed mb-10 font-light text-base md:text-lg">
                  L’immobilier évolue. Les standards aussi. Une nouvelle génération
                  d’acquéreurs ne cherche plus simplement à acheter, mais à faire un
                  choix cohérent, durable et maîtrisé. PROVECO s’inscrit dans cette
                  évolution avec rigueur, sélection stricte des emplacements et
                  exigence constante dans l’exécution.
                </p>
                <Link
                  to="/about"
                  className="group inline-flex items-center gap-3 text-brand-green font-medium text-xs uppercase tracking-[0.2em]"
                >
                  <span className="relative pb-1">
                    Découvrir notre histoire
                    <span className="absolute left-0 bottom-0 h-px w-full bg-brand-green group-hover:bg-brand-gold transition-colors duration-500" />
                  </span>
                  <span className="w-10 h-10 rounded-full border border-brand-green/30 flex items-center justify-center transition-all duration-500 group-hover:bg-brand-gold group-hover:border-brand-gold group-hover:text-white group-hover:translate-x-1">
                    &rarr;
                  </span>
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Investir */}
      <section id="investir" className="py-28 md:py-40 bg-brand-green text-white relative overflow-hidden">
        {/* Large faint gold circle drifting in the background */}
        <motion.div
          aria-hidden
          className="absolute -right-40 -top-40 w-[560px] h-[560px] rounded-full border border-brand-gold/15"
          initial={{ scale: 0.6, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2.4, ease: EASE }}
        />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-12">
          <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-end">
            <div className="md:col-span-7">
              <Eyebrow className="mb-8">Investissement</Eyebrow>
              <SplitLines
                className="font-serif text-4xl md:text-6xl leading-[1.08]"
                lines={["Investir intelligemment dans l'immobilier en Algérie"]}
              />
            </div>
            <Reveal className="md:col-span-5" delay={0.2}>
              <p className="text-white/70 font-light mb-10 text-base md:text-lg leading-relaxed">
                Découvrez les meilleures opportunités immobilières sélectionnées
                pour leur rentabilité et leur potentiel.
              </p>
              <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 whitespace-nowrap">
                <Link
                  to="/projects"
                  className="btn-fill btn-fill--white bg-brand-gold border border-brand-gold text-white px-8 py-4 uppercase tracking-[0.2em] text-xs font-medium"
                >
                  Voir les opportunités
                </Link>
                <Link
                  to="/contact"
                  className="btn-fill border border-white/60 text-white px-8 py-4 uppercase tracking-[0.2em] text-xs font-medium"
                >
                  Être conseillé gratuitement
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Pourquoi investir */}
          <div className="mt-28 md:mt-36">
            <div className="flex items-center gap-6 mb-14">
              <Reveal>
                <h3 className="font-serif text-2xl md:text-3xl whitespace-nowrap">Pourquoi investir en Algérie ?</h3>
              </Reveal>
              <GoldRule className="flex-1" delay={0.3} />
            </div>

            <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" stagger={0.12}>
              {WHY_INVEST.map((item, index) => (
                <StaggerItem
                  key={item.title}
                  className="group relative py-8 lg:py-2 lg:px-8 first:lg:pl-0 border-t lg:border-t-0 lg:border-l first:lg:border-l-0 border-white/10"
                >
                  <div className="font-serif text-6xl text-brand-gold/25 group-hover:text-brand-gold transition-colors duration-700 mb-6">
                    0{index + 1}
                  </div>
                  <h4 className="font-serif text-xl text-brand-gold mb-3">{item.title}</h4>
                  <p className="text-white/60 text-sm font-light leading-relaxed">{item.desc}</p>
                  <span className="absolute left-0 lg:left-8 first:lg:left-0 bottom-0 lg:-bottom-6 h-px w-0 bg-brand-gold group-hover:w-16 transition-all duration-700" />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      <Journey />

      <Showcase />

      {/* Nos réalisations — editorial collage */}
      <section id="projects" className="py-28 md:py-40 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="flex justify-between items-end mb-16 md:mb-20 gap-6">
            <div>
              <Eyebrow className="mb-6">Portfolio</Eyebrow>
              <SplitLines
                className="font-serif text-4xl md:text-6xl text-brand-green"
                lines={["Nos réalisations"]}
              />
            </div>
            <Reveal delay={0.2}>
              <Link
                to="/projects"
                className="hidden md:inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-brand-green hover:text-brand-gold transition-colors font-semibold group"
              >
                <span>Tout voir</span>
                <span className="w-10 h-10 rounded-full border border-current flex items-center justify-center transition-transform duration-500 group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
            </Reveal>
          </div>

          {projects.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-10">
              <div className="md:col-span-7 md:row-span-2">
                <ProjectCard project={projects[0]} variant="large" />
              </div>
              {projects.slice(1).map((project, index) => (
                <div key={project.slug} className="md:col-span-5">
                  <ProjectCard project={project} variant="wide" delay={0.15 * (index + 1)} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stats */}
      <section ref={statsView.ref} className="py-20 md:py-24 bg-brand-green text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <Stagger className="grid grid-cols-2 md:grid-cols-4 text-center md:divide-x divide-brand-gold/25" stagger={0.12}>
            <StaggerItem>
              <StatItem value={6} label="Résidences d'Exception" active={statsView.inView} />
            </StaggerItem>
            <StaggerItem>
              <StatItem value={270} suffix="+" label="Logements & Duplex" active={statsView.inView} />
            </StaggerItem>
            <StaggerItem>
              <StatItem value={12} suffix="+" label="Années d'Excellence" active={statsView.inView} />
            </StaggerItem>
            <StaggerItem>
              <StatItem value={100} suffix="%" label="Engagements & Délais Tenus" active={statsView.inView} />
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      <Testimonials />

      {/* Conseils (blog) */}
      <section id="blog" className="py-28 md:py-40 bg-brand-gray/30 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="mb-14 md:mb-20 max-w-3xl">
            <Eyebrow className="mb-6">Conseils</Eyebrow>
            <SplitLines
              className="font-serif text-4xl md:text-5xl text-brand-green leading-[1.1]"
              lines={["Comment investir dans l'immobilier en Algérie ?"]}
            />
          </div>

          <Stagger
            className="flex md:grid md:grid-cols-4 gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory no-scrollbar -mx-6 px-6 md:mx-0 md:px-0 pb-4"
            stagger={0.1}
          >
            {BLOG_POSTS.map((post) => (
              <StaggerItem key={post.slug} className="snap-start shrink-0 w-[78%] sm:w-[45%] md:w-auto">
                <article className="group h-full bg-white transition-shadow duration-700 hover:shadow-[0_30px_60px_-30px_rgba(8,72,81,0.35)]">
                  <div className="h-52 overflow-hidden bg-brand-gray/40" data-cursor="media">
                    <img
                      src={post.image}
                      alt={post.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                    />
                  </div>
                  <div className="p-7">
                    <h3 className="font-serif text-xl text-brand-green mb-3 group-hover:text-brand-gold transition-colors duration-500">
                      {post.title}
                    </h3>
                    <p className="text-gray-500 text-sm font-light mb-6 line-clamp-2">{post.excerpt}</p>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-brand-gold text-xs uppercase tracking-[0.2em] font-semibold hover:text-brand-green transition-colors"
                    >
                      <span>Lire l'article</span>
                      <span className="transition-transform duration-500 group-hover:translate-x-1.5">&rarr;</span>
                    </Link>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <Faq />

      <ContactSection />
    </>
  );
}
