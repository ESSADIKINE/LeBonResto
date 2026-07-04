import type { Metadata } from "next";

import ProductHero from "@/components/landing/ProductHero";
import SectionHeader from "@/components/landing/SectionHeader";
import ScrollReveal from "@/components/landing/ScrollReveal";
import CityTile from "@/components/landing/CityTile";
import RestaurantCardPreview from "@/components/landing/RestaurantCardPreview";
import FeatureGrid from "@/components/landing/FeatureGrid";
import ImageChecklistSection from "@/components/landing/ImageChecklistSection";
import JourneyTimeline from "@/components/landing/JourneyTimeline";
import StatBand from "@/components/landing/StatBand";
import CTASection from "@/components/landing/CTASection";
import LandingFooterCTA from "@/components/landing/LandingFooterCTA";

export const metadata: Metadata = {
    title: "Découvrir Le Bon Resto en 2 minutes",
    description:
        "Visitez la marketplace Le Bon Resto pas à pas. Du choix de la ville à la confirmation de réservation, voyez comment ça marche.",
    openGraph: {
        title: "Découvrir Le Bon Resto en 2 minutes",
        description:
            "Visitez la marketplace Le Bon Resto pas à pas. Du choix de la ville à la confirmation de réservation, voyez comment ça marche.",
        siteName: "LeBonResto",
        locale: "fr_FR",
        type: "website",
        images: [
            {
                url: "/assets/landing/screenshots/marketplace-vertical.jpg",
                width: 1200,
                height: 630,
                alt: "Visite guidée de la marketplace Le Bon Resto",
            },
        ],
    },
    twitter: { card: "summary_large_image" },
};

// ---------------------------------------------------------------------------
// Data — kept inline to match the page-level pattern used elsewhere in the
// marketing site (see /notre-solution). All copy lifted from
// docs/lbr-strategy/02-sitemap-and-content.md §3.15.
// ---------------------------------------------------------------------------

const CITY_TILES = [
    {
        id: "casablanca",
        name: "Casablanca",
        image: { src: "/assets/landing/cities/casablanca.jpg", alt: "Casablanca" },
        restaurantCount: 42,
    },
    {
        id: "marrakech",
        name: "Marrakech",
        image: { src: "/assets/landing/cities/marrakech.jpg", alt: "Marrakech" },
        restaurantCount: 38,
    },
    {
        id: "rabat",
        name: "Rabat",
        image: { src: "/assets/landing/cities/rabat.jpg", alt: "Rabat" },
        restaurantCount: 22,
    },
    {
        id: "tanger",
        name: "Tanger",
        image: { src: "/assets/landing/cities/tanger.jpg", alt: "Tanger" },
        restaurantCount: 18,
    },
];

const AMBIANCE_TAGS = [
    { title: "Table d'auteur", description: "Cuisine signature, accord mets-vins, chef en salle.", icon: "ChefHat" },
    { title: "Brasserie chic", description: "Carte du jour, ambiance vivante, service tonique.", icon: "UtensilsCrossed" },
    { title: "Rooftop", description: "Vue panoramique, cocktails, cuisine partagée.", icon: "Wine" },
    { title: "Riad-restaurant", description: "Patio, tagine de chef, atmosphère feutrée.", icon: "Sparkles" },
];

