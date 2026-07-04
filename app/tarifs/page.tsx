import type { Metadata } from "next";
import Link from "next/link";
import {
    ArrowRight,
    BadgeCheck,
    Camera,
    ClipboardCheck,
    Database,
    FileText,
    Headphones,
    Landmark,
    MessagesSquare,
    ShieldCheck,
    Sparkles,
    Users2,
    Wallet,
} from "lucide-react";
import ProductHero from "@/components/landing/ProductHero";
import SectionHeader from "@/components/landing/SectionHeader";
import FeatureGrid from "@/components/landing/FeatureGrid";
import FAQAccordion from "@/components/landing/FAQAccordion";
import CTASection from "@/components/landing/CTASection";
import LandingFooterCTA from "@/components/landing/LandingFooterCTA";
import ScrollReveal from "@/components/landing/ScrollReveal";
import PricingFeatureMatrix, {
    type PricingMatrixRow,
} from "@/components/landing/PricingFeatureMatrix";
import PricingSectionClient from "./pricing-section-client";

export const metadata: Metadata = {
    title: "Tarifs — Formules Le Bon Resto",
    description:
        "Trois formules sur devis. Starter, Premium, Pro : jusqu'à 38 fonctionnalités détaillées, timeline d'onboarding en 14 jours et engagements écrits. Devis personnalisé sous 48 heures.",
    openGraph: {
        title: "Tarifs — Formules Le Bon Resto",
        description:
            "Trois formules sur devis. Starter, Premium, Pro : jusqu'à 38 fonctionnalités détaillées, timeline d'onboarding en 14 jours et engagements écrits.",
        siteName: "LeBonResto",
        locale: "fr_FR",
        type: "website",
        images: [
            {
                url: "/assets/landing/heroes/restaurateur-tablet.jpg",
                width: 1200,
                height: 630,
                alt: "Tarifs LeBonResto — trois formules sur devis",
            },
        ],
    },
    twitter: { card: "summary_large_image" },
};

