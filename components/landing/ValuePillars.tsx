'use client';

import * as LucideIcons from 'lucide-react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { cn } from '@/lib/cn';

export interface ValuePillarItem {
    title: string;
    description: string;
    icon: string;
}

export interface ValuePillarsProps {
    values: ValuePillarItem[];
    layout?: 'horizontal' | 'vertical';
    className?: string;
}

function resolveIcon(name: string): React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }> {
    const lookup = LucideIcons as unknown as Record<
        string,
        React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>
    >;
    return lookup[name] ?? lookup.Sparkles;
}

export default function ValuePillars({
    values,
    layout = 'horizontal',
    className,
}: ValuePillarsProps) {
    const reduceMotion = useReducedMotion();

    const parentVariants: Variants = {
        hidden: {},
        visible: {
            transition: { staggerChildren: reduceMotion ? 0 : 0.1 },
        },
    };

    const childVariants: Variants = {
        hidden: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: reduceMotion ? 0 : 0.55, ease: 'easeOut' },
        },
    };

    const isHorizontal = layout === 'horizontal';

    return (
        <motion.div
            className={cn(
                'grid gap-6 sm:gap-8',
                isHorizontal
                    ? values.length >= 5
                        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-5'
                        : values.length === 4
                            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
                            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                    : 'grid-cols-1 max-w-3xl mx-auto',
                className,
            )}
            variants={parentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
        >
            {values.map((value, index) => {
                const Icon = resolveIcon(value.icon);
                return (
                    <motion.div
                        key={`${value.title}-${index}`}
                        variants={childVariants}
                        className={cn(
                            'group',
                            isHorizontal
                                ? 'flex flex-col items-start'
                                : 'flex items-start gap-5',
                        )}
                    >
                        <div
                            className={cn(
                                'flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl bg-cream-100 transition-colors duration-300 group-hover:bg-cream-200',
                                isHorizontal ? 'mb-4 sm:mb-5' : 'mt-1',
                            )}
                        >
                            <Icon size={24} strokeWidth={1.5} className="text-primary" />
                        </div>
                        <div className="min-w-0">
                            <h3 className="text-base sm:text-lg font-semibold text-slate-900 font-display">
                                {value.title}
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-slate-600 text-pretty">
                                {value.description}
                            </p>
                        </div>
                    </motion.div>
                );
            })}
        </motion.div>
    );
}