const DEMO_RESTAURANTS = [
    {
        name: "Dar Yacout",
        cuisine: "Marocaine d'auteur",
        city: "Marrakech, Médina",
        rating: 4.8,
        reviewCount: 412,
        priceRange: "350–550 MAD",
        badge: "Premium",
        image: {
            src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80",
            alt: "Salle de Dar Yacout, Marrakech",
        },
    },
    {
        name: "La Sqala",
        cuisine: "Cuisine marocaine",
        city: "Casablanca, Médina",
        rating: 4.6,
        reviewCount: 538,
        priceRange: "220–380 MAD",
        badge: "Premium",
        image: {
            src: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=1200&q=80",
            alt: "Patio de La Sqala, Casablanca",
        },
    },
    {
        name: "Le Cabestan",
        cuisine: "Bistronomie",
        city: "Casablanca, Corniche",
        rating: 4.5,
        reviewCount: 284,
        priceRange: "320–480 MAD",
        image: {
            src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80",
            alt: "Vue mer du Cabestan, Casablanca",
        },
    },
    {
        name: "Café Clock",
        cuisine: "Fusion marocaine",
        city: "Fès, Médina",
        rating: 4.7,
        reviewCount: 196,
        priceRange: "120–220 MAD",
        image: {
            src: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80",
            alt: "Café Clock à Fès",
        },
    },
    {
        name: "Le Number 7",
        cuisine: "Internationale",
        city: "Marrakech, Guéliz",
        rating: 4.4,
        reviewCount: 152,
        priceRange: "280–420 MAD",
        image: {
            src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
            alt: "Table dressée chez Le Number 7",
        },
    },
    {
        name: "Le Dhow",
        cuisine: "Bord de mer",
        city: "Rabat, Bouregreg",
        rating: 4.3,
        reviewCount: 128,
        priceRange: "200–340 MAD",
        image: {
            src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80",
            alt: "Pont du Dhow, Rabat",
        },
    },
];

const RESERVATION_STEPS = [
    {
        step: 1,
        title: "Choisir date et heure",
        description: "Sélecteur date + créneaux disponibles en temps réel.",
        icon: "CalendarDays",
    },
    {
        step: 2,
        title: "Indiquer le nombre de convives",
        description: "De 1 à 12 personnes, ou plus via demande spéciale.",
        icon: "Users",
    },
    {
        step: 3,
        title: "Ajouter une demande",
        description: "Allergies, occasion, table préférée — transmis directement au restaurant.",
        icon: "MessageSquare",
    },
    {
        step: 4,
        title: "Confirmation",
        description: "E-mail et WhatsApp instantanés, avec rappel la veille de la visite.",
        icon: "BadgeCheck",
    },
];

const VISIT_HIGHLIGHTS = [
    "Avant le repas — confirmation, plan d'accès et rappel WhatsApp",
    "Sur place — accueil personnalisé grâce à la note de réservation",
    "Après le repas — invitation à laisser un avis vérifié, public et non monétisé",
    "À chaque étape — un service client francophone en moins de 2 heures",
];

