// import { cn } from "@/lib/utils"; // optional if you use a className combiner
import type { ReactNode } from "react";

export function Prose({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div className={`prose prose-slate dark:prose-invert ${className ?? ""}`}>
			{children}
		</div>
	);
}

