import { headers } from "next/headers";
import HomeClient from "./HomeClient";

export default async function Home() {
  const headersList = await headers();
  const region = headersList.get("x-region");

  return <HomeClient region={region} />;
}
