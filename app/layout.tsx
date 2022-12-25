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
      className={"h-full w-full m-0 p-0 overflow-x-hidden " + inter.className}
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
          <body className="h-full w-full m-0 p-0 overflow-x-hidden">
            <div
              id="__magic"
              className={`
                min-h-full w-full sm:w-144 
                mx-auto 
                flex flex-col 
                border-x-none sm:border-x sm:border-x-red-600/30
              `}
            >
              {children}
            </div>

            <AnalyticsWrapper />
          </body>
        </SessionProvider>
      </SWRConfig>
    </html>
  );
}
