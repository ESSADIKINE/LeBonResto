import { cn } from "@/lib/cn";

export type ZellijAnchor =
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right";

export type ZellijFade = "tight" | "medium" | "wide";

export interface ZellijPatternProps {
    /** Image src. Default: /assets/landing/decor/zellige.png */
    src?: string;
    /** Peak opacity at the anchored corner. Clamped 0.05–0.35. Default 0.20. */
    opacity?: number;
    /** Which corner of the parent gets the full-opacity anchor. Default 'top-left'. */
    anchor?: ZellijAnchor;
    /**
     * Tightness of the diagonal fade.
     * - 'tight' fades by ~40% of the diagonal
     * - 'medium' (default) by ~60%
     * - 'wide' by ~85%
     */
    fade?: ZellijFade;
    /** Optional className passthrough on the root absolute div. */
    className?: string;
}

const DEFAULT_SRC = "/assets/landing/decor/zellige.png";

/**
 * Single-extract display. We do NOT tile the image — instead we render one
 * large slice of zellige.png anchored to a corner so the detail of the motif
 * reads clearly, and the diagonal mask fades it toward the opposite corner.
 * The image is sized as a percentage of the hero so it scales with viewport.
 */
const EXTRACT_W_PCT = "70%";
const EXTRACT_H_PCT = "auto";

const FADE_STOP: Record<ZellijFade, string> = {
    tight: "45%",
    medium: "65%",
    wide: "85%",
};

/* Radial-gradient positions. The pattern is opaque AT this point and
 * fades to transparent on both axes. Using radial (not linear) means the
 * fade happens on the OPPOSITE side (bottom and right when anchored
 * top-left), not just on the diagonal. */
const ANCHOR_RADIAL_POSITION: Record<ZellijAnchor, string> = {
    "top-left": "at top left",
    "top-right": "at top right",
    "bottom-left": "at bottom left",
    "bottom-right": "at bottom right",
};

const ANCHOR_BG_POSITION: Record<ZellijAnchor, string> = {
    "top-left": "top left",
    "top-right": "top right",
    "bottom-left": "bottom left",
    "bottom-right": "bottom right",
};

const MIN_OPACITY = 0.05;
const MAX_OPACITY = 0.35;
const DEFAULT_OPACITY = 0.2;

function clamp(value: number, min: number, max: number): number {
    return Math.min(max, Math.max(min, value));
}

/**
 * Moroccan zellij corner accent.
 *
 * Renders a seamlessly tiled SVG of 8-pointed stars (khatem) on the brand
 * teal as an absolutely positioned, full-bleed background pinned to one
 * corner of its `relative` parent. A diagonal mask gradient takes the
 * pattern from full opacity at the anchor to fully transparent toward the
 * opposite corner — a subtle nod to Moroccan identity without overwhelming
 * the hero content.
 *
 * The SVG already bakes in the LeBonResto teal (#016B61), so no additional
 * color overlay is needed — the pattern reads as intentional brand decor.
 *
 * Place inside a `relative` (or `isolate`) parent. Sibling foreground content
 * should sit on top via `relative z-10`.
 */
export default function ZellijPattern({
    src = DEFAULT_SRC,
    opacity = DEFAULT_OPACITY,
    anchor = "top-left",
    fade = "medium",
    className,
}: ZellijPatternProps) {
    const safeOpacity = clamp(opacity, MIN_OPACITY, MAX_OPACITY);
    const radialPos = ANCHOR_RADIAL_POSITION[anchor];
    const stop = FADE_STOP[fade];
    const bgPosition = ANCHOR_BG_POSITION[anchor];

    /* Radial ellipse from the anchor corner fades the pattern simultaneously
     * along the horizontal axis (toward the opposite side) and the vertical
     * axis (toward the opposite side). */
    const maskImage = `radial-gradient(ellipse 100% 100% ${radialPos}, black 0%, transparent ${stop})`;

    // Use a CSS custom property for opacity so we can scale it down on small
    // viewports via a Tailwind arbitrary media query without inline-style
    // specificity fighting the class.
    const style: React.CSSProperties = {
        // @ts-expect-error -- custom CSS property
        "--zellij-opacity": safeOpacity,
        opacity: "var(--zellij-opacity)",
        backgroundImage: `url('${src}')`,
        backgroundSize: `${EXTRACT_W_PCT} ${EXTRACT_H_PCT}`,
        backgroundPosition: bgPosition,
        backgroundRepeat: "no-repeat",
        WebkitMaskImage: maskImage,
        maskImage,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskSize: "100% 100%",
        maskSize: "100% 100%",
    };

    return (
        <div
            aria-hidden="true"
            className={cn(
                "absolute inset-0 z-0 pointer-events-none overflow-hidden",
                // Soften the decorative pattern on small phones so it doesn't
                // compete with hero text. Tailwind arbitrary class rewrites
                // --zellij-opacity to 60% of itself under 640px.
                "[@media(max-width:640px)]:[opacity:calc(var(--zellij-opacity)*0.6)]",
                className,
            )}
            style={style}
        />
    );
}
