"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

export interface HoverScrollImageProps {
    src: string;
    alt: string;
    onError?: () => void;
    /** Duration of the downward sweep in seconds. Default 14. */
    enterDuration?: number;
    /** Duration of the return-to-top in seconds. Default 1.6. */
    leaveDuration?: number;
    className?: string;
}

/**
 * Displays a tall image inside an overflow-hidden frame. On parent hover
 * (desktop), the inner image smoothly pans vertically from top to bottom
 * across `enterDuration` seconds, then returns to top on mouse leave.
 *
 * Uses plain <img> so the natural aspect ratio is preserved and a tall
 * screenshot overflows the frame vertically — that overflow is what we pan.
 * Respects prefers-reduced-motion (stays anchored at top).
 */
export default function HoverScrollImage({
    src,
    alt,
    onError,
    enterDuration = 14,
    leaveDuration = 1.6,
    className,
}: HoverScrollImageProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLImageElement>(null);
    const controls = useAnimation();
    const prefersReducedMotion = useReducedMotion();
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined" || !window.matchMedia) return;
        const hoverMq = window.matchMedia("(hover: none), (pointer: coarse)");
        const sizeMq = window.matchMedia("(max-width: 640px)");
        const update = () => {
            setIsTouchDevice(hoverMq.matches);
            setIsSmallScreen(sizeMq.matches);
        };
        update();
        const add = (mq: MediaQueryList) => {
            if (typeof mq.addEventListener === "function") mq.addEventListener("change", update);
            else mq.addListener(update);
        };
        const remove = (mq: MediaQueryList) => {
            if (typeof mq.removeEventListener === "function") mq.removeEventListener("change", update);
            else mq.removeListener(update);
        };
        add(hoverMq);
        add(sizeMq);
        return () => {
            remove(hoverMq);
            remove(sizeMq);
        };
    }, []);

    const handleEnter = () => {
        if (prefersReducedMotion || isTouchDevice) return;
        const cH = containerRef.current?.clientHeight ?? 0;
        const cW = containerRef.current?.clientWidth ?? 0;
        const nW = innerRef.current?.naturalWidth ?? 0;
        const nH = innerRef.current?.naturalHeight ?? 0;
        if (!cH || !cW || !nW || !nH) return;
        const renderedH = (nH * cW) / nW;
        const distance = Math.max(0, renderedH - cH);
        if (distance <= 0) return;
        const duration = isSmallScreen ? Math.max(4, enterDuration / 2) : enterDuration;
        controls.start({
            y: -distance,
            transition: { duration, ease: [0.45, 0, 0.55, 1] },
        });
    };
    const handleLeave = () => {
        if (prefersReducedMotion || isTouchDevice) return;
        controls.start({
            y: 0,
            transition: { duration: leaveDuration, ease: "easeOut" },
        });
    };

    const interactionHandlers = isTouchDevice
        ? {}
        : { onMouseEnter: handleEnter, onMouseLeave: handleLeave };

    return (
        <div
            ref={containerRef}
            className={cn("relative h-full w-full", className)}
            {...interactionHandlers}
        >
            <motion.div
                animate={controls}
                initial={{ y: 0 }}
                className="absolute inset-x-0 top-0 will-change-transform"
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    ref={innerRef}
                    src={src}
                    alt={alt}
                    onError={onError}
                    draggable={false}
                    className="block w-full select-none"
                />
            </motion.div>
        </div>
    );
}
