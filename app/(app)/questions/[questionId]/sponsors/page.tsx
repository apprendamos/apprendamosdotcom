export const revalidate = 10;

import { xata } from "xata/client";
import { exists } from "@xata.io/client";
import { Profile } from "app/components";
import { ProfileType } from "types";

async function getLikers(id: string) {
  const page = await xata.db.profile_question_rels
    .filter("question.id", id)
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

export default async function QuestionLikersPage({
  params,
}: {
  params: { questionId: string };
}) {

  const likers = await getLikers(params.questionId);

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
