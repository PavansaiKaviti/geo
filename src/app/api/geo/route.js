import { geolocation, ipAddress } from "@vercel/functions";

export async function GET(request) {
  const geo = geolocation(request);
  const ip = ipAddress(request);
  return Response.json({ ...geo, ip: ip ?? null });
}
