import { getDictionary } from "@/lib/i18n";

export async function SiteFooter({ locale = "es" }: { locale?: "en" | "es" }) {
	const t = await getDictionary(locale);
	const year = new Date().getFullYear();

	return (
		<footer className="border-t border-border mt-12">
			<div className="container py-6 text-sm text-muted-foreground flex flex-col md:flex-row md:items-center md:justify-between gap-4">
				<p>{t.footer.copyright.replace("{year}", year.toString())}</p>
				<p>
					<a className="underline" href="/site.webmanifest">
						{t.footer.pwa}
					</a>{" "}
					·{" "}
					<a className="underline" href="/robots.txt">
						{t.footer.robots}
					</a>
				</p>
			</div>
		</footer>
	);
}
