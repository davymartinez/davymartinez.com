import { getDictionary } from "@/lib/i18n";

export default async function NotFound() {
	// default to Spanish if locale not available
	const t = await getDictionary("es");

	return (
		<section className="min-h-[50vh] flex flex-col items-start justify-center gap-4 prose prose-slate dark:prose-invert">
			<h1>{t.notFound.title}</h1>
			<p>{t.notFound.message}</p>
			<a href="/es" className="underline">
				{t.notFound.cta}
			</a>
		</section>
	);
}
