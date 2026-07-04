'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, CheckCircle2, AlertCircle, Mail } from 'lucide-react';
import { cn } from '@/lib/cn';

/**
 * Investor lead capture form.
 *
 * NOTE: This schema mirrors the server-side zod schema in
 * /app/api/leads/investor/route.ts. Keep field names in sync.
 */
const phoneRegex = /^[+0][\d\s().-]{6,}$/;

const investorSchema = z.object({
    full_name: z
        .string()
        .min(2, 'Veuillez saisir votre nom complet.')
        .max(120),
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
    company: z.string().max(160).optional().or(z.literal('')),
    investor_type: z.enum(
        ['angel', 'vc', 'strategic', 'family-office', 'other'],
        { required_error: 'Veuillez sélectionner un type d’investisseur.' },
    ),
    ticket_size: z
        .enum(['lt50k', '50k-250k', '250k-1m', 'gt1m', 'na', ''])
        .optional(),
    location: z.string().max(160).optional().or(z.literal('')),
    message: z
        .string()
        .max(500, 'Message limité à 500 caractères.')
        .optional()
        .or(z.literal('')),
    website: z.string().max(0).optional().or(z.literal('')), // honeypot
    consent: z.literal(true, {
        errorMap: () => ({ message: 'Votre accord est requis pour continuer.' }),
    }),
});

type InvestorFormValues = z.infer<typeof investorSchema>;

type SubmitState =
    | { status: 'idle' }
    | { status: 'submitting' }
    | { status: 'success' }
    | { status: 'error'; message: string };

const investorTypeOptions: { value: InvestorFormValues['investor_type']; label: string }[] = [
    { value: 'angel', label: 'Business Angel' },
    { value: 'vc', label: 'Venture Capital (VC)' },
    { value: 'strategic', label: 'Partenaire stratégique' },
    { value: 'family-office', label: 'Family Office' },
    { value: 'other', label: 'Autre' },
];

const ticketOptions: { value: string; label: string }[] = [
    { value: 'lt50k', label: 'Moins de 50K€' },
    { value: '50k-250k', label: '50K€ – 250K€' },
    { value: '250k-1m', label: '250K€ – 1M€' },
    { value: 'gt1m', label: 'Plus de 1M€' },
    { value: 'na', label: 'Préfère ne pas dire' },
];

const REQ = <span className="ml-0.5 text-primary">*</span>;

export default function InvestorLeadForm() {
    const [submitState, setSubmitState] = useState<SubmitState>({ status: 'idle' });

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<InvestorFormValues>({
        resolver: zodResolver(investorSchema),
        mode: 'onBlur',
        defaultValues: {
            full_name: '',
            email: '',
            phone: '',
            company: '',
            ticket_size: '',
            location: '',
            message: '',
            website: '',
        },
    });

    const messageValue = watch('message') ?? '';

    const onSubmit = async (values: InvestorFormValues) => {
        setSubmitState({ status: 'submitting' });
        try {
            const payload = {
                ...values,
                phone: values.phone ? values.phone.replace(/\s+/g, '') : '',
            };
            const res = await fetch('/api/leads/investor', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
            if (!res.ok || !data.ok) {
                throw new Error(
                    data?.error ||
                        'Une erreur est survenue lors de l’envoi. Veuillez réessayer.',
                );
            }
            setSubmitState({ status: 'success' });
            reset();
            try {
                window.lbrTrack?.('LeadSubmitted', { type: 'investor' });
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
            <div className="rounded-2xl bg-primary text-white shadow-premium ring-1 ring-primary-700 p-5 sm:p-6 md:p-8 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-cream-100" aria-hidden="true" />
                <h3 className="mt-4 font-display text-xl sm:text-2xl md:text-3xl font-semibold">
                    Merci pour votre intérêt
                </h3>
                <p className="mt-3 text-white/90 max-w-md mx-auto text-sm sm:text-base">
                    Votre demande a bien été reçue. L’équipe LeBonResto reviendra vers
                    vous sous 48 heures avec les éléments demandés.
                </p>
                <a
                    href="mailto:le.bon.restau@gmail.com"
                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/40 hover:border-white text-white h-11 md:h-12 px-5 sm:px-6 md:px-8 font-medium text-sm sm:text-base transition"
                >
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    Recevoir le pitch deck
                </a>
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
                    <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" aria-hidden="true" />
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
                <label htmlFor="inv_website">Website</label>
                <input
                    id="inv_website"
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
                    htmlFor="inv_full_name"
                    error={errors.full_name?.message}
                >
                    <input
                        id="inv_full_name"
                        type="text"
                        autoComplete="name"
                        {...register('full_name')}
                        className={inputClass(!!errors.full_name)}
                    />
                </Field>

                <Field
                    label="Email"
                    required
                    htmlFor="inv_email"
                    error={errors.email?.message}
                >
                    <input
                        id="inv_email"
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
                    htmlFor="inv_phone"
                    error={errors.phone?.message}
                >
                    <input
                        id="inv_phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="+212 6 12 34 56 78"
                        {...register('phone')}
                        className={inputClass(!!errors.phone)}
                    />
                </Field>

                <Field
                    label="Société / Fonds"
                    htmlFor="inv_company"
                    error={errors.company?.message}
                >
                    <input
                        id="inv_company"
                        type="text"
                        autoComplete="organization"
                        {...register('company')}
                        className={inputClass(!!errors.company)}
                    />
                </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <Field
                    label="Type d’investisseur"
                    required
                    htmlFor="inv_type"
                    error={errors.investor_type?.message}
                >
                    <select
                        id="inv_type"
                        {...register('investor_type')}
                        className={inputClass(!!errors.investor_type)}
                        defaultValue=""
                    >
                        <option value="" disabled>
                            Sélectionnez…
                        </option>
                        {investorTypeOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </Field>

                <Field
                    label="Ticket envisagé"
                    htmlFor="inv_ticket"
                    error={errors.ticket_size?.message}
                >
                    <select
                        id="inv_ticket"
                        {...register('ticket_size')}
                        className={inputClass(!!errors.ticket_size)}
                        defaultValue=""
                    >
                        <option value="">Sélectionnez…</option>
                        {ticketOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </Field>
            </div>

            <Field
                label="Localisation"
                htmlFor="inv_location"
                error={errors.location?.message}
                hint="Pays / ville"
            >
                <input
                    id="inv_location"
                    type="text"
                    autoComplete="address-level2"
                    {...register('location')}
                    className={inputClass(!!errors.location)}
                />
            </Field>

            <Field
                label="Message"
                htmlFor="inv_message"
                error={errors.message?.message}
            >
                <textarea
                    id="inv_message"
                    rows={4}
                    maxLength={500}
                    {...register('message')}
                    className={cn(inputClass(!!errors.message), 'resize-y')}
                />
                <div className="mt-1 flex justify-end text-xs text-slate-500">
                    {messageValue.length}/500
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
                        J’accepte d’être contacté par LeBonResto au sujet de cette demande.
                        {REQ}
                    </span>
                </label>
                {errors.consent?.message && (
                    <p className="text-sm text-red-600">{errors.consent.message}</p>
                )}
            </div>

            <button
                type="submit"
                disabled={isSubmitting || submitState.status === 'submitting'}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-primary text-white h-11 md:h-12 px-5 sm:px-6 md:px-8 font-medium text-sm sm:text-base shadow-sm hover:bg-primary-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
                {(isSubmitting || submitState.status === 'submitting') && (
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                )}
                {isSubmitting || submitState.status === 'submitting'
                    ? 'Envoi en cours…'
                    : 'Envoyer la demande'}
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
