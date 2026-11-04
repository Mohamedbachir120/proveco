// This replaces projects.json as the source of truth for project data.
// Local images must be imported (not referenced as bare strings) so Vite
// bundles and hashes them correctly. Run rename-assets.sh first so these
// filenames match what's on disk.
//
// Madeleine 1 / Madeleine 2 are NOT included yet — see note at the bottom.

import type { Project } from "../types/project";

// --- Corallium ---
import coralliumExterieure from "../assets/vue-exterieure-residence-corallium-tixeraine.png";
import coralliumAcces from "../assets/acces-vehicules-residence-corallium-tixeraine.png";
import coralliumEnsemble from "../assets/ensemble-residentiel-corallium-tixeraine-alger.png";
import coralliumSalon from "../assets/salon-salle-a-manger-residence-corallium-tixeraine.png";
import coralliumCuisine from "../assets/cuisine-equipee-appartement-corallium-tixeraine.png";
import coralliumChambre from "../assets/chambre-appartement-corallium-tixeraine.png";
import coralliumChambreEnfants from "../assets/chambre-enfants-appartement-corallium-tixeraine.png";

// --- Poirson ---
import poirsonChantierFacade from "../assets/chantier-facade-residence-poirson-el-biar.png";
import poirsonChantier from "../assets/chantier-residence-poirson-el-biar.png";

// --- Savoie ---
import savoieFacade from "../assets/facade-residence-savoie-hydra-alger.jpeg";
import savoieFacadeNuit from "../assets/facade-nuit-residence-savoie-hydra.jpeg";
import savoieLaterale from "../assets/architecture-facade-residence-savoie-hydra.jpeg";

// --- Victoria ---
import victoriaFacade from "../assets/facade-residence-victoria-hydra.png";
import victoriaContrePlongee from "../assets/architecture-residence-victoria-hydra.jpeg";
import victoriaAngle from "../assets/facade-angle-residence-victoria-hydra.jpeg";
import victoriaAttique from "../assets/attique-terrasse-residence-victoria-hydra.jpeg";
import victoriaTerrasse from "../assets/terrasse-attique-residence-victoria-hydra.png";

// --- Madeleine 1 ---
import madeleine1Facade from "../assets/facade-residence-madeleine-1-hydra.png";
import madeleine1Entree from "../assets/entree-residence-madeleine-1-hydra.png";
import madeleine1Angle from "../assets/vue-angle-residence-madeleine-1-hydra.jpeg";

// --- Madeleine 2 ---
import madeleine2Facade from "../assets/facade-residence-madeleine-2-hydra.png";
import madeleine2Balcons from "../assets/balcons-residence-madeleine-2-hydra.png";
import madeleine2Entree from "../assets/entree-securisee-residence-madeleine-2-hydra.jpeg";

