import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Prose } from "@/components/Prose";
import { getDictionary } from "@/lib/i18n";
import Link from "next/link";
import type { Metadata } from "next";

export const dynamic = "force-static";

export async function generateStaticParams() {
	const enDir = path.join(process.cwd(), "content/posts/en");
	const esDir = path.join(process.cwd(), "content/posts/es");

	const enFiles = fs.existsSync(enDir)
		? fs.readdirSync(enDir).filter((f) => f.endsWith(".mdx"))
		: [];
	const esFiles = fs.existsSync(esDir)
		? fs.readdirSync(esDir).filter((f) => f.endsWith(".mdx"))
		: [];

	const locales = ["en", "es"];
	const slugs = new Set([...enFiles, ...esFiles].map((f) => f.replace(/\.mdx$/, "")));

	return [...slugs].flatMap((slug) =>
		locales.map((locale) => ({ slug, locale }))
	);
}

export async function generateMetadata({
	params,
}: {
	params: { slug: string; locale: "en" | "es" };
}): Promise<Metadata> {
	const dir = path.join(process.cwd(), "content/posts", params.locale);
	const filePath = path.join(dir, `${params.slug}.mdx`);
	if (!fs.existsSync(filePath)) return { title: params.slug };

	const source = fs.readFileSync(filePath, "utf8");
	const { data } = matter(source);
	return { title: data.title || params.slug };
}

export default async function PostPage({
	params,
}: {
	params: { slug: string; locale: "en" | "es" };
}) {
	const localizedDir = path.join(process.cwd(), "content/posts", params.locale);
	const fallbackDir = path.join(process.cwd(), "content/posts/en");

	let filePath = path.join(localizedDir, `${params.slug}.mdx`);
	if (!fs.existsSync(filePath)) {
		filePath = path.join(fallbackDir, `${params.slug}.mdx`);
	}

	const source = fs.readFileSync(filePath, "utf8");
	const { data, content } = matter(source);
	const stats = readingTime(content);
	const t = await getDictionary(params.locale);

	return (
		<Prose className="max-w-3xl">
			<header className="mb-6">
				<h1 className="text-3xl font-bold mb-2">{data.title}</h1>
				<p className="text-sm text-muted-foreground">
					{new Date(data.date).toLocaleDateString(params.locale)} • {stats.text}
				</p>
				{data.tags && (
					<p className="text-xs text-muted-foreground mt-1">
						{data.tags.join(", ")}
					</p>
				)}
			</header>

			<MDXRemote source={content} />

			<footer className="mt-8 border-t pt-4">
				<Link
					href={`/${params.locale}/blog`}
					className="underline text-sm text-muted-foreground hover:text-primary"
				>
					{t.blog.backToList}
				</Link>
			</footer>
		</Prose>
	);
}
