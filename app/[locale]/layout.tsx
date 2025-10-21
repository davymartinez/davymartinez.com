import type { ReactNode } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Locale, isLocale } from "@/lib/i18n";
import type { Metadata } from "next";

export default function LocaleLayout({
	children,
	params,
}: {
	children: ReactNode;
	params: { locale: string };
}) {
	const locale: Locale = isLocale(params.locale) ? params.locale : "es";

	return (
		<div className="min-h-screen flex flex-col">
			<SiteHeader locale={locale} />
			<main className="container flex-1 py-10">{children}</main>
			<SiteFooter locale={locale} />
		</div>
	);
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
	const base = "https://www.davymartinez.com";
	const locale = params.locale === "es" ? "" : `/${params.locale}`;

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
