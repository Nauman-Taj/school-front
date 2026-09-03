import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Garrison Grammar School",
  description: "School and Colleges",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}