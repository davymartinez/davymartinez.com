import { getDictionary } from "@/lib/i18n";
import Link from "next/link";

export default async function NotFound({
	params,
}: {
	params?: { locale?: string };
}) {
	// Safely normalize locale even if undefined
	const safeLocale: "en" | "es" = params?.locale === "en" ? "en" : "es";
	const t = await getDictionary(safeLocale);

	return (
		<section className="min-h-[50vh] flex flex-col items-start justify-center gap-4 prose prose-slate dark:prose-invert">
			<h1>{t.notFound.title}</h1>
			<p>{t.notFound.message}</p>
			<Link href={`/${safeLocale}`} className="underline">
				{t.notFound.cta}
			</Link>
		</section>
	);
}
