"use client";

import useSWRInfinite from "swr/infinite";
import { QuestionCardMedium } from "app/components";

export default function PaginationQuestions({ firstPage }: { firstPage: any }) {
  const getKey = (pageIndex: any, previousPageData: any) => {
    if (previousPageData && !previousPageData.meta.page.more) return null;

    if (pageIndex === 0)
      return `/api/questions?after=${firstPage.meta.page.cursor}`;

    return `/api/questions?after=${previousPageData.meta.page.cursor}`;
  };

  const { data, size, setSize } = useSWRInfinite(getKey);

  const hasNextPage = data?.[data.length - 1]?.meta.page.more;

  const loadMore = () => {
    setSize(size + 1);
  };

  let questions = data ? data.map((page) => page.records).flat() : [];
  questions = firstPage.records.concat(questions);

  return (
    <>
      <div className="flex flex-col space-y-1">
        {questions?.map((question) => (
          <QuestionCardMedium key={question.id} {...question} />
        ))}
      </div>
      {hasNextPage && (
        <button
          type="button"
          onClick={loadMore}
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
      )}
    </>
  );
}
