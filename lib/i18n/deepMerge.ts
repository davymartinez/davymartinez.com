export function deepMerge<T>(base: T, override: Partial<T>): T {
	if (typeof base !== "object" || base === null) return override as T;
	const out: any = Array.isArray(base)
		? [...(base as any)]
		: { ...(base as any) };
	for (const [k, v] of Object.entries(override ?? {})) {
		if (
			v &&
			typeof v === "object" &&
			!Array.isArray(v) &&
			typeof (out as any)[k] === "object"
		) {
			(out as any)[k] = deepMerge((out as any)[k], v as any);
		} else {
			(out as any)[k] = v;
		}
	}
	return out;
}
