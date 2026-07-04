/**
 * ============================================================================
 * Blog — 3 articles de lancement (draft).
 * ============================================================================
 *
 * Ces articles sont volontairement marqués `draft: true`. Ils sont
 * rendus par /blog et /blog/[slug] dès aujourd'hui (soft-launch), mais
 * la mention `draft` permettra plus tard de les filtrer d'un flux
 * RSS / d'une newsletter, ou de les distinguer d'articles publiés
 * après relecture éditoriale.
 *
 * Convention :
 *  - Contenu 100 % original FR, ton premium marketplace.
 *  - Aucune statistique inventée. Les affirmations chiffrées sont soit
 *    reformulées de façon prudente ("selon notre expérience", "les
 *    restaurateurs que nous accompagnons rapportent…"), soit absentes.
 *  - Pas de citation de source externe non vérifiée.
 *  - Chaque article ≥ 400 mots répartis sur ≥ 5 sections.
 */

export interface BlogAuthor {
    name: string;
    avatarSrc?: string;
}

export interface BlogSection {
    heading: string;
    paragraphs: string[];
}

export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    cover: { src: string; alt: string };
    category: string;
    /** Temps de lecture estimé, en minutes. */
    readingTime: number;
    /** ISO-8601 date. */
    publishedAt: string;
    author: BlogAuthor;
    contentSections: BlogSection[];
    /**
     * Article rédigé mais pas encore relu par l'éditorial. Rendu quand même
     * pour le soft-launch — on filtrera plus tard sur les flux publics.
     */
    draft: true;
}

