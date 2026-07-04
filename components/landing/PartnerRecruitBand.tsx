"use client";

import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/cn";

interface PartnerPersona {
    /** Nom d'icône lucide (ex : "Users", "Camera", "Compass"). */
    icon: string;
    title: string;
    description: string;
    cta: { label: string; href: string };
}

export interface PartnerRecruitBandProps {
    eyebrow?: string;
    title: string;
    accent?: string;
    description?: string;
    personas: PartnerPersona[];
    className?: string;
}

type LucideIconComponent = React.ComponentType<{
    size?: number;
    className?: string;
    strokeWidth?: number;
    "aria-hidden"?: boolean | "true" | "false";
}>;

function resolveIcon(name: string): LucideIconComponent {
    const lookup = LucideIcons as unknown as Record<string, LucideIconComponent>;
    return lookup[name] ?? lookup.Sparkles;
}

/**
 * `SectionHeader` par défaut est calibré fond clair (h2 slate-900, accent
 * `text-primary`). Sur `bg-secondary` (navy), le teal-500 par défaut passe
 * sous le seuil AA. On duplique donc la structure du header en local et
 * on force l'accent sur `text-primary-300` — brief Sprint 2.6.
 */
function renderTitle(title: string, accent?: string) {
    if (!accent) return title;
    const idx = title.indexOf(accent);
    if (idx < 0) return title;
    return (
        <>
            {title.slice(0, idx)}
            <span className="text-primary-300">{accent}</span>
            {title.slice(idx + accent.length)}
        </>
    );
}

export default function PartnerRecruitBand({
    eyebrow,
    title,
    accent,
    description,
    personas,
    className,
}: PartnerRecruitBandProps) {
    const prefersReducedMotion = useReducedMotion();

    const parentVariants: Variants = {
        hidden: {},
        visible: {
            transition: { staggerChildren: prefersReducedMotion ? 0 : 0.1 },
        },
    };
    const childVariants: Variants = {
        hidden: prefersReducedMotion
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: prefersReducedMotion ? 0 : 0.55,
                ease: "easeOut",
            },
        },
    };

    return (
        <section
            className={cn(
                "relative isolate overflow-hidden bg-secondary text-white section-y",
                className,
            )}
        >
            {/* Halo radial teal subtil — cohérent avec le LandingFooterCTA / hero
                sur bg-secondary. Pointer-events-none, aria-hidden. */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 opacity-70"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at 15% 15%, rgba(1,107,97,0.35) 0%, transparent 55%), radial-gradient(circle at 85% 85%, rgba(1,64,56,0.55) 0%, transparent 60%)",
                }}
            />

            <div className="container-wide">
                {/* Header : on n'utilise pas le SectionHeader tel quel car ses
                    classes sont calibrées pour fond clair (h2 slate-900,
                    description slate-600, eyebrow pill teal). On duplique
                    ici la structure pour rester lisible sur navy. */}
                <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
                    {eyebrow && (
                        <span className="inline-block rounded-full bg-white/10 px-3 sm:px-4 py-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-primary-200 ring-1 ring-white/15 backdrop-blur">
                            {eyebrow}
                        </span>
                    )}
                    <h2
                        className={cn(
                            "font-display font-bold text-balance leading-[1.1] text-white",
                            "text-2xl sm:text-3xl md:text-4xl",
                            eyebrow ? "mt-3 sm:mt-4" : "mt-0",
                        )}
                    >
                        {renderTitle(title, accent)}
                    </h2>
                    {description && (
                        <p className="mt-4 sm:mt-5 max-w-2xl text-sm sm:text-base text-white/75 text-pretty">
                            {description}
                        </p>
                    )}
                </div>

                {/* Grille personas */}
                <motion.ul
                    variants={parentVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
                >
                    {personas.map((persona, idx) => {
                        const Icon = resolveIcon(persona.icon);
                        return (
                            <motion.li
                                key={`${persona.title}-${idx}`}
                                variants={childVariants}
                                className="group rounded-2xl bg-white/5 ring-1 ring-white/10 backdrop-blur p-5 md:p-6 transition-colors duration-300 hover:bg-white/10"
                            >
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary-200">
                                    <Icon
                                        size={22}
                                        strokeWidth={1.75}
                                        aria-hidden="true"
                                    />
                                </div>
                                <h3 className="font-display text-lg font-semibold text-white">
                                    {persona.title}
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed text-white/75 text-pretty">
                                    {persona.description}
                                </p>
                                <Link
                                    href={persona.cta.href}
                                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-300 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 focus-visible:ring-offset-secondary rounded-sm"
                                >
                                    <span>{persona.cta.label}</span>
                                    <ArrowRight
                                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                                        aria-hidden="true"
                                    />
                                </Link>
                            </motion.li>
                        );
                    })}
                </motion.ul>
            </div>
        </section>
    );
}
