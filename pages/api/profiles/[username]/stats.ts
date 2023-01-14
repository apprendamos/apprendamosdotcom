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
    case "GET":
      const { username } = req.query;

      const profile = await AppXataClient.db.Profile
        .filter("username", username as string)
        .getFirst();

      if (!profile) {
        res.status(404);
        return;
      }

      const global_stats = {
        follower_count: profile.follower_count,
        following_count: profile.following_count,
        like_count: profile.like_count,
        article_count: profile.article_count,
      };

      const session = await getSession({ req });
      if (!session || !session.user) {
        res.status(200).json({
          global: global_stats,
        });
        return;
      }

      const profile_session = (session.user as AuthUserType).profile;

      if (!profile_session || !profile_session.id) {
        res.status(403);
        return;
      }

      const rel_0 = await AppXataClient.db.FollowerFollowee
        .filter("follower", profile.id)
        .filter("followee", profile_session.id)
        .select(["*"])
        .getFirst();

      const rel_1 = await AppXataClient.db.FollowerFollowee
        .filter("follower", profile_session.id)
        .filter("followee", profile.id)
        .select(["*"])
        .getFirst();

      const session_stats = {
        profile_follows_viewer: rel_0?.following_status,
        viewer_follows_profile: rel_1?.following_status,
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
