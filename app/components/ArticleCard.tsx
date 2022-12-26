import { MarkdownArticle } from "app/components";
import Link from "next/link";
import { ArticleType } from "types";

export default function ArticleCard({ body, tags, id }: ArticleType) {
  return (
    <Link href={`/articles/${id}`}>
      <div
        className="
        select-none 
        p-4
        rounded border dark:border-red-600/10
        bg-zinc-100 dark:bg-zinc-800
        focus:bg-zinc-200 dark:focus:bg-zinc-700
      "
      >
        <MarkdownArticle className="max-h-64 prose-sm">{body}</MarkdownArticle>
      </div>
    </Link>
  );
}
