import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_FILE = /\.(?:.*)$/.test.bind(/\.(?:.*)$/);
const locales = ["en", "es"] as const;
const defaultLocale: (typeof locales)[number] = "es";

export function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl;

	// Ignore public files and Next internals
	if (pathname.startsWith("/_next") || PUBLIC_FILE(pathname)) return;

	// If the path already includes a locale, allow
	const pathLocale = pathname.split("/").filter(Boolean)[0];
	if (locales.includes(pathLocale as any)) return;

	// Otherwise, redirect to default locale
	const url = req.nextUrl.clone();
	url.pathname = `/${defaultLocale}${pathname}`;
	return NextResponse.redirect(url);
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
