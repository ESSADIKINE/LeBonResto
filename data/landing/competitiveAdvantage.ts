// Avantages concurrentiels LeBonResto, utilisés par <CompetitiveAdvantage />.

export interface Advantage {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const advantages: Advantage[] = [
  {
    id: 'local-first',
    title: 'Plateforme pensée pour le Maroc',
    description:
      "Une expérience adaptée aux usages locaux : langues, modes de paiement, habitudes de réservation et codes culturels marocains.",
    icon: 'MapPin',
  },
  {
    id: 'premium-profiles',
    title: 'Profils restaurants premium',
    description:
      "Chaque fiche est traitée comme une vitrine éditoriale : storytelling, photos pro, menus détaillés et identité visuelle soignée.",
    icon: 'Sparkles',
  },
  {
    id: '360-experience',
    title: 'Visite 360 et vidéo immersive',
    description:
      "Faites vivre votre salle avant la réservation grâce à la captation 360, à la vidéo et aux contenus immersifs exclusifs.",
    icon: 'Camera',
  },
  {
    id: 'verified-reviews',
    title: 'Avis 100 % vérifiés',
    description:
      "Seuls les clients ayant réservé puis honoré leur table peuvent noter. Fini les avis anonymes et les fausses notes.",
    icon: 'ShieldCheck',
  },
  {
    id: 'discovery',
    title: 'Découverte par ville et catégorie',
    description:
      "Recherche avancée par ville, quartier, ambiance, cuisine et budget pour aider chaque gourmet à trouver sa table idéale.",
    icon: 'Compass',
  },
  {
    id: 'acquisition-engine',
    title: 'Moteur d\'acquisition restaurateurs',
    description:
      "Une équipe terrain et un funnel d'onboarding qui transforment les meilleures adresses en partenaires actifs en quelques jours.",
    icon: 'Rocket',
  },
];
