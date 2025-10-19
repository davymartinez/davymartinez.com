"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { getDictionary } from "@/lib/i18n";
import { useEffect, useState } from "react";

export function SiteHeader({ locale }: { locale: "en" | "es" }) {
	const pathname = usePathname();
	const [t, setT] = useState<any>(null);

	useEffect(() => {
		getDictionary(locale).then(setT);
	}, [locale]);

	if (!t) return null;

	const nav = [
		{ href: `/${locale}/services`, label: t.nav.services },
		{ href: `/${locale}/seo-portfolio`, label: t.nav.seoPortfolio },
		{ href: `/${locale}/translation-portfolio`, label: t.nav.trPortfolio },
		{ href: `/${locale}/about`, label: t.nav.about },
		{ href: `/${locale}/cv`, label: t.nav.cv },
		{ href: `/${locale}/blog`, label: t.nav.blog },
		{ href: `/${locale}/contact`, label: t.nav.contact },
	];

	return (
		<header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container py-4 flex items-center justify-between gap-6">
				<Link href={`/${locale}`} className="font-semibold">
					DM
				</Link>
				<div className="flex items-center gap-2">
					<nav className="hidden md:flex gap-2 text-sm">
						{nav.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className={clsx(
									"px-3 py-1.5 rounded-lg hover:bg-muted",
									pathname === item.href && "bg-muted font-medium"
								)}
							>
								{item.label}
							</Link>
						))}
					</nav>
					<LocaleSwitcher />
				</div>
			</div>
		</header>
	);
}
