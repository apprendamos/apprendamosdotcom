import { Article } from "app/components";
import Link from "next/link";
import { QuestionType } from "types";

export default function QuestionCard({ body, tags, id }: QuestionType) {
  return (
    <Link href={`/questions/${id}`}>
      <div
        className="
        select-none 
        p-4
        rounded border dark:border-red-600/10
        bg-zinc-100 dark:bg-zinc-800
        focus:bg-zinc-200 dark:focus:bg-zinc-700
      "
      >
        <Article className="max-h-64 prose-sm">{body}</Article>
      </div>
    </Link>
  );
}