export const projects: Project[] = [
  {
    slug: "corallium",
    name: "Résidence Corallium",
    location: "Tixeraïne",
    area: "Tixeraïne",
    units: "172 Appartements & Services",
    status: "en_cours",
    image: coralliumExterieure,
    imageAlt:
      "Projection extérieure de la Résidence Corallium à Tixeraïne avec balcons courbes et entrée principale",
    gallery: [
      {
        src: coralliumExterieure,
        alt: "Projection extérieure de la Résidence Corallium à Tixeraïne avec balcons courbes et entrée principale",
        title: "Architecture extérieure de Corallium",
        caption:
          "Projection architecturale de la Résidence Corallium à Tixeraïne, avec son entrée principale et ses balcons aux lignes courbes.",
      },
      {
        src: coralliumAcces,
        alt: "Projection de l'accès automobile de la Résidence Corallium à Tixeraïne avec voie de circulation couverte",
        title: "Accès extérieur de la Résidence Corallium",
        caption: "Projection de la voie d'accès automobile et de l'espace couvert de la Résidence Corallium.",
      },
      {
        src: coralliumEnsemble,
        alt: "Projection d'ensemble de la Résidence Corallium à Tixeraïne avec deux bâtiments, balcons courbes et espaces paysagers",
        title: "Vue générale du programme Corallium",
        caption: "Projection architecturale de l'ensemble résidentiel Corallium à Tixeraïne et de ses espaces extérieurs.",
      },
      {
        src: coralliumSalon,
        alt: "Projection du salon et de la salle à manger d'un appartement de la Résidence Corallium à Tixeraïne",
        title: "Espace de vie ouvert de la Résidence Corallium",
        caption: "Projection d'un espace de vie réunissant salon et salle à manger au sein de la Résidence Corallium.",
      },
      {
        src: coralliumCuisine,
        alt: "Projection d'une cuisine équipée avec espace repas dans un appartement de la Résidence Corallium",
        title: "Cuisine et espace repas de Corallium",
        caption: "Projection d'une cuisine aménagée avec rangements intégrés et espace repas.",
      },
      {
        src: coralliumChambre,
        alt: "Projection d'une chambre avec lit double et dressing intégré dans un appartement de la Résidence Corallium",
        title: "Chambre avec rangements intégrés à Corallium",
        caption: "Projection d'une chambre aménagée avec dressing intégré et mobilier contemporain.",
      },
      {
        src: coralliumChambreEnfants,
        alt: "Projection d'une chambre d'enfants avec deux lits, rangements et bureau dans un appartement de la Résidence Corallium",
        title: "Chambre d'enfants aménagée à Corallium",
        caption: "Projection d'une chambre d'enfants fonctionnelle avec deux couchages, rangements intégrés et espace bureau.",
      },
    ],
    title: "Résidence Corallium Alger : Programme immobilier haut standing",
    metaDescription:
      "À Tixeraïne, un programme résidentiel moderne de 172 appartements avec des espaces de services de premier plan, pensé pour une nouvelle qualité de vie à Alger.",
    heroTagline: "Une nouvelle centralité résidentielle à Alger",
    deliveredRange: "Lancé en janvier 2024, en cours de réalisation",
    sections: [
      {
        heading: "Une implantation stratégique à Tixeraïne",
        level: "h2",
        paragraphs: [
          "Située à Tixeraïne, la Résidence Corallium s'inscrit dans une dynamique urbaine en transformation au sein d'Alger.",
          "Ce secteur en évolution attire aujourd'hui une nouvelle génération d'acquéreurs à la recherche d'un compromis entre accessibilité, modernité et qualité résidentielle.",
        ],
      },
      {
        heading: "Une opération résidentielle à grande échelle",
        level: "h2",
        paragraphs: [
          "Avec 172 logements, Corallium se distingue par son format structurant, rare dans le segment de la promotion immobilière de luxe à Alger.",
        ],
        bullets: [
          "Typologies F3 et F4 adaptées aux usages contemporains",
          "Ensemble en R+12 avec attique",
          "Trois niveaux de sous-sol intégrés",
          "Volumétrie pensée pour optimiser densité et confort",
        ],
      },
      {
        heading: "Une ville verticale pensée pour le quotidien",
        level: "h2",
        bullets: [
          "Espaces de services dédiés en pied d'immeuble",
          "Accès direct aux commodités essentielles",
          "Circulation simplifiée au sein du projet",
          "Centralité interne pour réduire les déplacements",
        ],
      },
      {
        heading: "Une position forte dans le marché d'Alger",
        level: "h2",
        bullets: [
          "Forte attractivité pour les familles urbaines",
          "Demande locative soutenue",
          "Potentiel de valorisation à moyen terme",
          "Positionnement sur un segment accessible et dynamique",
        ],
      },
    ],
  },
  {
    slug: "poirson",
    name: "Résidence Poirson",
    location: "El Biar (Saint-Michel)",
    area: "El Biar",
    units: "Projet Privé de 7 Logements",
    status: "finalisation",
    image: poirsonChantierFacade,
    imageAlt: "Façade en construction de la Résidence Poirson à El Biar avec échafaudages",
    gallery: [
      {
        src: poirsonChantierFacade,
        alt: "Façade en construction de la Résidence Poirson à El Biar avec échafaudages",
        title: "Travaux de façade de la Résidence Poirson",
        caption: "Avancement des travaux de façade de la Résidence Poirson à Saint-Michel, El Biar.",
      },
      {
        src: poirsonChantier,
        alt: "Façade en chantier de la Résidence Poirson à Saint-Michel, El Biar, avec échafaudages",
        title: "Avancement de la Résidence Poirson",
        caption: "La Résidence Poirson à Saint-Michel en phase de finalisation extérieure.",
      },
    ],
    title: "Résidence Poirson à El Biar, signature immobilière d'exception Alger",
    metaDescription:
      "El Biar Saint-Michel : résidence rare de 7 unités, pensée comme un projet privé au cœur du secteur le plus recherché d'Alger.",
    heroTagline: "Poirson, une résidence pensée comme un projet privé",
    sections: [
      {
        heading: "Un projet qui ne cherche pas à exister partout",
        level: "h2",
        paragraphs: [
          "Située dans le secteur Saint-Michel, au sein d'El Biar, à proximité immédiate de l'Institut Cervantes, elle s'inscrit dans un tissu urbain déjà établi, stable et reconnu d'Alger.",
          "Ici, le projet ne modifie pas le quartier. Il s'y adapte.",
        ],
      },
      {
        heading: "Une architecture de la réduction volontaire",
        level: "h2",
        paragraphs: ["Avec seulement sept logements, la logique de conception est simple : retirer le superflu pour renforcer l'essentiel."],
        bullets: ["Moins de densité, plus de respiration", "Moins de volume, plus de cohérence", "Moins d'exposition, plus d'intimité"],
      },
      {
        heading: "Une organisation interne pensée comme une continuité",
        level: "h3",
        bullets: [
          "Rez-de-chaussée : espaces adaptés aux usages quotidiens",
          "Étages intermédiaires : configurations équilibrées",
          "Dernier niveau : attique conçu comme une unité autonome",
        ],
      },
      {
        heading: "Un environnement déjà mature",
        level: "h2",
        bullets: ["Continuité résidentielle", "Présence d'équipements établis", "Accessibilité maîtrisée", "Environnement calme et structuré"],
      },
    ],
  },
  {
    slug: "savoie",
    name: "Résidence Savoie",
    location: "Hydra",
    area: "Hydra",
    units: "Haut Standing (24 Logements)",
    status: "livre",
    image: savoieFacade,
    imageAlt: "Façade de la Résidence Savoie à Hydra avec balcons vitrés et entrée principale",
    gallery: [
      {
        src: savoieFacade,
        alt: "Façade de la Résidence Savoie à Hydra avec balcons vitrés et entrée principale",
        title: "Façade et balcons de la Résidence Savoie",
        caption: "Façade principale de la Résidence Savoie à Hydra, reconnaissable à ses lignes contemporaines et à ses balcons vitrés.",
      },
      {
        src: savoieFacadeNuit,
        alt: "Façade éclairée de nuit de la Résidence Savoie à Hydra avec balcons vitrés",
        title: "Résidence Savoie éclairée en soirée",
        caption: "Vue nocturne de la façade et de l'entrée principale de la Résidence Savoie à Hydra.",
      },
      {
        src: savoieLaterale,
        alt: "Vue latérale de la Résidence Savoie à Hydra avec balcons vitrés et façades en relief",
        title: "Architecture extérieure de la Résidence Savoie",
        caption: "Une vue en contre-plongée qui met en valeur les volumes et les balcons vitrés de la résidence.",
      },
    ],
    title: "Résidence Savoie : appartements haut standing à Hydra, Alger",
    metaDescription: "Résidence Savoie à Hydra : appartements de luxe, cadre sécurisé et prestations premium au cœur d'Alger.",
    heroTagline: "L'élégance résidentielle au cœur d'Alger, à Hydra",
    deliveredRange: "Réalisée entre 2019 et 2021",
    sections: [
      {
        heading: "Le privilège d'une adresse d'exception",
        level: "h2",
        paragraphs: [
          "Idéalement située au cœur d'Hydra, la Résidence Savoie bénéficie d'un emplacement rare dans l'un des secteurs les plus recherchés d'Alger.",
          "Ce quartier emblématique séduit par son calme, sa sécurité et sa proximité immédiate avec les axes stratégiques, les écoles renommées et les centres d'affaires.",
        ],
      },
      {
        heading: "Des appartements conçus pour durer",
        level: "h3",
        paragraphs: ["Composée de 24 logements répartis sur un ensemble harmonieux en R+4 avec sous-sols, la résidence propose des configurations adaptées aux attentes d'une clientèle exigeante :"],
        bullets: ["Appartements F3 et F4 aux volumes généreux", "Distribution optimisée des espaces de vie", "Luminosité naturelle dans chaque pièce", "Finitions soignées et matériaux de qualité"],
      },
      {
        heading: "Un confort absolu au quotidien",
        level: "h3",
        bullets: ["Parkings en sous-sol sécurisés", "Accès contrôlé et environnement résidentiel calme", "Parties communes élégantes et entretenues", "Isolation thermique et acoustique performante"],
      },
      {
        heading: "Un investissement sûr et pérenne",
        level: "h2",
        bullets: ["Emplacement premium à forte demande", "Rareté du foncier à Cité Malki", "Potentiel de valorisation élevé", "Excellente stabilité du marché"],
      },
    ],
  },
  {
    slug: "victoria",
    name: "Résidence Victoria",
    location: "Hydra (Parmentier)",
    area: "Hydra",
    units: "8 Appartements Exclusifs",
    status: "livre",
    image: victoriaFacade,
    imageAlt: "Façade de la Résidence Victoria à Hydra avec balcons vitrés et terrasse au dernier étage",
    gallery: [
      {
        src: victoriaFacade,
        alt: "Façade de la Résidence Victoria à Hydra avec balcons vitrés et terrasse au dernier étage",
        title: "Façade extérieure de la Résidence Victoria",
        caption: "Architecture extérieure de la Résidence Victoria, située dans le quartier Parmentier à Hydra.",
      },
      {
        src: victoriaContrePlongee,
        alt: "Façade de la Résidence Victoria à Hydra vue en contre-plongée avec balcons vitrés",
        title: "Vue architecturale de la Résidence Victoria",
        caption: "Vue en contre-plongée mettant en valeur les lignes sobres et les balcons de la Résidence Victoria à Hydra.",
      },
      {
        src: victoriaAngle,
        alt: "Vue d'angle de la Résidence Victoria à Hydra avec balcons vitrés et terrasse supérieure",
        title: "Façade et balcons de la Résidence Victoria",
        caption: "Vue d'angle de la Résidence Victoria mettant en valeur la succession des balcons et le dernier niveau.",
      },
      {
        src: victoriaAttique,
        alt: "Dernier niveau de la Résidence Victoria à Hydra avec terrasse vitrée et plantations",
        title: "Terrasse de l'attique de la Résidence Victoria",
        caption: "Le dernier niveau de la Résidence Victoria, avec sa terrasse bordée de garde-corps vitrés.",
      },
      {
        src: victoriaTerrasse,
        alt: "Terrasse de l'attique de la Résidence Victoria à Hydra avec garde-corps vitrés et plantations",
        title: "Espace extérieur de l'attique Victoria",
        caption: "Vue rapprochée de la terrasse végétalisée située au dernier niveau de la Résidence Victoria.",
      },
    ],
    title: "Résidence Victoria à Hydra, Immobilier d'exception à Alger",
    metaDescription: "À Hydra, une résidence confidentielle de 8 appartements offrant un cadre de vie exclusif et un investissement patrimonial sécurisé.",
    heroTagline: "Un lieu pensé pour ceux qui choisissent sans compromis",
    deliveredRange: "Livrée entre 2016 et 2019",
    sections: [
      {
        heading: "Vivre Hydra autrement",
        level: "h2",
        paragraphs: [
          "Nichée dans le quartier recherché de Parmentier, au cœur d'Alger, la Résidence Victoria s'adresse à une clientèle qui privilégie la qualité à la quantité, la discrétion à l'exposition.",
          "Ici, vous n'achetez pas un bien. Vous choisissez un cadre de vie.",
        ],
      },
      {
        heading: "Des espaces conçus pour durer",
        level: "h3",
        bullets: [
          "Typologies F3 et F4 pensées pour un usage réel",
          "Attique F5 offrant un niveau de confort supérieur",
          "Équilibre entre volumes, fonctionnalité et circulation",
          "Architecture sobre, intemporelle",
        ],
      },
      {
        heading: "Un choix rationnel dans un marché émotionnel",
        level: "h2",
        bullets: ["Offre limitée → pression de la demande", "Emplacement stable → sécurité patrimoniale", "Produit rare → meilleure liquidité à la revente"],
      },
    ],
  },
  {
    slug: "madeleine-1",
    name: "Résidence Madeleine 1",
    location: "Hydra",
    area: "Hydra",
    units: "27 Logements & Duplex",
    status: "livre",
    image: madeleine1Facade,
    imageAlt: "Façade de la Résidence Madeleine 1 à Hydra avec balcons contemporains",
    gallery: [
      {
        src: madeleine1Facade,
        alt: "Façade de la Résidence Madeleine 1 à Hydra avec balcons contemporains",
        title: "Façade principale de la Résidence Madeleine 1",
        caption: "Architecture extérieure de la Résidence Madeleine 1, située au cœur d'Hydra à proximité de l'école Éveil Scolaire.",
      },
      {
        src: madeleine1Entree,
        alt: "Entrée principale et hall de la Résidence Madeleine 1 à Hydra",
        title: "Entrée de la Résidence Madeleine 1",
        caption: "Accès piéton et entrée sécurisée de la Résidence Madeleine 1 à Hydra.",
      },
      {
        src: madeleine1Angle,
        alt: "Vue d'angle extérieure de la Résidence Madeleine 1 à Hydra",
        title: "Vue d'angle de la Résidence Madeleine 1",
        caption: "Perspective mettant en valeur les volumes harmonieux et les finitions soignées de la Résidence Madeleine 1.",
      },
    ],
    title: "Résidence de luxe à Hydra Appartements haut standing Alger",
    metaDescription: "À Hydra, découvrez une résidence haut standing avec appartements raffinés et duplex premium dans un cadre exclusif à Alger.",
    heroTagline: "Vivre Hydra autrement, Une signature résidentielle d'exception",
    deliveredRange: "Réalisée entre 2013 et 2015",
    sections: [
      {
        heading: "Une adresse rare au cœur d'Hydra",
        level: "h2",
        paragraphs: [
          "Au sein d'Hydra, l'une des localisations les plus exclusives d'Alger, cette résidence incarne une vision contemporaine du haut standing.",
          "À proximité immédiate de l'école Éveil Scolaire, elle bénéficie d'un environnement résidentiel recherché, alliant discrétion, sécurité et accessibilité.",
          "Une adresse confidentielle destinée à ceux qui privilégient l'excellence.",
        ],
      },
      {
        heading: "Une architecture pensée pour l'exigence",
        level: "h2",
        paragraphs: [
          "Cette réalisation s'inscrit dans une logique de promotion immobilière de luxe à Alger, où l'équilibre entre esthétique, fonctionnalité et durabilité est parfaitement maîtrisé.",
        ],
      },
      {
        heading: "Des appartements aux standards élevés",
        level: "h3",
        paragraphs: [
          "Composée de 27 unités réparties sur un ensemble harmonieux en R+6 avec sous-sol, la résidence propose une sélection raffinée d'appartements :",
        ],
        bullets: [
          "Appartements F3 et F4 conçus pour un confort optimal",
          "Agencements modernes et fluides",
          "Espaces de vie lumineux et ouverts",
          "Finitions soignées dans les moindres détails",
          "Au sommet, un duplex d'exception vient sublimer l'ensemble",
        ],
      },
      {
        heading: "Une expérience de confort maîtrisée",
        level: "h3",
        bullets: [
          "Stationnement sécurisé en sous-sol",
          "Accès contrôlé garantissant tranquillité et intimité",
          "Parties communes élégantes et durables",
          "Conception favorisant bien-être thermique et acoustique",
        ],
      },
      {
        heading: "Le privilège d'un quotidien simplifié",
        level: "h2",
        bullets: [
          "Proximité immédiate des établissements scolaires réputés",
          "Accès rapide aux commodités et services essentiels",
          "Connexion fluide aux principaux axes du Grand Alger",
        ],
      },
      {
        heading: "Une réalisation livrée, une confiance établie",
        level: "h2",
        bullets: [
          "Projet livré et opérationnel",
          "Qualité de construction éprouvée",
          "Environnement résidentiel mature",
        ],
      },
    ],
  },
  {
    slug: "madeleine-2",
    name: "Résidence Madeleine 2",
    location: "Hydra",
    area: "Hydra",
    units: "32 Logements & Duplex",
    status: "livre",
    image: madeleine2Facade,
    imageAlt: "Façade moderne de la Résidence Madeleine 2 à Hydra avec balcons filants",
    gallery: [
      {
        src: madeleine2Facade,
        alt: "Façade moderne de la Résidence Madeleine 2 à Hydra avec balcons filants",
        title: "Façade principale de la Résidence Madeleine 2",
        caption: "Vue de la façade principale de la Résidence Madeleine 2 à Hydra, alliant modernité et élégance.",
      },
      {
        src: madeleine2Balcons,
        alt: "Détail des balcons et ouvertures de la Résidence Madeleine 2 à Hydra",
        title: "Balcons et volumes de Madeleine 2",
        caption: "Les balcons et loggias aux lignes soignées offrant une belle luminosité aux appartements.",
      },
      {
        src: madeleine2Entree,
        alt: "Entrée sécurisée et hall d'accueil de la Résidence Madeleine 2 à Hydra",
        title: "Entrée sécurisée de la Résidence Madeleine 2",
        caption: "Hall d'entrée sécurisé et aménagements des parties communes haut standing.",
      },
    ],
    title: "Résidence de prestige à Hydra : Appartements et duplex de haut standing",
    metaDescription: "Résidence d'exception avec appartements de haut standing, espaces généreux et prestations premium dans un cadre exclusif.",
    heroTagline: "L'adresse où le standing devient une évidence",
    deliveredRange: "Réalisée entre 2019 et 2023",
    sections: [
      {
        heading: "Une signature résidentielle au cœur d'Hydra",
        level: "h2",
        paragraphs: [
          "Dans l'un des environnements les plus convoités d'Hydra, à quelques pas de l'école Éveil Scolaire, cette résidence incarne une vision exigeante de l'immobilier contemporain à Alger.",
          "Pensée pour une clientèle en quête de discrétion et de qualité, elle s'intègre avec élégance dans ce secteur privilégié.",
        ],
      },
      {
        heading: "Une conception pensée pour la vie réelle",
        level: "h2",
        paragraphs: [
          "La résidence réunit 32 logements répartis sur un ensemble en R+6 avec sous-sol, offrant une diversité de configurations adaptées aux modes de vie contemporains :",
        ],
        bullets: [
          "Appartements F3 et F4 fonctionnels et lumineux",
          "Duplex exclusif au dernier niveau",
          "Organisation fluide des espaces jour / nuit",
          "Volumes équilibrés favorisant le confort quotidien",
          "Architecture sobre et contemporaine",
        ],
      },
      {
        heading: "Le confort comme standard, pas comme option",
        level: "h3",
        bullets: [
          "Stationnement sécurisé sur plusieurs niveaux",
          "Circulation fluide et accès maîtrisés",
          "Parties communes fonctionnelles et durables",
          "Conception favorisant isolation et intimité",
        ],
      },
      {
        heading: "Un quotidien maîtrisé",
        level: "h2",
        bullets: [
          "Proximité immédiate des établissements scolaires",
          "Accès rapide aux zones professionnelles",
          "Présence de commerces et services essentiels à quelques minutes",
        ],
      },
      {
        heading: "Une résidence récente, déjà ancrée",
        level: "h2",
        bullets: [
          "Construction moderne",
          "Cadre résidentiel structuré",
          "Un bien déjà réalisé, sans attente liée à un chantier en cours",
        ],
      },
    ],
  },
];