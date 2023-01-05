export const revalidate = 10;

import { xata } from "xata/client";
import { exists } from "@xata.io/client";
import { Profile } from "app/components";
import { ProfileType } from "types";

async function getLikers(id: string) {
  const page = await xata.db.profile_article_rels
    .filter("article.id", id)
    .filter("like_status", true)
    .filter(exists("profile"))
    .select(["profile.username", "profile.name", "profile.image"])
    .getPaginated({
      pagination: {
        size: 15,
      },
    });
  
  return page.records.map((rel) => rel.profile) as ProfileType[];
}

export default async function ArticleLikersPage({
  params,
}: {
  params: { articleId: string };
}) {

  const likers = await getLikers(params.articleId);

  if (!likers) {
    return <p className="text-gray-500">Not any likers for now</p>;
  }

  return (
    <div className="space-y-4">
      {likers.map((liker) => (
        <Profile key={liker.username} {...liker} />
      ))}
    </div>
  );
}
