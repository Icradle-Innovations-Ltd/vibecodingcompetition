/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Odd Shoes actual brand colors (from oddshoes.dev)
                brand: {
                    coral: "#D95B43",       // Primary coral/terracotta
                    "coral-dark": "#C04A35", // Hover state
                    "coral-light": "#E8785F", // Light accent
                    charcoal: "#2D2D2D",    // Footer / dark sections
                    dark: "#1A1A1A",        // Darkest text
                    cream: "#FAF9F7",       // Off-white background
                    gray: "#6B6B6B",        // Muted text
                    "gray-light": "#F0EEEB", // Light borders/bg
                },
            },
            fontFamily: {
                sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
                serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
            },
        },
    },
    plugins: [],
}
