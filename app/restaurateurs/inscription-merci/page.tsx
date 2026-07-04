import type { Metadata } from "next";
import Link from "next/link";
import {
    CheckCircle2,
    Phone,
    Mail,
    MessageCircle,
    CalendarCheck,
    Camera,
    Rocket,
    ShieldCheck,
} from "lucide-react";
import BreadcrumbBar from "@/components/landing/BreadcrumbBar";
import ScrollReveal from "@/components/landing/ScrollReveal";
import SectionHeader from "@/components/landing/SectionHeader";
import LandingFooterCTA from "@/components/landing/LandingFooterCTA";

export const metadata: Metadata = {
    title: "Merci — Demande reçue | Le Bon Resto",
    description:
        "Votre demande est arrivée. Notre équipe vous rappelle sous 24 heures ouvrées pour démarrer votre fiche premium.",
    robots: { index: false, follow: false },
    openGraph: {
        title: "Merci — Demande reçue | Le Bon Resto",
        description:
            "Votre demande est arrivée. Notre équipe vous rappelle sous 24 heures ouvrées pour démarrer votre fiche premium.",
        siteName: "LeBonResto",
        locale: "fr_FR",
        type: "website",
        images: [
            {
                url: "/assets/landing/heroes/restaurateur-tablet.jpg",
                width: 1200,
                height: 630,
                alt: "LeBonResto — Demande reçue",
            },
        ],
    },
    twitter: { card: "summary_large_image" },
};

const nextSteps = [
    {
        icon: ShieldCheck,
        when: "Aujourd'hui",
        label: "Vérification de votre demande par un conseiller.",
    },
    {
        icon: CalendarCheck,
        when: "Sous 24 h ouvrées",
        label: "Appel découverte de 20 minutes.",
    },
    {
        icon: Camera,
        when: "J+3 à J+7",
        label: "Préparation de votre fiche (photos, menu, horaires).",
    },
    {
        icon: Rocket,
        when: "J+7 à J+14",
        label: "Mise en ligne et lancement officiel.",
    },
];

const contactChannels = [
    {
        icon: Phone,
        label: "Téléphone",
        value: "+212 ___ ___ ___",
        href: "tel:+212000000000",
    },
    {
        icon: Mail,
        label: "Email",
        value: "le.bon.restau@gmail.com",
        href: "mailto:le.bon.restau@gmail.com",
    },
    {
        icon: MessageCircle,
        label: "WhatsApp Business",
        value: "Discutons sur WhatsApp",
        href: "https://wa.me/212600000000",
    },
];

