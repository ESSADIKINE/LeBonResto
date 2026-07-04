'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/cn';

/**
 * General contact form.
 *
 * NOTE: This schema mirrors the server-side zod schema in
 * /app/api/leads/contact/route.ts. Keep field names in sync.
 */
const phoneRegex = /^[+0][\d\s().-]{6,}$/;

const subjectValues = [
    'Question commerciale',
    'Onboarding restaurateur',
    'Investisseur',
    'Partenariat',
    'Support technique',
    'Presse',
    'Autre',
] as const;

const contactSchema = z.object({
    full_name: z
        .string()
        .min(2, 'Veuillez saisir votre nom complet.')
        .max(160),
    email: z
        .string()
        .min(1, 'Veuillez saisir votre email.')
        .email('Adresse email invalide.'),
    phone: z
        .string()
        .optional()
        .or(z.literal(''))
        .refine(
            (v) => !v || phoneRegex.test(v.replace(/\s+/g, '')),
            'Numéro de téléphone invalide.',
        ),
    subject: z.enum(subjectValues, {
        required_error: 'Veuillez choisir un sujet.',
    }),
    message: z
        .string()
        .min(1, 'Veuillez écrire un message.')
        .max(1000, 'Message limité à 1000 caractères.'),
    website: z.string().max(0).optional().or(z.literal('')), // honeypot
    consent: z.literal(true, {
        errorMap: () => ({ message: 'Votre accord est requis pour continuer.' }),
    }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

type SubmitState =
    | { status: 'idle' }
    | { status: 'submitting' }
    | { status: 'success' }
    | { status: 'error'; message: string };

const REQ = <span className="ml-0.5 text-primary">*</span>;

export default function ContactForm() {
    const [submitState, setSubmitState] = useState<SubmitState>({ status: 'idle' });

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
        mode: 'onBlur',
        defaultValues: {
            full_name: '',
            email: '',
            phone: '',
            message: '',
            website: '',
        },
    });

    const messageValue = watch('message') ?? '';

    const onSubmit = async (values: ContactFormValues) => {
        setSubmitState({ status: 'submitting' });
        try {
            const payload = {
                ...values,
                phone: values.phone ? values.phone.replace(/\s+/g, '') : '',
            };
            const res = await fetch('/api/leads/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const data = (await res.json().catch(() => ({}))) as {
                ok?: boolean;
                error?: string;
            };
            if (!res.ok || !data.ok) {
                throw new Error(
                    data?.error ||
                        'Une erreur est survenue lors de l’envoi. Veuillez réessayer.',
                );
            }
            setSubmitState({ status: 'success' });
            reset();
            try {
                window.lbrTrack?.('LeadSubmitted', { type: 'contact' });
            } catch {
                /* analytics must never break the flow */
            }
        } catch (err) {
            setSubmitState({
                status: 'error',
                message:
                    err instanceof Error
                        ? err.message
                        : 'Une erreur est survenue. Veuillez réessayer.',
            });
        }
    };

    if (submitState.status === 'success') {
        return (
            <div
                role="status"
                aria-live="polite"
                aria-atomic="true"
                className="rounded-2xl bg-primary text-white shadow-premium ring-1 ring-primary-700 p-5 sm:p-6 md:p-8 text-center"
            >
                <CheckCircle2
                    className="mx-auto h-12 w-12 text-cream-100"
                    aria-hidden="true"
                />
                <h3 className="mt-4 font-display text-xl sm:text-2xl md:text-3xl font-semibold">
                    Message bien reçu
                </h3>
                <p className="mt-3 text-white/90 max-w-md mx-auto text-sm sm:text-base">
                    Merci pour votre message. L’équipe LeBonResto vous répond
                    sous 24 heures ouvrées.
                </p>
                <Link
                    href="/"
                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/40 hover:border-white text-white h-11 md:h-12 px-5 sm:px-6 md:px-8 font-medium text-sm sm:text-base transition"
                >
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    Retour à l’accueil
                </Link>
            </div>
        );
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="rounded-2xl bg-white shadow-premium ring-1 ring-slate-100 p-4 sm:p-5 md:p-6 lg:p-8 space-y-4 sm:space-y-5"
        >
            {submitState.status === 'error' && (
                <div
                    role="alert"
                    className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 text-red-800 p-4"
                >
                    <AlertCircle
                        className="h-5 w-5 mt-0.5 flex-shrink-0"
                        aria-hidden="true"
                    />
                    <div className="flex-1">
                        <p className="font-medium">Envoi impossible</p>
                        <p className="text-sm">{submitState.message}</p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setSubmitState({ status: 'idle' })}
                        className="text-sm font-semibold underline hover:no-underline"
                    >
                        Réessayer
                    </button>
                </div>
            )}

            {/* Honeypot */}
            <div className="sr-only" aria-hidden="true">
                <label htmlFor="contact_website">Website</label>
                <input
                    id="contact_website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    {...register('website')}
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <Field
                    label="Nom complet"
                    required
                    htmlFor="contact_full_name"
                    error={errors.full_name?.message}
                >
                    <input
                        id="contact_full_name"
                        type="text"
                        autoComplete="name"
                        {...register('full_name')}
                        className={inputClass(!!errors.full_name)}
                    />
                </Field>

                <Field
                    label="Email"
                    required
                    htmlFor="contact_email"
                    error={errors.email?.message}
                >
                    <input
                        id="contact_email"
                        type="email"
                        autoComplete="email"
                        {...register('email')}
                        className={inputClass(!!errors.email)}
                    />
                </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <Field
                    label="Téléphone"
                    htmlFor="contact_phone"
                    error={errors.phone?.message}
                    hint="Optionnel"
                >
                    <input
                        id="contact_phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="+212 6 12 34 56 78"
                        {...register('phone')}
                        className={inputClass(!!errors.phone)}
                    />
                </Field>

                <Field
                    label="Sujet"
                    required
                    htmlFor="contact_subject"
                    error={errors.subject?.message}
                >
                    <select
                        id="contact_subject"
                        {...register('subject')}
                        className={inputClass(!!errors.subject)}
                        defaultValue=""
                    >
                        <option value="" disabled>
                            Sélectionnez un sujet…
                        </option>
                        {subjectValues.map((s) => (
                            <option key={s} value={s}>
                                {s}
                            </option>
                        ))}
                    </select>
                </Field>
            </div>

            <Field
                label="Message"
                required
                htmlFor="contact_message"
                error={errors.message?.message}
            >
                <textarea
                    id="contact_message"
                    rows={6}
                    maxLength={1000}
                    placeholder="Décrivez votre demande en quelques mots…"
                    {...register('message')}
                    className={cn(inputClass(!!errors.message), 'resize-y')}
                />
                <div className="mt-1 flex justify-end text-xs text-slate-500">
                    {messageValue.length}/1000
                </div>
            </Field>

            <div className="space-y-2">
                <label className="flex items-start gap-3 text-sm text-slate-700">
                    <input
                        type="checkbox"
                        {...register('consent')}
                        className="mt-1 h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary/40"
                    />
                    <span>
                        J’accepte que LeBonResto utilise mes informations pour
                        répondre à ma demande, conformément à la politique de
                        confidentialité.
                        {REQ}
                    </span>
                </label>
                {errors.consent?.message && (
                    <p className="text-sm text-red-600">
                        {errors.consent.message}
                    </p>
                )}
            </div>

            <button
                type="submit"
                disabled={isSubmitting || submitState.status === 'submitting'}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-primary text-white h-11 md:h-12 px-5 sm:px-6 md:px-8 font-medium text-sm sm:text-base shadow-sm hover:bg-primary-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
                {(isSubmitting || submitState.status === 'submitting') && (
                    <Loader2
                        className="h-4 w-4 animate-spin"
                        aria-hidden="true"
                    />
                )}
                {isSubmitting || submitState.status === 'submitting'
                    ? 'Envoi en cours…'
                    : 'Envoyer le message'}
            </button>
        </form>
    );
}

// ---------- small internal helpers ----------

function inputClass(hasError: boolean) {
    return cn(
        'block w-full min-h-11 rounded-xl border px-4 py-2.5 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition',
        hasError
            ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
            : 'border-slate-300',
    );
}

interface FieldProps {
    label: string;
    htmlFor: string;
    error?: string;
    required?: boolean;
    hint?: string;
    children: React.ReactNode;
}

function Field({ label, htmlFor, error, required, hint, children }: FieldProps) {
    return (
        <div>
            <label
                htmlFor={htmlFor}
                className="block text-sm font-medium text-slate-700 mb-1.5"
            >
                {label}
                {required && REQ}
            </label>
            {children}
            {hint && !error && (
                <p className="mt-1 text-xs text-slate-500">{hint}</p>
            )}
            {error && (
                <p className="mt-1 text-sm text-red-600" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
}
