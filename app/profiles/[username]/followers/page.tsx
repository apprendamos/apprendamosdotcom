import "server-only";
export const revalidate = 3;

import { xata } from "xata/client";

import { ProfileType } from "types";
import { Profile } from "app/(components)";

async function getFollowers(username: string) {
  const page = await xata.db.follower_followee_rel
    .filter("followee.username", username)
    .sort("creation_date", "desc")
    .select(["follower.*", "creation_date"])
    .getPaginated({
      pagination: {
        size: 15,
      },
    });

  const profiles = page.records.map(
    (record) => record.follower
  ) as ProfileType[];
  return profiles;
}

export default async function ProfileFollowersPage({
  params,
}: {
  params: { username: string };
}) {
  const followers = await getFollowers(params.username as string);

  return (
    <div className="space-y-4">
      {followers.map((follower) => (
        <Profile key={follower.id} {...follower} />
      ))}
    </div>
  );
}
