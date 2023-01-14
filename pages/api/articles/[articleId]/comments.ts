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

      const page = await AppXataClient.db.Comment
        .filter(exists("author"))
        .filter("article", articleId as string)
        .sort("publication_date", "desc")
        .select([
          "*",
          "author.name",
          "author.username",
          "author.image"
        ])
        .getPaginated({
          pagination: {
            size: 5,
            after: cursor as string | undefined,
          },
        });


      if (!page) {
        res.status(404).json({ error: "Page not found" });
        return;
      }

      res.status(200).json(page);
    

    default:
      res.status(404).end();
  }
}
