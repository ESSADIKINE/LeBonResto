import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./data/**/*.{js,ts}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                /* LeBonResto teal — primary brand */
                primary: {
                    DEFAULT: "#016B61",
                    50: "#e6f0ef",
                    100: "#b3d3cf",
                    200: "#80b6b0",
                    300: "#4d9890",
                    400: "#268278",
                    500: "#016B61",
                    600: "#015349",
                    700: "#014038",
                    800: "#002d27",
                    900: "#001a16",
                    foreground: "#ffffff",
                },
                secondary: {
                    DEFAULT: "#0f172a",
                    light: "#1e293b",
                },
                cream: {
                    50: "#fefdf8",
                    100: "#fdf9eb",
                    200: "#faf0d0",
                    300: "#f5e2a8",
                    400: "#eccd72",
                },
                danger: "#dc2626",
                success: "#16a34a",
                warning: "#f59e0b",
            },
            fontFamily: {
                sans: ["var(--font-poppins)", "ui-sans-serif", "system-ui", "sans-serif"],
                display: ["var(--font-poppins)", "ui-sans-serif", "sans-serif"],
            },
            fontSize: {
                /* Fluid clamp-based headline sizes — scale smoothly from mobile to desktop */
                "display-1": [
                    "clamp(2rem, 5vw + 1rem, 4.5rem)",
                    { lineHeight: "1.05", letterSpacing: "-0.02em" },
                ],
                "display-2": [
                    "clamp(1.5rem, 3vw + 1rem, 3rem)",
                    { lineHeight: "1.1", letterSpacing: "-0.015em" },
                ],
            },
            screens: {
                /* Extra-small breakpoint for tiny phones (≤360px design target) */
                xs: "375px",
            },
            spacing: {
                /* Header height token mirrors --header-h CSS var (h-16) */
                "header-h": "var(--header-h, 4rem)",
            },
            boxShadow: {
                premium: "0 10px 40px -10px rgba(0, 0, 0, 0.15)",
                glow: "0 0 0 1px rgba(1, 107, 97, 0.1), 0 20px 60px -20px rgba(1, 107, 97, 0.25)",
            },
            backgroundImage: {
                "brand-gradient": "linear-gradient(135deg, #016B61 0%, #014038 100%)",
                "cream-gradient": "linear-gradient(135deg, #fefdf8 0%, #fdf9eb 100%)",
            },
            animation: {
                "fade-up": "fade-up 0.6s ease-out forwards",
                "slow-spin": "slow-spin 30s linear infinite",
                float: "float 4s ease-in-out infinite",
                "marquee-left": "marquee-left 30s linear infinite",
                "marquee-right": "marquee-right 40s linear infinite",
            },
            keyframes: {
                "fade-up": {
                    from: { opacity: "0", transform: "translateY(20px)" },
                    to: { opacity: "1", transform: "translateY(0)" },
                },
                "slow-spin": {
                    from: { transform: "rotate(0deg)" },
                    to: { transform: "rotate(360deg)" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-8px)" },
                },
                "marquee-left": {
                    from: { transform: "translateX(0)" },
                    to: { transform: "translateX(-50%)" },
                },
                "marquee-right": {
                    from: { transform: "translateX(-50%)" },
                    to: { transform: "translateX(0)" },
                },
            },
        },
    },
    plugins: [],
};
export default config;