// ────────────────────────────────────────────────────────────────────────────
// Tiers — expanded per docs/lbr-strategy synthesis. Every bullet must be
// deliverable at launch (backed by an existing backend module or a paid
// production service). Prices stay "Sur devis".
// ────────────────────────────────────────────────────────────────────────────
const tiers = [
    {
        id: "starter",
        name: "Starter",
        tagline: "Pour exister en ligne avec une fiche soignée.",
        idealFor:
            "Restaurants indépendants qui veulent une première vitrine crédible et un moteur de réservation fiable, sans production média.",
        price: "Sur devis",
        features: [
            "Fiche restaurant optimisée pour le référencement (nom, ville, catégorie, ambiance, cover, description)",
            "Moteur de réservation 24/7 avec confirmation par email, SMS et WhatsApp",
            "Avis 100 % vérifiés post-visite avec réponse publique du propriétaire",
            "Galerie photos jusqu'à 10 visuels et vidéo de présentation jusqu'à 60 secondes",
            "Carte digitale jusqu'à 25 plats et 1 menu PDF téléversable",
            "Import automatique du menu par photo ou site web (OCR + IA)",
            "Horaires réguliers, jours de fermeture et horaires spéciaux Ramadan / Aïd",
            "Waitlist automatique avec relais au client dès qu'un créneau se libère",
            "Tableau de bord essentiel : réservations du jour et de demain, historique 7 jours",
            "Onboarding accompagné avec session de formation à la prise en main",
            "Support par email et WhatsApp en français sous 48 h ouvrées",
            "Visite 360° et pack photo pro disponibles en option, facturés séparément",
        ],
        ctaLabel: "Demander mon devis Starter",
        ctaHref: "/restaurateurs#form",
        whatsappHref:
            "https://wa.me/212644440525?text=Bonjour%2C%20je%20souhaite%20discuter%20de%20la%20formule%20Starter%20de%20LeBonResto.",
    },
    {
        id: "premium",
        name: "Premium",
        tagline: "Le standard recommandé pour convertir davantage.",
        idealFor:
            "Restaurants gastronomiques, brasseries et adresses ambitieuses qui veulent une vitrine éditoriale et un CRM habitués actif.",
        price: "Sur devis",
        recommended: true,
        features: [
            "Tout le plan Starter",
            "Fiche premium avec badge éditorial et récit rédigé par un rédacteur food après interview de 30 minutes",
            "Pack photo professionnel inclus : reportage salle, plats signatures et équipe (droit d'usage étendu)",
            "Visite 360° immersive incluse — jusqu'à 10 scènes avec hotspots cliquables",
            "Mise en avant ville et catégorie sur la marketplace",
            "Galerie étendue jusqu'à 30 photos, vidéo jusqu'à 180 secondes, carte de 100 plats et 5 menus PDF",
            "Menu multilingue FR / EN / AR avec allergènes et régimes par plat",
            "Confirmation client J-1 automatique, rappel WhatsApp H-3 et prévention no-show multi-canal",
            "Anniversaires clients détectés + message WhatsApp automatique",
            "CRM habitués : segments (loyaux, inactifs 60 j, anniversaires), notes et tags",
            "Audit IA hebdomadaire de la fiche avec recommandations actionnables",
            "Suggestion IA de réponse aux avis + alerte immédiate sur tout avis inférieur à 3 étoiles",
            "Analytics par période, export CSV et rapport quotidien par email",
            "Personnalisation couleurs de fiche et logo dans les emails transactionnels",
            "Sous-comptes équipe jusqu'à 3 utilisateurs, 2FA et journal d'activité",
            "Support prioritaire chat + WhatsApp sous 24 h ouvrées",
        ],
        ctaLabel: "Demander mon devis Premium",
        ctaHref: "/restaurateurs#form",
        whatsappHref:
            "https://wa.me/212644440525?text=Bonjour%2C%20je%20souhaite%20discuter%20de%20la%20formule%20Premium%20de%20LeBonResto.",
    },
    {
        id: "pro",
        name: "Pro",
        tagline: "L'arsenal complet pour maisons d'exception et groupes.",
        idealFor:
            "Groupes multi-établissements, hôtels-restaurants et maisons signature qui exigent marque blanche, benchmark marché et conseiller dédié.",
        price: "Sur devis",
        features: [
            "Tout le plan Premium",
            "Multi-établissements pilotés depuis un même compte, avec vision consolidée par restaurant",
            "Sous-comptes équipe jusqu'à 10 utilisateurs avec rôles granulaires (host, manager, marketing)",
            "Sous-domaine dédié (marque.lebonresto.ma) et mini-site en marque blanche",
            "Emails transactionnels et digest en marque blanche (logo, typographie, ton)",
            "Personnalisation avancée de la fiche : typographie, mode sombre et CSS sur mesure",
            "Mise en avant éditoriale en page d'accueil et dans les guides saisonniers (Ftour, Aïd, réveillon)",
            "Plats signatures avec badge premium, vidéo et carte digitale illimités",
            "Visite 360° étendue jusqu'à 25 scènes avec mise à jour annuelle",
            "Programme de fidélité (paliers de visites, récompenses automatiques, code promo)",
            "Newsletter email à la base client + campagnes WhatsApp segmentées (draft, planification, tracking)",
            "Benchmark ville et catégorie, cohortes de rétention et heatmap des habitudes de visite",
            "Rapport hebdomadaire PDF avec insights premium et historique 90 jours",
            "Conseiller LeBonResto dédié + support téléphonique 7j/7",
            "Onboarding sur site avec un consultant LeBonResto et formation de l'équipe de salle",
            "Campagnes co-brandées : shooting saisonnier, contenu éditorial, mise en avant partenaire",
        ],
        ctaLabel: "Demander mon devis Pro",
        ctaHref: "/restaurateurs#form",
        whatsappHref:
            "https://wa.me/212644440525?text=Bonjour%2C%20je%20souhaite%20discuter%20de%20la%20formule%20Pro%20de%20LeBonResto.",
    },
];

