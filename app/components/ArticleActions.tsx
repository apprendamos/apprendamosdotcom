"use client";

import {
  ResetIcon,
  ChatBubbleIcon,
  HeartIcon,
  StarIcon,
} from "@radix-ui/react-icons";
import { randomIntFromInterval } from "utils";

export function IconWrapper({
  Icon,
  label,
}: {
  Icon: React.ForwardRefExoticComponent<any>;
  label?: string;
}) {
  return (
    <button className="flex flex-none items-center space-x-1 text-xs text-zinc-600">
      <Icon className="w-4 h-4" />
      <span>{label || randomIntFromInterval(0, 100)}</span>
    </button>
  );
}

export default function ArticleActions() {
  return (
    <div className="flex flex-none justify-between px-10">
      <IconWrapper Icon={ResetIcon} />
      <IconWrapper Icon={ChatBubbleIcon} label="Comment" />
      <IconWrapper Icon={HeartIcon} label="Like" />
      <IconWrapper Icon={StarIcon} label="Bookmark" />
    </div>
  );
}
