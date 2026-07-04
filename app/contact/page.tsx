import type { Metadata } from "next";
import Link from "next/link";
import {
    Phone,
    Mail,
    MessageCircle,
    MapPin,
    Clock,
    ShieldCheck,
    CheckCircle2,
    ArrowRight,
} from "lucide-react";
import ProductHero from "@/components/landing/ProductHero";
import SectionHeader from "@/components/landing/SectionHeader";
import ContactForm from "@/components/landing/ContactForm";
import FAQAccordion from "@/components/landing/FAQAccordion";
import LandingFooterCTA from "@/components/landing/LandingFooterCTA";
import ScrollReveal from "@/components/landing/ScrollReveal";

export const metadata: Metadata = {
    title: "Nous contacter — Le Bon Resto",
    description:
        "Une question, un projet, une suggestion ? Notre équipe vous répond sous 24 heures ouvrées.",
    openGraph: {
        title: "Nous contacter — Le Bon Resto",
        description:
            "Une question, un projet, une suggestion ? Notre équipe vous répond sous 24 heures ouvrées.",
        siteName: "LeBonResto",
        locale: "fr_FR",
        type: "website",
        images: [
            {
                url: "/assets/landing/heroes/about-emotional.jpg",
                width: 1200,
                height: 630,
                alt: "L'équipe LeBonResto à votre écoute",
            },
        ],
    },
    twitter: { card: "summary_large_image" },
};

// Casablanca static map (Unsplash hot-link — aerial city view as map alternative).
// TODO: replace with embedded interactive map (Mapbox/Leaflet) once API key is wired.
const MAP_IMAGE =
    "https://images.unsplash.com/photo-1577147443647-81856d5151af?auto=format&fit=crop&w=1600&q=80";

// Direct channels.
const CHANNELS = [
    {
        icon: Phone,
        eyebrow: "Téléphone",
        title: "+212 5 22 00 00 00",
        href: "tel:+212522000000",
        hint: "Lundi au samedi, 9h–19h",
        cta: "Appeler maintenant",
    },
    {
        icon: Mail,
        eyebrow: "E-mail",
        title: "le.bon.restau@gmail.com",
        href: "mailto:le.bon.restau@gmail.com",
        hint: "Réponse sous 24h ouvrées",
        cta: "Envoyer un e-mail",
    },
    {
        icon: MessageCircle,
        eyebrow: "WhatsApp Business",
        title: "+212 6 00 00 00 00",
        href: "https://wa.me/212600000000",
        hint: "Conversation rapide, en français ou en arabe",
        cta: "Ouvrir WhatsApp",
    },
    {
        icon: MapPin,
        eyebrow: "Bureau",
        title: "Casablanca, Maroc",
        href: "https://maps.google.com/?q=Casablanca",
        hint: "Adresse complète communiquée sur rendez-vous",
        cta: "Voir sur Google Maps",
    },
];

// Reassurances.
const PROMISES = [
    {
        icon: Clock,
        title: "Réponse sous 24 h ouvrées",
        description:
            "Du lundi au vendredi, un membre de l'équipe revient vers vous avec une vraie réponse — pas un accusé de réception automatique.",
    },
    {
        icon: ShieldCheck,
        title: "Confidentialité respectée",
        description:
            "Vos coordonnées et le contenu de votre message restent strictement à usage interne. Aucune revente de données.",
    },
    {
        icon: CheckCircle2,
        title: "Pas d'engagement",
        description:
            "Premier échange sans engagement, en français ou en arabe. Vous décidez ensuite de la suite à donner.",
    },
];

// FAQ — short version, deeper questions live on /faq.
const FAQ_ITEMS = [
    {
        question: "Sous combien de temps recevrai-je une réponse ?",
        answer:
            "Nous répondons sous 24 heures ouvrées, du lundi au vendredi. Les demandes reçues le week-end sont traitées dès le lundi matin.",
    },
    {
        question: "Puis-je vous joindre directement par téléphone ?",
        answer:
            "Oui, du lundi au samedi entre 9h et 19h au +212 5 22 00 00 00. Si la ligne est occupée, WhatsApp est souvent la voie la plus rapide.",
    },
    {
        question: "Mes informations sont-elles confidentielles ?",
        answer:
            "Absolument. Vos coordonnées et le contenu de votre message restent à usage interne, uniquement pour répondre à votre demande. Aucune revente, aucun partage avec un tiers.",
    },
    {
        question: "Je suis restaurateur — quelle est la meilleure entrée ?",
        answer:
            "Le plus rapide est de remplir le formulaire d'inscription dédié sur la page Restaurateurs. Un conseiller vous rappelle pour cadrer votre projet.",
    },
];

