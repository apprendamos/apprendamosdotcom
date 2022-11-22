"use client";
import { SessionProvider } from "next-auth/react";

import { AnalyticsWrapper } from "./(components)/analytics";

import "./globals.css";
import Navbar from "./Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="bg-zinc-100 dark:bg-zinc-900" lang="en">
      <body className="bg-zinc-200 dark:bg-zinc-800 mx-auto max-w-xl min-h-screen">
        <SessionProvider refetchOnWindowFocus={false}>
          <>
            <Navbar />
            <main className="px-4">{children}</main>
            <AnalyticsWrapper />
          </>
        </SessionProvider>
      </body>
    </html>
  );
}
