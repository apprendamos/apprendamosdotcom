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
        "bg-zinc-100 dark:bg-zinc-900 h-screen flex flex-col " + inter.className
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
          <body className="bg-zinc-200 dark:bg-zinc-800 mx-auto my-auto h-screen w-screen sm:h-160 sm:w-96 sm:rounded-lg">
            {children}
            <AnalyticsWrapper />
          </body>
        </SessionProvider>
      </SWRConfig>
    </html>
  );
}
