'use client';

import { useRef } from 'react';
import * as LucideIcons from 'lucide-react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { cn } from '@/lib/cn';

export interface FeatureGridItem {
    title: string;
    description?: string;
    icon?: string;
    image?: string;
}

export interface FeatureGridProps {
    items: FeatureGridItem[];
    columns?: 2 | 3 | 4;
    variant?: 'card' | 'plain';
    className?: string;
}

const columnsClassMap: Record<2 | 3 | 4, string> = {
    2: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
};

function resolveIcon(name?: string): React.ComponentType<{ size?: number; className?: string }> {
    const fallback = (LucideIcons as unknown as Record<string, React.ComponentType<{ size?: number; className?: string }>>)
        .Sparkles;
    if (!name) return fallback;
    const lookup = (LucideIcons as unknown as Record<string, React.ComponentType<{ size?: number; className?: string }>>);
    return lookup[name] ?? fallback;
}

interface SheenCardInnerProps {
    item: FeatureGridItem;
    Icon: React.ComponentType<{ size?: number; className?: string }>;
}

function SheenCard({ item, Icon }: SheenCardInnerProps) {
    const cardRef = useRef<HTMLDivElement | null>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const el = cardRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        el.style.setProperty('--sheen-x', `${x}px`);
        el.style.setProperty('--sheen-y', `${y}px`);
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            className="feature-sheen-card relative overflow-hidden rounded-2xl bg-white shadow-premium ring-1 ring-slate-100 p-4 sm:p-5 md:p-6 transition duration-300 hover:-translate-y-1 hover:shadow-glow"
            style={
                {
                    // Default cursor position in the centre (also used by the
                    // reduced-motion fallback via the @media query below).
                    ['--sheen-x' as string]: '50%',
                    ['--sheen-y' as string]: '50%',
                } as React.CSSProperties
            }
        >
            {/* Cursor-following sheen overlay. The radial gradient is masked
                so that only a ~200px halo around the cursor lights up. */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                    backgroundImage:
                        'radial-gradient(circle 220px at var(--sheen-x) var(--sheen-y), rgba(1,107,97,0.18), transparent 70%)',
                    WebkitMaskImage:
                        'radial-gradient(circle 220px at var(--sheen-x) var(--sheen-y), white, transparent 70%)',
                    maskImage:
                        'radial-gradient(circle 220px at var(--sheen-x) var(--sheen-y), white, transparent 70%)',
                }}
            />

            <div className="relative">
                {item.image && (
                    <div className="relative mb-4 sm:mb-5 overflow-hidden rounded-xl aspect-video bg-brand-gradient">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={item.image}
                            alt={item.title}
                            loading="lazy"
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            onError={(e) => {
                                (e.currentTarget as HTMLImageElement).style.display = 'none';
                            }}
                        />
                    </div>
                )}
                <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-cream-100 mb-3 sm:mb-4">
                    <Icon size={22} className="text-primary" />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-slate-900 font-display leading-snug">
                    {item.title}
                </h3>
                {item.description && (
                    <p className="mt-2 text-sm leading-relaxed text-slate-600 text-pretty">
                        {item.description}
                    </p>
                )}
            </div>

            {/* When reduced motion is on, reset the cursor vars to centre so
                no cursor-tracking effect kicks in. */}
            <style jsx>{`
                @media (prefers-reduced-motion: reduce) {
                    .feature-sheen-card {
                        --sheen-x: 50% !important;
                        --sheen-y: 50% !important;
                    }
                }
            `}</style>
        </div>
    );
}

export default function FeatureGrid({
    items,
    columns = 3,
    variant = 'card',
    className,
}: FeatureGridProps) {
    const reduceMotion = useReducedMotion();

    const parentVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: reduceMotion ? 0 : 0.08,
            },
        },
    };

    const childVariants: Variants = {
        hidden: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: reduceMotion ? 0 : 0.5, ease: 'easeOut' },
        },
    };

    return (
        <motion.div
            className={cn('grid gap-4 sm:gap-5 md:gap-6', columnsClassMap[columns], className)}
            variants={parentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
        >
            {items.map((item, index) => {
                const Icon = resolveIcon(item.icon);
                const isCard = variant === 'card';

                return (
                    <motion.div
                        key={`${item.title}-${index}`}
                        variants={childVariants}
                        className={cn('group', isCard ? '' : 'flex items-start gap-4')}
                    >
                        {isCard ? (
                            <SheenCard item={item} Icon={Icon} />
                        ) : (
                            <>
                                <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-cream-100">
                                    <Icon size={22} className="text-primary" />
                                </div>
                                <div className="min-w-0">
                                    <h3 className="text-base sm:text-lg font-semibold text-slate-900 font-display">
                                        {item.title}
                                    </h3>
                                    {item.description && (
                                        <p className="mt-1 text-sm leading-relaxed text-slate-600 text-pretty">
                                            {item.description}
                                        </p>
                                    )}
                                </div>
                            </>
                        )}
                    </motion.div>
                );
            })}
        </motion.div>
    );
}
