import Link from "next/link";
import { getDictionary } from "@/lib/i18n";

export async function SiteFooter({ locale = "es" }: { locale?: "en" | "es" }) {
	const t = await getDictionary(locale);
	const year = new Date().getFullYear();

	return (
		<footer className="border-t border-border mt-12">
			<div className="container py-6 text-sm text-muted-foreground flex flex-col md:flex-row md:items-center md:justify-between gap-4">
				<p>{t.footer.copyright.replace("{year}", year.toString())}</p>
				<nav
					aria-label={locale === "en" ? "Footer" : "Pie de página"}
					className="flex flex-wrap gap-6"
				>
					<Link className="hover:text-foreground" href={`/${locale}/services`}>
						{t.nav.services}
					</Link>
					<Link className="hover:text-foreground" href={`/${locale}/about`}>
						{t.nav.about}
					</Link>
					<Link className="hover:text-foreground" href={`/${locale}/contact`}>
						{t.nav.contact}
					</Link>
				</nav>
			</div>
		</footer>
	);
}
