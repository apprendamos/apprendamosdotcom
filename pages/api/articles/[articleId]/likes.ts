import type { NextApiRequest, NextApiResponse } from "next";

import { ApprendamosXataClient } from "xata/clients";
import { exists } from "@xata.io/client";

type Data = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      const { articleId, cursor } = req.query;

      const parent_article = await ApprendamosXataClient.db.Article.read(articleId as string);

      if (!parent_article) {
        res.status(404);
        return;
      }

      const page = await ApprendamosXataClient.db.ProfileArticle
        .filter("article", articleId as string)
        .filter("like_status", true)
        .filter(exists("profile"))
        .select(["profile.name", "profile.username", "profile.image"])
        .getPaginated({
          pagination: {
            size: 5,
            after: cursor as string | undefined,
          },
        });

      const records = page.records.map((record) => {
        return {
          ...record.profile,
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
