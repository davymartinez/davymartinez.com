import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
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
	params: Promise<{ slug: string; locale: "en" | "es" }>;
}): Promise<Metadata> {
	const { locale, slug } = await params;
	const dir = path.join(process.cwd(), "content/posts", locale);
	const filePath = path.join(dir, `${slug}.mdx`);
	if (!fs.existsSync(filePath)) return { title: slug };

	const source = fs.readFileSync(filePath, "utf8");
	const { data } = matter(source);

	const base = "https://www.davymartinez.com";
	const localePath = locale === "es" ? "" : `/${locale}`;
	const url = `${base}${localePath}/blog/${slug}`;

	return {
		title: data.title || slug,
		description: data.description || data.excerpt || undefined,
		alternates: { canonical: url },

		// ✅ NEW — per-post OG & Twitter cards
		openGraph: {
			url,
			type: "article",
			title: data.title,
			description: data.description || data.excerpt,
			images: [
				{
					url: data.image
						? `${base}${data.image}`
						: `${base}/og-image.jpg`,
					width: 1200,
					height: 630,
					alt: data.title,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: data.title,
			description: data.description || data.excerpt,
			images: [
				data.image ? `${base}${data.image}` : `${base}/og-image.jpg`,
			],
		},
	};
}

export default async function PostPage({
	params,
}: {
	params: Promise<{ slug: string; locale: "en" | "es" }>;
}) {
	const { locale, slug } = await params;
	const localizedDir = path.join(process.cwd(), "content/posts", locale);
	const fallbackDir = path.join(process.cwd(), "content/posts/en");

	let filePath = path.join(localizedDir, `${slug}.mdx`);
	if (!fs.existsSync(filePath)) {
		filePath = path.join(fallbackDir, `${slug}.mdx`);
	}

	const source = fs.readFileSync(filePath, "utf8");
	const { data, content } = matter(source);
	const stats = readingTime(content);
	const t = await getDictionary(locale);
	const mdxSecurityOptions: MDXRemoteProps["options"] & Record<string, unknown> = {
		blockJS: true,
		blockDangerousJS: true,
	};

	return (
		<Prose className="max-w-3xl">
			<header className="mb-6">
				<h1 className="text-3xl font-bold mb-2">{data.title}</h1>
				<p className="text-sm text-muted-foreground">
					{new Date(data.date).toLocaleDateString(locale)} • {stats.text}
				</p>
				{data.tags && (
					<p className="text-xs text-muted-foreground mt-1">
						{data.tags.join(", ")}
					</p>
				)}
			</header>

			<MDXRemote source={content} options={mdxSecurityOptions} />

			<footer className="mt-8 border-t pt-4">
				<Link
					href={`/${locale}/blog`}
					className="underline text-sm text-muted-foreground hover:text-primary"
				>
					{t.blog.backToList}
				</Link>
			</footer>
		</Prose>
	);
}
