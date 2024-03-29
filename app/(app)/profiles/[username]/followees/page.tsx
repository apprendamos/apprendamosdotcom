export const revalidate = 60;

import { AppXataClient } from "xata/clients";

import { ProfileType } from "types";
import { Profile } from "app/components";

async function getFollowees(username: string) {
  const page = await AppXataClient.db.FollowerFollowee
    .filter("follower.username", username)
    .sort("creation_date", "desc")
    .select(["followee.*", "creation_date"])
    .getPaginated({
      pagination: {
        size: 15,
      },
    });

  const profiles = page.records.map(
    (record) => record.followee
  ) as ProfileType[];
  return profiles;
}

export default async function ProfileFolloweesPage({
  params,
}: {
  params: { username: string };
}) {
  const followees = await getFollowees(params.username as string);

  return (
    <div className="space-y-4">
      {followees.map((followee) => (
        <Profile key={followee.id} {...followee} />
      ))}
    </div>
  );
}
