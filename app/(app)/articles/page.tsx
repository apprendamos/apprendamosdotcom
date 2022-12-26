export const revalidate = 10;

import { exists } from "@xata.io/client";
import { xata } from "xata/client";
import Article from "./Article";

import { ArticleType } from "types/ArticleType";

async function getArticles() {
  const data = await xata.db.articles
    .filter(exists("author"))
    .sort("publication_date", "desc")
    .select([
      "id",
      "body",
      "publication_date",
      "author.username",
      "author.name",
    ])
    .getPaginated({
      pagination: {
        size: 15,
      },
    });

  const page = await JSON.parse(JSON.stringify(data));
  
  return page.records as ArticleType[];
}

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <div className="space-y-4">
      {articles.map((article) => (
        <Article key={article.id} {...article} />
      ))}
    </div>
  );
}