export const blogPosts: BlogPost[] = [
    {
        slug: "digitaliser-restaurant-premium-maroc-2026",
        title: "Comment digitaliser un restaurant premium au Maroc en 2026",
        excerpt:
            "Réservation directe, fiche riche, avis vérifiés : les 3 piliers qui séparent aujourd'hui un restaurant qui remplit sa salle d'un restaurant qui la subit.",
        cover: {
            src: "/assets/landing/heroes/restaurateur-tablet.jpg",
            alt: "Restaurateur consultant son back-office LeBonResto sur tablette",
        },
        category: "Stratégie digitale",
        readingTime: 7,
        publishedAt: "2026-07-01",
        author: {
            name: "L'équipe LeBonResto",
        },
        contentSections: [
            {
                heading: "Le contexte 2026",
                paragraphs: [
                    "En 2026, la question n'est plus de savoir si un restaurant marocain doit être présent en ligne. Elle est de savoir comment il choisit d'y apparaître. Un gourmet qui cherche une table à Casablanca, Marrakech ou Tanger commence rarement par appeler le restaurant : il vérifie d'abord la fiche Google, ouvre Instagram, cherche des avis, compare une ou deux adresses concurrentes, et décide en quelques minutes.",
                    "Cette bascule change tout pour les restaurants premium. Les codes de l'hôtellerie de luxe — service impeccable, cadre soigné, produits d'exception — restent la promesse. Mais l'entrée en matière, elle, se joue désormais sur un écran. Et c'est un point de contact que beaucoup d'établissements marocains sous-traitent encore à des tiers qui décident à leur place de l'ordre d'affichage, du wording, et du canal de réservation.",
                ],
            },
            {
                heading: "Ce que veulent les clients aujourd'hui",
                paragraphs: [
                    "Selon notre expérience auprès des restaurateurs que nous accompagnons, quatre attentes reviennent presque systématiquement chez les gourmets. La première : réserver en moins de trente secondes, sans créer de compte, sans télécharger d'application. La deuxième : voir de vraies photos récentes, de préférence tournées dans les conditions réelles de service — pas un shooting d'ouverture vieux de trois ans.",
                    "La troisième attente est l'accès à des informations pratiques immédiatement lisibles : plages horaires précises, politique d'acompte, options végétariennes, accessibilité, parking. La quatrième — et c'est probablement celle qui pèse le plus lourd sur la décision — l'accès à des avis vérifiés, ancrés sur des réservations réelles. Un avis anonyme sans historique de commande n'a plus la même valeur qu'il y a cinq ans.",
                ],
            },
            {
                heading: "Trois piliers d'une présence digitale premium",
                paragraphs: [
                    "Il existe une multitude d'outils, mais la stratégie tient en trois piliers. Premier pilier : une fiche restaurant unifiée, hébergée à un endroit que vous contrôlez, mise à jour en temps réel, et suffisamment riche pour tenir la comparaison avec les meilleures adresses de Paris, Dubaï ou Barcelone. Cette fiche doit être votre référentiel, celui que Google indexe, celui que vos partenaires citent.",
                    "Deuxième pilier : un canal de réservation direct, sans commission cachée, connecté à votre agenda de salle. Chaque réservation transférée à un intermédiaire est une réservation qui vous coûte double : la marge, et la relation client. Troisième pilier : un flux d'avis authentiques, capté après le service, filtré pour éviter la pollution des faux comptes, et exploité pour piloter la qualité en continu.",
                ],
            },
            {
                heading: "Les erreurs à éviter",
                paragraphs: [
                    "La première erreur, la plus fréquente, consiste à multiplier les canaux sans en maîtriser aucun. Une page Facebook laissée sans réponse, un profil Google incomplet, un lien de réservation qui pointe vers un formulaire cassé : chacun de ces détails, pris isolément, semble bénin. Cumulés, ils envoient un signal de désorganisation qui sabote la promesse premium.",
                    "Deuxième erreur : sous-traiter la relation client à une plateforme qui capte les données. Vous ne savez plus qui vient chez vous, à quelle fréquence, ce qu'il commande. Il devient impossible de fidéliser autrement qu'en misant sur la chance. Troisième erreur : ignorer les avis négatifs plutôt que d'y répondre. Un avis mal traité est visible ad vitam ; une réponse posée et professionnelle rassure autant les prochains lecteurs que l'auteur du commentaire.",
                ],
            },
            {
                heading: "Par où commencer sans se perdre",
                paragraphs: [
                    "Nous conseillons souvent aux restaurateurs de commencer par un audit court, en trois heures. Vérifier la cohérence de la fiche Google Business Profile. Faire le tour des avis publiés depuis six mois. Tester le parcours de réservation depuis un téléphone, en dehors du wifi du restaurant, à l'heure d'un service chargé. Ce simple exercice révèle en général deux ou trois frictions majeures qui coûtent des couverts chaque soir.",
                    "Ensuite, plutôt que de tout attaquer de front, il est probable qu'un plan en trois mois soit plus réaliste : mois 1, on remet la fiche à niveau et on branche un canal de réservation direct ; mois 2, on active un flux d'avis vérifiés et on structure les réponses ; mois 3, on enrichit avec les visuels, la carte digitale, la visite 360° si le lieu s'y prête. Cette progression permet d'observer les effets étape par étape sans perturber le service.",
                ],
            },
            {
                heading: "Le rôle de LeBonResto dans votre stratégie",
                paragraphs: [
                    "LeBonResto n'est pas conçu pour remplacer votre marque, mais pour la mettre en valeur dans un environnement dédié aux tables premium marocaines. Nous fournissons la fiche unifiée, le canal de réservation sans commission cachée, la modération des avis, l'accompagnement éditorial, et — pour les formules Premium et Pro — la production photo et la visite 360°.",
                    "Notre logique est simple : la scène gastronomique marocaine mérite un écrin digital à la hauteur de son ambition. Si votre établissement s'inscrit dans cette exigence, la première étape consiste à en discuter, sans engagement, pour évaluer si l'accompagnement correspond à votre feuille de route. Une démonstration prend environ trente minutes et donne une vision claire de ce qu'un back-office premium peut apporter à votre salle.",
                ],
            },
        ],
        draft: true,
    },
    {
        slug: "reserver-restaurant-marrakech-nouveau-standard",
        title: "Réserver un restaurant à Marrakech : le nouveau standard",
        excerpt:
            "La ville rouge a redéfini ses codes gastronomiques. Voici comment lire une fiche restaurant, choisir la bonne ambiance et éviter les mauvaises surprises.",
        cover: {
            src: "/assets/landing/heroes/about-emotional.jpg",
            alt: "Table dressée à Marrakech à l'heure bleue",
        },
        category: "Guide gastronomique",
        readingTime: 6,
        publishedAt: "2026-06-24",
        author: {
            name: "L'équipe LeBonResto",
        },
        contentSections: [
            {
                heading: "L'évolution du gourmet marrakchi",
                paragraphs: [
                    "Marrakech n'est plus la même ville qu'il y a dix ans, ni gastronomiquement ni socialement. La clientèle des tables premium s'est diversifiée : voyageurs internationaux exigeants, expatriés installés à l'année, jeunes cadres marocains prescripteurs sur les réseaux, familles de la diaspora en visite. Chacun de ces profils arrive avec ses propres références — Paris, Dubaï, Lisbonne, Londres — et attend un niveau d'information avant même de composer un numéro.",
                    "Ce qui a changé, c'est le tempo. Il est probable que la majorité des réservations premium se prennent aujourd'hui dans les 48 heures qui précèdent le service, souvent depuis un téléphone, entre deux visites de riad. Un site qui charge lentement, un menu introuvable ou une politique d'annulation confuse suffit à faire basculer la décision vers un concurrent. Le nouveau standard n'est pas plus généreux : il est plus rapide.",
                ],
            },
            {
                heading: "Ce que la réservation directe change",
                paragraphs: [
                    "La réservation directe — c'est-à-dire faite auprès du restaurant, sans intermédiaire qui capte la commission ni la donnée client — change trois choses concrètes. D'abord la marge : les restaurants que nous accompagnons rapportent qu'un couvert issu d'un canal direct pèse quelques points de plus en résultat net qu'un couvert acquis via une place de marché généraliste.",
                    "Ensuite la relation : le maître d'hôtel voit arriver un client dont il a le prénom, éventuellement l'historique, et peut adapter l'accueil. Enfin la fiabilité : quand la confirmation arrive du restaurant lui-même, la probabilité qu'un no-show reste sans rappel est plus faible, et les acomptes éventuels sont mieux compris par le client. Le nouveau standard marrakchi, celui des adresses qui remplissent leurs services sans stress, est presque toujours adossé à un canal de réservation direct maîtrisé.",
                ],
            },
            {
                heading: "Les meilleures adresses par ambiance",
                paragraphs: [
                    "Un dîner à Marrakech ne se choisit pas comme une simple case sur un plan. On choisit d'abord une ambiance : la médina à ciel ouvert dans un riad silencieux, le rooftop face à la Koutoubia à l'heure de la lumière rose, la table gastronomique intimiste dans un jardin d'hôtel, ou l'adresse chef à la cuisine ouverte dans un quartier résidentiel de l'Hivernage.",
                    "Sans citer d'adresse en particulier — nous préférons laisser cette sélection à l'édito de la plateforme — la règle empirique est simple : plus le décor est chargé sur Instagram, plus il est prudent de vérifier les avis récents. Une adresse instagrammable peut être excellente, mais l'ambiance vaut ce que valent le service et la cuisine ce soir-là. À l'inverse, certaines des expériences les plus mémorables se cachent derrière une devanture discrète. La qualité de la fiche digitale, encore une fois, est un premier filtre utile.",
                ],
            },
            {
                heading: "Comment lire une fiche restaurant en 30 secondes",
                paragraphs: [
                    "Une fiche bien construite raconte beaucoup en très peu de temps. En premier balayage visuel : les photos sont-elles récentes, cohérentes, prises dans le lieu réel — ou reprennent-elles une banque d'images générique ? La carte est-elle datée, avec ses prix, ou renvoie-t-elle à un fichier PDF de 2022 ?",
                    "Deuxième balayage : les informations pratiques. Les horaires précisent-ils déjeuner et dîner, jours d'ouverture, dernière prise de commande ? La politique d'annulation est-elle claire ? Y a-t-il une note sur la présence d'un menu végétarien, halal, ou d'options sans gluten ? Troisième balayage : la voix du restaurant. Répond-il aux avis récents ? Comment ? Un restaurant qui répond de façon posée et personnalisée à un client mécontent envoie un signal de professionnalisme qu'aucun budget publicitaire ne peut acheter.",
                ],
            },
            {
                heading: "Les avis vérifiés vs les avis anonymes",
                paragraphs: [
                    "Tous les avis n'ont pas la même valeur. Un avis anonyme, publié sur une plateforme qui n'exige aucune preuve de passage, se réfute mais se manipule tout aussi facilement. Un avis vérifié — associé à une réservation confirmée, à un service précis, à un client identifiable pour la plateforme mais anonyme pour le grand public — est nettement plus difficile à falsifier.",
                    "C'est le parti pris de LeBonResto : nous préférons peu d'avis fiables plutôt qu'un déluge d'avis bruités. Un lecteur averti apprend vite à distinguer les deux mondes. Sur nos fiches, la note s'accompagne d'un contexte : nombre de couverts, période de l'année, type de service. Cela permet à un futur client de comparer ce qui est comparable — un dîner en terrasse en été n'a pas les mêmes standards qu'un déjeuner d'affaires en février.",
                ],
            },
            {
                heading: "Notre sélection éditoriale Marrakech",
                paragraphs: [
                    "La sélection Marrakech de LeBonResto est éditoriale : nous ne référencerons jamais une adresse pour son seul volume de recherche. Chaque restaurant est passé au filtre d'un cahier des charges qui couvre la qualité de la cuisine, la constance du service, l'état du lieu, la clarté des informations pratiques et la réactivité aux avis.",
                    "Cette sélection est vivante. Elle s'enrichit chaque semaine, et il nous arrive de retirer une adresse dont la qualité s'est détériorée. Si vous êtes restaurateur à Marrakech et que vous souhaitez rejoindre cette sélection, la meilleure porte d'entrée reste une prise de contact directe : une démonstration nous permet de vous présenter la logique éditoriale, et à vous d'évaluer si l'écrin correspond à votre ambition.",
                ],
            },
        ],
        draft: true,
    },
    {
        slug: "visite-virtuelle-360-restaurants-conversion",
        title: "Visite virtuelle 360° : pourquoi les meilleurs restos investissent",
        excerpt:
            "Une visite immersive bien produite lève le doute du client avant qu'il ne clique. Voici ce qu'il faut savoir sur la technique, le coût et le ROI observé.",
        cover: {
            src: "/assets/landing/heroes/solution-cinematic.jpg",
            alt: "Vue 360° cinématographique d'une salle de restaurant premium",
        },
        category: "Visite 360°",
        readingTime: 8,
        publishedAt: "2026-06-17",
        author: {
            name: "L'équipe LeBonResto",
        },
        contentSections: [
            {
                heading: "L'impact sur la conversion en réservation",
                paragraphs: [
                    "Une visite virtuelle 360° change la nature même de la décision d'un futur client. Là où une galerie photo laisse un doute — le lieu est-il vraiment aussi élégant qu'il en a l'air, la salle est-elle bien insonorisée, la terrasse a-t-elle vraiment cette vue-là — la visite immersive répond avant qu'on ait besoin de poser la question. Elle transforme un pari en évidence.",
                    "Il est probable qu'une visite immersive bien produite améliore le taux de clic vers la réservation. Selon notre expérience avec les restaurants Premium et Pro, l'effet le plus tangible se lit sur la qualité du client qui arrive : un gourmet qui a déjà visité la salle en 3D ne se plaint pas de la décoration, ne demande pas si la terrasse est chauffée, ne s'étonne pas de la disposition des tables. Le service peut se concentrer sur l'essentiel.",
                ],
            },
            {
                heading: "Techniquement, comment ça marche",
                paragraphs: [
                    "Une visite 360° repose sur un principe simple : un ensemble d'images sphériques capturées depuis plusieurs points du restaurant, reliées entre elles par des « hotspots » cliquables. L'utilisateur navigue de point de vue en point de vue, tourne la tête à la souris ou au doigt, et se déplace dans le lieu comme s'il y était.",
                    "La capture se fait avec une caméra 360° (Insta360, Ricoh Theta, Matterport Pro, selon la plateforme). Chaque point de vue prend quelques minutes à shooter, avec un trépied, sous une lumière représentative du service. Un restaurant de taille moyenne se couvre en général en une demi-journée. Ensuite viennent le nettoyage colorimétrique, le raccord entre panoramas, l'ajout des hotspots (menu, réservation, focus sur un plat signature) et l'export pour le web.",
                ],
            },
            {
                heading: "Matterport vs Klapty vs Pannellum",
                paragraphs: [
                    "Trois écosystèmes se partagent aujourd'hui le marché. Matterport est le plus reconnu mondialement, offre un rendu dollhouse impressionnant, mais impose un abonnement récurrent et une chaîne de production propriétaire. Klapty est une option européenne plus légère, bien pensée pour l'hôtellerie et la restauration, avec un modèle plus modulaire.",
                    "Pannellum est une bibliothèque open source, gratuite, que l'on peut héberger soi-même. Elle offre moins de raffinement qu'une solution SaaS, mais garantit une indépendance totale et un coût d'exploitation nul à long terme. Chez LeBonResto, nous privilégions une chaîne qui reste maîtrisable par le restaurateur, sans dépendance abonnement, pour que la visite reste un actif et non une dépense récurrente. Le choix technique s'adapte au type d'établissement.",
                ],
            },
            {
                heading: "Le coût réel de production",
                paragraphs: [
                    "Le coût d'une visite 360° varie fortement selon le prestataire, le nombre de points de vue, la qualité des hotspots et la présence ou non d'un plan interactif. Un shoot simple, une dizaine de panoramas et une intégration basique se trouvent à un tarif d'entrée de gamme. Une production premium — traitement colorimétrique poussé, hotspots élaborés, plan d'ensemble navigable, intégration à la fiche restaurant — représente un investissement significativement plus élevé.",
                    "Nous préférons ne pas afficher de fourchette chiffrée ici : le prix dépend trop du contexte pour qu'un chiffre unique soit honnête. Ce qui compte, c'est de comprendre que le coût est un investissement ponctuel — pas un abonnement — et qu'il s'amortit sur toute la durée de vie de la salle, tant que la décoration ne change pas.",
                ],
            },
            {
                heading: "Le ROI observé sur les fiches enrichies",
                paragraphs: [
                    "Les restaurants Premium et Pro que nous accompagnons et qui ont ajouté une visite immersive rapportent en général deux effets. D'abord une meilleure qualité de trafic — les visiteurs qui ouvrent la fiche restent plus longtemps, cliquent davantage sur la réservation, et arrivent avec des attentes cadrées. Ensuite un effet moins mesurable mais souvent cité par les équipes de salle : moins d'appels de clarification, moins de « je ne savais pas que c'était comme ça ».",
                    "Il est important de rester prudent sur le calcul du retour sur investissement : la visite 360° n'agit pas seule, elle amplifie la qualité de la fiche déjà présente. Un lieu médiocrement mis en scène ne se transformera pas en destination gastronomique juste parce qu'on l'a filmé en 360°. Le ROI est réel, il est probablement significatif pour les tables premium, mais il se lit sur trois à six mois, pas sur la semaine qui suit la mise en ligne.",
                ],
            },
            {
                heading: "La production incluse dans les formules Premium et Pro",
                paragraphs: [
                    "Chez LeBonResto, la production de la visite 360° est incluse dans les formules Premium et Pro. Nous prenons en charge le shooting sur place, le traitement, l'intégration à votre fiche, et la maintenance des hotspots pendant toute la durée de l'accompagnement. C'est un choix éditorial : nous pensons que la qualité de la présentation ne devrait pas être un frein financier pour les restaurants qui portent la scène gastronomique marocaine.",
                    "Les formules restent proposées « sur devis » — l'ampleur du travail dépend du lieu, du nombre de salles, des extensions futures. Un rendez-vous d'une trentaine de minutes permet de cadrer le périmètre. Pour explorer concrètement le rendu, la page /visite-360 rassemble nos exemples les plus récents et détaille le processus de bout en bout.",
                ],
            },
        ],
        draft: true,
    },
];

/**
 * Toutes les catégories rencontrées dans les articles, sous forme
 * d'objets prêts à alimenter <BlogIndexHero />.
 */
export function getBlogCategories() {
    const counts = new Map<string, number>();
    for (const post of blogPosts) {
        counts.set(post.category, (counts.get(post.category) ?? 0) + 1);
    }
    return [
        { id: "all", label: "Tous les articles", count: blogPosts.length },
        ...Array.from(counts.entries()).map(([label, count]) => ({
            id: label.toLowerCase().replace(/\s+/g, "-"),
            label,
            count,
        })),
    ];
}

/** Retourne un article par slug, ou undefined si aucun ne correspond. */
export function getBlogPostBySlug(slug: string): BlogPost | undefined {
    return blogPosts.find((p) => p.slug === slug);
}

/** Slugs pour generateStaticParams. */
export function getBlogPostSlugs(): string[] {
    return blogPosts.map((p) => p.slug);
}
