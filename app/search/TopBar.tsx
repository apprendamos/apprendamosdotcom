"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CrossCircledIcon } from "@radix-ui/react-icons";

import { BaseTopBar, PageBackButton } from "app/components";

export default function Navbar() {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const q = searchParams.get("q") || "";

  const searchString = useRef(q);
  const lastSearchedString = useRef("");

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = q;
    }
  }, [q]);

  const timer: { current: NodeJS.Timeout | undefined } = useRef(undefined);

  const doneTyping = () => {
    if (lastSearchedString.current === searchString.current) {
      return;
    }

    if (searchString.current === "") {
      lastSearchedString.current = "";
      router.push("/search");
    } else {
      lastSearchedString.current = searchString.current;
      router.push(`/search?q=${searchString.current}`);
    }
  };

  return (
    <BaseTopBar className="space-x-2">
      <PageBackButton />
      <div className="flex space-x-2 w-full">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search"
          className="
          grow
          rounded bg-transparent 
          px-4 py-1 m-0 
          outline-none ring-0 focus:ring-0
          border border-red-600/10 focus:border-red-600/10
        "
          onKeyUp={(e) => {
            clearTimeout(timer.current);
            timer.current = setTimeout(doneTyping, 300);
          }}
          onKeyDown={(e) => {
            clearTimeout(timer.current);
          }}
          onChange={(e) => (searchString.current = e.target.value)}
        />
        <div className="flex space-x-4">
          <button
            onClick={() => {
              searchString.current = "";
              if (inputRef.current) {
                inputRef.current.value = "";
              }
              router.push("/search");
            }}
          >
            <CrossCircledIcon className="w-4 h-4 text-zinc-600 focus:text-zinc-500" />
          </button>
        </div>
      </div>
    </BaseTopBar>
  );
}
