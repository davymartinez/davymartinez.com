"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

const LOCALES = [
	{ code: "es", label: "ES" },
	{ code: "en", label: "EN" },
] as const;

function splitLocaleFromPath(pathname: string) {
	const parts = pathname.split("/").filter(Boolean);
	const maybeLocale = parts[0];
	const isSupported = LOCALES.some((l) => l.code === maybeLocale);
	const locale = isSupported ? maybeLocale : "es";
	const rest = isSupported ? parts.slice(1).join("/") : parts.join("/");
	return { locale, rest };
}

export function LocaleSwitcher() {
	const pathname = usePathname() || "/es";
	const { locale, rest } = splitLocaleFromPath(pathname);

	return (
		<div
			className="inline-flex items-center gap-1"
			role="group"
			aria-label="Cambiar idioma / Change language"
		>
			{LOCALES.map((l) => {
				const href = `/${l.code}${rest ? `/${rest}` : ""}`;
				const isActive = l.code === locale;
				return (
					<Link
						key={l.code}
						href={href}
						hrefLang={l.code}
						lang={l.code}
						className={clsx(
							"px-3 py-1.5 text-sm rounded-lg border border-border",
							"focus:outline-none focus:ring-2 focus:ring-ring/40 hover:bg-muted",
							isActive && "bg-muted font-medium cursor-default"
						)}
						aria-current={isActive ? "page" : undefined}
						aria-pressed={isActive ? true : undefined}
						tabIndex={isActive ? -1 : 0}
					>
						{l.label}
					</Link>
				);
			})}
		</div>
	);
}
