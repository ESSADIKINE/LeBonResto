import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLdOrganization from "@/components/seo/JsonLdOrganization";
import StickyWhatsAppSupport from "@/components/landing/StickyWhatsAppSupport";
import Analytics from "@/components/analytics/Analytics";
import CookieConsent from "@/components/consent/CookieConsent";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800"],
    variable: "--font-poppins",
    display: "swap",
});

export const metadata: Metadata = {
    metadataBase: new URL("https://lebonresto.ma"),
    title: {
        default: "LeBonResto — Marketplace gastronomique au Maroc",
        template: "%s | LeBonResto",
    },
    description:
        "Découverte, réservation, offres et avis vérifiés : la plateforme tout-en-un pour les meilleurs restaurants au Maroc.",
    openGraph: {
        siteName: "LeBonResto",
        locale: "fr_FR",
        type: "website",
    },
    twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
    themeColor: "#016B61",
    width: "device-width",
    initialScale: 1,
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="fr" className={poppins.variable}>
            <body className="font-sans antialiased bg-white text-slate-900">
                <JsonLdOrganization />
                <Header />
                <main>{children}</main>
                <Footer />
                {/* CookieConsent sits at z-40 — below the sticky WhatsApp
                    widget at z-50 — and drives Analytics via the
                    `lbr-consent-changed` custom event + `lbr_consent_v1`
                    localStorage key. */}
                <CookieConsent />
                <StickyWhatsAppSupport />
                <Analytics />
            </body>
        </html>
    );
}
