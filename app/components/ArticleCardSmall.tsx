import { MarkdownArticle } from "app/components";
import Link from "next/link";
import { ArticleType } from "types";

export default function ArticleCardSmall({ body, tags, id }: ArticleType) {
  return (
    <Link href={`/articles/${id}`}>
      <div
        className="
        p-2
        border-y border-red-600/10
        dark:focus-within:border-red-600/30
        bg-zinc-100 dark:bg-zinc-900/50
      "
      >
        <MarkdownArticle className="max-h-64 prose-sm">{body}</MarkdownArticle>
      </div>
    </Link>
  );
}
