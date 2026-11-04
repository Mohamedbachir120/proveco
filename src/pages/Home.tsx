import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProjects } from "../services/projects.service";
import type { Project } from "../types/project";
import ProjectCard from "../components/ProjectCard";
import ContactSection from "../components/ContactSection";
import heroCoralliumNight from "../assets/hero-corallium-night.jpg";
import aboutProjectImage from "../assets/facade-residence-savoie-hydra-alger.jpeg";

const STATS = [
  { value: "6", label: "Résidences d'Exception" },
  { value: "270+", label: "Logements & Duplex" },
  { value: "12+", label: "Années d'Excellence" },
  { value: "100%", label: "Engagements & Délais Tenus" },
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

  useEffect(() => {
    getProjects().then((all) => setProjects(all.slice(0, 3)));
  }, []);

  return (
    <>
      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroCoralliumNight}
            alt="Résidence Corallium - Vue 3D extérieure"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 image-overlay" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
          <p className="text-brand-gold uppercase tracking-[0.2em] mb-4 text-sm md:text-base font-semibold">
            Proveco Promotion
          </p>
          <h1 className="font-serif text-4xl md:text-6xl text-white leading-tight mb-8">
            Pas pour tout le monde, <br />
            <span className="italic">et c’est précisément ce qui nous définit.</span>
          </h1>
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
                src={aboutProjectImage}
                alt="Architecture de la Résidence Savoie à Hydra par PROVECO"
                className="relative z-10 w-full shadow-lg hover:scale-[1.02] transition-all duration-500"
              />
            </div>
            <div>
              <h4 className="text-brand-gold uppercase tracking-widest text-sm mb-2">
                Notre conviction
              </h4>
              <h2 className="font-serif text-4xl text-brand-green mb-8">
                Ce qui nous distingue
              </h2>
              <p className="text-gray-500 leading-relaxed mb-6 font-light">
                L’immobilier évolue. Les standards aussi. Une nouvelle génération
                d’acquéreurs ne cherche plus simplement à acheter, mais à faire un
                choix cohérent, durable et maîtrisé. PROVECO s’inscrit dans cette
                évolution avec rigueur, sélection stricte des emplacements et
                exigence constante dans l’exécution.
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
              to="/projects"
              className="bg-brand-gold text-white px-8 py-4 uppercase tracking-widest text-sm hover:bg-opacity-90 transition-all duration-300 shadow-lg"
            >
              Voir les opportunités
            </Link>
            <Link
              to="/contact"
              className="border border-white text-white px-8 py-4 uppercase tracking-widest text-sm hover:bg-white hover:text-brand-green transition-all duration-300"
            >
              Être conseillé gratuitement
            </Link>
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
                1. On vous écoute
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
                2. On vous guide
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
                3. On vous protège
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
                4. On livre ce qu'on a promis
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

      {/* Featured Projects Section */}
      <section id="projects" className="py-24 bg-brand-gray/30">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h4 className="text-brand-gold uppercase tracking-widest text-sm mb-2">
                Portfolio
              </h4>
              <h2 className="font-serif text-4xl text-brand-green">
                Nos réalisations
              </h2>
            </div>
            <Link
              to="/projects"
              className="hidden md:block text-sm uppercase tracking-widest text-brand-green hover:text-brand-gold transition-colors font-medium"
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Testimonial 1 */}
            <div className="bg-brand-gray/20 p-8 md:p-10 border border-brand-gray/40 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center mb-6 text-brand-gold">
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
                <p className="text-gray-700 italic mb-8 font-light leading-relaxed text-base">
                  « Un professionnalisme exemplaire. La livraison a été ponctuelle, le suivi de chantier irréprochable et la qualité des finitions dépasse nos attentes. PROVECO a su instaurer un vrai climat de confiance. »
                </p>
              </div>
              <div className="flex items-center pt-4 border-t border-brand-gray/30">
                <div className="w-12 h-12 rounded-full bg-brand-green text-brand-gold border border-brand-gold/40 flex items-center justify-center font-serif font-bold text-base mr-4 shadow-sm">
                  KB
                </div>
                <div>
                  <h5 className="font-serif text-brand-green font-semibold text-base">Karim B.</h5>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Acheteur F4, Résidence Savoie, Alger</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-brand-gray/20 p-8 md:p-10 border border-brand-gray/40 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center mb-6 text-brand-gold">
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
                <p className="text-gray-700 italic mb-8 font-light leading-relaxed text-base">
                  « L'équipe de PROVECO nous a accompagnés avec une transparence exemplaire. Un investissement patrimonial rentable et parfaitement sécurisé, mené avec une réelle rigueur. »
                </p>
              </div>
              <div className="flex items-center pt-4 border-t border-brand-gray/30">
                <div className="w-12 h-12 rounded-full bg-brand-green text-brand-gold border border-brand-gold/40 flex items-center justify-center font-serif font-bold text-base mr-4 shadow-sm">
                  SL
                </div>
                <div>
                  <h5 className="font-serif text-brand-green font-semibold text-base">Samira L.</h5>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Investisseuse, Hydra, Alger</p>
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
            <details className="group border-b border-brand-gray pb-4" open>
              <summary className="flex justify-between items-center cursor-pointer text-brand-green font-semibold py-4 text-left">
                <span>Comment se déroule une acquisition chez PROVECO ?</span>
                <span className="text-brand-gold transition-transform duration-300 group-open:rotate-45 ml-4 flex-shrink-0">
                  +
                </span>
              </summary>
              <p className="text-gray-600 font-light pb-4 leading-relaxed text-sm md:text-base">
                L'acquisition d'un appartement neuf chez PROVECO suit un parcours clair, conçu pour accompagner chaque acquéreur à chaque étape de son projet immobilier. Après la découverte du programme immobilier neuf, vous pouvez sélectionner le logement qui correspond à vos besoins au sein de l’une de nos résidences d’exception, obtenir toutes les informations relatives aux démarches d'acquisition, aux modalités de paiement et au déroulement du projet. Les étapes peuvent varier selon la résidence et son état d'avancement. Pour connaître les conditions applicables à un programme immobilier en particulier, nous vous invitons à consulter sa page dédiée ou à contacter l'équipe commerciale de PROVECO promotion, qui vous accompagnera tout au long de votre achat immobilier en Algérie.
              </p>
            </details>
            <details className="group border-b border-brand-gray pb-4">
              <summary className="flex justify-between items-center cursor-pointer text-brand-green font-semibold py-4 text-left">
                <span>Quelles sont les modalités de paiement proposées ?</span>
                <span className="text-brand-gold transition-transform duration-300 group-open:rotate-45 ml-4 flex-shrink-0">
                  +
                </span>
              </summary>
              <p className="text-gray-600 font-light pb-4 leading-relaxed text-sm md:text-base">
                Les modalités de paiement proposées par PROVECO promotion dépendent du programme immobilier concerné. Lors de votre projet d'acquisition d'un appartement neuf, l'équipe vous présente les différentes conditions de paiement applicables ainsi que les échéances prévues pour la résidence choisie. Cette approche vous permet de préparer votre investissement avec une vision claire des démarches à suivre. Pour obtenir les modalités de paiement d'un programme immobilier neuf en particulier, nous vous invitons à contacter notre équipe commerciale.
              </p>
            </details>
            <details className="group border-b border-brand-gray pb-4">
              <summary className="flex justify-between items-center cursor-pointer text-brand-green font-semibold py-4 text-left">
                <span>Les résidences sont-elles livrées avec des finitions complètes ?</span>
                <span className="text-brand-gold transition-transform duration-300 group-open:rotate-45 ml-4 flex-shrink-0">
                  +
                </span>
              </summary>
              <p className="text-gray-600 font-light pb-4 leading-relaxed text-sm md:text-base">
                Les prestations et le niveau de finition d'un appartement neuf varient selon le programme immobilier concerné. Avant toute acquisition, PROVECO promotion présente en toute transparence les finitions, les équipements et les caractéristiques du logement afin que chaque acquéreur dispose d'une information claire avant son achat. Pour connaître les prestations prévues dans une résidence neuve en particulier, nous vous invitons à consulter la page du programme immobilier concerné ou à contacter l'équipe de PROVECO promotion immobilière.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/213560174078"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors z-50 flex items-center justify-center group"
        aria-label="Contacter sur WhatsApp"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </>
  );
}
