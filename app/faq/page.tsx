import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";
import VisualHero from "@/components/landing/VisualHero";
import SectionHeader from "@/components/landing/SectionHeader";
import CTASection from "@/components/landing/CTASection";
import ScrollReveal from "@/components/landing/ScrollReveal";
import FAQFilteredList, {
    type FAQCategory,
} from "./FAQFilteredList";

export const metadata: Metadata = {
    title: "FAQ — LeBonResto",
    description:
        "Toutes les réponses sur la plateforme, les formules, les réservations, la visite 360° et la confidentialité de vos données.",
    openGraph: {
        title: "FAQ — LeBonResto",
        description:
            "Toutes les réponses sur la plateforme, les formules, les réservations, la visite 360° et la confidentialité de vos données.",
        siteName: "LeBonResto",
        locale: "fr_FR",
        type: "website",
        images: [
            {
                url: "/assets/landing/heroes/about-emotional.jpg",
                width: 1200,
                height: 630,
                alt: "FAQ LeBonResto — Questions fréquentes",
            },
        ],
    },
    twitter: { card: "summary_large_image" },
};

// Catégories FAQ — 5 thèmes × 5 questions = 25 Q/R.
// Copie originale LeBonResto, alignée sur le positionnement premium-marketplace.
// Pas d'invention de tarifs : "sur devis" quand nécessaire.
const FAQ_CATEGORIES: FAQCategory[] = [
    {
        id: "decouverte-reservation",
        label: "Découverte & réservation",
        items: [
            {
                question:
                    "Comment fonctionne la sélection des restaurants sur LeBonResto ?",
                answer:
                    "Chaque établissement est évalué manuellement par notre équipe éditoriale : cuisine, service, cadre, hygiène et cohérence globale. Nous ne référençons que les adresses qui répondent à nos critères de qualité, dans une logique de sélection premium plutôt que d'annuaire exhaustif. Cette exigence est ce qui fait la confiance des convives sur LeBonResto.",
            },
            {
                question: "Comment réserver une table sur LeBonResto ?",
                answer:
                    "Depuis la fiche du restaurant, choisissez la date, l'horaire et le nombre de convives, puis complétez le widget en moins d'une minute. Aucune inscription obligatoire n'est requise pour une première réservation. Vous recevez immédiatement un récapitulatif par e-mail.",
            },
            {
                question: "Recevrai-je une confirmation de ma réservation ?",
                answer:
                    "Oui, une confirmation par e-mail vous est envoyée dès la validation par le restaurant, généralement en quelques minutes. Un rappel automatique est envoyé la veille pour limiter les oublis. Vous pouvez également activer la notification WhatsApp sur simple demande.",
            },
            {
                question: "Puis-je annuler ou modifier ma réservation ?",
                answer:
                    "Oui, chaque restaurant définit sa propre politique d'annulation et de modification, clairement indiquée sur la fiche au moment de réserver. Vous pouvez agir directement depuis le lien envoyé dans votre e-mail de confirmation. En cas d'imprévu, notre équipe support peut vous accompagner.",
            },
            {
                question: "Les avis clients sont-ils vérifiés ?",
                answer:
                    "Oui. Seuls les convives dont la réservation a été honorée peuvent publier un avis, ce qui exclut les commentaires anonymes ou promotionnels. Chaque avis est également relu par notre équipe pour prévenir les abus. Cette rigueur garantit la fiabilité des retours affichés.",
            },
        ],
    },
    {
        id: "inscription-restaurant",
        label: "Inscription restaurant",
        items: [
            {
                question:
                    "Comment intégrer LeBonResto en tant que restaurateur ?",
                answer:
                    "Le point de départ est une démo de trente minutes durant laquelle nous découvrons votre maison, votre positionnement et vos objectifs. Nous vous proposons ensuite une formule adaptée et un devis sur-mesure. Si nous avançons ensemble, l'onboarding démarre dans la foulée.",
            },
            {
                question: "Quels sont les critères pour être référencé ?",
                answer:
                    "Nous privilégions les établissements engagés sur la qualité de leur produit, de leur service et de leur cadre, quel que soit le format — bistronomique, fine dining ou table de quartier d'exception. Chaque candidature est étudiée sur pièces et, si besoin, par une visite terrain. L'objectif est de préserver la cohérence éditoriale de la sélection.",
            },
            {
                question:
                    "Combien de temps prend la mise en ligne d'une fiche ?",
                answer:
                    "Entre 7 et 14 jours ouvrés après la signature, selon la formule choisie et la disponibilité pour la production média. Nous nous engageons sur un calendrier précis dès le brief de démarrage. Les délais Starter, sans production photo, sont les plus rapides.",
            },
            {
                question: "Puis-je gérer ma fiche moi-même ?",
                answer:
                    "Oui. Chaque restaurateur dispose d'un back-office pour mettre à jour horaires, menu, actualités, événements et disponibilités en temps réel. La prise en main se fait lors d'une session de formation incluse dans l'onboarding. Notre support reste joignable en cas de besoin.",
            },
            {
                question: "Y a-t-il un engagement de durée ?",
                answer:
                    "La durée d'engagement se discute au moment du devis, en fonction de la formule et de la production média incluse. Notre modèle repose sur la satisfaction et le renouvellement, pas sur le verrouillage contractuel. Nous cherchons des partenariats durables, pas des rétentions forcées.",
            },
        ],
    },
    {
        id: "formules-tarifs",
        label: "Formules & tarifs",
        items: [
            {
                question:
                    "Pourquoi LeBonResto ne publie-t-il pas de grille tarifaire ?",
                answer:
                    "Chaque établissement a une réalité différente : taille, ambition, contenu déjà disponible, besoins de production média. Un devis sur-mesure est plus juste — et plus honnête — qu'un tarif rigide. Nous préférons chiffrer précisément après la démo plutôt qu'afficher un prix qui ne correspondrait à personne.",
            },
            {
                question:
                    "Quelle est la différence entre Starter, Premium et Pro ?",
                answer:
                    "Starter couvre l'essentiel pour exister en ligne avec une fiche soignée et le moteur de réservation. Premium ajoute la production photo, la visite 360° et un accompagnement renforcé. Pro déploie l'arsenal complet — conseiller dédié, contenus éditoriaux, analytics avancés — pour les maisons d'exception. Le comparatif détaillé est présenté sur la page Tarifs.",
            },
            {
                question: "Facturez-vous une commission par réservation ?",
                answer:
                    "Notre modèle repose principalement sur l'abonnement de la formule choisie, pas sur un pourcentage prélevé à chaque couvert. Si un modèle mixte s'avère pertinent pour votre volume, il est discuté et cadré dans le devis. Aucun frais caché n'est appliqué en cours de contrat.",
            },
            {
                question: "Le paiement peut-il être mensuel ou annuel ?",
                answer:
                    "Oui. Chaque formule est disponible en règlement mensuel ou annuel, avec un tarif préférentiel pour l'engagement annuel. Le choix se fait au moment du devis et reste ajustable à l'échéance. Un paiement en plusieurs fois reste possible selon les modalités convenues.",
            },
            {
                question:
                    "Y a-t-il des frais d'installation ou d'onboarding ?",
                answer:
                    "Certains frais d'installation peuvent s'appliquer selon la formule, l'ampleur de la production média et le volume de données à intégrer. Ils sont toujours détaillés ligne à ligne dans le devis initial. Aucune facturation ne peut apparaître en cours de projet sans validation préalable.",
            },
        ],
    },
    {
        id: "visite-media",
        label: "Visite 360° & production média",
        items: [
            {
                question:
                    "Qu'est-ce qui est inclus dans la production média ?",
                answer:
                    "Selon la formule, la production couvre reportage photo professionnel de la salle, des plats signature et de l'équipe, visite 360° immersive et courts contenus vidéo. Chaque livrable est retouché, calibré et prêt à être diffusé sur la fiche comme sur vos propres canaux. Le brief créatif est validé avec vous avant la prise de vue.",
            },
            {
                question: "Comment se déroule la séance photo ?",
                answer:
                    "Notre équipe se déplace sur place avec l'équipement adapté et une direction artistique cohérente avec le positionnement de votre maison. Comptez généralement deux à quatre heures sur site, hors service. Nous cadrons le moment idéal ensemble pour minimiser l'impact opérationnel.",
            },
            {
                question:
                    "Combien de temps pour la mise en ligne de la visite 360° ?",
                answer:
                    "Comptez cinq à dix jours ouvrés entre la prise de vue et la publication, le temps du post-traitement, de l'intégration et de votre validation finale. Vous découvrez toujours le rendu avant mise en ligne. Aucune publication n'est effectuée sans votre feu vert.",
            },
            {
                question:
                    "Puis-je utiliser les photos sur mes propres canaux ?",
                answer:
                    "Oui. Vous disposez d'un droit d'usage étendu sur les livrables photo et vidéo pour vos réseaux sociaux, votre site, vos supports print et vos campagnes locales. Les conditions précises figurent dans le contrat de production associé à votre formule. La cession couvre l'ensemble de la durée de votre partenariat.",
            },
            {
                question:
                    "La production média est-elle incluse dans toutes les formules ?",
                answer:
                    "La production photo et la visite 360° sont incluses en Premium et en Pro, avec des niveaux d'accompagnement différents. En Starter, elles restent disponibles en option, facturées séparément dans le devis. Le choix dépend de votre stock d'images actuel et de votre ambition éditoriale.",
            },
        ],
    },
    {
        id: "confidentialite-support",
        label: "Confidentialité & support",
        items: [
            {
                question:
                    "Comment sont protégées mes données personnelles ?",
                answer:
                    "Vos données sont hébergées sur une infrastructure sécurisée, chiffrées en transit comme au stockage, et accessibles uniquement aux équipes habilitées. Nous n'utilisons ces données que pour opérer le service : réservation, communication, support, statistiques agrégées. Notre politique de confidentialité détaille chaque traitement.",
            },
            {
                question: "Êtes-vous conformes à la loi 09-08 ?",
                answer:
                    "Oui. LeBonResto respecte la loi marocaine 09-08 relative à la protection des données à caractère personnel et s'aligne également sur les principes du RGPD européen. Un référent traite les demandes d'accès, de rectification et de suppression dans les délais prévus par la loi. Toute question peut nous être adressée par e-mail.",
            },
            {
                question:
                    "Revendez-vous ou partagez-vous les données clients ?",
                answer:
                    "Jamais. Nous ne revendons aucune donnée à des tiers et ne les partageons pas hors des cas strictement nécessaires au service — restaurant réservé, prestataire technique sous contrat, obligation légale. Cette règle est non négociable et fait partie de notre engagement éditorial autant qu'opérationnel.",
            },
            {
                question: "Comment contacter le support LeBonResto ?",
                answer:
                    "Vous pouvez nous joindre par le formulaire de contact, par e-mail ou par WhatsApp — le numéro figure en pied de page et dans le bouton flottant. Notre équipe s'engage sur une première réponse sous 24 heures ouvrées. Les partenaires restaurateurs disposent en plus d'un canal prioritaire.",
            },
            {
                question:
                    "Dans quelle langue le support est-il disponible ?",
                answer:
                    "Notre support répond en français, en arabe et en darija selon vos préférences. L'anglais reste possible pour les demandes techniques. L'important est de rester compréhensible : nous adaptons le canal et la langue à votre confort.",
            },
        ],
    },
];

