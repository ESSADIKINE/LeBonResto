// Étapes du parcours client et restaurateur, utilisées par <HowItWorks />.

export interface JourneyStep {
  step: number;
  title: string;
  description: string;
  icon: string;
}

export const clientSteps: JourneyStep[] = [
  {
    step: 1,
    title: 'Découvrir',
    description:
      "Explorez les restaurants par ville, ambiance ou cuisine. Photos, visite 360 et avis vérifiés vous aident à choisir en toute confiance.",
    icon: 'Compass',
  },
  {
    step: 2,
    title: 'Réserver',
    description:
      "Choisissez votre créneau et confirmez votre table en quelques secondes, sans appel téléphonique ni attente.",
    icon: 'CalendarCheck',
  },
  {
    step: 3,
    title: 'Savourer',
    description:
      "Vivez une expérience préparée à l'avance par le restaurateur, prévenu de votre arrivée et de vos préférences.",
    icon: 'Utensils',
  },
  {
    step: 4,
    title: 'Partager',
    description:
      "Laissez un avis vérifié, sauvegardez vos coups de cœur et inspirez la communauté des gourmets marocains.",
    icon: 'Star',
  },
];

export const restaurantSteps: JourneyStep[] = [
  {
    step: 1,
    title: 'Rejoindre',
    description:
      "Créez votre profil restaurant en quelques minutes : informations, menu, photos, horaires et capacité d'accueil.",
    icon: 'UserPlus',
  },
  {
    step: 2,
    title: 'Mettre en valeur',
    description:
      "Activez la visite 360, ajoutez vos vidéos et offres pour transformer votre fiche en vitrine premium.",
    icon: 'Camera',
  },
  {
    step: 3,
    title: 'Recevoir des clients',
    description:
      "Centralisez vos réservations en temps réel et réduisez vos no-shows grâce aux rappels automatiques.",
    icon: 'CalendarCheck',
  },
  {
    step: 4,
    title: 'Piloter et grandir',
    description:
      "Suivez vos statistiques, gérez vos avis et lancez des campagnes ciblées depuis votre tableau de bord.",
    icon: 'BarChart3',
  },
];
