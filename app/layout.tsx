import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
	metadataBase: new URL("https://www.davymartinez.com"),
	title: {
		default: "David Martínez | On-Page SEO & EN→ES Translator",
		template: "%s | David Martínez",
	},
	description:
		"SEO optimization and English-to-Spanish translation services by David Martínez. Boost your site's visibility and connect with Spanish-speaking audiences.",
	manifest: "/site.webmanifest",

	// ✅ NEW — canonical + multilingual alternates
	alternates: {
		canonical: "/",
		languages: {
			en: "/en",
			es: "/es",
		},
	},

	// ✅ NEW — global OG + Twitter defaults (auto-extends per page)
	openGraph: {
		url: "https://www.davymartinez.com",
		type: "website",
		siteName: "David Martínez",
		title: "David Martínez | On-Page SEO & EN→ES Translator",
		description:
			"SEO optimization and English-to-Spanish translation services by David Martínez.",
		images: [
			{
				url: "https://www.davymartinez.com/og-image.jpg",
				width: 1200,
				height: 630,
				alt: "David Martínez — SEO & Translator",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "David Martínez | On-Page SEO & EN→ES Translator",
		description:
			"SEO optimization and English-to-Spanish translation services by David Martínez.",
		images: ["https://www.davymartinez.com/og-image.jpg"],
	},
};

const themeInit = `(() => {
	try {
		const root = document.documentElement;
		const storedTheme = localStorage.getItem('theme');
		const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		const isDark = storedTheme ? storedTheme === 'dark' : systemDark;
		if (isDark) root.classList.add('dark'); else root.classList.remove('dark');
	} catch (_) {}
})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
	const org = {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: "David Martínez",
		url: "https://www.davymartinez.com",
		logo: "https://www.davymartinez.com/avatar.jpg",
	};

	const person = {
		"@context": "https://schema.org",
		"@type": "Person",
		name: "David Martínez",
		url: "https://www.davymartinez.com",
		jobTitle: "On-Page SEO Specialist & English→Spanish Translator",
	};

	return (
		<html
			lang="es"
			className={`${inter.variable} theme-ocean`}
			suppressHydrationWarning
		>
			<body>
				<Script id="theme-init" strategy="beforeInteractive">
					{themeInit}
				</Script>
				{children}
				<JsonLd data={org} />
				<JsonLd data={person} />
			</body>
		</html>
	);
}