// ────────────────────────────────────────────────────────────────────────────
// Comparison matrix — 7 categories, 38 rows. Values are either "✓", "—",
// or a raw string (e.g. "10 max"). Consumed by <PricingFeatureMatrix />.
// ────────────────────────────────────────────────────────────────────────────
const matrixRows: PricingMatrixRow[] = [
    // Fiche et vitrine
    { category: "Fiche et vitrine", feature: "Fiche restaurant optimisée SEO (schema.org, page ville)", starter: "✓", premium: "✓", pro: "✓" },
    { category: "Fiche et vitrine", feature: "Galerie photos", starter: "10 max", premium: "30 max", pro: "100 max" },
    { category: "Fiche et vitrine", feature: "Vidéo de présentation", starter: "60 s", premium: "180 s", pro: "Illimitée" },
    { category: "Fiche et vitrine", feature: "Visite 360° immersive avec hotspots", starter: "En option", premium: "10 scènes", pro: "25 scènes" },
    { category: "Fiche et vitrine", feature: "Mise en avant ville et catégorie", starter: "—", premium: "✓", pro: "✓" },
    { category: "Fiche et vitrine", feature: "Mise en avant page d'accueil marketplace", starter: "—", premium: "—", pro: "✓" },
    { category: "Fiche et vitrine", feature: "Sous-domaine dédié + mini-site marque blanche", starter: "—", premium: "—", pro: "✓" },

    // Réservations et flux clients
    { category: "Réservations et flux clients", feature: "Moteur de réservation 24/7 (email, SMS, WhatsApp)", starter: "✓", premium: "✓", pro: "✓" },
    { category: "Réservations et flux clients", feature: "Confirmation client J-1 automatique", starter: "—", premium: "✓", pro: "✓" },
    { category: "Réservations et flux clients", feature: "Rappel WhatsApp H-3 avant l'arrivée", starter: "—", premium: "✓", pro: "✓" },
    { category: "Réservations et flux clients", feature: "Waitlist avec relais automatique", starter: "✓", premium: "✓", pro: "✓" },
    { category: "Réservations et flux clients", feature: "Prévention no-show multi-canal", starter: "—", premium: "✓", pro: "✓" },

    // Menu et carte digitale
    { category: "Menu et carte digitale", feature: "Menus PDF téléversables", starter: "1", premium: "5", pro: "Illimités" },
    { category: "Menu et carte digitale", feature: "Carte digitale (plats)", starter: "25", premium: "100", pro: "Illimitée" },
    { category: "Menu et carte digitale", feature: "Import automatique par OCR + IA", starter: "✓", premium: "✓", pro: "✓" },
    { category: "Menu et carte digitale", feature: "Menu multilingue FR / EN / AR", starter: "—", premium: "✓", pro: "✓" },
    { category: "Menu et carte digitale", feature: "Allergènes et régimes par plat", starter: "—", premium: "✓", pro: "✓" },
    { category: "Menu et carte digitale", feature: "Plats signatures avec badge premium", starter: "—", premium: "—", pro: "✓" },

    // Avis et e-réputation
    { category: "Avis et e-réputation", feature: "Avis vérifiés post-visite (badge Verified)", starter: "✓", premium: "✓", pro: "✓" },
    { category: "Avis et e-réputation", feature: "Réponse publique + modération éditoriale", starter: "✓", premium: "✓", pro: "✓" },
    { category: "Avis et e-réputation", feature: "Suggestion IA de réponse (ton adapté à la note)", starter: "—", premium: "✓", pro: "✓" },
    { category: "Avis et e-réputation", feature: "Alerte immédiate sur avis inférieur à 3 étoiles", starter: "—", premium: "✓", pro: "✓" },

    // Analytics et pilotage
    { category: "Analytics et pilotage", feature: "Tableau de bord Owner Pulse (jour + demain)", starter: "✓", premium: "✓", pro: "✓" },
    { category: "Analytics et pilotage", feature: "Historique statistiques", starter: "7 jours", premium: "30 jours", pro: "90 jours" },
    { category: "Analytics et pilotage", feature: "Export CSV et rapport quotidien par email", starter: "—", premium: "✓", pro: "✓" },
    { category: "Analytics et pilotage", feature: "Rapport hebdomadaire PDF avec insights premium", starter: "—", premium: "—", pro: "✓" },
    { category: "Analytics et pilotage", feature: "Benchmark ville / catégorie + cohortes clients", starter: "—", premium: "—", pro: "✓" },
    { category: "Analytics et pilotage", feature: "Audit IA hebdomadaire de la fiche", starter: "—", premium: "✓", pro: "✓" },

    // CRM, marketing et fidélité
    { category: "CRM, marketing et fidélité", feature: "Fiche client 360° et segments habitués", starter: "✓", premium: "✓", pro: "✓" },
    { category: "CRM, marketing et fidélité", feature: "Anniversaires clients + WhatsApp automatique", starter: "—", premium: "✓", pro: "✓" },
    { category: "CRM, marketing et fidélité", feature: "Personnalisation couleurs de fiche + logo email", starter: "—", premium: "✓", pro: "✓" },
    { category: "CRM, marketing et fidélité", feature: "Newsletter email + campagnes WhatsApp segmentées", starter: "—", premium: "—", pro: "✓" },
    { category: "CRM, marketing et fidélité", feature: "Programme de fidélité (paliers + récompenses)", starter: "—", premium: "—", pro: "✓" },

    // Équipe, comptes et support
    { category: "Équipe, comptes et support", feature: "Sous-comptes utilisateurs", starter: "1", premium: "3", pro: "10" },
    { category: "Équipe, comptes et support", feature: "Rôles granulaires (host, manager, marketing)", starter: "—", premium: "—", pro: "✓" },
    { category: "Équipe, comptes et support", feature: "Multi-établissements sous un même compte", starter: "✓", premium: "✓", pro: "✓" },
    { category: "Équipe, comptes et support", feature: "2FA TOTP + journal d'activité + pause d'abonnement", starter: "✓", premium: "✓", pro: "✓" },
    { category: "Équipe, comptes et support", feature: "Canal support", starter: "Email · 48 h", premium: "Chat · 24 h", pro: "Dédié · 7j/7" },
];

