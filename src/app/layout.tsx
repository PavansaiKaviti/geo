import type { Metadata } from "next";
import "./globals.css";
import ThemeRegistry from "./ThemeRegistry";
import RegionProvider from "./RegionProvider";

export const metadata: Metadata = {
  title: "Geo",
  description: "Next.js app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <RegionProvider>{children}</RegionProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
