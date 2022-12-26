import { MarkdownArticle } from "app/components";
import Link from "next/link";
import { ArticleType, ProfileType } from "types";

import { Profile } from "app/components";

export default function Article({ body, author, id }: ArticleType) {
  const profile = author || {
    name: "Unknown",
    username: "not_found",
  };

  return (
    <div
      className="
        group select-none 
        px-4 pt-4 hover:pb-4 
        rounded border dark:border-red-600/10
        bg-zinc-100 dark:bg-zinc-800
        hover:bg-zinc-200 dark:hover:bg-zinc-700
      "
    >
      <Profile {...(profile as ProfileType)} />
      <MarkdownArticle className="max-h-60">{body}</MarkdownArticle>
      <Link
        className="invisible group-hover:visible hover:font-bold"
        href={`/articles/${id}`}
      >
        Ver más...
      </Link>
    </div>
  );
}
