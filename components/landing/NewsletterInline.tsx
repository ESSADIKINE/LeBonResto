'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, useReducedMotion } from 'framer-motion';
import { Loader2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/cn';

/**
 * Compact email-only newsletter form for footer / blog cards.
 *
 * Posts to /api/leads/contact with subject="Newsletter" — the route
 * detects the newsletter payload shape and accepts the lightweight schema.
 */

const newsletterSchema = z.object({
    email: z
        .string()
        .min(1, 'Veuillez saisir votre email.')
        .email('Adresse email invalide.'),
    website: z.string().max(0).optional().or(z.literal('')),
});

type NewsletterFormValues = z.infer<typeof newsletterSchema>;

type SubmitState =
    | { status: 'idle' }
    | { status: 'submitting' }
    | { status: 'success' }
    | { status: 'error'; message: string };

export interface NewsletterInlineProps {
    variant?: 'default' | 'dark';
    placeholder?: string;
    ctaLabel?: string;
    className?: string;
}

export default function NewsletterInline({
    variant = 'default',
    placeholder = 'votre@email.com',
    ctaLabel = 'S’inscrire',
    className,
}: NewsletterInlineProps) {
    const prefersReducedMotion = useReducedMotion();
    const [submitState, setSubmitState] = useState<SubmitState>({
        status: 'idle',
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<NewsletterFormValues>({
        resolver: zodResolver(newsletterSchema),
        mode: 'onSubmit',
        defaultValues: { email: '', website: '' },
    });

    const onSubmit = async (values: NewsletterFormValues) => {
        setSubmitState({ status: 'submitting' });
        try {
            const res = await fetch('/api/leads/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: values.email,
                    subject: 'Newsletter',
                    website: values.website ?? '',
                }),
            });
            const data = (await res.json().catch(() => ({}))) as {
                ok?: boolean;
                error?: string;
            };
            if (!res.ok || !data.ok) {
                throw new Error(
                    data?.error ||
                        'Inscription impossible. Veuillez réessayer.',
                );
            }
            setSubmitState({ status: 'success' });
            reset();
        } catch (err) {
            setSubmitState({
                status: 'error',
                message:
                    err instanceof Error
                        ? err.message
                        : 'Inscription impossible. Veuillez réessayer.',
            });
        }
    };

    const isDark = variant === 'dark';
    const isBusy = isSubmitting || submitState.status === 'submitting';

    return (
        <div className={cn('w-full', className)}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className={cn(
                    'flex flex-col gap-2 sm:flex-row sm:gap-2 items-stretch',
                )}
            >
                {/* Honeypot */}
                <div className="sr-only" aria-hidden="true">
                    <label htmlFor="newsletter_website">Website</label>
                    <input
                        id="newsletter_website"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        {...register('website')}
                    />
                </div>

                <label htmlFor="newsletter_email" className="sr-only">
                    Email
                </label>
                <input
                    id="newsletter_email"
                    type="email"
                    autoComplete="email"
                    placeholder={placeholder}
                    {...register('email')}
                    className={cn(
                        'w-full sm:flex-1 min-w-0 h-11 rounded-full px-4 leading-none text-sm sm:text-base focus:outline-none focus:ring-2 transition',
                        isDark
                            ? 'bg-white/10 text-white placeholder:text-white/60 border border-white/20 focus:ring-cream-200/40 focus:border-cream-100'
                            : 'bg-white text-slate-900 placeholder:text-slate-400 border border-slate-300 focus:ring-primary/40 focus:border-primary',
                        errors.email && 'border-red-400',
                    )}
                    aria-invalid={!!errors.email}
                />

                <button
                    type="submit"
                    disabled={isBusy}
                    className={cn(
                        'w-full sm:w-auto h-11 inline-flex items-center justify-center gap-2 rounded-full px-5 sm:px-6 text-sm sm:text-base font-medium shadow-sm transition disabled:opacity-60 disabled:cursor-not-allowed',
                        isDark
                            ? 'bg-cream-100 text-secondary-900 hover:bg-white'
                            : 'bg-primary text-white hover:bg-primary-700',
                    )}
                >
                    {isBusy ? (
                        <Loader2
                            className="h-4 w-4 animate-spin"
                            aria-hidden="true"
                        />
                    ) : (
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    )}
                    <span>{isBusy ? 'Envoi…' : ctaLabel}</span>
                </button>
            </form>

            <div className="min-h-[1.5rem] mt-2 text-xs">
                {errors.email && (
                    <p
                        className={cn(
                            'text-red-500',
                            isDark && 'text-red-300',
                        )}
                        role="alert"
                    >
                        {errors.email.message}
                    </p>
                )}
                {submitState.status === 'error' && !errors.email && (
                    <p
                        className={cn(
                            'text-red-500',
                            isDark && 'text-red-300',
                        )}
                        role="alert"
                    >
                        {submitState.message}
                    </p>
                )}
                {submitState.status === 'success' && (
                    <motion.p
                        initial={
                            prefersReducedMotion
                                ? false
                                : { opacity: 0, y: 4 }
                        }
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                        className={cn(
                            'inline-flex items-center gap-1.5 font-medium',
                            isDark ? 'text-cream-100' : 'text-primary',
                        )}
                    >
                        <CheckCircle2
                            className="h-3.5 w-3.5"
                            aria-hidden="true"
                        />
                        Inscription confirmée
                    </motion.p>
                )}
            </div>
        </div>
    );
}
