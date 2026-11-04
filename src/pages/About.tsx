import savoieFacade from "../assets/architecture-facade-residence-savoie-hydra.jpeg";

export default function About() {
  return (
    <>
      {/* Section Introduction */}
      <section className="pt-40 pb-16 bg-brand-gray/20">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <span className="text-brand-gold uppercase tracking-[0.3em] text-xs mb-4 block">
            Notre conviction
          </span>
          <h1 className="font-serif text-5xl md:text-6xl text-brand-green mb-6">
            Ce qui nous distingue
          </h1>
          <p className="text-gray-600 max-w-2xl text-lg leading-relaxed">
            PROVECO Promotion redéfinit les standards de l'immobilier en
            Algérie. Nous créons des lieux de vie alliant esthétique moderne,
            confort et durabilité.
          </p>
        </div>
      </section>

      {/* Section Détails & Engagements */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            
            {/* Colonne Gauche : Visuel */}
            <div className="relative sticky top-8">
              <div className="absolute -top-4 -left-4 w-full h-full border border-brand-gold z-0 hidden md:block" />
              <img
                src={savoieFacade}
                alt="Architecture de la Résidence Savoie à Hydra par PROVECO"
                className="relative z-10 w-full shadow-lg hover:scale-[1.02] transition-all duration-500"
              />
            </div>

            {/* Colonne Droite : Textes réorganisés */}
            <div>
              <span className="text-brand-gold uppercase tracking-widest text-xs font-semibold mb-3 block">
                L’immobilier évolue. Les standards aussi.
              </span>
              
              {/* Paragraphe d'accroche valorisé */}
              <p className="text-gray-800 text-xl font-light leading-relaxed mb-8">
                Une nouvelle génération d’acquéreurs ne cherche plus simplement
                à acheter, mais à faire un choix cohérent, durable et maîtrisé.
              </p>

              {/* Piliers d'informations basés sur votre contenu */}
              <div className="space-y-8">
                <div className="border-l-2 border-brand-gold/30 pl-4">
                  <h5 className="text-brand-green font-serif text-lg font-medium mb-2">
                    Une approche rigoureuse
                  </h5>
                  <p className="text-gray-500 leading-relaxed font-light text-sm md:text-base">
                    PROVECO Promotion s’inscrit dans cette évolution. Avec une
                    approche fondée sur la rigueur, la sélection des emplacements et
                    une exigence constante dans l’exécution, nous développons des
                    résidences haut standing et des duplex premium à Alger.
                  </p>
                </div>

                <div className="border-l-2 border-brand-gold/30 pl-4">
                  <h5 className="text-brand-green font-serif text-lg font-medium mb-2">
                    Une conception cohérente
                  </h5>
                  <p className="text-gray-500 leading-relaxed font-light text-sm md:text-base">
                    Chaque projet est pensé comme un ensemble cohérent : architecture,
                    matériaux, fonctionnalité, environnement. Rien n’est accessoire,
                    tout est structuré. Notre engagement dépasse la construction.
                  </p>
                </div>

                <div className="border-l-2 border-brand-gold/30 pl-4">
                  <h5 className="text-brand-green font-serif text-lg font-medium mb-2">
                    Un accompagnement serein
                  </h5>
                  <p className="text-gray-500 leading-relaxed font-light text-sm md:text-base">
                    Nous apportons clarté, accompagnement et sécurité à chaque
                    étape, pour permettre des décisions sereines et éclairées. Parce
                    qu’aujourd’hui, investir dans l’immobilier doit être aussi
                    stratégique qu’évident.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}