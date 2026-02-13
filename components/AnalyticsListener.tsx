"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

type DataLayerWindow = Window & {
	dataLayer?: Record<string, unknown>[];
};

export default function AnalyticsListener() {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	useEffect(() => {
		if (typeof window === "undefined") return;
		const dataLayerWindow = window as DataLayerWindow;
		const url = pathname + (searchParams?.toString() ? `?${searchParams}` : "");
		// Push a GA4-compatible page_view into dataLayer on each route change
		dataLayerWindow.dataLayer = dataLayerWindow.dataLayer || [];
		dataLayerWindow.dataLayer.push({
			event: "page_view",
			page_location: window.location.origin + url,
			page_path: pathname,
			page_title: document.title,
		});
	}, [pathname, searchParams]);

	return null;
}
