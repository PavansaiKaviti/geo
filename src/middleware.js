import { NextResponse } from "next/server";
import { geolocation } from "@vercel/functions";

export function middleware(request) {
  const geo = geolocation(request);
  const country = geo?.country?.toUpperCase();

  const requestHeaders = new Headers(request.headers);
  if (country === "US") {
    requestHeaders.set("x-region", "us");
  } else if (country === "CA") {
    requestHeaders.set("x-region", "ca");
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
