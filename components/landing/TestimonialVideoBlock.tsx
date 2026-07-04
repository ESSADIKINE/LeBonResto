"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Quote } from "lucide-react";
import { cn } from "@/lib/cn";
import VideoShowcase from "./VideoShowcase";

export interface TestimonialAuthor {
    name: string;
    role: string;
    avatarSrc?: string;
    restaurantName?: string;
}

export interface TestimonialVideoBlockProps {
    eyebrow?: string;
    video: {
        posterSrc?: string;
        posterAlt: string;
        videoUrl?: string;
        embedUrl?: string;
    };
    quote: string;
    author: TestimonialAuthor;
    badge?: string;
    className?: string;
}

/**
 * TestimonialVideoBlock — Customer story with video.
 *
 * - 12-col grid: video on the left (col-span-7), quote + author on the right.
 * - Reuses VideoShowcase for the player (poster, ripple play button, fallback).
 * - Subtle fade-in on view, respects `prefers-reduced-motion`.
 */
export default function TestimonialVideoBlock({
    eyebrow,
    video,
    quote,
    author,
    badge,
    className,
}: TestimonialVideoBlockProps) {
    const prefersReducedMotion = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    // Server-visible-first mount gate — see ScrollReveal.tsx for rationale.
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);
    const canAnimate = mounted && !prefersReducedMotion;

    return (
        <section
            ref={ref}
            className={cn(
                "relative bg-cream-50 py-10 md:py-14 lg:py-16",
                className,
            )}
        >
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid items-center gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-12">
                    {/* Video */}
                    <motion.div
                        initial={canAnimate ? { opacity: 0, y: 24 } : false}
                        animate={
                            canAnimate && inView
                                ? { opacity: 1, y: 0 }
                                : undefined
                        }
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="relative lg:col-span-7"
                    >
                        <div className="relative">
                            {badge && (
                                <div className="pointer-events-none absolute left-4 top-4 z-20">
                                    <span className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-premium">
                                        {badge}
                                    </span>
                                </div>
                            )}
                            <VideoShowcase
                                posterSrc={video.posterSrc}
                                posterAlt={video.posterAlt}
                                videoUrl={video.videoUrl}
                                embedUrl={video.embedUrl}
                                title=""
                                className="[&>div:last-child]:hidden"
                            />
                        </div>
                    </motion.div>

                    {/* Quote + author */}
                    <motion.div
                        initial={canAnimate ? { opacity: 0, y: 24 } : false}
                        animate={
                            canAnimate && inView
                                ? { opacity: 1, y: 0 }
                                : undefined
                        }
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
                        className="relative lg:col-span-5"
                    >
                        {eyebrow && (
                            <span className="inline-block rounded-full bg-primary-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-800">
                                {eyebrow}
                            </span>
                        )}

                        <Quote
                            aria-hidden="true"
                            className={cn(
                                "mt-3 sm:mt-4 h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 text-primary/30",
                                "[stroke-width:1.5]",
                            )}
                        />

                        <blockquote
                            className={cn(
                                "mt-2 font-display text-lg sm:text-xl md:text-2xl leading-[1.25] text-slate-900 text-balance",
                            )}
                        >
                            {quote}
                        </blockquote>

                        {/* Author card */}
                        <div className="mt-5 sm:mt-6 flex items-center gap-3 sm:gap-4 rounded-2xl bg-white p-3 sm:p-4 shadow-premium ring-1 ring-slate-100">
                            <div
                                className={cn(
                                    "relative h-12 w-12 sm:h-14 sm:w-14 shrink-0 overflow-hidden rounded-full",
                                    "ring-2 ring-white shadow-premium",
                                )}
                            >
                                {author.avatarSrc ? (
                                    <Image
                                        src={author.avatarSrc}
                                        alt={author.name}
                                        fill
                                        sizes="56px"
                                        className="object-cover"
                                    />
                                ) : (
                                    <div
                                        aria-hidden="true"
                                        className="flex h-full w-full items-center justify-center bg-brand-gradient text-base font-bold uppercase text-white"
                                    >
                                        {author.name
                                            .split(" ")
                                            .map((part) => part[0])
                                            .filter(Boolean)
                                            .slice(0, 2)
                                            .join("")}
                                    </div>
                                )}
                            </div>

                            <div className="min-w-0">
                                <p className="font-display text-sm md:text-base font-bold text-slate-900">
                                    {author.name}
                                </p>
                                <p className="text-xs md:text-sm text-slate-600">
                                    {author.role}
                                    {author.restaurantName && (
                                        <>
                                            <span className="mx-1.5 text-slate-300">
                                                •
                                            </span>
                                            <span className="font-medium text-primary">
                                                {author.restaurantName}
                                            </span>
                                        </>
                                    )}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
