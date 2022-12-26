export const revalidate = 10;

import { exists } from "@xata.io/client";
import { xata } from "xata/client";
import { PaginationArticles } from "app/components";

async function getArticlesPage() {
  const page = await xata.db.articles
    .filter(exists("author"))
    .sort("publication_date", "desc")
    .select([
      "id",
      "body",
      "publication_date",
      "author.username",
      "author.name",
      "author.image",
    ])
    .getPaginated({
      pagination: {
        size: 5,
      },
    });

  return JSON.parse(JSON.stringify(page));
}

export default async function ArticlesPage() {
  const page = await getArticlesPage();

  return <PaginationArticles firstPage={page} />;
}
