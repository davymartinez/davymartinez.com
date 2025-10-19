import Link from "next/link";
import { Button } from "@/components/Button";
import { DuotoneAvatar } from "@/components/DuotoneAvatar";
import { AvailabilityBar } from "@/components/AvailabilityBar";
import { ClientLogoStrip } from "@/components/ClientLogoStrip";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";

export default async function HomePage({
	params,
}: {
	params: { locale: string };
}) {
	const locale: Locale = isLocale(params.locale)
		? (params.locale as Locale)
		: "es";
	const t = await getDictionary(locale);

	return (
		<section className="space-y-16">
			{/* HERO */}
			<div className="relative -mx-4 px-4 md:-mx-8 md:px-8">
				<div
					className="absolute inset-x-0 -top-10 h-[340px] md:h-[460px] hero-gradient pointer-events-none"
					aria-hidden="true"
				/>
				<header className="relative grid md:grid-cols-[1.25fr_1fr] items-center gap-8 py-16 md:py-28">
					<div>
						{/* Localized H1 */}
						<h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight text-gradient">
							{t.brand.tagline}
						</h1>

						{/* Localized tagline */}
						<p className="mt-3 text-lg md:text-xl text-muted-foreground">
							{t.brand.name}
						</p>

						{/* Localized CTAs */}
						<div className="mt-8 flex flex-wrap gap-3">
							<Button href={`/${locale}/contact`} variant="primary">
								{t.home.ctaPrimary}
							</Button>
							<Button href={`/${locale}/seo-portfolio`} variant="outline">
								{t.home.ctaSecondary}
							</Button>
							<Link href={`/${locale}/services`} className="btn btn-subtle">
								{t.cta.services}
							</Link>
						</div>

						<div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
							<span className="chip">{t.home.chips.onpage}</span>
							<span className="chip">{t.home.chips.content}</span>
							<span className="chip">{t.home.chips.audits}</span>
							<span className="chip">{t.home.chips.jsonld}</span>
							<span className="chip">{t.home.chips.translation}</span>
						</div>
					</div>

					<div className="flex justify-center md:justify-end">
						<DuotoneAvatar className="w-36 h-36 md:w-64 md:h-64" />
					</div>
				</header>
			</div>

			<AvailabilityBar status="limited" locale={params.locale} />
			{/* SERVICES */}
			<section className="mt-20">
				<h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
					{t.home.servicesSection.title}
				</h2>
				<div className="mt-4 grid gap-6 sm:grid-cols-3">
					{Object.values(t.home.servicesSection.items).map((service, idx) => {
						const s = service as { title: string; desc: string };
						return (
							<div key={idx}>
								<h3 className="text-xl font-medium">{s.title}</h3>
								<p className="text-slate-600 dark:text-slate-400">{s.desc}</p>
							</div>
						);
					})}
				</div>
			</section>

			<ClientLogoStrip locale={locale} />
			<div className="divider" />

			{/* FEATURED LINKS */}
			<section className="grid md:grid-cols-3 gap-6">
				<Card
					title={t.home.cards.seo.title}
					href={`/${locale}/services#seo`}
					desc={t.home.cards.seo.desc}
				/>
				<Card
					title={t.home.cards.translation.title}
					href={`/${locale}/services#translation`}
					desc={t.home.cards.translation.desc}
				/>
				<Card
					title={t.home.cards.blog.title}
					href={`/${locale}/blog`}
					desc={t.home.cards.blog.desc}
				/>
			</section>
		</section>
	);
}

function Card({
	title,
	desc,
	href,
}: {
	title: string;
	desc: string;
	href: string;
}) {
	return (
		<Link href={href} className="card">
			<h3 className="font-semibold">{title}</h3>
			<p className="text-sm text-muted-foreground">{desc}</p>
		</Link>
	);
}
