import type { Metadata } from "next";
import Link from "next/link";
import {
    CheckCircle2,
    FileSignature,
    Database,
    PhoneCall,
    Search,
    Mail,
    ArrowRight,
    BookOpen,
} from "lucide-react";

import BreadcrumbBar from "@/components/landing/BreadcrumbBar";
import SectionHeader from "@/components/landing/SectionHeader";
import ScrollReveal from "@/components/landing/ScrollReveal";
import LandingFooterCTA from "@/components/landing/LandingFooterCTA";

export const metadata: Metadata = {
    title: "Demande reçue — Le Bon Resto investisseurs",
    description:
        "Votre demande de dossier est enregistrée. Notre équipe revient vers vous sous 48 heures avec NDA et data room.",
    robots: { index: false, follow: false },
    openGraph: {
        title: "Demande reçue — Le Bon Resto investisseurs",
        description:
            "Votre demande de dossier est enregistrée. Notre équipe revient vers vous sous 48 heures avec NDA et data room.",
        siteName: "LeBonResto",
        locale: "fr_FR",
        type: "website",
        images: [
            {
                url: "/assets/landing/heroes/investor-dashboard.jpg",
                width: 1200,
                height: 630,
                alt: "Le Bon Resto — Espace investisseurs",
            },
        ],
    },
    twitter: { card: "summary_large_image" },
};

interface NextStep {
    icon: typeof FileSignature;
    when: string;
    title: string;
    description: string;
}

const nextSteps: NextStep[] = [
    {
        icon: FileSignature,
        when: "Sous 48 h",
        title: "Envoi du NDA",
        description:
            "Le fondateur vous adresse l'accord de confidentialité pour signature électronique.",
    },
    {
        icon: Database,
        when: "Après signature",
        title: "Accès au data room",
        description:
            "Partage du data room sécurisé : marché, finances, traction, équipe et roadmap détaillée.",
    },
    {
        icon: PhoneCall,
        when: "Sous 7 à 10 jours",
        title: "Premier appel fondateur",
        description:
            "Échange de 45 minutes pour répondre à vos questions et aligner les attentes mutuelles.",
    },
    {
        icon: Search,
        when: "Au-delà",
        title: "Due diligence",
        description:
            "Process de due diligence calibré selon votre rythme et vos exigences d'investisseur.",
    },
];

