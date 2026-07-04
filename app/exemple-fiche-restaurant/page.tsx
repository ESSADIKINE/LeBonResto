import type { Metadata } from "next";

import ProductHero from "@/components/landing/ProductHero";
import SectionHeader from "@/components/landing/SectionHeader";
import ScrollReveal from "@/components/landing/ScrollReveal";
import RestaurantCardPreview from "@/components/landing/RestaurantCardPreview";
import ImageChecklistSection from "@/components/landing/ImageChecklistSection";
import FeatureGrid from "@/components/landing/FeatureGrid";
import StatBand from "@/components/landing/StatBand";
import BeforeAfterVisual from "@/components/landing/BeforeAfterVisual";
import FAQAccordion from "@/components/landing/FAQAccordion";
import CTASection from "@/components/landing/CTASection";
import LandingFooterCTA from "@/components/landing/LandingFooterCTA";

// ---------------------------------------------------------------------------
// SEO — copy locked from 02-sitemap-and-content.md § 3.16.
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
    title: "Exemple de fiche restaurant — Le Bon Resto",
    description:
        "Découvrez à quoi ressemble une fiche restaurant Premium sur Le Bon Resto. Photos, menu, visite 360°, avis, réservation.",
    openGraph: {
        title: "Exemple de fiche restaurant — Le Bon Resto",
        description:
            "Découvrez à quoi ressemble une fiche restaurant Premium sur Le Bon Resto. Photos, menu, visite 360°, avis, réservation.",
        siteName: "LeBonResto",
        locale: "fr_FR",
        type: "website",
        images: [
            {
                url: "/assets/landing/screenshots/restaurant-detail-vertical.jpg",
                width: 1200,
                height: 630,
                alt: "Exemple de fiche restaurant LeBonResto",
            },
        ],
    },
    twitter: { card: "summary_large_image" },
};

// ---------------------------------------------------------------------------
// Data — inline per the convention used on /notre-solution & /decouverte.
// Copy lifted verbatim from 02-sitemap-and-content.md § 3.16. Unsplash hot-
// links are used for visuals not yet shipped under /public/assets/landing/.
// ---------------------------------------------------------------------------

const GALLERY_IMAGES: { src: string; alt: string }[] = [
    {
        src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
        alt: "Salle de restaurant marocaine intimiste à la lumière chaude",
    },
    {
        src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80",
        alt: "Plat signature dressé avec soin sur ardoise",
    },
    {
        src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80",
        alt: "Tagine traditionnel marocain fumant",
    },
    {
        src: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=1200&q=80",
        alt: "Pâtisserie marocaine et thé à la menthe",
    },
];

const SIGNATURE_DISHES: { eyebrow?: string; title: string; description?: string; image?: string }[] = [
    {
        eyebrow: "ENTRÉE",
        title: "Pastilla aux fruits de mer",
        description: "Feuilleté croustillant, crevettes et calamars, coriandre fraîche.",
        image:
            "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=80",
    },
    {
        eyebrow: "PLAT SIGNATURE",
        title: "Tagine d'agneau aux pruneaux",
        description: "Lentement confit, amandes torréfiées, semoule aux raisins.",
        image:
            "https://images.unsplash.com/photo-1606471191009-63994c53433b?auto=format&fit=crop&w=900&q=80",
    },
    {
        eyebrow: "DESSERT",
        title: "Cornes de gazelle revisitées",
        description: "Pâte d'amande à la fleur d'oranger, glace au thé à la menthe.",
        image:
            "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=80",
    },
];

const REVIEW_FEATURES = [
    {
        icon: "ShieldCheck",
        title: "100 % vérifiés",
        description:
            "Seuls les convives ayant réservé via Le Bon Resto peuvent noter.",
    },
    {
        icon: "MessageSquare",
        title: "Réponse publique",
        description:
            "Vous répondez à chaque avis — un échange visible par vos prochains clients.",
    },
    {
        icon: "Sparkles",
        title: "Modération éditoriale",
        description:
            "Notre équipe veille à la qualité des contenus : pas d'avis anonymes ni de spam.",
    },
];

const RESERVATION_FEATURES = [
    {
        icon: "CalendarCheck",
        title: "Date et heure",
        description: "Sélecteur sobre, plages fermées masquées, mise à jour temps réel.",
    },
    {
        icon: "Users",
        title: "Nombre de convives",
        description: "De 1 à 20 personnes. Au-delà, demande de privatisation.",
    },
    {
        icon: "MessageCircle",
        title: "Message libre",
        description:
            "Allergies, occasion spéciale, table avec vue — le client précise sa demande.",
    },
    {
        icon: "BellRing",
        title: "Confirmation rapide",
        description: "Notification immédiate côté restaurant, SMS au client.",
    },
];

