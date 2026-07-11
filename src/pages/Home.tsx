import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProjects } from "../services/projects.service";
import type { Project } from "../types/project";
import ProjectCard from "../components/ProjectCard";
import ContactSection from "../components/ContactSection";

const STATS = [
  { value: "15", label: "Projets Réalisés" },
  { value: "800", label: "Appartements" },
  { value: "10", label: "Années d'Expérience" },
  { value: "95", label: "% Clients Satisfaits" },
];
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

const TYPOLOGIES: Record<string, number> = {
  F2: 60,
  F3: 85,
  F4: 110,
  Duplex: 180,
};

const RENT_PER_M2: Record<string, number> = {
  Alger: 700,
  Oran: 550,
  Constantine: 500,
  Annaba: 480,
};

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
export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [budget, setBudget] = useState<number>(8000000);
  const [typology, setTypology] = useState<string>("F3");
  const [localisation, setLocalisation] = useState<string>("Alger");

  const surface = TYPOLOGIES[typology];
  const rentPerM2 = RENT_PER_M2[localisation];
  const estimatedRent = surface * rentPerM2;
  const annualRevenue = estimatedRent * 12;
  const rentability = budget > 0 ? (annualRevenue / budget) * 100 : 0;
  useEffect(() => {
    getProjects().then((all) => setProjects(all.slice(0, 3)));
  }, []);

  return (
    <>
      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop"
            alt="Luxury Architecture"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 image-overlay" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
          <p className="text-brand-gold uppercase tracking-[0.2em] mb-4 text-sm md:text-base font-semibold">
            Proveco Promotion
          </p>
          <h2 className="font-serif text-4xl md:text-6xl text-white leading-tight mb-8">
            L’investissement en Algérie. <br />
            Le haut de gamme, <br />
            <span className="italic"> par conviction.</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link
              to="/projects"
              className="bg-brand-green text-white px-8 py-4 uppercase tracking-widest text-sm hover:bg-opacity-90 transition-all duration-300 shadow-lg"
            >
              Nos résidences
            </Link>
            <Link
              to="/contact"
              className="border border-brand-gold text-white px-8 py-4 uppercase tracking-widest text-sm hover:bg-brand-gold hover:text-white transition-all duration-300"
            >
              Saisir l'opportunité
            </Link>
          </div>
        </div>
      </header>

      {/* About Us Section */}
      <section id="about" className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full border border-brand-gold z-0 hidden md:block" />
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
                alt="Architecture"
                className="relative z-10 w-full shadow-lg grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div>
              <h4 className="text-brand-gold uppercase tracking-widest text-sm mb-2">
                Notre Vision
              </h4>
              <h2 className="font-serif text-4xl text-brand-green mb-8">
                L'excellence au cœur de l'habitat
              </h2>
              <p className="text-gray-500 leading-relaxed mb-6 font-light">
                PROVECO Promotion redéfinit les standards de l'immobilier en
                Algérie. Nous créons des lieux de vie alliant esthétique
                moderne, confort et durabilité.
              </p>
              <Link
                to="/about"
                className="text-brand-green border-b border-brand-green pb-1 hover:text-brand-gold hover:border-brand-gold transition-colors duration-300"
              >
                Découvrir notre histoire
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Investir Section */}
      <section
        id="investir"
        className="py-24 md:py-32 bg-brand-green text-white"
      >
        <div className="max-w-4xl mx-auto px-6 sm:px-12 text-center">
          <h4 className="text-brand-gold uppercase tracking-widest text-sm mb-4">
            Investissement
          </h4>
          <h2 className="font-serif text-4xl md:text-5xl mb-6 leading-tight">
            Investir intelligemment dans l'immobilier en Algérie
          </h2>
          <p className="text-gray-300 font-light mb-10 max-w-2xl mx-auto">
            Découvrez les meilleures opportunités immobilières sélectionnées
            pour leur rentabilité et leur potentiel.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link
              to="/apartments"
              className="bg-brand-gold text-white px-8 py-4 uppercase tracking-widest text-sm hover:bg-opacity-90 transition-all duration-300 shadow-lg"
            >
              Voir les opportunités
            </Link>
            <a
              href="#contact"
              className="border border-white text-white px-8 py-4 uppercase tracking-widest text-sm hover:bg-white hover:text-brand-green transition-all duration-300"
            >
              Être conseillé gratuitement
            </a>
          </div>
        </div>

        {/* Pourquoi investir */}
        <div className="max-w-7xl mx-auto px-6 sm:px-12 mt-20">
          <h3 className="font-serif text-2xl md:text-3xl text-center mb-12">
            Pourquoi investir en Algérie ?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {WHY_INVEST.map((item) => (
              <div
                key={item.title}
                className="bg-white/5 border border-white/10 p-8 hover:border-brand-gold transition-all duration-500"
              >
                <h4 className="font-serif text-xl text-brand-gold mb-3">
                  {item.title}
                </h4>
                <p className="text-gray-300 text-sm font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Simulateur ROI */}
        <div className="max-w-5xl mx-auto px-6 sm:px-12 mt-20">
          <div className="bg-white text-brand-green p-8 md:p-12 shadow-lg">
            <h4 className="text-brand-gold uppercase tracking-widest text-sm mb-2 text-center">
              Simulateur
            </h4>
            <h3 className="font-serif text-3xl text-center mb-10">
              Simulez votre investissement
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                  Budget (DA)
                </label>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-brand-green transition-colors bg-transparent"
                  min={0}
                  step={100000}
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                  Typologie
                </label>
                <select
                  value={typology}
                  onChange={(e) => setTypology(e.target.value)}
                  className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-brand-green transition-colors bg-transparent"
                >
                  {Object.keys(TYPOLOGIES).map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                  Localisation
                </label>
                <select
                  value={localisation}
                  onChange={(e) => setLocalisation(e.target.value)}
                  className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-brand-green transition-colors bg-transparent"
                >
                  {Object.keys(RENT_PER_M2).map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center border-t border-brand-gray pt-10">
              <div>
                <div className="font-serif text-3xl text-brand-gold mb-1">
                  {estimatedRent.toLocaleString("fr-FR")} DA
                </div>
                <p className="uppercase tracking-widest text-xs text-gray-500">
                  Loyer moyen estimé / mois
                </p>
              </div>
              <div>
                <div className="font-serif text-3xl text-brand-gold mb-1">
                  {annualRevenue.toLocaleString("fr-FR")} DA
                </div>
                <p className="uppercase tracking-widest text-xs text-gray-500">
                  Revenu annuel estimé
                </p>
              </div>
              <div>
                <div className="font-serif text-3xl text-brand-gold mb-1">
                  {rentability.toFixed(1)} %
                </div>
                <p className="uppercase tracking-widest text-xs text-gray-500">
                  Rentabilité estimée
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Services Section */}
      <section id="services" className="py-24 bg-brand-gray/30">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 text-center">
          <h4 className="text-brand-gold uppercase tracking-widest text-sm mb-2">
            L'expérience client
          </h4>
          <h2 className="font-serif text-4xl text-brand-green mb-16">
            Votre parcours avec PROVECO
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Card 1 */}
            <div className="bg-white p-8 shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-500 border-b-4 border-transparent hover:border-brand-gold">
              <div className="w-16 h-16 mx-auto bg-brand-green/10 rounded-full flex items-center justify-center mb-6 text-brand-green">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="font-serif text-xl text-brand-green mb-3">
                On vous écoute
              </h3>
              <p className="text-gray-500 text-md font-light">
                Vos besoins, votre budget, votre vision. Avant de parler de la
                pierre, on parle de vous.
              </p>
            </div>
            {/* Card 2 */}
            <div className="bg-white p-8 shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-500 border-b-4 border-transparent hover:border-brand-gold">
              <div className="w-16 h-16 mx-auto bg-brand-green/10 rounded-full flex items-center justify-center mb-6 text-brand-green">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="font-serif text-xl text-brand-green mb-3">
                On vous guide
              </h3>
              <p className="text-gray-500 text-md font-light">
                Sélection du bien, conseil patrimonial, simulation financière.
                Chaque décision est éclairée.
              </p>
            </div>
            {/* Card 3 */}
            <div className="bg-white p-8 shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-500 border-b-4 border-transparent hover:border-brand-gold">
              <div className="w-16 h-16 mx-auto bg-brand-green/10 rounded-full flex items-center justify-center mb-6 text-brand-green">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
              </div>
              <h3 className="font-serif text-xl text-brand-green mb-3">
                On vous protège
              </h3>
              <p className="text-gray-500 text-md font-light">
                Explication juridique et administrative complète. Aucune
                surprise, aucun vide.
              </p>
            </div>
            {/* Card 4 */}
            <div className="bg-white p-8 shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-500 border-b-4 border-transparent hover:border-brand-gold">
              <div className="w-16 h-16 mx-auto bg-brand-green/10 rounded-full flex items-center justify-center mb-6 text-brand-green">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-serif text-xl text-brand-green mb-3">
                On livre ce qu'on a promis
              </h3>
              <p className="text-gray-500 text-md font-light">
                Délais tenus. Finitions conformes. Une remise des clés qui
                mérite d'être célébrée.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Apartment 3D Showcase */}
      <section id="3d-showcase" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="text-center mb-12">
            <h4 className="text-brand-gold uppercase tracking-widest text-sm mb-2">
              Immersion
            </h4>
            <h2 className="font-serif text-4xl text-brand-green">
              Visite Virtuelle 3D
            </h2>
          </div>
          <div className="relative h-[500px] bg-brand-gray border border-gray-200 shadow-sm group">
            <iframe
              src="https://my.spline.design/untitled-copy-3d47946847c57d52af5e2d46f29f2a3b/"
              frameBorder="0"
              width="100%"
              height="100%"
              className="absolute inset-0"
              title="Visite Virtuelle 3D"
            />
            <div className="absolute inset-0 bg-brand-green/90 flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-500 text-center p-8">
              <h3 className="font-serif text-3xl text-white mb-4">
                Appartement F4 - Alger
              </h3>
              <p className="text-gray-300 mb-6">
                Découvrez nos agencements intérieurs en réalité virtuelle.
              </p>
              <Link
                to="/projects"
                className="bg-brand-gold text-white px-8 py-3 uppercase text-sm tracking-widest"
              >
                Voir les plans
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Apartment Types */}
      <section id="apartments" className="py-24 bg-brand-gray/30">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="text-center mb-16">
            <h4 className="text-brand-gold uppercase tracking-widest text-sm mb-2">
              Nos Biens
            </h4>
            <h2 className="font-serif text-4xl text-brand-green">
              Types d'Appartements
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* F2 */}
            <div className="bg-white p-6 border border-gray-100 hover:border-brand-gold transition-all duration-300 group cursor-pointer">
              <div className="h-40 bg-brand-gray mb-6 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=500&auto=format&fit=crop"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  alt="F2"
                />
              </div>
              <h3 className="font-serif text-2xl text-brand-green mb-2">F2</h3>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">
                60m² • 2 Pièces
              </p>
              <Link
                to="/apartments"
                className="text-brand-gold text-sm uppercase tracking-wider hover:text-brand-green transition-colors"
              >
                Voir détails &rarr;
              </Link>
            </div>
            {/* F3 */}
            <div className="bg-white p-6 border border-gray-100 hover:border-brand-gold transition-all duration-300 group cursor-pointer">
              <div className="h-40 bg-brand-gray mb-6 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=500&auto=format&fit=crop"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  alt="F3"
                />
              </div>
              <h3 className="font-serif text-2xl text-brand-green mb-2">F3</h3>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">
                85m² • 3 Pièces
              </p>
              <Link
                to="/apartments"
                className="text-brand-gold text-sm uppercase tracking-wider hover:text-brand-green transition-colors"
              >
                Voir détails &rarr;
              </Link>
            </div>
            {/* F4 */}
            <div className="bg-white p-6 border border-gray-100 hover:border-brand-gold transition-all duration-300 group cursor-pointer">
              <div className="h-40 bg-brand-gray mb-6 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?q=80&w=500&auto=format&fit=crop"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  alt="F4"
                />
              </div>
              <h3 className="font-serif text-2xl text-brand-green mb-2">F4</h3>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">
                110m² • 4 Pièces
              </p>
              <Link
                to="/apartments"
                className="text-brand-gold text-sm uppercase tracking-wider hover:text-brand-green transition-colors"
              >
                Voir détails &rarr;
              </Link>
            </div>
            {/* Duplex */}
            <div className="bg-white p-6 border border-gray-100 hover:border-brand-gold transition-all duration-300 group cursor-pointer">
              <div className="h-40 bg-brand-gray mb-6 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=500&auto=format&fit=crop"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  alt="Duplex"
                />
              </div>
              <h3 className="font-serif text-2xl text-brand-green mb-2">
                Duplex
              </h3>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">
                180m² • Vue Panoramique
              </p>
              <Link
                to="/apartments"
                className="text-brand-gold text-sm uppercase tracking-wider hover:text-brand-green transition-colors"
              >
                Voir détails &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="projects" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h4 className="text-brand-gold uppercase tracking-widest text-sm mb-2">
                Portfolio
              </h4>
              <h2 className="font-serif text-4xl text-brand-green">
                Projets en Vedette
              </h2>
            </div>
            <Link
              to="/projects"
              className="hidden md:block text-sm uppercase tracking-widest text-brand-green hover:text-brand-gold transition-colors"
            >
              Tout voir &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.slug}
                className="bg-white shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-500"
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-brand-green text-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <div className="font-serif text-5xl text-brand-gold mb-2">
                  {stat.value}
                </div>
                <p className="uppercase tracking-widest text-xs text-gray-300">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="text-center mb-16">
            <h4 className="text-brand-gold uppercase tracking-widest text-sm mb-2">
              Témoignages
            </h4>
            <h2 className="font-serif text-4xl text-brand-green">
              Ils Nous Font Confiance
            </h2>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory gap-8 pb-8 scrollbar-hide">
            {/* Testimonial 1 */}
            <div className="min-w-[300px] md:min-w-[400px] snap-center bg-brand-gray/20 p-8 flex-shrink-0">
              <div className="flex items-center mb-4 text-brand-gold">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 italic mb-6 font-light">
                "Un professionnalisme exemplaire. La livraison a été ponctuelle
                et la qualité des finitions dépasse nos attentes."
              </p>
              <div className="flex items-center">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  className="w-12 h-12 rounded-full mr-4"
                  alt="Karim B."
                />
                <div>
                  <h5 className="font-serif text-brand-green">Karim B.</h5>
                  <p className="text-xs text-gray-400">Acheteur F4, Alger</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="min-w-[300px] md:min-w-[400px] snap-center bg-brand-gray/20 p-8 flex-shrink-0">
              <div className="flex items-center mb-4 text-brand-gold">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 italic mb-6 font-light">
                "L'équipe de Proveco nous a accompagnés avec transparence. Un
                investissement rentable et sécurisé."
              </p>
              <div className="flex items-center">
                <img
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  className="w-12 h-12 rounded-full mr-4"
                  alt="Samira L."
                />
                <div>
                  <h5 className="font-serif text-brand-green">Samira L.</h5>
                  <p className="text-xs text-gray-400">Investisseuse, Oran</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
{/* Blog Section */}
<section id="blog" className="py-24 bg-brand-gray/30">
  <div className="max-w-7xl mx-auto px-6 sm:px-12">
    <div className="text-center mb-16">
      <h4 className="text-brand-gold uppercase tracking-widest text-sm mb-2">
        Conseils
      </h4>
      <h2 className="font-serif text-4xl text-brand-green">
        Comment investir dans l'immobilier en Algérie ?
      </h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {BLOG_POSTS.map((post) => (
        <div
          key={post.slug}
          className="bg-white border border-gray-100 hover:border-brand-gold transition-all duration-300 group cursor-pointer"
        >
          <div className="h-40 overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div className="p-6">
            <h3 className="font-serif text-lg text-brand-green mb-2">
              {post.title}
            </h3>
            <p className="text-gray-500 text-sm font-light mb-4">
              {post.excerpt}
            </p>
            <Link
              to={`/blog/${post.slug}`}
              className="text-brand-gold text-sm uppercase tracking-wider hover:text-brand-green transition-colors"
            >
              Lire l'article &rarr;
            </Link>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6 sm:px-12">
          <div className="text-center mb-16">
            <h4 className="text-brand-gold uppercase tracking-widest text-sm mb-2">
              FAQ
            </h4>
            <h2 className="font-serif text-4xl text-brand-green">
              Questions Fréquentes
            </h2>
          </div>
          <div className="space-y-4">
            <details className="group border-b border-brand-gray pb-4">
              <summary className="flex justify-between items-center cursor-pointer text-brand-green font-semibold py-4">
                Comment se déroule une acquisition chez PROVECO ?
                <span className="text-brand-gold transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="text-gray-500 font-light pb-4">
                Vous pouvez nous contacter via notre formulaire ou visiter notre
                bureau. Un conseiller vous guidera à travers les étapes de
                réservation, signature du contrat et paiement.
              </p>
            </details>
            <details className="group border-b border-brand-gray pb-4">
              <summary className="flex justify-between items-center cursor-pointer text-brand-green font-semibold py-4">
                Quelles sont les modalités de paiement proposées ?
                <span className="text-brand-gold transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="text-gray-500 font-light pb-4">
                Nous acceptons les paiements en espèces, virements bancaires et
                facilités de paiement échelonné sur la durée de construction.
              </p>
            </details>
            <details className="group border-b border-brand-gray pb-4">
              <summary className="flex justify-between items-center cursor-pointer text-brand-green font-semibold py-4">
                Les résidences sont-elles livrées avec des finitions complètes ?
                <span className="text-brand-gold transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="text-gray-500 font-light pb-4">
                Oui, tous nos projets sont livrés avec des finitions haut de
                gamme, prêts à être meublés. Nous incluons la menuiserie, la
                plomberie et l'électricité.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/21321000000"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors z-50 flex items-center justify-center group"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </>
  );
}