export default function InvestisseursDossierMerciPage() {
    return (
        <>
            <BreadcrumbBar
                items={[
                    { label: "Accueil", href: "/" },
                    { label: "Investisseurs", href: "/investisseurs" },
                    { label: "Merci" },
                ]}
            />

            {/* 1. Confirmation visuelle — centered card, no hero photo */}
            <section className="py-10 md:py-14 lg:py-16">
                <div className="container-narrow">
                    <ScrollReveal>
                        <div className="mx-auto flex max-w-2xl flex-col items-center rounded-3xl border border-slate-100 bg-white p-5 sm:p-6 md:p-8 lg:p-10 text-center shadow-premium">
                            <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-primary/10">
                                <CheckCircle2
                                    className="h-10 w-10 sm:h-12 sm:w-12 text-primary"
                                    aria-hidden="true"
                                />
                            </div>
                            <span className="mt-5 sm:mt-6 inline-block rounded-full bg-primary/10 px-3 sm:px-4 py-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                                Demande bien reçue
                            </span>
                            <h1 className="mt-4 text-balance font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.05] text-slate-900">
                                Merci, votre demande est entre{" "}
                                <span className="text-primary">nos mains</span>.
                            </h1>
                            <p className="mt-4 sm:mt-5 max-w-prose text-pretty text-base sm:text-lg text-slate-600">
                                Le fondateur revient vers vous sous 48 heures avec
                                l&apos;accord de confidentialité et la suite du
                                process.
                            </p>
                            <div className="mt-7 sm:mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                                <Link
                                    href="/investisseurs"
                                    className="inline-flex items-center justify-center gap-2 rounded-full bg-primary h-11 md:h-12 px-5 sm:px-6 md:px-8 text-sm sm:text-base font-semibold text-white shadow-premium transition-colors hover:bg-primary-700"
                                >
                                    Retour à la présentation
                                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                                </Link>
                                <Link
                                    href="mailto:le.bon.restau@gmail.com"
                                    className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-slate-300 h-11 md:h-12 px-5 sm:px-6 md:px-8 text-sm sm:text-base font-semibold text-slate-800 transition-colors hover:border-primary hover:text-primary"
                                >
                                    <Mail className="h-4 w-4" aria-hidden="true" />
                                    Écrire au fondateur
                                </Link>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* 2. Prochaines étapes — NDA / data room / appel / DD */}
            <section className="py-10 md:py-14 lg:py-16">
                <div className="container-wide">
                    <ScrollReveal>
                        <SectionHeader
                            eyebrow="Prochaines étapes"
                            title="Un process clair, calibré pour investisseurs sérieux"
                            accent="clair"
                            description="Quatre étapes, du premier contact à la due diligence. Chaque étape est documentée et respecte votre rythme."
                        />
                    </ScrollReveal>
                    <ScrollReveal className="mt-8 sm:mt-10 lg:mt-12">
                        <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:gap-6">
                            {nextSteps.map((step, idx) => {
                                const Icon = step.icon;
                                return (
                                    <li
                                        key={step.title}
                                        className="flex flex-col rounded-2xl border border-slate-100 bg-white p-4 sm:p-5 md:p-6 shadow-premium"
                                    >
                                        <div className="flex items-start gap-3 sm:gap-4">
                                            <div className="flex h-11 w-11 sm:h-12 sm:w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10">
                                                <Icon
                                                    className="h-5 w-5 sm:h-6 sm:w-6 text-primary"
                                                    aria-hidden="true"
                                                />
                                            </div>
                                            <div className="min-w-0">
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                                                        Étape {idx + 1}
                                                    </span>
                                                    <span className="rounded-full bg-cream-50 px-2.5 py-0.5 text-[11px] sm:text-xs font-medium text-slate-700">
                                                        {step.when}
                                                    </span>
                                                </div>
                                                <h3 className="mt-2 font-display text-lg sm:text-xl md:text-2xl font-semibold text-slate-900 leading-[1.1] text-balance">
                                                    {step.title}
                                                </h3>
                                                <p className="mt-2 text-sm sm:text-base text-slate-600">
                                                    {step.description}
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ol>
                    </ScrollReveal>
                </div>
            </section>

            {/* 3. Suggestion de lecture + contact direct */}
            <section
                aria-labelledby="dossier-merci-followup-title"
                className="py-10 md:py-14 lg:py-16"
            >
                <div className="container-wide">
                    {/* Section title is visually implicit (each card carries its own
                        h3 kicker) but a screen-reader-only h2 keeps the heading
                        order valid — Playwright axe was flagging h3-before-h2. */}
                    <h2 id="dossier-merci-followup-title" className="sr-only">
                        En attendant, deux pistes pour continuer
                    </h2>
                    <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2">
                        <ScrollReveal>
                            <div className="flex h-full flex-col rounded-2xl border border-slate-100 bg-cream-50 p-4 sm:p-5 md:p-6">
                                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-3 py-1 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                                    <BookOpen className="h-4 w-4" aria-hidden="true" />
                                    En attendant
                                </span>
                                <h3 className="mt-4 font-display text-lg sm:text-xl md:text-2xl font-semibold text-slate-900 leading-[1.1] text-balance">
                                    Suggestion de lecture
                                </h3>
                                <p className="mt-3 text-pretty text-sm sm:text-base text-slate-600">
                                    Articles récents sur la FoodTech marocaine, sur
                                    notre vision et nos coulisses produit.
                                </p>
                                <div className="mt-6">
                                    <Link
                                        href="/a-propos"
                                        className="inline-flex items-center gap-2 rounded-full bg-primary h-11 md:h-12 px-5 sm:px-6 md:px-8 text-sm sm:text-base font-semibold text-white shadow-premium transition-colors hover:bg-primary-700"
                                    >
                                        Découvrir l&apos;équipe
                                        <ArrowRight
                                            className="h-4 w-4"
                                            aria-hidden="true"
                                        />
                                    </Link>
                                </div>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={0.1}>
                            <div className="flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-4 sm:p-5 md:p-6 shadow-premium">
                                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                                    <Mail className="h-4 w-4" aria-hidden="true" />
                                    Contact direct
                                </span>
                                <h3 className="mt-4 font-display text-lg sm:text-xl md:text-2xl font-semibold text-slate-900 leading-[1.1] text-balance">
                                    Une question urgente&nbsp;?
                                </h3>
                                <p className="mt-3 text-pretty text-sm sm:text-base text-slate-600">
                                    Le fondateur lit chaque message d&apos;investisseur.
                                    Écrivez-lui directement, la réponse arrive
                                    généralement dans la journée.
                                </p>
                                <div className="mt-6">
                                    <Link
                                        href="mailto:le.bon.restau@gmail.com"
                                        className="inline-flex items-center gap-2 rounded-full border-2 border-primary h-11 md:h-12 px-5 sm:px-6 md:px-8 text-sm sm:text-base font-semibold text-primary transition-colors hover:bg-primary hover:text-white max-w-full"
                                    >
                                        <span className="truncate">le.bon.restau@gmail.com</span>
                                        <ArrowRight
                                            className="h-4 w-4 shrink-0"
                                            aria-hidden="true"
                                        />
                                    </Link>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* 4. Footer CTA — retour parcours principal */}
            <LandingFooterCTA
                title="Pendant l'attente, explorez le produit en profondeur."
                primaryCta={{
                    label: "Retour à la présentation",
                    href: "/investisseurs",
                }}
                secondaryCta={{
                    label: "Découvrir la solution",
                    href: "/notre-solution",
                }}
            />
        </>
    );
}
