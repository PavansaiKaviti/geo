import { headers } from "next/headers";
import RegionMismatchDialog from "./RegionMismatchDialog";

export default async function RegionProvider({ children }) {
  const headersList = await headers();
  const showDialog = headersList.get("x-show-region-dialog") === "true";
  const userRegion = headersList.get("x-user-region") || null;
  const siteRegion = headersList.get("x-site-region") || null;

  return (
    <>
      {children}
      {showDialog && userRegion && (
        <RegionMismatchDialog
          userRegion={userRegion}
          siteRegion={siteRegion}
        />
      )}
    </>
  );
}
