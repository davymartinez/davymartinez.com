import fs from "fs";
import path from "path";
import { CaseCard } from "@/components/CaseCard";
import { getDictionary } from "@/lib/i18n";

type TranslationCase = {
	slug: string;
	title: string;
	tag: string;
	excerpt: string;
};

export default async function TranslationPortfolioPage({
	params,
}: {
	params: { locale: "en" | "es" };
}) {
	const t = await getDictionary(params.locale);

	const baseDir = path.join(process.cwd(), "content/portfolios/translation");

	const files = fs
		.readdirSync(baseDir)
		.filter(
			(f) =>
				f.endsWith(".json") &&
				(f.endsWith(".en.json") || f.endsWith(".es.json")) &&
				!f.startsWith("_") &&
				!f.includes(".bak")
		);

	const uniqueSlugs = Array.from(new Set(files.map((f) => f.split(".")[0])));

	const cases: TranslationCase[] = uniqueSlugs.map((slug) => {
		const localizedPath = path.join(baseDir, `${slug}.${params.locale}.json`);
		const fallbackPath = path.join(baseDir, `${slug}.en.json`);

		let data: { title: string; excerpt: string };

		if (fs.existsSync(localizedPath)) {
			data = JSON.parse(fs.readFileSync(localizedPath, "utf-8"));
		} else if (fs.existsSync(fallbackPath)) {
			data = JSON.parse(fs.readFileSync(fallbackPath, "utf-8"));
		} else {
			return {
				slug,
				title: slug,
				tag: "Translation",
				excerpt: "",
			};
		}

		return {
			slug,
			title: data.title,
			tag: t.translationPortfolio.tag,
			excerpt: data.excerpt,
		};
	});

	return (
		<section className="space-y-6">
			<h1 className="text-3xl font-bold">{t.translationPortfolio.h1}</h1>
			<ul className="grid md:grid-cols-2 gap-6">
				{cases.map((c) => (
					<li key={c.slug}>
						<CaseCard
							{...c}
							readMore={t.translationPortfolio.readMore}
							basePath={`${params.locale}/translation-portfolio`}
						/>
					</li>
				))}
			</ul>
		</section>
	);
}
