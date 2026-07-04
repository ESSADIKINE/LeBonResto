"use client";

import {
    forwardRef,
    useEffect,
    useRef,
    useState,
    type AnchorHTMLAttributes,
    type ButtonHTMLAttributes,
    type ReactNode,
} from "react";
import Link from "next/link";
import {
    motion,
    useMotionValue,
    useReducedMotion,
    useSpring,
} from "framer-motion";
import { cn } from "@/lib/cn";

type MagneticVariant = "primary" | "secondary" | "ghost";

interface MagneticCtaBaseProps {
    children: ReactNode;
    className?: string;
    variant?: MagneticVariant;
    /**
     * Max displacement (in pixels) the element will follow the cursor.
     * Defaults to 8.
     */
    strength?: number;
}

interface MagneticCtaAnchorProps
    extends MagneticCtaBaseProps,
        Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children"> {
    href: string;
    onClick?: AnchorHTMLAttributes<HTMLAnchorElement>["onClick"];
}

interface MagneticCtaButtonProps
    extends MagneticCtaBaseProps,
        Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "children"> {
    href?: undefined;
    type?: "button" | "submit" | "reset";
}

export type MagneticCtaProps = MagneticCtaAnchorProps | MagneticCtaButtonProps;

const variantClasses: Record<MagneticVariant, string> = {
    primary:
        "bg-primary text-white shadow-premium hover:bg-primary-700 hover:shadow-glow",
    secondary:
        "border-2 border-white/40 bg-white/5 backdrop-blur-sm text-white hover:bg-white hover:text-primary hover:border-white",
    ghost: "bg-transparent text-primary hover:bg-primary/5",
};

/**
 * MagneticCta — a button/link that subtly follows the cursor on hover.
 *
 * Uses framer-motion `useMotionValue` + `useSpring` for a buttery follow effect.
 * Max displacement is `strength` px in any direction. Resets on `mouseleave`.
 *
 * Respects `prefers-reduced-motion` — renders a regular link/button with no
 * motion when the user has reduced-motion enabled.
 */
const MagneticCta = forwardRef<HTMLElement, MagneticCtaProps>(function MagneticCta(
    props,
    forwardedRef,
) {
    const {
        children,
        className,
        variant = "primary",
        strength = 8,
        ...rest
    } = props as MagneticCtaBaseProps & {
        href?: string;
        onClick?: unknown;
        type?: "button" | "submit" | "reset";
    } & Record<string, unknown>;

    const prefersReducedMotion = useReducedMotion();
    const localRef = useRef<HTMLElement | null>(null);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined" || !window.matchMedia) return;
        const mq = window.matchMedia("(hover: none), (pointer: coarse)");
        const update = () => setIsTouchDevice(mq.matches);
        update();
        if (typeof mq.addEventListener === "function") {
            mq.addEventListener("change", update);
            return () => mq.removeEventListener("change", update);
        }
        // Safari < 14 fallback
        mq.addListener(update);
        return () => mq.removeListener(update);
    }, []);

    const disableMagnetic = prefersReducedMotion || isTouchDevice;

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
    const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

    const baseClasses = cn(
        "relative inline-flex items-center justify-center rounded-full h-11 md:h-12 min-h-[44px] px-5 sm:px-6 md:px-8 text-sm sm:text-base font-semibold transition-colors duration-300 will-change-transform",
        variantClasses[variant],
        className,
    );

    const setRef = (node: HTMLElement | null) => {
        localRef.current = node;
        if (typeof forwardedRef === "function") forwardedRef(node);
        else if (forwardedRef)
            (forwardedRef as React.MutableRefObject<HTMLElement | null>).current = node;
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        if (disableMagnetic) return;
        const el = localRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        // Normalize by half-size so corners ~ ±1, then clamp to ±1.
        const nx = Math.max(-1, Math.min(1, dx / (rect.width / 2)));
        const ny = Math.max(-1, Math.min(1, dy / (rect.height / 2)));
        x.set(nx * strength);
        y.set(ny * strength);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    // If reduced motion OR touch device (no hover), render a normal link/button with no motion.
    if (disableMagnetic) {
        if ("href" in props && props.href) {
            const { href, onClick, ...anchorRest } = rest as {
                href: string;
                onClick?: AnchorHTMLAttributes<HTMLAnchorElement>["onClick"];
            } & AnchorHTMLAttributes<HTMLAnchorElement>;
            return (
                <Link href={href} onClick={onClick} className={baseClasses} {...anchorRest}>
                    {children}
                </Link>
            );
        }
        const { type = "button", onClick, ...buttonRest } = rest as {
            type?: "button" | "submit" | "reset";
            onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
        } & ButtonHTMLAttributes<HTMLButtonElement>;
        return (
            <button type={type} onClick={onClick} className={baseClasses} {...buttonRest}>
                {children}
            </button>
        );
    }

    // Motion-enabled render.
    if ("href" in props && props.href) {
        const { href, onClick, ...anchorRest } = rest as {
            href: string;
            onClick?: AnchorHTMLAttributes<HTMLAnchorElement>["onClick"];
        } & AnchorHTMLAttributes<HTMLAnchorElement>;
        const MotionA = motion.a as unknown as React.ComponentType<Record<string, unknown>>;
        return (
            <MotionA
                ref={(node: HTMLElement | null) => setRef(node)}
                href={href}
                onClick={onClick}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ x: springX, y: springY }}
                className={baseClasses}
                {...(anchorRest as Record<string, unknown>)}
            >
                {children}
            </MotionA>
        );
    }

    const { type = "button", onClick, ...buttonRest } = rest as {
        type?: "button" | "submit" | "reset";
        onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
    } & ButtonHTMLAttributes<HTMLButtonElement>;
    const MotionButton = motion.button as unknown as React.ComponentType<Record<string, unknown>>;
    return (
        <MotionButton
            ref={(node: HTMLElement | null) => setRef(node)}
            type={type}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
            className={baseClasses}
            {...(buttonRest as Record<string, unknown>)}
        >
            {children}
        </MotionButton>
    );
});

export default MagneticCta;
