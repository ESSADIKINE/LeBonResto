'use client';

import * as LucideIcons from 'lucide-react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { cn } from '@/lib/cn';

export interface RevenueStream {
    title: string;
    description: string;
    share: number;
    icon: string;
}

export interface BusinessModelGridProps {
    streams: RevenueStream[];
    className?: string;
}

function resolveIcon(name: string): React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }> {
    const lookup = LucideIcons as unknown as Record<
        string,
        React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>
    >;
    return lookup[name] ?? lookup.Sparkles;
}

// Curated teal/cream-anchored palette for stacked total bar
const SEGMENT_COLORS = [
    'bg-primary',
    'bg-primary-600',
    'bg-primary-400',
    'bg-cream-300',
    'bg-primary-300',
    'bg-cream-400',
    'bg-primary-700',
    'bg-cream-200',
];

export default function BusinessModelGrid({ streams, className }: BusinessModelGridProps) {
    const reduceMotion = useReducedMotion();
    const total = streams.reduce((sum, s) => sum + s.share, 0);

    const parentVariants: Variants = {
        hidden: {},
        visible: {
            transition: { staggerChildren: reduceMotion ? 0 : 0.08 },
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
        <div className={cn('space-y-8 sm:space-y-10', className)}>
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
                variants={parentVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
            >
                {streams.map((stream, index) => {
                    const Icon = resolveIcon(stream.icon);
                    return (
                        <motion.div
                            key={`${stream.title}-${index}`}
                            variants={childVariants}
                            className="rounded-2xl bg-white shadow-premium ring-1 ring-slate-100 p-4 sm:p-5 md:p-6 hover:-translate-y-1 transition duration-300"
                        >
                            <div className="flex items-center gap-3 sm:gap-4">
                                <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-cream-100">
                                    <Icon size={22} strokeWidth={1.75} className="text-primary" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h3 className="text-sm sm:text-base font-semibold text-slate-900 font-display truncate">
                                        {stream.title}
                                    </h3>
                                </div>
                                <div className="text-right">
                                    <div className="text-xl sm:text-2xl font-bold text-primary font-display leading-none">
                                        {stream.share}
                                        <span className="text-sm sm:text-base font-semibold text-primary-700">%</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-3 sm:mt-4">
                                <div
                                    className="relative h-2.5 w-full overflow-hidden rounded-full bg-cream-100"
                                    role="progressbar"
                                    aria-valuenow={stream.share}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                    aria-label={`Part de ${stream.title}`}
                                >
                                    <motion.div
                                        className="h-full rounded-full bg-primary"
                                        initial={{ width: reduceMotion ? `${stream.share}%` : 0 }}
                                        whileInView={{ width: `${stream.share}%` }}
                                        viewport={{ once: true, margin: '-80px' }}
                                        transition={{
                                            duration: reduceMotion ? 0 : 1.1,
                                            ease: 'easeOut',
                                            delay: reduceMotion ? 0 : 0.1 + index * 0.06,
                                        }}
                                    />
                                </div>
                            </div>

                            <p className="mt-3 sm:mt-4 text-sm leading-relaxed text-slate-600 text-pretty">
                                {stream.description}
                            </p>
                        </motion.div>
                    );
                })}
            </motion.div>

            {/* Total mix visualization */}
            <motion.div
                initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: reduceMotion ? 0 : 0.6, ease: 'easeOut' }}
                className="rounded-2xl bg-cream-50 border border-cream-200 p-4 sm:p-5 md:p-6"
            >
                <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between gap-1.5 sm:gap-3 mb-3 sm:mb-4">
                    <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-slate-700">
                        Mix de revenus consolidé
                    </h4>
                    <span className="text-xs text-slate-500">
                        Total : {total}%
                    </span>
                </div>

                <div className="flex h-3 sm:h-4 w-full overflow-hidden rounded-full bg-cream-100">
                    {streams.map((stream, index) => (
                        <motion.div
                            key={`stack-${stream.title}-${index}`}
                            className={cn(
                                'h-full first:rounded-l-full last:rounded-r-full',
                                SEGMENT_COLORS[index % SEGMENT_COLORS.length],
                            )}
                            initial={{ width: reduceMotion ? `${stream.share}%` : 0 }}
                            whileInView={{ width: `${stream.share}%` }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{
                                duration: reduceMotion ? 0 : 0.9,
                                ease: 'easeOut',
                                delay: reduceMotion ? 0 : 0.15 + index * 0.06,
                            }}
                            title={`${stream.title} — ${stream.share}%`}
                        />
                    ))}
                </div>

                <ul className="mt-4 sm:mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-5 gap-y-1.5 sm:gap-y-2">
                    {streams.map((stream, index) => (
                        <li
                            key={`legend-${stream.title}-${index}`}
                            className="flex items-center gap-2 text-xs text-slate-700"
                        >
                            <span
                                className={cn(
                                    'inline-block h-2.5 w-2.5 rounded-full',
                                    SEGMENT_COLORS[index % SEGMENT_COLORS.length],
                                )}
                                aria-hidden="true"
                            />
                            <span className="font-medium text-slate-800 truncate">
                                {stream.title}
                            </span>
                            <span className="ml-auto text-slate-500">{stream.share}%</span>
                        </li>
                    ))}
                </ul>
            </motion.div>
        </div>
    );
}
