import { redirect } from "next/navigation";

/**
 * Le hub d'orientation a été retiré au profit d'une expérience produit unique.
 * La racine `/` redirige donc directement vers la page de présentation de la
 * solution, qui sert maintenant de homepage canonique.
 */
export default function Home() {
    redirect("/notre-solution");
}