// JSON-LD FAQPage — schéma structuré agrégeant les 25 Q/R pour SEO / rich results.
// Généré automatiquement depuis FAQ_CATEGORIES pour rester en synchronisation.
const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_CATEGORIES.flatMap((cat) =>
        cat.items.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
            },
        })),
    ),
};

export default function FAQPage() {
    return (
        <>
            {/* JSON-LD FAQPage — SEO structuré, 25 Q/R */}
            <script
                type="application/ld+json"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />

            {/* 1) HERO — VisualHero photo-led, texte centré */}
            <VisualHero
                height="normal"
                eyebrow="FAQ"
                headline="Questions fréquentes"
                accent="fréquentes"
                subheadline="Filtrez par thème pour trouver la réponse en quelques secondes."
                primaryCta={{
                    label: "Demander une démo",
                    href: "/restaurateurs",
                }}
                secondaryCta={{
                    label: "Nous écrire",
                    href: "/contact",
                }}
                image={{
                    src: "/assets/landing/heroes/about-emotional.jpg",
                    alt: "Service de salle dans un restaurant marocain premium",
                }}
                align="center"
            />

            {/* 2) FILTRES + LISTE Q&A — orchestrateur client */}
            <ScrollReveal>
                <section className="bg-white py-10 md:py-14 lg:py-16">
                    <div className="container-wide">
                        <SectionHeader
                            eyebrow="LES RÉPONSES"
                            title="Choisissez un thème, dépliez la réponse"
                            accent="dépliez la réponse"
                            description="Découverte & réservation, inscription restaurant, formules & tarifs, visite 360° & production média, confidentialité & support — 25 réponses regroupées par sujet pour aller droit au but."
                            align="center"
                        />

                        <div className="mt-8 sm:mt-10 lg:mt-12">
                            <FAQFilteredList categories={FAQ_CATEGORIES} />
                        </div>
                    </div>
                </section>
            </ScrollReveal>

            {/* 3) ENCADRÉ "Je n'ai pas trouvé ma réponse" — fond crème */}
            <ScrollReveal>
                <section className="bg-cream-50 py-10 md:py-14 lg:py-16">
                    <div className="container-wide">
                        <article className="mx-auto flex max-w-3xl flex-col items-center gap-4 sm:gap-5 rounded-3xl bg-white p-5 sm:p-6 md:p-8 text-center shadow-premium ring-1 ring-cream-300">
                            <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                                Pas trouvé votre réponse ?
                            </span>
                            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 leading-[1.1] text-balance">
                                Votre question n&apos;est pas là ?
                            </h2>
                            <p className="max-w-xl text-sm sm:text-base text-slate-600 text-pretty">
                                Écrivez-nous : notre équipe vous répond
                                directement, en français ou en arabe, sous
                                24&nbsp;heures ouvrées.
                            </p>
                            <Link
                                href="/contact"
                                className="inline-flex h-11 md:h-12 items-center gap-2 rounded-full bg-primary px-5 sm:px-6 md:px-8 text-sm sm:text-base font-semibold text-white shadow-premium transition-all duration-300 hover:bg-primary-700 hover:shadow-glow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                            >
                                <Mail className="h-4 w-4" aria-hidden="true" />
                                <span>Nous écrire</span>
                            </Link>
                        </article>
                    </div>
                </section>
            </ScrollReveal>

            {/* 4) CTA FINALE */}
            <ScrollReveal>
                <CTASection
                    variant="teal"
                    title="Prêts à démarrer ?"
                    description="Une démo de 30 minutes pour visualiser votre future fiche et chiffrer votre projet."
                    primaryCta={{
                        label: "Demander une démo",
                        href: "/restaurateurs",
                    }}
                    secondaryCta={{
                        label: "Voir nos tarifs",
                        href: "/tarifs",
                    }}
                />
            </ScrollReveal>
        </>
    );
}