// ────────────────────────────────────────────────────────────────────────────
// À-la-carte modules — priced per project, independent of the tier.
// ────────────────────────────────────────────────────────────────────────────
const addOns = [
    { icon: Camera, label: "Reportage photo pro supplémentaire", detail: "Chef, portraits équipe, plats saisonniers." },
    { icon: Landmark, label: "Visite 360° sur mesure", detail: "Nouvelle terrasse, salle privatisée, cave." },
    { icon: FileText, label: "Captation vidéo longue (60–90 s)", detail: "Film de marque, sous-titrage FR / EN." },
    { icon: Sparkles, label: "Session éditoriale d'actualisation", detail: "Nouveau chef, refonte de carte, saison." },
    { icon: Database, label: "Migration depuis un concurrent", detail: "Import avis, habitués et réservations en cours." },
    { icon: BadgeCheck, label: "Shooting menu ciblé", detail: "Planches signatures, boissons, pâtisserie." },
    { icon: Users2, label: "Intégration sur mesure", detail: "Widget marque blanche, API, connecteur POS." },
];

// ────────────────────────────────────────────────────────────────────────────
// Onboarding timeline — J+0 to J+14.
// ────────────────────────────────────────────────────────────────────────────
const onboardingSteps = [
    { when: "J+0", title: "Signature et brief de cadrage", body: "Ouverture de votre espace propriétaire et point visio de 20 minutes." },
    { when: "J+1 à J+3", title: "Kit d'onboarding", body: "Import de votre menu par OCR, récupération des visuels existants, planification du shooting." },
    { when: "J+3 à J+7", title: "Production média (Premium / Pro)", body: "Reportage photo, captation vidéo, tournage de la visite 360°." },
    { when: "J+7", title: "Mise en ligne de la fiche", body: "Activation du moteur de réservation et connexion des rappels WhatsApp." },
    { when: "J+7 à J+10", title: "Formation de l'équipe salle", body: "Back-office, gestion des réservations, réponse aux avis." },
    { when: "J+14", title: "Première optimisation", body: "Audit IA de la fiche, ajustement des créneaux et point avec votre conseiller." },
];

// ────────────────────────────────────────────────────────────────────────────
// Written commitments — every point is contractually opposable.
// ────────────────────────────────────────────────────────────────────────────
const commitments = [
    { icon: ClipboardCheck, text: "Devis détaillé sous 48 h ouvrées après l'appel découverte, ligne à ligne." },
    { icon: Wallet, text: "Aucun engagement de durée : préavis de résiliation de 30 jours, sans motif à justifier." },
    { icon: BadgeCheck, text: "Aucune commission par réservation, aucune facturation au couvert." },
    { icon: MessagesSquare, text: "Support en français, en arabe et en darija — un vrai interlocuteur, pas un chatbot." },
    { icon: Database, text: "Vos données restent votre propriété : export CSV et suppression à la demande (loi 09-08 + RGPD)." },
    { icon: ShieldCheck, text: "Chiffrement en transit et au stockage, sauvegarde quotidienne, hébergement européen." },
    { icon: Headphones, text: "Pause d'abonnement possible pendant les fermetures saisonnières." },
];

// ────────────────────────────────────────────────────────────────────────────
// Four functional pillars — copy from §3.13.
// ────────────────────────────────────────────────────────────────────────────
const pillars = [
    {
        icon: "Sparkles",
        title: "1. Attirez de nouveaux convives",
        description:
            "Apparaissez sur la marketplace nationale. Soyez référencé par ville et par ambiance. Mettez en avant vos atouts visuels.",
    },
    {
        icon: "CalendarCheck",
        title: "2. Centralisez vos réservations",
        description:
            "Toutes les demandes au même endroit. Confirmation en deux clics, sans jongler entre canaux.",
    },
    {
        icon: "BarChart3",
        title: "3. Pilotez avec les bonnes données",
        description:
            "Visites, conversions, profils habitués : prenez vos décisions sur des chiffres réels.",
    },
    {
        icon: "Heart",
        title: "4. Faites revenir vos convives",
        description:
            "Avis vérifiés, événements, offres : votre réputation s'entretient depuis votre back-office.",
    },
];

