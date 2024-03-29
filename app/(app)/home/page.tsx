"use client";

import { Pagination, ArticleCardMedium } from "app/components";


const Wrapper = ({ children }: { children: any }) => (
  <div className="flex flex-col space-y-1">{children}</div>
);

export default function ArticlesPage() {
  return (
    <Pagination
      apiUrl="/api/articles"
      Item={ArticleCardMedium}
      Wrapper={Wrapper}
    />
  );
}
