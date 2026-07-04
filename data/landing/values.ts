// Valeurs de marque LeBonResto, utilisées par <BrandValues /> sur la page À propos.

export interface BrandValue {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const brandValues: BrandValue[] = [
  {
    id: 'confiance',
    title: 'Confiance',
    description:
      "Chaque restaurant est sélectionné à la main et chaque avis est vérifié. La confiance n'est pas un slogan, c'est notre standard.",
    icon: 'ShieldCheck',
  },
  {
    id: 'qualite',
    title: 'Qualité',
    description:
      "Nous accompagnons nos partenaires sur le contenu, la photo et l'expérience client pour ne mettre en avant que l'excellence.",
    icon: 'Sparkles',
  },
  {
    id: 'decouverte-locale',
    title: 'Découverte locale',
    description:
      "Du palace casablancais à la table de quartier marrakchie, nous célébrons la richesse de la scène gastronomique marocaine.",
    icon: 'MapPin',
  },
  {
    id: 'innovation',
    title: 'Innovation',
    description:
      "Visite 360, vidéo, intelligence artificielle, réservation temps réel : nous mettons la technologie au service du plaisir de la table.",
    icon: 'Rocket',
  },
  {
    id: 'hospitalite',
    title: 'Hospitalité',
    description:
      "Inspirés de la tradition d'accueil marocaine, nous construisons une plateforme chaleureuse, humaine et respectueuse.",
    icon: 'HandHeart',
  },
];
