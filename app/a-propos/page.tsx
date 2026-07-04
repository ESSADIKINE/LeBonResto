import type { Metadata } from "next";
import Image from "next/image";
import { Users2 } from "lucide-react";
import VisualHero from "@/components/landing/VisualHero";
import SectionHeader from "@/components/landing/SectionHeader";
import CTASection from "@/components/landing/CTASection";
import ImageChecklistSection from "@/components/landing/ImageChecklistSection";
import FAQAccordion from "@/components/landing/FAQAccordion";
import ValuePillars from "@/components/landing/ValuePillars";
import ScrollReveal from "@/components/landing/ScrollReveal";
import { brandValues } from "@/data/landing/values";
import { moroccoCities } from "@/data/landing/cities";

export const metadata: Metadata = {
    title: "À propos — L'équipe Le Bon Resto",
    description:
        "Une équipe marocaine au service des plus belles tables du Royaume. Notre histoire, notre mission, notre vision pour la FoodTech au Maroc.",
    openGraph: {
        title: "À propos — L'équipe Le Bon Resto",
        description:
            "Une équipe marocaine au service des plus belles tables du Royaume. Notre histoire, notre mission, notre vision pour la FoodTech au Maroc.",
        siteName: "LeBonResto",
        locale: "fr_FR",
        type: "website",
        images: [
            {
                url: "/assets/landing/heroes/about-emotional.jpg",
                width: 1200,
                height: 630,
                alt: "À propos — LeBonResto",
            },
        ],
    },
    twitter: { card: "summary_large_image" },
};

// Sous-ensemble des 6 villes mises en avant dans la grille "Présence marocaine".
const FEATURED_CITY_IDS = [
    "casablanca",
    "marrakech",
    "rabat",
    "tanger",
    "fes",
    "agadir",
] as const;

