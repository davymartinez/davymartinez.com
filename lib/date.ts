import type { Locale } from "@/lib/i18n";

export function formatDate(dateInput: string | number | Date, locale: Locale) {
	const d = new Date(dateInput);
	if (Number.isNaN(d.getTime())) return "";
	const tag = locale === "es" ? "es-AR" : "en-US";
	return new Intl.DateTimeFormat(tag, {
		year: "numeric",
		month: "long",
		day: "numeric",
	}).format(d);
}
