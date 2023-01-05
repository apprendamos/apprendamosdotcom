import type { NextApiRequest, NextApiResponse } from "next";

import { xata } from "xata/client";

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

      const created = await xata.db.articles.create({
        body: req.body.body,
        author: profile?.id,
        publication_date: new Date(),
      });
      res.status(200).json({ id: created.id });

      break;
    case "GET":
      const { articleId } = req.query;

      const data = await xata.db.articles.read(articleId as string);

      if (!data) {
        res.status(404).json({ error: "Article not found" });
        return;
      }

      const stats = {
        like_count: data.like_count,
        comment_count: data.comment_count,
        children_count: data.children_count,
        star_count: data.star_count,
      };

      res.status(200).json(stats);
    default:
      res.status(404).end();
  }
}
