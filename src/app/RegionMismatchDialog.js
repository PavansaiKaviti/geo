"use client";

import { useState } from "react";
import styles from "./RegionMismatchDialog.module.css";

const US_STORE_URL =
  "https://myecommerce-bahy2mt3k-pavansai-kavitis-projects.vercel.app/";
const CA_STORE_URL = "https://myecommerce-sigma.vercel.app/";

export default function RegionMismatchDialog({
  userRegion,
  siteRegion,
  onDismiss,
}) {
  const [open, setOpen] = useState(true);

  const isUserUS = userRegion === "us";
  const storeUrl = isUserUS ? US_STORE_URL : CA_STORE_URL;
  const message = isUserUS
    ? "You're in US. Visit Amazon."
    : "You're in Canada. Visit Apple.";
  const buttonLabel = isUserUS ? "Visit Amazon" : "Visit Apple";

  const handleClose = () => {
    setOpen(false);
    onDismiss?.();
  };

  if (!open) return null;

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="region-dialog-title">
      <div className={styles.dialog}>
        <h2 id="region-dialog-title" className={styles.title}>
          {isUserUS ? "US region" : "Canada region"}
        </h2>
        <p className={styles.message}>{message}</p>
        <div className={styles.actions}>
          <a
            href={storeUrl}
            className={styles.primaryBtn}
            target="_blank"
            rel="noopener noreferrer"
          >
            {buttonLabel}
          </a>
          <button
            type="button"
            className={styles.secondaryBtn}
            onClick={handleClose}
          >
            Stay here
          </button>
        </div>
      </div>
    </div>
  );
}
