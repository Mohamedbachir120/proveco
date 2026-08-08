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

export const projects: Project[] = [
  {
    slug: "corallium",
    name: "Résidence Corallium",
    location: "Tixeraïne",
    area: "Tixeraïne",
    units: "172 Appartements & Commerces",
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
      "À Tixeraïne, un programme résidentiel moderne de 172 appartements avec commerces et services, pensé pour une nouvelle qualité de vie à Alger.",
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
          "Espaces commerciaux en pied d'immeuble",
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
];

// NOTE — Madeleine 1 & Madeleine 2:
// Your SEO doc + src/assets both have image sets for "Madeleine 1" and
// "Madeleine 2" (3 renamed images each, see rename-assets.sh), but there's
// no matching entry in the original projects.json, and the two unmatched
// entries there — "hydra-32" (Résidence Hydra Prestige) and "hydra-27"
// (Résidence Hydra Éveil) — don't have any local assets or SEO text of
// their own. I left them untouched below rather than guess:
//   - if Madeleine 1/2 ARE hydra-32/hydra-27 under their real commercial
//     names, tell me and I'll rename those entries + wire in the images
//   - if they're two new projects, I'll need their real units/status/
//     deliveredRange/description sections — the SEO doc only gives me
//     image captions, not project copy, and I don't want to invent numbers
//     for a client-facing site.