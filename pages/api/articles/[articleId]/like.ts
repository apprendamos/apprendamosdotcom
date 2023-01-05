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
      const { articleId } = req.query;
      const session = await getSession({ req });
      if (!session || !session.user) {
        res.status(401);
        return;
      }

      const profile = (session.user as AuthUserType).profile;

      if (!profile || !profile.id) {
        res.status(403);
        return;
      }

      const article = await xata.db.articles.read(articleId as string);

      if (!article) {
        res.status(404);
        return;
      }

      const actual_rel = await xata.db.profile_article_rels
        .filter("article", articleId as string)
        .filter("profile", profile?.id)
        .select(["*"])
        .getFirst();

      if (actual_rel) {
        await xata.db.profile_article_rels.update(actual_rel.id, {
          like_status: !actual_rel.like_status,
        });

        article.update({
          like_count: article.like_count + (!actual_rel.like_status ? 1 : -1),
        });
      } else {
        await xata.db.profile_article_rels.create({
          article: articleId as string,
          profile: profile?.id,
          like_status: true,
        });

        article.update({
          like_count: article.like_count + 1,
        });
      }

      res.status(200);

      break;
    default:
      res.status(405);
  }
}
