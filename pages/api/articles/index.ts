import type { NextApiRequest, NextApiResponse } from "next";

import { AppXataClient } from "xata/clients";
import { exists } from "@xata.io/client";

import { getSession } from "next-auth/react";
import { AuthUserType } from "types";

type Data = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      const session = await getSession({ req });
      if (!session || !session.user) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }

      const profile = (session.user as AuthUserType).profile;

      const created = await AppXataClient.db.Article.create({
        body: req.body.body,
        author: profile?.id,
        publication_date: new Date(),
      });
      res.status(200).json({ id: created.id });

      break;
    case "GET":
      const { cursor } = req.query;

      const page = await AppXataClient.db.Article
        .filter(exists("author"))
        .sort("publication_date", "desc")
        .select([
          "id",
          "body",
          "publication_date",
          "author.username",
          "author.name",
          "author.image",
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
