import Image from "next/image";
import { getDictionary, Locale } from "@/lib/i18n";

type Item = { name: string; src?: string; width?: number; height?: number };

type Props = {
	seo?: Item[];
	translation?: Item[];
	locale: Locale;
};

const SEO_DEFAULTS: Item[] = [
	{ name: "Ott College" },
	{ name: "Sagapixel" },
	{ name: "Graphite" },
	{ name: "Uakami Studio" },
];

const TR_DEFAULTS: Item[] = [
	{ name: "Weatherford" },
	{ name: "European Journalism Centre" },
	{ name: "Negotiations.com" },
	{ name: "Process Instruments" },
	{ name: "Kimray" },
];

export async function ClientLogoStrip({
	seo = SEO_DEFAULTS,
	translation = TR_DEFAULTS,
	locale,
}: Props) {
	const t = await getDictionary(locale);

	return (
		<section
			aria-label={
				locale === "en" ? "Client experience" : "Experiencia con clientes"
			}
			className="grid gap-8 rounded-2xl bg-muted p-6 md:grid-cols-2 md:p-8"
		>
			<div className="space-y-2">
				<p className="text-sm font-medium tracking-wide text-muted-foreground">
					{t.components.clients.seo}
				</p>
				<LogoRow items={seo} />
			</div>
			<div className="space-y-2">
				<p className="text-sm font-medium tracking-wide text-muted-foreground">
					{t.components.clients.tr}
				</p>
				<LogoRow items={translation} />
			</div>
		</section>
	);
}

function LogoRow({ items }: { items: Item[] }) {
	return (
		<div className="flex flex-wrap items-center gap-3 md:gap-4">
			{items.map((it, i) =>
				it.src ? (
					<div key={i} className="inline-flex items-center justify-center">
						<Image
							src={it.src}
							alt={it.name}
							width={it.width ?? 110}
							height={it.height ?? 28}
							className="object-contain grayscale opacity-70 hover:opacity-100 transition"
						/>
					</div>
				) : (
					<div
						key={i}
						className="inline-flex items-center text-foreground text-base font-medium"
					>
						{it.name}
					</div>
				),
			)}
		</div>
	);
}
