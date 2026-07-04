/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next";
import Link from "next/link";
import {
    ShieldCheck,
    Database,
    Scale,
    LineChart,
    UserCheck,
    Mail,
} from "lucide-react";

export const metadata: Metadata = {
    title: "Politique de confidentialité — LeBonResto",
    description:
        "Comment LeBonResto collecte, utilise et protège vos données personnelles. Cookies analytiques (Microsoft Clarity, Plausible), base légale RGPD et exercice de vos droits.",
    alternates: { canonical: "/confidentialite" },
    openGraph: {
        title: "Politique de confidentialité — LeBonResto",
        description:
            "Traitement des données, cookies analytiques et droits RGPD sur LeBonResto.",
        siteName: "LeBonResto",
        locale: "fr_FR",
        type: "article",
    },
    twitter: { card: "summary_large_image" },
    robots: { index: true, follow: true },
};

// Last-updated date shown in the header. Update when a section changes.
const LAST_UPDATED = "4 juillet 2026";

const SECTIONS = [
    { id: "introduction", label: "Introduction" },
    { id: "donnees-collectees", label: "Données collectées" },
    { id: "base-legale", label: "Base légale (RGPD)" },
    { id: "analytiques", label: "Analytiques utilisées" },
    { id: "vos-droits", label: "Vos droits" },
    { id: "contact-dpo", label: "Contact DPO" },
];

