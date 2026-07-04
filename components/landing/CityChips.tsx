"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/cn";

export interface CityChipItem {
    id: string;
    name: string;
    region: string;
}

export interface CityChipsProps {
    cities: CityChipItem[];
    className?: string;
}

export default function CityChips({ cities, className }: CityChipsProps) {
    const prefersReducedMotion = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    const parentVariants: Variants = {
        hidden: {},
        visible: {
            transition: { staggerChildren: prefersReducedMotion ? 0 : 0.08 },
        },
    };

    const childVariants: Variants = {
        hidden: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: prefersReducedMotion ? 0 : 0.5, ease: "easeOut" },
        },
    };

    return (
        <motion.div
            ref={ref}
            variants={parentVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className={cn(
                "grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 lg:grid-cols-4",
                className,
            )}
        >
            {cities.map((city) => (
                <motion.div
                    key={city.id}
                    variants={childVariants}
                    className="group relative flex items-center gap-2 sm:gap-3 rounded-2xl bg-cream-50 px-3 sm:px-4 py-3 sm:py-4 shadow-premium ring-1 ring-black/5 transition-transform duration-300 hover:-translate-y-1"
                >
                    <span className="relative inline-flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-800">
                        <MapPin className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                        {/* Pulsing dot — respects prefers-reduced-motion via parent flag */}
                        {!prefersReducedMotion && (
                            <span className="absolute -right-0.5 -top-0.5 flex h-2.5 w-2.5">
                                <motion.span
                                    aria-hidden="true"
                                    className="absolute inline-flex h-full w-full rounded-full bg-primary/60"
                                    initial={{ scale: 1, opacity: 0.7 }}
                                    animate={{ scale: [1, 2.2, 1], opacity: [0.7, 0, 0.7] }}
                                    transition={{
                                        duration: 2.4,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                />
                                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
                            </span>
                        )}
                    </span>
                    <div className="min-w-0">
                        <div className="text-sm font-semibold text-slate-900 truncate">
                            {city.name}
                        </div>
                        <div className="text-xs text-slate-500 truncate">{city.region}</div>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
}
