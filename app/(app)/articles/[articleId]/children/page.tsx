"use client";

import { Pagination, ArticleCardMedium } from "app/components";
import { usePathname } from "next/navigation";
import SharedLayout from "../SharedLayout";

const Wrapper = ({ children }: { children: any }) => (
  <div className="flex flex-col space-y-1">{children}</div>
);

export default function ArticleChildrenPage() {
  const pathname = usePathname();

  if (!pathname) {
    return null;
  }

  return (
    <SharedLayout title="Children">
      <Pagination
        apiUrl={`/api${pathname}`}
        Item={ArticleCardMedium}
        Wrapper={Wrapper}
      />
    </SharedLayout>
  );
}