export default function AboutPage() {
    const featuredCities = FEATURED_CITY_IDS.map((id) =>
        moroccoCities.find((c) => c.id === id),
    ).filter((c): c is (typeof moroccoCities)[number] => Boolean(c));

    return (
        <>
            {/* 1) HERO ÉMOTIONNEL — VisualHero (photo-led) */}
            <VisualHero
                height="normal"
                eyebrow="NOTRE HISTOIRE"
                headline="Une équipe marocaine au service de la gastronomie nationale"
                accent="gastronomie nationale"
                subheadline="Le Bon Resto est né d'une conviction : le Maroc mérite une plateforme premium dédiée à ses tables d'exception."
                primaryCta={{ label: "Découvrir notre solution", href: "/notre-solution" }}
                secondaryCta={{ label: "Nous écrire", href: "/contact" }}
                image={{
                    src: "/assets/landing/heroes/about-emotional.jpg",
                    alt: "Scène de dîner marocain à l'heure bleue",
                }}
            />

            {/* 2) MISSION / VISION */}
            <ScrollReveal>
                <section className="bg-white py-10 md:py-14 lg:py-16">
                    <div className="container-wide">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
                            {/* Mission — teal, glow */}
                            <article className="relative overflow-hidden rounded-3xl bg-primary text-white p-5 sm:p-6 md:p-8 shadow-glow">
                                <div
                                    aria-hidden="true"
                                    className="pointer-events-none absolute inset-0 opacity-40"
                                    style={{
                                        backgroundImage:
                                            "radial-gradient(circle at 12% 0%, rgba(255,255,255,0.18) 0%, transparent 45%), radial-gradient(circle at 100% 100%, rgba(1,64,56,0.85) 0%, transparent 55%)",
                                    }}
                                />
                                <div className="relative">
                                    <span className="inline-flex items-center rounded-full bg-white/15 px-4 py-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-cream-50 ring-1 ring-white/25 backdrop-blur">
                                        Notre mission
                                    </span>
                                    <h2 className="mt-4 sm:mt-5 font-display font-bold text-balance leading-[1.1] text-2xl sm:text-3xl md:text-4xl">
                                        Notre raison d&apos;être.
                                    </h2>
                                    <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg leading-relaxed text-cream-50/95 text-pretty">
                                        Donner aux restaurateurs marocains les moyens d&apos;exister
                                        en ligne avec la même exigence qu&apos;en salle, et offrir
                                        aux convives une découverte gastronomique fiable, élégante
                                        et inspirante. Nous rassemblons en un seul endroit les
                                        meilleures adresses du Royaume — des palais étoilés aux
                                        tables d&apos;auteur, des riads d&apos;exception aux
                                        rooftops à couper le souffle — avec une suite d&apos;outils
                                        sobre et efficace côté restaurateurs, et une équipe humaine
                                        pour accompagner l&apos;adoption.
                                    </p>
                                </div>
                            </article>

                            {/* Vision — cream, accent gradient corner */}
                            <article className="relative overflow-hidden rounded-3xl bg-cream-50 text-slate-900 p-5 sm:p-6 md:p-8 ring-1 ring-cream-300 shadow-premium">
                                <div
                                    aria-hidden="true"
                                    className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-40 bg-brand-gradient blur-3xl"
                                />
                                <div className="relative">
                                    <span className="inline-flex items-center rounded-full bg-primary px-4 py-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-white">
                                        Notre vision
                                    </span>
                                    <h2 className="mt-4 sm:mt-5 font-display font-bold text-balance leading-[1.1] text-2xl sm:text-3xl md:text-4xl text-slate-900">
                                        Devenir la référence gastronomique du Maroc, puis du
                                        Maghreb.
                                    </h2>
                                    <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg leading-relaxed text-slate-700 text-pretty">
                                        À horizon cinq ans, LeBonResto sera l&apos;infrastructure
                                        digitale des restaurants marocains : réservations, avis
                                        vérifiés, événements, fidélité et paiements. Une marque
                                        premium, fière de ses racines, qui célèbre autant le
                                        terroir que la création contemporaine — et qui rayonnera
                                        bientôt sur toute l&apos;Afrique du Nord, avec la même
                                        promesse : un repas réussi commence bien avant de
                                        s&apos;asseoir à table.
                                    </p>
                                </div>
                            </article>
                        </div>
                    </div>
                </section>
            </ScrollReveal>

            {/* 3) POURQUOI NOUS EXISTONS — ImageChecklistSection */}
            <ScrollReveal>
                <ImageChecklistSection
                    eyebrow="POURQUOI LE BON RESTO ?"
                    title="La plateforme que nous aurions aimé trouver"
                    accent="aimé trouver"
                    image={{
                        src: "/assets/landing/heroes/solution-cinematic.jpg",
                        alt: "Restaurant marocain",
                    }}
                    imagePosition="right"
                    variant="white"
                    items={[
                        {
                            title: "Un patrimoine mal exposé",
                            description:
                                "Le Maroc compte des milliers de tables d'exception — riads, tables d'auteur, brasseries chic, rooftops — mais leur visibilité numérique reste fragmentée.",
                        },
                        {
                            title: "Annuaires généralistes et réseaux saturés",
                            description:
                                "Fiches Google approximatives, avis dispersés, réseaux sociaux bruyants : rien n'est pensé pour la gastronomie premium.",
                        },
                        {
                            title: "Une marketplace exigeante côté convives",
                            description:
                                "Photos réelles, avis vérifiés, fiches à jour : la promesse premium se voit dans chaque détail.",
                        },
                        {
                            title: "Une suite d'outils sobre côté restaurateurs",
                            description:
                                "Réservations centralisées, back-office clair, équipe humaine en français et en arabe pour accompagner l'adoption.",
                        },
                    ]}
                />
            </ScrollReveal>

            {/* 4) PRÉSENCE — Grille villes premium (photo-led tiles) */}
            <ScrollReveal>
                <section className="bg-cream-50 py-10 md:py-14 lg:py-16">
                    <div className="container-wide">
                        <SectionHeader
                            eyebrow="NOTRE PRÉSENCE"
                            title="Une couverture qui s'étend, ville après ville"
                            align="center"
                        />
                        <div className="mt-8 sm:mt-10 lg:mt-12 grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {featuredCities.map((city) => (
                                <CityTile
                                    key={city.id}
                                    name={city.name}
                                    imageSrc={city.imageSrc}
                                    restaurantCount={city.restaurantCount ?? 0}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            </ScrollReveal>

            {/* 7) VALEURS */}
            <ScrollReveal>
                <section className="bg-white py-10 md:py-14 lg:py-16">
                    <div className="container-wide">
                        <SectionHeader
                            eyebrow="NOS VALEURS"
                            title="Ce qui nous guide"
                            align="center"
                        />
                        <div className="mt-8 sm:mt-10 lg:mt-12">
                            <ValuePillars
                                values={brandValues}
                                layout="horizontal"
                            />
                        </div>
                    </div>
                </section>
            </ScrollReveal>

            {/* 8) ÉQUIPE — placeholder honnête "En constitution" */}
            <ScrollReveal>
                <section className="bg-cream-50 py-10 md:py-14 lg:py-16">
                    <div className="container-wide">
                        <SectionHeader
                            eyebrow="L'ÉQUIPE"
                            title="L'équipe"
                            align="center"
                        />
                        <div className="mt-8 sm:mt-10">
                            <div className="mx-auto max-w-2xl rounded-3xl bg-cream-50 p-6 md:p-8 text-center shadow-premium ring-1 ring-cream-300">
                                <Users2
                                    aria-hidden="true"
                                    className="h-12 w-12 mx-auto text-primary"
                                />
                                <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary ring-1 ring-cream-300">
                                    En constitution
                                </span>
                                <h3 className="mt-3 text-lg font-semibold text-slate-900">
                                    L&apos;équipe se dessine
                                </h3>
                                <p className="mt-3 text-slate-600 max-w-md mx-auto text-pretty">
                                    Notre équipe est en pleine constitution.
                                    Fondateur + profils tech, business et
                                    opérations rejoindront LeBonResto dans les
                                    prochains mois. Nous partagerons les visages
                                    et les parcours ici dès que l&apos;équipe
                                    sera formée.
                                </p>
                                <a
                                    href="mailto:le.bon.restau@gmail.com?subject=Rejoindre%20LeBonResto"
                                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-primary ring-1 ring-cream-300 shadow-premium transition-colors hover:bg-cream-100"
                                >
                                    Nous rejoindre ?
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </ScrollReveal>

            {/* 9) FAQ */}
            <ScrollReveal>
                <FAQAccordion
                    title="Vos questions sur Le Bon Resto"
                    variant="white"
                    items={[
                        {
                            question: "D'où vient Le Bon Resto ?",
                            answer:
                                "Le projet a démarré au Maroc avec une dizaine de tables pionnières dans six villes, porté par une équipe convaincue qu'il manquait une vraie marketplace gastronomique premium pour le Royaume.",
                        },
                        {
                            question: "Pourquoi une sélection si exigeante ?",
                            answer:
                                "Curation : nous préférons une sélection rigoureuse à un annuaire exhaustif. Chaque fiche est revue avant mise en ligne — qualité éditoriale, avis vérifiés, photos réelles.",
                        },
                        {
                            question: "Comment vous financez-vous ?",
                            answer:
                                "Abonnements restaurateurs, services de production photo/vidéo/360°, et data insights. Tarifs sur devis, transparents, contrat signé — pas de surprise. Détails complets sur la page Investisseurs.",
                        },
                        {
                            question: "Quel support proposez-vous aux restaurateurs ?",
                            answer:
                                "Support 6 jours sur 7 en français et en arabe, par téléphone, e-mail ou WhatsApp. Équipe produit-tech à Casablanca, consultants restauration et photographes pro freelance.",
                        },
                        {
                            question: "Comment protégez-vous nos données ?",
                            answer:
                                "Conformité loi 09-08, hébergement sécurisé, aucune revente. Vos données restent les vôtres.",
                        },
                    ]}
                />
            </ScrollReveal>

            {/* 10) CTA FINALE */}
            <ScrollReveal>
                <CTASection
                    variant="dark"
                    title="Envie d'en parler de vive voix ?"
                    primaryCta={{
                        label: "Demander une démo",
                        href: "/restaurateurs",
                    }}
                    secondaryCta={{
                        label: "Nous contacter",
                        href: "/contact",
                    }}
                />
            </ScrollReveal>
        </>
    );
}

