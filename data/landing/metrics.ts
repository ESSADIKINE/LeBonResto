// Source of truth for <MetricCards />. Edit values here.

export interface LandingMetric {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  hint?: string;
}

export const landingMetrics: LandingMetric[] = [
  {
    id: 'restaurants_listed',
    label: 'Restaurants référencés',
    value: 12,
    hint: 'Établissements partenaires sélectionnés à la main',
  },
  {
    id: 'cities_covered',
    label: 'Villes couvertes',
    value: 6,
    hint: 'Présence active dans les grandes villes du Maroc',
  },
  {
    id: 'reservations_generated',
    label: 'Réservations générées',
    value: 608,
    hint: 'Tables remplies grâce à la plateforme',
  },
  {
    id: 'verified_reviews',
    label: 'Avis vérifiés',
    value: 210,
    hint: 'Retours authentiques de clients confirmés',
  },
  {
    id: 'satisfaction_pct',
    label: 'Satisfaction client',
    value: 96,
    suffix: '%',
    hint: 'Clients satisfaits de leur expérience LeBonResto',
  },
  {
    id: 'monthly_active_diners',
    label: 'Gourmets actifs / mois',
    value: 1200,
    hint: 'Utilisateurs réguliers à la recherche de leur prochaine table',
  },
];
