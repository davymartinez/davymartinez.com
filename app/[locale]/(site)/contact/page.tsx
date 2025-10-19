import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { getDictionary } from "@/lib/i18n";

export const dynamic = "force-static";

export async function generateMetadata({
	params,
}: {
	params: { locale: "en" | "es" };
}): Promise<Metadata> {
	const t = await getDictionary(params.locale);
	return {
		title: t.contact.h1,
		description: t.contact.intro,
	};
}

export default async function ContactPage({
	params,
}: {
	params: { locale: "en" | "es" };
}) {
	const t = await getDictionary(params.locale);

	return (
		<section className="space-y-6 max-w-xl">
			<article className="prose prose-slate dark:prose-invert max-w-none">
				<h1>{t.contact.h1}</h1>
				<p>{t.contact.intro}</p>
			</article>
			<ContactForm locale={params.locale} />
		</section>
	);
}