export default function ContactPage() {
    return (
        <>
            {/* 1. Hero — compact, mockup-less variant via ProductHero with a
                soft contextual image. Headline & subtitle from strategy doc 3.18. */}
            <ProductHero
                eyebrow="NOUS CONTACTER"
                headline="Parlons-nous."
                accent="Parlons-nous."
                subheadline="Une question, un projet, une remarque ? Choisissez le canal qui vous convient — par téléphone, e-mail, WhatsApp ou via le formulaire ci-dessous."
                primaryCta={{ label: "Envoyer mon message", href: "#form" }}
                secondaryCta={{ label: "Voir la FAQ", href: "/faq" }}
                mockup={{
                    src: "/assets/landing/heroes/about-emotional.jpg",
                    alt: "L'équipe LeBonResto à votre écoute depuis Casablanca",
                    aspect: "tablet",
                }}
                backgroundImage={{
                    src: "/assets/landing/heroes/about-emotional.jpg",
                    alt: "",
                }}
                floatingCards={[
                    { icon: "Clock", label: "Réponse", value: "< 24 h" },
                    { icon: "ShieldCheck", label: "Données", value: "Privées" },
                    { icon: "Languages", label: "Langues", value: "FR + AR" },
                ]}
            />

            {/* 2. Canaux directs — 4 cliquable channel cards.
                Mobile-first per strategy: phone/email/WhatsApp tappable. */}
            <ScrollReveal>
                <section className="bg-cream-50 py-10 md:py-14 lg:py-16">
                    <div className="container-wide">
                        <SectionHeader
                            eyebrow="CHOISIR VOTRE CANAL"
                            title="Quatre façons de nous joindre."
                            accent="nous joindre."
                            description="Tous les canaux sont opérés par la même équipe basée à Casablanca."
                            align="center"
                        />

                        <ul className="mt-8 sm:mt-10 grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
                            {CHANNELS.map((c) => {
                                const Icon = c.icon;
                                const isExternal = c.href.startsWith("http");
                                return (
                                    <li key={c.eyebrow}>
                                        <Link
                                            href={c.href}
                                            target={
                                                isExternal ? "_blank" : undefined
                                            }
                                            rel={
                                                isExternal
                                                    ? "noopener noreferrer"
                                                    : undefined
                                            }
                                            className="group flex h-full flex-col rounded-2xl bg-white p-4 sm:p-5 md:p-6 shadow-premium ring-1 ring-slate-100 transition duration-300 hover:-translate-y-1 hover:shadow-glow focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                                        >
                                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cream-100 text-primary">
                                                <Icon
                                                    className="h-6 w-6"
                                                    aria-hidden="true"
                                                />
                                            </div>
                                            <p className="mt-4 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-primary">
                                                {c.eyebrow}
                                            </p>
                                            <p className="mt-1 font-display text-base sm:text-lg font-semibold text-slate-900 break-words">
                                                {c.title}
                                            </p>
                                            <p className="mt-2 text-sm text-slate-600">
                                                {c.hint}
                                            </p>
                                            <span className="mt-4 inline-flex min-h-[44px] items-center gap-1 text-sm font-semibold text-primary transition-transform duration-300 group-hover:translate-x-1">
                                                {c.cta}
                                                <ArrowRight
                                                    className="h-4 w-4"
                                                    aria-hidden="true"
                                                />
                                            </span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </section>
            </ScrollReveal>

            {/* 3. Form + Rassurances — split layout 50/50 desktop.
                Form anchored at #form for the hero CTA. */}
            <ScrollReveal>
                <section
                    id="form"
                    aria-labelledby="contact-form-title"
                    className="bg-white py-10 md:py-14 lg:py-16 scroll-mt-24"
                >
                    <div className="container-wide grid gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-12">
                        {/* Left: form */}
                        <div className="lg:col-span-7">
                            <SectionHeader
                                eyebrow="FORMULAIRE GÉNÉRAL"
                                title="Décrivez votre demande."
                                accent="votre demande."
                                description="Plus votre message est précis, plus notre réponse sera utile. Tous les champs marqués d'un * sont obligatoires."
                                align="left"
                            />
                            <h2 id="contact-form-title" className="sr-only">
                                Formulaire de contact
                            </h2>
                            <div className="mt-6 sm:mt-8">
                                <ContactForm />
                            </div>
                        </div>

                        {/* Right: promises / reassurances */}
                        <aside
                            aria-label="Ce que nous promettons"
                            className="lg:col-span-5"
                        >
                            <div className="lg:sticky lg:top-24 rounded-2xl bg-cream-50 p-5 sm:p-6 md:p-8 ring-1 ring-cream-200">
                                <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-primary">
                                    Ce que nous promettons
                                </p>
                                <h3 className="mt-3 font-display text-xl sm:text-2xl font-bold text-slate-900 leading-[1.1] text-balance">
                                    Une équipe à taille humaine, qui répond
                                    vraiment.
                                </h3>
                                <ul className="mt-5 sm:mt-6 space-y-4 sm:space-y-5">
                                    {PROMISES.map((p) => {
                                        const Icon = p.icon;
                                        return (
                                            <li
                                                key={p.title}
                                                className="flex items-start gap-3"
                                            >
                                                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-primary ring-1 ring-primary/15">
                                                    <Icon
                                                        className="h-5 w-5"
                                                        aria-hidden="true"
                                                    />
                                                </span>
                                                <div>
                                                    <p className="font-display text-base font-semibold text-slate-900">
                                                        {p.title}
                                                    </p>
                                                    <p className="mt-1 text-sm leading-relaxed text-slate-600">
                                                        {p.description}
                                                    </p>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>

                                <div className="mt-6 border-t border-cream-200 pt-5 text-sm text-slate-600">
                                    Préférez un échange direct ?{" "}
                                    <Link
                                        href="https://wa.me/212600000000"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-semibold text-primary hover:underline"
                                    >
                                        Écrivez-nous sur WhatsApp
                                    </Link>
                                    .
                                </div>
                            </div>
                        </aside>
                    </div>
                </section>
            </ScrollReveal>

            {/* 4. Bureau Casablanca — carte statique + horaires support. */}
            <ScrollReveal>
                <section
                    aria-labelledby="office-title"
                    className="bg-cream-50 py-10 md:py-14 lg:py-16"
                >
                    <div className="container-wide">
                        <SectionHeader
                            eyebrow="NOTRE BUREAU"
                            title="Casablanca, à votre disposition."
                            accent="Casablanca,"
                            description="Le hub LeBonResto est installé à Casablanca. Sur rendez-vous, nous recevons restaurateurs, partenaires et investisseurs pour des échanges en présentiel."
                            align="center"
                        />

                        <div className="mt-8 sm:mt-10 grid gap-5 sm:gap-6 lg:grid-cols-12 lg:gap-8">
                            {/* Map / city visual */}
                            <div className="lg:col-span-7">
                                <Link
                                    href="https://maps.google.com/?q=Casablanca"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Ouvrir Casablanca dans Google Maps"
                                    className="group relative block aspect-[16/10] overflow-hidden rounded-2xl shadow-premium ring-1 ring-slate-100"
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={MAP_IMAGE}
                                        alt="Vue aérienne de Casablanca où se trouve le bureau LeBonResto"
                                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    {/* Brand gradient fallback layer */}
                                    <div
                                        aria-hidden="true"
                                        className="absolute inset-0 -z-10 bg-brand-gradient"
                                    />
                                    {/* Pin overlay */}
                                    <div className="absolute inset-0 flex items-end justify-start p-4 sm:p-5 md:p-6">
                                        <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-slate-900 shadow-premium ring-1 ring-slate-100">
                                            <MapPin
                                                className="h-4 w-4 text-primary"
                                                aria-hidden="true"
                                            />
                                            Casablanca, Maroc
                                        </span>
                                    </div>
                                </Link>
                            </div>

                            {/* Hours + secondary info */}
                            <div className="lg:col-span-5">
                                <div className="h-full rounded-2xl bg-white p-5 sm:p-6 md:p-8 shadow-premium ring-1 ring-slate-100">
                                    <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-primary">
                                        Horaires support
                                    </p>
                                    <h3 className="mt-3 font-display text-xl sm:text-2xl font-bold text-slate-900 leading-[1.1] text-balance">
                                        Disponibles 6 jours / 7.
                                    </h3>
                                    <dl className="mt-5 divide-y divide-slate-100 text-sm">
                                        <div className="flex items-center justify-between py-3">
                                            <dt className="font-medium text-slate-700">
                                                Lundi – Vendredi
                                            </dt>
                                            <dd className="text-slate-900">
                                                9h – 19h
                                            </dd>
                                        </div>
                                        <div className="flex items-center justify-between py-3">
                                            <dt className="font-medium text-slate-700">
                                                Samedi
                                            </dt>
                                            <dd className="text-slate-900">
                                                10h – 17h
                                            </dd>
                                        </div>
                                        <div className="flex items-center justify-between py-3">
                                            <dt className="font-medium text-slate-700">
                                                Dimanche
                                            </dt>
                                            <dd className="text-slate-500">
                                                Fermé
                                            </dd>
                                        </div>
                                    </dl>
                                    <p className="mt-5 text-sm text-slate-600">
                                        Adresse complète communiquée sur
                                        rendez-vous — écrivez-nous ou appelez le
                                        bureau pour fixer un créneau.
                                    </p>
                                    <div className="mt-6 flex flex-wrap gap-2">
                                        <Link
                                            href="tel:+212522000000"
                                            className="inline-flex h-11 items-center gap-1.5 rounded-full bg-primary px-4 sm:px-5 text-sm font-semibold text-white transition hover:bg-primary-700"
                                        >
                                            <Phone
                                                className="h-4 w-4"
                                                aria-hidden="true"
                                            />
                                            Appeler le bureau
                                        </Link>
                                        <Link
                                            href="mailto:le.bon.restau@gmail.com"
                                            className="inline-flex h-11 items-center gap-1.5 rounded-full border border-slate-300 bg-white px-4 sm:px-5 text-sm font-semibold text-slate-900 transition hover:border-primary hover:text-primary"
                                        >
                                            <Mail
                                                className="h-4 w-4"
                                                aria-hidden="true"
                                            />
                                            Envoyer un e-mail
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </ScrollReveal>

            {/* 5. Liens utiles — quick links to deeper pages. */}
            <ScrollReveal>
                <section
                    aria-labelledby="useful-links-title"
                    className="bg-white py-10 md:py-14 lg:py-16"
                >
                    <div className="container-wide">
                        <SectionHeader
                            eyebrow="LIENS UTILES"
                            title="Vous cherchez plutôt..."
                            accent="plutôt..."
                            align="center"
                        />
                        <h2 id="useful-links-title" className="sr-only">
                            Liens utiles
                        </h2>
                        <ul className="mt-8 sm:mt-10 grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
                            {[
                                {
                                    href: "/faq",
                                    label: "Questions fréquentes",
                                    hint: "Réponses préventives par thème.",
                                },
                                {
                                    href: "/restaurateurs",
                                    label: "Espace restaurateurs",
                                    hint: "Rejoindre la marketplace.",
                                },
                                {
                                    href: "/investisseurs",
                                    label: "Espace investisseurs",
                                    hint: "Dossier et data room.",
                                },
                                {
                                    href: "/notre-solution",
                                    label: "Notre solution",
                                    hint: "Vue d'ensemble produit.",
                                },
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="group flex h-full flex-col rounded-2xl bg-cream-50 p-4 sm:p-5 md:p-6 ring-1 ring-cream-200 transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-premium"
                                    >
                                        <p className="font-display text-base font-semibold text-slate-900 group-hover:text-primary">
                                            {link.label}
                                        </p>
                                        <p className="mt-2 text-sm text-slate-600">
                                            {link.hint}
                                        </p>
                                        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-transform duration-300 group-hover:translate-x-1">
                                            Découvrir
                                            <ArrowRight
                                                className="h-4 w-4"
                                                aria-hidden="true"
                                            />
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            </ScrollReveal>

            {/* 6. FAQ contact — short. Long FAQ lives on /faq. */}
            <ScrollReveal>
                <FAQAccordion
                    eyebrow="FAQ CONTACT"
                    title="Les questions qui reviennent."
                    accent="qui reviennent."
                    items={FAQ_ITEMS}
                    variant="cream"
                />
            </ScrollReveal>

            {/* 7. Footer CTA — brand gradient closer. */}
            <ScrollReveal>
                <LandingFooterCTA
                    title="Un projet, une question, une idée. On vous écoute."
                    primaryCta={{
                        label: "Envoyer mon message",
                        href: "#form",
                    }}
                    secondaryCta={{
                        label: "Voir la FAQ complète",
                        href: "/faq",
                    }}
                />
            </ScrollReveal>
        </>
    );
}
