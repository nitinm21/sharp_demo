import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

// Single Geist font instance with only needed weights (reduces font download size)
const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap", // Prevent FOIT (Flash of Invisible Text)
});

export const metadata: Metadata = {
  title: "Picture Profile Setup",
  description: "Personalize your TV viewing experience in under a minute",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