// ────────────────────────────────────────────────────────────────────────────
// FAQ — enriched, 12 items.
// ────────────────────────────────────────────────────────────────────────────
const faqItems = [
    {
        question: "Pourquoi pas de prix affichés publiquement ?",
        answer:
            "Chaque restaurant a une réalité différente : nombre de couverts, taille de la galerie photo, ambition éditoriale, périmètre multi-sites. Plutôt qu'un tarif générique qui s'ajuste mal, nous préférons un devis calibré, transparent, et discuté en visio en 20 minutes.",
    },
    {
        question: "Y a-t-il une commission par réservation ?",
        answer:
            "Notre modèle repose sur un abonnement clair, pas sur une commission au couvert. Le détail exact est intégré à votre devis personnalisé après échange découverte.",
    },
    {
        question: "Quelle est la durée d'engagement ?",
        answer:
            "À discuter au moment du devis. Notre objectif est une relation durable, pas un piège contractuel : nous privilégions la confiance plutôt que des clauses longues. Préavis standard de 30 jours, sans motif à justifier.",
    },
    {
        question: "Quels sont les frais d'onboarding ?",
        answer:
            "Selon la formule et le niveau d'accompagnement souhaité (photos, menu, visite 360°). Le détail est intégré au devis, sans surcoût caché.",
    },
    {
        question: "Acceptez-vous le paiement en plusieurs fois ?",
        answer:
            "Oui. Chaque formule est disponible en règlement mensuel ou annuel, avec un tarif préférentiel pour l'engagement annuel. Les frais de production média peuvent être étalés en trois fois sans frais sur les formules Premium et Pro. Nous acceptons le virement bancaire, la carte et le chèque; les prélèvements automatiques sont mis en place dès la deuxième échéance.",
    },
    {
        question: "Puis-je changer de formule en cours de contrat ?",
        answer:
            "Oui, à tout moment. Le passage à une formule supérieure est effectif dès la signature de l'avenant : la production média complémentaire est planifiée sous 7 jours, et le prorata est appliqué sur votre facturation en cours. Le passage à une formule inférieure prend effet à la prochaine échéance mensuelle ou annuelle.",
    },
    {
        question: "Comment se passe une résiliation ?",
        answer:
            "Un simple message WhatsApp ou email suffit. Le préavis est de 30 jours, sans motif à justifier, et vos contenus (photos, vidéo, visite 360°) restent utilisables sur vos propres canaux grâce au droit d'usage étendu inclus en Premium et Pro. Vous récupérez un export CSV complet de vos réservations, avis et fichier clients avant la clôture.",
    },
    {
        question: "Que se passe-t-il si je gère plusieurs restaurants ?",
        answer:
            "Le multi-établissements est possible sur toutes les formules avec un compte propriétaire unique, mais la formule Pro apporte la vraie valeur ajoutée pour les groupes : rôles granulaires par établissement, reporting consolidé, conseiller dédié et campagnes co-brandées. Une remise de groupe est négociée dès le deuxième établissement.",
    },
    {
        question: "Que se passe-t-il en cas de panne de la plateforme ?",
        answer:
            "Notre engagement de disponibilité est de 99,5 % en Starter et Premium, avec supervision 24/7 et alertes automatiques. La formule Pro bénéficie d'un SLA contractualisé à 99,9 % et d'une astreinte téléphonique. Toute réservation reçue pendant une indisponibilité est ré-injectée dès rétablissement, avec notification au client.",
    },
    {
        question: "Qui possède les données et les contenus produits ?",
        answer:
            "Vous restez propriétaire de toutes vos données commerciales : réservations, fichier clients, avis, statistiques. Les contenus média (photos, vidéo, visite 360°) produits dans les formules Premium et Pro vous sont cédés en droit d'usage étendu pour vos réseaux sociaux, votre site, vos supports print et vos campagnes locales, pour toute la durée du partenariat. Nous ne revendons jamais vos données à des tiers.",
    },
    {
        question: "Et si une fonctionnalité Premium manque à mon Starter ?",
        answer:
            "Certains modules peuvent être ajoutés à la carte sur une formule Starter (visite 360°, pack photo, audit IA hebdomadaire), facturés au projet et indépendamment de l'abonnement. Au-delà de deux modules, le passage à Premium devient généralement plus économique : nous vous le disons ouvertement pendant la démo, sans forcer la vente.",
    },
    {
        question: "Comment réglez-vous un désaccord ou une insatisfaction ?",
        answer:
            "En cas d'insatisfaction sur la production média (photos, vidéo, visite 360°), nous refaisons la prise de vue à nos frais tant que le livrable ne correspond pas à votre brief validé. Sur un litige commercial, votre conseiller (ou notre équipe support pour Starter et Premium) prend le sujet en main sous 48 h ouvrées, avec un point écrit à l'appui. En dernier recours, le droit marocain s'applique et les juridictions de Casablanca sont compétentes.",
    },
];

