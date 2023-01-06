"use client";

import { Pagination, Comment } from "app/components";
import { usePathname } from 'next/navigation'

import SharedLayout from '../SharedLayout';

const Wrapper = ({ children }: { children: any }) => (
  <div className="flex flex-col space-y-1">{children}</div>
);


export default function ArticleChildrenPage() {
  const pathname = usePathname();

  if (!pathname) {
    return null;
  }

  return (
    <SharedLayout title="Comments">
    <Pagination
      apiUrl={`/api${pathname}`}
      Item={Comment}
      Wrapper={Wrapper}
    />
    </SharedLayout>
  );
}
