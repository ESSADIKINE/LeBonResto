'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, CheckCircle2, AlertCircle, Phone } from 'lucide-react';
import { cn } from '@/lib/cn';

/**
 * Restaurant onboarding lead form.
 *
 * NOTE: This schema mirrors the server-side zod schema in
 * /app/api/leads/restaurant/route.ts. Keep field names in sync.
 */
const phoneRegex = /^[+0][\d\s().-]{6,}$/;

const reservationMethods = [
    'Téléphone',
    'WhatsApp',
    'Instagram',
    'Site web',
    'Autre',
] as const;

const interestOptions = [
    'Profil listing',
    'Réservations',
    'Offres',
    'Visite 360°',
    'Vidéo',
    'Visibilité premium',
] as const;

const restaurantSchema = z.object({
    restaurant_name: z
        .string()
        .min(2, 'Veuillez saisir le nom du restaurant.')
        .max(160),
    owner_name: z
        .string()
        .min(2, 'Veuillez saisir le nom du propriétaire ou responsable.')
        .max(160),
    email: z
        .string()
        .min(1, 'Veuillez saisir votre email.')
        .email('Adresse email invalide.'),
    phone: z
        .string()
        .min(1, 'Veuillez saisir un numéro de téléphone.')
        .refine(
            (v) => phoneRegex.test(v.replace(/\s+/g, '')),
            'Numéro de téléphone invalide.',
        ),
    city: z.string().min(2, 'Veuillez indiquer votre ville.').max(120),
    address: z.string().max(240).optional().or(z.literal('')),
    cuisine: z.string().max(120).optional().or(z.literal('')),
    locations: z.enum(['1', '2-5', '6-10', '10+', '']).optional(),
    reservation_method: z
        .array(z.enum(reservationMethods))
        .default([]),
    interests: z.array(z.enum(interestOptions)).default([]),
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

// Use the schema INPUT shape for RHF (matches what the user types/defaults
// hold before zod transforms / .default() are applied). Zod's `output` shape
// (i.e. `z.infer`) makes `reservation_method`/`interests` non-optional which
// the resolver's input parameter cannot satisfy.
type RestaurantFormValues = z.input<typeof restaurantSchema>;
type RestaurantFormOutput = z.output<typeof restaurantSchema>;

type SubmitState =
    | { status: 'idle' }
    | { status: 'submitting' }
    | { status: 'success' }
    | { status: 'error'; message: string };

const locationOptions: { value: string; label: string }[] = [
    { value: '1', label: '1 établissement' },
    { value: '2-5', label: '2 à 5 établissements' },
    { value: '6-10', label: '6 à 10 établissements' },
    { value: '10+', label: 'Plus de 10 établissements' },
];

const REQ = <span className="ml-0.5 text-primary">*</span>;

export default function RestaurantOnboardingForm() {
    const [submitState, setSubmitState] = useState<SubmitState>({ status: 'idle' });

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<RestaurantFormValues, unknown, RestaurantFormOutput>({
        resolver: zodResolver(restaurantSchema),
        mode: 'onBlur',
        defaultValues: {
            restaurant_name: '',
            owner_name: '',
            email: '',
            phone: '',
            city: '',
            address: '',
            cuisine: '',
            locations: '',
            reservation_method: [],
            interests: [],
            message: '',
            website: '',
        },
    });

    const messageValue = watch('message') ?? '';

    const onSubmit = async (values: RestaurantFormOutput) => {
        setSubmitState({ status: 'submitting' });
        try {
            const payload = {
                ...values,
                phone: values.phone.replace(/\s+/g, ''),
            };
            const res = await fetch('/api/leads/restaurant', {
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
                window.lbrTrack?.('LeadSubmitted', { type: 'restaurant' });
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
                    Bienvenue chez LeBonResto
                </h3>
                <p className="mt-3 text-white/90 max-w-md mx-auto text-sm sm:text-base">
                    Votre demande a bien été enregistrée. Un conseiller de notre équipe
                    vous contactera très prochainement pour préparer votre mise en ligne.
                </p>
                <a
                    href="tel:+212644440525"
                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/40 hover:border-white text-white h-11 md:h-12 px-5 sm:px-6 md:px-8 font-medium text-sm sm:text-base transition"
                >
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    Être rappelé
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
                <label htmlFor="resto_website">Website</label>
                <input
                    id="resto_website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    {...register('website')}
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <Field
                    label="Nom du restaurant"
                    required
                    htmlFor="resto_name"
                    error={errors.restaurant_name?.message}
                >
                    <input
                        id="resto_name"
                        type="text"
                        autoComplete="organization"
                        {...register('restaurant_name')}
                        className={inputClass(!!errors.restaurant_name)}
                    />
                </Field>

                <Field
                    label="Propriétaire ou responsable"
                    required
                    htmlFor="resto_owner"
                    error={errors.owner_name?.message}
                >
                    <input
                        id="resto_owner"
                        type="text"
                        autoComplete="name"
                        {...register('owner_name')}
                        className={inputClass(!!errors.owner_name)}
                    />
                </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <Field
                    label="Email"
                    required
                    htmlFor="resto_email"
                    error={errors.email?.message}
                >
                    <input
                        id="resto_email"
                        type="email"
                        autoComplete="email"
                        {...register('email')}
                        className={inputClass(!!errors.email)}
                    />
                </Field>

                <Field
                    label="Téléphone / WhatsApp"
                    required
                    htmlFor="resto_phone"
                    error={errors.phone?.message}
                >
                    <input
                        id="resto_phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="+212 6 12 34 56 78"
                        {...register('phone')}
                        className={inputClass(!!errors.phone)}
                    />
                </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <Field
                    label="Ville"
                    required
                    htmlFor="resto_city"
                    error={errors.city?.message}
                >
                    <input
                        id="resto_city"
                        type="text"
                        autoComplete="address-level2"
                        {...register('city')}
                        className={inputClass(!!errors.city)}
                    />
                </Field>

                <Field
                    label="Adresse"
                    htmlFor="resto_address"
                    error={errors.address?.message}
                >
                    <input
                        id="resto_address"
                        type="text"
                        autoComplete="street-address"
                        {...register('address')}
                        className={inputClass(!!errors.address)}
                    />
                </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <Field
                    label="Type de cuisine"
                    htmlFor="resto_cuisine"
                    error={errors.cuisine?.message}
                >
                    <input
                        id="resto_cuisine"
                        type="text"
                        placeholder="Ex. marocaine, méditerranéenne…"
                        {...register('cuisine')}
                        className={inputClass(!!errors.cuisine)}
                    />
                </Field>

                <Field
                    label="Nombre d’établissements"
                    htmlFor="resto_locations"
                    error={errors.locations?.message}
                >
                    <select
                        id="resto_locations"
                        {...register('locations')}
                        className={inputClass(!!errors.locations)}
                        defaultValue=""
                    >
                        <option value="">Sélectionnez…</option>
                        {locationOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </Field>
            </div>

            <CheckboxGroup
                legend="Comment recevez-vous vos réservations aujourd’hui ?"
                error={errors.reservation_method?.message as string | undefined}
            >
                {reservationMethods.map((method) => (
                    <label
                        key={method}
                        className="flex min-h-11 items-center gap-2 rounded-xl border border-slate-300 hover:border-primary hover:bg-cream-50 px-3 py-2 text-sm text-slate-700 cursor-pointer transition"
                    >
                        <input
                            type="checkbox"
                            value={method}
                            {...register('reservation_method')}
                            className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary/40"
                        />
                        {method}
                    </label>
                ))}
            </CheckboxGroup>

            <CheckboxGroup
                legend="Qu’est-ce qui vous intéresse chez LeBonResto ?"
                error={errors.interests?.message as string | undefined}
            >
                {interestOptions.map((interest) => (
                    <label
                        key={interest}
                        className="flex min-h-11 items-center gap-2 rounded-xl border border-slate-300 hover:border-primary hover:bg-cream-50 px-3 py-2 text-sm text-slate-700 cursor-pointer transition"
                    >
                        <input
                            type="checkbox"
                            value={interest}
                            {...register('interests')}
                            className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary/40"
                        />
                        {interest}
                    </label>
                ))}
            </CheckboxGroup>

            <Field
                label="Message"
                htmlFor="resto_message"
                error={errors.message?.message}
            >
                <textarea
                    id="resto_message"
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
                    : 'Rejoindre LeBonResto'}
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

interface CheckboxGroupProps {
    legend: string;
    error?: string;
    children: React.ReactNode;
}

function CheckboxGroup({ legend, error, children }: CheckboxGroupProps) {
    return (
        <fieldset>
            <legend className="block text-sm font-medium text-slate-700 mb-2">
                {legend}
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">{children}</div>
            {error && (
                <p className="mt-2 text-sm text-red-600" role="alert">
                    {error}
                </p>
            )}
        </fieldset>
    );
}
