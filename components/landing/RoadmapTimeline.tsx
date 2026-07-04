'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/cn';

export type RoadmapStatus = 'done' | 'inprogress' | 'next' | 'later';

export interface RoadmapPhase {
    phase: number;
    title: string;
    timeframe: string;
    status: RoadmapStatus;
    bullets: string[];
}

export interface RoadmapTimelineProps {
    phases: RoadmapPhase[];
    orientation?: 'horizontal' | 'vertical';
    className?: string;
}

const STATUS_LABEL: Record<RoadmapStatus, string> = {
    done: 'Livré',
    inprogress: 'En cours',
    next: 'À venir',
    later: 'Plus tard',
};

const STATUS_BADGE: Record<RoadmapStatus, string> = {
    done: 'bg-primary-700 text-white',
    inprogress: 'bg-primary-500 text-white',
    next: 'bg-cream-200 text-slate-800 border border-cream-300',
    later: 'bg-slate-100 text-slate-600 border border-slate-200',
};

interface StatusDotProps {
    status: RoadmapStatus;
    reduceMotion: boolean;
}

function StatusDot({ status, reduceMotion }: StatusDotProps) {
    if (status === 'done') {
        return (
            <span
                className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full bg-primary-700 shadow-glow ring-4 ring-white"
                aria-label="Phase livrée"
            >
                <Check size={14} strokeWidth={3} className="text-white" />
            </span>
        );
    }

    if (status === 'inprogress') {
        return (
            <span
                className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full ring-4 ring-white"
                aria-label="Phase en cours"
            >
                {!reduceMotion && (
                    <motion.span
                        className="absolute inset-0 rounded-full bg-primary-500/40"
                        animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        aria-hidden="true"
                    />
                )}
                <motion.span
                    className="relative h-6 w-6 rounded-full bg-primary-500"
                    animate={
                        reduceMotion
                            ? undefined
                            : { scale: [1, 1.2, 1] }
                    }
                    transition={
                        reduceMotion
                            ? undefined
                            : { duration: 1.6, repeat: Infinity, ease: 'easeInOut' }
                    }
                />
            </span>
        );
    }

    if (status === 'next') {
        return (
            <span
                className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 border-cream-300 bg-white ring-4 ring-white"
                aria-label="Phase à venir"
            >
                <span className="h-2 w-2 rounded-full bg-cream-300" />
            </span>
        );
    }

    return (
        <span
            className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 border-slate-300 bg-white ring-4 ring-white"
            aria-label="Phase plus tard"
        >
            <span className="h-2 w-2 rounded-full bg-slate-300" />
        </span>
    );
}

interface PhaseCardProps {
    phase: RoadmapPhase;
}

