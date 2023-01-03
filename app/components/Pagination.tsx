"use client";

import { useRef, useEffect } from "react";
import useSWRInfinite from "swr/infinite";
import { AnimatedButton } from "app/components";

const DafaultWrapper = ({ children }: { children: any }) => (
  <div className="flex flex-col space-y-1">{children}</div>
);

interface Props {
  apiUrl: string;
  Wrapper: React.FunctionComponent<any>;
  Item: React.FunctionComponent<any>;
  LoadMoreButton: React.FunctionComponent<React.HTMLProps<HTMLButtonElement>>;
}

const Pagination: React.FunctionComponent<Props> = ({
  apiUrl,
  Wrapper = DafaultWrapper,
  Item,
  LoadMoreButton,
}) => {
  const getKey = (pageIndex: any, previousPageData: any) => {
    if (previousPageData && !previousPageData.meta.page.more) return null;

    if (pageIndex === 0) return apiUrl;

    return `${apiUrl}?cursor=${previousPageData.meta.page.cursor}`;
  };

  const { data, size, error, setSize, isValidating } = useSWRInfinite(getKey, {
    persistSize: true,
  });

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");

  if (isLoadingInitialData) return <div>Loading...</div>;

  const hasNextPage =
    data && data.length > 0 && data[data.length - 1]?.meta.page.more;

  const loadMore = () => {
    setSize(size + 1);
  };

  const items = data && data.map((page) => page.records).flat();

  return (
    <>
      <Wrapper>
        {items?.map((item) => (
          <Item key={item.id} {...item} />
        ))}
        {hasNextPage && (
          <div className="w-full py-2 bg-zinc-900 bg-opacity-50">
            {isLoadingMore ? (
              <AnimatedButton color="zinc" size="small">
                ... loading
              </AnimatedButton>
            ) : (
              <AnimatedButton onClick={loadMore} size="small">
                Load More
              </AnimatedButton>
            )}
          </div>
        )}
      </Wrapper>
    </>
  );
};

export default Pagination;
