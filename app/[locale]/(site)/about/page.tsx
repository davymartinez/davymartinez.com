import Image from "next/image";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { Prose } from "@/components/Prose";

export default async function AboutPage({
	params,
}: {
	params: { locale: string };
}) {
	const locale: Locale = isLocale(params.locale)
		? (params.locale as Locale)
		: "es";
	const t = await getDictionary(locale);

	return (
		<Prose>
			<h1>{t.about.h1}</h1>
			<Image
				src="/avatar.jpg"
				alt={t.about.alt}
				className="rounded-xl border border-border"
				width={160}
				height={160}
			/>
			<p>{t.about.blurb1}</p>
			<h2>{t.about.h2}</h2>
			<ul>
				{t.about.bullets.map((b: string, i: number) => (
					<li key={i}>{b}</li>
				))}
			</ul>
		</Prose>
	);
}
