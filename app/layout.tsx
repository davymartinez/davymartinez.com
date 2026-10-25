import type { Metadata } from "next";
import { Suspense, type ReactNode } from "react";
import "./globals.css";
import { JsonLd } from "@/components/JsonLd";
import AnalyticsListener from "@/components/AnalyticsListener";
import { GoogleTagManager } from "@next/third-parties/google"; // ✅ official GTM component
import localFont from "next/font/local";

const manrope = localFont({
	src: [
		{ path: "../public/fonts/manrope-regular.ttf", weight: "400" },
		{ path: "../public/fonts/manrope-medium.ttf", weight: "500" },
		{ path: "../public/fonts/manrope-semibold.ttf", weight: "600" },
	],
	variable: "--font-manrope",
	display: "swap",
});

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
				url: "https://www.davymartinez.com/avatar.jpg",
				width: 512,
				height: 512,
				alt: "David Martínez — SEO & Translator",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "David Martínez | On-Page SEO & EN→ES Translator",
		description:
			"SEO optimization and English-to-Spanish translation services by David Martínez.",
		images: ["https://www.davymartinez.com/avatar.jpg"],
	},
};

export default async function RootLayout({
	children,
	params,
}: {
	children: ReactNode;
	params: Promise<{ locale?: string }>;
}) {
	const { locale } = await params;
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
		<html
			lang={locale === "en" ? "en" : "es"}
			className={`${manrope.variable} dark`}
			suppressHydrationWarning
		>
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
