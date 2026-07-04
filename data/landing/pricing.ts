// TODO: replace with real pricing when V2 plans lock.
// Plans tarifaires affichés sur /restaurateurs via <PricingTable /> et sur /tarifs
// via <PricingComparisonTable />.

export interface PricingTier {
  id: string;
  name: string;
  tagline: string;
  price: string;
  highlighted?: boolean;
  features: string[];
  /**
   * Pre-encoded WhatsApp deep link with prefill message.
   * Encoded at build time (not runtime) so the string is served as-is.
   */
  whatsappHref?: string;
}

export const pricingTiers: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'Pour démarrer votre présence en ligne',
    price: 'Sur devis',
    whatsappHref:
      'https://wa.me/212644440525?text=Bonjour%2C%20je%20souhaite%20discuter%20de%20la%20formule%20Starter%20de%20LeBonResto.',
    features: [
      'Fiche restaurant standard',
      "Réservation en ligne 24/7",
      "Gestion des avis clients vérifiés",
      "Tableau de bord essentiel",
      "Support email sous 48h",
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    tagline: 'Le standard recommandé pour grandir',
    price: 'Sur devis',
    highlighted: true,
    whatsappHref:
      'https://wa.me/212644440525?text=Bonjour%2C%20je%20souhaite%20discuter%20de%20la%20formule%20Premium%20de%20LeBonResto.',
    features: [
      'Fiche restaurant premium avec badge',
      "Réservation temps réel et rappels automatiques",
      "Mise en avant ville et catégorie",
      "Pack photo professionnelle inclus",
      "Tableau de bord avancé et statistiques",
      "Gestion des offres et événements",
      "Support prioritaire sous 24h",
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'Pour les groupes et restaurants ambitieux',
    price: 'Sur devis',
    whatsappHref:
      'https://wa.me/212644440525?text=Bonjour%2C%20je%20souhaite%20discuter%20de%20la%20formule%20Pro%20de%20LeBonResto.',
    features: [
      "Tout le plan Premium",
      'Visite 360 et vidéo immersive incluses',
      "Multi-établissements et multi-utilisateurs",
      "Campagnes sponsorisées ciblées",
      "Insights data et benchmarks marché",
      "Account manager dédié",
      "Support téléphonique 7j/7",
    ],
  },
];
