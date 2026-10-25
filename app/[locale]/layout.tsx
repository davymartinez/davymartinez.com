import type { ReactNode } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Locale, isLocale } from "@/lib/i18n";
import type { Metadata } from "next";

export default async function LocaleLayout({
	children,
	params,
}: {
	children: ReactNode;
	params: Promise<{ locale: string }>;
}) {
	const resolvedParams = await params;
	const locale: Locale = isLocale(resolvedParams.locale)
		? resolvedParams.locale
		: "es";

	return (
		<div lang={locale} className="min-h-dvh flex flex-col">
			<a href="#main-content" className="skip-link">
				{locale === "en" ? "Skip to content" : "Saltar al contenido"}
			</a>
			<SiteHeader locale={locale} />
			<main id="main-content" tabIndex={-1} className="container flex-1 py-10">
				{children}
			</main>
			<SiteFooter locale={locale} />
		</div>
	);
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const base = "https://www.davymartinez.com";
	const resolvedParams = await params;
	const locale =
		resolvedParams.locale === "es" ? "" : `/${resolvedParams.locale}`;

	return {
		alternates: {
			canonical: `${base}${locale}/`,
			languages: {
				en: `${base}/en`,
				es: `${base}/es`,
			},
		},
	};
}
