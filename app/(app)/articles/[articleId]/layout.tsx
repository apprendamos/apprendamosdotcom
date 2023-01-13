export const revalidate = 60;

import { notFound } from "next/navigation";
import { ProfileType } from "types";
import { ApprendamosXataClient } from "xata/clients";
import {
  MarkdownArticle,
  Profile,
  ArticleReactionButtons,
} from "app/components";

async function getArticle(id: string) {
  const record = await ApprendamosXataClient.db.Article.read(id);
  return record;
}

async function getProfile(id: string) {
  const record = await ApprendamosXataClient.db.Profile.read(id);
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
    image: "/unknown_profile.jpg"
  }) as ProfileType;

  return (
    <>
      <div className="px-4">
        <Profile {...profile} />
      </div>
      <MarkdownArticle className="pl-4 pr-2">
        {article?.body as string}
      </MarkdownArticle>
      <ArticleReactionButtons articleId={article.id} />
      {children}
    </>
  );
}
