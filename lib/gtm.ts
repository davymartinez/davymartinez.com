// lib/gtm.ts
/**
 * Lightweight helper to push custom events to Google Tag Manager.
 * Usage:
 *   gtmEvent({ event: "form_submit", form_id: "contact" });
 */
export function gtmEvent<T extends Record<string, unknown>>(
	payload: T & { event: string }
) {
	if (typeof window === "undefined") return; // Prevent SSR errors
	const dataLayerWindow = window as Window & {
		dataLayer?: Array<Record<string, unknown>>;
	};
	dataLayerWindow.dataLayer = dataLayerWindow.dataLayer || [];
	dataLayerWindow.dataLayer.push(payload);
}
