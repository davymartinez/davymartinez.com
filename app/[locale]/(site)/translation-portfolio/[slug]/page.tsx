import fs from "fs";
import path from "path";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getDictionary } from "@/lib/i18n";

type TranslationCase = {
	title: string;
	excerpt: string;
	sourceText: string;
	targetText: string;
};

export async function generateStaticParams() {
	const dir = path.join(process.cwd(), "content/portfolios/translation");
	const files = fs
		.readdirSync(dir)
		.filter((f) => f.endsWith(".en.json") || f.endsWith(".es.json"));

	const locales = ["en", "es"];

	return locales.flatMap((locale) =>
		files
			.filter((f) => f.endsWith(".en.json")) // only use EN as source of slugs
			.map((file) => ({
				locale,
				slug: file.replace(".en.json", ""),
			}))
	);
}

export default async function TranslationCasePage({
	params,
}: {
	params: { locale: "en" | "es"; slug: string };
}) {
	const t = await getDictionary(params.locale);

	const baseDir = path.join(process.cwd(), "content/portfolios/translation");
	const localizedPath = path.join(baseDir, `${params.slug}.${params.locale}.json`);
	const fallbackPath = path.join(baseDir, `${params.slug}.en.json`);

	let localizedData: { title: string; excerpt: string };
	let caseData: TranslationCase;

	// Localized title/excerpt
	if (fs.existsSync(localizedPath)) {
		localizedData = JSON.parse(fs.readFileSync(localizedPath, "utf-8"));
	} else if (fs.existsSync(fallbackPath)) {
		localizedData = JSON.parse(fs.readFileSync(fallbackPath, "utf-8"));
	} else {
		redirect(`/${params.locale}/translation-portfolio`);
	}

	// Main content (always from English file)
	const englishFile = path.join(baseDir, `${params.slug}.en.json`);
	if (fs.existsSync(englishFile)) {
		caseData = JSON.parse(fs.readFileSync(englishFile, "utf-8"));
	} else {
		redirect(`/${params.locale}/translation-portfolio`);
	}

	return (
		<article className="prose prose-slate dark:prose-invert max-w-3xl">
			<nav className="text-sm mb-4 text-muted-foreground">
				<Link
					href={`/${params.locale}/translation-portfolio`}
					className="underline hover:text-foreground"
				>
					{t.translationCase.backToPortfolio}
				</Link>{" "}
				/ <span className="text-foreground">{localizedData.title}</span>
			</nav>

			<h1 className="text-3xl font-bold mb-2">{localizedData.title}</h1>
			<p className="text-muted-foreground mb-8">{localizedData.excerpt}</p>

			<section>
				<h2>{t.translationCase.sourceText}</h2>
				<blockquote className="border-l-4 pl-4 text-muted-foreground">
					{caseData.sourceText}
				</blockquote>
			</section>

			<section>
				<h2>{t.translationCase.targetText}</h2>
				<blockquote className="border-l-4 pl-4 text-foreground">
					{caseData.targetText}
				</blockquote>
			</section>
		</article>
	);
}
