import type { Metadata } from "next";

import ProductHero from "@/components/landing/ProductHero";
import SectionHeader from "@/components/landing/SectionHeader";
import FeatureGrid from "@/components/landing/FeatureGrid";
import JourneyTimeline from "@/components/landing/JourneyTimeline";
import FeatureVisualCard from "@/components/landing/FeatureVisualCard";
import ImageChecklistSection from "@/components/landing/ImageChecklistSection";
import VideoShowcase from "@/components/landing/VideoShowcase";
import StatBand from "@/components/landing/StatBand";
import FAQAccordion from "@/components/landing/FAQAccordion";
import CTASection from "@/components/landing/CTASection";
import LandingFooterCTA from "@/components/landing/LandingFooterCTA";
import ScrollReveal from "@/components/landing/ScrollReveal";

export const metadata: Metadata = {
    title: "Visite virtuelle 360° pour restaurants — Le Bon Resto",
    description:
        "Faites entrer vos futurs convives avant même qu'ils ne franchissent la porte. La Visite 360° signature de Le Bon Resto.",
    openGraph: {
        title: "Visite virtuelle 360° pour restaurants — Le Bon Resto",
        description:
            "Faites entrer vos futurs convives avant même qu'ils ne franchissent la porte. La Visite 360° signature de Le Bon Resto.",
        siteName: "LeBonResto",
        locale: "fr_FR",
        type: "website",
        images: [
            {
                url: "/assets/landing/heroes/solution-cinematic.jpg",
                width: 1200,
                height: 630,
                alt: "Visite virtuelle 360° d'un restaurant marocain premium",
            },
        ],
    },
    twitter: { card: "summary_large_image" },
};

