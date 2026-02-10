import { NextResponse } from "next/server";
import { geolocation } from "@vercel/functions";

export function middleware(request) {
  const geo = geolocation(request);
  const country = geo?.country?.toUpperCase();

  if (country === "US") {
    return NextResponse.redirect("https://appl.com", 302);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
