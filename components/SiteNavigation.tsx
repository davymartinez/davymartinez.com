"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";

export function SiteNavigation({
	locale,
	items,
}: {
	locale: "en" | "es";
	items: { href: string; label: string }[];
}) {
	const pathname = usePathname();
	const dialog = useRef<HTMLDialogElement>(null);
	const trigger = useRef<HTMLButtonElement>(null);
	const [open, setOpen] = useState(false);
	const menuLabel = locale === "en" ? "Menu" : "Menú";
	const closeLabel = locale === "en" ? "Close menu" : "Cerrar menú";

	useEffect(() => {
		document.documentElement.lang = locale;
	}, [locale]);

	useEffect(() => {
		if (!open) return;
		const previous = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		const media = window.matchMedia("(min-width: 1280px)");
		const closeOnDesktop = () => {
			if (media.matches) dialog.current?.close();
		};
		media.addEventListener("change", closeOnDesktop);
		return () => {
			document.body.style.overflow = previous;
			media.removeEventListener("change", closeOnDesktop);
		};
	}, [open]);

	function closeMenu() {
		dialog.current?.close();
	}
	function navLinks(mobile = false) {
		return items.map((item) => {
			const active =
				pathname === item.href || pathname.startsWith(`${item.href}/`);
			return (
				<Link
					key={item.href}
					href={item.href}
					onClick={mobile ? closeMenu : undefined}
					className={mobile ? "mobile-nav-link" : "nav-link"}
					aria-current={active ? "page" : undefined}
				>
					{item.label}
				</Link>
			);
		});
	}

	return (
		<header className="site-header">
			<div className="nav-island">
				<Link
					href={`/${locale}`}
					className="font-semibold tracking-tight"
					aria-label="David Martínez"
				>
					DM<span className="text-accent">.</span>
				</Link>
				<nav
					aria-label={
						locale === "en" ? "Main navigation" : "Navegación principal"
					}
					className="hidden xl:flex items-center gap-2"
				>
					{navLinks()}
				</nav>
				<div className="flex items-center gap-4">
					<LocaleSwitcher />
					<button
						ref={trigger}
						className="menu-toggle xl:hidden"
						aria-label={menuLabel}
						aria-expanded={open}
						aria-controls="mobile-navigation"
						onClick={() => {
							dialog.current?.showModal();
							setOpen(true);
						}}
					>
						<span className="menu-line" />
						<span className="menu-line" />
					</button>
				</div>
			</div>
			<dialog
				ref={dialog}
				id="mobile-navigation"
				className="mobile-menu"
				aria-label={menuLabel}
				onClose={() => {
					setOpen(false);
					trigger.current?.focus();
				}}
			>
				<div className="container py-6">
					<div className="flex items-center justify-between mb-8">
						<span className="font-semibold">David Martínez</span>
						<button
							className="menu-toggle is-open"
							onClick={closeMenu}
							aria-label={closeLabel}
						>
							<span className="menu-line" />
							<span className="menu-line" />
						</button>
					</div>
					<nav className="flex flex-col gap-4">{navLinks(true)}</nav>
				</div>
			</dialog>
		</header>
	);
}
