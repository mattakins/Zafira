import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.zafiraorganics.com"),
  title: "ZAFIRA",
  description: "Zafira Recovery Foundation for GLP-1 support.",
  openGraph: {
    title: "ZAFIRA",
    description: "Zafira Recovery Foundation for GLP-1 support.",
    images: ["/zafira-assets/44-Add_a_heading_1.png"],
  },
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
