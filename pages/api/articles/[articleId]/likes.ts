import type { NextApiRequest, NextApiResponse } from "next";

import { xata } from "xata/client";
import { exists } from "@xata.io/client";

type Data = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      const { articleId, cursor } = req.query;

      const parent_article = await xata.db.articles.read(articleId as string);

      if (!parent_article) {
        res.status(404);
        return;
      }

      const page = await xata.db.profile_article_rels
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
