"use client";

import { Pagination, ArticleCardMedium } from "app/components";

const LoadMoreButton = () => (
  <button
    className={`
            rounded-full 
            flex mx-auto items-center
            justify-center 
            w-32 h-8 my-2 
            bg-red-600/50 focus:bg-red-600/80
          `}
  >
    Load more
  </button>
);

const Wrapper = ({ children }: { children: any }) => (
  <div className="flex flex-col space-y-1">{children}</div>
);

export default function ArticlesPage() {
  return (
    <Pagination
      apiUrl="/api/articles"
      Item={ArticleCardMedium}
      LoadMoreButton={LoadMoreButton}
      Wrapper={Wrapper}
    />
  );
}
