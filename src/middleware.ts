import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { geolocation } from "@vercel/functions";

export function middleware(request: NextRequest) {
  const geo = geolocation(request);
  const country = geo?.country?.toUpperCase();
  const userRegion = country === "CA" ? "ca" : country === "US" ? "us" : null;

  const siteRegionParam = request.nextUrl.searchParams
    .get("site_region")
    ?.toLowerCase();
  const siteRegion =
    siteRegionParam === "ca" || siteRegionParam === "us" ? siteRegionParam : null;

  const isMismatch =
    siteRegion !== null &&
    userRegion !== null &&
    ((siteRegion === "ca" && userRegion === "us") ||
      (siteRegion === "us" && userRegion === "ca"));

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-region", userRegion ?? "");
  requestHeaders.set("x-site-region", siteRegion ?? "");
  requestHeaders.set("x-user-region", userRegion ?? "");
  if (isMismatch) {
    requestHeaders.set("x-region-mismatch", "true");
  }

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