export default function InscriptionMerciPage() {
    return (
        <>
            <BreadcrumbBar
                items={[
                    { label: "Accueil", href: "/" },
                    { label: "Restaurateurs", href: "/restaurateurs" },
                    { label: "Merci" },
                ]}
            />

            {/* 1. Confirmation card — no hero photo; centered confirmation */}
            <section className="relative overflow-hidden bg-cream-50 py-10 md:py-14 lg:py-16">
                {/* Decorative brand-gradient halos (confetti-like) */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
                />
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-secondary/10 blur-3xl"
                />

                <div className="container-narrow relative">
                    <ScrollReveal>
                        <div className="mx-auto max-w-2xl rounded-3xl bg-white p-5 sm:p-6 md:p-8 lg:p-10 shadow-premium ring-1 ring-slate-100 text-center">
                            <div className="mx-auto flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-primary/10">
                                <CheckCircle2
                                    className="h-10 w-10 sm:h-12 sm:w-12 text-primary"
                                    strokeWidth={1.75}
                                    aria-hidden="true"
                                />
                            </div>

                            <span className="mt-5 sm:mt-6 inline-block rounded-full bg-primary/10 px-3 sm:px-4 py-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                                Demande bien reçue
                            </span>

                            <h1 className="mt-4 font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.05] text-slate-900 text-balance">
                                Merci pour votre demande
                            </h1>

                            <p className="mt-4 sm:mt-5 text-base sm:text-lg text-slate-600 text-pretty max-w-prose mx-auto">
                                Notre équipe vous rappelle sous 24 heures ouvrées pour
                                démarrer votre fiche premium. En attendant, voici ce qui
                                se passe.
                            </p>

                            <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                                <Link
                                    href="/"
                                    className="inline-flex items-center justify-center rounded-full bg-primary h-11 md:h-12 px-5 sm:px-6 md:px-8 text-sm sm:text-base font-semibold text-white shadow-premium hover:bg-primary-700 transition-colors"
                                >
                                    Retour à l&apos;accueil
                                </Link>
                                <Link
                                    href="https://wa.me/212600000000"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-primary/30 h-11 md:h-12 px-5 sm:px-6 md:px-8 text-sm sm:text-base font-semibold text-primary hover:bg-primary/5 hover:border-primary/60 transition-colors"
                                >
                                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                                    Nous joindre sur WhatsApp
                                </Link>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* 2. Next steps timeline */}
            <ScrollReveal>
                <section className="py-10 md:py-14 lg:py-16 bg-white">
                    <div className="container-narrow">
                        <SectionHeader
                            eyebrow="Prochaines étapes"
                            title="Ce qui vous attend"
                            accent="vous attend"
                            description="Un parcours en quatre étapes claires, du premier appel au lancement de votre fiche premium."
                        />

                        <ol className="mt-8 sm:mt-10 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
                            {nextSteps.map((step, idx) => {
                                const Icon = step.icon;
                                return (
                                    <li
                                        key={step.when}
                                        className="relative flex gap-3 sm:gap-4 rounded-2xl bg-cream-50 p-4 sm:p-5 md:p-6 ring-1 ring-slate-100"
                                    >
                                        <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                                            <Icon
                                                className="h-5 w-5 sm:h-6 sm:w-6 text-primary"
                                                aria-hidden="true"
                                            />
                                        </div>
                                        <div className="min-w-0">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span
                                                    aria-hidden="true"
                                                    className="text-xs font-bold text-primary"
                                                >
                                                    {String(idx + 1).padStart(2, "0")}
                                                </span>
                                                <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                                                    {step.when}
                                                </span>
                                            </div>
                                            <p className="mt-2 text-sm sm:text-base text-slate-700 leading-relaxed">
                                                {step.label}
                                            </p>
                                        </div>
                                    </li>
                                );
                            })}
                        </ol>
                    </div>
                </section>
            </ScrollReveal>

            {/* 3. Direct contact channels */}
            <ScrollReveal>
                <section className="py-10 md:py-14 lg:py-16 bg-cream-50">
                    <div className="container-narrow">
                        <SectionHeader
                            eyebrow="Besoin de nous joindre ?"
                            title="Contact direct"
                            description="Un doute, une question ou une précision à apporter ? Notre équipe restaurateurs est joignable maintenant."
                        />

                        <div className="mt-8 sm:mt-10 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                            {contactChannels.map((channel) => {
                                const Icon = channel.icon;
                                const isExternal = channel.href.startsWith("http");
                                return (
                                    <Link
                                        key={channel.label}
                                        href={channel.href}
                                        target={isExternal ? "_blank" : undefined}
                                        rel={isExternal ? "noopener noreferrer" : undefined}
                                        className="group flex flex-col items-start gap-3 rounded-2xl bg-white p-4 sm:p-5 md:p-6 min-h-[44px] shadow-premium ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
                                    >
                                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
                                            <Icon
                                                className="h-5 w-5 text-primary"
                                                aria-hidden="true"
                                            />
                                        </div>
                                        <div className="min-w-0 w-full">
                                            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                                                {channel.label}
                                            </p>
                                            <p className="mt-1 font-display font-semibold text-slate-900 transition-colors group-hover:text-primary break-words">
                                                {channel.value}
                                            </p>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </ScrollReveal>

            {/* 4. Footer CTA — back home / blog */}
            <LandingFooterCTA
                title="En attendant notre appel, explorez LeBonResto"
                primaryCta={{ label: "Retour à l'accueil", href: "/" }}
                secondaryCta={{ label: "Voir notre solution", href: "/notre-solution" }}
            />
        </>
    );
}
