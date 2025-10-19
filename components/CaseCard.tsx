import Link from "next/link";

type Case = {
	slug: string;
	title: string;
	tag: string;
	excerpt: string;
	basePath: string;
	readMore: string;
};

export function CaseCard({
	slug,
	title,
	tag,
	excerpt,
	basePath,
	readMore,
}: Case) {
	const href = `/${basePath}/${slug}`;

	return (
		<Link
			href={href}
			className="block group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg transition-transform hover:scale-[1.02]"
		>
			<article
				className="card h-full p-4 rounded-lg"
				aria-labelledby={`${slug}-title`}
				role="group"
			>
				<span className="chip">{tag}</span>
				<h3
					id={`${slug}-title`}
					className="font-semibold mt-2 group-hover:text-primary transition-colors"
				>
					{title}
				</h3>
				<p className="text-sm text-muted-foreground">{excerpt}</p>
				<p className="mt-3 text-sm underline">{readMore}</p>
			</article>
		</Link>
	);
}
