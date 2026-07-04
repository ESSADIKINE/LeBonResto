import type { Metadata } from "next";
import { Check } from "lucide-react";
import ProductHero from "@/components/landing/ProductHero";
import SectionHeader from "@/components/landing/SectionHeader";
import ImageChecklistSection from "@/components/landing/ImageChecklistSection";
import TabbedFeatureShowcase from "@/components/landing/TabbedFeatureShowcase";
import BeforeAfterVisual from "@/components/landing/BeforeAfterVisual";
import FAQAccordion from "@/components/landing/FAQAccordion";
import LeadFormCard from "@/components/landing/LeadFormCard";
import LandingFooterCTA from "@/components/landing/LandingFooterCTA";
import PremiumCTA from "@/components/landing/PremiumCTA";
import ScrollReveal from "@/components/landing/ScrollReveal";
import RestaurantOnboardingForm from "@/components/landing/RestaurantOnboardingForm";
import { pricingTiers } from "@/data/landing/pricing";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
    title: "Inscrire votre restaurant — Le Bon Resto",
    description:
        "Vitrine premium, réservations centralisées, dashboard owner. Donnez à votre restaurant la place qu'il mérite sur lebonresto.ma.",
    openGraph: {
        title: "Pour les restaurateurs — Le Bon Resto",
        description:
            "Vitrine premium, réservations centralisées, dashboard owner. Donnez à votre restaurant la place qu'il mérite sur lebonresto.ma.",
        siteName: "Le Bon Resto",
        locale: "fr_FR",
        type: "website",
        images: [
            {
                url: "/assets/landing/heroes/restaurateur-tablet.jpg",
                width: 1200,
                height: 630,
            },
        ],
    },
    twitter: { card: "summary_large_image" },
};

// Avant / après items (4 each) — voix « Sans Le Bon Resto » vs « Avec Le Bon Resto ».
const painPoints = [
    { text: "Demandes éclatées entre téléphone, WhatsApp et messages Instagram." },
    { text: "Annuaires généralistes et réseaux sociaux qui diluent votre identité." },
    { text: "Photos amateurs qui ne reflètent pas la qualité de la salle." },
    { text: "Aucune lecture claire de vos performances ni de vos habitués." },
];

const outcomes = [
    { text: "Un canal unique de réservation, traçable et confirmé." },
    { text: "Une vitrine premium sur la marketplace nationale lebonresto.ma." },
    { text: "Un pack contenu pro qui met votre maison à sa juste place." },
    { text: "Un tableau de bord clair : réservations, avis, conversions." },
];