export default function Visite360Page() {
    return (
        <>
            {/* 1) Hero — immersive headline + 360 viewer mockup */}
            <ProductHero
                eyebrow="EXCLUSIVITÉ LE BON RESTO"
                headline="La Visite 360°, votre vitrine immersive"
                accent="Visite 360°"
                subheadline="Une promesse visuelle qui transforme une fiche en pré-expérience. Pensée pour les riads, les rooftops et les tables d'auteur."
                primaryCta={{
                    label: "Activer la Visite 360°",
                    href: "/restaurateurs#inscription",
                }}
                secondaryCta={{
                    label: "Voir un exemple",
                    href: "/exemple-fiche-restaurant#visite-360",
                }}
                mockup={{
                    /* Live interactive 360 panorama embedded directly in the
                     * hero device frame. The user can drag to look around the
                     * scene without leaving the page — turns the hero into a
                     * working demo of the feature being sold. TODO: swap for
                     * the production LeBonResto VT360 embed once available. */
                    iframeSrc:
                        "https://iloli-restaurant.com/visite_virtuelle/index.html",
                    alt: "Visite 360° interactive — démonstration LeBonResto",
                    aspect: "tablet",
                }}
                backgroundImage={{
                    src: "/assets/landing/heroes/solution-cinematic.jpg",
                    alt: "",
                }}
                floatingCards={[
                    { icon: "Camera", label: "Visite 360°", value: "live" },
                    { icon: "Eye", label: "Pré-expérience", value: "+" },
                    { icon: "Sparkles", label: "Signature", value: "LBR" },
                ]}
            />

            {/* 2) Why 360° changes everything — 4 bénéfices */}
            <ScrollReveal>
                <section className="bg-cream-50 py-10 md:py-14 lg:py-16">
                    <div className="container-wide">
                        <SectionHeader
                            eyebrow="CE QU'ELLE APPORTE"
                            title="Pourquoi la Visite 360° change tout"
                            accent="change tout"
                            description="Quatre bénéfices concrets qui transforment l'hésitation en réservation."
                            align="center"
                        />
                        <div className="mt-8 sm:mt-10">
                            <FeatureGrid
                                columns={4}
                                items={[
                                    {
                                        icon: "ShieldCheck",
                                        title: "Réassurance avant réservation",
                                        description:
                                            "Vos convives savent où ils mettent les pieds. Plus d'inconnu, plus de doute.",
                                    },
                                    {
                                        icon: "Sparkles",
                                        title: "Mise en valeur de l'atmosphère",
                                        description:
                                            "La lumière, le décor, la disposition deviennent un argument visuel à part entière.",
                                    },
                                    {
                                        icon: "Eye",
                                        title: "Différenciation immédiate",
                                        description:
                                            "Sur la marketplace, votre fiche se distingue au premier regard.",
                                    },
                                    {
                                        icon: "TrendingUp",
                                        title: "Augmentation de la conversion",
                                        description:
                                            "Moins d'hésitation côté convive, plus de réservations confirmées.",
                                    },
                                ]}
                            />
                        </div>
                    </div>
                </section>
            </ScrollReveal>

            {/* 3) How it works — 4 steps for the restaurateur */}
            <ScrollReveal>
                <section className="bg-white py-10 md:py-14 lg:py-16">
                    <div className="container-wide">
                        <SectionHeader
                            eyebrow="LE PROCESS"
                            title="Comment ça marche pour le restaurateur"
                            accent="pour le restaurateur"
                            description="Quatre étapes encadrées par notre équipe, de la prise de vue jusqu'à la mise en ligne."
                            align="center"
                        />
                        <div className="mt-8 sm:mt-10 max-w-3xl mx-auto">
                            <JourneyTimeline
                                eyebrow="ÉTAPES"
                                steps={[
                                    {
                                        step: 1,
                                        icon: "Camera",
                                        title: "Prise de vue",
                                        description:
                                            "Notre équipe photographe vient sur place avec l'équipement adapté pour capturer chaque espace clé.",
                                    },
                                    {
                                        step: 2,
                                        icon: "Wand2",
                                        title: "Post-production",
                                        description:
                                            "Stitching, retouche, fluidité du viewer — chaque scène est optimisée pour une navigation immersive.",
                                    },
                                    {
                                        step: 3,
                                        icon: "Upload",
                                        title: "Intégration",
                                        description:
                                            "La Visite 360° est ajoutée à votre fiche sur lebonresto.ma, accessible en un clic depuis la galerie.",
                                    },
                                    {
                                        step: 4,
                                        icon: "RefreshCw",
                                        title: "Mise à jour annuelle",
                                        description:
                                            "Reprogrammez une session pour une nouvelle décoration, un nouvel espace ou une saison particulière.",
                                    },
                                ]}
                            />
                        </div>
                    </div>
                </section>
            </ScrollReveal>

            {/* 4) What guests experience — image checklist with placeholder video showcase */}
            <ScrollReveal>
                <ImageChecklistSection
                    eyebrow="DU CÔTÉ DU GOURMET"
                    title="Ce que vivent vos convives"
                    accent="vos convives"
                    description="Le visiteur entre dans la fiche, lance la Visite 360° au survol ou au clic, navigue dans la salle, voit la terrasse, comprend l'ambiance. Il réserve avec confiance."
                    image={{
                        src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1600&q=80",
                        alt: "Aperçu d'une Visite 360° dans un riad marocain",
                    }}
                    imagePosition="right"
                    variant="cream"
                    items={[
                        {
                            title: "Il entre dans la fiche",
                            description:
                                "Galerie, plats signatures, avis vérifiés — et un bouton bien visible pour lancer la visite.",
                        },
                        {
                            title: "Il lance la Visite 360°",
                            description:
                                "Au survol ou au clic, le viewer s'ouvre sans quitter la fiche, sans inscription.",
                        },
                        {
                            title: "Il navigue dans la salle",
                            description:
                                "Patio, terrasse, salon — il explore chaque espace à son rythme.",
                        },
                        {
                            title: "Il réserve avec confiance",
                            description:
                                "L'ambiance est validée, le doute est levé. La réservation devient évidente.",
                        },
                    ]}
                    cta={{
                        label: "Voir une fiche complète",
                        href: "/exemple-fiche-restaurant#visite-360",
                    }}
                />
            </ScrollReveal>

            {/* 5) Video showcase — immersive teaser (no real MP4 yet, will toast "bientôt disponible") */}
            <ScrollReveal>
                <section className="bg-white py-10 md:py-14 lg:py-16">
                    <div className="container-wide">
                        <VideoShowcase
                            caption="APERÇU"
                            title="Une visite, comme si vous y étiez"
                            description="Quelques secondes suffisent pour saisir la promesse d'un riad, d'un rooftop ou d'une table d'auteur. La Visite 360° rend tangible ce qu'aucune photo ne raconte."
                            posterSrc="/assets/landing/heroes/solution-cinematic.jpg"
                            posterAlt="Aperçu vidéo d'une Visite 360° Le Bon Resto"
                        />
                    </div>
                </section>
            </ScrollReveal>

            {/* 6) Establishments — 4 visual cards */}
            <ScrollReveal>
                <section className="bg-cream-50 py-10 md:py-14 lg:py-16">
                    <div className="container-wide">
                        <SectionHeader
                            eyebrow="IDÉAL POUR"
                            title="Pour quels types d'établissements"
                            accent="établissements"
                            description="La Visite 360° est particulièrement décisive pour les maisons où l'atmosphère fait partie de la promesse."
                            align="center"
                        />
                        <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
                            <FeatureVisualCard
                                eyebrow="RIADS"
                                title="Riads et maisons d'hôtes restaurants"
                                description="Patio, terrasse, salle voûtée — la magie se voit avant même de franchir la porte."
                                image={{
                                    // Unsplash fallback — Moroccan riad-style interior courtyard.
                                    src: "https://images.unsplash.com/photo-1567521464027-f127ff144326?auto=format&fit=crop&w=1200&q=80",
                                    alt: "Patio d'un riad marocain au crépuscule",
                                }}
                                aspect="4/3"
                            />
                            <FeatureVisualCard
                                eyebrow="ROOFTOPS"
                                title="Rooftops"
                                description="La vue est un argument décisif. La Visite 360° la met au cœur de la fiche."
                                image={{
                                    // Unsplash fallback — rooftop / terrace dining at dusk.
                                    src: "https://images.unsplash.com/photo-1525610553991-2bede1a236e2?auto=format&fit=crop&w=1200&q=80",
                                    alt: "Rooftop d'un restaurant marocain en soirée",
                                }}
                                aspect="4/3"
                            />
                            <FeatureVisualCard
                                eyebrow="TABLES D'AUTEUR"
                                title="Tables d'auteur"
                                description="La scénographie de salle fait partie de la promesse — montrez-la avant l'arrivée."
                                image={{
                                    // Unsplash fallback — fine dining table setting.
                                    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80",
                                    alt: "Salle d'une table d'auteur dressée pour le service",
                                }}
                                aspect="4/3"
                            />
                            <FeatureVisualCard
                                eyebrow="IDENTITÉ DÉCO"
                                title="Restaurants à forte identité décorative"
                                description="Bistronomies design, restaurants ethniques — votre univers visuel devient un atout commercial."
                                image={{
                                    // Unsplash fallback — designer restaurant interior.
                                    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
                                    alt: "Intérieur d'un restaurant à forte identité décorative",
                                }}
                                aspect="4/3"
                            />
                        </div>
                    </div>
                </section>
            </ScrollReveal>

            {/* 6.5) LIVE 360° demo — interactive iframe to convince the visitor */}
            <ScrollReveal>
                <section className="bg-secondary text-white py-12 md:py-16 lg:py-20 relative overflow-hidden">
                    {/* Decorative cream radial accent top-right */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full opacity-20"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(1,107,97,0.6) 0%, transparent 70%)",
                        }}
                    />
                    <div className="container-wide relative">
                        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
                            {/* Left — pitch + CTAs */}
                            <div className="lg:col-span-5">
                                <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-primary-300">
                                    DÉMONSTRATION LIVE
                                </p>
                                <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold leading-[1.1] text-balance">
                                    Cliquez. Faites pivoter.{" "}
                                    <span className="text-primary-300">Voyez par vous-même.</span>
                                </h2>
                                <p className="mt-4 text-sm sm:text-base text-slate-300 text-pretty max-w-md">
                                    Une vraie Visite 360° d&apos;une de nos maisons pionnières,
                                    intégrée directement dans la page. Glissez avec la souris ou
                                    le doigt — explorez la salle comme si vous y étiez.
                                </p>
                                <ul className="mt-6 space-y-2 text-sm text-slate-200">
                                    <li className="flex items-start gap-2">
                                        <span className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-primary-300" />
                                        Navigable en plein écran, sans plugin
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-primary-300" />
                                        Compatible mobile, tablette et desktop
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-primary-300" />
                                        Production sur site incluse en Premium et Pro
                                    </li>
                                </ul>
                            </div>

                            {/* Right — live 360 iframe */}
                            <div className="lg:col-span-7">
                                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl ring-1 ring-white/15 shadow-glow bg-black">
                                    {/* TODO: swap the src below with the production
                                        VT360 embed URL from the LeBonResto backend
                                        (e.g. https://api.lebonresto.ma/vt360/<scene>/embed)
                                        once the demo scene is published.
                                        Current placeholder = Pannellum hosted viewer
                                        with a sample equirectangular panorama. */}
                                    <iframe
                                        title="Visite virtuelle — maison pionnière LeBonResto"
                                        src="https://iloli-restaurant.com/visite_virtuelle/index.html"
                                        loading="lazy"
                                        allow="accelerometer; gyroscope; fullscreen"
                                        allowFullScreen
                                        className="absolute inset-0 h-full w-full border-0"
                                    />
                                    {/* Subtle gradient overlay at corners for premium frame look */}
                                    <div
                                        aria-hidden="true"
                                        className="pointer-events-none absolute inset-0 ring-inset ring-1 ring-white/5 rounded-3xl"
                                    />
                                </div>
                                <p className="mt-3 text-xs text-slate-400 text-center">
                                    Glissez pour faire pivoter · Molette ou pincement pour zoomer
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </ScrollReveal>

            {/* 7) Stat band — quick proof so the page isn't only inspirational */}
            <ScrollReveal>
                <StatBand
                    eyebrow="LA VISITE 360° EN CONTEXTE"
                    title="Pensée pour le contexte marocain premium"
                    accent="marocain premium"
                    variant="cream"
                    items={[
                        {
                            value: "12",
                            suffix: "+",
                            label: "Maisons pionnières",
                            sublabel: "Riads, rooftops et tables d'auteur",
                        },
                        {
                            value: "6",
                            label: "Villes actives",
                            sublabel: "Casablanca, Rabat, Marrakech, Tanger, Fès, Agadir",
                        },
                        {
                            value: "4.6",
                            suffix: "/5",
                            label: "Note moyenne",
                            sublabel: "sur les fiches enrichies",
                        },
                    ]}
                />
            </ScrollReveal>

            {/* 8) Included in Premium / Pro — CTA towards /tarifs */}
            <ScrollReveal>
                <CTASection
                    variant="soft"
                    title="Inclus dans nos formules Premium et Pro"
                    description="En formule Starter, la Visite 360° est disponible en option à la demande. Dans Premium et Pro, elle est incluse dans votre forfait d'onboarding."
                    primaryCta={{ label: "Voir les formules", href: "/tarifs" }}
                    secondaryCta={{
                        label: "Comparer en détail",
                        href: "/tarifs#comparatif",
                    }}
                />
            </ScrollReveal>

            {/* 9) FAQ — common questions about the 360 module */}
            <ScrollReveal>
                <FAQAccordion
                    eyebrow="QUESTIONS FRÉQUENTES"
                    title="Tout ce que vous voulez savoir sur la Visite 360°"
                    accent="Visite 360°"
                    variant="cream"
                    items={[
                        {
                            question: "Combien de temps dure la prise de vue ?",
                            answer:
                                "Comptez en moyenne 2 à 4 heures sur place, selon la surface du restaurant et le nombre d'espaces à capturer (salle, patio, terrasse, salons privés).",
                        },
                        {
                            question:
                                "Faut-il fermer le restaurant pendant la prise de vue ?",
                            answer:
                                "Non. La prise de vue se fait généralement hors service ou pendant les heures creuses. Nous organisons la session avec vous pour minimiser l'impact opérationnel.",
                        },
                        {
                            question:
                                "Combien d'espaces peuvent être inclus dans la visite ?",
                            answer:
                                "Tous les espaces ouverts aux convives : salle principale, patio, terrasse, rooftop, salons privés. Notre équipe vous conseille sur la sélection la plus impactante.",
                        },
                        {
                            question:
                                "La Visite 360° est-elle compatible mobile ?",
                            answer:
                                "Oui, le viewer s'adapte automatiquement aux smartphones et tablettes. Le contrôle tactile permet une navigation fluide, sans installation d'application.",
                        },
                        {
                            question:
                                "Peut-on mettre à jour la visite en cas de rénovation ?",
                            answer:
                                "Oui. Une mise à jour annuelle est possible, ainsi qu'une nouvelle session ponctuelle en cas de rénovation majeure ou de saison particulière.",
                        },
                        {
                            question:
                                "Combien coûte la Visite 360° en option Starter ?",
                            answer:
                                "Le tarif est établi sur devis, en fonction de la surface, du nombre de scènes et du niveau de retouche. Demandez votre devis depuis la page restaurateurs.",
                        },
                    ]}
                />
            </ScrollReveal>

            {/* 10) Final CTA */}
            <ScrollReveal>
                <LandingFooterCTA
                    title="Envie d'ouvrir vos portes virtuelles ?"
                    primaryCta={{
                        label: "Activer la Visite 360° pour mon restaurant",
                        href: "/restaurateurs#inscription",
                    }}
                    secondaryCta={{
                        label: "Parler à un conseiller",
                        href: "/contact",
                    }}
                />
            </ScrollReveal>
        </>
    );
}