/* ---------------------------------------------------------------------------
 * Sous-composants serveur (presentational, statelessly rendered)
 * ------------------------------------------------------------------------- */

interface CityTileProps {
    name: string;
    imageSrc: string;
    restaurantCount: number;
}

/**
 * Tuile ville premium — photo aspect-[4/5], overlay sombre en bas,
 * nom + nombre de restaurants. Fallback brand-gradient si l'image manque.
 */
function CityTile({ name, imageSrc, restaurantCount }: CityTileProps) {
    const countLabel =
        restaurantCount === 0
            ? "Bientôt disponible"
            : `${restaurantCount} restaurant${restaurantCount > 1 ? "s" : ""}`;

    return (
        <article className="group relative overflow-hidden rounded-2xl bg-white shadow-premium ring-1 ring-slate-100 transition-transform duration-500 hover:-translate-y-1">
            <div className="relative aspect-[4/5] w-full bg-brand-gradient">
                <Image
                    src={imageSrc}
                    alt={`Restaurants à ${name}`}
                    fill
                    sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Legibility scrim */}
                <div
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{
                        backgroundImage:
                            "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.25) 50%, transparent 100%)",
                    }}
                />
                {/* Overlay bottom: city name + count */}
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 md:p-6">
                    <div className="flex items-end justify-between gap-3">
                        <h3 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                            {name}
                        </h3>
                        <span className="inline-flex items-center rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-primary shadow-premium backdrop-blur">
                            {countLabel}
                        </span>
                    </div>
                </div>
            </div>
        </article>
    );
}