const INFO_PRATIQUES = [
    {
        title: "Adresse complète",
        description:
            "Géolocalisation précise, lien vers Google Maps et Waze, code postal lisible.",
    },
    {
        title: "Horaires détaillés",
        description:
            "Service midi et soir, jours de fermeture, créneaux spéciaux (brunch, happy hour).",
    },
    {
        title: "Téléphone + WhatsApp",
        description: "Un clic pour appeler, un clic pour écrire — sans copier le numéro.",
    },
    {
        title: "Transport et parking",
        description:
            "Tramway le plus proche, accès voiture, parkings autour, valet si proposé.",
    },
];

const FAQ_ITEMS = [
    {
        question: "Cette fiche, est-ce ce que j'aurais vraiment ?",
        answer:
            "Oui. Cet exemple correspond à une fiche Premium activée, avec photos, menu, visite 360°, avis vérifiés, widget de réservation et carte interactive. Les formules Starter et Pro proposent un périmètre adapté à votre ambition.",
    },
    {
        question: "Qui prend les photos et la visite 360° ?",
        answer:
            "Nos équipes se déplacent dans votre établissement. Photos professionnelles, visite 360°, captation vidéo courte sont incluses dans les formules Premium.",
    },
    {
        question: "Combien de temps pour mettre la fiche en ligne ?",
        answer:
            "Entre 5 et 10 jours après votre démo, le temps de la séance photo, du brief éditorial et de la validation finale par vous.",
    },
    {
        question: "Puis-je modifier le contenu après publication ?",
        answer:
            "Oui, votre dashboard vous permet d'ajuster horaires, menus, photos, offres et événements en autonomie. Notre équipe reste disponible pour les évolutions plus profondes.",
    },
];

// ---------------------------------------------------------------------------
// Page — server component. Sections lifted from 02-sitemap-and-content.md
// § 3.16 / "Sections" list. Padding rules: hero stays at default, every
// non-hero section uses py-12 md:py-16 and is wrapped in ScrollReveal.
// ---------------------------------------------------------------------------

