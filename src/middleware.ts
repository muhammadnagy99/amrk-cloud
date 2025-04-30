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
  brnid: {
    path: "/pick-up",
    cookieKey: "brnid"
  },
};

function getRedirectInfoFromQuery(request: NextRequest): {
  redirectPath: string;
  cookieKey: string;
  cookieValue: string;
  additionalCookies?: Record<string, string>;
} | null {
  const url = request.nextUrl;
  const brnidValue = url.searchParams.get("brnid");
  const tableIdValue = url.searchParams.get("tableId");
  const typeValue = url.searchParams.get("type");
  
  // Check for brnid with tableId for dine-in
  if (brnidValue && tableIdValue) {
    // Dine-in case with brnid and tableId
    return {
      redirectPath: "/dine-in",
      cookieKey: "dine_brnid",
      cookieValue: brnidValue,
      additionalCookies: {
        "tableId": tableIdValue
      }
    };
  }
  
  // Check for brnid with different type values
  if (brnidValue) {
    if (typeValue === "1") {
      // Dine-in case with type=1
      return {
        redirectPath: "/dine-in",
        cookieKey: "dine_brnid",
        cookieValue: brnidValue
      };
    } else if (typeValue === "2" || !typeValue) {
      // Pick-up case (type=2 or no type specified)
      return {
        redirectPath: "/pick-up",
        cookieKey: "brnid",
        cookieValue: brnidValue
      };
    }else if (typeValue === "4" || !typeValue) {
      return {
        redirectPath: "/table-reservation",
        cookieKey: "table_brnid",
        cookieValue: brnidValue
      };
    }
  }
  
  // Check for other redirects using queryRedirectMap
  for (const key in queryRedirectMap) {
    if (key !== "brnid") { // Skip brnid as we handled it above
      const value = url.searchParams.get(key);
      if (value) {
        const { path, cookieKey } = queryRedirectMap[key];
        return {
          redirectPath: path,
          cookieKey,
          cookieValue: value
        };
      }
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
    const { redirectPath, cookieKey, cookieValue, additionalCookies } = redirectInfo;

    const redirectUrl = new URL(`/${resolvedLocale}${redirectPath}`, request.url);
    
    const response = NextResponse.redirect(redirectUrl);
    response.cookies.set("locale", resolvedLocale);
    response.cookies.set(cookieKey, cookieValue);
    
    // Set any additional cookies if provided
    if (additionalCookies) {
      for (const [key, value] of Object.entries(additionalCookies)) {
        response.cookies.set(key, value);
      }
    }
    
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