import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { getDictionary } from "@/lib/i18n";
import readingTime from "reading-time";

export const dynamic = "force-static";

type PostMeta = {
	slug: string;
	title: string;
	excerpt: string;
	date: string;
	tags: string[];
	readingTime: string;
};

function getPosts(locale: "en" | "es"): PostMeta[] {
	const dir = path.join(process.cwd(), "content", "posts", locale);
	if (!fs.existsSync(dir)) return [];

	const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
	return files.map((filename) => {
		const slug = filename.replace(/\.mdx$/, "");
		const source = fs.readFileSync(path.join(dir, filename), "utf8");
		const { data, content } = matter(source);
		const stats = readingTime(content);

		return {
			slug,
			title: data.title || slug,
			excerpt: data.excerpt || "",
			date: data.date || "",
			tags: data.tags || [],
			readingTime: stats.text,
		};
	});
}

export default async function BlogIndex({
	params,
}: {
	params: { locale: "en" | "es" };
}) {
	const t = await getDictionary(params.locale);

	let posts = getPosts(params.locale);

	// Fallback: if no localized posts, show English ones
	if (posts.length === 0 && params.locale !== "en") {
		posts = getPosts("en");
	}

	return (
		<section className="space-y-8">
			<h1 className="text-3xl font-bold">{t.blog.h1}</h1>
			{posts.length === 0 ? (
				<p className="text-muted-foreground">{t.blog.empty}</p>
			) : (
				<ul className="space-y-6">
					{posts.map((post) => (
						<li key={post.slug}>
							<article className="space-y-2">
								<Link
									href={`/${params.locale}/blog/${post.slug}`}
									className="group"
								>
									<h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
										{post.title}
									</h2>
								</Link>
								<p className="text-muted-foreground text-sm">{post.excerpt}</p>
								<div className="text-xs text-muted-foreground flex flex-wrap gap-2">
									<span>{new Date(post.date).toLocaleDateString(params.locale)}</span>
									<span>•</span>
									<span>{post.readingTime}</span>
									{post.tags.length > 0 && (
										<>
											<span>•</span>
											<span>{post.tags.join(", ")}</span>
										</>
									)}
								</div>
							</article>
						</li>
					))}
				</ul>
			)}
		</section>
	);
}
