import "server-only";

import { Article } from "app/(components)";
import Link from "next/link";
import { QuestionType, ProfileType } from "types";

import { Profile } from "app/(components)";

export default function Question({ body, author, id }: QuestionType) {
  const profile = author || {
    name: "Unknown",
    username: "not_found",
  };

  return (
    <div
      className="
        group select-none 
        px-4 pt-4 hover:pb-4 
        rounded border dark:border-zinc-700
        bg-zinc-100 dark:bg-zinc-800
        hover:bg-zinc-200 dark:hover:bg-zinc-700
      "
    >
      <Profile {...(profile as ProfileType)} />
      <Article className="max-h-60">{body}</Article>
      <Link
        className="invisible group-hover:visible hover:font-bold"
        href={`/questions/${id}`}
      >
        Ver más...
      </Link>
    </div>
  );
}
