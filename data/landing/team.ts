/**
 * ============================================================================
 * NOTE — Données NON UTILISÉES sur le site public (juillet 2026).
 * ============================================================================
 *
 * Ce fichier est conservé UNIQUEMENT en vue d'une publication future de
 * l'équipe LeBonResto, une fois les recrutements confirmés (fondateur +
 * profils tech / business / opérations).
 *
 * À date, la section « L'équipe » de /a-propos affiche un placeholder
 * honnête « En constitution » — voir app/a-propos/page.tsx. Aucun composant
 * du site public n'importe `teamMembers` ; les noms, rôles et bios
 * ci-dessous sont donc invisibles côté visiteur.
 *
 * À réactiver dès que :
 *   1. l'équipe est réellement constituée,
 *   2. les portraits professionnels sont livrés dans /public/assets/landing/team/,
 *   3. les profils LinkedIn définitifs sont validés par chaque membre.
 *
 * En attendant, NE PAS afficher ces données sur le site public.
 * ============================================================================
 */
// PLACEHOLDER — REPLACE WITH REAL TEAM DATA.
// Cartes équipe affichées sur /a-propos via <TeamGrid />.

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageSrc: string;
  linkedin: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: 'founder',
    name: 'Ayman Essadikine',
    role: 'Fondateur & CEO',
    bio: "Entrepreneur passionné par la scène gastronomique marocaine. Il porte la vision LeBonResto depuis le premier jour et pilote la stratégie produit et croissance.",
    imageSrc: '/assets/landing/team/founder.jpg',
    linkedin: 'https://www.linkedin.com/in/lebonresto-founder',
  },
  {
    id: 'cofounder',
    name: 'Co-fondateur',
    role: 'CTO & Co-fondateur',
    bio: "Architecte de la plateforme, il dirige l'ingénierie produit, l'infrastructure cloud et les chantiers data/IA qui rendent LeBonResto unique.",
    imageSrc: '/assets/landing/team/cofounder.jpg',
    linkedin: 'https://www.linkedin.com/in/lebonresto-cofounder',
  },
  {
    id: 'head-of-growth',
    name: 'Head of Growth',
    role: 'Directrice de la croissance',
    bio: "Responsable de l'acquisition gourmets et de l'engagement communauté. Elle orchestre les campagnes, partenariats médias et stratégie réseaux sociaux.",
    imageSrc: '/assets/landing/team/head-of-growth.jpg',
    linkedin: 'https://www.linkedin.com/in/lebonresto-growth',
  },
  {
    id: 'head-of-partnerships',
    name: 'Head of Partnerships',
    role: 'Directeur des partenariats restaurateurs',
    bio: "Sur le terrain auprès des restaurateurs marocains, il développe le réseau, structure le succès client et garantit la qualité de chaque adresse référencée.",
    imageSrc: '/assets/landing/team/head-of-partnerships.jpg',
    linkedin: 'https://www.linkedin.com/in/lebonresto-partnerships',
  },
];
