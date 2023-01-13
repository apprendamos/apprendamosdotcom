import type { NextApiRequest, NextApiResponse } from "next";

import { ApprendamosXataClient } from "xata/clients";

import { getSession } from "next-auth/react";
import { AuthUserType } from "types";

type Data = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      const { articleId } = req.query;

      const article = await ApprendamosXataClient.db.Article.read(articleId as string);

      if (!article) {
        res.status(404);
        return;
      }

      const global_stats = {
        like_count: article.like_count,
        comment_count: article.comment_count,
        children_count: article.children_count,
        star_count: article.star_count,
      };

      const session = await getSession({ req });
      if (!session || !session.user) {
        res.status(200).json({
          global: global_stats,
        });
        return;
      }

      const profile = (session.user as AuthUserType).profile;

      if (!profile || !profile.id) {
        res.status(403);
        return;
      }

      const actual_rel = await ApprendamosXataClient.db.ProfileArticle
        .filter("article", articleId as string)
        .filter("profile", profile?.id)
        .select(["*"])
        .getFirst();

      const session_stats = {
        like_status: actual_rel?.like_status,
        comment_count: actual_rel?.comment_count,
        star_count: actual_rel?.star_count,
        children_count: actual_rel?.children_count,
      };

      res.status(200).json({
        global: global_stats,
        session: session_stats,
      });

      break;
    default:
      res.status(405);
  }
}
