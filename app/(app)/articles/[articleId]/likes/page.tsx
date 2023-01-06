"use client";

import { Pagination, Profile } from "app/components";
import { usePathname } from 'next/navigation'


const Wrapper = ({ children }: { children: any }) => (
  <div className="flex flex-col space-y-1">{children}</div>
);


export default function ArticleChildrenPage() {
  const pathname = usePathname();

  if (!pathname) {
    return null;
  }

  return (
    <Pagination
      apiUrl={`/api${pathname}`}
      Item={Profile}
      Wrapper={Wrapper}
    />
  );
}
