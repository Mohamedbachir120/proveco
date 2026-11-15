import { Link } from "react-router-dom";
import savoieFacade from "../assets/architecture-facade-residence-savoie-hydra.webp";
import { CurtainImage, Eyebrow, Reveal, SplitLines, Stagger, StaggerItem } from "../components/motion";

export default function About() {

  return (
    <>
      {/* Section Introduction */}
      <section className="pt-44 pb-20 md:pb-28 bg-brand-gray/30">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <Eyebrow className="mb-6">Notre conviction</Eyebrow>
          <SplitLines
            as="h1"
            immediate
            delay={0.9}
            className="font-serif text-5xl md:text-8xl text-brand-green mb-10 leading-[1.02]"
            lines={["Ce qui nous distingue"]}
          />
          <Reveal delay={1.1}>
          <p className="text-gray-600 max-w-2xl text-lg md:text-xl leading-relaxed font-light">
            PROVECO Promotion redéfinit les standards de l'immobilier en
            Algérie. Nous créons des lieux de vie alliant esthétique moderne,
            confort et durabilité.
          </p>
          </Reveal>
        </div>
      </section>

      {/* Section Détails & Engagements */}
      <section className="py-24 md:py-36 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            
            {/* Colonne Gauche : Visuel */}
            <div className="relative md:sticky md:top-28">
              <div className="absolute -top-5 -left-5 w-full h-full border border-brand-gold/60 z-0 hidden md:block" />
              <CurtainImage
                src={savoieFacade}
                alt="Architecture de la Résidence Savoie à Hydra par PROVECO"
                className="relative z-10 aspect-[4/5] shadow-2xl"
                parallax={6}
              />
            </div>

            {/* Colonne Droite : Textes réorganisés */}
            <div className="md:pt-16">
              <span className="text-brand-gold uppercase tracking-widest text-xs font-semibold mb-3 block">
                L’immobilier évolue. Les standards aussi.
              </span>
              
              {/* Paragraphe d'accroche valorisé */}
              <Reveal>
              <p className="font-serif text-brand-green text-2xl md:text-3xl leading-snug mb-14">
                Une nouvelle génération d’acquéreurs ne cherche plus simplement
                à acheter, mais à faire un choix cohérent, durable et maîtrisé.
              </p>
              </Reveal>

              {/* Piliers d'informations basés sur votre contenu */}
              <Stagger className="space-y-12" stagger={0.15}>
                <StaggerItem className="group relative pl-20">
                  <span className="absolute left-0 top-0 font-serif text-5xl text-brand-gold/30 group-hover:text-brand-gold transition-colors duration-700">01</span>
                  <h5 className="text-brand-green font-serif text-2xl mb-3">
                    Une approche rigoureuse
                  </h5>
                  <p className="text-gray-500 leading-relaxed font-light text-sm md:text-base">
                    PROVECO Promotion s’inscrit dans cette évolution. Avec une
                    approche fondée sur la rigueur, la sélection des emplacements et
                    une exigence constante dans l’exécution, nous développons des
                    résidences haut standing et des duplex premium à Alger.
                  </p>
                </StaggerItem>

                <StaggerItem className="group relative pl-20">
                  <span className="absolute left-0 top-0 font-serif text-5xl text-brand-gold/30 group-hover:text-brand-gold transition-colors duration-700">02</span>
                  <h5 className="text-brand-green font-serif text-2xl mb-3">
                    Une conception cohérente
                  </h5>
                  <p className="text-gray-500 leading-relaxed font-light text-sm md:text-base">
                    Chaque projet est pensé comme un ensemble cohérent : architecture,
                    matériaux, fonctionnalité, environnement. Rien n’est accessoire,
                    tout est structuré. Notre engagement dépasse la construction.
                  </p>
                </StaggerItem>

                <StaggerItem className="group relative pl-20">
                  <span className="absolute left-0 top-0 font-serif text-5xl text-brand-gold/30 group-hover:text-brand-gold transition-colors duration-700">03</span>
                  <h5 className="text-brand-green font-serif text-2xl mb-3">
                    Un accompagnement serein
                  </h5>
                  <p className="text-gray-500 leading-relaxed font-light text-sm md:text-base">
                    Nous apportons clarté, accompagnement et sécurité à chaque
                    étape, pour permettre des décisions sereines et éclairées. Parce
                    qu’aujourd’hui, investir dans l’immobilier doit être aussi
                    stratégique qu’évident.
                  </p>
                </StaggerItem>
              </Stagger>

              <Reveal className="pt-14">
                <Link
                  to="/contact"
                  className="btn-fill bg-brand-green border border-brand-green text-white px-9 py-4 uppercase tracking-[0.2em] text-xs font-medium cursor-pointer"
                >
                  Échanger avec notre équipe
                </Link>
              </Reveal>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}