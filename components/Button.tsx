import Link from "next/link";
import clsx from "clsx";
import type { ReactNode } from "react";

type Variant = "primary" | "outline" | "subtle";

export function Button({
	href,
	children,
	variant = "primary",
	className,
}: {
	href?: string;
	children: ReactNode;
	variant?: Variant;
	className?: string;
}) {
	const base = "btn";
	const variantClass = {
		primary: "btn-primary",
		outline: "btn-outline",
		subtle: "btn-subtle",
	}[variant];

	const cn = clsx(base, variantClass, className);

	if (href)
		return (
			<Link href={href} className={cn}>
				{children}
			</Link>
		);
	return <button className={cn}>{children}</button>;
}
