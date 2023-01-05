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
    case "GET":
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

      const actual_rel = await xata.db.profile_article_rels
        .filter("article", articleId as string)
        .filter("profile", profile?.id)
        .select(["*"])
        .getFirst();

      console.log(actual_rel);
      const data = {
        like_status: actual_rel?.like_status,
        comment_count: actual_rel?.comment_count,
        star_count: actual_rel?.star_count,
        children_count: actual_rel?.children_count,
      }

      res.status(200).json(data);

      break;
    default:
      res.status(405);
  }
}
