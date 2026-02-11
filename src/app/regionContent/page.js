import { cookies } from "next/headers";
import Link from "next/link";
import styles from "./page.module.css";

export default async function RegionContentPage() {
  const cookieStore = await cookies();
  const region = cookieStore.get("region")?.value?.toLowerCase();

  const message =
    region === "us"
      ? "User is in US"
      : region === "ca"
      ? "User is in Canada"
      : "No region cookie set. Pick US or Canada on the home page.";

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>Region Content</h1>
        <p className={styles.message}>{message}</p>
        <Link href="/" className={styles.back}>
          ← Back to home
        </Link>
      </main>
    </div>
  );
}
