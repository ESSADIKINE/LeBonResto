import type { Metadata } from "next";

import ProductHero from "@/components/landing/ProductHero";
import StatBand from "@/components/landing/StatBand";
import TabbedFeatureShowcase from "@/components/landing/TabbedFeatureShowcase";
import SectionHeader from "@/components/landing/SectionHeader";
import BusinessModelGrid from "@/components/landing/BusinessModelGrid";
import RoadmapTimeline from "@/components/landing/RoadmapTimeline";
import FeatureGrid from "@/components/landing/FeatureGrid";
import TestimonialVideoBlock from "@/components/landing/TestimonialVideoBlock";
import LeadFormCard from "@/components/landing/LeadFormCard";
import InvestorLeadForm from "@/components/landing/InvestorLeadForm";
import FAQAccordion from "@/components/landing/FAQAccordion";
import LandingFooterCTA from "@/components/landing/LandingFooterCTA";
import ScrollReveal from "@/components/landing/ScrollReveal";

import { revenueStreams } from "@/data/landing/businessModel";
import { growthRoadmap } from "@/data/landing/roadmap";
import { advantages } from "@/data/landing/competitiveAdvantage";

export const metadata: Metadata = {
    title: "Investir dans Le Bon Resto — FoodTech Maroc",
    description:
        "Le Bon Resto structure le marché premium des restaurants au Maroc. Marketplace + SaaS, 6 villes actives, traction réelle. Demandez le dossier.",
    openGraph: {
        title: "Investir dans Le Bon Resto",
        description:
            "Le Bon Resto structure le marché premium des restaurants au Maroc. Marketplace + SaaS, 6 villes actives, traction réelle. Demandez le dossier.",
        siteName: "Le Bon Resto",
        locale: "fr_FR",
        type: "website",
        images: [
            {
                url: "/assets/landing/heroes/investor-dashboard.jpg",
                width: 1200,
                height: 630,
            },
        ],
    },
    twitter: { card: "summary_large_image" },
};

