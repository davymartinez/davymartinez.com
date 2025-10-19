/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	content: [
		"./app/**/*.{ts,tsx,mdx}",
		"./components/**/*.{ts,tsx}",
		"./content/**/*.mdx",
	],
	theme: {
		container: {
			center: true,
			padding: "1rem",
			screens: { "2xl": "1100px" },
		},
		extend: {
			colors: {
				// Semantic tokens powered by CSS variables
				background: "rgb(var(--background) / <alpha-value>)",
				foreground: "rgb(var(--foreground) / <alpha-value>)",
				muted: "rgb(var(--muted) / <alpha-value>)",
				"muted-foreground": "rgb(var(--muted-foreground) / <alpha-value>)",
				card: "rgb(var(--card) / <alpha-value>)",
				border: "rgb(var(--border) / <alpha-value>)",
				accent: "rgb(var(--accent) / <alpha-value>)",
				"accent-foreground": "rgb(var(--accent-foreground) / <alpha-value>)",
				ring: "rgb(var(--accent) / <alpha-value>)",
				success: "rgb(var(--success) / <alpha-value>)",
				warning: "rgb(var(--warning) / <alpha-value>)",
				danger: "rgb(var(--danger) / <alpha-value>)",
				info: "rgb(var(--info) / <alpha-value>)",
			},
			fontFamily: {
				sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
			},
		},
	},
	plugins: [require("@tailwindcss/typography")],
};
