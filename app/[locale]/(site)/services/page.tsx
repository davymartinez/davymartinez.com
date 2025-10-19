import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary } from "@/lib/i18n";

type Props = {
	params: { locale: "en" | "es" };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const t = await getDictionary(params.locale);
	return {
		title: t.services.h1,
		description:
			params.locale === "en"
				? "On-Page SEO and EN→ES Translation services for brands and content projects."
				: "Servicios de On-Page SEO y Traducción EN→ES para marcas y proyectos de contenido.",
	};
}

export default async function ServicesPage({ params }: Props) {
	const t = await getDictionary(params.locale);

	return (
		<article className="prose prose-slate dark:prose-invert max-w-none">
			<h1>{t.services.h1}</h1>

			{/* SEO section */}
			<section id="seo">
				<h2>{t.services.seo.h2}</h2>
				<ul>
					{t.services.seo.items.map((it: string, i: number) => (
						<li key={i}>{it}</li>
					))}
				</ul>
				<p>
					<Link href={`/${params.locale}/seo-portfolio`}>
						{params.locale === "en"
							? "See SEO portfolio →"
							: "Ver portfolio SEO →"}
					</Link>
				</p>
			</section>

			{/* Translation section */}
			<section id="translation">
				<h2>{t.services.translation.h2}</h2>
				<ul>
					{t.services.translation.items.map((it: string, i: number) => (
						<li key={i}>{it}</li>
					))}
				</ul>
				<p>
					<Link href={`/${params.locale}/translation-portfolio`}>
						{params.locale === "en"
							? "See translation portfolio →"
							: "Ver portfolio de traducción →"}
					</Link>
				</p>
			</section>
		</article>
	);
}
