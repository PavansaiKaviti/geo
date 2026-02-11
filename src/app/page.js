import { headers, cookies } from "next/headers";
import HomeClient from "./HomeClient";

export default async function Home() {
  const headersList = await headers();
  const cookieStore = await cookies();
  const region = headersList.get("x-region");
  const userSpecifiedRegion = cookieStore.get("region")?.value?.toLowerCase() || null;

  return <HomeClient region={region} userSpecifiedRegion={userSpecifiedRegion} />;
}