export default function TarifsPage() {
    return (
        <>
            {/* 1. Hero — ProductHero */}
            <ProductHero
                eyebrow="NOS FORMULES"
                headline="Une tarification claire, calibrée pour chaque restaurant."
                accent="calibrée pour chaque restaurant."
                subheadline="Trois formules, un devis sur-mesure après une démo de 20 minutes. Pas de prix masqué, pas de surcoût caché."
                primaryCta={{
                    label: "Demander mon devis",
                    href: "/restaurateurs#form",
                }}
                secondaryCta={{
                    label: "Comparer en détail",
                    href: "#comparatif",
                }}
                mockup={{
                    src: "/assets/landing/heroes/investor-dashboard.jpg",
                    alt: "Aperçu du tableau de bord LeBonResto pour propriétaires de restaurants",
                    aspect: "tablet",
                }}
                backgroundImage={{
                    src: "/assets/landing/heroes/restaurateur-tablet.jpg",
                    alt: "",
                }}
                floatingCards={[
                    { icon: "FileCheck2", label: "Devis", value: "Sous 48 h" },
                    { icon: "ShieldCheck", label: "Transparence", value: "100 %" },
                    { icon: "Sparkles", label: "Onboarding", value: "14 jours" },
                ]}
            />

            {/* 2. Three pricing cards */}
            <ScrollReveal>
                <section id="formules" className="bg-white py-10 md:py-14 lg:py-16 scroll-mt-24">
                    <div className="container-wide">
                        <SectionHeader
                            eyebrow="CHOISISSEZ VOTRE FORMULE"
                            title="Trois niveaux d'accompagnement, un seul standard premium."
                            accent="trois niveaux"
                            description="Tarification sur devis pour chaque restaurant — Starter, Premium ou Pro. Validez votre choix après une démo de 20 minutes."
                            align="center"
                        />

                        <div className="mt-8 sm:mt-10 lg:mt-12">
                            <PricingSectionClient tiers={tiers} />
                        </div>
                    </div>
                </section>
            </ScrollReveal>

            {/* 3. Detailed comparison matrix */}
            <ScrollReveal>
                <section id="comparatif" className="bg-cream-50 py-10 md:py-14 lg:py-16 scroll-mt-24">
                    <div className="container-wide">
                        <SectionHeader
                            eyebrow="COMPARATIF DÉTAILLÉ"
                            title="Ligne par ligne, ce que chaque formule apporte réellement."
                            accent="ligne par ligne"
                            description="Sept blocs, trente-huit fonctionnalités : la grille qui sert de référence pendant l'appel découverte. Les quotas sont exacts, les modules cochés correspondent à ce qui est déjà livré dans le back-office."
                            align="center"
                        />

                        <div className="mt-8 sm:mt-10 lg:mt-12">
                            <PricingFeatureMatrix rows={matrixRows} />
                        </div>

                        <p className="mx-auto mt-6 max-w-3xl text-center text-xs sm:text-sm text-slate-500 text-pretty">
                            Les prix restent sur devis après démo de 20 à 30 minutes. Cette grille est jointe à chaque proposition tarifaire pour que vous puissiez comparer plan par plan.
                        </p>
                    </div>
                </section>
            </ScrollReveal>

            {/* 4. Reassurance — Pourquoi "Sur devis" */}
            <ScrollReveal>
                <section className="bg-white py-10 md:py-14 lg:py-16">
                    <div className="container-wide">
                        <div className="mx-auto max-w-3xl rounded-3xl bg-cream-50 p-4 sm:p-5 md:p-6 shadow-premium ring-1 ring-cream-200">
                            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-primary">
                                Pourquoi « Sur devis »
                            </span>
                            <h2 className="mt-4 font-display text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 leading-[1.1] text-balance">
                                Un tarif honnête se discute en visio, pas dans un tableau générique.
                            </h2>
                            <div className="mt-4 sm:mt-5 space-y-4 text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed text-pretty">
                                <p>
                                    Chaque restaurant a une réalité différente : nombre de couverts,
                                    taille de la galerie photo, ambition éditoriale, périmètre
                                    multi-sites.
                                </p>
                                <p>
                                    Plutôt qu&apos;un tarif générique qui s&apos;ajuste mal, nous préférons un
                                    devis calibré, transparent, et discuté en visio en 20 minutes.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </ScrollReveal>

            {/* 5. Add-on modules (à la carte) */}
            <ScrollReveal>
                <section className="bg-cream-50 py-10 md:py-14 lg:py-16">
                    <div className="container-wide">
                        <SectionHeader
                            eyebrow="MODULES À LA CARTE"
                            title="Certains besoins sortent d'une formule et sont chiffrés au projet."
                            accent="chiffrés au projet"
                            description="Utiles quand vous préparez une réouverture, un rebranding ou une saison marquée. Détaillés ligne à ligne dans le devis initial."
                            align="center"
                        />

                        <div className="mt-8 sm:mt-10 lg:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
                            {addOns.map((addon) => (
                                <article
                                    key={addon.label}
                                    className="flex gap-4 rounded-2xl bg-white p-4 sm:p-5 shadow-premium ring-1 ring-slate-100"
                                >
                                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                        <addon.icon className="h-5 w-5" aria-hidden="true" />
                                    </span>
                                    <div>
                                        <h3 className="text-sm sm:text-base font-semibold text-slate-900 leading-tight">
                                            {addon.label}
                                        </h3>
                                        <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed text-pretty">
                                            {addon.detail}
                                        </p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            </ScrollReveal>

            {/* 6. Onboarding timeline (J+0 à J+14) */}
            <ScrollReveal>
                <section className="bg-white py-10 md:py-14 lg:py-16">
                    <div className="container-wide">
                        <SectionHeader
                            eyebrow="VOTRE MISE EN LIGNE"
                            title="De J+0 à J+14, chaque étape a un livrable et un délai."
                            accent="chaque étape a un livrable"
                            description="Vous restez focalisé sur votre service, nos équipes avancent en parallèle. Voici la timeline standard, ajustée à votre situation dans le devis."
                            align="center"
                        />

                        <ol className="mt-8 sm:mt-10 lg:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                            {onboardingSteps.map((step, idx) => (
                                <li
                                    key={step.when}
                                    className="relative rounded-2xl bg-cream-50 p-5 sm:p-6 ring-1 ring-cream-200"
                                >
                                    <span className="absolute -top-3 left-5 inline-flex items-center rounded-full bg-primary px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white shadow-sm">
                                        Étape {idx + 1}
                                    </span>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                                        {step.when}
                                    </p>
                                    <h3 className="mt-2 font-display text-lg sm:text-xl font-bold text-slate-900 leading-tight text-balance">
                                        {step.title}
                                    </h3>
                                    <p className="mt-2 text-sm text-slate-600 leading-relaxed text-pretty">
                                        {step.body}
                                    </p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>
            </ScrollReveal>

            {/* 7. Written commitments */}
            <ScrollReveal>
                <section className="bg-primary text-white py-10 md:py-14 lg:py-16 relative overflow-hidden">
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 opacity-40"
                        style={{
                            backgroundImage:
                                "radial-gradient(circle at 12% 0%, rgba(255,255,255,0.18) 0%, transparent 45%), radial-gradient(circle at 100% 100%, rgba(1,64,56,0.85) 0%, transparent 55%)",
                        }}
                    />
                    <div className="container-wide relative">
                        <div className="mx-auto max-w-3xl text-center">
                            <span className="inline-block rounded-full bg-white/15 px-4 py-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-cream-50 ring-1 ring-white/25 backdrop-blur">
                                Nos engagements écrits
                            </span>
                            <h2 className="mt-4 font-display text-2xl sm:text-3xl md:text-4xl font-bold leading-[1.1] text-balance">
                                Ce qui figure noir sur blanc dans chaque devis — sans exception cachée.
                            </h2>
                            <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-cream-50/95 leading-relaxed text-pretty">
                                Pas de faux témoignage, pas de statistique inventée. Voici ce que nous
                                nous engageons à respecter contractuellement, sur toutes les formules.
                            </p>
                        </div>

                        <ul className="mt-8 sm:mt-10 lg:mt-12 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 max-w-4xl mx-auto">
                            {commitments.map((c) => (
                                <li
                                    key={c.text}
                                    className="flex gap-3 rounded-2xl bg-white/10 p-4 sm:p-5 ring-1 ring-white/15 backdrop-blur"
                                >
                                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20 text-white ring-1 ring-white/25">
                                        <c.icon className="h-4 w-4" aria-hidden="true" />
                                    </span>
                                    <p className="text-sm sm:text-base text-cream-50/95 leading-relaxed text-pretty">
                                        {c.text}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            </ScrollReveal>

            {/* 8. Migration from incumbents */}
            <ScrollReveal>
                <section className="bg-cream-50 py-10 md:py-14 lg:py-16">
                    <div className="container-wide">
                        <div className="mx-auto max-w-4xl rounded-3xl bg-white p-5 sm:p-6 md:p-8 shadow-premium ring-1 ring-slate-100">
                            <div className="flex flex-col md:flex-row md:items-start gap-5 md:gap-8">
                                <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                    <Database className="h-6 w-6" aria-hidden="true" />
                                </span>
                                <div className="flex-1">
                                    <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
                                        Migration accompagnée
                                    </span>
                                    <h2 className="mt-3 font-display text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 leading-[1.1] text-balance">
                                        Vous venez de TheFork, Zenchef ou Guestonline ?
                                    </h2>
                                    <p className="mt-4 text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed text-pretty">
                                        Changer d&apos;outil ne devrait pas vous coûter votre capital de
                                        réputation. Nos équipes récupèrent vos avis vérifiés, votre
                                        fichier habitués et vos réservations en cours pour que la
                                        bascule se fasse en une nuit, sans repartir de zéro. Module
                                        facturé au projet et détaillé dans votre devis initial.
                                    </p>

                                    <ul className="mt-5 space-y-3 text-sm sm:text-base text-slate-700">
                                        {[
                                            "Récupération des avis vérifiés existants et rebranding sous votre nouvelle fiche LeBonResto",
                                            "Import du fichier clients / habitués avec dédoublonnage et enrichissement des segments",
                                            "Reprise des réservations en cours pour éviter toute perte de couvert",
                                            "Passerelle de redirection depuis votre widget actuel pendant la période de transition",
                                            "Accompagnement du personnel de salle pour éviter la double saisie",
                                            "Audit préalable gratuit pour évaluer le volume de données et le délai réaliste",
                                        ].map((item) => (
                                            <li key={item} className="flex items-start gap-3 text-pretty">
                                                <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="mt-6">
                                        <Link
                                            href="/contact?subject=Migration"
                                            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90"
                                        >
                                            Demander un audit de migration
                                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </ScrollReveal>

            {/* 9. Four functional pillars */}
            <ScrollReveal>
                <section className="bg-white py-10 md:py-14 lg:py-16">
                    <div className="container-wide">
                        <SectionHeader
                            eyebrow="CE QUE VOUS OBTENEZ"
                            title="Quatre leviers pour faire grandir votre maison."
                            accent="grandir votre maison."
                            description="Quel que soit votre niveau de formule, vous activez quatre piliers conçus pour le marché marocain."
                            align="center"
                        />

                        <div className="mt-8 sm:mt-10 lg:mt-12">
                            <FeatureGrid items={pillars} columns={4} variant="card" />
                        </div>
                    </div>
                </section>
            </ScrollReveal>

            {/* 10. FAQ */}
            <ScrollReveal>
                <FAQAccordion
                    eyebrow="QUESTIONS FRÉQUENTES"
                    title="Tout savoir sur nos tarifs."
                    accent="nos tarifs."
                    items={faqItems}
                    variant="cream"
                />
            </ScrollReveal>

            {/* 11. Final CTA */}
            <ScrollReveal>
                <CTASection
                    title="Prêts à connaître votre devis ?"
                    description="Un échange découverte de 20 minutes pour comprendre votre maison, puis une proposition tarifaire personnalisée sous 48 heures ouvrées."
                    primaryCta={{
                        label: "Demander mon devis",
                        href: "/restaurateurs#form",
                    }}
                    secondaryCta={{
                        label: "Parler à un conseiller",
                        href: "/contact",
                    }}
                    variant="teal"
                />
            </ScrollReveal>

            {/* 12. Landing footer CTA */}
            <LandingFooterCTA
                title="Votre formule sur-mesure vous attend."
                primaryCta={{
                    label: "Demander mon devis",
                    href: "/restaurateurs#form",
                }}
                secondaryCta={{
                    label: "Découvrir notre solution",
                    href: "/notre-solution",
                }}
            />
        </>
    );
}
