"use client";

import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";

import { AnalyticsWrapper } from "app/components";

import "./globals.css";

import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      className={
        "bg-zinc-100 dark:bg-zinc-900 flex flex-col " + inter.className
      }
      lang="en"
    >
      <SWRConfig
        value={{
          refreshInterval: 3000,
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json()),
        }}
      >
        <SessionProvider>
          <body className="bg-zinc-200 dark:bg-zinc-900 border-x border-x-zinc-800 mx-auto min-h-screen w-screen sm:w-144 flex flex-col">
            {children}
            <AnalyticsWrapper />
          </body>
        </SessionProvider>
      </SWRConfig>
    </html>
  );
}
