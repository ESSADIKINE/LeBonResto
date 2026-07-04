const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "LeBonResto",
    url: "https://lebonresto.ma",
    logo: "https://lebonresto.ma/assets/brand/lebonresto-logo.svg",
    contactPoint: [
        {
            "@type": "ContactPoint",
            telephone: "+212644440525",
            contactType: "customer service",
            areaServed: "MA",
            availableLanguage: ["French"],
        },
        {
            "@type": "ContactPoint",
            email: "le.bon.restau@gmail.com",
            contactType: "partnerships",
            areaServed: "MA",
            availableLanguage: ["French"],
        },
    ],
};

export default function JsonLdOrganization() {
    return (
        <script
            type="application/ld+json"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(organizationJsonLd),
            }}
        />
    );
}
