"use client";

import { useState, useRef } from "react";
import { BaseTopBar } from "app/components";
import {
  ArrowLeftIcon,
  CrossCircledIcon,
  CheckCircledIcon,
} from "@radix-ui/react-icons";

import { useRouter, useSearchParams } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const q = searchParams.get("q");

  const [searchString, setSearchString] = useState(q || "");
  const [lastSearchedString, setLastSearchedString] = useState("");

  const timer: { current: NodeJS.Timeout | undefined } = useRef(undefined);

  const doneTyping = () => {
    if (lastSearchedString === searchString) {
      return;
    }

    if (searchString === "") {
      router.push("/search");
    } else {
      router.push(`/search?q=${searchString}`);
    }

    setLastSearchedString(searchString);
  };

  return (
    <BaseTopBar>
      <ArrowLeftIcon
        onClick={() => router.back()}
        className="w-4 h-4 text-zinc-600 focus:text-zinc-500"
      />
      <input
        value={searchString}
        type="text"
        placeholder="Search"
        className="
          rounded bg-transparent 
          px-4 py-1 m-0 
          outline-none ring-0 focus:ring-0
          border border-zinc-700 focus:border-zinc-600
        "
        onKeyUp={(e) => {
          clearTimeout(timer.current);
          timer.current = setTimeout(doneTyping, 300);
        }}
        onKeyDown={(e) => {
          clearTimeout(timer.current);
        }}
        onChange={(e) => setSearchString(e.target.value)}
      />
      <div className="flex space-x-4">
        <button
          onClick={() => {
            setSearchString("");
            router.push("/search");
          }}
        >
          <CrossCircledIcon className="w-4 h-4 text-zinc-600 focus:text-zinc-500" />
        </button>
      </div>
    </BaseTopBar>
  );
}
