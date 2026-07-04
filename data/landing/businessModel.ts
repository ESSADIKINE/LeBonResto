// Modèle de revenus LeBonResto, utilisé par <BusinessModel /> sur la page Investisseurs.
// Les parts (share) sont en pourcentage et doivent toujours sommer à 100.

export interface RevenueStream {
  id: string;
  title: string;
  description: string;
  share: number;
  icon: string;
}

export const revenueStreams: RevenueStream[] = [
  {
    id: 'subscriptions',
    title: 'Abonnements restaurateurs',
    description:
      "Plans SaaS mensuels (Starter, Premium, Pro) donnant accès au tableau de bord, à la réservation, aux avis et aux outils marketing.",
    share: 35,
    icon: 'CreditCard',
  },
  {
    id: 'premium-listings',
    title: 'Fiches premium et mise en avant',
    description:
      "Visibilité renforcée : badge premium, top de page d'accueil, position prioritaire dans la recherche et carrousels éditoriaux.",
    share: 20,
    icon: 'Star',
  },
  {
    id: 'reservation-commissions',
    title: 'Commissions sur réservations',
    description:
      "Commission par couvert confirmé pour les restaurants utilisant la réservation à la performance, sans abonnement.",
    share: 20,
    icon: 'CalendarCheck',
  },
  {
    id: 'sponsored-offers',
    title: 'Offres sponsorisées',
    description:
      "Boost de visibilité pour les offres saisonnières, brunchs, soirées thématiques et événements ciblés par ville et profil.",
    share: 10,
    icon: 'Megaphone',
  },
  {
    id: 'media-production',
    title: 'Production 360 et vidéo',
    description:
      "Prestation de captation immersive (visite 360, vidéo, photo) facturée à la production pour les restaurants partenaires.",
    share: 10,
    icon: 'Camera',
  },
  {
    id: 'data-insights',
    title: 'Data et insights',
    description:
      "Rapports tendances marché, benchmarks de fréquentation et données agrégées vendues aux groupes, fonds et acteurs hôteliers.",
    share: 5,
    icon: 'BarChart3',
  },
];
