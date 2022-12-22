import Image from "next/image";

import { Article } from "app/components";
import Link from "next/link";
import { QuestionType } from "types";

import { formatRelativeTime } from "utils";

export default function QuestionCardMedium({
  body,
  author,
  id,
  publication_date,
}: QuestionType) {
  const profile = author || {
    name: "Unknown",
    username: "not_found",
  };

  const { name, username } = profile;

  return (
    <div className="flex">
      <Link href={`/profiles/${username}`}>
        <Image
          alt={`${username} profile picture`}
          src={`https://xsgames.co/randomusers/assets/avatars/pixel/3.jpg`}
          width={50}
          height={50}
          className="rounded-full border flex flex-none"
        />
      </Link>

      <div className="pl-2">
        <Link href={`/profiles/${username}`} className="flex space-x-2">
          <span className="font-bold">{name}</span>
          <span className="font-medium text-gray-500">@{username}</span>
        </Link>

        <Link href={`/questions/${id}`}>{formatRelativeTime(publication_date)}</Link>
        <div
          className="
            select-none
            rounded border border-transparent 
            dark:focus-within:border-zinc-800
            bg-zinc-100 dark:bg-zinc-900
          "
        >
          <Article className="max-h-60 prose-sm">{body}</Article>
        </div>
      </div>
    </div>
  );
}
