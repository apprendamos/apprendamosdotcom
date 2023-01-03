export const revalidate = 10;

import { xata } from "xata/client";

import { ProfileType, ArticleType } from "types";
import { ArticleCardSmall } from "app/components";

async function getProfile(username: string) {
  const records = await xata.db.profiles.filter("username", username).getAll();
  return records[0];
}

async function getArticles(username: string) {
  const data = await xata.db.articles
    .filter("author.username", username)
    .sort("publication_date", "desc")
    .select(["id", "body", "publication_date"])
    .getPaginated({
      pagination: {
        size: 15,
      },
    });

  const page = await JSON.parse(JSON.stringify(data));

  return page.records as ArticleType[];
}

export default async function ProfileArticlesPage({
  params,
}: {
  params: { username: string };
}) {
  const profile = await getProfile(params.username);
  const articles = await getArticles(params.username as string);

  return (
    <div className="space-y-4">
      {articles.map((article) => (
        <ArticleCardSmall
          key={article.id}
          {...article}
          author={profile as ProfileType}
        />
      ))}
    </div>
  );
}
