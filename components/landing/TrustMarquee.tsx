"use client";

import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

interface TrustMarqueeProps {
    title?: string;
    className?: string;
}

const PARTNERS = [
    "Riad Yacout",
    "La Sqala",
    "Comptoir Darna",
    "Le Cabestan",
    "Cafe Clock",
    "Crystal Marrakech",
    "Number 8",
    "Dar Yacout",
];

interface RowProps {
    items: string[];
    direction: "left" | "right";
    duration: string;
    paused: boolean;
}

function MarqueeRow({ items, direction, duration, paused }: RowProps) {
    // Duplicate the list so the loop is seamless after translating -50%.
    const repeated = [...items, ...items];

    return (
        <div
            aria-hidden="true"
            className="relative overflow-hidden"
            style={{
                maskImage:
                    "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
                WebkitMaskImage:
                    "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
            }}
        >
            <ul
                className={cn(
                    "flex w-max gap-3 sm:gap-4 md:gap-6",
                    paused
                        ? ""
                        : direction === "left"
                            ? "animate-marquee-left"
                            : "animate-marquee-right",
                )}
                style={paused ? undefined : { animationDuration: duration }}
            >
                {repeated.map((name, idx) => (
                    <li
                        key={`${name}-${idx}`}
                        className="shrink-0 rounded-full border border-slate-200 bg-white/70 px-4 py-2 sm:px-6 sm:py-3 backdrop-blur-sm shadow-sm"
                    >
                        <span
                            className="whitespace-nowrap text-sm sm:text-base md:text-lg font-medium tracking-wide text-slate-700"
                            style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif" }}
                        >
                            {name}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

/**
 * TrustMarquee — infinite horizontal marquee of stylized restaurant brand tiles.
 *
 * Two rows drift in opposite directions (30s and 40s loops) using pure CSS
 * keyframes — no JS scroll listener. Respects `prefers-reduced-motion`:
 * when reduced motion is on, both rows render statically (no animation).
 */
export default function TrustMarquee({ title = "Ils nous font confiance", className }: TrustMarqueeProps) {
    const prefersReducedMotion = useReducedMotion() ?? false;

    // Offset the second row so the two rows look different at first glance.
    const offsetItems = [...PARTNERS.slice(3), ...PARTNERS.slice(0, 3)];

    return (
        <section className={cn("py-10 md:py-14 lg:py-16 bg-cream-50/60", className)}>
            <div className="container-wide">
                <p className="text-center text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] sm:tracking-[0.25em] text-slate-500">
                    {title}
                </p>

                <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4 md:space-y-6">
                    <MarqueeRow
                        items={PARTNERS}
                        direction="left"
                        duration="30s"
                        paused={prefersReducedMotion}
                    />
                    <MarqueeRow
                        items={offsetItems}
                        direction="right"
                        duration="40s"
                        paused={prefersReducedMotion}
                    />
                </div>
            </div>
        </section>
    );
}
