"use client";

import { HeartIcon, StarIcon } from "@radix-ui/react-icons";
import { randomIntFromInterval } from "utils";

export default function QuestionActions() {
  return (
    <div className="flex flex-none justify-between pr-10">
      <button className="flex flex-none items-center space-x-1 text-xs text-zinc-600">
        <HeartIcon className="w-5 h-5" />
        <span>{randomIntFromInterval(0,100)}</span>
      </button>
      <button className="flex flex-none items-center space-x-1 text-xs text-zinc-600">
        <StarIcon className="w-5 h-5" />
        <span>{randomIntFromInterval(0,100)}</span>
      </button>

    </div>
  );
}
