export const revalidate = 10;

import { notFound } from "next/navigation";
import { ProfileType } from "types";
import { xata } from "xata/client";
import { MarkdownArticle, Profile } from "app/components";
import ArticleNavbar from "./ArticleNavbar";

async function getArticle(id: string) {
  const record = await xata.db.articles.read(id);
  return record;
}

async function getProfile(id: string) {
  const record = await xata.db.profiles.read(id);
  return record;
}

export default async function SingleArticlePage({
  params,
  children,
}: {
  params: { articleId: string };
  children: React.ReactNode;
}) {
  const article = await getArticle(params.articleId);

  if (!article) {
    return notFound();
  }

  const author = await getProfile(article.author?.id as string);

  const profile = (author || {
    name: "Unknown",
    username: "not_found",
  }) as ProfileType;

  return (
    <>
      <div className="px-4">
        <Profile {...profile} />
      </div>
      <MarkdownArticle className="pl-4 pr-2">
        {article?.body as string}
      </MarkdownArticle>
      <ArticleNavbar articleId={params.articleId} />
      {children}
    </>
  );
}
