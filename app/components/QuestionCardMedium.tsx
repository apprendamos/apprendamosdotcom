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
    image: "https://xsgames.co/randomusers/assets/avatars/pixel/1.jpg",
  };

  const { name, username, image } = profile;

  return (
    <div
      className="
        flex
        -mx-2 p-2
        border-y border-zinc-800
        dark:focus-within:border-zinc-700
        bg-zinc-100 dark:bg-zinc-900
      "
    >
      <div className="flex flex-none">
        <Link href={`/profiles/${username}`}>
          <Image
            alt={`${username} profile picture`}
            src={
              image ||
              "https://xsgames.co/randomusers/assets/avatars/pixel/1.jpg"
            }
            width={36}
            height={36}
            className="rounded-full border"
          />
        </Link>
      </div>

      <div className="pl-2 flex flex-col space-y-0 grow">
        <Link href={`/profiles/${username}`} className="flex space-x-1 text-sm">
          <span className="font-bold">{name}</span>
          <span className="font-medium text-zinc-600">@{username}</span>
        </Link>

        <Link href={`/questions/${id}`} className="text-xs text-zinc-600">
          {formatRelativeTime(publication_date)}
        </Link>
        <Article className="max-h-60 prose-sm">{body}</Article>
      </div>
    </div>
  );
}
