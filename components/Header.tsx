"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";

const NAV = [
    { label: "Notre solution", href: "/notre-solution" },
    { label: "Tarifs", href: "/tarifs" },
    { label: "Visite 360°", href: "/visite-360" },
    { label: "À propos", href: "/a-propos" },
    { label: "Contact", href: "/contact" },
];

const SECONDARY_NAV = [
    { label: "Restaurateurs", href: "/restaurateurs" },
    { label: "Investisseurs", href: "/investisseurs" },
    { label: "Partenaires", href: "/partenaires" },
];

export default function Header() {
    const [open, setOpen] = useState(false);
    return (
        <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-slate-100">
            <div className="container-wide flex items-center justify-between h-[8vh] min-h-14 gap-3">
                <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="LeBonResto — accueil">
                    <Image
                        src="/assets/brand/lebonresto-mark.svg"
                        alt=""
                        aria-hidden="true"
                        width={44}
                        height={44}
                        priority
                        className="h-9 w-9 sm:h-10 sm:w-10"
                    />
                    <span className="font-display text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                        Le<span className="text-primary">Bon</span>Resto
                    </span>
                </Link>

                <nav className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8 min-w-0">
                    {NAV.map((n) => (
                        <Link
                            key={n.href}
                            href={n.href}
                            className="text-xs lg:text-sm font-medium text-slate-700 hover:text-primary transition-colors whitespace-nowrap"
                        >
                            {n.label}
                        </Link>
                    ))}
                </nav>

                <div className="hidden md:flex items-center gap-2 lg:gap-3 shrink-0">
                    <Link
                        href="/investisseurs"
                        className="text-xs lg:text-sm font-medium text-slate-500 hover:text-primary whitespace-nowrap"
                    >
                        Investisseurs
                    </Link>
                    <Link
                        href="/restaurateurs"
                        className="inline-flex items-center justify-center h-10 sm:h-11 rounded-full bg-primary px-4 lg:px-5 text-xs lg:text-sm font-semibold text-white hover:bg-primary-700 transition-colors whitespace-nowrap"
                    >
                        Inscrire mon resto
                    </Link>
                </div>

                <button
                    aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
                    aria-expanded={open}
                    aria-controls="mobile-menu"
                    onClick={() => setOpen((v) => !v)}
                    className="md:hidden inline-flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-slate-200 text-slate-700"
                >
                    {open ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            <div
                id="mobile-menu"
                className={cn(
                    "md:hidden overflow-hidden border-t border-slate-100 bg-white transition-[max-height] duration-300",
                    open ? "max-h-[calc(100vh-4rem)] overflow-y-auto py-4" : "max-h-0"
                )}
            >
                <div className="container-wide flex flex-col gap-2">
                    {NAV.map((n) => (
                        <Link
                            key={n.href}
                            href={n.href}
                            onClick={() => setOpen(false)}
                            className="rounded-xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 min-h-[44px] flex items-center"
                        >
                            {n.label}
                        </Link>
                    ))}
                    <div className="mt-1 flex flex-wrap gap-2">
                        {SECONDARY_NAV.map((n) => (
                            <Link
                                key={n.href}
                                href={n.href}
                                onClick={() => setOpen(false)}
                                className="rounded-full border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 min-h-[36px] inline-flex items-center"
                            >
                                {n.label}
                            </Link>
                        ))}
                    </div>
                    <Link
                        href="/restaurateurs"
                        onClick={() => setOpen(false)}
                        className="mt-2 w-full rounded-full bg-primary px-4 py-3 text-center text-sm font-semibold text-white min-h-[44px] inline-flex items-center justify-center"
                    >
                        Inscrire mon resto
                    </Link>
                </div>
            </div>
        </header>
    );
}
