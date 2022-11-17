export const revalidate = 10;

import { notFound } from "next/navigation";
import { ProfileType, CommentType } from "types";
import { xata } from "xata/client";
import { Article, Profile } from "app/(components)";

import Comment from "./Comment";

async function getQuestion(id: string) {
  const record = await xata.db.questions.read(id);

   console.log(record);
  return record;
}

async function getProfile(id: string) {
  const record = await xata.db.profiles.read(id);
  return record;
}

async function getComments(id: string) {
  const page = await xata.db.comments
    .filter("question.id", id)
    .sort("publication_date", "desc")
    .select(["*", "author.username", "author.name"])
    .getPaginated({
      pagination: {
        size: 15,
      },
    });

  if (page?.records?.length > 0) {
    return null;
  }

  return page.records as CommentType[];
}

export default async function SingleQuestionPage({
  params,
}: {
  params: { questionId: string };
}) {
  const question = await getQuestion(params.questionId);

  if (!question) {
    return notFound();
  }

  const author = await getProfile(question.author?.id as string);

  const profile = (author || {
    name: "Unknown",
    username: "not_found",
  }) as ProfileType;

  const comments = await getComments(params.questionId);
  return (
    <div>
      <Profile {...profile} />
      <Article>{question?.body as string}</Article>

      {comments ? (
        <>
          <h1 className="font-bold">Comentarios</h1>
          <div className="space-y-4">
            {comments.map((comment) => (
              <Comment key={comment.id} {...comment} />
            ))}
          </div>
        </>
      ) : (
        <p className="text-gray-500">Aún no hay comentarios</p>
      )}
    </div>
  );
}
