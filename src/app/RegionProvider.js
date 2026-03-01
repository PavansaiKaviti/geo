import { headers } from "next/headers";
import RegionMismatchDialog from "./RegionMismatchDialog";

export default async function RegionProvider({ children }) {
  const headersList = await headers();
  const hasMismatch = headersList.get("x-region-mismatch") === "true";
  const userRegion = headersList.get("x-user-region") || null;
  const siteRegion = headersList.get("x-site-region") || null;

  return (
    <>
      {children}
      {hasMismatch && userRegion && siteRegion && (
        <RegionMismatchDialog
          userRegion={userRegion}
          siteRegion={siteRegion}
          isMismatch={true}
        />
      )}
    </>
  );
}
