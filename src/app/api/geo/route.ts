import { ipAddress } from "@vercel/functions";

export async function GET(request: Request) {
  const ip = ipAddress(request);
  return Response.json({ ip: ip ?? null });
}
