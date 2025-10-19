import fs from "fs";
import path from "path";
import Link from "next/link";
import { redirect } from "next/navigation"; // ✅ add this
import { getDictionary } from "@/lib/i18n";

type CaseStudy = {
	title: string;
	excerpt: string;
	whatIAchieved: string[];
	howIDidIt: string[];
	howMyWorkSupportsThem: string[];
};

export async function generateStaticParams() {
	const dir = path.join(process.cwd(), "content/portfolios/seo");
	const files = fs
		.readdirSync(dir)
		.filter(
			(f) => f.endsWith(".json") && !f.startsWith("_") && f !== "seo.json"
		);

	const locales = ["en", "es"];

	return locales.flatMap((locale) =>
		files.map((file) => ({
			locale,
			slug: file.replace(".json", ""),
		}))
	);
}

export default async function SeoCasePage({
	params,
}: {
	params: { locale: "en" | "es"; slug: string };
}) {
	const t = await getDictionary(params.locale);

	const baseDir = path.join(process.cwd(), "content/portfolios/seo");
	const localizedPath = path.join(baseDir, `${params.slug}.${params.locale}.json`);
	const fallbackPath = path.join(baseDir, `${params.slug}.en.json`);

	let data: CaseStudy | null = null;

	if (fs.existsSync(localizedPath)) {
		data = JSON.parse(fs.readFileSync(localizedPath, "utf-8")) as CaseStudy;
	} else if (fs.existsSync(fallbackPath)) {
		data = JSON.parse(fs.readFileSync(fallbackPath, "utf-8")) as CaseStudy;
	} else {
		redirect(`/${params.locale}/seo-portfolio`);
	}

	// ✅ TypeScript now knows data is definitely a CaseStudy
	return (
		<article className="prose prose-slate dark:prose-invert max-w-3xl">
			<nav className="text-sm mb-4 text-muted-foreground">
				<Link
					href={`/${params.locale}/seo-portfolio`}
					className="underline hover:text-foreground"
				>
					{t.caseStudy.backToPortfolio}
				</Link>{" "}
				/ <span className="text-foreground">{data.title}</span>
			</nav>

			<h1 className="text-3xl font-bold mb-2">{data.title}</h1>
			<p className="text-muted-foreground mb-8">{data.excerpt}</p>

			<section>
				<h2>{t.caseStudy.whatIAchieved}</h2>
				<ul>
					{data.whatIAchieved.map((item, i) => (
						<li key={i}>{item}</li>
					))}
				</ul>
			</section>

			<section>
				<h2>{t.caseStudy.howIDidIt}</h2>
				<ul>
					{data.howIDidIt.map((item, i) => (
						<li key={i}>{item}</li>
					))}
				</ul>
			</section>

			<section>
				<h2>{t.caseStudy.howMyWorkSupportsThem}</h2>
				<ul>
					{data.howMyWorkSupportsThem.map((item, i) => (
						<li key={i}>{item}</li>
					))}
				</ul>
			</section>
		</article>
	);
}