function PhaseCard({ phase }: PhaseCardProps) {
    return (
        <div className="rounded-2xl bg-white shadow-premium ring-1 ring-slate-100 p-4 sm:p-5 md:p-6 h-full">
            <div className="flex items-center justify-between gap-2 sm:gap-3 mb-2 sm:mb-3">
                <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-primary">
                    Phase {phase.phase}
                </span>
                <span
                    className={cn(
                        'rounded-full px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] font-semibold uppercase tracking-wide whitespace-nowrap',
                        STATUS_BADGE[phase.status],
                    )}
                >
                    {STATUS_LABEL[phase.status]}
                </span>
            </div>
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-slate-900 font-display leading-snug text-balance">
                {phase.title}
            </h3>
            <p className="mt-1 text-xs font-medium text-slate-500">{phase.timeframe}</p>
            {phase.bullets.length > 0 && (
                <ul className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2">
                    {phase.bullets.map((bullet, i) => (
                        <li
                            key={i}
                            className="flex items-start gap-2 text-sm leading-relaxed text-slate-600 text-pretty"
                        >
                            <span
                                className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                                aria-hidden="true"
                            />
                            <span>{bullet}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default function RoadmapTimeline({
    phases,
    orientation = 'horizontal',
    className,
}: RoadmapTimelineProps) {
    const reduceMotion = useReducedMotion() ?? false;

    const parentVariants: Variants = {
        hidden: {},
        visible: {
            transition: { staggerChildren: reduceMotion ? 0 : 0.1 },
        },
    };

    const childVariants: Variants = {
        hidden: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: reduceMotion ? 0 : 0.55, ease: 'easeOut' },
        },
    };

    const isHorizontal = orientation === 'horizontal';

    if (!isHorizontal) {
        return (
            <motion.ol
                className={cn('relative space-y-8', className)}
                variants={parentVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
            >
                <span
                    className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-primary/40 via-cream-200 to-slate-200"
                    aria-hidden="true"
                />
                {phases.map((phase, index) => (
                    <motion.li
                        key={`${phase.phase}-${index}`}
                        variants={childVariants}
                        className="relative pl-12"
                    >
                        <div className="absolute left-0 top-0">
                            <StatusDot status={phase.status} reduceMotion={reduceMotion} />
                        </div>
                        <PhaseCard phase={phase} />
                    </motion.li>
                ))}
            </motion.ol>
        );
    }

    return (
        <div className={cn(className)}>
            {/* Mobile: vertical stack */}
            <motion.ol
                className="relative space-y-8 md:hidden"
                variants={parentVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
            >
                <span
                    className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-primary/40 via-cream-200 to-slate-200"
                    aria-hidden="true"
                />
                {phases.map((phase, index) => (
                    <motion.li
                        key={`m-${phase.phase}-${index}`}
                        variants={childVariants}
                        className="relative pl-12"
                    >
                        <div className="absolute left-0 top-0">
                            <StatusDot status={phase.status} reduceMotion={reduceMotion} />
                        </div>
                        <PhaseCard phase={phase} />
                    </motion.li>
                ))}
            </motion.ol>

            {/* Desktop: horizontal rail. On md-lg we use a snap-x horizontal scroll
                to avoid squashing 5+ cards under their min content width.
                At xl+ when there are 4 or fewer phases, we let it grid evenly. */}
            <motion.div
                className="hidden md:block"
                variants={parentVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
            >
                {/* Rail with dots */}
                <div className="relative mb-8 lg:mb-10">
                    <span
                        className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-primary/40 via-cream-200 to-slate-200"
                        aria-hidden="true"
                    />
                    <ol
                        className={cn(
                            'relative grid gap-4 lg:gap-6',
                            phases.length <= 4 ? '' : '',
                        )}
                        style={{ gridTemplateColumns: `repeat(${phases.length}, minmax(0, 1fr))` }}
                    >
                        {phases.map((phase, index) => (
                            <li
                                key={`rail-${phase.phase}-${index}`}
                                className="flex flex-col items-center text-center"
                            >
                                <StatusDot status={phase.status} reduceMotion={reduceMotion} />
                                <span className="mt-2 lg:mt-3 text-[11px] lg:text-xs font-semibold uppercase tracking-wider text-primary">
                                    Phase {phase.phase}
                                </span>
                                <span className="mt-0.5 text-[11px] lg:text-xs text-slate-500">
                                    {phase.timeframe}
                                </span>
                            </li>
                        ))}
                    </ol>
                </div>

                {/* Cards below — horizontal snap scroll on md/lg if >4 phases,
                    otherwise grid evenly. */}
                {phases.length > 4 ? (
                    <motion.div
                        className="flex gap-4 lg:gap-6 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 xl:grid xl:overflow-visible xl:pb-0"
                        style={{
                            gridTemplateColumns: `repeat(${phases.length}, minmax(0, 1fr))`,
                        }}
                        variants={parentVariants}
                    >
                        {phases.map((phase, index) => (
                            <motion.div
                                key={`card-${phase.phase}-${index}`}
                                variants={childVariants}
                                className="snap-start shrink-0 w-[280px] sm:w-[320px] xl:w-auto xl:shrink"
                            >
                                <PhaseCard phase={phase} />
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        className="grid gap-4 lg:gap-6"
                        style={{ gridTemplateColumns: `repeat(${phases.length}, minmax(0, 1fr))` }}
                        variants={parentVariants}
                    >
                        {phases.map((phase, index) => (
                            <motion.div
                                key={`card-${phase.phase}-${index}`}
                                variants={childVariants}
                            >
                                <PhaseCard phase={phase} />
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}