export default function DecouvertePage() {
    return (
        <>
            {/* 1) Hero — visite guidée intro */}
            <ProductHero
                eyebrow="VISITE GUIDÉE"
                headline="Le Bon Resto en 2 minutes"
                accent="2 minutes"
                subheadline="Suivez le parcours d'un gourmet, de la recherche à la confirmation. Sans inscription."
                primaryCta={{ label: "Lancer la visite", href: "#etape-1" }}
                secondaryCta={{
                    label: "Aller directement à la marketplace",
                    href: "https://lebonresto.ma",
                }}
                mockup={{
                    src: "/assets/landing/screenshots/marketplace-vertical.jpg",
                    alt: "Aperçu de la marketplace Le Bon Resto",
                    aspect: "tablet",
                }}
                backgroundImage={{
                    src: "/assets/landing/heroes/solution-cinematic.jpg",
                    alt: "",
                }}
                floatingCards={[
                    { icon: "MapPin", label: "Villes", value: "6" },
                    { icon: "Star", label: "Avis vérifiés", value: "4,7/5" },
                    { icon: "Camera", label: "Visite 360°", value: "live" },
                ]}
            />

            {/* 2) Étape 1 — Choisir une ville */}
            <ScrollReveal>
                <section id="etape-1" className="scroll-mt-[var(--header-h,4rem)] bg-white py-10 md:py-14 lg:py-16">
                    <div className="container-wide">
                        <SectionHeader
                            eyebrow="1. ON COMMENCE PAR LA VILLE"
                            title="Casablanca, Marrakech, Rabat, Tanger…"
                            accent="la ville"
                            description="Casablanca pour un dîner d'affaires ? Marrakech pour un brunch en riad ? La sélection éditoriale s'adapte à votre destination."
                            align="center"
                        />
                        <div className="mt-8 sm:mt-10 grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                            {CITY_TILES.map((city) => (
                                <CityTile
                                    key={city.id}
                                    id={city.id}
                                    name={city.name}
                                    image={city.image}
                                    restaurantCount={city.restaurantCount}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            </ScrollReveal>

            {/* 3) Étape 2 — Affiner par ambiance */}
            <ScrollReveal>
                <section id="etape-2" className="scroll-mt-[var(--header-h,4rem)] bg-cream-50 py-10 md:py-14 lg:py-16">
                    <div className="container-wide">
                        <SectionHeader
                            eyebrow="2. ON AFFINE L'AMBIANCE"
                            title="Chaque ambiance a sa scénographie"
                            accent="ambiance"
                            description="Table d'auteur, brasserie chic, rooftop, riad-restaurant : choisissez le décor qui correspond à votre moment."
                            align="center"
                        />
                        <div className="mt-8 sm:mt-10">
                            <FeatureGrid items={AMBIANCE_TAGS} columns={4} variant="card" />
                        </div>
                    </div>
                </section>
            </ScrollReveal>

            {/* 4) Étape 3 — Découvrir une fiche (grille de cards demo marketplace) */}
            <ScrollReveal>
                <section id="etape-3" className="scroll-mt-[var(--header-h,4rem)] bg-white py-10 md:py-14 lg:py-16">
                    <div className="container-wide">
                        <SectionHeader
                            eyebrow="3. ON ENTRE DANS LA FICHE"
                            title="Galerie, plats signatures, avis vérifiés"
                            accent="plats signatures"
                            description="Galerie photo, présentation, plats signatures, avis vérifiés, horaires, plan d'accès — tout est là."
                            align="center"
                        />
                        <div className="mt-8 sm:mt-10 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                            {DEMO_RESTAURANTS.map((resto) => (
                                <RestaurantCardPreview
                                    key={resto.name}
                                    name={resto.name}
                                    cuisine={resto.cuisine}
                                    city={resto.city}
                                    rating={resto.rating}
                                    reviewCount={resto.reviewCount}
                                    priceRange={resto.priceRange}
                                    badge={resto.badge}
                                    image={resto.image}
                                />
                            ))}
                        </div>
                        <div className="mt-8 sm:mt-10 flex justify-center">
                            <a
                                href="/exemple-fiche-restaurant"
                                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white h-11 md:h-12 px-5 sm:px-6 md:px-8 text-sm sm:text-base font-semibold text-slate-900 transition-colors hover:border-primary hover:text-primary"
                            >
                                Voir une fiche complète
                            </a>
                        </div>
                    </div>
                </section>
            </ScrollReveal>

            {/* 5) Étape 4 — Visite 360° */}
            <ScrollReveal>
                <section id="etape-4" className="scroll-mt-[var(--header-h,4rem)]">
                    <ImageChecklistSection
                        eyebrow="4. ON FAIT UN TOUR EN 360°"
                        title="Entrer dans la salle, depuis son canapé"
                        accent="dans la salle"
                        description="Disponible sur les fiches Premium et Pro, la Visite 360° permet aux convives de se projeter avant même d'avoir réservé."
                        image={{
                            src: "/assets/landing/screenshots/restaurant-detail-vertical.jpg",
                            alt: "Visite 360° d'un restaurant sur Le Bon Resto",
                        }}
                        items={[
                            { title: "Vue immersive", description: "Salle, bar et terrasse explorables au doigt." },
                            { title: "Multi-device", description: "Navigation fluide sur mobile, tablette et desktop." },
                            { title: "Plans d'accès intégrés", description: "Repères et points d'intérêt directement dans la visite." },
                            { title: "Captation pro", description: "Tournée par nos équipes, sans surcoût caché." },
                        ]}
                        cta={{ label: "Découvrir la Visite 360°", href: "/visite-360" }}
                        imagePosition="right"
                        variant="cream"
                    />
                </section>
            </ScrollReveal>

            {/* 6) Étape 5 — Réservation */}
            <ScrollReveal>
                <section id="etape-5" className="scroll-mt-[var(--header-h,4rem)] bg-white py-10 md:py-14 lg:py-16">
                    <div className="container-wide">
                        <SectionHeader
                            eyebrow="5. ON RÉSERVE EN DEUX CLICS"
                            title="Date, heure, convives, demande spéciale"
                            accent="deux clics"
                            description="Confirmation rapide par e-mail ou WhatsApp. Pas de compte requis pour réserver, pas de surprise après le repas."
                            align="center"
                        />
                        <div className="mt-8 sm:mt-10 grid gap-8 sm:gap-10 lg:grid-cols-12 lg:items-start">
                            <div className="lg:col-span-7">
                                <JourneyTimeline
                                    eyebrow="Le flux de réservation"
                                    steps={RESERVATION_STEPS}
                                />
                            </div>
                            <div className="lg:col-span-5">
                                <div className="rounded-3xl bg-cream-50 p-4 sm:p-5 md:p-6 shadow-premium ring-1 ring-cream-200/60">
                                    <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 sm:px-4 py-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                                        Garantie convives
                                    </span>
                                    <h3 className="mt-4 font-display text-lg sm:text-xl md:text-2xl font-semibold text-slate-900 leading-[1.1] text-balance">
                                        Une réservation = une table garantie
                                    </h3>
                                    <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-600">
                                        Les disponibilités affichées sont synchronisées avec le
                                        planning du restaurant. Pas de double-booking, pas
                                        d&apos;attente injustifiée.
                                    </p>
                                    <ul className="mt-6 space-y-3 text-sm text-slate-700">
                                        {VISIT_HIGHLIGHTS.map((item) => (
                                            <li key={item} className="flex items-start gap-2">
                                                <span
                                                    aria-hidden="true"
                                                    className="mt-1 inline-flex h-2 w-2 shrink-0 rounded-full bg-primary"
                                                />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </ScrollReveal>

            {/* 7) Étape 6 — Confirmation et avis post-visite */}
            <ScrollReveal>
                <section id="etape-6" className="scroll-mt-[var(--header-h,4rem)] bg-cream-50 py-10 md:py-14 lg:py-16">
                    <div className="container-wide">
                        <SectionHeader
                            eyebrow="6. ON REPART AVEC L'ENVIE D'Y RETOURNER"
                            title="Un avis vérifié, public, non monétisé"
                            accent="vérifié"
                            description="Après votre repas, vous recevez une invitation à laisser un avis. C'est ce qui rend la sélection vivante et fiable pour les prochains gourmets."
                            align="center"
                        />
                    </div>
                </section>
            </ScrollReveal>

            {/* 7b) Mesures de confiance — barre KPI */}
            <ScrollReveal>
                <StatBand
                    variant="cream"
                    eyebrow="LA PROMESSE"
                    title="Une marketplace fiable, vérifiée, vivante"
                    accent="vérifiée"
                    subtitle="Quatre chiffres qui racontent l'expérience après la visite."
                    items={[
                        { value: "100", suffix: "%", label: "Avis post-visite vérifiés" },
                        { value: "2", suffix: "h", label: "Réponse service client" },
                        { value: "4,7", suffix: "/5", label: "Note moyenne marketplace" },
                        { value: "0", suffix: "", label: "Avis monétisé ou sponsorisé" },
                    ]}
                />
            </ScrollReveal>

            {/* 8) CTA final — Aller à la marketplace */}
            <ScrollReveal>
                <CTASection
                    title="Envie d'essayer pour de vrai ?"
                    description="La visite guidée s'arrête ici. La marketplace, elle, vous attend pour réserver votre prochaine table."
                    primaryCta={{ label: "Aller à la marketplace", href: "https://lebonresto.ma" }}
                    secondaryCta={{ label: "Voir une fiche exemple", href: "/exemple-fiche-restaurant" }}
                    variant="teal"
                />
            </ScrollReveal>

            {/* 9) Footer CTA — clin d'œil aux restaurateurs après la visite */}
            <LandingFooterCTA
                title="Et si votre restaurant était la prochaine étape de la visite ?"
                primaryCta={{ label: "Inscrire mon restaurant", href: "/restaurateurs" }}
                secondaryCta={{ label: "Voir notre solution", href: "/notre-solution" }}
            />
        </>
    );
}
