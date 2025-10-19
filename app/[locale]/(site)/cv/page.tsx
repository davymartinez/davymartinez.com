import { getDictionary } from "@/lib/i18n";

export default async function CVPage({
	params,
}: {
	params: { locale: "en" | "es" };
}) {
	const t = await getDictionary(params.locale);

	return (
		<article className="prose prose-slate dark:prose-invert max-w-none">
			<h1>{t.cv.h1}</h1>
			<p>{t.cv.intro}</p>
			<ul>
				{t.cv.items.map((it: string, i: number) => (
					<li key={i}>{it}</li>
				))}
			</ul>
		</article>
	);
}
