// Six piliers du produit LeBonResto, utilisés par <SolutionPillars />.

export interface SolutionPillar {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export const solutionPillars: SolutionPillar[] = [
  {
    id: 'discovery',
    icon: 'Search',
    title: 'Découverte gastronomique',
    description:
      "Un moteur de recherche pensé pour le Maroc : par ville, quartier, ambiance ou cuisine, vos clients trouvent l'adresse qui leur ressemble.",
  },
  {
    id: 'reservation',
    icon: 'CalendarCheck',
    title: 'Réservation en temps réel',
    description:
      "Réservation instantanée 24/7, confirmation immédiate et rappels automatiques pour réduire les no-shows et fluidifier votre service.",
  },
  {
    id: 'offers',
    icon: 'Tag',
    title: 'Offres et événements',
    description:
      "Mettez en avant vos menus saisonniers, brunchs, soirées et promotions ciblées pour remplir les heures creuses et créer la rareté.",
  },
  {
    id: 'reviews',
    icon: 'Star',
    title: 'Avis vérifiés et notation',
    description:
      "Seuls les clients ayant réellement dîné peuvent noter votre établissement. Une réputation construite sur des expériences authentiques.",
  },
  {
    id: '360',
    icon: 'Camera',
    title: 'Visite 360 et contenu vidéo',
    description:
      "Vitrine immersive avec photos professionnelles, vidéos et visite virtuelle pour faire vivre votre restaurant avant la première bouchée.",
  },
  {
    id: 'dashboard',
    icon: 'BarChart3',
    title: 'Tableau de bord restaurateur',
    description:
      "Pilotez vos réservations, vos avis, vos offres et vos statistiques de fréquentation depuis un espace pro clair et complet.",
  },
];
