// Roadmap de croissance LeBonResto, utilisée par <RoadmapTimeline /> sur la page Investisseurs.

export type RoadmapStatus = 'done' | 'inprogress' | 'next' | 'later';

export interface RoadmapPhase {
  phase: number;
  title: string;
  timeframe: string;
  status: RoadmapStatus;
  bullets: string[];
}

export const growthRoadmap: RoadmapPhase[] = [
  {
    phase: 1,
    title: 'Lancement Casablanca',
    timeframe: '2025 — S2',
    status: 'done',
    bullets: [
      'Validation produit avec une sélection de restaurants premium casablancais',
      'Mise en place de la réservation temps réel et des avis vérifiés',
      'Construction de la première communauté de gourmets',
    ],
  },
  {
    phase: 2,
    title: 'Grandes villes marocaines',
    timeframe: '2026',
    status: 'inprogress',
    bullets: [
      'Déploiement à Rabat, Marrakech, Tanger et Fès',
      'Industrialisation du contenu : visite 360, photo et vidéo professionnelles',
      "Lancement du tableau de bord restaurateur V2 et des offres ciblées",
    ],
  },
  {
    phase: 3,
    title: 'Couverture nationale',
    timeframe: '2027',
    status: 'next',
    bullets: [
      "Extension à Agadir, Al Hoceima, Oujda, Tétouan et stations balnéaires",
      "Programme de fidélité gourmets et carte LeBonResto",
      "Lancement des modules data et insights pour restaurateurs",
    ],
  },
  {
    phase: 4,
    title: 'Expansion MENA & francophonie',
    timeframe: '2028+',
    status: 'later',
    bullets: [
      "Ouverture progressive en Tunisie, Algérie, Sénégal et Côte d'Ivoire",
      'Plateforme multi-pays avec gestion devises et langues',
      "Partenariats avec hôtels, palaces et compagnies aériennes pour le tourisme gastronomique",
    ],
  },
];
