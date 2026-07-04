import type { Metadata } from "next";

import ProductHero from "@/components/landing/ProductHero";
import TabbedFeatureShowcase from "@/components/landing/TabbedFeatureShowcase";
import ImageChecklistSection from "@/components/landing/ImageChecklistSection";
import FAQAccordion from "@/components/landing/FAQAccordion";
import CTASection from "@/components/landing/CTASection";
import ScrollReveal from "@/components/landing/ScrollReveal";
import ProblemStatementBand from "@/components/landing/ProblemStatementBand";
import RestaurantShowcaseStrip from "@/components/landing/RestaurantShowcaseStrip";

export const metadata: Metadata = {
    title: "Notre solution — Marketplace + SaaS restaurants au Maroc",
    description:
        "Le Bon Resto réunit marketplace gourmet et outils de gestion pour restaurants premium au Maroc. Visibilité, réservations, fidélisation.",
    openGraph: {
        title: "Notre solution — Marketplace + SaaS restaurants au Maroc",
        description:
            "Le Bon Resto réunit marketplace gourmet et outils de gestion pour restaurants premium au Maroc. Visibilité, réservations, fidélisation.",
        siteName: "LeBonResto",
        locale: "fr_FR",
        type: "website",
        images: [
            {
                url: "/assets/landing/heroes/solution-cinematic.jpg",
                width: 1200,
                height: 630,
                alt: "LeBonResto — la marketplace gastronomique",
            },
        ],
    },
    twitter: { card: "summary_large_image" },
};

