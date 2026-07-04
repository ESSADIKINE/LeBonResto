import type { Metadata } from "next";

import ProductHero from "@/components/landing/ProductHero";
import SectionHeader from "@/components/landing/SectionHeader";
import JourneyTimeline from "@/components/landing/JourneyTimeline";
import ValuePillars from "@/components/landing/ValuePillars";
import DashboardPreviewBlock from "@/components/landing/DashboardPreviewBlock";
import MobileMockupFlow from "@/components/landing/MobileMockupFlow";
import ScrollReveal from "@/components/landing/ScrollReveal";
import LandingFooterCTA from "@/components/landing/LandingFooterCTA";

export const metadata: Metadata = {
    title: "Comment ça marche — Le Bon Resto",
    description:
        "Côté restaurateur ou côté gourmet, voici comment fonctionne Le Bon Resto en 4 étapes claires.",
    openGraph: {
        title: "Comment ça marche — Le Bon Resto",
        description:
            "Côté restaurateur ou côté gourmet, voici comment fonctionne Le Bon Resto en 4 étapes claires.",
        siteName: "LeBonResto",
        locale: "fr_FR",
        type: "website",
        images: [
            {
                url: "/assets/landing/heroes/solution-cinematic.jpg",
                width: 1200,
                height: 630,
                alt: "Le parcours LeBonResto en 4 étapes",
            },
        ],
    },
    twitter: { card: "summary_large_image" },
};

