import Image from "next/image";

import { ArticleReactionButtons, MarkdownArticle } from "app/components";
import Link from "next/link";
import { ArticleType } from "types";

import { formatRelativeTime } from "utils";

export default function ArticleCardMedium({
  body,
  author,
  id,
  publication_date,
}: ArticleType) {
  const profile = author || {
    name: "Unknown",
    username: "not_found",
    image: "https://xsgames.co/randomusers/assets/avatars/pixel/1.jpg",
  };

  const { name, username, image } = profile;

  return (
    <div
      className="
        p-2
        border-y border-red-600/10
        dark:focus-within:border-red-600/30
        bg-zinc-100 dark:bg-zinc-900 bg-opacity-50
      "
    >
      <div className="flex">
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
          <Link
            href={`/profiles/${username}`}
            className="flex space-x-1 text-sm"
          >
            <span className="font-bold">{name}</span>
            <span className="font-medium text-zinc-600">@{username}</span>
          </Link>

          <Link href={`/articles/${id}`} className="text-xs text-zinc-600">
            {formatRelativeTime(publication_date)}
          </Link>

          <Link href={`/articles/${id}`}>
            <MarkdownArticle className="max-h-60 prose-sm">
              {body}
            </MarkdownArticle>
          </Link>
        </div>
      </div>
      <ArticleReactionButtons articleId={id} />
    </div>
  );
}
