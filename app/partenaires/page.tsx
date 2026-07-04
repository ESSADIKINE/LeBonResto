import type { Metadata } from "next";
import VisualHero from "@/components/landing/VisualHero";
import ScrollReveal from "@/components/landing/ScrollReveal";
import PartnerRecruitBand from "@/components/landing/PartnerRecruitBand";
import FAQAccordion from "@/components/landing/FAQAccordion";
import LandingFooterCTA from "@/components/landing/LandingFooterCTA";

export const metadata: Metadata = {
    title: "Partenaires — Rejoindre l'écosystème Le Bon Resto",
    description:
        "Consultants restauration, photographes, vidéastes, prestataires Visite 360° : construisons ensemble la marketplace gastronomique premium du Maroc.",
    alternates: { canonical: "/partenaires" },
    openGraph: {
        title: "Partenaires — Rejoindre l'écosystème Le Bon Resto",
        description:
            "Consultants restauration, photographes, vidéastes, prestataires Visite 360° : construisons ensemble la marketplace gastronomique premium du Maroc.",
        siteName: "LeBonResto",
        locale: "fr_FR",
        type: "website",
        images: [
            {
                url: "/assets/landing/heroes/about-emotional.jpg",
                width: 1200,
                height: 630,
                alt: "Partenaires LeBonResto",
            },
        ],
    },
    twitter: { card: "summary_large_image" },
};

export default function PartenairesPage() {
    return (
        <>
            {/* 1) HERO — VisualHero photo-led (mêmes classes que /a-propos) */}
            <VisualHero
                height="normal"
                eyebrow="PARTENAIRES"
                headline="Construisons ensemble la marketplace gastronomique du Maroc"
                accent="ensemble"
                subheadline="Consultants restauration, prestataires média et spécialistes Visite 360° : LeBonResto vous ouvre les portes d'un réseau national de tables d'exception."
                primaryCta={{
                    label: "Devenir partenaire",
                    href: "mailto:le.bon.restau@gmail.com?subject=Partenariat%20LeBonResto",
                }}
                secondaryCta={{ label: "Nous écrire", href: "/contact" }}
                image={{
                    src: "/assets/landing/heroes/about-emotional.jpg",
                    alt: "Scène de dîner marocain à l'heure bleue — écosystème LeBonResto",
                }}
            />

            {/* 2) BAND PERSONAS PARTENAIRES */}
            <ScrollReveal>
                <PartnerRecruitBand
                    eyebrow="REJOINDRE L'ÉCOSYSTÈME"
                    title="Trois profils, une même ambition"
                    accent="ambition"
                    description="Nous ouvrons notre plateforme aux professionnels qui partagent notre exigence. Choisissez le rôle qui correspond à votre expertise et rejoignez notre réseau."
                    personas={[
                        {
                            icon: "Users",
                            title: "Consultants restauration",
                            description:
                                "Vous accompagnez déjà des restaurants au Maroc. Rejoignez notre réseau de consultants certifiés LeBonResto et générez des commissions récurrentes.",
                            cta: {
                                label: "Devenir consultant",
                                href: "mailto:le.bon.restau@gmail.com?subject=Consultant",
                            },
                        },
                        {
                            icon: "Camera",
                            title: "Photographes / vidéastes",
                            description:
                                "Vous produisez du contenu premium. Devenez prestataire officiel pour couvrir les onboardings de nos restaurants partenaires.",
                            cta: {
                                label: "Postuler prestataire média",
                                href: "mailto:le.bon.restau@gmail.com?subject=M%C3%A9dia",
                            },
                        },
                        {
                            icon: "Compass",
                            title: "Prestataires Visite 360°",
                            description:
                                "Vous maîtrisez Matterport, Klapty ou Pannellum ? Rejoignez notre pool de prestataires 360° et couvrez les nouveaux restaurants.",
                            cta: {
                                label: "Rejoindre le pool 360°",
                                href: "mailto:le.bon.restau@gmail.com?subject=360",
                            },
                        },
                    ]}
                />
            </ScrollReveal>

            {/* 3) FAQ COURTE — 3 questions partenariat */}
            <ScrollReveal>
                <FAQAccordion
                    eyebrow="VOS QUESTIONS"
                    title="Ce qu'il faut savoir avant de nous rejoindre"
                    accent="nous rejoindre"
                    variant="cream"
                    items={[
                        {
                            question:
                                "Comment fonctionne la rémunération des consultants ?",
                            answer:
                                "Nos consultants certifiés perçoivent une commission récurrente sur les abonnements des restaurants qu'ils apportent, tant que le contrat est actif. Nous détaillons les modalités précises (barème, durée, conditions de certification) lors d'un premier échange par visio ou en présentiel à Casablanca.",
                        },
                        {
                            question:
                                "Quel volume de missions pouvez-vous garantir aux prestataires média et 360° ?",
                            answer:
                                "Nous ne garantissons pas de volume minimum : chaque mission est déclenchée par un onboarding restaurant. En revanche, nous vous adressons en priorité les missions correspondant à votre ville et à votre spécialité, et nous partageons notre pipeline d'ouverture à trois mois pour vous permettre d'anticiper.",
                        },
                        {
                            question:
                                "Quels sont les critères de sélection ?",
                            answer:
                                "Nous demandons un portfolio (ou une liste de références clients pour les consultants), une charte qualité signée, et un échange de cadrage. La sélection reste exigeante : nous privilégions un réseau resserré de partenaires de confiance plutôt qu'un annuaire ouvert.",
                        },
                    ]}
                />
            </ScrollReveal>

            {/* 4) CTA FINAL */}
            <ScrollReveal>
                <LandingFooterCTA
                    title="Prêt·e à rejoindre l'écosystème LeBonResto ?"
                    primaryCta={{
                        label: "Écrire à l'équipe partenariats",
                        href: "mailto:le.bon.restau@gmail.com?subject=Partenariat%20LeBonResto",
                    }}
                    secondaryCta={{
                        label: "Nous contacter",
                        href: "/contact",
                    }}
                />
            </ScrollReveal>
        </>
    );
}