export default function CommentCaMarchePage() {
    return (
        <>
            {/* 1) Hero — text + CTAs left, restaurateur tablet mockup right */}
            <ProductHero
                eyebrow="LE PROCESS"
                headline="Comment fonctionne Le Bon Resto"
                accent="Le Bon Resto"
                subheadline="Côté gourmet ou côté restaurateur, le parcours est limpide. Découvrez-le en quelques scrolls."
                primaryCta={{ label: "Je suis restaurateur", href: "#cote-restaurateur" }}
                secondaryCta={{ label: "Je suis gourmet", href: "#cote-gourmet" }}
                mockup={{
                    src: "/assets/landing/screenshots/restaurant-detail-vertical.jpg",
                    alt: "Aperçu d'une fiche restaurant LeBonResto",
                    aspect: "tablet",
                }}
                backgroundImage={{
                    src: "/assets/landing/heroes/solution-cinematic.jpg",
                    alt: "",
                }}
                floatingCards={[
                    { icon: "CalendarCheck", label: "Demande de démo", value: "20 min" },
                    { icon: "MapPin", label: "6 villes", value: "Maroc" },
                    { icon: "Star", label: "Avis vérifiés", value: "100 %" },
                ]}
            />

            {/* 2) Côté restaurateur — 4-step vertical journey timeline */}
            <ScrollReveal>
                <section
                    id="cote-restaurateur"
                    className="scroll-mt-[var(--header-h,4rem)] bg-white py-10 md:py-14 lg:py-16"
                >
                    <div className="container-wide grid gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-16">
                        <div className="lg:col-span-5">
                            <SectionHeader
                                eyebrow="CÔTÉ RESTAURATEUR"
                                title="Une mise en ligne sereine en 4 étapes"
                                accent="4 étapes"
                                description="De la première visio à la gestion quotidienne : nos équipes vous accompagnent à chaque étape, sans surprise."
                                align="left"
                            />
                        </div>
                        <div className="lg:col-span-7">
                            <JourneyTimeline
                                eyebrow="PARCOURS RESTAURATEUR"
                                steps={[
                                    {
                                        step: 1,
                                        title: "Demande de démo",
                                        description:
                                            "20 minutes en visio, sans engagement. Nous comprenons votre établissement et vous montrons concrètement ce que LeBonResto peut faire pour vous.",
                                        icon: "CalendarCheck",
                                    },
                                    {
                                        step: 2,
                                        title: "Création de votre fiche",
                                        description:
                                            "Photos, menu, horaires, visite 360°. Nos équipes produisent une vitrine premium qui reflète vraiment votre maison.",
                                        icon: "Camera",
                                    },
                                    {
                                        step: 3,
                                        title: "Mise en ligne",
                                        description:
                                            "Votre vitrine est publiée sur lebonresto.ma et activée dans le marketplace. Les premières réservations arrivent.",
                                        icon: "Rocket",
                                    },
                                    {
                                        step: 4,
                                        title: "Pilotage continu",
                                        description:
                                            "Vous gérez réservations, avis et performance depuis le dashboard. Notre équipe reste disponible pour optimiser votre présence.",
                                        icon: "LineChart",
                                    },
                                ]}
                            />
                        </div>
                    </div>
                </section>
            </ScrollReveal>

            {/* 3) Dashboard preview — visual walk-through of the owner backoffice */}
            <DashboardPreviewBlock
                eyebrow="VOTRE DASHBOARD"
                title="Tout votre restaurant, dans un seul écran"
                accent="un seul écran"
                description="Réservations, avis, offres et statistiques : pilotez votre activité comme un produit, depuis la tablette du comptoir."
                slides={[
                    {
                        image: {
                            src: "/assets/landing/heroes/investor-dashboard.jpg",
                            alt: "Tableau de bord LeBonResto — réservations du jour",
                        },
                        title: "Réservations en temps réel",
                        description:
                            "Un seul agenda centralisé, des confirmations instantanées, des rappels SMS automatiques.",
                    },
                    {
                        image: {
                            src: "/assets/landing/screenshots/restaurant-detail-vertical.jpg",
                            alt: "Votre fiche restaurant LeBonResto",
                        },
                        title: "Votre vitrine premium",
                        description:
                            "Photos, menus, vidéo, visite 360°. Modifiez votre fiche en quelques clics, à tout moment.",
                    },
                    {
                        image: {
                            src: "/assets/landing/mockups/owner-hands-tablet.jpg",
                            alt: "Restaurateur consultant les performances sur tablette",
                        },
                        title: "Performance & avis vérifiés",
                        description:
                            "Note moyenne, conversion vues → réservations, retours clients : vous voyez ce qui marche.",
                    },
                ]}
            />

            {/* 3.5) Parcours global — du clic au couvert en 3 mockups mobiles */}
            <ScrollReveal>
                <MobileMockupFlow
                    eyebrow="LE PARCOURS"
                    title="Du clic au couvert, en 3 étapes"
                    accent="3 étapes"
                    description="Un flux limpide, sans friction, pour le convive comme pour le restaurateur."
                    steps={[
                        {
                            badge: "1",
                            title: "Le convive découvre",
                            description:
                                "Recherche par ville, cuisine ou envie. Fiche restaurant enrichie avec photos, menu et Visite 360°.",
                            image: {
                                src: "/assets/landing/screenshots/lebonresto-home.jpg",
                                alt: "Marketplace LeBonResto",
                            },
                        },
                        {
                            badge: "2",
                            title: "Réservation en un clic",
                            description:
                                "Confirmation instantanée. Rappels SMS. Agenda centralisé côté restaurant.",
                            image: {
                                src: "/assets/landing/screenshots/resto-detail.jpg",
                                alt: "Fiche restaurant",
                            },
                        },
                        {
                            badge: "3",
                            title: "Le restaurant reçoit",
                            description:
                                "Notification temps réel côté propriétaire. Suivi des couverts, avis vérifiés post-visite.",
                            image: {
                                src: "/assets/landing/screenshots/owner-dashboard.jpg",
                                alt: "Dashboard restaurateur",
                            },
                        },
                    ]}
                />
            </ScrollReveal>

            {/* 4) Côté gourmet — 4-step vertical journey timeline */}
            <ScrollReveal>
                <section
                    id="cote-gourmet"
                    className="scroll-mt-[var(--header-h,4rem)] bg-cream-50 py-10 md:py-14 lg:py-16"
                >
                    <div className="container-wide grid gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-16">
                        <div className="lg:col-span-7 lg:order-2">
                            <JourneyTimeline
                                eyebrow="PARCOURS GOURMET"
                                steps={[
                                    {
                                        step: 1,
                                        title: "Choisir une ville",
                                        description:
                                            "Casablanca, Rabat, Marrakech, Tanger, Fès, Agadir. Le marketplace est pensé ville par ville pour ne jamais vous perdre.",
                                        icon: "MapPin",
                                    },
                                    {
                                        step: 2,
                                        title: "Explorer la sélection",
                                        description:
                                            "Filtres par ambiance, type de cuisine, occasion. Photos pro, menus complets et visite 360° avant de réserver.",
                                        icon: "Search",
                                    },
                                    {
                                        step: 3,
                                        title: "Réserver",
                                        description:
                                            "Date, heure, nombre de convives, demande spéciale. Confirmation instantanée et rappels SMS automatiques.",
                                        icon: "CalendarCheck",
                                    },
                                    {
                                        step: 4,
                                        title: "Vivre et partager",
                                        description:
                                            "Profitez du repas, puis laissez votre avis vérifié. Seuls les vrais clients peuvent noter — la note reste fiable.",
                                        icon: "Heart",
                                    },
                                ]}
                            />
                        </div>
                        <div className="lg:col-span-5 lg:order-1">
                            <SectionHeader
                                eyebrow="CÔTÉ GOURMET"
                                title="Du choix de la ville à l'avis vérifié"
                                accent="l'avis vérifié"
                                description="Quatre étapes simples pour découvrir, réserver et raconter votre meilleure adresse — sans friction, sans publicité déguisée."
                                align="left"
                            />
                        </div>
                    </div>
                </section>
            </ScrollReveal>

            {/* 5) Pourquoi cette mécanique — value pillars */}
            <ScrollReveal>
                <section className="bg-white py-10 md:py-14 lg:py-16">
                    <div className="container-wide flex flex-col items-center">
                        <SectionHeader
                            eyebrow="POURQUOI C'EST PENSÉ AINSI"
                            title="Un parcours conçu pour la cuisine, pas pour les outils"
                            accent="pour la cuisine"
                            description="Parce qu'un restaurateur doit pouvoir se concentrer sur sa cuisine, pas sur ses outils. Et parce qu'un gourmet veut découvrir et réserver sans friction."
                            align="center"
                        />
                        <div className="mt-8 sm:mt-10 lg:mt-12 w-full">
                            <ValuePillars
                                values={[
                                    {
                                        title: "Simple pour le restaurateur",
                                        description:
                                            "Un dashboard pensé comme un produit, pas comme un logiciel. Aucune compétence technique requise.",
                                        icon: "Sparkles",
                                    },
                                    {
                                        title: "Fluide pour le gourmet",
                                        description:
                                            "De la recherche à la réservation, tout est conçu pour ne jamais interrompre la décision.",
                                        icon: "Zap",
                                    },
                                    {
                                        title: "Humain à chaque étape",
                                        description:
                                            "Nos équipes accompagnent restaurateurs et clients — la techno ne remplace jamais le contact.",
                                        icon: "Users",
                                    },
                                ]}
                            />
                        </div>
                    </div>
                </section>
            </ScrollReveal>

            {/* 6) CTA finale dual — Landing footer */}
            <ScrollReveal>
                <LandingFooterCTA
                    title="Prêts à essayer ?"
                    primaryCta={{ label: "Je suis restaurateur", href: "/restaurateurs" }}
                    secondaryCta={{ label: "Je suis gourmet", href: "https://lebonresto.ma" }}
                />
            </ScrollReveal>
        </>
    );
}
