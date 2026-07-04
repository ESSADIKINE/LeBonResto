'use client';

import { useEffect, useState } from 'react';
import {
    motion,
    useInView,
    useMotionValue,
    useReducedMotion,
    useTransform,
    animate,
    type Variants,
} from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/cn';

export interface MetricItem {
    label: string;
    value: number;
    suffix?: string;
    hint?: string;
}

export interface MetricCardsProps {
    metrics: MetricItem[];
    variant?: 'teal' | 'soft';
    className?: string;
}

interface AnimatedNumberProps {
    target: number;
    inView: boolean;
    reduceMotion: boolean;
}

function AnimatedNumber({ target, inView, reduceMotion }: AnimatedNumberProps) {
    const motionValue = useMotionValue(reduceMotion ? target : 0);
    const rounded = useTransform(motionValue, (latest) => Math.round(latest).toLocaleString('fr-FR'));
    const [display, setDisplay] = useState<string>(() =>
        Math.round(reduceMotion ? target : 0).toLocaleString('fr-FR'),
    );

    useEffect(() => {
        if (reduceMotion) {
            setDisplay(Math.round(target).toLocaleString('fr-FR'));
            motionValue.set(target);
            return;
        }
        if (!inView) return;
        const controls = animate(motionValue, target, {
            duration: 1.8,
            ease: 'easeOut',
        });
        const unsubscribe = rounded.on('change', (latest) => setDisplay(String(latest)));
        return () => {
            controls.stop();
            unsubscribe();
        };
    }, [inView, target, reduceMotion, motionValue, rounded]);

    return <span>{display}</span>;
}

export default function MetricCards({
    metrics,
    variant = 'teal',
    className,
}: MetricCardsProps) {
    const reduceMotion = useReducedMotion() ?? false;
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

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
            transition: { duration: reduceMotion ? 0 : 0.5, ease: 'easeOut' },
        },
    };

    const isTeal = variant === 'teal';

    return (
        <motion.div
            ref={ref}
            className={cn(
                'grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-4',
                className,
            )}
            variants={parentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
        >
            {metrics.map((metric, index) => (
                <motion.div
                    key={`${metric.label}-${index}`}
                    variants={childVariants}
                    className={cn(
                        'rounded-2xl p-4 sm:p-5 md:p-6 shadow-premium transition-transform duration-300 hover:-translate-y-1',
                        isTeal
                            ? 'bg-primary text-white'
                            : 'bg-cream-50 text-slate-900 border border-cream-200',
                    )}
                >
                    <div
                        className={cn(
                            'text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-display tracking-tight leading-none',
                            isTeal ? 'text-white' : 'text-primary',
                        )}
                    >
                        <AnimatedNumber
                            target={metric.value}
                            inView={inView}
                            reduceMotion={reduceMotion}
                        />
                        {metric.suffix && (
                            <span className="ml-0.5">{metric.suffix}</span>
                        )}
                    </div>
                    <div
                        className={cn(
                            'mt-2 sm:mt-3 text-xs sm:text-sm font-semibold uppercase tracking-wide',
                            isTeal ? 'text-cream-100' : 'text-slate-700',
                        )}
                    >
                        {metric.label}
                    </div>
                    {metric.hint && (
                        <div
                            className={cn(
                                'mt-1.5 sm:mt-2 text-xs leading-relaxed',
                                isTeal ? 'text-cream-200/90' : 'text-slate-500',
                            )}
                        >
                            {metric.hint}
                        </div>
                    )}
                </motion.div>
            ))}
        </motion.div>
    );
}
