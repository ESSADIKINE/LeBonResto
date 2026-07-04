import type { Metadata } from "next";
import ProductHero from "@/components/landing/ProductHero";
import SectionHeader from "@/components/landing/SectionHeader";
import FeatureGrid from "@/components/landing/FeatureGrid";
import FAQAccordion from "@/components/landing/FAQAccordion";
import CTASection from "@/components/landing/CTASection";
import LandingFooterCTA from "@/components/landing/LandingFooterCTA";
import ScrollReveal from "@/components/landing/ScrollReveal";
import PricingSectionClient from "./pricing-section-client";

export const metadata: Metadata = {
    title: "Tarifs — Formules Le Bon Resto",
    description:
        "Trois formules sur devis. Choisissez Starter, Premium ou Pro selon votre ambition. Devis personnalisé sous 48 heures.",
    openGraph: {
        title: "Tarifs — Formules Le Bon Resto",
        description:
            "Trois formules sur devis. Choisissez Starter, Premium ou Pro selon votre ambition. Devis personnalisé sous 48 heures.",
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

// Three pricing tiers — copy lifted verbatim from docs/lbr-strategy/02-sitemap-and-content.md §3.13.
// Prices stay "Sur devis" per founder decision #2.
// WhatsApp deep links are pre-encoded at build time (no runtime encodeURIComponent).
const tiers = [
    {
        id: "starter",
        name: "Starter",
        tagline: "L'essentiel pour rejoindre la marketplace premium.",
        price: "Sur devis",
        features: [
            "Fiche premium sur lebonresto.ma",
            "Réservations centralisées",
            "Avis vérifiés post-réservation",
            "Tableau de bord owner",
        ],
        ctaLabel: "Demander mon devis Starter",
        ctaHref: "/restaurateurs#form",
        whatsappHref:
            "https://wa.me/212644440525?text=Bonjour%2C%20je%20souhaite%20discuter%20de%20la%20formule%20Starter%20de%20LeBonResto.",
    },
    {
        id: "premium",
        name: "Premium",
        tagline: "Visibilité renforcée et accompagnement éditorial.",
        price: "Sur devis",
        recommended: true,
        features: [
            "Tout Starter",
            "Mise en avant éditoriale ponctuelle",
            "Visite 360° incluse",
            "Photos et menu enrichis",
            "Support prioritaire",
        ],
        ctaLabel: "Demander mon devis Premium",
        ctaHref: "/restaurateurs#form",
        whatsappHref:
            "https://wa.me/212644440525?text=Bonjour%2C%20je%20souhaite%20discuter%20de%20la%20formule%20Premium%20de%20LeBonResto.",
    },
    {
        id: "pro",
        name: "Pro",
        tagline: "Pour les maisons d'exception et les groupes multi-sites.",
        price: "Sur devis",
        features: [
            "Tout Premium",
            "Conseiller dédié",
            "Reporting détaillé et export",
            "Visibilité prioritaire dans les recherches",
            "Multi-établissements",
        ],
        ctaLabel: "Demander mon devis Pro",
        ctaHref: "/restaurateurs#form",
        whatsappHref:
            "https://wa.me/212644440525?text=Bonjour%2C%20je%20souhaite%20discuter%20de%20la%20formule%20Pro%20de%20LeBonResto.",
    },
];

// Four "feature deep-dive" pillars — copy from §3.13.
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

// FAQ tarifaire — questions verbatim from §3.13 with answers adapted from §3.8 + reassurance band.
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
            "À discuter au moment du devis. Notre objectif est une relation durable, pas un piège contractuel : nous privilégions la confiance plutôt que des clauses longues.",
    },
    {
        question: "Quels sont les frais d'onboarding ?",
        answer:
            "Selon la formule et le niveau d'accompagnement souhaité (photos, menu, visite 360°). Le détail est intégré au devis, sans surcoût caché.",
    },
    {
        question: "Acceptez-vous le paiement en plusieurs fois ?",
        answer:
            "Oui, à étudier au cas par cas avec votre conseiller. Nous adaptons les modalités à votre rythme d'activité.",
    },
];

export default function TarifsPage() {
    return (
        <>
            {/* 1. Hero — ProductHero (dashboard-as-visual variant), per Visual Direction §2.1 Pattern B. */}
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
                    href: "#formules",
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
                    { icon: "Sparkles", label: "Onboarding", value: "Accompagné" },
                ]}
            />

            {/* 2. Three pricing cards — PricingComparisonTable. */}
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

            {/* 3. Reassurance band — Pourquoi "Sur devis". */}
            <ScrollReveal>
                <section className="bg-cream-50 py-10 md:py-14 lg:py-16">
                    <div className="container-wide">
                        <div className="mx-auto max-w-3xl rounded-3xl bg-white p-4 sm:p-5 md:p-6 shadow-premium ring-1 ring-slate-100">
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

            {/* 4. Four functional bands — Visibilité / Réservations / Performance / Fidélisation. */}
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

            {/* 5. FAQ tarifaire. */}
            <ScrollReveal>
                <FAQAccordion
                    eyebrow="QUESTIONS FRÉQUENTES"
                    title="Tout savoir sur nos tarifs."
                    accent="nos tarifs."
                    items={faqItems}
                    variant="cream"
                />
            </ScrollReveal>

            {/* 6. CTA final dual — vers démo + contact conseiller. */}
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

            {/* 7. Landing footer CTA — repeat anchor. */}
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
