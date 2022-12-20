"use client";

import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

export default function PageBackButton() {
  const router = useRouter();
  return (
    <ArrowLeftIcon
      onClick={() => router.back()}
      className="w-4 h-4 text-zinc-600 focus:text-zinc-500"
    />
  );
}
