import { NextResponse } from "next/server";
import { geolocation } from "@vercel/functions";

const US_STORE_URL =
  "https://myecommerce-bahy2mt3k-pavansai-kavitis-projects.vercel.app/";
const CA_STORE_URL = "https://myecommerce-sigma.vercel.app/";

function getSiteRegion(request) {
  const hostname = request.nextUrl?.hostname ?? "";
  if (hostname.includes("specialty.ca") || hostname.endsWith(".ca")) {
    return "ca";
  }
  return process.env.SITE_REGION === "ca" ? "ca" : "us";
}

export function middleware(request) {
  const geo = geolocation(request);
  const country = geo?.country?.toUpperCase();

  const testRegion = request.nextUrl?.searchParams?.get("test_region")?.toLowerCase();
  const userRegionFromGeo = country === "CA" ? "ca" : country === "US" ? "us" : null;
  const userRegion =
    testRegion === "us" || testRegion === "ca" ? testRegion : userRegionFromGeo;

  const siteRegion = getSiteRegion(request);

  const isMismatch =
    (siteRegion === "ca" && userRegion === "us") ||
    (siteRegion === "us" && userRegion === "ca");

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-region", userRegion ?? "");
  requestHeaders.set("x-site-region", siteRegion);
  requestHeaders.set("x-user-region", userRegion ?? "");

  if (isMismatch) {
    requestHeaders.set("x-region-mismatch", "true");
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  if (userRegion === "us") {
    return NextResponse.redirect(US_STORE_URL, 302);
  }
  if (userRegion === "ca") {
    return NextResponse.redirect(CA_STORE_URL, 302);
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
