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
        case "POST":
            /*

        1. Get the profile of the user who is going to be followed
        2. Get the profile of the user who is going to follow
        3. Check if the user who is going to be followed is already followed by the user who is going to follow
        4. If the user who is going to be followed is already followed by the user who is going to follow, then unfollow the user who is going to be followed
        5. If the user who is going to be followed is not followed by the user who is going to follow, then follow the user who is going to be followed

    */

            const { username } = req.query;

            const profile = await ApprendamosXataClient.db.Profile
                .filter("username", username as string)
                .getFirst();

            if (!profile) {
                res.status(404);
                return;
            }

            const session = await getSession({ req });
            if (!session || !session.user) {
                res.status(403);
                return;
            }

            const profile_session = (session.user as AuthUserType).profile;

            if (!profile_session || !profile_session.id) {
                res.status(403);
                return;
            }

            const global_stats = {
                follower_count: profile.follower_count,
                following_count: profile.following_count,
                like_count: profile.like_count,
                article_count: profile.article_count,
            };

            const rel_0 = await ApprendamosXataClient.db.FollowerFollowee
                .filter("follower", profile.id)
                .filter("followee", profile_session.id)
                .select(["*"])
                .getFirst();

            const rel_1 = await ApprendamosXataClient.db.FollowerFollowee
                .filter("follower", profile_session.id)
                .filter("followee", profile.id)
                .select(["*"])
                .getFirst();

            const session_stats = {
                profile_follows_viewer: rel_0?.following_status,
                viewer_follows_profile: rel_1?.following_status,
            };

            if (rel_1) {
                const new_rel_1 = await ApprendamosXataClient.db.FollowerFollowee.update(rel_1.id, {
                    following_status: !rel_1.following_status,
                });
            } else {
                const new_rel_1 = await ApprendamosXataClient.db.FollowerFollowee.create({
                    follower: profile_session.id,
                    followee: profile.id,
                    following_status: true,
                });
            }

            res.status(200).json({
                global: global_stats,
                session: session_stats,
            });

            break;
        default:
            res.status(405);
    }
}
