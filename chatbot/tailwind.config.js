/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#09090b",
                foreground: "#fafafa",
                primary: {
                    DEFAULT: "#f97316", // Odd Shoes Orange
                    foreground: "#fafafa",
                },
                card: {
                    DEFAULT: "#18181b", // Zinc 900
                    foreground: "#fafafa",
                },
                muted: {
                    DEFAULT: "#27272a", // Zinc 800
                    foreground: "#a1a1aa", // Zinc 400
                },
            },
        },
    },
    plugins: [],
}
