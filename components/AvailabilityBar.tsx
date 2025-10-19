import clsx from "clsx";
import { Button } from "@/components/Button";
import { getDictionary } from "@/lib/i18n";

type Status = "open" | "limited" | "full";

export async function AvailabilityBar({
	status = "limited",
	className,
	locale = "es",
}: {
	status?: Status;
	className?: string;
	locale?: string; // 👈 accept plain string
}) {
	// ✅ Normalize locale safely
	const safeLocale: "en" | "es" = locale === "en" ? "en" : "es";

	const t = await getDictionary(safeLocale);

	// localized pieces
	const month = t.components.availability.month;
	const slots = t.components.availability.slots;

	// pick correct message
	let text: string;
	switch (status) {
		case "open":
			text = t.components.availability.open.replace("{month}", month);
			break;
		case "limited":
			text = t.components.availability.limited
				.replace("{month}", month)
				.replace("{slots}", slots);
			break;
		case "full":
		default:
			text = t.components.availability.full.replace("{month}", month);
			break;
	}

	const color: "success" | "warning" | "danger" =
		status === "open" ? "success" : status === "limited" ? "warning" : "danger";

	return (
		<div
			className={clsx(
				"rounded-2xl border border-border bg-card/60 backdrop-blur supports-[backdrop-filter]:bg-card/40 px-4 py-3 md:px-6 md:py-4 flex items-center justify-between gap-4 shadow-sm",
				className
			)}
		>
			<div className="flex items-center gap-3">
				<StatusDot color={color} />
				<p className="text-sm md:text-base">
					<span className="font-medium">{t.components.availability.label}</span>{" "}
					{text}
				</p>
			</div>
			<Button
				href={`/${safeLocale}/contact`}
				variant="primary"
				className="whitespace-nowrap"
			>
				{t.components.availability.cta}
			</Button>
		</div>
	);
}

function StatusDot({ color }: { color: "success" | "warning" | "danger" }) {
	const base =
		color === "success"
			? "bg-success"
			: color === "warning"
				? "bg-warning"
				: "bg-danger";
	return (
		<span className="relative inline-flex">
			<span
				className={clsx(
					"absolute inline-flex h-3 w-3 rounded-full opacity-60 animate-ping",
					base
				)}
			/>
			<span
				className={clsx("relative inline-flex h-3 w-3 rounded-full", base)}
			/>
		</span>
	);
}