export default function RestaurateursPage() {
    return (
        <>
            {/* 1. Hero — vitrine restaurant + back-office owner */}
            <ProductHero
                eyebrow="POUR LES RESTAURATEURS"
                headline="Votre restaurant mérite la plus belle vitrine du Maroc."
                accent="la plus belle vitrine du Maroc."
                subheadline="Rejoignez la marketplace premium des tables marocaines et pilotez votre activité depuis un back-office pensé pour vous."
                primaryCta={{ label: "Demander une démo", href: "#form" }}
                secondaryCta={{ label: "Voir les formules", href: "/tarifs" }}
                mockup={{
                    src: "/assets/landing/mockups/owner-hands-tablet.jpg",
                    alt: "Restaurateur consultant son back-office Le Bon Resto sur tablette",
                    aspect: "tablet",
                }}
                backgroundImage={{
                    src: "/assets/landing/heroes/restaurateur-tablet.jpg",
                    alt: "",
                }}
                floatingCards={[
                    { icon: "Sparkles", label: "Vitrine", value: "Premium" },
                    { icon: "MessagesSquare", label: "Support", value: "FR" },
                    { icon: "Camera", label: "Visite 360°", value: "incluse" },
                ]}
                trustPoints={[
                    { icon: "Clock", text: "Réponse sous 48h ouvrées" },
                    { icon: "HeartHandshake", text: "Onboarding accompagné gratuit" },
                    { icon: "ShieldCheck", text: "Sans engagement long" },
                ]}
            />

            {/* 2. Trois piliers — ce que vous obtenez (vitrine digitale) */}
            <ScrollReveal>
                <div id="how">
                    <ImageChecklistSection
                        eyebrow="CE QUE VOUS OBTENEZ"
                        title="Une vitrine premium, des réservations centralisées, une réputation maîtrisée"
                        accent="vitrine premium"
                        description="Trois piliers pour mettre votre maison à la place qu'elle mérite sur le marché marocain."
                        image={{
                            src: "/assets/landing/screenshots/restaurant-detail-vertical.jpg",
                            alt: "Fiche restaurant Le Bon Resto",
                            longScroll: true,
                        }}
                        imagePosition="right"
                        variant="white"
                        items={[
                            {
                                title: "Visibilité premium",
                                description:
                                    "Une fiche soignée sur lebonresto.ma, optimisée pour le référencement et mise en avant par ville et ambiance.",
                            },
                            {
                                title: "Réservations centralisées",
                                description:
                                    "Toutes vos demandes au même endroit : confirmation, refus, reprogrammation, sans jongler entre WhatsApp et téléphone.",
                            },
                            {
                                title: "Fidélisation et réputation",
                                description:
                                    "Avis vérifiés, événements, offres et suivi des habitués : vos convives reviennent.",
                            },
                            {
                                title: "Réservation intégrée",
                                description:
                                    "Confirmation en temps réel, rappels automatiques, contact direct avec votre équipe de salle.",
                            },
                        ]}
                        cta={{
                            label: "Voir un exemple de fiche",
                            href: "/exemple-fiche-restaurant",
                        }}
                    />
                </div>
            </ScrollReveal>

            {/* 5. Tabbed showcase — votre back-office en images */}
            <TabbedFeatureShowcase
                eyebrow="VOTRE BACK-OFFICE OWNER"
                title="Un cockpit clair, en français, accessible depuis votre téléphone"
                variant="cream"
                tabs={[
                    {
                        id: "reservations",
                        label: "Réservations",
                        image: {
                            src: "/assets/landing/heroes/investor-dashboard.jpg",
                            alt: "Module réservations du back-office Le Bon Resto",
                        },
                        description:
                            "Gérez chaque demande en un geste, sans changer d'outil.",
                        bullets: [
                            "Confirmation, refus ou reprogrammation en deux clics",
                            "Vue couverts par service et par jour",
                            "Message direct au convive depuis la fiche",
                            "Historique complet et habitués identifiés",
                        ],
                    },
                    {
                        id: "fiche",
                        label: "Fiche restaurant",
                        image: {
                            src: "/assets/landing/heroes/solution-cinematic.jpg",
                            alt: "Éditeur de fiche restaurant Le Bon Resto",
                        },
                        description:
                            "Restez maître de votre vitrine, à jour à la seconde.",
                        bullets: [
                            "Photos, horaires, description et contacts modifiables à tout moment",
                            "Carte et menu en ligne, plats signatures mis en avant",
                            "Module Visite 360° intégré dans la galerie",
                            "Publication en quelques secondes",
                        ],
                    },
                    {
                        id: "avis",
                        label: "Avis et réputation",
                        image: {
                            src: "/assets/landing/heroes/restaurateur-tablet.jpg",
                            alt: "Module avis vérifiés Le Bon Resto",
                        },
                        description:
                            "Tous vos avis vérifiés au même endroit, jamais d'avis anonyme.",
                        bullets: [
                            "Seuls les convives ayant réservé peuvent noter",
                            "Réponse publique en un clic",
                            "Alerte sur tout avis inférieur à 3 étoiles",
                            "Vision globale de votre réputation par établissement",
                        ],
                    },
                ]}
            />

            {/* 6. Avant / Après Le Bon Resto */}
            <ScrollReveal>
                <section className="bg-white py-10 sm:py-14 lg:py-16">
                    <div className="container-wide">
                        <SectionHeader
                            eyebrow="LE CHANGEMENT"
                            title="Avant Le Bon Resto, après Le Bon Resto"
                        />

                        <div className="mt-8 sm:mt-10 lg:mt-12">
                            <BeforeAfterVisual
                                leftTitle="Sans Le Bon Resto"
                                leftItems={painPoints}
                                rightTitle="Avec Le Bon Resto"
                                rightItems={outcomes}
                                rightImage={{
                                    src: "/assets/landing/heroes/solution-cinematic.jpg",
                                    alt: "Restaurateur pilotant son activité depuis Le Bon Resto",
                                }}
                            />
                        </div>
                    </div>
                </section>
            </ScrollReveal>

            {/* 7. Adapté à votre type d'établissement */}
            <ScrollReveal>
                <ImageChecklistSection
                    eyebrow="QUEL QUE SOIT VOTRE FORMAT"
                    title="Une plateforme adaptée à la diversité des tables marocaines"
                    accent="diversité des tables marocaines"
                    image={{
                        src: "/assets/landing/heroes/about-emotional.jpg",
                        alt: "Salle de restaurant marocain premium",
                    }}
                    imagePosition="left"
                    variant="cream"
                    items={[
                        {
                            title: "Tables d'auteur et gastronomiques",
                            description:
                                "Mise en avant éditoriale, fiche enrichie, accompagnement personnalisé.",
                        },
                        {
                            title: "Riads et maisons d'hôtes restaurants",
                            description:
                                "Visite 360°, galerie photo immersive, intégration menu et carte des vins.",
                        },
                        {
                            title: "Brasseries premium et bistronomies",
                            description:
                                "Réservations centralisées, gestion des événements, animations spéciales.",
                        },
                        {
                            title: "Rooftops et concept bars",
                            description:
                                "Mise en avant par ambiance, programmation événementielle, photos professionnelles.",
                        },
                    ]}
                />
            </ScrollReveal>

            {/* 8. Pricing grid — formules sur devis */}
            <ScrollReveal>
                <section className="bg-white py-10 sm:py-14 lg:py-16">
                    <div className="container-wide">
                        <SectionHeader
                            eyebrow="NOS FORMULES"
                            title="Trois niveaux d'accompagnement, un devis sur mesure"
                        />

                        <div className="mt-8 sm:mt-10 lg:mt-12 grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-3 lg:items-stretch">
                            {pricingTiers.map((tier) => (
                                <article
                                    key={tier.id}
                                    className={cn(
                                        "relative flex flex-col rounded-3xl bg-white p-4 sm:p-5 md:p-6 shadow-premium ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow",
                                        tier.highlighted &&
                                            "ring-2 ring-primary shadow-glow xl:scale-105",
                                    )}
                                >
                                    {tier.highlighted && (
                                        <span className="absolute -top-4 right-6 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white shadow-premium">
                                            Populaire
                                        </span>
                                    )}

                                    <header>
                                        <h3 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-slate-900">
                                            {tier.name}
                                        </h3>
                                        <p className="mt-2 text-sm text-slate-600">
                                            {tier.tagline}
                                        </p>
                                        <div className="mt-6 flex items-baseline gap-2">
                                            <span className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
                                                {tier.price}
                                            </span>
                                        </div>
                                    </header>

                                    <ul className="mt-8 flex-1 space-y-3.5">
                                        {tier.features.map((feature) => (
                                            <li
                                                key={feature}
                                                className="flex items-start gap-3"
                                            >
                                                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                                    <Check
                                                        className="h-3.5 w-3.5"
                                                        aria-hidden="true"
                                                    />
                                                </span>
                                                <span className="text-sm text-slate-700">
                                                    {feature}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="mt-10 pt-6 border-t border-slate-100">
                                        <PremiumCTA
                                            href="#form"
                                            variant={
                                                tier.highlighted
                                                    ? "primary"
                                                    : "secondary"
                                            }
                                            icon="arrow"
                                            className="w-full"
                                        >
                                            Demander mon devis
                                        </PremiumCTA>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            </ScrollReveal>

            {/* 9. Formulaire — demande de démo */}
            <ScrollReveal>
                <section id="form" className="scroll-mt-24 bg-cream-50 py-10 sm:py-14 lg:py-16">
                    <div className="container-wide">
                        <LeadFormCard
                            layout="sidebar"
                            title="Rejoignez Le Bon Resto"
                            subtitle="Renseignez ces quelques champs : notre équipe vous recontacte sous 24 heures ouvrées pour démarrer votre fiche."
                            trustPoints={[
                                { icon: "Clock", text: "Réponse sous 24 h ouvrées" },
                                {
                                    icon: "HeartHandshake",
                                    text: "Onboarding accompagné par une équipe humaine",
                                },
                                {
                                    icon: "Rocket",
                                    text: "Mise en ligne sous 7 à 14 jours",
                                },
                            ]}
                            reassurance="Vos informations restent strictement confidentielles et ne sont jamais revendues."
                            form={<RestaurantOnboardingForm />}
                        />
                    </div>
                </section>
            </ScrollReveal>

            {/* 11. FAQ restaurateurs */}
            <ScrollReveal>
                <FAQAccordion
                    title="Questions fréquentes des restaurateurs"
                    variant="white"
                    items={[
                        {
                            question: "Comment se passe la création de ma fiche ?",
                            answer:
                                "Nous démarrons par un appel découverte de 20 minutes. Notre équipe construit ensuite votre fiche avec vous : photos, menu, horaires, plats signatures. La mise en ligne intervient sous 7 à 14 jours.",
                        },
                        {
                            question: "Combien coûte l'inscription ?",
                            answer:
                                "Tous nos tarifs sont établis sur devis, après l'appel découverte. Chaque restaurant a une réalité différente : nous préférons une proposition honnête, sans abonnement caché.",
                        },
                        {
                            question: "Puis-je tester la plateforme sans engagement long ?",
                            answer:
                                "Oui. Nos formules sont pensées pour une relation durable, mais sans piège contractuel. Le détail de l'engagement est défini au moment du devis.",
                        },
                        {
                            question: "Comment gérer la disponibilité de mes tables ?",
                            answer:
                                "Depuis votre back-office owner : services, capacités, fenêtres de réservation. Vous gardez la main et pouvez ajuster service par service, jour par jour.",
                        },
                        {
                            question: "Qui peut laisser des avis sur ma fiche ?",
                            answer:
                                "Uniquement les convives ayant réellement réservé via Le Bon Resto. Pas d'avis anonyme, pas d'avis monétisé.",
                        },
                    ]}
                />
            </ScrollReveal>

            {/* 12. CTA finale */}
            <LandingFooterCTA
                title="Rejoignez Le Bon Resto"
                primaryCta={{ label: "Demander une démo", href: "#form" }}
                secondaryCta={{
                    label: "Comparer les formules",
                    href: "/tarifs",
                }}
            />
        </>
    );
}