export default function InvestisseursPage() {
    return (
        <>
            {/* 1. ProductHero — dashboard-as-visual, floating KPI cards */}
            <ProductHero
                eyebrow="POUR LES INVESTISSEURS"
                headline="Investissez dans la FoodTech premium du Maroc"
                accent="FoodTech premium"
                subheadline="Marketplace + SaaS, 6 villes actives, traction réelle, équipe locale. Demandez le dossier pour aller plus loin."
                primaryCta={{
                    label: "Demander le dossier",
                    href: "#form",
                }}
                secondaryCta={{
                    label: "Découvrir la solution",
                    href: "/notre-solution",
                }}
                mockup={{
                    src: "/assets/landing/heroes/investor-dashboard.jpg",
                    alt: "Tableau de bord Le Bon Resto avec indicateurs marketplace",
                    aspect: "laptop",
                }}
                backgroundImage={{
                    src: "/assets/landing/heroes/about-emotional.jpg",
                    alt: "",
                }}
                floatingCards={[
                    { icon: "Map", label: "Marché", value: "Maroc" },
                    { icon: "TrendingUp", label: "Modèle", value: "SaaS + Marketplace" },
                    { icon: "Sparkles", label: "Positionnement", value: "Premium" },
                ]}
                trustPoints={[
                    { icon: "ShieldCheck", text: "Échange sous NDA" },
                    { icon: "FileText", text: "Pitch deck sous 5 jours" },
                    { icon: "Phone", text: "Call planifié sous 10 jours" },
                ]}
            />

            {/* 2. StatBand — plan de croissance (targets, pas chiffres actuels) */}
            <ScrollReveal>
                <StatBand
                    variant="teal"
                    eyebrow="NOTRE PLAN DE CROISSANCE"
                    title="Objectifs de la marketplace premium marocaine"
                    items={[
                        {
                            value: "6",
                            label: "Villes cibles",
                            sublabel: "Casablanca, Rabat, Marrakech, Tanger, Fès, Agadir",
                        },
                        {
                            value: "50",
                            suffix: "+",
                            label: "Restaurants ciblés",
                            sublabel: "sélection éditoriale premium (Y1)",
                        },
                        {
                            value: "MENA",
                            label: "Expansion",
                            sublabel: "après consolidation Maroc (Y3)",
                        },
                    ]}
                />
            </ScrollReveal>

            {/* 3. TabbedFeatureShowcase — le produit déjà livré */}
            <ScrollReveal>
                <TabbedFeatureShowcase
                    eyebrow="LE PRODUIT"
                    title="Ce que nous avons déjà livré"
                    accent="déjà livré"
                    variant="white"
                    tabs={[
                        {
                            id: "marketplace",
                            label: "Marketplace",
                            image: {
                                src: "/assets/landing/screenshots/marketplace-vertical.jpg",
                                alt: "Marketplace publique lebonresto.ma",
                            },
                            description:
                                "Côté gourmets : découverte éditoriale et réservation en deux clics.",
                            bullets: [
                                "~12 restaurants premium référencés",
                                "Fiche enrichie : galerie, menu, plats signatures",
                                "Avis vérifiés post-réservation",
                                "Visite 360° et carte intégrée",
                            ],
                            cta: {
                                label: "Voir la marketplace",
                                href: "https://lebonresto.ma",
                            },
                        },
                        {
                            id: "resto",
                            label: "Back-office owner",
                            image: {
                                src: "/assets/landing/heroes/restaurateur-tablet.jpg",
                                alt: "Back-office restaurateur Le Bon Resto",
                            },
                            description:
                                "Côté restaurateurs : un cockpit complet pour piloter la vitrine.",
                            bullets: [
                                "Gestion autonome des photos, menus et horaires",
                                "Réservations centralisées en temps réel",
                                "Réponse aux avis et programmation d'événements",
                                "Statistiques de visite et de conversion",
                            ],
                        },
                        {
                            id: "admin",
                            label: "Back-office admin",
                            image: {
                                src: "/assets/landing/heroes/investor-dashboard.jpg",
                                alt: "Back-office admin Le Bon Resto",
                            },
                            description:
                                "Côté opérations : supervision multi-restaurants et reporting.",
                            bullets: [
                                "Vision globale marketplace en temps réel",
                                "Gestion villes, catégories et clients",
                                "Modération du feedback et reporting",
                                "Architecture pensée pour le MENA",
                            ],
                        },
                    ]}
                />
            </ScrollReveal>

            {/* 4. Modèle économique */}
            <ScrollReveal>
                <section className="bg-cream-50 py-10 sm:py-14 lg:py-16">
                    <div className="container-wide">
                        <SectionHeader
                            eyebrow="NOTRE THÈSE"
                            title="Un modèle économique diversifié"
                            accent="diversifié"
                            description="Le Bon Resto est positionné comme le rail vertical de la découverte gastronomique premium au Maroc : marketplace côté convives, suite SaaS côté restaurateurs."
                        />
                        <div className="mt-8 sm:mt-10">
                            <BusinessModelGrid streams={revenueStreams} />
                        </div>
                        <p className="mt-8 sm:mt-10 text-center text-sm italic text-slate-500">
                            Unit economics détaillées dans le dossier, sous NDA.
                        </p>
                    </div>
                </section>
            </ScrollReveal>

            {/* 5. Roadmap — dark navy */}
            <ScrollReveal>
                <section className="bg-secondary py-10 text-white sm:py-14 lg:py-16">
                    <div className="container-wide">
                        <SectionHeader
                            eyebrow="LA FEUILLE DE ROUTE"
                            title="De Casablanca au MENA"
                            accent="MENA"
                            description="Densification des 6 villes actives, ouverture des villes secondaires, renforcement du module fidélisation, puis expansion francophonie."
                            className="[&_h2]:text-white [&_p]:text-cream-100/80"
                        />
                        <div className="mt-8 sm:mt-10">
                            <RoadmapTimeline phases={growthRoadmap} />
                        </div>
                    </div>
                </section>
            </ScrollReveal>

            {/* 6. Avantages — pourquoi maintenant */}
            <ScrollReveal>
                <section className="bg-white py-10 sm:py-14 lg:py-16">
                    <div className="container-wide">
                        <SectionHeader
                            eyebrow="POURQUOI MAINTENANT"
                            title="Le timing du Maroc premium"
                            description="Adoption mobile et e-paiement en accélération, reprise du tourisme premium, restaurateurs mûrs pour les outils verticaux : la fenêtre est ouverte."
                        />
                        <div className="mt-8 sm:mt-10">
                            <FeatureGrid
                                items={advantages.map((a) => ({
                                    title: a.title,
                                    description: a.description,
                                    icon: a.icon,
                                }))}
                                columns={3}
                                variant="plain"
                            />
                        </div>
                    </div>
                </section>
            </ScrollReveal>

            {/* 7. Testimonial + video — produit en production */}
            <ScrollReveal>
                <TestimonialVideoBlock
                    eyebrow="EN PRODUCTION"
                    video={{
                        posterSrc: "/assets/landing/video-posters/about-poster.jpg",
                        posterAlt: "Démo Le Bon Resto",
                        videoUrl: "/videos/lebonresto-about.mp4",
                    }}
                    quote="Le Bon Resto fait ce qu'aucun annuaire généraliste ne fera : une plateforme verticale, en français, pensée pour le contexte marocain et tenue par une équipe locale."
                    author={{
                        name: "Équipe Le Bon Resto",
                        role: "Casablanca",
                        restaurantName: "Marketplace gastronomique premium",
                    }}
                    badge="LIVE"
                />
            </ScrollReveal>

            {/* 8. Formulaire investisseur */}
            <ScrollReveal>
                <section id="form" className="bg-cream-50 py-10 sm:py-14 lg:py-16">
                    <div className="container-wide">
                        <LeadFormCard
                            layout="sidebar"
                            title="Demandez le dossier investisseur"
                            subtitle="Quelques informations suffisent. Nous revenons vers vous sous 48 heures pour signer un NDA et partager le data room."
                            trustPoints={[
                                {
                                    icon: "ShieldCheck",
                                    text: "NDA signé sous 48 heures avant tout partage",
                                },
                                {
                                    icon: "FileText",
                                    text: "Data room : marché, traction, finances, équipe",
                                },
                                {
                                    icon: "Phone",
                                    text: "Premier appel de 45 min avec le fondateur",
                                },
                            ]}
                            reassurance="Vos coordonnées restent confidentielles. Aucune donnée transmise sans NDA."
                            form={<InvestorLeadForm />}
                        />
                    </div>
                </section>
            </ScrollReveal>

            {/* 9. FAQ investisseurs */}
            <ScrollReveal>
                <FAQAccordion
                    title="Questions investisseurs"
                    variant="cream"
                    items={[
                        {
                            question: "Quel est le stade actuel du projet ?",
                            answer:
                                "Produit livré et en pré-lancement sur lebonresto.ma. Marketplace publique, back-office restaurateurs et back-office admin sont opérationnels. Focus actuel : signature des premières maisons partenaires sur Casablanca, Marrakech et Rabat.",
                        },
                        {
                            question: "Comment se déroule le process investisseur ?",
                            answer:
                                "Demande du dossier via le formulaire, NDA signé sous 48 heures, envoi du data room, premier appel de 45 minutes avec le fondateur, puis échanges de due diligence.",
                        },
                        {
                            question: "Que contient le data room ?",
                            answer:
                                "Analyse du marché marocain et benchmark régional, traction détaillée, modèle économique et structure des formules, feuille de route produit sur 18-24 mois, présentation de l'équipe et de la gouvernance.",
                        },
                        {
                            question: "Publiez-vous des chiffres TAM / SAM / SOM ici ?",
                            answer:
                                "Non. Nous préférons partager les données de marché et les projections dans le data room, sous NDA, pour les discuter dans leur contexte plutôt que de les diffuser publiquement.",
                        },
                        {
                            question: "Où est domiciliée la société ?",
                            answer:
                                "Casablanca. La structure marocaine peut être complétée par une holding pour accueillir des investisseurs internationaux selon les besoins.",
                        },
                        {
                            question: "Quel est l'horizon de sortie envisagé ?",
                            answer:
                                "Deux scénarios principaux : acquisition par un acteur MENA ou européen de la verticale restauration, ou tour de Series A pour financer l'expansion francophone et MENA.",
                        },
                    ]}
                />
            </ScrollReveal>

            {/* 10. CTA finale */}
            <ScrollReveal>
                <LandingFooterCTA
                    title="Envie d'aller plus loin avec Le Bon Resto ?"
                    primaryCta={{
                        label: "Demander le dossier",
                        href: "#form",
                    }}
                    secondaryCta={{
                        label: "Écrire au fondateur",
                        href: "mailto:le.bon.restau@gmail.com",
                    }}
                />
            </ScrollReveal>
        </>
    );
}
