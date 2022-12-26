"use client";

import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

export default function PageBackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="
        relative 
        text-zinc-500 focus:text-zinc-300 
        w-4 h-4 
        group 
        flex 
        items-center justify-center
      "
    >
      <span
        className="
        hidden group-focus:inline-flex
        group-focus:animate-ping
        absolute
        h-5 w-5
        rounded-full
        bg-red-600 opacity-50
      "
      />
      <ArrowLeftIcon className="w-4 h-4 relative" />
    </button>
  );
}
