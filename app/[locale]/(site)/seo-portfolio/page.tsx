import fs from "fs";
import path from "path";
import { CaseCard } from "@/components/CaseCard";
import { getDictionary } from "@/lib/i18n";

type Case = {
	slug: string;
	title: string;
	tag: string;
	excerpt: string;
};

export default async function SeoPortfolioPage({
	params,
}: {
	params: { locale: "en" | "es" };
}) {
	const t = await getDictionary(params.locale);

	const baseDir = path.join(process.cwd(), "content/portfolios/seo");

	// Get all unique slugs (strip .en.json / .es.json suffixes)
	const files = fs
		.readdirSync(baseDir)
		.filter(
			(f) =>
				f.endsWith(".json") &&
				(f.endsWith(".en.json") || f.endsWith(".es.json")) &&
				!f.startsWith("_") &&
				!f.includes(".bak")
		);

	const uniqueSlugs = Array.from(
		new Set(files.map((f) => f.split(".")[0])) // e.g. "caso-seo-120"
	);

	const cases: Case[] = uniqueSlugs.map((slug) => {
		const localizedPath = path.join(baseDir, `${slug}.${params.locale}.json`);
		const fallbackPath = path.join(baseDir, `${slug}.en.json`);

		let data: { title: string; excerpt: string };

		if (fs.existsSync(localizedPath)) {
			data = JSON.parse(fs.readFileSync(localizedPath, "utf-8"));
		} else if (fs.existsSync(fallbackPath)) {
			data = JSON.parse(fs.readFileSync(fallbackPath, "utf-8"));
		} else {
			// If neither file exists, skip or return a placeholder
			return {
				slug,
				title: slug,
				tag: "SEO",
				excerpt: "",
			};
		}

		return {
			slug,
			title: data.title,
			tag: "SEO",
			excerpt: data.excerpt,
		};
	});

	return (
		<section className="space-y-6">
			<h1 className="text-3xl font-bold">{t.seoPortfolio.h1}</h1>
			<ul className="grid md:grid-cols-2 gap-6">
				{cases.map((c) => (
					<li key={c.slug}>
						<CaseCard
							{...c}
							readMore={t.seoPortfolio.readMore}
							basePath={`${params.locale}/seo-portfolio`}
						/>
					</li>
				))}
			</ul>
		</section>
	);
}
