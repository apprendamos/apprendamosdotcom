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
        "flex flex-col " + inter.className
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
          <body className="border-x border-x-red-600/10 mx-auto min-h-screen w-screen sm:w-144 flex flex-col">
            {children}
            <AnalyticsWrapper />
          </body>
        </SessionProvider>
      </SWRConfig>
    </html>
  );
}