export default function ExempleFicheRestaurantPage() {
    return (
        <>
            {/* 1) Hero — ProductHero with the marketplace fiche mockup. */}
            <ProductHero
                eyebrow="EXEMPLE DE FICHE"
                headline="Voici ce à quoi ressemble votre fiche"
                accent="votre fiche"
                subheadline="Un exemple complet pour visualiser ce que vos convives verront — galerie, menu, visite 360°, avis, réservation."
                primaryCta={{
                    label: "Activer la même fiche",
                    href: "/restaurateurs/inscription",
                }}
                secondaryCta={{ label: "Voir les formules", href: "/tarifs" }}
                mockup={{
                    src: "/assets/landing/screenshots/restaurant-detail-vertical.jpg",
                    alt: "Aperçu de la fiche restaurant LeBonResto",
                    aspect: "tablet",
                }}
                backgroundImage={{
                    src: "/assets/landing/heroes/solution-cinematic.jpg",
                    alt: "",
                }}
                floatingCards={[
                    { icon: "Camera", label: "Visite 360°", value: "Incluse" },
                    { icon: "Star", label: "Avis vérifiés", value: "4.7" },
                    { icon: "CalendarCheck", label: "Réservations", value: "Live" },
                ]}
            />

            {/* 2) Aperçu de la galerie hero — mosaic + sample restaurant card. */}
            <ScrollReveal>
                <section
                    id="galerie"
                    className="bg-white py-10 md:py-14 lg:py-16 scroll-mt-[var(--header-h,4rem)]"
                >
                    <div className="container-wide">
                        <SectionHeader
                            eyebrow="1. UNE GALERIE QUI DONNE ENVIE"
                            title="Photos haute définition, mises en avant des ambiances et des plats"
                            accent="ambiances et des plats"
                            description="Galerie responsive, plats signatures en premier, ambiance traduite par l'image."
                            align="center"
                        />

                        {/* Mosaic — 1 large hero + 3 thumbs on lg, stacked on mobile */}
                        <div className="mt-8 sm:mt-10 grid gap-3 sm:gap-4 lg:grid-cols-12">
                            <div className="relative w-full overflow-hidden rounded-3xl shadow-glow ring-1 ring-slate-200/70 aspect-[4/3] lg:col-span-7 lg:aspect-auto lg:h-[clamp(20rem,40vw,32rem)] bg-brand-gradient">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={GALLERY_IMAGES[0].src}
                                    alt={GALLERY_IMAGES[0].alt}
                                    loading="lazy"
                                    decoding="async"
                                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                                />
                            </div>
                            <div className="grid gap-3 sm:gap-4 grid-cols-3 lg:grid-cols-1 lg:col-span-5 lg:grid-rows-3">
                                {GALLERY_IMAGES.slice(1).map((img) => (
                                    <div
                                        key={img.src}
                                        className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-premium ring-1 ring-slate-200/70 aspect-[4/3] lg:aspect-auto bg-brand-gradient"
                                    >
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={img.src}
                                            alt={img.alt}
                                            loading="lazy"
                                            decoding="async"
                                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Demo marketplace card — concrete "this is what it looks like" */}
                        <div className="mt-8 sm:mt-10 mx-auto w-full max-w-sm">
                            <p className="mb-3 text-center text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                                Aperçu marketplace
                            </p>
                            <RestaurantCardPreview
                                badge="Premium"
                                name="Riad El Andalous"
                                cuisine="Marocain bistronomique"
                                city="Marrakech, Médina"
                                rating={4.7}
                                reviewCount={218}
                                priceRange="350 – 550 MAD"
                                image={{
                                    src: GALLERY_IMAGES[0].src,
                                    alt: "Riad El Andalous — vue d'ambiance",
                                }}
                            />
                        </div>
                    </div>
                </section>
            </ScrollReveal>

            {/* 3) Présentation et atmosphère — image left, narrative right */}
            <ScrollReveal>
                <ImageChecklistSection
                    eyebrow="2. UNE PRÉSENTATION QUI VOUS RESSEMBLE"
                    title="Un texte rédigé avec vous, qui raconte votre table"
                    accent="raconte votre table"
                    description="Son histoire, sa cuisine, sa scénographie. Un récit éditorial — pas une fiche d'annuaire."
                    image={{
                        src: "/assets/landing/heroes/about-emotional.jpg",
                        alt: "Atmosphère chaleureuse d'une salle marocaine premium",
                    }}
                    imagePosition="left"
                    variant="cream"
                    items={[
                        {
                            title: "Brief éditorial avec le chef",
                            description:
                                "Interview de 30 min : philosophie, signature, vision, sourcing.",
                        },
                        {
                            title: "Rédaction par un rédacteur food",
                            description:
                                "Pas de copier-coller TripAdvisor — un texte original validé par vous.",
                        },
                        {
                            title: "Mots-clés SEO travaillés",
                            description:
                                "Pour ressortir naturellement sur Google quand on cherche votre ville et votre style.",
                        },
                        {
                            title: "Mise à jour à la demande",
                            description:
                                "Saisons, nouveau chef, refonte de la carte : on rafraîchit votre récit.",
                        },
                    ]}
                />
            </ScrollReveal>

            {/* 4) Carte et plats signatures — 3 dish cards */}
            <ScrollReveal>
                <section
                    id="carte"
                    className="bg-white py-10 md:py-14 lg:py-16 scroll-mt-[var(--header-h,4rem)]"
                >
                    <div className="container-wide">
                        <SectionHeader
                            eyebrow="3. UNE CARTE LISIBLE ET INSPIRANTE"
                            title="Plats classés, signatures mis en valeur, suggestions du chef"
                            accent="signatures mis en valeur"
                            description="Une carte structurée par catégorie. Plats signatures distingués, accords mets-vins optionnels."
                            align="center"
                        />

                        <div className="mt-8 sm:mt-10 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                            {SIGNATURE_DISHES.map((dish) => (
                                <article
                                    key={dish.title}
                                    className="group overflow-hidden rounded-2xl bg-white shadow-premium ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
                                >
                                    <div className="relative aspect-[4/3] overflow-hidden bg-brand-gradient">
                                        {dish.image && (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img
                                                src={dish.image}
                                                alt={dish.title}
                                                loading="lazy"
                                                decoding="async"
                                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        )}
                                        {dish.eyebrow && (
                                            <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-white/95 px-2.5 sm:px-3 py-1 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.16em] text-primary shadow-sm">
                                                {dish.eyebrow}
                                            </span>
                                        )}
                                    </div>
                                    <div className="p-4 sm:p-5 md:p-6">
                                        <h3 className="font-display text-lg sm:text-xl md:text-2xl font-semibold text-slate-900 leading-[1.1] text-balance">
                                            {dish.title}
                                        </h3>
                                        {dish.description && (
                                            <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-600">
                                                {dish.description}
                                            </p>
                                        )}
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            </ScrollReveal>

            {/* 5) Visite 360° — image-led checklist */}
            <ScrollReveal>
                <ImageChecklistSection
                    eyebrow="4. UNE VISITE 360° INCLUSE EN PREMIUM"
                    title="Vos convives entrent dans votre salle, virtuellement"
                    accent="dans votre salle"
                    description="Avant même de réserver, ils ressentent l'ambiance. Conversion qui décolle quand ils peuvent se projeter."
                    image={{
                        src: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1400&q=80",
                        alt: "Visite virtuelle 360° d'un restaurant marocain",
                    }}
                    imagePosition="right"
                    variant="white"
                    items={[
                        {
                            title: "Captation pro par notre équipe",
                            description:
                                "Caméra 360° dernière génération. Séance de 45 min sur place.",
                        },
                        {
                            title: "Hotspots cliquables",
                            description:
                                "Salle principale, terrasse, cave à vins — votre client navigue librement.",
                        },
                        {
                            title: "Intégrée à la fiche",
                            description:
                                "Pas besoin d'app, pas besoin de lunettes. Sur mobile et desktop.",
                        },
                        {
                            title: "Boost mesuré du taux de réservation",
                            description:
                                "Premiers retours partenaires : +30 % de conversion sur fiches avec visite 360°.",
                        },
                    ]}
                    cta={{ label: "En savoir plus sur la visite 360°", href: "/visite-360" }}
                />
            </ScrollReveal>

            {/* 6) Avis vérifiés — feature grid + before/after vs. anonymous review sites */}
            <ScrollReveal>
                <section
                    id="avis"
                    className="bg-cream-50 py-10 md:py-14 lg:py-16 scroll-mt-[var(--header-h,4rem)]"
                >
                    <div className="container-wide">
                        <SectionHeader
                            eyebrow="5. DES AVIS VÉRIFIÉS, PAS DES COMMENTAIRES ANONYMES"
                            title="Seuls les convives ayant réservé peuvent noter"
                            accent="ayant réservé"
                            description="Vous pouvez répondre publiquement à chaque avis. Une vraie conversation, pas un mur d'anonymes."
                            align="center"
                        />
                        <div className="mt-8 sm:mt-10">
                            <FeatureGrid
                                items={REVIEW_FEATURES}
                                columns={3}
                                variant="card"
                            />
                        </div>

                        <div className="mt-8 sm:mt-10 lg:mt-12">
                            <BeforeAfterVisual
                                leftTitle="Sites d'avis classiques"
                                leftItems={[
                                    { text: "Notes anonymes, parfois fausses" },
                                    { text: "Concurrents qui notent négativement" },
                                    { text: "Aucune façon de filtrer les vrais clients" },
                                    { text: "Réputation difficile à défendre" },
                                ]}
                                rightTitle="Avis Le Bon Resto"
                                rightItems={[
                                    { text: "100 % des avis viennent d'une réservation confirmée" },
                                    { text: "Vous répondez publiquement, sans détour" },
                                    { text: "Modération éditoriale active" },
                                    { text: "Une réputation que vous construisez sereinement" },
                                ]}
                            />
                        </div>
                    </div>
                </section>
            </ScrollReveal>

            {/* 7) Widget de réservation — feature grid */}
            <ScrollReveal>
                <section
                    id="reservation"
                    className="bg-white py-10 md:py-14 lg:py-16 scroll-mt-[var(--header-h,4rem)]"
                >
                    <div className="container-wide">
                        <SectionHeader
                            eyebrow="6. UN WIDGET DE RÉSERVATION FLUIDE"
                            title="Date, heure, convives, message — confirmation rapide"
                            accent="confirmation rapide"
                            description="Un parcours pensé pour qu'on réserve sans hésiter. Pas de friction, pas d'inscription obligatoire."
                            align="center"
                        />

                        <div className="mt-8 sm:mt-10 grid items-start gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-12">
                            {/* Mock widget visual */}
                            <div className="lg:col-span-5">
                                <div className="rounded-3xl bg-cream-50 p-4 sm:p-5 md:p-6 shadow-premium ring-1 ring-slate-200/70">
                                    <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                                        Réserver une table
                                    </p>
                                    <h3 className="mt-2 font-display text-lg sm:text-xl md:text-2xl font-semibold text-slate-900 leading-[1.1] text-balance">
                                        Riad El Andalous
                                    </h3>
                                    <div className="mt-4 sm:mt-5 space-y-3 text-sm">
                                        <div className="flex items-center justify-between gap-3 rounded-xl bg-white p-3 ring-1 ring-slate-200">
                                            <span className="font-medium text-slate-600">Date</span>
                                            <span className="font-semibold text-slate-900 text-right">Vendredi 28 juin</span>
                                        </div>
                                        <div className="flex items-center justify-between gap-3 rounded-xl bg-white p-3 ring-1 ring-slate-200">
                                            <span className="font-medium text-slate-600">Heure</span>
                                            <span className="font-semibold text-slate-900">20:30</span>
                                        </div>
                                        <div className="flex items-center justify-between gap-3 rounded-xl bg-white p-3 ring-1 ring-slate-200">
                                            <span className="font-medium text-slate-600">Convives</span>
                                            <span className="font-semibold text-slate-900">4 personnes</span>
                                        </div>
                                        <div className="rounded-xl bg-white p-3 ring-1 ring-slate-200">
                                            <span className="font-medium text-slate-600">Message au restaurant</span>
                                            <p className="mt-1 text-sm text-slate-500">
                                                Anniversaire — table calme si possible.
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        disabled
                                        aria-disabled="true"
                                        className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-primary h-11 md:h-12 px-5 sm:px-6 md:px-8 text-sm sm:text-base font-semibold text-white shadow-premium opacity-90"
                                    >
                                        Confirmer la réservation
                                    </button>
                                    <p className="mt-3 text-center text-xs text-slate-500">
                                        Aperçu visuel — non fonctionnel.
                                    </p>
                                </div>
                            </div>

                            <div className="lg:col-span-7">
                                <FeatureGrid
                                    items={RESERVATION_FEATURES}
                                    columns={2}
                                    variant="card"
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </ScrollReveal>

            {/* 8) Carte d'accès et infos pratiques — mock map + checklist */}
            <ScrollReveal>
                <ImageChecklistSection
                    eyebrow="7. UNE CARTE INTERACTIVE ET LES INFOS UTILES"
                    title="Adresse, horaires, téléphone, transports — tout en un coup d'œil"
                    accent="en un coup d'œil"
                    description="Vos convives savent immédiatement où aller et comment vous joindre. Pas de chasse au trésor."
                    image={{
                        src: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1400&q=80",
                        alt: "Carte interactive avec marqueur de restaurant",
                    }}
                    imagePosition="left"
                    variant="white"
                    items={INFO_PRATIQUES}
                />
            </ScrollReveal>

            {/* 9) StatBand "Premium activé" — concrete numbers on a real fiche */}
            <ScrollReveal>
                <StatBand
                    eyebrow="EXACTEMENT CE QUE VOUS OBTENEZ"
                    title="Cet exemple correspond à une fiche Premium activée"
                    accent="Premium activée"
                    subtitle="Les formules Starter et Pro proposent un périmètre adapté à votre ambition. Pour visualiser, voilà ce que contient cette fiche aujourd'hui."
                    variant="teal"
                    items={[
                        {
                            value: "32",
                            label: "Photos haute définition",
                            sublabel: "salle, plats, cuisine, terrasse",
                        },
                        {
                            value: "1",
                            label: "Visite 360° interactive",
                            sublabel: "captée par notre équipe",
                        },
                        {
                            value: "218",
                            suffix: "+",
                            label: "Avis vérifiés cumulés",
                            sublabel: "100 % issus de réservations",
                        },
                        {
                            value: "24",
                            suffix: "/7",
                            label: "Widget réservation",
                            sublabel: "synchronisé avec votre agenda",
                        },
                    ]}
                    cta={{ label: "Voir les formules", href: "/tarifs" }}
                />
            </ScrollReveal>

            {/* 10) FAQ — short, targeted at restaurateur visualisation */}
            <ScrollReveal>
                <FAQAccordion
                    eyebrow="QUESTIONS FRÉQUENTES"
                    title="Avant de demander votre démo"
                    accent="votre démo"
                    variant="cream"
                    items={FAQ_ITEMS}
                />
            </ScrollReveal>

            {/* 11) CTA finale + footer pricing reminder */}
            <ScrollReveal>
                <CTASection
                    variant="teal"
                    title="Envie de la même fiche pour votre restaurant ?"
                    description="Tarifs sur devis selon le nombre d'établissements et les options. Une équipe vous accompagne de A à Z."
                    primaryCta={{
                        label: "Activer la même fiche pour mon restaurant",
                        href: "/restaurateurs/inscription",
                    }}
                    secondaryCta={{ label: "Voir les formules", href: "/tarifs" }}
                />
            </ScrollReveal>

            <LandingFooterCTA
                title="Votre fiche, prête en quelques jours."
                primaryCta={{
                    label: "Demander ma démo",
                    href: "/restaurateurs/inscription",
                }}
                secondaryCta={{ label: "Parler à un conseiller", href: "/contact" }}
            />
        </>
    );
}
