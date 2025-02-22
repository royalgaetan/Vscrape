"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { appName } from "@/lib/constants";
import { AuthProvider } from "@/providers/authProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>{appName}</title>
        <meta
          name="description"
          content="Take automation to the next level: create workflows, scrape the web while you sleep, extract data with AI, and export it in any format."
        ></meta>
      </head>
      <body
        className={cn(
          `${geistSans.variable} ${geistMono.variable} antialiased`,
          "h-full w-full flex flex-1 justify-center items-center"
        )}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
