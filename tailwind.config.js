
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#b10f2e", // Madder for primary actions
                    // Add other shades if needed
                    dark: "#8f0c24",
                    light: "#eb163d",
                },
                secondary: {
                    DEFAULT: "#570000", // Rosewood for secondary elements
                    // Add other shades if needed
                    dark: "#450000",
                    light: "#ab0000",
                },
                accent: {
                    DEFAULT: "#de7c5a", // Burnt Sienna for accent elements
                    // Add other shades if needed
                    dark: "#d05329",
                    light: "#e5957a",
                },
                neutral: {
                    DEFAULT: "#280000", // Black Bean as a neutral or background color
                    // Add other shades if needed
                    dark: "#210000",
                    light: "#870000",
                },
                white: {
                    DEFAULT: "#fdffff", // White for backgrounds and UI elements
                    // Add other shades if needed
                    100: "#ffffff",
                },
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [],
}
