"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Play } from "lucide-react";
import { cn } from "@/lib/cn";

export interface VideoShowcaseProps {
    posterSrc?: string;
    posterAlt?: string;
    videoUrl?: string;
    embedUrl?: string;
    title: string;
    description?: string;
    /** Small uppercase eyebrow shown above the player. */
    caption?: string;
    className?: string;
}

/**
 * Premium hero-style video player with poster, ripple play button, and a
 * separate title/description card.
 *
 * - Aspect-video, rounded-3xl, shadow-glow.
 * - Renders next/image as poster with a brand-gradient fallback when
 *   `posterSrc` is omitted.
 * - On play, swaps in <video> if `videoUrl`, else <iframe> if `embedUrl`,
 *   else displays a small "Vidéo bientôt disponible" toast.
 * - Respects `prefers-reduced-motion` — no expanding ripple ring.
 */
export default function VideoShowcase({
    posterSrc,
    posterAlt = "",
    videoUrl,
    embedUrl,
    title,
    description,
    caption,
    className,
}: VideoShowcaseProps) {
    const prefersReducedMotion = useReducedMotion();
    const [playing, setPlaying] = useState(false);
    const [toast, setToast] = useState<string | null>(null);
    const canPlay = Boolean(videoUrl || embedUrl);

    useEffect(() => {
        if (!toast) return;
        const t = window.setTimeout(() => setToast(null), 2400);
        return () => window.clearTimeout(t);
    }, [toast]);

    const handlePlay = () => {
        if (!canPlay) {
            setToast("Vidéo bientôt disponible");
            return;
        }
        setPlaying(true);
    };

    return (
        <div className={cn("w-full max-w-5xl mx-auto", className)}>
            {caption && (
                <p className="mb-3 text-center text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                    {caption}
                </p>
            )}

            <div
                className={cn(
                    "relative aspect-video w-full overflow-hidden rounded-2xl sm:rounded-3xl",
                    "ring-1 ring-white/10 shadow-glow bg-secondary",
                )}
            >
                {playing && videoUrl ? (
                    // eslint-disable-next-line jsx-a11y/media-has-caption
                    <video
                        src={videoUrl}
                        poster={posterSrc}
                        controls
                        autoPlay
                        playsInline
                        preload="metadata"
                        className="h-full w-full object-cover"
                    />
                ) : playing && embedUrl ? (
                    <iframe
                        src={embedUrl}
                        title={title}
                        allow="autoplay; encrypted-media; fullscreen"
                        allowFullScreen
                        className="h-full w-full border-0"
                    />
                ) : (
                    <>
                        {posterSrc ? (
                            <Image
                                src={posterSrc}
                                alt={posterAlt}
                                fill
                                sizes="(min-width: 1024px) 960px, 100vw"
                                className="object-cover"
                                priority={false}
                            />
                        ) : (
                            <div
                                aria-hidden="true"
                                className="absolute inset-0"
                                style={{
                                    backgroundImage:
                                        "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.10) 0%, transparent 55%), linear-gradient(135deg, #016B61 0%, #014038 100%)",
                                }}
                            />
                        )}

                        {/* Cinematic dark scrim */}
                        <div
                            aria-hidden="true"
                            className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/25 to-black/55"
                        />

                        {/* Play button */}
                        <button
                            type="button"
                            onClick={handlePlay}
                            aria-label={canPlay ? "Lire la vidéo" : "Vidéo bientôt disponible"}
                            className="group absolute inset-0 flex cursor-pointer items-center justify-center focus:outline-none"
                        >
                            <span className="relative inline-flex h-14 w-14 sm:h-20 sm:w-20 md:h-24 md:w-24 items-center justify-center">
                                {/* Ripple rings */}
                                {!prefersReducedMotion && (
                                    <>
                                        <motion.span
                                            aria-hidden="true"
                                            initial={{ opacity: 0.55, scale: 1 }}
                                            animate={{ opacity: 0, scale: 1.8 }}
                                            transition={{
                                                duration: 2.4,
                                                ease: "easeOut",
                                                repeat: Infinity,
                                            }}
                                            className="absolute inset-0 rounded-full ring-2 ring-white/70"
                                        />
                                        <motion.span
                                            aria-hidden="true"
                                            initial={{ opacity: 0.4, scale: 1 }}
                                            animate={{ opacity: 0, scale: 2.2 }}
                                            transition={{
                                                duration: 2.4,
                                                ease: "easeOut",
                                                repeat: Infinity,
                                                delay: 0.8,
                                            }}
                                            className="absolute inset-0 rounded-full ring-2 ring-white/50"
                                        />
                                    </>
                                )}
                                <span
                                    className={cn(
                                        "relative inline-flex h-full w-full items-center justify-center rounded-full",
                                        "bg-white/95 text-primary shadow-2xl",
                                        "transition-transform duration-300 group-hover:scale-105",
                                    )}
                                >
                                    <Play
                                        className="ml-1 h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10"
                                        fill="currentColor"
                                    />
                                </span>
                            </span>
                        </button>

                        {/* Toast */}
                        {toast && (
                            <div
                                role="status"
                                aria-live="polite"
                                className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-black/80 px-4 py-2 text-xs font-medium text-white shadow-premium backdrop-blur"
                            >
                                {toast}
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Title + description card */}
            <div className="mx-auto mt-5 sm:mt-6 max-w-3xl rounded-2xl bg-white p-4 sm:p-5 md:p-6 shadow-premium ring-1 ring-slate-100">
                <h3 className="font-display text-base sm:text-lg md:text-xl font-semibold text-slate-900 text-balance leading-[1.2]">
                    {title}
                </h3>
                {description && (
                    <p className="mt-2 text-sm sm:text-base text-slate-600 text-pretty">
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
}
