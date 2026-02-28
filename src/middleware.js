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
  const siteRegion = getSiteRegion(request);
  const userRegion = country === "CA" ? "ca" : country === "US" ? "us" : null;

  const isMismatch =
    (siteRegion === "ca" && userRegion === "us") ||
    (siteRegion === "us" && userRegion === "ca");

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-region", userRegion ?? "");
  requestHeaders.set("x-site-region", siteRegion);
  requestHeaders.set("x-user-region", userRegion ?? "");

  if (isMismatch) {
    requestHeaders.set("x-region-mismatch", "true");
  }

  if (userRegion === "us" || userRegion === "ca") {
    requestHeaders.set("x-show-region-dialog", "true");
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
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
