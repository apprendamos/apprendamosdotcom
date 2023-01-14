import type { NextApiRequest, NextApiResponse } from "next";

import { AppXataClient } from "xata/clients";
import { exists } from "@xata.io/client";


type Data = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      const { articleId, cursor } = req.query;

      const parent_article = await AppXataClient.db.Article.read(articleId as string);

      if (!parent_article) {
        res.status(404);
        return;
      }

      const page = await AppXataClient.db.Article
        .filter(exists("author"))
        .filter("parent", articleId as string)
        .sort("publication_date", "desc")
        .select([
          "id",
          "body",
          "publication_date",
          "author.username",
          "author.name",
          "like_count",
          "comment_count",
          "children_count",
          "star_count",
        ])
        .getPaginated({
          pagination: {
            size: 5,
            after: cursor as string | undefined,
          },
        });

      const records = page.records.map((record) => {
        return {
          ...record,
          body: record.body.slice(0, 280),
        };
      });

      if (!page) {
        res.status(404).json({ error: "Page not found" });
        return;
      }

      res.status(200).json({
        ...page,
        records,
      });
    

    default:
      res.status(404).end();
  }
}
