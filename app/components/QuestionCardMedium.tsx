import { Article } from "app/components";
import Link from "next/link";
import { QuestionType, ProfileType } from "types";

import { Profile } from "app/components";

export default function QuestionCardMedium({ body, author, id }: QuestionType) {
  const profile = author || {
    name: "Unknown",
    username: "not_found",
  };

  return (
    <div
      className="
        group select-none 
        px-3 py-2
        rounded border border-transparent 
        dark:focus-within:border-zinc-800
        bg-zinc-100 dark:bg-zinc-900
      "
    >
      <Profile {...(profile as ProfileType)} />
      <Article className="max-h-60 prose-sm">{body}</Article>
      <Link href={`/questions/${id}`}>Seguir leyendo</Link>
    </div>
  );
}
