"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

export interface ScrollRevealProps {
    children: ReactNode;
    /** Delay in seconds before the reveal starts. */
    delay?: number;
    /** Vertical translate (in px) for the initial state. */
    y?: number;
    /** Only animate once (default true). */
    once?: boolean;
    /** Optional wrapper class. */
    className?: string;
}

/**
 * ScrollReveal — Reusable scroll-triggered fade + lift wrapper.
 *
 * SSR-safe by design: content is VISIBLE on the server, on no-JS, on
 * crawlers, and under `prefers-reduced-motion`. The `opacity: 0` initial
 * state is only applied AFTER the component mounts on the client, which
 * means Framer Motion never renders invisible HTML on the server.
 *
 * - Respects `useReducedMotion()`: renders children directly with no wrapper.
 * - Uses `whileInView` with a `-40px 0px` viewport margin so the reveal
 *   fires slightly before the element enters the viewport.
 */
function ScrollReveal({
    children,
    delay = 0,
    y = 24,
    once = true,
    className,
}: ScrollRevealProps) {
    const prefersReducedMotion = useReducedMotion();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (prefersReducedMotion) {
        return <div className={cn(className)}>{children}</div>;
    }

    return (
        <motion.div
            className={cn(className)}
            initial={mounted ? { opacity: 0, y } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once, margin: "-40px 0px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay }}
        >
            {children}
        </motion.div>
    );
}

export default ScrollReveal;
