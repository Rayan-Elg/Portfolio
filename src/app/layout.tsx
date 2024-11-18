import type { Metadata } from "next";
import { GeistSans as FontSans } from "geist/font/sans";
import { GeistMono as FontMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rayan Elg - Portfolio",
  description: "Full Stack Developer Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${FontSans.variable} ${FontMono.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
