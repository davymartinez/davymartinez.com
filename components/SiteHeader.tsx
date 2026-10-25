import { getDictionary } from "@/lib/i18n";
import { SiteNavigation } from "@/components/SiteNavigation";

export async function SiteHeader({ locale }: { locale: "en" | "es" }) {
	const t = await getDictionary(locale);
	const nav = [
		{ href: `/${locale}/services`, label: t.nav.services },
		{ href: `/${locale}/seo-portfolio`, label: t.nav.seoPortfolio },
		{ href: `/${locale}/translation-portfolio`, label: t.nav.trPortfolio },
		{ href: `/${locale}/about`, label: t.nav.about },
		{ href: `/${locale}/cv`, label: t.nav.cv },
		{ href: `/${locale}/blog`, label: t.nav.blog },
		{ href: `/${locale}/contact`, label: t.nav.contact },
	];
	return <SiteNavigation locale={locale} items={nav} />;
}
