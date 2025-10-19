import type { Dictionary } from "./types";
import { deepMerge } from "./deepMerge";

export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];
export const isLocale = (val: string): val is Locale =>
	locales.includes(val as any);

export async function getDictionary(locale: Locale): Promise<Dictionary> {
	const es = (await import("./dictionaries/es")).dictionary;
	if (locale === "es") return es;
	const target = (await import(`./dictionaries/${locale}`))
		.dictionary as Partial<Dictionary>;
	return deepMerge(es, target);
}
