"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function SectionReveals({ children }: { children: ReactNode }) {
	const root = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (
			window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
			!("IntersectionObserver" in window)
		)
			return;
		const sections = root.current?.querySelectorAll("[data-reveal]");
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						entry.target.classList.remove("reveal-pending");
						observer.unobserve(entry.target);
					}
				}
			},
			{ threshold: 0 },
		);
		sections?.forEach((section) => {
			if (section.getBoundingClientRect().top >= window.innerHeight) {
				section.classList.add("reveal-pending");
				observer.observe(section);
			}
		});
		return () => {
			observer.disconnect();
			sections?.forEach((section) =>
				section.classList.remove("reveal-pending"),
			);
		};
	}, []);
	return (
		<div ref={root} className="space-y-16 md:space-y-24">
			{children}
		</div>
	);
}
