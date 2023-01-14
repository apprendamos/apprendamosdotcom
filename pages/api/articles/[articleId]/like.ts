import type { NextApiRequest, NextApiResponse } from "next";

import { AppXataClient } from "xata/clients";

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

      const article = await AppXataClient.db.Article.read(articleId as string);

      if (!article) {
        res.status(404);
        return;
      }

      const actual_rel = await AppXataClient.db.ProfileArticle
        .filter("article", articleId as string)
        .filter("profile", profile?.id)
        .select(["*"])
        .getFirst();

      let updated_rel, updated_article;

      if (actual_rel) {
        updated_rel = await AppXataClient.db.ProfileArticle.update(actual_rel.id, {
          like_status: !actual_rel.like_status,
        });

        updated_article = await article.update({
          like_count: article.like_count + (!actual_rel.like_status ? 1 : -1),
        });
      } else {
        updated_rel = await AppXataClient.db.ProfileArticle.create({
          article: articleId as string,
          profile: profile?.id,
          like_status: true,
        });

        updated_article = await article.update({
          like_count: article.like_count + 1,
        });
      }

      const stats = {
        global: {
          like_count: updated_article?.like_count,
          comment_count: updated_article?.comment_count,
          star_count: updated_article?.star_count,
          children_count: updated_article?.children_count,
        },
        session: {
          like_status: updated_rel?.like_status,
          star_count: updated_rel?.star_count,
          comment_count: updated_rel?.comment_count,
          children_count: updated_rel?.children_count,
        },
      };

      res.status(200).json(stats);

      break;
    default:
      res.status(405);
  }
}