export default function NotreSolutionPage() {
    return (
        <>
            {/* 1) Hero — text + CTAs left, product mockup right, floating UI cards */}
            <ProductHero
                eyebrow="UNE PLATEFORME, DEUX PROMESSES"
                headline="Une plateforme premium pour les restaurants marocains et leurs convives"
                accent="pour les restaurants marocains"
                subheadline="Côté gourmets, une marketplace exigeante. Côté restaurateurs, une suite d'outils dédiée. Le tout pensé pour le contexte marocain."
                primaryCta={{ label: "Voir nos formules", href: "/tarifs" }}
                secondaryCta={{ label: "Demander une démo", href: "/contact" }}
                mockup={{
                    src: "/assets/landing/screenshots/lebonresto-home.jpg",
                    alt: "LeBonResto — page d'accueil de la marketplace",
                    aspect: "tablet",
                }}
                backgroundImage={{
                    src: "/assets/landing/heroes/solution-cinematic.jpg",
                    alt: "",
                }}
                floatingCards={[
                    { icon: "Sparkles", label: "Éditorial", value: "Premium" },
                    { icon: "MapPin", label: "Marché", value: "Maroc" },
                    { icon: "Camera", label: "Visite 360°", value: "incluse" },
                ]}
                trustPoints={[
                    { icon: "ShieldCheck", text: "Sélection éditoriale rigoureuse" },
                    { icon: "MessagesSquare", text: "Support WhatsApp en français" },
                    { icon: "Rocket", text: "Mise en ligne en 7 jours" },
                ]}
            />

            {/* 2) Problem statement — cadre le pourquoi juste avant la vitrine produit */}
            <ScrollReveal>
                <ProblemStatementBand
                    eyebrow="LE PROBLÈME"
                    headline="Les meilleures tables du Maroc restent invisibles. On change ça."
                    accent="On change ça."
                    description="Fiches Google incomplètes, réservations éparpillées, avis anonymes : la scène gastronomique marocaine premium mérite mieux qu'un annuaire."
                    variant="cream"
                    cta={{ label: "Notre approche", href: "#showcase" }}
                />
            </ScrollReveal>

            {/* 3) Tabbed product showcase — 3 perspectives on the platform */}
            <section id="showcase" className="scroll-mt-12">
                <TabbedFeatureShowcase
                    eyebrow="CE QUE NOUS APPORTONS"
                    title="Aux gourmets et aux restaurateurs"
                    accent="restaurateurs"
                    description="Une marketplace exigeante côté convives, une suite d'outils dédiée côté restaurateurs."
                    variant="cream"
                    tabs={[
                        {
                            id: "client",
                            label: "Côté gourmets",
                            image: {
                                src: "/assets/landing/screenshots/resto-detail.jpg",
                                alt: "Fiche restaurant LeBonResto — ILOLI Restaurant",
                            },
                            description: "Une sélection éditoriale rigoureuse, une réservation fluide, des fiches enrichies.",
                            bullets: [
                                "Recherche par ville, ambiance, type de cuisine",
                                "Réservation directe, confirmation rapide",
                                "Fiches enrichies : photos, carte, plats signatures",
                                "Avis 100 % vérifiés post-réservation",
                            ],
                            cta: { label: "Voir le marketplace", href: "https://lebonresto.ma" },
                        },
                        {
                            id: "resto",
                            label: "Côté restaurateurs",
                            image: {
                                src: "/assets/landing/screenshots/owner-dashboard.jpg",
                                alt: "Tableau de bord restaurateur LeBonResto",
                            },
                            description: "Une vitrine premium et un back-office complet pour piloter votre activité.",
                            bullets: [
                                "Vitrine premium sur le marketplace national",
                                "Tableau de bord : réservations, performance, avis",
                                "Gestion autonome : photos, menu, horaires, événements",
                                "Module Visite 360° pour une présentation immersive",
                            ],
                            cta: { label: "Inscrire mon restaurant", href: "/restaurateurs" },
                        },
                        {
                            id: "dashboard",
                            label: "Côté opérations",
                            image: {
                                src: "/assets/landing/screenshots/admin-dashboard.jpg",
                                alt: "Tableau de bord admin LeBonResto",
                            },
                            description: "Pilotez votre activité avec des données claires.",
                            bullets: [
                                "Réservations en temps réel",
                                "Note moyenne et avis",
                                "Conversion vues → réservations",
                                "Performance par offre & événement",
                            ],
                            cta: {
                                label: "Découvrir l'app restaurateur",
                                href: "/restaurateurs",
                            },
                        },
                    ]}
                />
            </section>

            {/* 4) Pour les clients — image right, checklist left */}
            <ScrollReveal>
                <ImageChecklistSection
                    eyebrow="POUR LES GOURMETS"
                    title="Une découverte gastronomique fiable, élégante et inspirante"
                    accent="fiable, élégante et inspirante"
                    description="Quatre étapes simples pour choisir la bonne table."
                    image={{
                        src: "/assets/landing/heroes/solution-cinematic.jpg",
                        alt: "Scène de restaurant marocain",
                    }}
                    imagePosition="right"
                    variant="white"
                    items={[
                        {
                            title: "Cherchez par ville ou cuisine",
                            description:
                                "Filtres précis : prix, ambiance, horaires, distance.",
                        },
                        {
                            title: "Comparez visuellement",
                            description:
                                "Photos pro, visite 360°, menus complets et avis vérifiés.",
                        },
                        {
                            title: "Réservez en un clic",
                            description:
                                "Confirmation instantanée, rappels SMS, agenda centralisé.",
                        },
                        {
                            title: "Notez après votre visite",
                            description:
                                "Seuls les vrais clients peuvent laisser un avis.",
                        },
                    ]}
                    cta={{ label: "Visiter le marketplace", href: "https://lebonresto.ma" }}
                />
            </ScrollReveal>

            {/* 6) Pour les restaurateurs — image left, checklist right */}
            <ScrollReveal>
                <ImageChecklistSection
                    eyebrow="POUR LES RESTAURATEURS"
                    title="Exister en ligne avec la même exigence qu'en salle"
                    accent="la même exigence qu'en salle"
                    description="Une vitrine premium, un back-office complet, un accompagnement humain."
                    image={{
                        src: "/assets/landing/heroes/restaurateur-tablet.jpg",
                        alt: "Restaurateur consultant le dashboard LeBonResto",
                    }}
                    imagePosition="left"
                    variant="cream"
                    items={[
                        {
                            title: "Visibilité premium",
                            description:
                                "Une fiche enrichie sur lebonresto.ma, optimisée pour le référencement organique.",
                        },
                        {
                            title: "Réservations centralisées",
                            description: "Recevez, confirmez, reprogrammez depuis une interface unique — sans jongler entre WhatsApp, téléphone et e-mail.",
                        },
                        {
                            title: "Fidélisation et réputation",
                            description:
                                "Avis vérifiés, événements, offres, suivi des habitués — vos convives reviennent.",
                        },
                        {
                            title: "Accompagnement humain",
                            description: "Notre équipe parle français et arabe, et reste proche des restaurateurs marocains.",
                        },
                    ]}
                    cta={{ label: "Rejoindre LeBonResto", href: "/restaurateurs" }}
                />
            </ScrollReveal>

            {/* 6b) Vitrine restaurants — sélection éditoriale qui inspire l'expérience */}
            <ScrollReveal>
                <RestaurantShowcaseStrip
                    title="Des maisons qui nous inspirent"
                    accent="nous inspirent"
                    description="Le type de tables que LeBonResto met en avant : sélection éditoriale exigeante, exp&eacute;rience premium."
                />
            </ScrollReveal>

            {/* 7) FAQ accordion */}
            <ScrollReveal>
                <FAQAccordion
                    eyebrow="QUESTIONS FRÉQUENTES"
                    title="Tout ce que vous voulez savoir"
                    accent="savoir"
                    variant="cream"
                    items={[
                        {
                            question:
                                "Quels sont les engagements de durée ?",
                            answer:
                                "Pas d'engagement long. Le détail est dans les conditions de chaque formule, à discuter au moment du devis. Notre objectif est une relation durable, pas un piège contractuel.",
                        },
                        {
                            question: "Faut-il déjà avoir un site web ?",
                            answer:
                                "Non. Votre fiche Le Bon Resto fait office de vitrine dès la mise en ligne — photos pro, menu, horaires, réservation, visite 360°.",
                        },
                        {
                            question: "Comment se déroule l'onboarding ?",
                            answer:
                                "Notre équipe construit la fiche avec vous, photos et menu inclus. Mise en ligne sous 7 à 14 jours après l'appel découverte.",
                        },
                        {
                            question: "Comment fonctionnent les avis vérifiés ?",
                            answer:
                                "Seuls les convives ayant effectivement réservé via Le Bon Resto peuvent laisser un avis. Cela élimine 100 % des avis anonymes ou monétisés.",
                        },
                        {
                            question: "Dans quelles villes êtes-vous présents ?",
                            answer:
                                "Casablanca, Rabat, Marrakech, Tanger, Fès et Agadir aujourd'hui. Pipeline ouvert sur Al Hoceima et d'autres villes secondaires.",
                        },
                    ]}
                />
            </ScrollReveal>

            {/* 9) CTA finale */}
            <ScrollReveal>
                <CTASection
                    variant="teal"
                    title="Prêts à passer à l'étape suivante ?"
                    primaryCta={{ label: "Voir nos formules", href: "/tarifs" }}
                    secondaryCta={{
                        label: "Parler à un conseiller",
                        href: "/contact",
                    }}
                />
            </ScrollReveal>
        </>
    );
}
