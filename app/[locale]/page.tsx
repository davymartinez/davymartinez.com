import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { SectionReveals } from "@/components/SectionReveals";
import { Button } from "@/components/Button";
import { ClientLogoStrip } from "@/components/ClientLogoStrip";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getDictionary(isLocale(locale) ? locale : "es");
	return {
		title: { absolute: t.meta.title },
		description: t.meta.description,
		alternates: { canonical: `/${locale}` },
	};
}

export default async function HomePage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const resolvedParams = await params;
	const locale: Locale = isLocale(resolvedParams.locale)
		? resolvedParams.locale
		: "es";
	const t = await getDictionary(locale);
	const en = locale === "en";
	const services = [
		{ ...t.home.cards.seo, href: `/${locale}/services#seo`, number: "01" },
		{
			...t.home.cards.translation,
			href: `/${locale}/services#translation`,
			number: "02",
		},
	];
	return (
		<SectionReveals>
			<section className="hero" aria-labelledby="hero-heading">
				<div className="min-w-0">
					<p className="section-label mb-6">
						{t.brand.name}{" "}
						<span className="text-accent mx-2" aria-hidden="true">
							/
						</span>{" "}
						SEO & {en ? "translation" : "traducción"}
					</p>
					<h1 id="hero-heading" className="hero-title text-gradient">
						{t.home.headline}
					</h1>
					<p className="mt-6 max-w-xl text-lg text-muted-foreground">
						{t.home.hero}
					</p>
					<div className="mt-8 flex flex-wrap items-center gap-6">
						<Button href={`/${locale}/contact`}>
							{t.home.ctaPrimary}
							<span aria-hidden="true">↗</span>
						</Button>
						<Link
							href={`/${locale}/seo-portfolio`}
							className="text-link text-sm"
						>
							{t.home.ctaSecondary}
							<span aria-hidden="true">→</span>
						</Link>
					</div>
					<p className="mt-8 text-sm text-muted-foreground">
						{en
							? "Content audits · Internal linking · Structured data"
							: "Auditorías de contenido · Enlazado interno · Datos estructurados"}
					</p>
				</div>
				<figure className="mx-auto w-full max-w-xs lg:max-w-sm">
					<div className="portrait">
						<Image
							src="/avatar.jpg"
							alt="David Martínez"
							fill
							priority
							sizes="(min-width: 1024px) 384px, 320px"
						/>
					</div>
					<figcaption className="mt-4 flex justify-between gap-4 text-sm text-muted-foreground">
						<span>{t.brand.name}</span>
						<Link href={`/${locale}/about`} className="text-link">
							{t.nav.about} <span aria-hidden="true">↗</span>
						</Link>
					</figcaption>
				</figure>
			</section>

			<ClientLogoStrip locale={locale} />

			<section data-reveal aria-labelledby="services-heading">
				<div className="grid gap-4 md:grid-cols-2 mb-8">
					<div>
						<p className="section-label mb-4">{t.cta.services}</p>
						<h2
							id="services-heading"
							className="text-3xl md:text-4xl font-semibold tracking-tight"
						>
							{en ? "Make every word work." : "Que cada palabra trabaje."}
						</h2>
					</div>
					<p className="max-w-xl text-muted-foreground md:self-end">
						{en
							? "Help people find your website and understand what you offer. Explore how I can support your content."
							: "Ayudá a las personas a encontrar tu sitio y entender lo que ofrecés. Conocé cómo puedo trabajar en tu contenido."}
					</p>
				</div>
				<div className="space-y-4">
					{services.map((service) => (
						<Link
							key={service.href}
							href={service.href}
							className="service-row group"
						>
							<span className="text-sm text-muted-foreground tabular-nums">
								{service.number}
							</span>
							<div>
								<h3 className="text-2xl font-medium">{service.title}</h3>
								<p className="mt-4 max-w-xl text-muted-foreground">
									{service.desc}
								</p>
							</div>
							<span className="text-2xl text-accent" aria-hidden="true">
								↗
							</span>
						</Link>
					))}
				</div>
			</section>

			<section
				data-reveal
				className="grid gap-8 md:grid-cols-2 pb-8"
				aria-label={en ? "More from David" : "Más de David"}
			>
				<div className="rounded-2xl bg-muted p-8">
					<p className="section-label mb-4">
						{en ? "Notes & ideas" : "Notas e ideas"}
					</p>
					<h2 className="text-2xl font-semibold">{t.home.cards.blog.title}</h2>
					<p className="mt-4 mb-6 max-w-xl text-muted-foreground">
						{t.home.cards.blog.desc}
					</p>
					<Link href={`/${locale}/blog`} className="text-link">
						{en ? "Read the articles" : "Leer los artículos"}{" "}
						<span aria-hidden="true">→</span>
					</Link>
				</div>
				<div className="p-8">
					<p className="section-label mb-4">
						{en ? "Your next project" : "Tu próximo proyecto"}
					</p>
					<h2 className="text-2xl font-semibold">
						{en ? "What are you working on?" : "¿En qué estás trabajando?"}
					</h2>
					<p className="mt-4 mb-6 max-w-xl text-muted-foreground">
						{en
							? "Tell me about your website or the text you need translated."
							: "Contame sobre tu sitio o el texto que necesitás traducir."}
					</p>
					<Link href={`/${locale}/contact`} className="text-link">
						{en ? "Discuss your project" : "Consultar por tu proyecto"}{" "}
						<span aria-hidden="true">→</span>
					</Link>
				</div>
			</section>
		</SectionReveals>
	);
}
