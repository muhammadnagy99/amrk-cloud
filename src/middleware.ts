import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { i18n } from "./i18n-config";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

type Locale = typeof i18n.locales[number];
const DEFAULT_LOCALE: Locale = "ar"; 
function getLocaleFromCookie(request: NextRequest): Locale | undefined {
  const cookieLocale = request.cookies.get("locale")?.value;
  return i18n.locales.includes(cookieLocale as Locale)
    ? (cookieLocale as Locale)
    : undefined;
}

function getLocaleFromHeaders(request: NextRequest): Locale {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales: Locale[] = [...i18n.locales];
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(locales);

  const locale = matchLocale(languages, locales, DEFAULT_LOCALE);
  return locale as Locale;
}

const queryRedirectMap: Record<string, { path: string; cookieKey: string }> = {
  brnid: { path: "/pick-up", cookieKey: "brnid" },
};

function getRedirectInfoFromQuery(request: NextRequest): {
  redirectPath: string;
  cookieKey: string;
  cookieValue: string;
} | null {
  const url = request.nextUrl;
  for (const key in queryRedirectMap) {
    const value = url.searchParams.get(key);
    if (value) {
      const { path, cookieKey } = queryRedirectMap[key];
      return {
        redirectPath: path,
        cookieKey,
        cookieValue: value,
      };
    }
  }
  return null;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const matchedLocale = i18n.locales.find((locale) =>
    pathname.startsWith(`/${locale}`)
  ) as Locale | undefined;

  const cookieLocale = getLocaleFromCookie(request);

  if (matchedLocale) {
    if (cookieLocale !== matchedLocale) {
      const response = NextResponse.next();
      response.cookies.set("locale", matchedLocale);
      return response;
    }
    return NextResponse.next();
  }

  const resolvedLocale: Locale = cookieLocale || DEFAULT_LOCALE;

  const redirectInfo = getRedirectInfoFromQuery(request);
  if (redirectInfo) {
    const { redirectPath, cookieKey, cookieValue } = redirectInfo;

    const response = NextResponse.redirect(
      new URL(`/${resolvedLocale}${redirectPath}`, request.url)
    );
    response.cookies.set("locale", resolvedLocale);
    response.cookies.set(cookieKey, cookieValue);
    return response;
  }

  const response = NextResponse.redirect(
    new URL(
      `/${resolvedLocale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
      request.url
    )
  );
  response.cookies.set("locale", resolvedLocale);
  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|manifest.webmanifest|sitemap.xml|robots.txt|.*\\.png|.*\\.webp|.*\\.jpg).*)",
  ],
};
