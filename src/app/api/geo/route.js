import { geolocation } from "@vercel/functions";

export async function GET(request) {
  const geo = geolocation(request);
  return Response.json(geo);
}
