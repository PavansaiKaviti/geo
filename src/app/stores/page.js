import { headers, cookies } from "next/headers";
import Link from "next/link";
import styles from "./page.module.css";

export default async function StoresPage() {
  const headersList = await headers();
  const cookieStore = await cookies();
  const regionFromGeo = headersList.get("x-region");
  const regionFromCookie = cookieStore.get("region")?.value?.toLowerCase();
  const region = regionFromCookie ?? regionFromGeo;

  if (region === "us") {
    return (
      <div className={styles.page}>
        <main className={styles.main}>
          <h1 className={styles.title}>Stores</h1>
          <p className={styles.message}>
            You're in the US region. You can use:
          </p>
          <div className={styles.storeLinks}>
            <a
              href="https://amazon.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.storeLink} ${styles.storeLinkAmazon}`}
            >
              Amazon.com →
            </a>
          </div>
          <Link href="/" className={styles.back}>
            ← Back to home
          </Link>
        </main>
      </div>
    );
  }

  if (region === "ca") {
    return (
      <div className={styles.page}>
        <main className={styles.main}>
          <h1 className={styles.title}>Stores</h1>
          <p className={styles.message}>
            You're in the Canada region. You can use:
          </p>
          <div className={styles.storeLinks}>
            <a
              href="https://apple.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.storeLink} ${styles.storeLinkApple}`}
            >
              Apple.com →
            </a>
          </div>
          <Link href="/" className={styles.back}>
            ← Back to home
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>Stores</h1>
        <p className={styles.message}>
          This page is only available for US and Canada. Set your region on the
          home page or visit from a US or Canada location.
        </p>
        <Link href="/" className={styles.back}>
          ← Back to home
        </Link>
      </main>
    </div>
  );
}
