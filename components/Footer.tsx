import Link from "next/link";
import Image from "next/image";

const COLUMNS = [
    {
        title: "Plateforme",
        links: [
            { label: "Notre solution", href: "/notre-solution" },
            { label: "Tarifs", href: "/tarifs" },
            { label: "Visite 360°", href: "/visite-360" },
            { label: "Blog", href: "/blog" },
            { label: "FAQ", href: "/faq" },
            { label: "À propos", href: "/a-propos" },
            { label: "Explorer les restos", href: "https://lebonresto.ma" },
        ],
    },
    {
        title: "Partenaires",
        links: [
            { label: "Restaurateurs", href: "/restaurateurs" },
            { label: "Investisseurs", href: "/investisseurs" },
            { label: "Devenir partenaire", href: "/partenaires" },
            { label: "Comment ça marche", href: "/comment-ca-marche" },
            { label: "Presse", href: "mailto:le.bon.restau@gmail.com?subject=Presse" },
        ],
    },
    {
        title: "Contact",
        links: [
            { label: "Contact", href: "/contact" },
            { label: "le.bon.restau@gmail.com", href: "mailto:le.bon.restau@gmail.com" },
            { label: "+212 6 44 44 05 25", href: "tel:+212644440525" },
            { label: "WhatsApp", href: "https://wa.me/212644440525" },
        ],
    },
];

export default function Footer() {
    return (
        <footer className="bg-secondary text-slate-200">
            <div className="container-wide py-10 md:py-14 lg:py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                    <div className="sm:col-span-2 lg:col-span-1">
                        <Link href="/" className="inline-flex items-center gap-2" aria-label="LeBonResto — accueil">
                            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white">
                                <Image
                                    src="/assets/brand/lebonresto-mark.svg"
                                    alt=""
                                    aria-hidden="true"
                                    width={36}
                                    height={36}
                                    className="h-8 w-8"
                                />
                            </span>
                            <span className="font-display text-xl font-bold text-white tracking-tight">
                                Le<span className="text-primary-300">Bon</span>Resto
                            </span>
                        </Link>
                        <p className="mt-4 text-sm text-slate-400 leading-relaxed max-w-prose">
                            La marketplace gastronomique de référence au Maroc. Découverte, réservation, et croissance pour les restaurants.
                        </p>
                    </div>
                    {COLUMNS.map((col) => (
                        <div key={col.title}>
                            <h3 className="font-semibold text-white text-sm uppercase tracking-wide">
                                {col.title}
                            </h3>
                            <ul className="mt-4 space-y-2">
                                {col.links.map((l) => (
                                    <li key={l.href}>
                                        <Link
                                            href={l.href}
                                            className="text-sm text-slate-400 hover:text-primary-300 transition-colors break-words"
                                        >
                                            {l.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="mt-10 md:mt-12 pt-6 md:pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 text-xs text-slate-500">
                    <span>© {new Date().getFullYear()} LeBonResto. Tous droits réservés.</span>
                    <div className="flex flex-wrap gap-4 sm:gap-6">
                        <Link href="/confidentialite" className="hover:text-slate-300">
                            Confidentialité
                        </Link>
                        <Link href="/conditions" className="hover:text-slate-300">
                            Conditions
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