export default function PrivacyPolicyPage() {
    return (
        <article className="bg-white">
            {/* Header band */}
            <header className="bg-cream-gradient border-b border-cream-200">
                <div className="container-narrow py-10 md:py-14 lg:py-16">
                    <p className="eyebrow-chip">CONFIDENTIALITÉ</p>
                    <h1 className="h1-display mt-3 text-slate-900">
                        Politique de confidentialité
                    </h1>
                    <p className="lead-p mt-4 max-w-2xl">
                        Chez LeBonResto, la protection de vos données est un
                        pilier de la confiance que nous construisons avec les
                        gourmets, les restaurateurs et nos partenaires. Ce
                        document explique, en langage clair, ce que nous
                        collectons et pourquoi.
                    </p>
                    <p className="mt-4 text-xs font-medium uppercase tracking-wider text-slate-500">
                        Dernière mise à jour : {LAST_UPDATED}
                    </p>
                </div>
            </header>

            <div className="container-narrow py-10 md:py-14 lg:py-16">
                <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
                    {/* Table of contents — sticky on desktop */}
                    <aside
                        aria-label="Sommaire"
                        className="lg:col-span-4"
                    >
                        <nav className="lg:sticky lg:top-24 rounded-2xl bg-cream-50 p-5 sm:p-6 ring-1 ring-cream-200">
                            <p className="eyebrow-chip">Sommaire</p>
                            <ol className="mt-4 space-y-2 text-sm">
                                {SECTIONS.map((s, i) => (
                                    <li key={s.id}>
                                        <a
                                            href={`#${s.id}`}
                                            className="group flex items-baseline gap-2 rounded-lg py-1.5 text-slate-700 transition hover:text-primary"
                                        >
                                            <span className="text-xs font-semibold tabular-nums text-slate-400 group-hover:text-primary">
                                                {String(i + 1).padStart(2, "0")}
                                            </span>
                                            <span className="font-medium">
                                                {s.label}
                                            </span>
                                        </a>
                                    </li>
                                ))}
                            </ol>
                        </nav>
                    </aside>

                    {/* Content */}
                    <div className="lg:col-span-8 space-y-10 md:space-y-12">
                        <Section
                            id="introduction"
                            icon={<ShieldCheck className="h-5 w-5" />}
                            title="1. Introduction"
                        >
                            <p>
                                La présente politique de confidentialité décrit
                                la manière dont LeBonResto (« nous »,
                                « notre », « la Plateforme ») collecte,
                                utilise et protège vos données personnelles
                                lorsque vous visitez notre site marketing
                                <span className="whitespace-nowrap">
                                    {" "}
                                    business.lebonresto.ma
                                </span>
                                , consultez nos pages restaurateurs, ou
                                utilisez nos formulaires de contact.
                            </p>
                            <p>
                                LeBonResto est éditée depuis Casablanca, Maroc.
                                Nous appliquons les principes du Règlement
                                général sur la protection des données (RGPD,
                                UE&nbsp;2016/679) comme socle de conformité
                                internationale, ainsi que la loi marocaine
                                n°&nbsp;09-08 relative à la protection des
                                personnes physiques à l'égard du traitement des
                                données à caractère personnel.
                            </p>
                        </Section>

                        <Section
                            id="donnees-collectees"
                            icon={<Database className="h-5 w-5" />}
                            title="2. Données collectées"
                        >
                            <p>
                                Nous ne collectons que les données strictement
                                nécessaires à l'objectif poursuivi. Concrètement&nbsp;:
                            </p>
                            <ul className="mt-4 space-y-3">
                                <BulletItem title="Formulaires de contact et d'onboarding restaurateur">
                                    Nom, prénom, e-mail, téléphone, nom du
                                    restaurant, ville, contenu libre du
                                    message. Utilisés uniquement pour vous
                                    répondre ou instruire votre demande
                                    d'inscription.
                                </BulletItem>
                                <BulletItem title="Données de navigation anonymisées">
                                    Pages visitées, temps passé, type d'appareil,
                                    pays d'accès, source de trafic. Agrégées et
                                    non nominatives — utilisées pour améliorer
                                    l'expérience du site.
                                </BulletItem>
                                <BulletItem title="Cookies techniques">
                                    Un cookie unique de préférence de langue et
                                    votre choix de consentement aux
                                    analytiques&nbsp;— ils sont indispensables
                                    au fonctionnement du site et déposés sans
                                    consentement préalable, conformément à
                                    l'article&nbsp;82 de la loi Informatique et
                                    Libertés.
                                </BulletItem>
                                <BulletItem title="Cookies analytiques (soumis à consentement)">
                                    Voir la section «&nbsp;Analytiques
                                    utilisées&nbsp;» ci-dessous. Rien n'est
                                    déposé tant que vous n'avez pas cliqué sur
                                    «&nbsp;Accepter&nbsp;» dans la bannière.
                                </BulletItem>
                            </ul>
                            <p className="mt-4">
                                Nous ne collectons pas de données sensibles
                                (santé, orientation, opinions politiques ou
                                religieuses), et nous n'utilisons pas de
                                traceurs publicitaires tiers de type
                                Meta&nbsp;Pixel, Google Ads ou TikTok.
                            </p>
                        </Section>

                        <Section
                            id="base-legale"
                            icon={<Scale className="h-5 w-5" />}
                            title="3. Base légale (RGPD)"
                        >
                            <p>
                                Chaque traitement s'appuie sur une base légale
                                identifiée à l'article&nbsp;6 du RGPD&nbsp;:
                            </p>
                            <ul className="mt-4 space-y-3">
                                <BulletItem title="Consentement — art. 6.1.a">
                                    Dépôt et lecture des cookies analytiques
                                    (Microsoft Clarity, Plausible). Vous
                                    donnez, refusez ou retirez ce consentement
                                    à tout moment via la bannière de cookies ou
                                    en effaçant la clé
                                    <code className="mx-1 rounded bg-slate-100 px-1.5 py-0.5 text-[13px] font-mono text-slate-800">
                                        lbr_consent_v1
                                    </code>
                                    de votre navigateur.
                                </BulletItem>
                                <BulletItem title="Intérêt légitime — art. 6.1.f">
                                    Traitement des messages envoyés via nos
                                    formulaires de contact, sécurité du site
                                    (prévention des abus et du spam),
                                    amélioration mesurable de l'expérience
                                    utilisateur. Notre intérêt légitime est mis
                                    en balance avec vos droits et libertés —
                                    vous pouvez vous y opposer à tout moment.
                                </BulletItem>
                            </ul>
                        </Section>

                        <Section
                            id="analytiques"
                            icon={<LineChart className="h-5 w-5" />}
                            title="4. Analytiques utilisées"
                        >
                            <p>
                                Nous utilisons deux outils analytiques,
                                sélectionnés pour leur respect explicite de la
                                vie privée. Aucun ne dépose de traceur avant
                                votre consentement.
                            </p>
                            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                <ToolCard
                                    name="Microsoft Clarity"
                                    role="Enregistrements de session anonymisés"
                                    detail="Heatmaps et lectures de session pour comprendre les blocages d'usage. Les champs de formulaire sont masqués par défaut. Données hébergées sur les infrastructures Microsoft (Union européenne). Politique de Clarity disponible sur clarity.microsoft.com."
                                />
                                <ToolCard
                                    name="Plausible Analytics"
                                    role="Statistiques d'audience sans cookies"
                                    detail="Comptage d'audience agrégé, sans cookie persistant ni identifiant unique. Aucune donnée personnelle n'est stockée. Hébergement dans l'Union européenne. Politique de Plausible disponible sur plausible.io/data-policy."
                                />
                            </div>
                            <p className="mt-6">
                                Vous pouvez modifier votre choix à tout moment
                                en cliquant sur «&nbsp;Refuser&nbsp;» dans la
                                bannière (ré-affichée après effacement de la
                                clé
                                <code className="mx-1 rounded bg-slate-100 px-1.5 py-0.5 text-[13px] font-mono text-slate-800">
                                    lbr_consent_v1
                                </code>
                                dans votre navigateur), ou en nous écrivant à
                                l'adresse indiquée plus bas.
                            </p>
                        </Section>

                        <Section
                            id="vos-droits"
                            icon={<UserCheck className="h-5 w-5" />}
                            title="5. Vos droits"
                        >
                            <p>
                                Conformément au RGPD et à la loi marocaine
                                n°&nbsp;09-08, vous disposez à tout moment
                                des&nbsp;droits suivants sur vos données&nbsp;:
                            </p>
                            <ul className="mt-4 space-y-3">
                                <BulletItem title="Droit d'accès et de rectification">
                                    Obtenir une copie des données que nous
                                    détenons sur vous, et demander leur
                                    correction si elles sont inexactes.
                                </BulletItem>
                                <BulletItem title="Droit à l'effacement (« droit à l'oubli »)">
                                    Demander la suppression de vos données
                                    quand leur conservation n'est plus
                                    justifiée.
                                </BulletItem>
                                <BulletItem title="Droit à la limitation et à l'opposition">
                                    Restreindre un traitement, ou vous
                                    opposer&nbsp;— notamment aux traitements
                                    fondés sur notre intérêt légitime.
                                </BulletItem>
                                <BulletItem title="Droit à la portabilité">
                                    Recevoir vos données dans un format
                                    structuré et couramment utilisé, pour les
                                    transmettre à un autre responsable.
                                </BulletItem>
                                <BulletItem title="Droit de retirer votre consentement">
                                    À tout moment et sans motif, sans
                                    incidence sur la licéité des traitements
                                    déjà effectués.
                                </BulletItem>
                                <BulletItem title="Droit d'introduire une réclamation">
                                    Auprès de la CNDP (Commission nationale de
                                    contrôle de la protection des données à
                                    caractère personnel) au Maroc, ou de
                                    l'autorité compétente de votre pays de
                                    résidence.
                                </BulletItem>
                            </ul>
                            <p className="mt-4">
                                Nous nous engageons à répondre à toute demande
                                dans un délai maximal de 30&nbsp;jours à
                                compter de sa réception.
                            </p>
                        </Section>

                        <Section
                            id="contact-dpo"
                            icon={<Mail className="h-5 w-5" />}
                            title="6. Contact DPO"
                        >
                            <p>
                                Pour toute question relative à vos données
                                personnelles ou à l'exercice de vos droits,
                                vous pouvez contacter notre Délégué à la
                                Protection des Données&nbsp;:
                            </p>
                            <div className="mt-5 rounded-2xl bg-cream-50 p-5 sm:p-6 ring-1 ring-cream-200">
                                <p className="font-display text-lg font-semibold text-slate-900">
                                    DPO&nbsp;— LeBonResto
                                </p>
                                <p className="mt-2 text-sm text-slate-600">
                                    Par e-mail&nbsp;:{" "}
                                    <a
                                        href="mailto:le.bon.restau@gmail.com"
                                        className="font-semibold text-primary underline underline-offset-2 hover:text-primary-700"
                                    >
                                        le.bon.restau@gmail.com
                                    </a>
                                </p>
                                <p className="mt-1 text-sm text-slate-600">
                                    Par courrier&nbsp;: LeBonResto — DPO,
                                    Casablanca, Maroc (adresse complète
                                    communiquée sur demande).
                                </p>
                                <p className="mt-3 text-xs text-slate-500">
                                    Merci de préciser dans votre message l'objet
                                    de votre demande (accès, rectification,
                                    effacement, etc.) afin que nous puissions y
                                    répondre efficacement.
                                </p>
                            </div>
                            <p className="mt-6 text-sm text-slate-600">
                                Retour à la{" "}
                                <Link
                                    href="/"
                                    className="font-semibold text-primary underline underline-offset-2 hover:text-primary-700"
                                >
                                    page d'accueil
                                </Link>{" "}
                                ou consultez notre{" "}
                                <Link
                                    href="/contact"
                                    className="font-semibold text-primary underline underline-offset-2 hover:text-primary-700"
                                >
                                    formulaire de contact
                                </Link>
                                .
                            </p>
                        </Section>
                    </div>
                </div>
            </div>
        </article>
    );
}

/* --------------------------------- helpers -------------------------------- */

function Section({
    id,
    icon,
    title,
    children,
}: {
    id: string;
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
}) {
    return (
        <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24">
            <div className="flex items-center gap-3">
                <span
                    aria-hidden="true"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-cream-100 text-primary"
                >
                    {icon}
                </span>
                <h2
                    id={`${id}-title`}
                    className="h3-section text-slate-900 leading-tight"
                >
                    {title}
                </h2>
            </div>
            <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-slate-600">
                {children}
            </div>
        </section>
    );
}

function BulletItem({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <li className="rounded-xl bg-white p-4 ring-1 ring-slate-100">
            <p className="font-display text-[15px] font-semibold text-slate-900">
                {title}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                {children}
            </p>
        </li>
    );
}

function ToolCard({
    name,
    role,
    detail,
}: {
    name: string;
    role: string;
    detail: string;
}) {
    return (
        <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-100 shadow-premium">
            <p className="eyebrow-chip">{role}</p>
            <p className="mt-2 font-display text-lg font-semibold text-slate-900">
                {name}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {detail}
            </p>
        </div>
    );
}
