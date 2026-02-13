import type { Metadata } from "next";
import { Suspense, type ReactNode } from "react";
import "./globals.css";
import { JsonLd } from "@/components/JsonLd";
import AnalyticsListener from "@/components/AnalyticsListener";
import { GoogleTagManager } from "@next/third-parties/google"; // ✅ official GTM component

export const metadata: Metadata = {
	metadataBase: new URL("https://www.davymartinez.com"),
	title: {
		default: "David Martínez | On-Page SEO & EN→ES Translator",
		template: "%s | David Martínez",
	},
	description:
		"SEO optimization and English-to-Spanish translation services by David Martínez. Boost your site's visibility and connect with Spanish-speaking audiences.",
	manifest: "/site.webmanifest",
	alternates: {
		canonical: "/",
		languages: { en: "/en", es: "/es" },
	},
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

export default function RootLayout({
	children,
}: {
	children: ReactNode;
}) {
	const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

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
		<html lang="es" className="theme-ocean dark" suppressHydrationWarning>
			<body>
				{/* ✅ Official GTM loader */}
				{gtmId && <GoogleTagManager gtmId={gtmId} />}

				{children}

				<Suspense fallback={null}>
					<AnalyticsListener />
				</Suspense>

				<JsonLd data={org} />
				<JsonLd data={person} />
			</body>
		</html>
	);
}
